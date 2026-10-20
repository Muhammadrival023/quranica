/**
 * Quranica AI - Official API Client (TypeScript / JavaScript)
 * 
 * Client ini memudahkan integrasi dan cross-check data antara Quranica AI
 * dengan aplikasi eksternal (seperti Quranica Library).
 */

export interface McpServer {
  id: string;
  name: string;
  url: string;
  type: "local-virtual" | "sse" | "http";
  status: "connected" | "disconnected";
  description: string;
}

export interface McpTool {
  name: string;
  description: string;
  inputSchema: any;
}

export interface ResearchStep {
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  detail: string;
  result?: string;
}

export interface ResearchTask {
  id: string;
  topic: string;
  status: "idle" | "running" | "completed" | "failed";
  progress: number;
  currentStage: string;
  logs: string[];
  steps: ResearchStep[];
  result: string;
}

export class QuranicaApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    // Jika berjalan di browser, default ke origin yang sama
    this.baseUrl = baseUrl || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  }

  /**
   * --- 1. MODEL CONTEXT PROTOCOL (MCP) SERVICES ---
   */

  /**
   * Mengambil daftar server MCP yang terdaftar di sistem.
   */
  async getMcpServers(): Promise<McpServer[]> {
    const res = await fetch(`${this.baseUrl}/api/mcp/servers`);
    if (!res.ok) throw new Error("Gagal mengambil daftar server MCP.");
    return res.json();
  }

  /**
   * Mendaftarkan server MCP baru (misalnya Quranica Library).
   */
  async registerMcpServer(name: string, url: string, description?: string): Promise<McpServer> {
    const res = await fetch(`${this.baseUrl}/api/mcp/servers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, url, description })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Gagal mendaftarkan server MCP.");
    }
    return res.json();
  }

  /**
   * Menghapus koneksi server MCP berdasarkan ID.
   */
  async deleteMcpServer(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${this.baseUrl}/api/mcp/servers/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Gagal menghapus server MCP.");
    }
    return res.json();
  }

  /**
   * Melakukan handshake inisialisasi / koneksi ke server MCP.
   */
  async connectMcpServer(url: string, type: string): Promise<any> {
    const res = await fetch(`${this.baseUrl}/api/mcp/connect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, type })
    });
    if (!res.ok) throw new Error("Handshake ke node MCP gagal.");
    return res.json();
  }

  /**
   * Mengeksekusi perintah/tool yang disediakan oleh server MCP tertentu.
   */
  async queryMcpTool(url: string, toolName: string, args: any, type: string): Promise<any> {
    const res = await fetch(`${this.baseUrl}/api/mcp/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, toolName, arguments: args, type })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Eksekusi tool MCP gagal.");
    }
    return res.json();
  }

  /**
   * --- 2. DEEP RESEARCH (KAJIAN MENDALAM) SERVICES ---
   */

  /**
   * Memulai riset atau kajian mendalam akademis baru berdasarkan topik.
   */
  async startDeepResearch(topic: string, userEmail?: string, userTier?: string): Promise<{ id: string }> {
    const res = await fetch(`${this.baseUrl}/api/research/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, userEmail, userTier })
    });
    if (!res.ok) {
      const ct = res.headers.get("content-type") || "";
      const errText = ct.includes("json") ? (await res.json()).error : await res.text().then(t => t.slice(0, 200));
      throw new Error(errText || "Gagal memulai Deep Research.");
    }
    return res.json();
  }

  /**
   * Memonitor status dan progres pengerjaan Deep Research secara real-time.
   */
  async getResearchStatus(id: string): Promise<ResearchTask> {
    const res = await fetch(`${this.baseUrl}/api/research/status/${id}`);
    if (!res.ok) throw new Error("Sesi riset tidak ditemukan.");
    return res.json();
  }

  /**
   * --- 3. CHAT & TANYA JAWAB (GOOGLE GEMINI API) ---
   */

  /**
   * Mengirim pesan ke asisten AI Google Gemini API untuk kajian tafsir, hadits, dan maqashid syariah.
   */
  async sendChatMessage(
    messages: { role: string; content: string }[],
    mode: 'tafsir' | 'master' | 'maqashid' | 'genz' = 'tafsir',
    userTier?: string,
    model: string = 'gemini-3.8-flash'
  ): Promise<{ reply: string; usedModel?: string }> {
    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, mode, userTier: userTier || 'Berbayar', model })
    });
    if (!res.ok) {
      const ct = res.headers.get("content-type") || "";
      const errText = ct.includes("json") ? (await res.json()).error : await res.text().then(t => t.slice(0, 200));
      throw new Error(errText || "Gagal mengirim pesan chat.");
    }
    return res.json();
  }

  /**
   * Streaming pesan chat secara real-time via Server-Sent Events (SSE) layaknya Gemini web.
   */
  async streamChatMessage(
    messages: { role: string; content: string }[],
    mode: 'tafsir' | 'master' | 'maqashid' | 'genz' | 'deep_research' = 'tafsir',
    userTier?: string,
    model: string = 'gemini-3.1-flash-lite',
    onChunk?: (chunk: string, activeModel?: string) => void,
    onDone?: (activeModel?: string) => void,
    onError?: (errorMsg: string) => void,
    uid?: string
  ): Promise<string> {
    const res = await fetch(`${this.baseUrl}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, mode, userTier: userTier || 'Berbayar', model, uid })
    });

    if (!res.ok) {
      const ct = res.headers.get("content-type") || "";
      const errText = ct.includes("json") ? (await res.json()).error : await res.text().then(t => t.slice(0, 200));
      const msg = errText || "Gagal memulai streaming chat.";
      onError?.(msg);
      throw new Error(msg);
    }

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error("Browser tidak mendukung streaming HTTP response.");
    }

    const decoder = new TextDecoder("utf-8");
    let accumulatedText = "";
    let detectedModel = model;
    let buffer = "";
    let isDoneDispatched = false;

    const dispatchDone = (m?: string) => {
      if (!isDoneDispatched) {
        isDoneDispatched = true;
        onDone?.(m || detectedModel);
      }
    };

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        // Split on single newlines to process SSE data frames as soon as they reach the browser
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data:")) {
            const rawJson = trimmed.slice(5).trim();
            if (!rawJson) continue;
            try {
              const payload = JSON.parse(rawJson);
              if (payload.error) {
                onError?.(payload.error);
                throw new Error(payload.error);
              }
              if (payload.connected) {
                // Stream connection handshake established
                if (payload.model) detectedModel = payload.model;
              }
              const chunkText = payload.chunk !== undefined ? payload.chunk : payload.text;
              if (chunkText) {
                accumulatedText += chunkText;
                if (payload.model) detectedModel = payload.model;
                onChunk?.(chunkText, detectedModel);
              }
              if (payload.done) {
                if (payload.model) detectedModel = payload.model;
                dispatchDone(detectedModel);
              }
            } catch (parseErr: any) {
              if (parseErr.message && !parseErr.message.includes("JSON")) {
                throw parseErr;
              }
            }
          }
        }
      }

      // Pastikan sisa buffer terakhir jika ada diproses
      if (buffer.trim()) {
        const trimmed = buffer.trim();
        if (trimmed.startsWith("data:")) {
          const rawJson = trimmed.slice(5).trim();
          if (rawJson) {
            try {
              const payload = JSON.parse(rawJson);
              const chunkText = payload.chunk !== undefined ? payload.chunk : payload.text;
              if (chunkText) {
                accumulatedText += chunkText;
                if (payload.model) detectedModel = payload.model;
                onChunk?.(chunkText, detectedModel);
              }
              if (payload.done) {
                if (payload.model) detectedModel = payload.model;
                dispatchDone(detectedModel);
              }
            } catch {
              // Abaikan sisa buffer tak lengkap
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    dispatchDone(detectedModel);
    return accumulatedText;
  }

  /**
   * --- 4. KUOTA & PATUNGAN PENELITIAN SERVICES ---
   */

  /**
   * Memeriksa kuota chat terkini berdasarkan Alamat IP dan status login pengguna.
   */
  async getQuotaStatus(uid?: string): Promise<{
    ip: string;
    isLoggedIn: boolean;
    tier: "Reguler" | "Premium" | "Platinum" | "Guest";
    limit: number | "unlimited";
    used: number;
    remaining: number | "unlimited";
    period: "lifetime" | "monthly" | "daily" | "unlimited";
    canDeepResearch: boolean;
  }> {
    const url = uid 
      ? `${this.baseUrl}/api/user/quota?uid=${encodeURIComponent(uid)}`
      : `${this.baseUrl}/api/user/quota`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Gagal mengambil status kuota.");
    }
    return res.json();
  }

  /**
   * Mengirimkan konfirmasi infaq / patungan penelitian untuk upgrade akun ke Premium/Platinum.
   */
  async submitPatunganPayment(payload: {
    uid: string;
    email: string;
    donorName?: string;
    tier: "Premium" | "Platinum";
    amount: number;
    paymentMethod: string;
    niat?: string;
  }): Promise<{
    success: boolean;
    user: any;
    quota: any;
    message?: string;
  }> {
    const res = await fetch(`${this.baseUrl}/api/payment/patungan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Gagal memproses donasi patungan penelitian.");
    }
    return res.json();
  }
}

export const apiClient = new QuranicaApiClient();
