import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Send, Sparkles, BookOpen, Scale, ShieldCheck, 
  Layers, Download, Copy, Check, RefreshCw, AlertCircle, HeartHandshake,
  Clock, Database, ArrowRight, ExternalLink, Award, Compass, Search, CheckCircle2
} from 'lucide-react';
import Markdown from 'react-markdown';
import { apiClient, type ResearchTask } from '../services/apiClient';
import { exportDocumentToPdf } from '../utils/pdfExport';
import PaymentGatewayModal from './PaymentGatewayModal';

interface TanyaTafsirSectionProps {
  currentUser?: { uid: string; email: string; displayName?: string; tier?: string } | null;
  onNavigateToFullApp?: (tab: any) => void;
  isDark?: boolean;
}

export default function TanyaTafsirSection({
  currentUser,
  onNavigateToFullApp,
  isDark = true
}: TanyaTafsirSectionProps) {
  const [qaMode, setQaMode] = useState<'tafsir' | 'master' | 'maqashid' | 'genz' | 'deep_research'>('tafsir');
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [activeModel, setActiveModel] = useState('gemini-3.1-flash-lite');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Quota status state
  const [quota, setQuota] = useState<{
    ip: string;
    isLoggedIn: boolean;
    tier: string;
    limit: number | string;
    used: number;
    remaining: number | string;
    period: string;
    canDeepResearch: boolean;
  } | null>(null);

  // Deep Research state
  const [researchTask, setResearchTask] = useState<ResearchTask | null>(null);
  const [isResearchPolling, setIsResearchPolling] = useState(false);

  // Modal Patungan Penelitian state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDefaultTier, setPaymentDefaultTier] = useState<'Premium' | 'Platinum'>('Premium');

  const answerCardRef = useRef<HTMLDivElement>(null);
  const answerScrollRef = useRef<HTMLDivElement>(null);

  // Load quota status from server
  const fetchQuotaStatus = async () => {
    try {
      const data = await apiClient.getQuotaStatus(currentUser?.uid);
      setQuota(data);
    } catch (err) {
      console.warn("Gagal memuat status kuota:", err);
    }
  };

  useEffect(() => {
    fetchQuotaStatus();
  }, [currentUser]);

  // Deep Research Polling Effect (Fast on-time progressive updates)
  useEffect(() => {
    if (!researchTask?.id || !isResearchPolling) return;

    const interval = setInterval(async () => {
      try {
        const updated = await apiClient.getResearchStatus(researchTask.id);
        setResearchTask(updated);

        if (updated.status === 'completed' || updated.status === 'failed') {
          setIsResearchPolling(false);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn("Polling deep research error:", err);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [researchTask?.id, isResearchPolling]);

  const presetQueries = [
    {
      label: "Hukum Wudhu Sentuh Non-Mahram",
      query: "Jelaskan hukum wudhu bagi orang yang bersentuhan kulit antara laki-laki dan perempuan bukan mahram menurut perbandingan 4 mazhab beserta takhrij dalil ayat dan haditsnya.",
      mode: 'tafsir' as const
    },
    {
      label: "Tafsir Ayat Puasa & Illat Hukum (QS 2:183)",
      query: "Tafsir komprehensif QS Al-Baqarah: 183 tentang pensyariatan puasa, asbabun nuzul shahih, 'illat hukum, dan rincian rukhshah bagi yang sakit menurut Ahkamul Qur'an Al-Jashshas dan Al-Qurthubi.",
      mode: 'tafsir' as const
    },
    {
      label: "Maqashid Kripto & Paylater Fintech",
      query: "Analisis Maqashid Syariah mendalam tentang transaksi aset kripto (cryptocurrency) dan fitur Paylater dalam ekonomi digital kontemporer.",
      mode: 'maqashid' as const
    },
    {
      label: "Kritik Sanad & Matan Hadits Niat (HR Bukhari)",
      query: "Takhrij dan kritik sanad hadits 'Innamal a'malu bin niyyat' (HR. Al-Bukhari no. 1): telaah silsilah perawi dari Yahya bin Sa'id al-Anshari, status ittishal, dan kaidah ushuliyahnya.",
      mode: 'master' as const
    },
    {
      label: "Gen Z: Mengatasi Overthinking & Resah Masa Depan",
      query: "Bagaimana cara mengatasi overthinking dan cemas masa depan menurut petunjuk Al-Qur'an dan Sunnah? Jelaskan dengan bahasa hangat, santai, dan analogi relate anak muda.",
      mode: 'genz' as const
    }
  ];

  const handleSubmit = async (e?: React.FormEvent, directPrompt?: string, forcedMode?: 'tafsir' | 'master' | 'maqashid' | 'genz' | 'deep_research') => {
    if (e) e.preventDefault();
    const promptToUse = directPrompt || queryInput;
    const modeToUse = forcedMode || qaMode;

    if (!promptToUse.trim() || isLoading) return;

    setErrorMessage(null);
    setIsLoading(true);
    setStreamingText('');

    // Smooth scroll seketika ke kartu jawaban agar pengguna langsung melihat respon muncul
    setTimeout(() => {
      answerCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);

    // Deep Research permission check if applicable
    if (modeToUse === 'deep_research') {
      if (quota && !quota.canDeepResearch && quota.tier !== 'Platinum' && quota.tier !== 'Admin') {
        setIsLoading(false);
        setErrorMessage("Fitur Deep Research 5 Layer memerlukan akun Platinum (Patungan Penelitian 50K). Silakan dukung patungan penelitian untuk mengaktifkannya.");
        setPaymentDefaultTier('Platinum');
        setShowPaymentModal(true);
        return;
      }

      setResearchTask({
        id: 'realtime-stream',
        topic: promptToUse,
        status: 'running',
        progress: 10,
        currentStage: 'Memulai Deep Research 5 Layer: Menginventarisasi Kitab Turats & Tafsir Ahkam...',
        logs: ['Menginisialisasi Dewan Pakar Fiqh Muqaran...'],
        steps: [
          { name: "Layer 1: Inventarisasi Kitab & Sumber Turats", status: "running", detail: "Mengkatalogkan Tafsir Ahkam & Kutub 4 Mazhab..." },
          { name: "Layer 2: Verifikasi & Takhrij Sumber", status: "pending", detail: "Uji otentisitas nash & kritik sanad..." },
          { name: "Layer 3: Analisis Sumber & Kaidah Ushul Fiqh", status: "pending", detail: "Muwazanah dalil & semantik ushuliyah..." },
          { name: "Layer 4: Dialektika Tesis & Antitesis", status: "pending", detail: "Munaqasyah adillah: adukan argumentasi..." },
          { name: "Layer 5: Sintesis Fiqhiyah Aplikatif", status: "pending", detail: "Formulasi naskah sintesis & fatwa kontemporer..." }
        ],
        result: ''
      });
    }

    // REAL-TIME STREAMING UNTUK SEMUA MODE (Tafsir, Master Hadits, Maqashid, Gen Z, Deep Research)
    try {
      const messages = [{ role: 'user', content: promptToUse }];
      await apiClient.streamChatMessage(
        messages,
        modeToUse as any,
        quota?.tier || 'Reguler',
        'gemini-3.1-flash-lite',
        (chunk, detectedModel) => {
          setStreamingText(prev => {
            const next = prev + chunk;
            if (modeToUse === 'deep_research') {
              const currentLvl = next.includes("Layer 5") ? 5 : next.includes("Layer 4") ? 4 : next.includes("Layer 3") ? 3 : next.includes("Layer 2") ? 2 : 1;
              setResearchTask(rt => {
                if (!rt) return null;
                return {
                  ...rt,
                  progress: currentLvl * 20,
                  currentStage: `Layer ${currentLvl}/5: Menulis analisis mendalam...`,
                  steps: rt.steps.map((st, idx) => ({
                    ...st,
                    status: idx + 1 < currentLvl ? 'completed' : idx + 1 === currentLvl ? 'running' : 'pending'
                  })),
                  result: next
                };
              });
            }
            return next;
          });
          if (detectedModel) setActiveModel(detectedModel);
          // Auto scroll realtime to latest streamed text
          if (answerScrollRef.current) {
            answerScrollRef.current.scrollTop = answerScrollRef.current.scrollHeight;
          }
        },
        (detectedModel) => {
          setIsLoading(false);
          if (detectedModel) setActiveModel(detectedModel);
          if (modeToUse === 'deep_research') {
            setResearchTask(rt => rt ? {
              ...rt,
              status: 'completed',
              progress: 100,
              currentStage: 'Riset 5 Layer Selesai Tuntas.',
              steps: rt.steps.map(s => ({ ...s, status: 'completed' }))
            } : null);
          }
          fetchQuotaStatus(); // update quota count after chat completion
        },
        (errorMsg) => {
          setIsLoading(false);
          setErrorMessage(errorMsg);
          fetchQuotaStatus();
          if (errorMsg.includes("10 chat") || errorMsg.includes("30 chat") || errorMsg.includes("200 chat") || errorMsg.includes("Patungan")) {
            setShowPaymentModal(true);
          }
        },
        currentUser?.uid
      );
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Gagal memproses tanya tafsir.");
      fetchQuotaStatus();
    }
  };

  const handleContinueExplanation = async () => {
    if (isLoading || !streamingText) return;
    const promptContinuation = "Lanjutkan penjelasan tadi persis dari kalimat terakhir, selesaikan hingga tuntas sampai kesimpulan penutup tanpa mengulang yang sudah ditulis sebelumnya.";
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const messages = [
        { role: 'user', content: queryInput || "Kajian Tafsir & Fiqh" },
        { role: 'model', content: streamingText },
        { role: 'user', content: promptContinuation }
      ];
      await apiClient.streamChatMessage(
        messages,
        qaMode as any,
        quota?.tier || 'Reguler',
        'gemini-3.1-flash-lite',
        (chunk, detectedModel) => {
          setStreamingText(prev => prev + chunk);
          if (detectedModel) setActiveModel(detectedModel);
          if (answerScrollRef.current) {
            answerScrollRef.current.scrollTop = answerScrollRef.current.scrollHeight;
          }
        },
        (detectedModel) => {
          setIsLoading(false);
          if (detectedModel) setActiveModel(detectedModel);
          fetchQuotaStatus();
        },
        (errorMsg) => {
          setIsLoading(false);
          setErrorMessage(errorMsg);
        },
        currentUser?.uid
      );
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || "Gagal melanjutkan kajian.");
    }
  };

  const handleDownloadPdf = () => {
    const textToExport = qaMode === 'deep_research' ? (researchTask?.result || '') : streamingText;
    if (!textToExport) return;

    exportDocumentToPdf({
      title: qaMode === 'deep_research' ? `Disertasi Deep Research: ${researchTask?.topic || queryInput}` : `Kajian Tafsir: ${queryInput || "Tanya Tafsir & Fiqh Ahkam"}`,
      topic: queryInput || researchTask?.topic || "Kajian Fiqh & Tafsir Ahkam",
      content: textToExport,
      mode: qaMode === 'deep_research' ? "Deep Research 5 Layer" : `Mode ${qaMode.toUpperCase()}`,
      author: currentUser?.displayName || "Peneliti Quranica AI Studio",
      tier: quota?.tier
    });
  };

  const copyResult = () => {
    const textToCopy = qaMode === 'deep_research' ? (researchTask?.result || '') : streamingText;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Quota visual indicator
  const getQuotaDisplay = () => {
    if (!quota) return { text: "Memuat Kuota...", badge: "..." };
    if (quota.tier === 'Platinum' || quota.limit === 'unlimited') {
      return {
        text: "Unlimited Chat & 5-Layer Deep Research",
        badge: "Platinum Member",
        color: "text-amber-400 bg-amber-950/40 border-amber-500/30",
        remainingText: "∞ Tanpa Batas"
      };
    }
    if (quota.tier === 'Premium') {
      return {
        text: `Tersisa ${quota.remaining} dari 200 Chat Hari Ini (IP: ${quota.ip})`,
        badge: "Premium Member",
        color: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
        remainingText: `${quota.remaining} / 200 Hari Ini`
      };
    }
    if (quota.isLoggedIn) {
      return {
        text: `Tersisa ${quota.remaining} dari 30 Chat Bulan Ini`,
        badge: "Member Reguler",
        color: "text-teal-400 bg-teal-950/40 border-teal-500/30",
        remainingText: `${quota.remaining} / 30 Bulan Ini`
      };
    }
    return {
      text: `Tersisa ${quota.remaining} dari 10 Chat Tamu (IP: ${quota.ip}) · Tidak dapat di-refresh`,
      badge: "Tamu (IP Tracked)",
      color: "text-sky-400 bg-sky-950/40 border-sky-500/30",
      remainingText: `${quota.remaining} / 10 Chat`
    };
  };

  const quotaInfo = getQuotaDisplay();

  return (
    <div className="w-full relative py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Card */}
        <div className="rounded-3xl border border-emerald-900/50 bg-slate-900/90 shadow-2xl overflow-hidden relative backdrop-blur-xl">
          {/* Glowing Header Accent */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

          {/* Section Header & Quota Bar */}
          <div className="p-5 sm:p-7 border-b border-slate-800 bg-slate-950/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                  FITUR UTAMA LANDING PAGE
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Database size={12} className="text-emerald-500" />
                  RAG Turats & Google Drive
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2.5">
                <span>Tanya Tafsir & Fiqh Ahkam Interaktif</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  AI Turats
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Eksplorasi hukum ayat Ahkam, takhrij sanad hadits, perbandingan 4 mazhab, dan riset mendalam 5 layer berbasis kecerdasan buatan Google Gemini.
              </p>
            </div>

            {/* Quota Status Card & Patungan Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className={`px-3.5 py-2 rounded-2xl border text-xs ${quotaInfo.color} flex flex-col justify-center`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold">{quotaInfo.badge}</span>
                  <span className="font-mono font-extrabold">{quotaInfo.remainingText}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[240px]">
                  {quotaInfo.text}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPaymentDefaultTier('Premium');
                  setShowPaymentModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
              >
                <HeartHandshake size={15} />
                <span>Patungan Penelitian (10K/50K)</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher Bar */}
          <div className="px-5 sm:px-7 py-3 border-b border-slate-800 bg-slate-950/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setQaMode('tafsir')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  qaMode === 'tafsir'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen size={13} />
                <span>📖 Tafsir Ayat Ahkam (4 Mazhab)</span>
              </button>

              <button
                type="button"
                onClick={() => setQaMode('master')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  qaMode === 'master'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Scale size={13} />
                <span>🎓 Master Hadits & Kritik Sanad</span>
              </button>

              <button
                type="button"
                onClick={() => setQaMode('maqashid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  qaMode === 'maqashid'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Compass size={13} />
                <span>🌍 Maqashid Syariah</span>
              </button>

              <button
                type="button"
                onClick={() => setQaMode('genz')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  qaMode === 'genz'
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>💅 Gen Z Relate</span>
              </button>

              <button
                type="button"
                onClick={() => setQaMode('deep_research')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  qaMode === 'deep_research'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 ring-2 ring-amber-400/50'
                    : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                }`}
              >
                <Award size={14} className={qaMode === 'deep_research' ? 'animate-bounce' : ''} />
                <span>🔬 Deep Research (5 Layer Bertahap)</span>
              </button>
            </div>

            {/* Google Drive Turats Cloud Link */}
            <a
              href="https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span>Folder Google Drive Turats</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Input & Form Area */}
          <div className="p-5 sm:p-7 space-y-4">
            {qaMode === 'maqashid' && (
              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs text-indigo-300 animate-in fade-in duration-300">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-indigo-400 shrink-0" />
                  <span>
                    <strong>Standar Maqashid Syariah:</strong> Judul tematik spesifik sesuai pembahasan &middot; Tiap argumen wajib disertai referensi langsung &middot; 5&ndash;10 referensi kitab turats per pembahasan.
                  </span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  Strict Turats Citation
                </span>
              </div>
            )}

            {/* Preset Query Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                CONTOH KASUS HUKUM & AYAT AHKAM CEPAT:
              </span>
              <div className="flex flex-wrap gap-2">
                {presetQueries.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQueryInput(item.query);
                      setQaMode(item.mode);
                      handleSubmit(undefined, item.query, item.mode);
                    }}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition-all text-left flex items-center gap-1.5 active:scale-95"
                  >
                    <Sparkles size={11} className="text-emerald-400 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Input Form */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative rounded-2xl bg-slate-950 border border-slate-700/80 focus-within:border-emerald-500 transition-all shadow-inner overflow-hidden">
                <textarea
                  rows={3}
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder={
                    qaMode === 'deep_research'
                      ? "Tuliskan topik riset mendalam Anda (misal: 'Analisis perbandingan hukum waris anak di luar nikah lintas 4 mazhab dan hukum positif kontemporer')..."
                      : "Tanyakan persoalan tafsir ayat, hukum fiqih, derajat hadits, atau maqashid syariah di sini..."
                  }
                  className="w-full p-4 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                />

                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="font-mono text-emerald-400">Tekan Enter untuk bertanya</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">Rujukan otomatis ke Ahkamul Qur'an & Kutub 4 Mazhab</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {queryInput.trim() && (
                      <button
                        type="button"
                        onClick={() => setQueryInput('')}
                        className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1"
                      >
                        Bersihkan
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading || !queryInput.trim()}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Mengkaji...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>{qaMode === 'deep_research' ? 'Mulai Riset 5 Layer' : 'Tanya Tafsir'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex flex-wrap items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-2 max-w-xl">
                  <AlertCircle size={16} className="shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const isPlatinum = errorMessage.includes('Platinum') || errorMessage.includes('50K') || qaMode === 'deep_research';
                      setPaymentDefaultTier(isPlatinum ? 'Platinum' : 'Premium');
                      setShowPaymentModal(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    Buka Gateway Lynk.id ({errorMessage.includes('Platinum') || errorMessage.includes('50K') || qaMode === 'deep_research' ? 'Platinum 50K' : 'Premium 10K'})
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* DEEP RESEARCH 5 LAYER STEPPER & LIVE ON-TIME PROGRESS */}
            {/* ========================================================= */}
            {qaMode === 'deep_research' && researchTask && (
              <div className="rounded-2xl border border-amber-500/30 bg-slate-950/80 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-amber-400" />
                    <span className="text-sm font-bold text-slate-200">
                      Proses Deep Research 5 Layer (On-Time Progressive):
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {researchTask.progress}% Selesai
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
                    style={{ width: `${researchTask.progress}%` }}
                  />
                </div>

                {/* 5 Layer Steps Stepper */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {researchTask.steps.map((st, sIdx) => {
                    const isDone = st.status === 'completed';
                    const isCurrent = st.status === 'running';
                    return (
                      <div
                        key={sIdx}
                        className={`p-3 rounded-xl border text-xs transition-all ${
                          isDone
                            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                            : isCurrent
                            ? 'bg-amber-950/40 border-amber-500/60 text-amber-300 animate-pulse'
                            : 'bg-slate-900/50 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          {isDone ? (
                            <Check size={14} className="text-emerald-400 shrink-0" />
                          ) : isCurrent ? (
                            <RefreshCw size={13} className="animate-spin text-amber-400 shrink-0" />
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] shrink-0">
                              {sIdx + 1}
                            </span>
                          )}
                          <span className="truncate">Layer {sIdx + 1}</span>
                        </div>
                        <p className="text-[10px] line-clamp-2 leading-tight">
                          {st.name.replace(/^Layer \d+: /, '')}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="text-xs text-slate-400 italic flex items-center gap-2">
                  <Clock size={13} className="text-amber-400 shrink-0" />
                  <span>{researchTask.currentStage}</span>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* LIVE ANSWER CONTAINER (REAL-TIME STREAMING UNTUK SEMUA MODE) */}
            {/* ========================================================= */}
            {(isLoading || streamingText || researchTask?.result) && (
              <div 
                ref={answerCardRef}
                className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-5 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden transition-all duration-300"
              >
                {/* Glowing subtle edge bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 opacity-70" />

                {/* Answer Top Bar */}
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800/80 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-serif font-bold text-base shadow-sm">
                      ق
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100 flex flex-wrap items-center gap-2">
                        <span>
                          {qaMode === 'deep_research' ? 'Naskah Disertasi 5 Layer Turats' :
                           qaMode === 'master' ? 'Takhrij & Sanad Hadits Nabawi' :
                           qaMode === 'maqashid' ? 'Tafsir Maqashid Syariah Ultra-Detail' :
                           qaMode === 'genz' ? 'Sahabat Gen Z (Tafsir & Solusi Hidup)' :
                           'Kajian Fiqh & Tafsir Al-Qur\'an 4 Mazhab'}
                        </span>
                        {isLoading ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>Real-Time Streaming Aktif</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                            <CheckCircle2 size={12} />
                            <span>Selesai Tuntas</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Model: <strong className="text-emerald-400">{activeModel}</strong> · Terverifikasi Kitab Turats Mu'tabar
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {!isLoading && streamingText && (
                      <>
                        {qaMode !== 'deep_research' && (
                          <button
                            type="button"
                            onClick={handleContinueExplanation}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                            title="Lanjutkan atau perdalam pembahasan lebih lanjut"
                          >
                            <Sparkles size={12} className="text-amber-400" />
                            <span>Perdalam / Lanjutkan</span>
                          </button>
                        )}
                      </>
                    )}

                    {(streamingText || researchTask?.result) && (
                      <>
                        <button
                          type="button"
                          onClick={copyResult}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          {isCopied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          <span>{isCopied ? "Disalin!" : "Salin Naskah"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleDownloadPdf}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow cursor-pointer"
                        >
                          <Download size={13} />
                          <span>Download PDF</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Markdown Rendered Content atau Real-time Connecting Placeholder */}
                <div
                  ref={answerScrollRef}
                  className="prose prose-invert max-w-none text-slate-200 text-sm leading-relaxed max-h-[520px] overflow-y-auto custom-scrollbar pr-2"
                >
                  {streamingText || researchTask?.result ? (
                    <div>
                      <Markdown>
                        {qaMode === 'deep_research' ? (researchTask?.result || '') : streamingText}
                      </Markdown>
                      {isLoading && qaMode !== 'deep_research' && (
                        <span className="inline-block w-2.5 h-4.5 bg-emerald-400 ml-1 animate-pulse align-middle shadow-md shadow-emerald-400/50 rounded-sm" />
                      )}
                    </div>
                  ) : (
                    <div className="py-8 px-4 rounded-xl bg-slate-900/60 border border-emerald-500/25 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-xs font-bold font-mono tracking-wider">REAL-TIME STREAMING TERHUBUNG</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium max-w-md leading-relaxed">
                        {qaMode === 'deep_research' 
                          ? 'Dewan Pakar sedang menginventarisasi literatur Turats & menjalankan riset 5 layer...'
                          : qaMode === 'maqashid'
                          ? 'AI sedang memformulasikan analisis Maqashid Syariah & rujukan Turats... Jawaban tampil langsung mengalir per kata di bawah ini.'
                          : qaMode === 'master'
                          ? 'AI sedang men-takhrij sanad dan matan hadits... Jawaban tampil langsung mengalir per kata di bawah ini.'
                          : qaMode === 'genz'
                          ? 'Sahabat Gen Z AI sedang merumuskan jawaban hangat & relate... Jawaban tampil langsung mengalir per kata di bawah ini.'
                          : 'AI sedang menelaah kitab tafsir mu\'tabar... Jawaban tampil langsung mengalir per kata di layar di bawah ini.'}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Menghubungkan stream Google Gemini API ({activeModel})...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Note */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                  <span>
                    Dihasilkan secara presisi berdasarkan khazanah Turats Islam & Tafsir Ayat Ahkam 4 Mazhab.
                  </span>
                  <a
                    href="https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Buka Repositori Lengkap Google Drive</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Payment Gateway Modal (Patungan Penelitian 10K & 50K) */}
      <PaymentGatewayModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        defaultTier={paymentDefaultTier}
        currentUser={currentUser}
        currentIp={quota?.ip}
        onPaymentSuccess={(updatedUser, updatedQuota) => {
          setQuota(updatedQuota);
          fetchQuotaStatus();
        }}
      />
    </div>
  );
}
