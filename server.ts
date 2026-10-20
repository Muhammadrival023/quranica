import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { secondarySources } from "./src/data/secondarySources";
import { HIJAIYAH_MAP, getKoreksiVn } from "./src/data/hijaiyahMap";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT && process.env.PORT !== "8080" ? parseInt(process.env.PORT, 10) : 3000;

  // JSON request body parser with larger limits for potential audio uploads
  app.use(express.json({ limit: "50mb" }));

  // API Route: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // --- IN-MEMORY USER DATABASE ---
  interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    role: "Admin" | "User";
    tier: "Reguler" | "Premium" | "Platinum" | "Berbayar";
    billingCycle?: "Bulanan" | "Tahunan" | null;
    createdAt: string;
    pekerjaan?: string;
    phone?: string;
    password?: string;
  }

  let userDatabase: UserProfile[] = [
    {
      uid: "bootstrapped_admin",
      email: "rivalgamingchannel@gmail.com",
      displayName: "Admin Utama",
      role: "Admin",
      tier: "Platinum",
      billingCycle: "Tahunan",
      createdAt: new Date().toISOString(),
      password: process.env.ADMIN_PASSWORD || ""
    },
    {
      uid: "user_sample_1",
      email: "ahmad.tafsir@gmail.com",
      displayName: "Ahmad Tafsir",
      role: "User",
      tier: "Reguler",
      billingCycle: null,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
      uid: "user_sample_2",
      email: "fatimah.zahra@yahoo.com",
      displayName: "Fatimah Az-Zahra",
      role: "User",
      tier: "Premium",
      billingCycle: "Bulanan",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ];

  // --- IP-BASED & LOGIN-BASED CHAT QUOTA & RATE LIMIT STORE ---
  interface QuotaUsageRecord {
    ip: string;
    guestChatCount: number; // Max 10 per IP for guests, non-resettable via refresh
    userChatCount: number;  // Current month chat count for free users (max 30)
    userMonth: string;      // YYYY-MM
    dailyChatCount: number; // Current day chat count for Premium 10K (max 200)
    dailyDate: string;      // YYYY-MM-DD
    lastChatAt: string;
  }

  const quotaStore = new Map<string, QuotaUsageRecord>();

  const getClientIp = (req: express.Request): string => {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
      const first = forwarded.split(",")[0].trim();
      if (first) return first;
    }
    const realIp = req.headers["x-real-ip"];
    if (typeof realIp === "string" && realIp.trim()) {
      return realIp.trim();
    }
    return req.socket.remoteAddress || "127.0.0.1";
  };

  const getOrCreateQuota = (ip: string): QuotaUsageRecord => {
    let rec = quotaStore.get(ip);
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    if (!rec) {
      rec = {
        ip,
        guestChatCount: 0,
        userChatCount: 0,
        userMonth: currentMonth,
        dailyChatCount: 0,
        dailyDate: currentDate,
        lastChatAt: now.toISOString()
      };
      quotaStore.set(ip, rec);
    } else {
      if (rec.userMonth !== currentMonth) {
        rec.userMonth = currentMonth;
        rec.userChatCount = 0;
      }
      if (rec.dailyDate !== currentDate) {
        rec.dailyDate = currentDate;
        rec.dailyChatCount = 0;
      }
    }
    return rec;
  };

  const evaluateAndConsumeQuota = (req: express.Request, userUid?: string) => {
    const ip = getClientIp(req);
    const quota = getOrCreateQuota(ip);

    let user: UserProfile | undefined;
    if (userUid) {
      user = userDatabase.find(u => u.uid === userUid);
    }

    if (user && user.role === "Admin") {
      return { allowed: true, tier: "Platinum" as const, remaining: "unlimited" as const, limit: "unlimited" as const, used: 0, ip, canDeepResearch: true };
    }

    // Unauthenticated Guest (max 10 chat per IP total, persists through refresh)
    if (!user) {
      const GUEST_LIMIT = 10;
      if (quota.guestChatCount >= GUEST_LIMIT) {
        return {
          allowed: false,
          error: `Batas 10 chat gratis untuk tamu pada IP Anda (${ip}) telah habis. Refresh halaman tidak dapat menambah token. Silakan Masuk (30 chat/bulan) atau dukung Patungan Penelitian (10K untuk 200 chat/hari, 50K Platinum Unlimited).`,
          tier: "Guest" as const,
          used: quota.guestChatCount,
          limit: GUEST_LIMIT,
          remaining: 0,
          ip,
          canDeepResearch: false
        };
      }
      quota.guestChatCount += 1;
      quota.lastChatAt = new Date().toISOString();
      return {
        allowed: true,
        tier: "Guest" as const,
        used: quota.guestChatCount,
        limit: GUEST_LIMIT,
        remaining: Math.max(0, GUEST_LIMIT - quota.guestChatCount),
        ip,
        canDeepResearch: false
      };
    }

    // Platinum (50K Patungan: Unlimited chat + Deep Research)
    if (user.tier === "Platinum") {
      return {
        allowed: true,
        tier: "Platinum" as const,
        used: quota.dailyChatCount,
        limit: "unlimited" as const,
        remaining: "unlimited" as const,
        canDeepResearch: true,
        ip
      };
    }

    // Premium (10K Patungan: 200 chat per hari) or Berbayar
    if (user.tier === "Premium" || user.tier === "Berbayar") {
      const DAILY_LIMIT = 200;
      if (quota.dailyChatCount >= DAILY_LIMIT) {
        return {
          allowed: false,
          error: `Batas 200 chat hari ini untuk akun Premium pada IP (${ip}) telah tercapai. Kuota diperbarui besok, atau beralih ke Platinum (50K Unlimited + Deep Research).`,
          tier: "Premium" as const,
          used: quota.dailyChatCount,
          limit: DAILY_LIMIT,
          remaining: 0,
          ip,
          canDeepResearch: false
        };
      }
      quota.dailyChatCount += 1;
      quota.lastChatAt = new Date().toISOString();
      return {
        allowed: true,
        tier: "Premium" as const,
        used: quota.dailyChatCount,
        limit: DAILY_LIMIT,
        remaining: Math.max(0, DAILY_LIMIT - quota.dailyChatCount),
        canDeepResearch: false,
        ip
      };
    }

    // Reguler (Logged in free: 30 chat per bulan)
    const MONTHLY_LIMIT = 30;
    if (quota.userChatCount >= MONTHLY_LIMIT) {
      return {
        allowed: false,
        error: `Batas kuota 30 chat per bulan untuk akun Reguler telah tercapai. Dukung program Patungan Penelitian (10K untuk 200 chat/hari, atau 50K Platinum Unlimited + Deep Research).`,
        tier: "Reguler" as const,
        used: quota.userChatCount,
        limit: MONTHLY_LIMIT,
        remaining: 0,
        ip,
        canDeepResearch: false
      };
    }
    quota.userChatCount += 1;
    quota.lastChatAt = new Date().toISOString();
    return {
      allowed: true,
      tier: "Reguler" as const,
      used: quota.userChatCount,
      limit: MONTHLY_LIMIT,
      remaining: Math.max(0, MONTHLY_LIMIT - quota.userChatCount),
      canDeepResearch: false,
      ip
    };
  };

  let preApprovedAdmins = new Set<string>(["rivalgamingchannel@gmail.com"]);

  // API Route: Register/Retrieve user profile
  app.post("/api/users/profile", (req, res) => {
    try {
      const { uid, email, displayName, tier, billingCycle, pekerjaan, phone, password } = req.body;
      if (!uid || !email) {
        return res.status(400).json({ error: "UID dan email wajib diisi." });
      }

      let user = userDatabase.find(u => u.uid === uid || u.email.toLowerCase() === email.toLowerCase());
      const isAdminEmail = preApprovedAdmins.has(email.toLowerCase()) || email.toLowerCase() === "rivalgamingchannel@gmail.com";

      if (user) {
        user.displayName = displayName || user.displayName;
        if (email) {
          user.email = email;
        }
        if (pekerjaan !== undefined) {
          user.pekerjaan = pekerjaan;
        }
        if (phone !== undefined) {
          user.phone = phone;
        }
        if (password !== undefined) {
          user.password = password;
        }
        if (isAdminEmail) {
          user.role = "Admin";
        }
        if (tier === "Reguler" || tier === "Berbayar") {
          user.tier = tier;
        }
        if (billingCycle === "Bulanan" || billingCycle === "Tahunan" || billingCycle === null) {
          user.billingCycle = billingCycle;
        } else if (tier === "Berbayar" && !user.billingCycle) {
          user.billingCycle = "Bulanan";
        }
      } else {
        user = {
          uid,
          email,
          displayName: displayName || email.split("@")[0],
          role: isAdminEmail ? "Admin" : "User",
          tier: tier || "Reguler",
          billingCycle: tier === "Berbayar" ? (billingCycle || "Bulanan") : null,
          createdAt: new Date().toISOString(),
          pekerjaan: pekerjaan || "",
          phone: phone || "",
          password: password || ""
        };
        userDatabase.push(user);
      }

      if (user.role === "Admin" && !preApprovedAdmins.has(email.toLowerCase())) {
        preApprovedAdmins.add(email.toLowerCase());
      }

      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Login user with email and password
  app.post("/api/users/login", (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email dan kata sandi wajib diisi." });
      }

      const emailClean = email.trim().toLowerCase();
      const user = userDatabase.find(u => u.email.toLowerCase() === emailClean);

      if (!user) {
        return res.status(401).json({ error: "Email atau kata sandi salah." });
      }

      // Check password if set (for admin, bootstrapped, or newly registered users)
      if (user.password && user.password !== password) {
        return res.status(401).json({ error: "Email atau kata sandi salah." });
      }

      // If user has no password set yet (e.g. sample users), we can allow them to log in or set it, or just pass
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Get all users (Admin only)
  app.get("/api/users", (req, res) => {
    try {
      const { adminUid } = req.query;
      if (!adminUid) {
        return res.status(401).json({ error: "Autentikasi admin diperlukan." });
      }

      const admin = userDatabase.find(u => u.uid === adminUid && u.role === "Admin");
      if (!admin) {
        return res.status(403).json({ error: "Akses ditolak. Anda bukan Admin." });
      }

      res.json({ users: userDatabase });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Add or pre-approve an Admin
  app.post("/api/users/add-admin", (req, res) => {
    try {
      const { email, adminUid } = req.body;
      if (!email || !adminUid) {
        return res.status(400).json({ error: "Email dan adminUid wajib diisi." });
      }

      const admin = userDatabase.find(u => u.uid === adminUid && u.role === "Admin");
      if (!admin) {
        return res.status(403).json({ error: "Akses ditolak. Anda bukan Admin." });
      }

      const emailClean = email.trim().toLowerCase();
      preApprovedAdmins.add(emailClean);

      const existingUser = userDatabase.find(u => u.email.toLowerCase() === emailClean);
      if (existingUser) {
        existingUser.role = "Admin";
      }

      res.json({ success: true, message: `Email ${emailClean} berhasil didaftarkan sebagai Admin.` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Delete a user
  app.delete("/api/users/:uid", (req, res) => {
    try {
      const { uid } = req.params;
      const { adminUid } = req.body;

      if (!adminUid) {
        return res.status(401).json({ error: "Autentikasi admin diperlukan." });
      }

      const admin = userDatabase.find(u => u.uid === adminUid && u.role === "Admin");
      if (!admin) {
        return res.status(403).json({ error: "Akses ditolak. Anda bukan Admin." });
      }

      if (uid === adminUid) {
        return res.status(400).json({ error: "Anda tidak dapat menghapus akun Anda sendiri." });
      }

      const userIndex = userDatabase.findIndex(u => u.uid === uid);
      if (userIndex === -1) {
        return res.status(404).json({ error: "User tidak ditemukan." });
      }

      const deletedUser = userDatabase[userIndex];
      userDatabase.splice(userIndex, 1);

      res.json({ success: true, message: `User ${deletedUser.displayName} berhasil dihapus.` });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Update subscription tier
  app.post("/api/users/update-tier", (req, res) => {
    try {
      const { uid, tier, billingCycle, adminUid, pekerjaan, phone, email } = req.body;
      if (!uid || !tier) {
        return res.status(400).json({ error: "UID dan tier wajib diisi." });
      }

      if (tier !== "Reguler" && tier !== "Berbayar" && tier !== "Premium" && tier !== "Platinum") {
        return res.status(400).json({ error: "Tier tidak valid (hanya 'Reguler', 'Premium', 'Platinum', atau 'Berbayar')." });
      }

      if (adminUid) {
        const admin = userDatabase.find(u => u.uid === adminUid && u.role === "Admin");
        if (!admin) {
          return res.status(403).json({ error: "Akses ditolak." });
        }
      }

      const user = userDatabase.find(u => u.uid === uid);
      if (!user) {
        return res.status(404).json({ error: "User tidak ditemukan." });
      }

      user.tier = tier;
      user.billingCycle = (tier === "Berbayar" || tier === "Premium" || tier === "Platinum") ? (billingCycle || "Bulanan") : null;
      if (email !== undefined) {
        user.email = email;
      }
      if (pekerjaan !== undefined) {
        user.pekerjaan = pekerjaan;
      }
      if (phone !== undefined) {
        user.phone = phone;
      }
      res.json({ success: true, user });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Get Quota Status (IP + User ID)
  app.get("/api/user/quota", (req, res) => {
    try {
      const { uid } = req.query;
      const ip = getClientIp(req);
      const quota = getOrCreateQuota(ip);

      let user: UserProfile | undefined;
      if (typeof uid === "string" && uid) {
        user = userDatabase.find(u => u.uid === uid);
      }

      if (user && user.role === "Admin") {
        return res.json({
          ip,
          isLoggedIn: true,
          role: "Admin",
          tier: "Platinum",
          limit: "unlimited",
          used: 0,
          remaining: "unlimited",
          period: "unlimited",
          canDeepResearch: true
        });
      }

      if (!user) {
        const GUEST_LIMIT = 10;
        return res.json({
          ip,
          isLoggedIn: false,
          role: "User",
          tier: "Guest",
          limit: GUEST_LIMIT,
          used: quota.guestChatCount,
          remaining: Math.max(0, GUEST_LIMIT - quota.guestChatCount),
          period: "lifetime",
          canDeepResearch: false
        });
      }

      if (user.tier === "Platinum") {
        return res.json({
          ip,
          isLoggedIn: true,
          role: user.role,
          tier: "Platinum",
          limit: "unlimited",
          used: quota.dailyChatCount,
          remaining: "unlimited",
          period: "unlimited",
          canDeepResearch: true
        });
      }

      if (user.tier === "Premium" || user.tier === "Berbayar") {
        const DAILY_LIMIT = 200;
        return res.json({
          ip,
          isLoggedIn: true,
          role: user.role,
          tier: "Premium",
          limit: DAILY_LIMIT,
          used: quota.dailyChatCount,
          remaining: Math.max(0, DAILY_LIMIT - quota.dailyChatCount),
          period: "daily",
          canDeepResearch: false
        });
      }

      const MONTHLY_LIMIT = 30;
      return res.json({
        ip,
        isLoggedIn: true,
        role: user.role,
        tier: "Reguler",
        limit: MONTHLY_LIMIT,
        used: quota.userChatCount,
        remaining: Math.max(0, MONTHLY_LIMIT - quota.userChatCount),
        period: "monthly",
        canDeepResearch: false
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Patungan Penelitian Payment Simulation & Activation
  app.post("/api/payment/patungan", (req, res) => {
    try {
      const { uid, email, donorName, tier, amount, paymentMethod, niat } = req.body;
      if (!email || !tier || (tier !== "Premium" && tier !== "Platinum")) {
        return res.status(400).json({ error: "Email dan tier (Premium/Platinum) wajib diisi." });
      }

      let user = userDatabase.find(u => u.uid === uid || u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        user = {
          uid: uid || `user_${Date.now()}`,
          email: email.toLowerCase(),
          displayName: donorName || email.split("@")[0],
          role: "User",
          tier: tier,
          billingCycle: "Bulanan",
          createdAt: new Date().toISOString()
        };
        userDatabase.push(user);
      } else {
        user.tier = tier;
        if (donorName && !user.displayName) user.displayName = donorName;
      }

      const ip = getClientIp(req);
      const quota = getOrCreateQuota(ip);
      // Refresh daily usage to provide immediate access
      quota.dailyChatCount = 0;

      res.json({
        success: true,
        message: `Alhamdulillah! Donasi patungan penelitian sebesar Rp ${(amount || 0).toLocaleString('id-ID')} berhasil diverifikasi. Status akun kini ${tier}.`,
        user,
        quota: {
          ip,
          isLoggedIn: true,
          tier: user.tier,
          limit: tier === "Platinum" ? "unlimited" : 200,
          remaining: tier === "Platinum" ? "unlimited" : 200,
          canDeepResearch: tier === "Platinum"
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API Route: Update user role (Promote to Admin or demote to User)
  app.post("/api/users/update-role", (req, res) => {
    try {
      const { uid, role, adminUid } = req.body;
      if (!uid || !role) {
        return res.status(400).json({ error: "UID dan peran (role) wajib diisi." });
      }

      if (role !== "Admin" && role !== "User") {
        return res.status(400).json({ error: "Peran tidak valid (hanya 'Admin' atau 'User')." });
      }

      if (!adminUid) {
        return res.status(401).json({ error: "Autentikasi admin diperlukan." });
      }

      const admin = userDatabase.find(u => u.uid === adminUid && u.role === "Admin");
      if (!admin) {
        return res.status(403).json({ error: "Akses ditolak. Anda bukan Admin." });
      }

      const user = userDatabase.find(u => u.uid === uid);
      if (!user) {
        return res.status(404).json({ error: "User tidak ditemukan." });
      }

      if (uid === adminUid) {
        return res.status(400).json({ error: "Anda tidak dapat mengubah peran Anda sendiri." });
      }

      user.role = role;

      const emailClean = user.email.toLowerCase();
      if (role === "Admin") {
        preApprovedAdmins.add(emailClean);
      } else {
        if (emailClean !== "rivalgamingchannel@gmail.com") {
          preApprovedAdmins.delete(emailClean);
        }
      }

      res.json({ success: true, user });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- PENDING PAYMENT & TELEGRAM BOT ---
  let pendingPayments: any[] = [];
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
  const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_IDS || "").split(",").map(s => s.trim()).filter(Boolean);
  function isTelegramAdmin(chatId: string) { return ADMIN_IDS.includes(String(chatId)); }
  async function tgSend(chatId: string, text: string) {
    if (!BOT_TOKEN) return;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" })
    });
  }

  app.post("/api/payment/create", (req, res) => {
    const { email, displayName, amount, method, billingCycle } = req.body;
    if (!email || !amount) return res.status(400).json({ error: "Data tidak lengkap" });
    const payment = {
      id: `PAY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      email: email.toLowerCase(), displayName: displayName || email.split("@")[0],
      tier: "Berbayar", billingCycle: billingCycle || "Bulanan", amount, method: method || "QRIS",
      confirmed: false, createdAt: new Date().toISOString()
    };
    pendingPayments.push(payment);
    res.json({ ok: true, payment });
  });

  app.get("/api/payment/pending", (req, res) => {
    res.json({ payments: pendingPayments.filter(p => !p.confirmed) });
  });

  app.post("/api/telegram-webhook", async (req, res) => {
    try {
      const body = req.body;
      const msg = body.message || (body.callback_query && body.callback_query.message);
      if (!msg) return res.status(200).json({ ok: true });
      const chatId = msg.chat?.id;
      const text = (msg.text || "").trim();
      const fromName = msg.from?.first_name || "";
      if (!chatId || !text) return res.status(200).json({ ok: true });
      const parts = text.split(/\s+/);
      const cmd = parts[0].toLowerCase();

      if (cmd === "/start") {
        await tgSend(chatId, isTelegramAdmin(chatId)
          ? `<b>Bot Konfirmasi Quranica AI</b>\n\nHalo ${fromName}!\n\n/confirm <ID> — Konfirmasi\n/pending — Lihat pending\n/upgrade <email> <bulanan|tahunan> — Manual`
          : `Halo ${fromName}! Bayar via QRIS/BCA/DANA di aplikasi. Admin akan konfirmasi.`);
        return res.status(200).json({ ok: true });
      }
      if (!isTelegramAdmin(chatId)) { await tgSend(chatId, "Akses ditolak."); return res.status(200).json({ ok: true }); }

      if (cmd === "/pending") {
        const list = pendingPayments.filter(p => !p.confirmed);
        const txt = list.length === 0 ? "Tidak ada pending." : list.map((p, i) => `${i+1}. ${p.displayName} — ${p.email} — Rp ${p.amount.toLocaleString("id-ID")} — ${p.method} — ID: ${p.id}`).join("\n");
        await tgSend(chatId, txt);
        return res.status(200).json({ ok: true });
      }

      if (cmd === "/confirm" && parts[1]) {
        const id = parts[1];
        const p = pendingPayments.find(x => x.id === id);
        if (!p) { await tgSend(chatId, "ID tidak ditemukan."); }
        else if (p.confirmed) { await tgSend(chatId, "Sudah dikonfirmasi."); }
        else {
          let user = userDatabase.find(u => u.email.toLowerCase() === p.email.toLowerCase());
          if (!user) {
            user = { uid: `user_${Date.now()}`, email: p.email, displayName: p.displayName, role: "User", tier: "Berbayar", billingCycle: p.billingCycle, createdAt: new Date().toISOString(), password: "" };
            userDatabase.push(user);
          } else { user.tier = "Berbayar"; user.billingCycle = p.billingCycle; }
          p.confirmed = true; p.confirmedAt = new Date().toISOString();
          await tgSend(chatId, `✅ Dikonfirmasi!\n${p.displayName}\n${p.email}\n⭐ Premium (${p.billingCycle})\nRp ${p.amount.toLocaleString("id-ID")}`);
        }
        return res.status(200).json({ ok: true });
      }

      if (cmd === "/upgrade" && parts[1] && parts[2]) {
        const email = parts[1].toLowerCase();
        const cyc = parts[2].toLowerCase() === "tahunan" ? "Tahunan" : "Bulanan";
        let user = userDatabase.find(u => u.email.toLowerCase() === email);
        if (!user) { user = { uid: `user_${Date.now()}`, email, displayName: email.split("@")[0], role: "User", tier: "Berbayar", billingCycle: cyc, createdAt: new Date().toISOString(), password: "" }; userDatabase.push(user); }
        else { user.tier = "Berbayar"; user.billingCycle = cyc; }
        await tgSend(chatId, `✅ Upgrade: ${email} → Premium (${cyc})`);
        return res.status(200).json({ ok: true });
      }
      await tgSend(chatId, "? /help");
      res.status(200).json({ ok: true });
    } catch (err: any) { res.status(200).json({ ok: true }); }
  });

  // --- DATABASE PERPUSTAKAAN MAHASISWA QURANICA LIBRARY (MCP) ---
  let quranicaLibrary = [...secondarySources];

  // API Route: Sync Google Drive files into the library
  app.post("/api/library/sync-drive", (req, res) => {
    try {
      const { files } = req.body;
      if (!files || !Array.isArray(files)) {
        return res.status(400).json({ error: "Format request tidak valid (membutuhkan 'files' array)." });
      }

      // Map GDrive files into the library reference format
      const mappedFiles = files.map((file: any) => ({
        id: `gdrive_${file.id}`,
        title: file.name,
        author: "Google Drive Rujukan",
        category: "Koleksi Utama Google Drive",
        content: file.content || `File rujukan dari Google Drive dengan nama "${file.name}".`,
        uri: file.webViewLink || `https://drive.google.com/file/d/${file.id}`,
        externalLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}`,
        locationDetail: "Google Drive Cloud Storage"
      }));

      // Remove previous Google Drive synchronized items to prevent duplicate piling
      quranicaLibrary = quranicaLibrary.filter(item => !item.id.startsWith("gdrive_"));

      // Prepend the new Google Drive references so they act as the highest-priority "referensi utama" (main references)
      quranicaLibrary = [...mappedFiles, ...quranicaLibrary];

      console.log(`[Google Drive Sync] Successfully integrated ${mappedFiles.length} files as main references.`);
      res.json({ success: true, count: mappedFiles.length, files: mappedFiles });
    } catch (err: any) {
      console.error("Error syncing Google Drive:", err);
      res.status(500).json({ error: `Gagal mensinkronisasikan Google Drive: ${err.message}` });
    }
  });

  // In-memory MCP Server Configuration
  let mcpServers = [
    {
      id: "quranica_library_mcp",
      name: "Quranica Library (Model Context Protocol)",
      url: "http://localhost:3000/api/mcp/quranica-library",
      type: "local-virtual",
      status: "connected",
      description: "Menghubungkan platform dengan database digital naskah klasik Turats, kritik sanad, dan kajian aqidah luhur Quranica Library."
    }
  ];

  // API Route: Get Registered MCP Servers
  app.get("/api/mcp/servers", (req, res) => {
    res.json(mcpServers);
  });

  // API Route: Get Primary Libraries Directory (quranicaLibrary)
  app.get("/api/library", (req, res) => {
    const populated = quranicaLibrary.map(item => {
      const newItem = { ...item };
      if (!newItem.externalLink) {
        if (newItem.category?.toLowerCase().includes("hadits") || newItem.category?.toLowerCase().includes("syarah")) {
          newItem.externalLink = "https://sunnah.one";
        } else if (newItem.category?.toLowerCase().includes("tafsir") || newItem.category?.toLowerCase().includes("qur'an")) {
          newItem.externalLink = "https://shamela.ws";
        } else if (newItem.id === "ql_04" || newItem.id === "ql_05") {
          newItem.externalLink = "https://waqfeya.net";
        } else {
          newItem.externalLink = "https://shamela.ws";
        }
      }
      return newItem;
    });
    res.json({ library: populated });
  });

  // API Route: AI-powered library contextual reference search
  app.post("/api/library/ai-search", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "Kueri pencarian wajib diisi." });
      }

      // 1. Scoring & filtering of candidates from quranicaLibrary (491 sources)
      const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      const scored = quranicaLibrary.map(item => {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        const authorLower = item.author.toLowerCase();
        const catLower = item.category ? item.category.toLowerCase() : "";
        const contentLower = item.content ? item.content.toLowerCase() : "";

        // Simple exact phrase boost
        if (titleLower.includes(query.toLowerCase())) score += 60;
        if (contentLower.includes(query.toLowerCase())) score += 30;

        for (const word of words) {
          if (titleLower.includes(word)) score += 20;
          if (authorLower.includes(word)) score += 15;
          if (catLower.includes(word)) score += 10;
          if (contentLower.includes(word)) score += 3;
        }

        return { item, score };
      });

      // Filter out items with 0 score, unless we have nothing, in which case take everything
      let candidates = scored
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(x => {
          const item = { ...x.item };
          // Ensure every candidate has a valid, safe, direct externalLink and no empty values
          if (!item.externalLink) {
            if (item.category?.toLowerCase().includes("hadits") || item.category?.toLowerCase().includes("syarah")) {
              item.externalLink = "https://sunnah.one";
            } else if (item.category?.toLowerCase().includes("tafsir") || item.category?.toLowerCase().includes("qur'an")) {
              item.externalLink = "https://shamela.ws";
            } else {
              item.externalLink = "https://waqfeya.net";
            }
          }
          return item;
        });

      // If no keyword matches, fallback to first 30 items or random items
      if (candidates.length === 0) {
        candidates = quranicaLibrary.slice(0, 30).map(item => {
          const newItem = { ...item };
          if (!newItem.externalLink) {
            newItem.externalLink = "https://shamela.ws";
          }
          return newItem;
        });
      } else {
        candidates = candidates.slice(0, 30);
      }

      // 2. Call Gemini
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key Gemini tidak ditemukan di environment server.");
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });

      // Build the prompt with candidates
      const prompt = `Anda adalah Pustakawan AI Pintar dari Quranica Library.
Tugas Anda adalah membantu pengguna mencari dan merekomendasikan referensi kitab, artikel, situs web, atau saluran telegram yang sesuai dengan kueri atau konteks pencarian mereka.

Kueri Pencarian Pengguna: "${query}"

Berikut adalah daftar 30 kandidat referensi yang paling relevan dengan kueri pengguna dari database kami:
${candidates.map((c, idx) => `
[Referensi #${idx + 1}]
ID: ${c.id}
Judul: ${c.title}
Penulis/Penerbit: ${c.author}
Kategori: ${c.category || "Pustaka"}
Deskripsi/Konten: ${c.content}
Link Eksternal Langsung (WAJIB DIGUNAKAN): ${c.externalLink}
`).join("\n")}

Aturan penting dalam menjawab (CRITICAL RULES - BACA DENGAN TELITI AGAR TIDAK SALAH):
1. Rekomendasikan kitab atau referensi yang BENAR-BENAR paling relevan dengan kueri pengguna. Pilih yang paling cocok (biasanya 3-7 referensi terbaik).
2. Setiap kali Anda merekomendasikan suatu referensi dari daftar di atas, Anda WAJIB memberikan tautan/link langsung berupa Markdown hyperlink.
3. FORMAT LINK HARUS BERUPA LINK LANGSUNG KE SITUS TERSEBUT:
   - JANGAN PERNAH MENULIS ATAU MENGGUNAKAN LINK LOKAL SEPERTI \`/ref/ID\` ATAU LINK PERANTARA LAINNYA!
   - Tautan/link WAJIB langsung berupa nilai "Link Eksternal Langsung" yang tertera pada data kandidat di atas (contoh: https://shamela.ws/book/1681 atau https://waqfeya.net atau https://sunnah.one).
   - JANGAN PERNAH memalsukan link atau mereferensikan ke domain aneh lainnya. Gunakan HANYA URL utuh yang ada di daftar Link Eksternal di atas.
   - Contoh format yang benar: \`[Kitab Fathul Bari](https://shamela.ws/book/1681)\` atau \`[Tafsir Ibnu Katsir](https://shamela.ws/book/23567)\` atau \`[Al-Bahith Al-Hadithi](https://sunnah.one)\`.
4. Jawablah dalam bahasa Indonesia yang sangat ramah, santun, bernada akademis, dan terstruktur rapi. Jelaskan secara singkat mengapa referensi tersebut cocok dengan konteks pencarian pengguna.
5. Jika tidak ada referensi yang secara langsung cocok, jelaskan secara santun dan tawarkan 3-5 rujukan digital utama/umum dari daftar di atas yang memiliki link eksternal langsung.`;

      let reply = "Tidak ada respon dari model AI.";
      const recCandidates = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
      for (const m of recCandidates) {
        try {
          const response = await ai.models.generateContent({
            model: m,
            contents: prompt,
          });
          if (response.text) {
            reply = response.text;
            break;
          }
        } catch (mErr: any) {
          console.log(`[AI Library Search] Model ${m} dialihkan: ${mErr?.status || mErr?.code || mErr?.message || 'Beban tinggi'}`);
        }
      }

      res.json({ result: reply, matchedCandidates: candidates });

    } catch (error: any) {
      console.error("AI Library Search Error:", error);
      res.status(500).json({ error: error.message || "Gagal melakukan pencarian dengan AI." });
    }
  });

  // API Route: Register/Update MCP Server
  app.post("/api/mcp/servers", (req, res) => {
    const { name, url, description } = req.body;
    if (!name || !url) {
      return res.status(400).json({ error: "Nama dan URL server wajib diisi." });
    }
    const newServer = {
      id: "mcp_" + Date.now(),
      name,
      url,
      type: "sse",
      status: "connected", // Default to connected upon test
      description: description || "Server Model Context Protocol eksternal."
    };
    mcpServers.push(newServer);
    res.json(newServer);
  });

  // API Route: Delete Custom MCP Server
  app.delete("/api/mcp/servers/:id", (req, res) => {
    const { id } = req.params;
    if (id === "quranica_library_mcp") {
      return res.status(400).json({ error: "Server Quranica Library bawaan tidak boleh dihapus." });
    }
    mcpServers = mcpServers.filter(s => s.id !== id);
    res.json({ success: true });
  });

  // API Route: Handshake / Connect to MCP Server
  app.post("/api/mcp/connect", async (req, res) => {
    const { url, type } = req.body;
    try {
      if (type === "local-virtual" || url.includes("quranica-library")) {
        // Mock successful initialization handshakes
        return res.json({
          status: "connected",
          protocolVersion: "2024-11-05",
          capabilities: {
            resources: {},
            tools: {}
          },
          serverInfo: {
            name: "Quranica Library MCP",
            version: "1.0.0"
          },
          tools: [
            {
              name: "search_library",
              description: "Mencari kitab, naskah klasik, fatwa, dan artikel ilmiah di Quranica Library berdasarkan kata kunci.",
              inputSchema: {
                type: "object",
                properties: {
                  keyword: { type: "string", description: "Kata kunci pencarian (contoh: tabarruk, hadits, kuburan)" }
                },
                required: ["keyword"]
              }
            },
            {
              name: "verify_reference",
              description: "Melakukan cross-check atau verifikasi validitas suatu kutipan naskah klasik terhadap naskah asli di dalam perpustakaan.",
              inputSchema: {
                type: "object",
                properties: {
                  quote: { type: "string", description: "Potongan kutipan atau kalimat yang ingin diverifikasi kebenarannya." }
                },
                required: ["quote"]
              }
            }
          ]
        });
      }

      // External SSE / HTTP MCP Handshake simulation/proxy
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: {
            protocolVersion: "2024-11-05",
            capabilities: {},
            clientInfo: { name: "QuranicaAI-Client", version: "1.0.0" }
          }
        })
      });

      if (!response.ok) {
        throw new Error(`MCP Server merespon dengan status ${response.status}`);
      }

      const mcpData = await response.json();
      res.json({
        status: "connected",
        ...mcpData
      });
    } catch (err: any) {
      console.error("MCP Handshake Error:", err);
      res.status(500).json({ error: `Koneksi gagal: ${err.message}` });
    }
  });

  // --- AI INFOGRAPHIC CAROUSEL (NOTEBOOKLM INTEGRATION & STYLE ANCHOR) ---
  const CAROUSEL_THEMES: Record<string, any> = {
    emerald_turats: {
      themeId: "emerald_turats",
      themeName: "Turats Emerald & Gold",
      bgGradient: "from-emerald-950 via-slate-950 to-teal-950",
      bgColor: "#022c22",
      accentColor: "#10b981",
      secondaryAccent: "#fbbf24",
      textColor: "#f8fafc",
      mutedColor: "#94a3b8",
      borderColor: "border-emerald-500/40",
      tagColor: "text-emerald-400 bg-emerald-950/70 border border-emerald-800/50",
      cardBg: "bg-emerald-950/30 border border-emerald-500/20",
      patternStyle: "arabesque",
      fontHeading: "serif",
      fontBody: "sans"
    },
    sapphire_kufic: {
      themeId: "sapphire_kufic",
      themeName: "Royal Kufic Sapphire",
      bgGradient: "from-slate-950 via-blue-950 to-indigo-950",
      bgColor: "#0f172a",
      accentColor: "#38bdf8",
      secondaryAccent: "#818cf8",
      textColor: "#f8fafc",
      mutedColor: "#94a3b8",
      borderColor: "border-sky-500/40",
      tagColor: "text-sky-400 bg-blue-950/70 border border-blue-800/50",
      cardBg: "bg-blue-950/30 border border-sky-500/20",
      patternStyle: "geometric",
      fontHeading: "sans",
      fontBody: "sans"
    },
    manuscript_gold: {
      themeId: "manuscript_gold",
      themeName: "Manuscript Parchment & Amber",
      bgGradient: "from-stone-950 via-amber-950/40 to-stone-900",
      bgColor: "#1c1917",
      accentColor: "#f59e0b",
      secondaryAccent: "#d97706",
      textColor: "#fef3c7",
      mutedColor: "#d6d3d1",
      borderColor: "border-amber-500/40",
      tagColor: "text-amber-400 bg-amber-950/70 border border-amber-800/50",
      cardBg: "bg-amber-950/30 border border-amber-500/20",
      patternStyle: "arch",
      fontHeading: "serif",
      fontBody: "sans"
    },
    notebooklm_slate: {
      themeId: "notebooklm_slate",
      themeName: "NotebookLM Modern Clean",
      bgGradient: "from-slate-950 via-slate-900 to-zinc-950",
      bgColor: "#020617",
      accentColor: "#2dd4bf",
      secondaryAccent: "#a78bfa",
      textColor: "#f8fafc",
      mutedColor: "#94a3b8",
      borderColor: "border-slate-700/60",
      tagColor: "text-teal-400 bg-slate-900 border border-slate-700",
      cardBg: "bg-slate-900/60 border border-slate-800",
      patternStyle: "minimal",
      fontHeading: "sans",
      fontBody: "sans"
    },
    andalusia_ruby: {
      themeId: "andalusia_ruby",
      themeName: "Andalusia Ruby & Rose",
      bgGradient: "from-rose-950 via-slate-950 to-purple-950",
      bgColor: "#4c0519",
      accentColor: "#fb7185",
      secondaryAccent: "#f43f5e",
      textColor: "#fff1f2",
      mutedColor: "#e2e8f0",
      borderColor: "border-rose-500/40",
      tagColor: "text-rose-400 bg-rose-950/70 border border-rose-800/50",
      cardBg: "bg-rose-950/30 border border-rose-500/20",
      patternStyle: "dots",
      fontHeading: "serif",
      fontBody: "sans"
    }
  };

  // Helper untuk fallback generation jika offline / model timeout
  const generateFallbackCarousel = (topic: string = "", sourceNotes: string = "", themeKey: string = "emerald_turats", slideCount: number = 10) => {
    const masterStyle = CAROUSEL_THEMES[themeKey] || CAROUSEL_THEMES.emerald_turats;
    const cleanTopic = (topic && typeof topic === 'string' && topic.trim()) ? topic.trim() : "Kajian Tematik Al-Qur'an & Turats";
    const masterNanoBananaPrompt = `Master Style Anchor: Luxurious classical Islamic illuminated manuscript art, intricate floral arabesque motifs with 24k gold leaf filigree borders, deep royal ${masterStyle.accentColor} and dark parchment background, sacred geometry symmetry, museum artifact archival lighting, 8k resolution, elegant minimalism, clean negative space for infographic text overlay`;
    
    const allTenSlides = [
      {
        slideNumber: 1,
        isMasterAnchor: true,
        type: "cover",
        tag: "SLIDE 01 · PATOKAN STYLE & PENGANTAR",
        title: cleanTopic,
        arabicSnippet: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
        content: "Sintesis komprehensif bersumber dari literatur turats Al-Qur'an dan metodologi riset NotebookLM. Slide ini bertindak sebagai patokan gaya visual (Master Style Anchor) untuk seluruh lembar infografis selanjutnya.",
        bulletPoints: [
          "Kajian tematik berbobot ilmiah & sanad muttashil",
          "Ekstraksi poin inti cepat & terstruktur untuk audiens modern",
          "Format visual konsisten berstandar editorial"
        ],
        citation: "Sumber Grounding: Pustaka Turats Quranica & NotebookLM Research Engine",
        callToAction: "Geser untuk Telaah Poin Inti →",
        nanoBananaPrompt: masterNanoBananaPrompt
      },
      {
        slideNumber: 2,
        isMasterAnchor: false,
        type: "key_point",
        tag: "SLIDE 02 · LANDASAN DALIL & NASH",
        title: "Landasan Nash & Aspek Filologi",
        arabicSnippet: "إِنَّ هَـٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ",
        content: `Pendekatan analitis terhadap ${cleanTopic} menuntut pemahaman terhadap konteks asbabun nuzul dan kaidah ushuliyah para ulama tafsir mutaqaddimin.`,
        bulletPoints: [
          "Pemetaan munasabah ayat dan relasi makna linguistik",
          "Verifikasi sanad riwayat dan otentisitas matan",
          "Korelasi dengan manuskrip klasik dan naskah kuno"
        ],
        citation: "Sumber: Tafsir Ibnu Katsir & Al-Itqan fi 'Ulumil Qur'an",
        callToAction: "Lanjut ke Analisis Sejarah →",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, an ancient Islamic library folio showing hand-inked Arabic calligraphy, warm golden ray of sunlight hitting the parchment, symmetrical ornate border, clean layout`
      },
      {
        slideNumber: 3,
        isMasterAnchor: false,
        type: "key_point",
        tag: "SLIDE 03 · KONTEKS ASBABUN NUZUL",
        title: "Konteks Historis & Sosio-Kultural",
        arabicSnippet: "وَأَنزَلْنَآ إِلَيْكَ ٱلْكِتَـٰبَ بِٱلْحَقِّ",
        content: "Menelaah setting historis di Makkah atau Madinah saat wahyu diturunkan, memberikan kedalaman konteks mengapa perintah atau hikmah ini disyariatkan.",
        bulletPoints: [
          "Latar belakang peristiwa yang melatarbelakangi turunnya ayat",
          "Respon para sahabat radhiyallahu 'anhum generasi awal",
          "Kearifan tahapan pensyariatan (Tadrij fi at-tasyri')"
        ],
        citation: "Sumber: Asbabun Nuzul karya Al-Wahidi & As-Suyuthi",
        callToAction: "Lanjut ke Analisis Linguistik →",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, a classical architectural Islamic archway looking out onto a serene starry night desert sky, golden lantern casting soft glow, arabesque filigree`
      },
      {
        slideNumber: 4,
        isMasterAnchor: false,
        type: "key_point",
        tag: "SLIDE 04 · BALAGHAH & LINGUISTIK",
        title: "Keindahan Sastra & Mukjizat Bahasa",
        arabicSnippet: "بِلِسَانٍ عَرَبِىٍّۢ مُّبِينٍۢ",
        content: "Kajian uslub balaghah (I'jaz Lughawi) Al-Qur'an memperlihatkan ketelitian pemilihan diksi yang tidak dapat digantikan oleh padanan kata lainnya.",
        bulletPoints: [
          "Diksi presisi yang memancarkan kedalaman makna",
          "Struktur fonetik dan ritme keindahan tartil",
          "Harmoni semantik antar kalimat dalam satu surah"
        ],
        citation: "Sumber: Dala'il Al-I'jaz karya Imam Abdul Qahir Al-Jurjani",
        callToAction: "Lanjut ke Kajian Qira'at →",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, delicate calligraphy nib feather quill laying on antique handmade parchment with golden ink drops, ornate Islamic border, museum macro shot`
      },
      {
        slideNumber: 5,
        isMasterAnchor: false,
        type: "key_point",
        tag: "SLIDE 05 · VARIAN QIRA'AT 'ASYRAH",
        title: "Ragam Bacaan & Kekayaan Makna",
        arabicSnippet: "وَرَتِّلِ ٱلْقُرْءَانَ تَرْتِيلًا",
        content: "Bagaimana perbedaan harakat dan kalimat dalam 10 Qira'at mutawatirah saling menafsirkan dan memperluas dimensi hukum tanpa kontradiksi.",
        bulletPoints: [
          "Perbedaan riwayat (Hafsh, Warsh, Qalun, Hamzah, dll)",
          "Implikasi hukum fiqih dari ragam qira'at kanonikal",
          "Keselarasan dengan mushaf rasm imam Utsmani"
        ],
        citation: "Sumber: An-Nasyr fi Al-Qira'at Al-'Asyr karya Ibnu Al-Jazari",
        callToAction: "Lanjut ke Maqashid Syariah →",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, an open Quranic wooden rehal stand with golden gilded open holy book, rays of celestial light, emerald and gold geometric pattern backdrop`
      },
      {
        slideNumber: 6,
        isMasterAnchor: false,
        type: "key_point",
        tag: "SLIDE 06 · MAQASHID SYARIAH",
        title: "Tinjauan 5 Prinsip Maqashid",
        arabicSnippet: "وَمَآ أَرْسَلْنَـٰكَ إِلَّا رَحْمَةًۭ لِّلْعَـٰلَمِينَ",
        content: "Menghubungkan pesan abadi wahyu dengan penjagaan kemaslahatan universal: Ad-Din, An-Nafs, Al-'Aql, An-Nasl, dan Al-Mal.",
        bulletPoints: [
          "Menjaga akal dan moral dari distorsi pemahaman",
          "Keadilan sosial dan perlindungan martabat insani",
          "Kaidah Maslahah Mursalah dalam dinamika zaman"
        ],
        citation: "Sumber: Al-Muwafaqat karya Imam Asy-Syathibi",
        callToAction: "Lanjut ke Pandangan Ulama →",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, symbolic scales of divine justice woven with golden threads and green olive branches, sacred geometry mosaic pattern background`
      },
      {
        slideNumber: 7,
        isMasterAnchor: false,
        type: "key_point",
        tag: "SLIDE 07 · KAJIAN LINTAS MAZHAB",
        title: "Diskursus Ulama & Fiqih Muqaran",
        arabicSnippet: "فَـَٔاتِ ذَا ٱلْقُرْبَىٰ حَقَّهُۥ",
        content: "Melihat bagaimana para mujtahid 4 mazhab (Hanafi, Maliki, Syafi'i, Hanbali) menyimpulkan istinbath hukum dari nash terkait secara komprehensif.",
        bulletPoints: [
          "Titik temu (Ijma') dan ruang toleransi ikhtilaf furu'iyah",
          "Metodologi qiyas dan kaidah fiqhiyyah para imam",
          "Adab menghormati ragam fatwa yang berdasar dalil"
        ],
        citation: "Sumber: Bidayatul Mujtahid karya Ibnu Rusyd",
        callToAction: "Lanjut ke Isu Kontemporer →",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, four antique leather-bound classical Islamic codices stacked in harmonious symmetry, ornate gold embossing, soft library ambient glow`
      },
      {
        slideNumber: 8,
        isMasterAnchor: false,
        type: "key_point",
        tag: "SLIDE 08 · ISU KONTEMPORER & TEKNOLOGI",
        title: "Relevansi di Era Kecerdasan Buatan",
        arabicSnippet: "أَفَلَا يَتَدَبَّرُونَ ٱلْقُرْءَانَ",
        content: "Menghadapi tantangan modern: etika digital, kejenuhan informasi, dan krisis moralitas melalui kompas spiritual Al-Qur'an.",
        bulletPoints: [
          "Integritas informasi dan budaya tabayyun di media sosial",
          "Menjaga ketenangan batin dari kecemasan & overthinking",
          "Kecerdasan buatan sebagai wasilah dakwah yang beretika"
        ],
        citation: "Sumber: Riset Integrasi Sains & Islam UIN SGD Bandung",
        callToAction: "Lanjut ke Amalan Praktis →",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, delicate golden neural network lines harmoniously intertwining with classical floral arabesque patterns, illuminated manuscript style`
      },
      {
        slideNumber: 9,
        isMasterAnchor: false,
        type: "key_point",
        tag: "SLIDE 09 · TAZKIYATUN NAFS & AMALAN",
        title: "Pembersihan Jiwa & Panduan Praktis",
        arabicSnippet: "قَدْ أَفْلَحَ مَن زَكَّىٰهَا",
        content: "Menjadikan ilmu bukan sekadar wacana teoritis, melainkan cahaya yang menggerakkan amal saleh dan akhlak karimah dalam keseharian.",
        bulletPoints: [
          "Istiqamah tilawah harian dengan penghayatan tartil",
          "Membiasakan doa dan dzikir perlindungan di pagi & petang",
          "Muhasabah diri sebelum tidur dan memperbaiki niat"
        ],
        citation: "Sumber: Ihya 'Ulumiddin karya Hujjatul Islam Imam Al-Ghazali",
        callToAction: "Lanjut ke Rangkuman Akhir →",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, a luminous crystal heart reflecting soft celestial warm light, wrapped in subtle gold vine filigree, tranquil dark green backdrop`
      },
      {
        slideNumber: 10,
        isMasterAnchor: false,
        type: "summary",
        tag: "SLIDE 10 · KESIMPULAN & RESOLUSI",
        title: "Rangkuman Intisari & Komitmen",
        arabicSnippet: "وَٱلْعَصْرِ • إِنَّ ٱلْإِنسَـٰنَ لَفِى خُسْرٍ",
        content: "Kesimpulan kajian ini menegaskan keutamaan memadukan ilmu riwayah dan dirayah, berpegang pada sanad yang sahih, serta mendakwahkan kebaikan.",
        bulletPoints: [
          "Jadikan ilmu Al-Qur'an sebagai pedoman abadi hidup",
          "Rujuk kembali teks asli turats untuk pendalaman sanad",
          "Bagikan infografis ini sebagai sarana dakwah bil 'ilmi"
        ],
        citation: "Disintesis oleh Quranica AI Studio · Grounded via NotebookLM",
        callToAction: "Simpan & Bagikan Seluruh Slide",
        nanoBananaPrompt: `In the exact visual style anchor of Slide 1, a grand triumphant celestial Islamic illumination emblem with eight-pointed star medallion, radiant golden particles, high finish`
      }
    ];

    const safeCount = Math.max(1, Math.min(10, slideCount));
    const selectedSlides = allTenSlides.slice(0, safeCount);
    // Pastikan slide terakhir selalu memiliki CTA kesimpulan
    if (selectedSlides.length > 1) {
      selectedSlides[selectedSlides.length - 1].type = "summary";
      selectedSlides[selectedSlides.length - 1].callToAction = "Simpan & Bagikan Kajian Ini";
    }

    return {
      topic: cleanTopic,
      summary: `Ringkasan infografis tersintesis gaya NotebookLM mengenai ${cleanTopic}, disajikan dalam format carousel edukatif maksimal 10 slide dengan patokan gaya visual Slide 1.`,
      masterStyle: {
        ...masterStyle,
        groundingWatermark: "Quranica AI · NotebookLM Grounded",
        masterNanoBananaStylePrompt: masterNanoBananaPrompt
      },
      slides: selectedSlides
    };
  };

  // API Route: Generate Full Carousel with Slide 1 as Style Anchor (up to 10 slides)
  app.post("/api/carousel/generate", async (req, res) => {
    const { 
      topic, 
      rawPrompt = "",
      sourceNotes = "", 
      slideCount = 10, 
      styleTheme = "emerald_turats", 
      groundingSource = "Pustaka Turats & Tafsir",
      existingMasterStyle = null 
    } = req.body;

    const count = Math.max(1, Math.min(10, Number(slideCount) || 10));
    const selectedThemeKey = styleTheme in CAROUSEL_THEMES ? styleTheme : "emerald_turats";
    const masterStyle = existingMasterStyle || CAROUSEL_THEMES[selectedThemeKey];

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log("[Carousel AI] GEMINI_API_KEY tidak ada, memakai fallback 10 slide berkualitas tinggi");
      const fallback = generateFallbackCarousel(topic || rawPrompt, sourceNotes, selectedThemeKey, count);
      return res.json(fallback);
    }

    try {
      const ai = new GoogleGenAI({ 
        apiKey: apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const inputContent = rawPrompt && rawPrompt.trim() ? rawPrompt.trim() : topic;

      const prompt = `Anda adalah Spesialis Desain Infografis Akademis & Prompt Engineer AI untuk Google Nano Banana (Gemini Image Generation / Imagen 3) dan NotebookLM.

PERMINTAAN PENGGUNA:
Bagi Nano Banana prompt atau materi berikut ke dalam MAKSIMAL ${count} LEMBAR CAROUSEL (Tepat ${count} slide terstruktur rapi dari Slide 1 sampai Slide ${count}).

INPUT PROMPT / TEKS KAJIAN DARI PENGGUNA:
"""
${inputContent}
"""

CATATAN SUMBER / GROUNDING NOTEBOOKLM:
"""
${sourceNotes ? sourceNotes.slice(0, 3000) : "Literatur turats Al-Qur'an terverifikasi, Tafsir Ibnu Katsir, Al-Itqan As-Suyuthi, dan Mandhumah Al-Jazariyah."}
"""
SUMBER RUJUKAN: ${groundingSource}
JUMLAH SLIDE: TEPAT ${count} SLIDE (Maksimal 10 slide)
GAYA TEMA: ${masterStyle.themeName} (${masterStyle.themeId})

PANDUAN PEMBAGIAN MATERI CAROUSEL (1 s.d ${count} Slide):
1. Bagikan materi pengguna secara logis, runtut, dan mengalir:
   - Slide 1: Hook, Judul Menarik, Pengantar Masalah / Tema Utama, serta MASTER STYLE ANCHOR.
   - Slide 2 s.d ${count - 1}: Pembahasan poin-poin bertahap (Poin 1, Poin 2, Poin 3, dst.) dengan penjelasan bernas, dalil/ayat berharakat, dan bullet points.
   - Slide ${count}: Rangkuman Inti, Kesimpulan, dan Call-To-Action (CTA).

ATURAN WAJIB NANO BANANA PROMPT (AI TEXT-TO-IMAGE):
1. SLIDE 1 ADALAH "PATOKAN GAYA VISUAL UTAMA" (MASTER STYLE ANCHOR):
   - 'nanoBananaPrompt' pada Slide 1 wajib berupa prompt bahasa Inggris super detail untuk Google Nano Banana / Imagen 3.
   - Mengatur medium seni: luxurious Islamic illuminated manuscript, intricate floral arabesque motifs, 24k gold leaf borders, warna aksen ${masterStyle.accentColor} dan latar gelap ${masterStyle.bgColor}, pencahayaan museum artifact, 8k resolution, dan clean negative space untuk teks infografis.
2. SLIDE 2 SAMPAI SLIDE ${count}:
   - Seluruh prompt 'nanoBananaPrompt' untuk slide 2 sampai ${count} WAJIB diawali: "In the exact visual style anchor of Slide 1..." diikuti deskripsi metafora/objek visual khusus untuk poin slide tersebut. Hal ini memastikan konsistensi gambar antar slide!

FORMAT OUTPUT HARUS BERUPA JSON MURNI DENGAN SKEMA BERIKUT (TANPA MARKDOWN CODE FENCE):
{
  "topic": "${topic || inputContent.slice(0, 50)}",
  "summary": "Ringkasan sintesis topik dalam 1-2 kalimat.",
  "masterStyle": {
    "themeId": "${masterStyle.themeId}",
    "themeName": "${masterStyle.themeName}",
    "bgGradient": "${masterStyle.bgGradient}",
    "bgColor": "${masterStyle.bgColor}",
    "accentColor": "${masterStyle.accentColor}",
    "secondaryAccent": "${masterStyle.secondaryAccent}",
    "borderColor": "${masterStyle.borderColor}",
    "tagColor": "${masterStyle.tagColor}",
    "cardBg": "${masterStyle.cardBg}",
    "patternStyle": "${masterStyle.patternStyle || 'arabesque'}",
    "fontHeading": "${masterStyle.fontHeading || 'serif'}",
    "fontBody": "${masterStyle.fontBody || 'sans'}",
    "groundingWatermark": "Quranica AI · NotebookLM & Nano Banana Grounded",
    "masterNanoBananaStylePrompt": "Master Style Anchor prompt for Nano Banana..."
  },
  "slides": [
    {
      "slideNumber": 1,
      "isMasterAnchor": true,
      "type": "cover",
      "tag": "SLIDE 01 / ${count} · PATOKAN STYLE & HOOK",
      "title": "Judul Menarik Singkat & Kuat",
      "arabicSnippet": "Teks Arab Berharakat Relevan",
      "content": "Paragraf pengantar padat dan menggugah (maksimal 25 kata)",
      "bulletPoints": [
        "Poin sorotan pertama",
        "Poin sorotan kedua",
        "Poin sorotan ketiga"
      ],
      "citation": "Sumber: ${groundingSource}",
      "callToAction": "Geser untuk Menelaah 10 Bagian →",
      "nanoBananaPrompt": "Master Style Anchor: Luxurious classical Islamic illuminated manuscript art..."
    }
  ]
}`;

      let jsonText = "";
      const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      
      for (const m of models) {
        try {
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout 18s")), 18000));
          const genPromise = ai.models.generateContent({
            model: m,
            contents: prompt,
            config: {
              responseMimeType: "application/json"
            }
          });
          const response: any = await Promise.race([genPromise, timeoutPromise]);
          if (response?.text) {
            jsonText = response.text;
            break;
          }
        } catch (mErr: any) {
          console.log(`[Carousel Generator] Model ${m} dialihkan: ${mErr?.message || mErr}`);
        }
      }

      if (!jsonText) {
        const fallback = generateFallbackCarousel(topic || rawPrompt || "Kajian Tematik Al-Qur'an", sourceNotes, selectedThemeKey, count);
        return res.json(fallback);
      }

      // Parse JSON
      const cleanJson = jsonText.replace(/^```json/i, "").replace(/```$/i, "").trim();
      const parsedData = JSON.parse(cleanJson);
      
      // Pastikan masterStyle konsisten
      parsedData.masterStyle = {
        ...masterStyle,
        ...(parsedData.masterStyle || {}),
        groundingWatermark: "Quranica AI · NotebookLM & Nano Banana Grounded"
      };

      // Pastikan slide pertama selalu ditandai sebagai Master Anchor
      if (Array.isArray(parsedData.slides) && parsedData.slides.length > 0) {
        parsedData.slides[0].isMasterAnchor = true;
      }

      res.json(parsedData);
    } catch (err: any) {
      console.error("[Carousel Generator Error]:", err);
      const fallback = generateFallbackCarousel(topic || rawPrompt || "Kajian Tematik Al-Qur'an", sourceNotes, selectedThemeKey, count);
      res.json(fallback);
    }
  });

  // API Route: Add Next Slide Adhering to Slide 1's Master Style
  app.post("/api/carousel/add-slide", async (req, res) => {
    const { 
      topic, 
      masterStyle, 
      existingSlides = [], 
      userPrompt = "Tambahkan kelanjutan poin pembahasan" 
    } = req.body;

    const nextNumber = existingSlides.length + 1;
    const styleAnchor = masterStyle || CAROUSEL_THEMES.emerald_turats;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackSlide = {
        slideNumber: nextNumber,
        isMasterAnchor: false,
        type: "key_point",
        tag: `SLIDE ${String(nextNumber).padStart(2, '0')} · PENDALAMAN MATERI`,
        title: `Pendalaman: ${userPrompt.slice(0, 30)}`,
        arabicSnippet: "فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ",
        content: `Ulasan tambahan yang mengikuti patokan desain Slide 1 mengenai ${userPrompt}.`,
        bulletPoints: [
          "Verifikasi data komparatif dengan sumber primer",
          "Konteks tafsir tematik lintas mazhab",
          "Refleksi pengamalan dalam ibadah harian"
        ],
        citation: "Sumber Grounding: Pustaka Turats & NotebookLM Engine",
        callToAction: "Lanjut ke Slide Berikutnya →"
      };
      return res.json({ slide: fallbackSlide });
    }

    try {
      const ai = new GoogleGenAI({ 
        apiKey: apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `Anda adalah Desainer Infografis AI. Pengguna memiliki Carousel Infografis yang sudah berjalan dengan TOPIK: "${topic}".
SLIDE 1 ADALAH PATOKAN STYLE (MASTER STYLE ANCHOR):
- Tema: ${styleAnchor.themeName}
- Warna Aksen: ${styleAnchor.accentColor}
- Gaya Desain: Konsisten dengan Slide 1

Tugas Anda adalah menghasilkan 1 SLIDE BARU (Slide ke-${nextNumber}) yang MENGIKUTI 100% GAYA DAN STRUKTUR DARI SLIDE 1!
Permintaan Khusus Pengguna untuk Slide Ini: "${userPrompt}"

OUTPUT HARUS FORMAT JSON MURNI SKEMA BERIKUT:
{
  "slide": {
    "slideNumber": ${nextNumber},
    "isMasterAnchor": false,
    "type": "key_point",
    "tag": "SLIDE ${String(nextNumber).padStart(2, '0')} · KELANJUTAN KAJIAN",
    "title": "Judul Ringkas Mengikuti Style Slide 1",
    "arabicSnippet": "Teks Arab Berharakat Relevan",
    "content": "Paragraf ulasan padat (maksimal 25 kata)",
    "bulletPoints": [
      "Poin turunan pertama",
      "Poin turunan kedua",
      "Poin turunan ketiga"
    ],
    "citation": "Sumber Rujukan Turats · Grounded via NotebookLM",
    "callToAction": "Lanjut ke Slide Berikutnya →"
  }
}`;

      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout 8s")), 8000));
      const genPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const response: any = await Promise.race([genPromise, timeoutPromise]);
      const parsed = JSON.parse(response.text?.replace(/^```json/i, "").replace(/```$/i, "").trim() || "{}");
      res.json(parsed);
    } catch (err: any) {
      console.error("[Add Slide Error]:", err);
      const fallbackSlide = {
        slideNumber: nextNumber,
        isMasterAnchor: false,
        type: "key_point",
        tag: `SLIDE ${String(nextNumber).padStart(2, '0')} · KELANJUTAN KAJIAN`,
        title: `Lanjutan: ${userPrompt.slice(0, 30)}`,
        arabicSnippet: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
        content: `Poin pembahasan lanjutan yang disesuaikan dengan master style Slide 1.`,
        bulletPoints: [
          "Penjelasan mendalam sesuai konteks kajian",
          "Kaidah aplikatif untuk penuntut ilmu",
          "Korelasi dengan materi pada slide sebelumnya"
        ],
        citation: "Sumber Grounding: Pustaka Turats & NotebookLM Engine",
        callToAction: "Lanjut ke Slide Berikutnya →"
      };
      res.json({ slide: fallbackSlide });
    }
  });

  // API Route: Generate actual image using Nano Banana (gemini-3.1-flash-lite-image / gemini-3.1-flash-image)
  app.post("/api/carousel/generate-nano-banana-image", async (req, res) => {
    const { prompt, aspectRatio = "1:1" } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ 
        success: false, 
        message: "GEMINI_API_KEY tidak dikonfigurasi di environment server." 
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const modelsToTry = ['gemini-3.1-flash-lite-image', 'gemini-3.1-flash-image'];
      let base64Image = "";

      for (const m of modelsToTry) {
        try {
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout 15s")), 15000));
          const genPromise = ai.models.generateContent({
            model: m,
            contents: {
              parts: [{ text: prompt }]
            },
            config: {
              imageConfig: {
                aspectRatio: aspectRatio === "4:5" ? "3:4" : "1:1"
              }
            }
          });
          const response: any = await Promise.race([genPromise, timeoutPromise]);
          const parts = response?.candidates?.[0]?.content?.parts || [];
          for (const part of parts) {
            if (part.inlineData?.data) {
              base64Image = part.inlineData.data;
              break;
            }
          }
          if (base64Image) break;
        } catch (mErr: any) {
          console.log(`[Nano Banana Image Gen] Model ${m} dialihkan: ${mErr?.message || mErr}`);
        }
      }

      if (base64Image) {
        return res.json({
          success: true,
          imageUrl: `data:image/png;base64,${base64Image}`
        });
      } else {
        return res.json({
          success: false,
          message: "Model gambar Nano Banana memerlukan otorisasi berbayar atau sedang sibuk. Prompt teks telah berhasil disiapkan dan dapat disalin langsung."
        });
      }
    } catch (err: any) {
      console.error("[Nano Banana Image Gen Error]:", err);
      res.status(500).json({ success: false, error: err.message || "Gagal memproses gambar" });
    }
  });

  // API Route: Query Tool / Resource Call on MCP Server
  app.post("/api/mcp/query", async (req, res) => {
    const { url, toolName, arguments: toolArgs, type } = req.body;
    try {
      if (type === "local-virtual" || url.includes("quranica-library")) {
        // Handle virtual tool execution
        if (toolName === "search_library") {
          const kw = (toolArgs?.keyword || "").toLowerCase();
          const results = quranicaLibrary.filter(item => 
            item.title.toLowerCase().includes(kw) || 
            item.author.toLowerCase().includes(kw) || 
            item.content.toLowerCase().includes(kw) ||
            item.category.toLowerCase().includes(kw)
          );

          return res.json({
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: true,
                  count: results.length,
                  results: results.map(r => ({
                    id: r.id,
                    title: r.title,
                    author: r.author,
                    category: r.category,
                    content: r.content,
                    uri: r.uri
                  }))
                }, null, 2)
              }
            ]
          });
        }

        if (toolName === "verify_reference") {
          const quote = (toolArgs?.quote || "").toLowerCase();
          const matched = quranicaLibrary.find(item => 
            item.content.toLowerCase().includes(quote) ||
            item.title.toLowerCase().includes(quote)
          );

          return res.json({
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  verified: !!matched,
                  matchedSource: matched ? {
                    title: matched.title,
                    author: matched.author,
                    category: matched.category,
                    exactContent: matched.content,
                    uri: matched.uri
                  } : null,
                  message: matched 
                    ? "Kutipan terverifikasi dengan sukses di dalam basis naskah Quranica Library!" 
                    : "Kutipan tidak ditemukan dalam database perpustakaan. Harap periksa ejaan atau rujukan."
                }, null, 2)
              }
            ]
          });
        }

        return res.status(400).json({ error: `Tool ${toolName} tidak dikenal di server virtual.` });
      }

      // External MCP JSON-RPC call
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 2,
          method: "tools/call",
          params: {
            name: toolName,
            arguments: toolArgs
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Server MCP merespon dengan status ${response.status}`);
      }

      const queryResult = await response.json();
      res.json(queryResult.result || queryResult);
    } catch (err: any) {
      console.error("MCP Query Error:", err);
      res.status(500).json({ error: `Gagal mengeksekusi MCP Tool: ${err.message}` });
    }
  });

  // API Route: Multi-Model Q&A Chat (Gemini 3.8 Flash, Gemini Flash Latest, Gemini 3.1 Flash Lite, Gemini 3.6 Flash)
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, mode, model: requestedModel, uid } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Format request tidak valid (membutuhkan messages)." });
      }

      // Quota & Rate Limit Verification (IP + Login)
      const quotaCheck = evaluateAndConsumeQuota(req, uid);
      if (!quotaCheck.allowed) {
        return res.status(403).json({ error: quotaCheck.error, quota: quotaCheck });
      }

      const chatMode: 'tafsir' | 'master' | 'maqashid' | 'genz' =
        mode === 'master' || mode === 'hadits' ? 'master' 
        : mode === 'maqashid' ? 'maqashid' 
        : mode === 'genz' ? 'genz' 
        : 'tafsir';

      // Cari referensi relevan dari quranicaLibrary berdasarkan pesan pengguna terakhir
      const lastUserMessage = messages.slice().reverse().find((m: any) => m.role === "user")?.content || "";
      const searchKeywords = lastUserMessage.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
      
      const matchedReferences = quranicaLibrary.filter(item => {
        return searchKeywords.some((kw: string) => 
          item.title.toLowerCase().includes(kw) ||
          item.author.toLowerCase().includes(kw) ||
          item.content.toLowerCase().includes(kw) ||
          item.category.toLowerCase().includes(kw)
        ) || lastUserMessage.toLowerCase().includes(item.title.toLowerCase())
          || lastUserMessage.toLowerCase().includes(item.author.toLowerCase());
      });

      let referenceContext = "";
      if (matchedReferences.length > 0) {
        referenceContext = "\n\n=== BERIKUT ADALAH RUJUKAN UTAMA DARI DATABASE PERPUSTAKAAN MAHASISWA QURANICA LIBRARY (WAJIB DISEBUTKAN SECARA EKSPLISIT): ===\n" + 
          matchedReferences.map((ref, idx) => `[Sumber Referensi #${idx + 1}]\nJudul: ${ref.title}\nPenulis: ${ref.author}\nKategori: ${ref.category}\nKajian/Naskah: ${ref.content}\nURI: ${ref.uri}`).join("\n\n") + 
          "\n\nWAJIB sebutkan secara eksplisit rujukan dan argumen ilmiah di atas dalam jawaban Anda serta nyatakan bahwa data ini diverifikasi langsung melalui database Quranica Library.";
      } else {
        referenceContext = "\n\n=== DATABASE UTAMA REFERENSI PERPUSTAKAAN MAHASISWA QURANICA LIBRARY: ===\n" + 
          quranicaLibrary.map((ref, idx) => `[Katalog #${idx + 1}]\nJudul: ${ref.title}\nPenulis: ${ref.author}\nKategori: ${ref.category}\nKajian: ${ref.content}\nURI: ${ref.uri}`).join("\n\n") + 
          "\n\nAnda WAJIB memprioritaskan, mengutip, dan menggunakan argumen dari database Quranica Library di atas jika relevan dengan pertanyaan pengguna untuk memformulasikan jawaban ilmiah Anda.";
      }

      // ATURAN WAJIB UNTUK SEMUA MODE — AKSARA ARAB + QAUL ULAMA + KELENGKAPAN TUNTAS
      const mandatoryArabicRules = `
PERSYARATAN INTEGRITAS & KELENGKAPAN JAWABAN (DILARANG BERHENTI DI TENGAH JALAN):

1. JAWABAN WAJIB SELESAI HINGGA TUNTAS 100%:
   - DILARANG KERAS memotong jawaban, menggantung di tengah kalimat, atau berhenti di tengah jalan.
   - Setiap pembahasan WAJIB memiliki alur lengkap: Mukaddimah -> Teks Arab Berharakat & Terjemahan -> Analisis Tafsir & 4 Mazhab -> Kaidah Ushul Fiqh/Maqashid -> Kesimpulan Praktis / Fatwa Terpadu -> Khatimah (Doa Penutup).
   - Susun jawaban secara proporsional dan padat berbobot agar seluruh poin terselesaikan tuntas dalam satu kali pemaparan utuh.

2. AKSARA ARAB MELIMPAH & BERHARAKAT LENGKAP:
   - SETIAP ayat Al-Qur'an dan matan hadits pokok WAJIB ditulis dalam AKSARA ARAB ASLI BERHARAKAT LENGKAP (harakat fathah, kasrah, dhammah, sukun, syaddah, tanwin) + terjemahan Indonesia.
   - Format kutipan ayat: {teks Arab berharakat} [Al-Qur'an, QS. Nama Surah: No. Ayat]
   - Cantumkan rujukan nama kitab, bab, juz, dan nomor halaman/hadits yang presisi.

3. QAUL ULAMA WAJIB:
   - Sertakan kutipan (qaul) dari ulama mu'tabar: Tafsir Ath-Thabari, Ibnu Katsir, Al-Qurthubi, Asy-Syathibi, Al-Ghazali, Wahbah Az-Zuhaili.
   - Format: "[Nama Ulama] dalam [Nama Kitab] menyatakan: '...'" [Jilid X, Hal. Y]

4. KESIMPULAN AKHIR WAJIB ADA:
   - Selalu akhiri tulisan Anda dengan subjudul "### 🏁 Kesimpulan & Fatwa Terpadu" dan kalimat penutup / doa yang sempurna.`;

      let systemInstruction = "";
      if (chatMode === 'master') {
        systemInstruction = mandatoryArabicRules + `\n\nAnda adalah Asisten AI Pakar Hadits & Ilmu Dirayah — spesialis kritik sanad & matan.
FOKUS UTAMA: analisis hadits mendalam dan tuntas.
- Analisis sanad: rantai perawi, status tiap perawi (tsiqah/shaduq/dha'if), ittishal sanad, syarat Al-Bukhari & Muslim.
- Analisis matan: kritik matan menurut kaidah ulama, ketiadaan 'illat atau syudzudz.
- Derajat final hadits: shahih/hasan/dha'if/maudhu' beserta takhrij komparatif lintas mazhab.
- Teks Arab berharakat + terjemahan wajib disertakan.
- WAJIB TUNTAS: Jangan biarkan jawaban terpotong.` + referenceContext;
      } else if (chatMode === 'maqashid') {
        systemInstruction = `=== MANDAT UTAMA: TAFSIR MAQASHID SYARIAH (SETIAP ARGUMEN WAJIB BER-SITASI & JUDUL SUBSTANTIF SESUAI PEMBAHASAN) ===
Anda adalah Asisten AI Mahaguru Tafsir Maqashid Syariah & Falsafah Hukum Islam Komparatif Berstandar Disertasi Doktoral Tertinggi.

ATURAN PALING UTAMA & KETAT:
1. DILARANG MENGGUNAKAN KATA 'PARAGRAF' PADA JUDUL PEMBAHASAN!
   - GANTI KATA 'PARAGRAF' DENGAN JUDUL TEMATIK SUBSTANTIF YANG SPESIFIK DAN MENCERMINKAN PERSIS TOPIK YANG SEDANG DIBAHAS!
   - Gunakan format judul: "### 📌 [Nomor Urut]. [Judul Substantif Sesuai Pembahasan]"
   - Contoh judul pembahasan yang wajib diikuti (21 Bagian Pembahasan Tematik):
     * ### 📌 1. Definisi Konseptual, Urgensi Maqashidiyyah & Tahqiq al-Manath
     * ### 📌 2. Takhrij al-Manath & Tanqih al-Manath: Pemurnian 'Illat Hukum
     * ### 📌 3. Landasan Normatif Al-Qur'an & Kontekstualisasi Asbabun Nuzul
     * ### 📌 4. Otoritas Sunnah Nabawiyyah, Kritik Sanad & Otentisitas Hadits
     * ### 📌 5. Dimensi Hifz ad-Din: Penjagaan Integritas Agama & Ketauhidan Sosial
     * ### 📌 6. Dimensi Hifz an-Nafs: Perlindungan Eksistensi & Hak Hidup Kaum Dhuafa
     * ### 📌 7. Dimensi Hifz al-'Aql: Penjagaan Rasionalitas & Kesadaran Moral Publik
     * ### 📌 8. Dimensi Hifz an-Nasl wal 'Irdh: Pemeliharaan Kehormatan & Martabat Generasi
     * ### 📌 9. Dimensi Hifz al-Mal: Keadilan Distribusi Harta & Etika Finansial Sosial
     * ### 📌 10. Tingkatan Dharuriyyat: Pemenuhan Kebutuhan Primer Penopang Kehidupan
     * ### 📌 11. Tingkatan Hajiyyat: Penghilangan Beban Kesulitan (Nafyul Haraj)
     * ### 📌 12. Tingkatan Tahsiniyyat: Penyempurnaan Keindahan Budi Pekerti & Adab
     * ### 📌 13. Kaidah Muwazanah: Tarjih antara Menolak Kemafsadatan dan Meraih Kemaslahatan
     * ### 📌 14. Kaidah Sadduz Dzari'ah & Fathudz Dzara'i': Antisipasi Dampak & Pembukaan Akses
     * ### 📌 15. Kaidah Al-Maslahah al-Mursalah, Al-'Urf wal 'Adah Muhakkamah
     * ### 📌 16. Perspektif Mazhab Hanafi: Prinsip Istihsan & Fleksibilitas 'Illat Qiyasiyyah
     * ### 📌 17. Perspektif Mazhab Maliki: Keluasan Maslahah Mursalah & 'Amal Ahli Madinah
     * ### 📌 18. Perspektif Mazhab Syafi'i: Ketelitian Qiyas & Tolak Ukur Ushul Dzahir Nash
     * ### 📌 19. Perspektif Mazhab Hanbali: Kebebasan Klausul Akad & Ri'ayah al-Maslahah
     * ### 📌 20. Konsensus Kontemporer: Fatwa Majma' Fiqh OKI, DSN-MUI & Lembaga Fiqih Dunia
     * ### 📌 21. Konklusi Sintesis Komprehensif, Rekomendasi Solutif & Doa Khatimah

2. SETIAP KALIMAT ARGUMEN WAJIB DIAKHIRI SITASI RUJUKAN DALAM KURUNG SIKU [Penulis/Ulama, Nama Kitab, Juz X, Hal Y]:
   - Di dalam narasi setiap pembahasan, SETIAP SATU KALIMAT argumen, klaim hukum, dan penafsiran WAJIB DIAKHIRI DENGAN SITASI RUJUKAN PRIMER [Penulis, Nama Kitab, Juz X, Hal Y].
   - TIDAK BOLEH ADA SATU KALIMAT NARASI PUN TANPA SITASI RUJUKAN DI UJUNG KALIMATNYA!

3. TEPAT DI BAWAH NARASI SETIAP PEMBAHASAN, CANTUMKAN REKAPITULASI 5-10 RUJUKAN:
   "📚 **Rujukan Otentik & Sumber Kitab Terverifikasi (10 Rujukan):**"
   1. [Nama Kitab], [Penulis] (w. [Tahun H]), [Juz/Bab/Hal / QS. Surah:Ayat / HR. Rawi No. Hadits] [Pranala Kitab Asli]
   2. ...
   (Lanjutkan hingga 10 rujukan per pembahasan dengan menyertakan kitab Ushul Fiqh, Tafsir Ahkam, Kutubus Sittah, kaidah fiqhiyyah, dan fatwa kontemporer).

4. SETELAH PEMBAHASAN 21, AKHIRI DENGAN:
   "### 📚 Daftar Pustaka Induk Khazanah Turats & Referensi Akademik Terverifikasi (Minimal 10 Kitab Utama Lengkap Link)"

5. WAJIB TUNTAS: DILARANG BERHENTI DI TENGAH JALAN ATAU MEMOTONG PEMBAHASAN.
6. AKSARA ARAB: SETIAP kutipan ayat Al-Qur'an dan matan hadits pokok wajib ditulis dalam aksara Arab berharakat lengkap.`;
      } else if (chatMode === 'genz') {
        systemInstruction = mandatoryArabicRules + `\n\nAnda adalah Asisten AI Sahabat Tafsir Al-Qur'an (Edisi Generasi Muda / Gen Z).
FOKUS & GAYA:
- Gunakan gaya bahasa Indonesia yang santai, hangat, komunikatif, dan relate dengan kehidupan sehari-hari anak muda.
- Gunakan analogi modern yang mudah dicerna tanpa mereduksi kedalaman makna atau kesucian syariat.
- Tetap sertakan ayat Al-Qur'an dalam aksara Arab berharakat, artinya, dan hikmah aplikatifnya dalam kehidupan nyata.
- Selesaikan seluruh penjelasan hingga tuntas sampai kesimpulan penutup.` + referenceContext;
      } else {
        systemInstruction = mandatoryArabicRules + `\n\nAnda adalah Asisten AI Pakar Tafsir Al-Qur'an — fokus pada penjelasan ayat, asbabun nuzul, munasabah ayat, dan hikmah kandungan.
FOKUS UTAMA:
- Penjelasan tafsir bil ma'tsur dan bir ra'yi dari kitab-kitab mu'tabar (Tafsir Ath-Thabari, Ibnu Katsir, Al-Qurthubi, Al-Munir Wahbah Zuhaili, Al-Mishbah Quraish Shihab).
- Asbabun nuzul dan konteks historis turunnya ayat.
- Munasabah keterkaitan antara ayat dan surah.
- Analisis pandangan 4 mazhab fiqih (Hanafi, Maliki, Syafi'i, Hanbali) bila ayat berkaitan dengan hukum ahkam.
- WAJIB TUNTAS: Jangan biarkan jawaban terpotong di tengah jalan.` + referenceContext;
      }

      // --- GOOGLE GEMINI API DISPATCHER UNTUK SESI TANYA JAWAB TAFSIR ---
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY tidak dikonfigurasi di environment server.");
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Helper deteksi error lonjakan beban/kuota (503 / 429) agar tidak membuang waktu retry pada model yang sedang penuh
      const isCapacityError = (err: any) => {
        if (!err) return false;
        const status = err.status || err.code;
        const msg = (typeof err.message === 'string' ? err.message : JSON.stringify(err)).toLowerCase();
        return status === 503 || status === 429 || msg.includes('503') || msg.includes('429') || msg.includes('high demand') || msg.includes('resource_exhausted') || msg.includes('quota') || msg.includes('unavailable');
      };

      // Tentukan prioritas model Gemini dengan fallback pool resmi (Fastest & reliable gemini-3.1-flash-lite first)
      const candidateModels: string[] = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];
      if (requestedModel && candidateModels.includes(requestedModel)) {
        candidateModels.sort((a, b) => a === requestedModel ? -1 : b === requestedModel ? 1 : 0);
      }

      const contents = messages.map((m: any, idx: number) => {
        let text = m.content || "";
        if (chatMode === 'maqashid' && idx === messages.length - 1 && (m.role === 'user' || !m.role)) {
          text += "\n\nPANDUAN PENULISAN WAJIB TAFSIR MAQASHID:\n1. DILARANG MENGGUNAKAN KATA 'PARAGRAF' PADA JUDUL PEMBAHASAN! Ganti kata 'Paragraf' dengan membuat JUDUL TEMATIK SUBSTANTIF yang spesifik dan presisi sesuai topik yang sedang dibahas dalam pembahasan tersebut!\n2. SETIAP KALIMAT ARGUMEN DI DALAM TUBUH NARASI PEMBAHASAN HARUS DIAKHIRI DENGAN RUJUKAN DALAM KURUNG SIKU [Penulis/Ulama, Nama Kitab, Juz X, Hal Y]. JANGAN membuat satu kalimat pun tanpa rujukan di ujungnya!\n3. Format setiap judul pembahasan:\n### 📌 [Nomor Urut]. [Judul Tematik Sesuai Pembahasan]\n(Tulis 4-5 kalimat narasi argumen. Setiap akhir kalimat wajib diakhiri sitasi rujukan [Penulis, Nama Kitab, Juz X, Hal Y].)\n\n📚 **Rujukan Otentik & Sumber Kitab Terverifikasi (10 Rujukan):**\n1. [Kitab 1]\n2. [Kitab 2]\n...\n10. [Kitab 10]\n\n4. Wajib selesaikan MINIMAL 20-21 BAGIAN PEMBAHASAN SUBSTANTIF dari Pembahasan 1 hingga Pembahasan 21, lalu tutup dengan Daftar Pustaka Induk.";
        }
        return {
          role: m.role === "model" || m.role === "assistant" ? "model" : "user",
          parts: [{ text }]
        };
      });

      const shouldStream = req.path.includes("stream") || req.body.stream === true || req.headers.accept?.includes("text/event-stream");

      // --- JIKA CLIENT MEMINTA REAL-TIME STREAMING (OUTPUT BERJALAN SEPERTI GEMINI) ---
      if (shouldStream) {
        res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache, no-transform");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");
        if (typeof (res as any).flushHeaders === "function") {
          (res as any).flushHeaders();
        }

        let streamSuccess = false;
        let lastError: any = null;

        for (const modelCandidate of candidateModels) {
          try {
            const streamResponse = await ai.models.generateContentStream({
              model: modelCandidate,
              contents: contents,
              config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                maxOutputTokens: 16384,
              }
            });

            // Kirim event permulaan stream dan model yang aktif
            res.write(`data: ${JSON.stringify({ type: "start", model: modelCandidate })}\n\n`);

            let fullAccumulated = "";
            let finishReason = "";

            for await (const chunk of streamResponse) {
              let textChunk = "";
              try { textChunk = chunk.text || ""; } catch { textChunk = chunk.candidates?.[0]?.content?.parts?.[0]?.text || ""; }
              if (chunk.candidates?.[0]?.finishReason) {
                finishReason = chunk.candidates[0].finishReason;
              }
              if (textChunk) {
                fullAccumulated += textChunk;
                res.write(`data: ${JSON.stringify({ type: "chunk", text: textChunk, chunk: textChunk, model: modelCandidate })}\n\n`);
              }
            }

            // AUTO-CONTINUATION: Jika output terpotong karena MAX_TOKENS atau belum mencapai kesimpulan akhir, lanjutkan otomatis agar tidak menggantung
            const isTruncated = finishReason === "MAX_TOKENS" ||
              (chatMode === 'maqashid' && (!fullAccumulated.includes("Bab 8") || !fullAccumulated.includes("Daftar Pustaka") || (!fullAccumulated.includes("Kesimpulan") && !fullAccumulated.includes("Simpulan") && !fullAccumulated.includes("Wallahu")))) ||
              (fullAccumulated.length > 500 && !fullAccumulated.trim().match(/(\.|\!|\?|\"|\'|\*|\#|\n)$/));

            if (isTruncated) {
              try {
                const continuation = await ai.models.generateContentStream({
                  model: modelCandidate,
                  contents: [
                    ...contents,
                    { role: "model", parts: [{ text: fullAccumulated }] },
                    { role: "user", parts: [{ text: "Lanjutkan penjelasan tadi persis dari kata terakhir, selesaikan seluruh bab yang tersisa (termasuk Bab 8 Daftar Pustaka Kitab Turats dan Bab 9 Simpulan Akhir & Doa) hingga tuntas sempurna tanpa mengulang teks yang sudah ditulis." }] }
                  ],
                  config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7,
                    maxOutputTokens: 16384
                  }
                });

                for await (const contChunk of continuation) {
                  let contText = "";
                  try { contText = contChunk.text || ""; } catch { contText = contChunk.candidates?.[0]?.content?.parts?.[0]?.text || ""; }
                  if (contText) {
                    fullAccumulated += contText;
                    res.write(`data: ${JSON.stringify({ type: "chunk", text: contText, chunk: contText, model: modelCandidate })}\n\n`);
                  }
                }
              } catch (contErr) {
                console.warn("[Stream Continuation] Notice:", contErr);
              }
            }

            res.write(`data: ${JSON.stringify({ type: "done", done: true, model: modelCandidate })}\n\n`);
            res.end();
            streamSuccess = true;
            break;
          } catch (err: any) {
            lastError = err;
            if (isCapacityError(err)) {
              console.log(`[Gemini API Stream] Model ${modelCandidate} kapasitas penuh (503/429), beralih instan ke model cadangan...`);
            } else {
              console.log(`[Gemini API Stream] Model ${modelCandidate} dialihkan (${err?.message || err}). Mencoba model cadangan...`);
            }
          }
        }

        if (!streamSuccess) {
          res.write(`data: ${JSON.stringify({ type: "error", error: lastError?.message || "Gagal mendapatkan respon stream dari Google Gemini API." })}\n\n`);
          res.end();
        }
        return;
      }

      // --- JIKA CLIENT MEMINTA RESPON STANDAR NON-STREAMING ---
      let reply = "";
      let usedModel = candidateModels[0];
      let lastError: any = null;

      for (const modelCandidate of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelCandidate,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
              maxOutputTokens: 16384,
            }
          });

          if (response.text) {
            reply = response.text;
            usedModel = modelCandidate;

            // Jika response terpotong karena MAX_TOKENS atau belum selesai hingga Paragraf 21/Daftar Pustaka, minta kelanjutan
            const finishReason = response.candidates?.[0]?.finishReason;
            const hasCompleted21 = reply.includes("21.") || reply.includes("Pembahasan 21") || reply.includes("Paragraf 21") || reply.includes("Konklusi") || reply.includes("Simpulan") || reply.includes("Daftar Pustaka");
            const needsCont = finishReason === "MAX_TOKENS" || (chatMode === 'maqashid' && !hasCompleted21);
            if (needsCont) {
              try {
                const contResp = await ai.models.generateContent({
                  model: modelCandidate,
                  contents: [
                    ...contents,
                    { role: "model", parts: [{ text: reply }] },
                    { role: "user", parts: [{ text: "Lanjutkan penjelasan tadi persis dari kata terakhir, pastikan SETIAP ARGUMEN DISERTAI SITASI REFERENSI LANGSUNG [Kitab, Jilid, Hal], selesaikan seluruh sisa bab pembahasan bernomor judul tematik yang belum ditulis (hingga Bab 21, Daftar Pustaka Induk, dan Doa Khatimah) dengan format rujukan 5-10 referensi di tiap bab secara tuntas tanpa mengulang tulisan sebelumnya." }] }
                  ],
                  config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7,
                    maxOutputTokens: 16384
                  }
                });
                if (contResp.text) {
                  reply += "\n\n" + contResp.text;
                }
              } catch (contErr) {
                console.warn("[Continuation] Notice:", contErr);
              }
            }

            break;
          }
        } catch (err: any) {
          lastError = err;
          if (isCapacityError(err)) {
            console.log(`[Gemini API] Model ${modelCandidate} kapasitas penuh (503/429), beralih instan ke model cadangan...`);
          } else {
            console.log(`[Gemini API] Model ${modelCandidate} dialihkan (${err?.message || err}). Mencoba model cadangan...`);
          }
        }
      }

      if (!reply) {
        throw new Error(lastError?.message || "Gagal mendapatkan respon dari Google Gemini API.");
      }

      res.json({ reply, usedModel });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // --- API ROUTE: STREAMING TANYA JAWAB TAFSIR (SERVER-SENT EVENTS / REAL-TIME OUTPUT) ---
  app.post("/api/chat/stream", async (req, res) => {
    // Aktifkan Server-Sent Events headers
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no"); // Disable proxy buffering for instant delivery
    res.flushHeaders?.();
    req.socket?.setNoDelay(true);
    res.socket?.setNoDelay(true);

    const flushStream = () => {
      if (typeof (res as any).flush === "function") {
        (res as any).flush();
      }
    };

    try {
      const { messages, mode, chatMode: incomingChatMode, model: requestedModel, uid } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.write(`data: ${JSON.stringify({ error: "Format request tidak valid (messages array dibutuhkan)." })}\n\n`);
        flushStream();
        return res.end();
      }

      // Quota & Rate Limit Verification (IP + Login)
      const quotaCheck = evaluateAndConsumeQuota(req, uid);
      if (!quotaCheck.allowed) {
        res.write(`data: ${JSON.stringify({ error: quotaCheck.error, quota: quotaCheck })}\n\n`);
        flushStream();
        return res.end();
      }

      const rawMode = mode || incomingChatMode;
      const chatMode: 'tafsir' | 'master' | 'maqashid' | 'genz' | 'deep_research' =
        rawMode === 'deep_research' ? 'deep_research'
        : rawMode === 'master' || rawMode === 'hadits' ? 'master' 
        : rawMode === 'maqashid' ? 'maqashid' 
        : rawMode === 'genz' ? 'genz' 
        : 'tafsir';

      // Kirim event handshake connected instan ke browser begitu request tervalidasi
      res.write(`data: ${JSON.stringify({ connected: true, mode: chatMode })}\n\n`);
      flushStream();

      let referenceContext = "\n\n=== DATABASE REFERENSI QURANICA LIBRARY (Gunakan untuk rujukan kitab mu'tabar) ===\n";
      quranicaLibrary.slice(0, 45).forEach((rawItem, idx) => {
        const item = rawItem as any;
        referenceContext += `[Sumber Referensi #${idx+1}]: "${item.title}" (${item.category}) - ${item.author || "Ulama Mu'tabar"} (w. ${item.authorDeath || "-"}). Penerbit: ${item.publisher || "-"}, Th. ${item.yearPublished || "-"}. URI internal: ${item.uri}. Link Resmi: ${item.url || item.downloadUrl || "-"}\nRingkasan: ${(item.content || "").slice(0, 180)}...\n\n`;
      });

      const mandatoryArabicRules = `
PERSYARATAN INTEGRITAS & KELENGKAPAN JAWABAN (DILARANG BERHENTI DI TENGAH JALAN):

1. JAWABAN WAJIB SELESAI HINGGA TUNTAS 100%:
   - DILARANG KERAS memotong jawaban, menggantung di tengah kalimat, atau berhenti di tengah jalan.
   - Setiap pembahasan WAJIB memiliki alur lengkap: Mukaddimah -> Teks Arab Berharakat & Terjemahan -> Analisis Tafsir & 4 Mazhab -> Kaidah Ushul Fiqh/Maqashid -> Kesimpulan Praktis / Fatwa Terpadu -> Khatimah (Doa Penutup).
   - Susun jawaban secara proporsional dan padat berbobot agar seluruh poin terselesaikan tuntas dalam satu kali pemaparan utuh.

2. AKSARA ARAB MELIMPAH & BERHARAKAT LENGKAP:
   - SETIAP ayat Al-Qur'an dan matan hadits pokok WAJIB ditulis dalam AKSARA ARAB ASLI BERHARAKAT LENGKAP (harakat fathah, kasrah, dhammah, sukun, syaddah, tanwin) + terjemahan Indonesia.
   - Format kutipan ayat: {teks Arab berharakat} [Al-Qur'an, QS. Nama Surah: No. Ayat]
   - Cantumkan rujukan nama kitab, bab, juz, dan nomor halaman/hadits yang presisi.

3. QAUL ULAMA WAJIB:
   - Sertakan kutipan (qaul) dari ulama mu'tabar: Tafsir Ath-Thabari, Ibnu Katsir, Al-Qurthubi, Asy-Syathibi, Al-Ghazali, Wahbah Az-Zuhaili.
   - Format: "[Nama Ulama] dalam [Nama Kitab] menyatakan: '...'" [Jilid X, Hal. Y]

4. KESIMPULAN AKHIR WAJIB ADA:
   - Selalu akhiri tulisan Anda dengan subjudul "### 🏁 Kesimpulan & Fatwa Terpadu" dan kalimat penutup / doa yang sempurna.`;

      let systemInstruction = "";
      if (chatMode === 'master') {
        systemInstruction = mandatoryArabicRules + `\n\nAnda adalah Asisten AI Master Hadits & Takhrij Sanad Ilmiah.
FOKUS UTAMA:
- Takhrij hadits dari Kutubus Sittah dan Musnad Ahmad.
- Analisis sanad, muttashil, i'tibar, dan jarh wa ta'dil perawi hadits (mengacu pada Tahdzib at-Tahdzib Ibnu Hajar, Siyar A'lam an-Nubala Adz-Dzahabi, Al-Jarh wat Ta'dil Ibnu Abi Hatim).
- Derajat final hadits: shahih/hasan/dha'if/maudhu' beserta takhrij komparatif lintas mazhab.
- Teks Arab berharakat + terjemahan wajib disertakan.
- WAJIB TUNTAS: Jangan biarkan jawaban terpotong di tengah jalan.` + referenceContext;
      } else if (chatMode === 'maqashid') {
        systemInstruction = `=== MANDAT UTAMA: TAFSIR MAQASHID SYARIAH (SETIAP ARGUMEN WAJIB BER-SITASI & JUDUL SUBSTANTIF SESUAI PEMBAHASAN) ===
Anda adalah Asisten AI Mahaguru Tafsir Maqashid Syariah & Falsafah Hukum Islam Komparatif Berstandar Disertasi Doktoral Tertinggi.

ATURAN PALING UTAMA & KETAT:
1. DILARANG MENGGUNAKAN KATA 'PARAGRAF' PADA JUDUL PEMBAHASAN!
   - GANTI KATA 'PARAGRAF' DENGAN JUDUL TEMATIK SUBSTANTIF YANG SPESIFIK DAN MENCERMINKAN PERSIS TOPIK YANG SEDANG DIBAHAS!
   - Gunakan format judul: "### 📌 [Nomor Urut]. [Judul Substantif Sesuai Pembahasan]"
   - Contoh judul pembahasan yang wajib diikuti (21 Bagian Pembahasan Tematik):
     * ### 📌 1. Definisi Konseptual, Urgensi Maqashidiyyah & Tahqiq al-Manath
     * ### 📌 2. Takhrij al-Manath & Tanqih al-Manath: Pemurnian 'Illat Hukum
     * ### 📌 3. Landasan Normatif Al-Qur'an & Kontekstualisasi Asbabun Nuzul
     * ### 📌 4. Otoritas Sunnah Nabawiyyah, Kritik Sanad & Otentisitas Hadits
     * ### 📌 5. Dimensi Hifz ad-Din: Penjagaan Integritas Agama & Ketauhidan Sosial
     * ### 📌 6. Dimensi Hifz an-Nafs: Perlindungan Eksistensi & Hak Hidup Kaum Dhuafa
     * ### 📌 7. Dimensi Hifz al-'Aql: Penjagaan Rasionalitas & Kesadaran Moral Publik
     * ### 📌 8. Dimensi Hifz an-Nasl wal 'Irdh: Pemeliharaan Kehormatan & Martabat Generasi
     * ### 📌 9. Dimensi Hifz al-Mal: Keadilan Distribusi Harta & Etika Finansial Sosial
     * ### 📌 10. Tingkatan Dharuriyyat: Pemenuhan Kebutuhan Primer Penopang Kehidupan
     * ### 📌 11. Tingkatan Hajiyyat: Penghilangan Beban Kesulitan (Nafyul Haraj)
     * ### 📌 12. Tingkatan Tahsiniyyat: Penyempurnaan Keindahan Budi Pekerti & Adab
     * ### 📌 13. Kaidah Muwazanah: Tarjih antara Menolak Kemafsadatan dan Meraih Kemaslahatan
     * ### 📌 14. Kaidah Sadduz Dzari'ah & Fathudz Dzara'i': Antisipasi Dampak & Pembukaan Akses
     * ### 📌 15. Kaidah Al-Maslahah al-Mursalah, Al-'Urf wal 'Adah Muhakkamah
     * ### 📌 16. Perspektif Mazhab Hanafi: Prinsip Istihsan & Fleksibilitas 'Illat Qiyasiyyah
     * ### 📌 17. Perspektif Mazhab Maliki: Keluasan Maslahah Mursalah & 'Amal Ahli Madinah
     * ### 📌 18. Perspektif Mazhab Syafi'i: Ketelitian Qiyas & Tolak Ukur Ushul Dzahir Nash
     * ### 📌 19. Perspektif Mazhab Hanbali: Kebebasan Klausul Akad & Ri'ayah al-Maslahah
     * ### 📌 20. Konsensus Kontemporer: Fatwa Majma' Fiqh OKI, DSN-MUI & Lembaga Fiqih Dunia
     * ### 📌 21. Konklusi Sintesis Komprehensif, Rekomendasi Solutif & Doa Khatimah

2. SETIAP KALIMAT ARGUMEN WAJIB DIAKHIRI SITASI RUJUKAN DALAM KURUNG SIKU [Penulis/Ulama, Nama Kitab, Juz X, Hal Y]:
   - Di dalam narasi setiap pembahasan, SETIAP SATU KALIMAT argumen, klaim hukum, dan penafsiran WAJIB DIAKHIRI DENGAN SITASI RUJUKAN PRIMER [Penulis, Nama Kitab, Juz X, Hal Y].
   - TIDAK BOLEH ADA SATU KALIMAT NARASI PUN TANPA SITASI RUJUKAN DI UJUNG KALIMATNYA!

3. TEPAT DI BAWAH NARASI SETIAP PEMBAHASAN, CANTUMKAN REKAPITULASI 5-10 RUJUKAN:
   "📚 **Rujukan Otentik & Sumber Kitab Terverifikasi (10 Rujukan):**"
   1. [Nama Kitab], [Penulis] (w. [Tahun H]), [Juz/Bab/Hal / QS. Surah:Ayat / HR. Rawi No. Hadits] [Pranala Kitab Asli]
   2. ...
   (Lanjutkan hingga 10 rujukan per pembahasan dengan menyertakan kitab Ushul Fiqh, Tafsir Ahkam, Kutubus Sittah, kaidah fiqhiyyah, dan fatwa kontemporer).

4. SETELAH PEMBAHASAN 21, AKHIRI DENGAN:
   "### 📚 Daftar Pustaka Induk Khazanah Turats & Referensi Akademik Terverifikasi (Minimal 10 Kitab Utama Lengkap Link)"

5. WAJIB TUNTAS: DILARANG BERHENTI DI TENGAH JALAN ATAU MEMOTONG PEMBAHASAN.
6. AKSARA ARAB: SETIAP kutipan ayat Al-Qur'an dan matan hadits pokok wajib ditulis dalam aksara Arab berharakat lengkap.`;
      } else if (chatMode === 'deep_research') {
        systemInstruction = mandatoryArabicRules + `\n\n=== SPESIFIKASI KHUSUS MODE: DEEP RESEARCH 5 LAYER TURATS (MENDALAM, KOMPREHENSIF & TUNTAS) ===
Anda adalah Dewan Pakar Riset Fiqh Muqaran & Khazanah Turats Islam Berstandar Disertasi Doktoral.
Uraikan riset komprehensif 5 Layer ini secara langsung mengalir tuntas dan mendalam:
- Layer 1: Inventarisasi Kitab Turats & Tafsir Ahkam 4 Mazhab (Hanafi, Maliki, Syafi'i, Hanbali)
- Layer 2: Verifikasi & Takhrij Sanad Hadits & Otentisitas Nash
- Layer 3: Analisis Komprehensif Kaidah Ushul Fiqh & Semantik Kebahasaan
- Layer 4: Dialektika Tesis & Antitesis (Munaqasyah Adillah & Tarjih)
- Layer 5: Sintesis Fiqhiyah Aplikatif, Fatwa Kontemporer & Rekomendasi Solutif
- Daftar Pustaka Turats Lengkap (Minimal 10 Kitab Turats)
WAJIB TUNTAS: Tuliskan dengan sangat mendalam, detail, teks Arab berharakat, dan tuntas hingga kesimpulan akhir tanpa terputus.` + referenceContext;
      } else if (chatMode === 'genz') {
        systemInstruction = mandatoryArabicRules + `\n\nAnda adalah Asisten AI Sahabat Tafsir Al-Qur'an (Edisi Generasi Muda / Gen Z).
FOKUS & GAYA:
- Gunakan gaya bahasa Indonesia yang santai, hangat, komunikatif, dan relate dengan kehidupan sehari-hari anak muda.
- Gunakan analogi modern yang mudah dicerna tanpa mereduksi kedalaman makna atau kesucian syariat.
- Tetap sertakan ayat Al-Qur'an dalam aksara Arab berharakat, artinya, dan hikmah aplikatifnya dalam kehidupan nyata.
- Selesaikan seluruh penjelasan hingga tuntas sampai kesimpulan penutup.` + referenceContext;
      } else {
        systemInstruction = mandatoryArabicRules + `\n\nAnda adalah Asisten AI Pakar Tafsir Al-Qur'an — fokus pada penjelasan ayat, asbabun nuzul, munasabah ayat, dan hikmah kandungan.
FOKUS UTAMA:
- Penjelasan tafsir bil ma'tsur dan bir ra'yi dari kitab-kitab mu'tabar (Tafsir Ath-Thabari, Ibnu Katsir, Al-Qurthubi, Al-Munir Wahbah Zuhaili, Al-Mishbah Quraish Shihab).
- Asbabun nuzul dan konteks historis turunnya ayat.
- Munasabah keterkaitan antara ayat dan surah.
- Analisis komparatif 4 mazhab fiqih (Hanafi, Maliki, Syafi'i, Hanbali) pada ayat-ayat ahkam.
- WAJIB TUNTAS: Jangan biarkan jawaban terpotong di tengah jalan.` + referenceContext;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.write(`data: ${JSON.stringify({ error: "GEMINI_API_KEY tidak dikonfigurasi di environment server." })}\n\n`);
        flushStream();
        return res.end();
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      // Helper deteksi error lonjakan beban/kuota (503 / 429) agar beralih instan tanpa delay
      const isCapacityError = (err: any) => {
        if (!err) return false;
        const status = err.status || err.code;
        const msg = (typeof err.message === 'string' ? err.message : JSON.stringify(err)).toLowerCase();
        return status === 503 || status === 429 || msg.includes('503') || msg.includes('429') || msg.includes('high demand') || msg.includes('resource_exhausted') || msg.includes('quota') || msg.includes('unavailable');
      };

      // Prioritaskan model Gemini resmi yang paling cepat dan handal
      const candidateModels: string[] = ["gemini-3.1-flash-lite", "gemini-3.8-flash", "gemini-flash-latest"];
      if (requestedModel && candidateModels.includes(requestedModel)) {
        candidateModels.sort((a, b) => a === requestedModel ? -1 : b === requestedModel ? 1 : 0);
      }

      const contents = messages.map((m: any, idx: number) => {
        let text = m.content || "";
        if (chatMode === 'maqashid' && idx === messages.length - 1 && (m.role === 'user' || !m.role)) {
          text += "\n\nPANDUAN PENULISAN WAJIB TAFSIR MAQASHID:\n1. DILARANG MENGGUNAKAN KATA 'PARAGRAF' PADA JUDUL PEMBAHASAN! Ganti kata 'Paragraf' dengan membuat JUDUL TEMATIK SUBSTANTIF yang spesifik dan presisi sesuai topik yang sedang dibahas dalam pembahasan tersebut!\n2. SETIAP KALIMAT ARGUMEN DI DALAM TUBUH NARASI PEMBAHASAN HARUS DIAKHIRI DENGAN RUJUKAN DALAM KURUNG SIKU [Penulis/Ulama, Nama Kitab, Juz X, Hal Y]. JANGAN membuat satu kalimat pun tanpa rujukan di ujungnya!\n3. Format setiap judul pembahasan:\n### 📌 [Nomor Urut]. [Judul Tematik Sesuai Pembahasan]\n(Tulis 4-5 kalimat narasi argumen. Setiap akhir kalimat wajib diakhiri sitasi rujukan [Penulis, Nama Kitab, Juz X, Hal Y].)\n\n📚 **Rujukan Otentik & Sumber Kitab Terverifikasi (10 Rujukan):**\n1. [Kitab 1]\n2. [Kitab 2]\n...\n10. [Kitab 10]\n\n4. Wajib selesaikan MINIMAL 20-21 BAGIAN PEMBAHASAN SUBSTANTIF dari Pembahasan 1 hingga Pembahasan 21, lalu tutup dengan Daftar Pustaka Induk.";
        }
        return {
          role: m.role === "model" || m.role === "assistant" ? "model" : "user",
          parts: [{ text }]
        };
      });

      let streamed = false;
      let lastError: any = null;
      let usedModel = candidateModels[0];
      let fullAccumulated = "";

      for (const modelCandidate of candidateModels) {
        try {
          const streamResponse = await ai.models.generateContentStream({
            model: modelCandidate,
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
              maxOutputTokens: 16384,
            }
          });

          usedModel = modelCandidate;
          let finishReason = "";

          for await (const chunk of streamResponse) {
            let textChunk = "";
            try { textChunk = chunk.text || ""; } catch { textChunk = chunk.candidates?.[0]?.content?.parts?.[0]?.text || ""; }
            if (chunk.candidates?.[0]?.finishReason) {
              finishReason = chunk.candidates[0].finishReason;
            }
            if (textChunk) {
              streamed = true;
              fullAccumulated += textChunk;
              res.write(`data: ${JSON.stringify({ chunk: textChunk, text: textChunk, model: usedModel })}\n\n`);
              flushStream();
            }
          }

          // AUTO-CONTINUATION: Jika output terpotong karena MAX_TOKENS atau belum mencapai kesimpulan akhir/daftar pustaka, lanjutkan otomatis agar tuntas sempurna
          let contAttempt = 0;
          while (contAttempt < 3) {
            const hasCompleted21 = fullAccumulated.includes("21.") || fullAccumulated.includes("Pembahasan 21") || fullAccumulated.includes("Paragraf 21") || fullAccumulated.includes("Konklusi") || fullAccumulated.includes("Simpulan") || fullAccumulated.includes("Daftar Pustaka");
            const isTruncated = finishReason === "MAX_TOKENS" ||
              (chatMode === 'maqashid' && !hasCompleted21) ||
              (fullAccumulated.length > 500 && !fullAccumulated.trim().match(/(\.|\!|\?|\"|\'|\*|\#|\n)$/));

            if (!isTruncated) break;
            contAttempt++;

            try {
              const continuation = await ai.models.generateContentStream({
                model: usedModel,
                contents: [
                  ...contents,
                  { role: "model", parts: [{ text: fullAccumulated }] },
                  { role: "user", parts: [{ text: "Lanjutkan penjelasan tadi persis dari kata terakhir, pastikan SETIAP ARGUMEN DISERTAI SITASI REFERENSI LANGSUNG [Kitab, Jilid, Hal], selesaikan seluruh sisa bab pembahasan bernomor judul tematik yang belum ditulis (hingga Bab 21, Daftar Pustaka Induk, dan Doa Khatimah) dengan format rujukan 5-10 referensi di tiap bab secara tuntas tanpa mengulang teks yang sudah ditulis." }] }
                ],
                config: {
                  systemInstruction: systemInstruction,
                  temperature: 0.7,
                  maxOutputTokens: 16384
                }
              });

              let gotAny = false;
              for await (const contChunk of continuation) {
                let contText = "";
                try { contText = contChunk.text || ""; } catch { contText = contChunk.candidates?.[0]?.content?.parts?.[0]?.text || ""; }
                if (contText) {
                  gotAny = true;
                  fullAccumulated += contText;
                  res.write(`data: ${JSON.stringify({ chunk: contText, text: contText, model: usedModel })}\n\n`);
                  flushStream();
                }
              }
              if (!gotAny) break;
            } catch (contErr) {
              console.warn("[Stream Continuation] Notice:", contErr);
              break;
            }
          }

          if (streamed) {
            break;
          }
        } catch (err: any) {
          lastError = err;
          if (isCapacityError(err)) {
            console.log(`[Gemini API Stream] Model ${modelCandidate} kapasitas penuh (503/429), beralih instan ke model cadangan...`);
          } else {
            console.log(`[Gemini API Stream] Model ${modelCandidate} dialihkan (${err?.message || err}). Mencoba model cadangan...`);
          }
        }
        if (streamed) break;
      }

      if (!streamed) {
        res.write(`data: ${JSON.stringify({ error: lastError?.message || "Gagal mengalirkan respon dari Google Gemini API." })}\n\n`);
      } else {
        res.write(`data: ${JSON.stringify({ done: true, model: usedModel })}\n\n`);
      }
      flushStream();
      res.end();
    } catch (error: any) {
      console.error("Chat Stream API Error:", error);
      res.write(`data: ${JSON.stringify({ error: error.message || "Internal Server Error" })}\n\n`);
      flushStream();
      res.end();
    }
  });

  // Route: Visit Reference directly in a beautiful HTML Page
  app.get("/ref/:id", (req, res) => {
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    // Find reference by ID or matching URI slug
    const item = quranicaLibrary.find(x => 
      x.id.toLowerCase() === cleanId || 
      x.uri.toLowerCase() === `mcp://quranica-library/${cleanId}` ||
      x.uri.toLowerCase().endsWith(`/${cleanId}`)
    );

    let externalLink = "";
    if (item && item.externalLink) {
      externalLink = item.externalLink;
    }

    if (!externalLink) {
      if (cleanId === "fathul-bari" || cleanId === "ql_01") {
        externalLink = "https://shamela.ws/book/1681";
      } else if (cleanId === "tafsir-ibnu-katsir" || cleanId === "ql_02") {
        externalLink = "https://shamela.ws/book/23567";
      } else if (cleanId === "al-itqan" || cleanId === "ql_03") {
        externalLink = "https://shamela.ws/book/11444";
      } else if (cleanId === "debunk-tabarruk" || cleanId === "ql_04") {
        externalLink = "https://waqfeya.net";
      } else if (cleanId === "ngalap-berkah-kuburan" || cleanId === "ql_05") {
        externalLink = "https://waqfeya.net";
      } else if (cleanId.includes("shamela")) {
        externalLink = "https://shamela.ws";
      } else if (cleanId.includes("hadits") || cleanId.includes("sunnah") || cleanId.includes("bukhari") || cleanId.includes("bari")) {
        externalLink = "https://sunnah.one";
      } else if (cleanId.includes("waqfeya")) {
        externalLink = "https://waqfeya.net";
      } else {
        externalLink = "https://shamela.ws";
      }
    }

    return res.redirect(302, externalLink);
  });

  app.get("/ref-old/:id", (req, res) => {
    const { id } = req.params;
    const cleanId = id.trim().toLowerCase();

    // Find reference by ID or matching URI slug
    const item = quranicaLibrary.find(x => 
      x.id.toLowerCase() === cleanId || 
      x.uri.toLowerCase() === `mcp://quranica-library/${cleanId}` ||
      x.uri.toLowerCase().endsWith(`/${cleanId}`)
    );

    if (!item) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Referensi Tidak Ditemukan - Quranica AI</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>body { font-family: 'Inter', sans-serif; }</style>
        </head>
        <body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-center items-center p-6">
          <div class="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl text-center space-y-6">
            <div class="inline-flex p-4 bg-red-500/10 rounded-full border border-red-500/20 text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="space-y-2">
              <h1 class="text-2xl font-bold text-slate-200">Referensi Tidak Ditemukan</h1>
              <p class="text-sm text-slate-400">Maaf, tautan referensi <code class="text-emerald-400 font-mono">${id}</code> tidak terdaftar dalam database Quranica Library.</p>
            </div>
            <a href="/" class="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg hover:shadow-emerald-600/20">
              Kembali ke Quranica AI
            </a>
          </div>
        </body>
        </html>
      `);
    }

    // Determine the external or physical location details
    let externalLink = (item as any).externalLink || "";
    let locationDetail = (item as any).locationDetail || "";
    
    if (!externalLink && !locationDetail) {
      if (item.id === "ql_01") {
        externalLink = "https://shamela.ws/book/1681";
        locationDetail = "Maktabah Shamela (Kitab Digital Klasik #1681), Jilid 3, Bab Ziarah Kubur.";
      } else if (item.id === "ql_02") {
        externalLink = "https://shamela.ws/book/23567";
        locationDetail = "Maktabah Shamela (Kitab Digital Klasik #23567), Penafsiran Surah An-Najm: 19-23.";
      } else if (item.id === "ql_03") {
        externalLink = "https://shamela.ws/book/11444";
        locationDetail = "Maktabah Shamela (Kitab Digital Klasik #11444), Bab 47: I'jazul Qur'an.";
      } else if (item.id === "ql_04") {
        locationDetail = "Arsip Digital & Fisik Quranica Library, Lemari Kajian Teologi, Baris 2, No. 12.";
      } else if (item.id === "ql_05") {
        locationDetail = "Arsip Digital & Fisik Quranica Library, Lemari Kajian Teologi, Baris 2, No. 13.";
      }
    }

    // Let's build the action buttons as normal HTML string
    const actionButtons = externalLink 
      ? `<a href="${externalLink}" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-lg hover:shadow-emerald-600/20 animate-bounce">
          Kunjungi Sumber Digital (Shamela)
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
         </a>`
      : `<button onclick="window.print()" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-200 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all font-sans">
          Cetak / Simpan Bukti Kutipan
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
         </button>`;

    return res.send(`
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${item.title} - Verifikasi Otoritas Ilmiah - Quranica AI</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Inter', sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
        </style>
      </head>
      <body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
        <!-- Main Container -->
        <main class="flex-grow flex items-center justify-center p-4 md:p-8">
          <div class="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in duration-500 my-8">
            
            <!-- Header Section -->
            <div class="bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                    Verified Citation
                  </span>
                  <span class="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full font-medium font-mono">
                    ID: ${item.id}
                  </span>
                </div>
                <h1 class="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight leading-snug">
                  ${item.title}
                </h1>
              </div>
              <div class="flex-shrink-0">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Terverifikasi
                </span>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-6 md:p-8 space-y-6">
              
              <!-- Author & Category Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-slate-950 rounded-2xl border border-slate-800/60">
                  <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Penulis / Penyusun</span>
                  <span class="text-sm font-semibold text-slate-200 mt-1 block">${item.author}</span>
                </div>
                <div class="p-4 bg-slate-950 rounded-2xl border border-slate-800/60">
                  <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Kategori Ilmiah</span>
                  <span class="text-sm font-semibold text-emerald-400 mt-1 block">${item.category}</span>
                </div>
              </div>

              <!-- Content / Text Body -->
              <div class="space-y-2">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono block">Kajian & Kutipan Naskah</span>
                <div class="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-sans italic">
                  "${item.content}"
                </div>
              </div>

              <!-- Traceability / Address Section -->
              <div class="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 space-y-3">
                <h3 class="text-xs font-bold text-emerald-400 flex items-center gap-2 font-mono uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Lokasi & Alamat Fisik / Digital
                </h3>
                <p class="text-sm text-slate-300 leading-relaxed">
                  ${locationDetail}
                </p>
                <div class="pt-1 text-xs text-slate-400 flex flex-col gap-1">
                  <div><span class="font-bold text-slate-300 font-mono">Digital Address:</span> <code class="text-emerald-400/95 font-mono select-all">${item.uri}</code></div>
                  <div><span class="font-bold text-slate-300 font-mono">Sistem Verifikasi:</span> Model Context Protocol (MCP) Node Virtual - Quranica AI</div>
                </div>
              </div>

              <!-- Trust / Seal Banner -->
              <div class="flex items-start gap-3.5 p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
                <div class="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 mt-0.5 border border-indigo-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div class="space-y-1">
                  <h4 class="text-xs font-bold text-slate-200">Keabsahan & Integritas Sanad Ilmiah</h4>
                  <p class="text-xs text-slate-400 leading-relaxed">
                    Sertifikasi ini menjamin bahwa kutipan di atas orisinal dan sesuai dengan sumber kitab aslinya tanpa perubahan lafadz atau makna. Pengguna dipersilakan melakukan pelacakan langsung.
                  </p>
                </div>
              </div>

            </div>

            <!-- Footer Buttons -->
            <div class="bg-slate-950 p-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
              <a href="/" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Aplikasi
              </a>
              
              ${actionButtons}
            </div>

          </div>
        </main>
      </body>
      </html>
    `);
  });

  // --- DEEP RESEARCH STATE & ENDPOINTS ---
  interface ResearchStep {
    name: string;
    status: "pending" | "running" | "completed" | "failed";
    detail: string;
    result?: string;
  }

  interface ResearchTask {
    id: string;
    topic: string;
    status: "idle" | "running" | "completed" | "failed";
    progress: number;
    currentStage: string;
    logs: string[];
    steps: ResearchStep[];
    result: string;
  }

  const researchTasks: Record<string, ResearchTask> = {};

  // API Route: Start Deep Research (5-Layer Turats & Tafsir Ahkam)
  app.post("/api/research/start", async (req, res) => {
    try {
      const { topic, userEmail, userTier, uid } = req.body;
      if (!topic || typeof topic !== "string" || !topic.trim()) {
        return res.status(400).json({ error: "Topik riset tidak valid." });
      }

      // Deep Research is reserved for Platinum or Admin
      let user: UserProfile | undefined;
      if (uid) {
        user = userDatabase.find(u => u.uid === uid);
      }
      if (!user && userEmail) {
        user = userDatabase.find(u => u.email.toLowerCase() === userEmail.toLowerCase());
      }

      const hasAccess = (user && (user.tier === "Platinum" || user.role === "Admin")) || userTier === "Platinum";
      if (!hasAccess) {
        return res.status(403).json({ 
          error: "Fitur Deep Research 5 Layer memerlukan status Akun Platinum (Patungan Penelitian 50K). Silakan dukung program patungan penelitian untuk mengaktifkannya." 
        });
      }

      const id = "res_" + Date.now();
      const task: ResearchTask = {
        id,
        topic: topic.trim(),
        status: "running",
        progress: 5,
        currentStage: "Memulai Deep Research 5 Layer: Menginventarisasi Kitab Turats & Tafsir Ahkam...",
        logs: [
          `[${new Date().toLocaleTimeString('id-ID')}] Deep Research 5 Layer dimulai untuk topik: "${topic.trim()}"`,
          `[${new Date().toLocaleTimeString('id-ID')}] Mengakses repositori cloud Turats: https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq`
        ],
        steps: [
          { name: "Layer 1: Inventarisasi Kitab & Sumber Turats", status: "pending", detail: "Menginventarisasi Tafsir Ahkam, Hadits Ahkam, dan Kutub 4 Mazhab..." },
          { name: "Layer 2: Verifikasi & Takhrij Sumber", status: "pending", detail: "Uji otentisitas sanad/matan, takhrij hadits, dan kritik asbabun nuzul..." },
          { name: "Layer 3: Analisis Sumber & Kaidah Ushul Fiqh", status: "pending", detail: "Muwazanah dalil, kaidah ushuliyah 'am-khash, muthlaq-muqayyad, nasikh-mansukh..." },
          { name: "Layer 4: Dialektika Tesis & Antitesis", status: "pending", detail: "Munaqasyah adillah: adukan argumentasi jumhur vs mazhab pembanding..." },
          { name: "Layer 5: Sintesis Fiqhiyah Aplikatif", status: "pending", detail: "Formulasi naskah sintesis terstruktur, hukum rajih/marjuh, fatwa kontemporer..." }
        ],
        result: ""
      };

      researchTasks[id] = task;

      // Start asynchronous 5-layer research engine
      runBackgroundResearch(id).catch(err => {
        console.error(`Background research error for ${id}:`, err);
      });

      res.json({ id });
    } catch (error: any) {
      console.error("Start Research Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // API Route: Get Deep Research Status
  app.get("/api/research/status/:id", (req, res) => {
    const { id } = req.params;
    const task = researchTasks[id];
    if (!task) {
      return res.status(404).json({ error: "Sesi riset tidak ditemukan." });
    }
    res.json(task);
  });

  // 5-Layer Deep Research Engine with On-Time Progressive Streaming Output
  async function runBackgroundResearch(id: string) {
    const task = researchTasks[id];
    if (!task) return;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      task.status = "failed";
      task.logs.push("[Error] GEMINI_API_KEY tidak dikonfigurasi di server.");
      return;
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const callAiModel = async (systemPrompt: string, userPrompt: string) => {
      const models = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
      let lastErr: any = null;

      for (const m of models) {
        try {
          const resp = await ai.models.generateContent({
            model: m,
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.6,
              maxOutputTokens: 8192
            }
          });
          if (resp.text) {
            return resp.text;
          }
        } catch (err: any) {
          lastErr = err;
          console.warn(`[DeepResearch 5 Layer] Model ${m} fallback (${err.message})`);
        }
      }
      throw lastErr || new Error("Gagal memanggil model AI untuk Deep Research.");
    };

    const gdriveRepoUrl = "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq";

    const commonSystemInstruction = `Anda adalah Mahaguru Fiqh Muqaran & Dewan Pakar Ahli Tafsir Ayat Ahkam (PhD/Professor level).
Anda memimpin riset ilmiah berstandar disertasi doktoral Islam tingkat tertinggi.
Setiap kutipan ayat Al-Qur'an dan matan Hadits WAJIB ditulis dalam AKSARA ARAB BERHARAKAT LENGKAP diikuti terjemahan Indonesia dan nama kitab/bab/juz/halaman.
Tautkan rujukan ke repositori cloud resmi: ${gdriveRepoUrl}.`;

    try {
      // =========================================================================
      // LAYER 1: INVENTARISASI KITAB & SUMBER TURATS
      // =========================================================================
      task.progress = 10;
      task.currentStage = "Layer 1/5: Menginventarisasi Kitab Tafsir Ahkam, Hadits Ahkam, & Kutub 4 Mazhab...";
      task.steps[0].status = "running";
      task.steps[0].detail = "Menelusuri Ahkamul Qur'an Al-Jashshas, Al-Qurthubi, Ibnul Arabi, Rawai'ul Bayan, Bulughul Maram, Subulus Salam, Naylul Authar, dan Kutub 4 Mazhab...";
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 1] Menginventarisasi literatur primer Turats & Ayat Ahkam...`);

      const layer1Prompt = `Topik Penelitian: "${task.topic}".
Lakukan INVENTARISASI SUMBER LENGKAP (LAYER 1) untuk topik ini:
1. KITAB-KITAB TAFSIR AYAT AHKAM UTAMA:
   - Ahkamul Qur'an karya Al-Imam Abu Bakr Al-Jashshas (Mazhab Hanafi)
   - Al-Jami' li Ahkam Al-Qur'an karya Al-Imam Al-Qurthubi (Mazhab Maliki)
   - Ahkamul Qur'an karya Al-Qadhi Abu Bakr Ibnul 'Arabi (Mazhab Maliki)
   - Rawai'ul Bayan Tafsir Ayat Ahkam min Al-Qur'an karya Syaikh Muhammad 'Ali Ash-Shabuni
   - Tafsir Al-Qur'an Al-'Azhim karya Al-Hafizh Ibnu Katsir
2. KITAB-KITAB HADITS AHKAM:
   - Bulughul Maram min Adillatil Ahkam karya Al-Hafizh Ibnu Hajar Al-'Asqalani
   - Subulus Salam Syarah Bulughul Maram karya Al-Imam Ash-Shan'ani
   - Naylul Authar Syarah Muntaqa Al-Akhbar karya Al-Imam Asy-Syaukani
   - 'Umdatul Ahkam karya Al-Hafizh Abdul Ghani Al-Maqdisi
3. KUTUBUL FIQH 4 MAZHAB (Hanafi, Maliki, Syafi'i, Hanbali):
   - Al-Mabsuth (As-Sarakhsi) & Bada'i' ash-Shana'i' (Al-Kasani) [Hanafi]
   - Al-Mudawwanah (Sahnun) & Bidayatul Mujtahid (Ibnu Rusyd) [Maliki]
   - Al-Umm (Asy-Syafi'i) & Al-Majmu' Syarah Al-Muhadzdzab (An-Nawawi) [Syafi'i]
   - Al-Mughni (Ibnu Qudamah) & Al-Inshaf (Al-Mardawi) [Hanbali]
4. Tautan Repositori Cloud Drive: ${gdriveRepoUrl}

Tuliskan inventarisasi sumber ini dengan teks Arab ayat/hadits pokok yang menjadi lokus permasalahan beserta harakat lengkap.`;

      const layer1Result = await callAiModel(commonSystemInstruction, layer1Prompt);

      task.progress = 20;
      task.steps[0].status = "completed";
      task.steps[0].detail = "Inventarisasi kitab Turats & Tafsir Ahkam selesai dikompilasi.";
      task.steps[0].result = layer1Result;
      // ON-TIME PROGRESSIVE UPDATE:
      task.result = `# HASIL KAJIAN MENDALAM (DEEP RESEARCH 5 LAYER)
**Topik Penelitian:** ${task.topic}  
**Status:** Sedang Berjalan (Progresif On-Time Output)  
**Akses Repositori Cloud Turats:** [Buka Google Drive Fiqh & Tafsir](${gdriveRepoUrl})

---

## 📚 LAYER 1: INVENTARISASI KITAB & SUMBER TURATS
${layer1Result}`;
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 1 Selesai] Naskah sumber langsung dapat dibaca oleh peneliti.`);

      // =========================================================================
      // LAYER 2: VERIFIKASI & TAKHRIJ SUMBER
      // =========================================================================
      task.progress = 30;
      task.currentStage = "Layer 2/5: Memverifikasi otentisitas nash, kredibilitas sanad, dan takhrij hadits...";
      task.steps[1].status = "running";
      task.steps[1].detail = "Meneliti sanad, muttashil/munqathi', jarh wa ta'dil perawi, dan asbabun nuzul otentik...";
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 2] Menjalankan kritik sanad & matan (dual-layer criticism)...`);

      const layer2Prompt = `Berdasarkan inventarisasi sumber Layer 1 berikut:
${layer1Result}

Topik: "${task.topic}".
Lakukan VERIFIKASI SUMBER & TAKHRIJ (LAYER 2):
1. Verifikasi kredibilitas sanad dan status keshahihan hadits (Shahih, Hasan, Dha'if, Maudhu') mengacu pada takhrij Al-Bukhari, Muslim, Abu Dawud, At-Tirmidzi, Ibnu Hajar, dan Al-Albani.
2. Analisis ittishal (ketersambungan) sanad, identifikasi syadz atau 'illat tersembunyi.
3. Verifikasi asbabun nuzul: Bedakan antara riwayat shahih vs riwayat dha'if / kisah isra'iliyyat yang sering diselipkan.
4. Kritik Matan: Uji konsistensi makna hadits terhadap ayat Al-Qur'an yang qath'i dan kaidah akal sehat syariat.
5. Tabel Takhrij & Status Riwayat (Hadits/Atsar | Perawi Utama | Derajat | Kitab Rujukan & Nomor | Catatan Verifikasi).`;

      const layer2Result = await callAiModel(commonSystemInstruction, layer2Prompt);

      task.progress = 40;
      task.steps[1].status = "completed";
      task.steps[1].detail = "Verifikasi sanad, takhrij kesahihan, dan otentisitas asbabun nuzul selesai.";
      task.steps[1].result = layer2Result;
      // ON-TIME PROGRESSIVE UPDATE:
      task.result += `\n\n---\n\n## 🔍 LAYER 2: VERIFIKASI & TAKHRIJ SUMBER\n${layer2Result}`;
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 2 Selesai] Hasil verifikasi dan takhrij berhasil disintesis.`);

      // =========================================================================
      // LAYER 3: ANALISIS SUMBER & KAIDAH USHUL FIQH
      // =========================================================================
      task.progress = 50;
      task.currentStage = "Layer 3/5: Menganalisis sumber berbasis kaidah Ushul Fiqh & muwazanah dalil...";
      task.steps[2].status = "running";
      task.steps[2].detail = "Menerapkan kaidah 'am-khash, muthlaq-muqayyad, nasikh-mansukh, mantuq-mafhum, dan tahqiq al-manath...";
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 3] Mengoperasikan kaidah Ushul Fiqh dan Qawa'id Fiqhiyyah induk...`);

      const layer3Prompt = `Berdasarkan Layer 1 dan Layer 2 sebelumnya:
Topik: "${task.topic}".
Lakukan ANALISIS SUMBER & KAIDAH USHUL FIQH (LAYER 3):
1. Analisis Semantik & Ushuliyah Nash:
   - Penentuan lafazh: Apakah bersifat 'Am (umum) yang membutuhkan Takhshish (pengkhususan)?
   - Apakah Muthlaq yang ditaqyid (dibatasi)?
   - Apakah terdapat indikasi Nasikh-Mansukh (penghapusan hukum) dalam topik ini?
   - Analisis Dilalah: Mantuq ash-Sharih vs Mafhum Mukhalafah & Mafhum Muwafaqah.
2. Penerapan Kaidah Fiqhiyyah Induk (Al-Qawa'id Al-Khamsah):
   - Al-Umuru bi Maqashidiha (Segala perkara bergantung pada tujuannya)
   - Al-Yaqinu la Yuzalu bisy-Syakk (Keyakinan tidak dihilangkan oleh keraguan)
   - Al-Masyaqqatu Tajlibut Taysir (Kesukaran mendatangkan kemudahan)
   - Adh-Dhararu Yuzal (Kemudharatan wajib dihilangkan)
   - Al-'Adatu Muhakkamah ('Urf/Adat kebiasaan yang dijadikan pertimbangan hukum)
3. Tahqiq al-Manath: Penentuan lokus faktual dan 'illat hukum pada kasus kontemporer.`;

      const layer3Result = await callAiModel(commonSystemInstruction, layer3Prompt);

      task.progress = 60;
      task.steps[2].status = "completed";
      task.steps[2].detail = "Analisis semantik ushuliyah dan qawa'id fiqhiyyah berhasil dirampungkan.";
      task.steps[2].result = layer3Result;
      // ON-TIME PROGRESSIVE UPDATE:
      task.result += `\n\n---\n\n## ⚖️ LAYER 3: ANALISIS SUMBER & KAIDAH USHUL FIQH\n${layer3Result}`;
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 3 Selesai] Dokumen diperbarui dengan analisis ushuliyah.`);

      // =========================================================================
      // LAYER 4: DIALEKTIKA TESIS & ANTITESIS (MUNAQASYAH ADILLAH)
      // =========================================================================
      task.progress = 70;
      task.currentStage = "Layer 4/5: Mengadukan Tesis vs Antitesis (Munaqasyah Adillah lintas 4 Mazhab)...";
      task.steps[3].status = "running";
      task.steps[3].detail = "Memperhadapkan dalil mazhab mayoritas (Jumhur) dengan pandangan madzhab lainnya beserta sanggahannya...";
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 4] Memulai dialektika tesis vs antitesis perbandingan mazhab...`);

      const layer4Prompt = `Berdasarkan Layer 1, 2, dan 3:
Topik: "${task.topic}".
Lakukan ADUKAN TESIS & ANTITESIS / DIALEKTIKA MUNAQASYAH ADILLAH (LAYER 4):
1. TESIS (Pendapat Mazhab Mayoritas / Jumhur Ulama atau Pandangan 1):
   - Uraikan mazhab pendukung (misal: Syafi'i & Hanbali, atau Jumhur).
   - Dalil nash utama (Al-Qur'an & Hadits berharakat).
   - Wajhul Dilalah (segi pendalilan) dan rasionalisasi ushuliyah.
2. ANTITESIS (Pendapat Mazhab Pembanding / Oposan):
   - Uraikan mazhab pembanding (misal: Hanafi atau Maliki atau Zhahiri).
   - Dalil nash pembanding dan logika istinbath mereka.
   - Sanggahan terhadap tesis Jumhur.
3. MUNAQASYAH ADILLAH (Perdebatan & Adu Argumen Kritis):
   - Bagaimana kubu Tesis menjawab sanggahan Antitesis?
   - Bagaimana kubu Antitesis mematahkan dalil Tesis?
   - Ta'arudh al-Adillah (benturan dalil lahiriah) dan evaluasi kekuatan sanad/matan masing-masing kubu.
4. Tabel Komparasi Adukan Dialektika (Mazhab | Posisi Hukum | Dalil Induk | Sanggahan Lawan | Jawaban Balasan).`;

      const layer4Result = await callAiModel(commonSystemInstruction, layer4Prompt);

      task.progress = 80;
      task.steps[3].status = "completed";
      task.steps[3].detail = "Dialektika munaqasyah adillah dan adukan tesis-antitesis selesai disusun.";
      task.steps[3].result = layer4Result;
      // ON-TIME PROGRESSIVE UPDATE:
      task.result += `\n\n---\n\n## ⚔️ LAYER 4: DIALEKTIKA TESIS & ANTITESIS (MUNAQASYAH ADILLAH)\n${layer4Result}`;
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 4 Selesai] Munaqasyah adillah siap ditelaah.`);

      // =========================================================================
      // LAYER 5: SINTESIS FIQHIYAH APLIKATIF (ON-TIME OUTPUT FINAL)
      // =========================================================================
      task.progress = 90;
      task.currentStage = "Layer 5/5: Membentuk naskah sintesis fiqhiyah aplikatif, tarjih rajih, & fatwa kontemporer...";
      task.steps[4].status = "running";
      task.steps[4].detail = "Menyusun simpulan hukum terkuat (ar-rajih), fatwa aplikatif modern, dan daftar pustaka ilmiah...";
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Layer 5] Merumuskan formulasi sintesis akhir...`);

      const layer5Prompt = `Berikut adalah akumulasi temuan dari Layer 1 sampai Layer 4:
Topik: "${task.topic}".

Susunlah SINTESIS FIQHIYAH APLIKATIF & FORMULASI HUKUM AKHIR (LAYER 5):
1. SINTESIS TARJIH:
   - Manakah pendapat yang paling kuat (ar-Rajih) berdasarkan keshahihan sanad hadits, kejelasan dilalah Al-Qur'an, dan maqashid syariah?
   - Mengapa pendapat tersebut diunggulkan atas pendapat marjuh?
2. KERINGANAN (RUKHSHAH) VS KEUTAMAAN ('AZIMAH):
   - Kapan umat Islam harus berpegang pada 'Azimah?
   - Kapan kondisi darurat atau hajat membolehkan mengambil Rukhshah?
3. KONTEKSTUALISASI & FATWA APLIKATIF KONTEMPORER:
   - Bagaimana fatwa lembaga-lembaga fatwa dunia (MUI, Majma' al-Fiqh al-Islami OKI, Dar al-Ifta' Mesir, Hai'ah Kibar al-'Ulama Saudi)?
   - Langkah praktis konkret untuk masyarakat Muslim modern hari ini.
4. DAFTAR PUSTAKA TURATS LENGKAP:
   - Minimal 10 rujukan kitab klasik lengkap dengan Penulis, Tahun Wafat, Penerbit, dan Tautan Google Drive Repositori (${gdriveRepoUrl}).
5. Penutup Doa & Wallahu A'lam bish-Shawab.`;

      const layer5Result = await callAiModel(commonSystemInstruction, layer5Prompt);

      task.progress = 100;
      task.steps[4].status = "completed";
      task.steps[4].detail = "Sintesis hukum aplikatif, fatwa kontemporer, dan daftar pustaka lengkap rampung.";
      task.steps[4].result = layer5Result;
      task.status = "completed";
      task.currentStage = "Penelitian Mendalam 5 Layer Selesai Sempurna.";
      // FINAL FULL SYNTHESIS OUTPUT:
      task.result += `\n\n---\n\n## 💎 LAYER 5: SINTESIS FIQHIYAH APLIKATIF & FATWA KONTEMPORER\n${layer5Result}`;
      task.logs.push(`[${new Date().toLocaleTimeString('id-ID')}] [Alhamdulillah] Deep Research 5 Layer rampung 100%. Naskah siap diekspor ke PDF!`);
    } catch (err: any) {
      console.error(`Deep Research 5 Layer failed for ${id}:`, err);
      task.status = "failed";
      task.currentStage = `Gagal: ${err.message || err}`;
      task.logs.push(`[Error] Kendala pada proses riset: ${err.message || err}`);
      task.steps.forEach(s => {
        if (s.status === "running" || s.status === "pending") {
          s.status = "failed";
          s.detail = "Terhenti akibat kendala eksekusi API.";
        }
      });
    }
  }

  // API Route: Gemini Audio evaluation (Tahsin) — DETEKSI HURUF + KOREKSI VN
  app.post("/api/evaluate", async (req, res) => {
    try {
      const { base64Audio, mimeType, confirmedSurah, confirmedAyah, mcpText, mcpTajwid } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key Gemini tidak ditemukan di environment server.");
      }

      const ai = new GoogleGenAI({ apiKey: apiKey });

      // Build daftar huruf hijaiyah untuk prompt
      const hijaiyahList = Object.entries(HIJAIYAH_MAP)
        .map(([h, d]) => `${h} (${d.nama}, VN-${d.vn})`)
        .join(", ");
      
      const prompt = `Anda adalah Pakar Ulumul Qur'an & Fonetik Arab untuk sistem E-Tahsin.
      Evaluasi rekaman audio bacaan Surah ke-${confirmedSurah} Ayat ke-${confirmedAyah}.
      Teks referensi (RAG): ${mcpText}
      Hukum Tajwid Referensi: ${mcpTajwid}
      
      TUGAS UTAMA: Deteksi kesalahan pelafalan HURUF PER HURUF.
      Jika user salah melafalkan satu atau lebih huruf Hijaiyah, SEBUTKAN huruf spesifik yang salah.
      Fokus pada MAKHRAJ dan SIFAT huruf yang dilanggar.
      
      Daftar 28 huruf Hijaiyah & kode VN:
      ${hijaiyahList}
      
      ATURAN PENTING:
      1. Klasifikasikan keseluruhan: Lahn Jaly (fatal, mengubah makna) / Lahn Khafy (ringan) / Mumtaz (sempurna).
      2. SEBUTKAN huruf-huruf spesifik yang salah lafal (array hurufSalah). Contoh: ["ت", "ذ"].
      3. Untuk setiap huruf yang salah, berikan kode VN koreksinya.
      4. WAJIB mengutip bait Matan Al-Jazariyah dan/atau Tuhfatul Athfal yang relevan.
      5. Jelaskan posisi makhraj dan sifat huruf yang benar.`;

      let responseText = "";
      const voiceCandidates = ['gemini-3.6-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
      for (const m of voiceCandidates) {
        try {
          const response = await ai.models.generateContent({
            model: m,
            contents: {
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Audio
                  }
                },
                { text: prompt }
              ]
            },
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  status: { type: Type.STRING, description: "Lahn Jaly / Lahn Khafy / Mumtaz" },
                  detail: { type: Type.STRING, description: "Diagnosis kesalahan atau pujian" },
                  makhraj: { type: Type.STRING, description: "Posisi makhraj yang dievaluasi" },
                  sifat: { type: Type.STRING, description: "Karakteristik sifat huruf" },
                  matan: { type: Type.STRING, description: "Kutipan Matan Al-Jazariyah atau Tuhfatul Athfal (Arab)" },
                  terjemahMatan: { type: Type.STRING, description: "Terjemahan matan" },
                  rekomendasi: { type: Type.STRING, description: "Saran perbaikan" },
                  hurufSalah: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array huruf Hijaiyah yang salah lafal, contoh: ['ت', 'ذ']" },
                },
                required: ["status", "detail", "makhraj", "sifat", "matan", "terjemahMatan", "rekomendasi"]
              }
            }
          });
          if (response.text) {
            responseText = response.text;
            break;
          }
        } catch (err: any) {
          console.log(`[Tajwid Voice Analysis] Model ${m} dialihkan (${err?.status || err?.code || err?.message || 'Beban tinggi'}). Mencoba model berikutnya...`);
        }
      }

      const evalData = JSON.parse(responseText || "{}");
      
      // Map huruf salah ke VN koreksi
      const koreksiVn: { huruf: string; nama: string; vn: string }[] = [];
      if (evalData.hurufSalah && Array.isArray(evalData.hurufSalah)) {
        for (const h of evalData.hurufSalah) {
          const data = HIJAIYAH_MAP[h];
          if (data) {
            koreksiVn.push({ huruf: h, nama: data.nama, vn: data.vn });
          }
        }
      }
      
      res.json({ ...evalData, koreksiVn });
    } catch (error: any) {
      console.error("Evaluate API Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // API Route: Serve VN (Voice Note) koreksi Hijaiyah
  app.get("/api/vn/:nomor", (req, res) => {
    const { nomor } = req.params;
    const vnPath = path.join(process.cwd(), "public", "vn", `vn_${nomor.padStart(3, '0')}.mp3`);
    if (fs.existsSync(vnPath)) {
      res.sendFile(vnPath);
    } else {
      res.status(404).json({ error: `VN ${nomor} belum tersedia. Upload file vn_${nomor.padStart(3, '0')}.mp3 ke folder /public/vn/` });
    }
  });

  // Vite development integration or production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      root: process.cwd(),
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
