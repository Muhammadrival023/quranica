import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, Play, Pause, Volume2, BookOpen, Sparkles, ShieldCheck, 
  ChevronRight, BookText, Database, MessageSquare, ArrowRight, 
  CheckCircle2, Award, Globe, FileText, Search, Headphones, 
  Layers, ExternalLink, Sun, Moon, Check, Sparkle, Compass,
  BookMarked, GraduationCap, School, Share2, History, Scale,
  Gift, Zap, Clock, AlertTriangle, Users, HelpCircle, Lock,
  Star, ChevronDown, CheckCircle
} from 'lucide-react';
import { QURAN_RECITERS, getAudioUrl, type Reciter } from '../data/quranReciters';
import { QIRAAT_READERS, VERSE_VARIANTS } from '../data/qiraatVariants';
import { MANUSCRIPTS, MANUSCRIPT_STATS } from '../data/manuscriptCoranica';
import { UIN_SGD_PROFILE } from '../data/uinSgdProfile';
import { rujukanLinks, portalJurnalLinks } from '../data/rujukanLinks';
import TanyaTafsirSection from './TanyaTafsirSection';
import PaymentGatewayModal, { PAYMENT_GATEWAY_LINKS } from './PaymentGatewayModal';

interface LandingPageProps {
  onNavigate: (tab: 'tahsin' | 'qa' | 'research' | 'mcp' | 'admin' | 'register' | 'hijaiyah' | 'profile' | 'quran' | 'carousel' | 'fiqh') => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  currentUser?: any;
}

export default function LandingPage({ onNavigate, isDark = true, onToggleTheme, currentUser }: LandingPageProps) {
  // Audio state for interactive hero & demo
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeReciterId, setActiveReciterId] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Interactive Sandbox Tab
  const [sandboxTab, setSandboxTab] = useState<'tajwid' | 'murottal' | 'qiraat' | 'manuscript'>('tajwid');

  // Selected tajwid word state in demo
  const [selectedTajwidWord, setSelectedTajwidWord] = useState<number>(0);

  // Selected qiraat reader state in demo
  const [selectedReaderId, setSelectedReaderId] = useState<string>('nafi');

  // Selected manuscript in demo
  const [selectedManuscriptIndex, setSelectedManuscriptIndex] = useState<number>(0);

  // In-app Payment Gateway Modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [modalDefaultTier, setModalDefaultTier] = useState<'Premium' | 'Platinum'>('Platinum');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Reciter object
  const currentReciter = QURAN_RECITERS.find(r => r.id === activeReciterId) || QURAN_RECITERS[0];

  // Play / Pause audio demo (Al-Fatihah)
  const togglePlayAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(getAudioUrl(currentReciter, 1));
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.src = getAudioUrl(currentReciter, 1);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio playback notice:", err);
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Tajwid words sample (QS. Al-Fatihah: 1-2)
  const tajwidWords = [
    { 
      word: "بِسْمِ", 
      latin: "Bismi", 
      rule: "Kasrah Khofadliyah", 
      hukum: "Tartil Dasar",
      makhraj: "Asy-Syafatain (Kedua bibir)",
      status: "Sempurna",
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30"
    },
    { 
      word: "ٱللَّهِ", 
      latin: "Allāh", 
      rule: "Tarqiq (Lafzhul Jalalah)", 
      hukum: "Lam Tipis / Tarqiq",
      makhraj: "Tepi Lidah dengan Gigi Seri Atas",
      status: "Sempurna",
      color: "text-teal-300 border-teal-500/40 bg-teal-950/30"
    },
    { 
      word: "ٱلرَّحْمَـٰنِ", 
      latin: "Ar-Raḥmāni", 
      rule: "Idgham Syamsiyah & Mad Thabi'i", 
      hukum: "Tasydid Ra & Mad 2 Harakat",
      makhraj: "Ujung lidah dekat gusi atas",
      status: "Akurasi 99.1%",
      color: "text-amber-300 border-amber-500/40 bg-amber-950/30"
    },
    { 
      word: "ٱلرَّحِيمِ", 
      latin: "Ar-Raḥīmi", 
      rule: "Mad 'Aridh Lissukun", 
      hukum: "Boleh 2, 4, atau 6 Harakat saat waqaf",
      makhraj: "Al-Halq (Tenggorokan tengah: Ha)",
      status: "Akurasi 98.7%",
      color: "text-sky-300 border-sky-500/40 bg-sky-950/30"
    },
    { 
      word: "ٱلْحَمْدُ", 
      latin: "Al-Ḥamdu", 
      rule: "Idzhar Qamariyah", 
      hukum: "Lam dibaca jelas tanpa sengau",
      makhraj: "Wasathul Halq (Ha murni)",
      status: "Akurasi 99.4%",
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/30"
    },
    { 
      word: "لِلَّهِ", 
      latin: "Lillāhi", 
      rule: "Tarqiq Lam Jalalah", 
      hukum: "Dibaca tipis karena kasrah sebelumnya",
      makhraj: "Tepi ujung lidah",
      status: "Sempurna",
      color: "text-teal-300 border-teal-500/40 bg-teal-950/30"
    },
    { 
      word: "رَبِّ", 
      latin: "Rabbi", 
      rule: "Tafkhim Ra Mufakhkhamah", 
      hukum: "Tebal berharakat fathah",
      makhraj: "Punggung ujung lidah",
      status: "Akurasi 98.9%",
      color: "text-amber-300 border-amber-500/40 bg-amber-950/30"
    },
    { 
      word: "ٱلْعَـٰلَمِينَ", 
      latin: "Al-'Ālamīna", 
      rule: "Mad 'Aridh Lissukun & 'Ain Wasath", 
      hukum: "Makhraj 'Ain fasih dan panjang 2-6 harakat",
      makhraj: "Wasathul Halq (Tengah tenggorokan)",
      status: "Akurasi 99.8%",
      color: "text-indigo-300 border-indigo-500/40 bg-indigo-950/30"
    }
  ];

  // FAQ Data list
  const faqs = [
    {
      q: "Metode pembayaran apa saja yang didukung via gateway resmi Lynk.id?",
      a: "Melalui Lynk.id, pembayaran sangat fleksibel dan aman 100%. Anda dapat menggunakan QRIS (semua e-wallet: GoPay, OVO, DANA, ShopeePay, LinkAja, BCA Mobile), Transfer Virtual Account (BCA, Mandiri, BNI, BRI, Permata), hingga Kartu Debit/Kredit berlogo Visa & Mastercard. Konfirmasi berlangsung otomatis tanpa perlu kirim bukti transfer manual jika bayar via tautan resmi."
    },
    {
      q: "Bagaimana cara mengklaim Bundling Ebook Premium senilai Rp 500.000?",
      a: "Bagi Anda yang memilih Paket Pembelajar Serius (Rp 50.000) atau Jalur Cepat 3 Bulan (Rp 150.000), link download 3 Ebook Premium (Fiqih Kontemporer, Neurosains Menghafal Al-Qur'an, dan Metodologi Riset Turats) akan langsung dikirimkan otomatis ke email Anda melalui sistem Lynk.id dan tersedia di area member dashboard."
    },
    {
      q: "Apa maksud kuota 200 Chat per bulan dan bagaimana jika kuota saya habis?",
      a: "Kuota 200 chat memungkinkan Anda berdiskusi dan berkonsultasi mendalam dengan AI Quranica hingga 200 sesi tanya-jawab per bulan (dilacak aman berdasarkan akun & IP address). Jika kuota bulanan habis sebelum waktu reset, Anda dapat melakukan top-up patungan atau langsung beralih ke Paket Platinum untuk menikmati akses Chat Unlimited tanpa batas + fitur Deep Research 5 Layer."
    },
    {
      q: "Bagaimana mekanisme teknis masuk ke grup Member VIP 'Inner Circle' @rivalanisa.id?",
      a: "Ada 2 cara: (1) Cara Organik: Anda otomatis diangkat menjadi Member Resmi setelah berlangganan aktif selama 3 bulan berturut-turut pada paket Rp 50K. (2) Jalur Cepat (Fast-Track): Ambil paket 3 bulan di muka senilai Rp 150.000 di Lynk.id untuk langsung mendapatkan tiket VIP instan ke 'Inner Circle' @rivalanisa.id, yang mencakup sesi konsultasi privat, diskon khusus produk mendatang, dan circle eksklusif."
    },
    {
      q: "Apakah rujukan jawaban Quranica AI terjamin valid dan bebas halusinasi?",
      a: "Ya. Berbeda dari AI generik, Quranica AI dikembangkan dengan metodologi RAG (Retrieval-Augmented Generation) yang langsung mengunci database kitab rujukan Turats (Tafsir Ibnu Katsir, Ath-Thabari, Al-Qurthubi, Asy-Syathibiyyah, dll.) serta verifikasi 5 Layer (Layer Sumber -> Verifikasi Sanad -> Analisis Turats -> Aduan Tesis/Antitesis -> Sintesis On-Time). Setiap dalil dicantumkan lengkap dengan ayat, surah, nomor hadis, dan kitab mu'tamadnya."
    }
  ];

  return (
    <div className="min-h-screen pb-28 sm:pb-24 bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500/30 transition-colors duration-200">
      
      {/* ========================================================= */}
      {/* 1. TOP NAVIGATION BAR */}
      {/* ========================================================= */}
      <nav className="sticky top-0 z-40 backdrop-blur-md border-b bg-slate-950/90 border-emerald-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-serif font-bold text-xl">
              ق
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200 bg-clip-text text-transparent">
                  Quranica AI
                </span>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${isDark ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                  Edutech
                </span>
              </div>
              <p className={`text-[10px] hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Asisten Pembelajaran Qur'an & Kajian Turats
              </p>
            </div>
          </div>

          {/* Navigation Links — Desktop (Direct to Features!) */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-medium">
            <button 
              onClick={() => onNavigate('qa')} 
              className={`transition-colors hover:text-emerald-400 flex items-center gap-1.5 cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
              title="Buka Tanya Jawab Tafsir & Fiqh"
            >
              <MessageSquare size={15} className="text-emerald-400" />
              Tanya Tafsir
            </button>
            <button 
              onClick={() => onNavigate('research')} 
              className={`transition-colors hover:text-amber-400 flex items-center gap-1.5 cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
              title="Buka Deep Research 5 Layer"
            >
              <Compass size={15} className="text-amber-400" />
              Deep Research
            </button>
            <button 
              onClick={() => onNavigate('tahsin')} 
              className={`transition-colors hover:text-emerald-400 flex items-center gap-1.5 cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
              title="Buka Studio Tahsin Suara AI"
            >
              <Mic size={15} className="text-teal-400" />
              Tahsin AI
            </button>
            <button 
              onClick={() => onNavigate('quran')} 
              className={`transition-colors hover:text-emerald-400 flex items-center gap-1.5 cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
              title="Buka Mushaf 30 Juz & Audio Qari"
            >
              <BookOpen size={15} className="text-teal-400" />
              Mushaf 30 Juz
            </button>
            <button 
              onClick={() => onNavigate('fiqh')} 
              className={`transition-colors hover:text-amber-400 flex items-center gap-1.5 cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
              title="Buka Bidayatul Mutafaqqih"
            >
              <Scale size={15} className="text-amber-400" />
              Fiqh 4 Mazhab
            </button>
            <button 
              onClick={() => onNavigate('carousel')} 
              className={`transition-colors hover:text-indigo-400 flex items-center gap-1.5 cursor-pointer ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
              title="Buka AI Carousel Infografis"
            >
              <Layers size={15} className="text-indigo-400" />
              Infografis
            </button>
            <a 
              href="#pricing"
              className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs"
            >
              <Sparkles size={13} />
              Paket 10K & 50K
            </a>
          </div>

          {/* Action Area & Theme Toggle */}
          <div className="flex items-center gap-3">
            {onToggleTheme && (
              <button 
                onClick={onToggleTheme}
                aria-label="Ubah tema"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isDark ? 'bg-slate-900 text-amber-400 hover:bg-slate-800 border border-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}

            <button 
              onClick={() => onNavigate('qa')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <MessageSquare size={16} />
              <span>Buka Asisten AI</span>
              <ArrowRight size={14} className="hidden sm:inline" />
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* 2. HERO SECTION (High-Converting Direct Response) */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-emerald-950/40">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-emerald-500/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[420px] h-[320px] bg-teal-500/10 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[380px] h-[280px] bg-amber-500/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Social Proof Badge / Trust Eyebrow */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 mb-5 text-center">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <Users size={13} className="text-emerald-400 ml-1" />
              <span>Dipercaya oleh 1.400+ Santri, Mahasiswa Ushuluddin & Pengajar Ngaji se-Indonesia</span>
            </span>
          </div>

          {/* Main Headline (Direct Response - Problem/Solution/Speed) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-center tracking-tight max-w-5xl mx-auto leading-[1.18] text-white">
            Bongkar Makna Al-Qur'an & Perdalam Kajian Turats <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">10x Lebih Cepat</span> dengan Asisten AI Islami Paling Presisi
          </h1>

          {/* Sub-headline (Clear Value Proposition & Target Audience) */}
          <p className={`mt-6 text-base sm:text-lg lg:text-xl text-center max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Solusi integratif bagi santri, akademisi, dan muslim urban: Tanya tafsir tematik lintas kitab mu'tamad, evaluasi tajwid bersanad, hingga riset 5 layer takhrij hadis—cepat, valid, dan berlandaskan adab keilmuan Islam.
          </p>

          {/* Primary Action Buttons (Conversion Focused) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button 
              onClick={() => {
                const el = document.getElementById('tanya-tafsir');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onNavigate('qa');
              }}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-300 hover:from-emerald-300 hover:to-amber-200 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-500/30 transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer ring-2 ring-emerald-400/50"
            >
              <MessageSquare size={19} className="text-slate-950" />
              <span>🚀 Coba Tanya Tafsir AI Sekarang (Gratis)</span>
            </button>

            <a 
              href="#pricing"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <Sparkles size={19} />
              <span>💎 Ambil Paket Pembelajar Serius (Best Value)</span>
            </a>

            <button 
              onClick={() => onNavigate('tahsin')}
              className={`px-5 py-4 rounded-2xl border font-bold text-sm sm:text-base transition-all flex items-center gap-2 active:scale-95 cursor-pointer ${
                isDark ? 'bg-slate-900/90 border-slate-700 hover:bg-slate-800 text-slate-100' : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-800 shadow-sm'
              }`}
            >
              <Mic size={18} className="text-teal-400 animate-pulse" />
              <span>Uji Suara Tahsin AI</span>
            </button>
          </div>

          {/* QUICK DIRECT FEATURE LAUNCH BAR (Direct Navigation) */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 max-w-4xl mx-auto">
            <div className="text-center mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-2">
              <Zap size={14} className="text-amber-400" />
              <span>Langsung Masuk ke Halaman Fitur Pilihan Anda:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button 
                onClick={() => onNavigate('qa')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <MessageSquare size={13} />
                Tanya Tafsir Tematik →
              </button>
              <button 
                onClick={() => onNavigate('research')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <Compass size={13} />
                Deep Research 5 Layer →
              </button>
              <button 
                onClick={() => onNavigate('tahsin')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-950/70 border border-teal-500/40 text-teal-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <Mic size={13} />
                Studio Tahsin AI →
              </button>
              <button 
                onClick={() => onNavigate('fiqh')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <Scale size={13} />
                Bidayatul Fiqh 4 Mazhab →
              </button>
              <button 
                onClick={() => onNavigate('quran')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-950/70 border border-teal-500/40 text-teal-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <BookOpen size={13} />
                Mushaf 30 Juz & Audio →
              </button>
              <button 
                onClick={() => onNavigate('hijaiyah')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <Sparkles size={13} />
                Makharijul Huruf →
              </button>
              <button 
                onClick={() => onNavigate('carousel')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <Layers size={13} />
                Infografis Carousel →
              </button>
              <button 
                onClick={() => onNavigate('mcp')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-sky-950/70 border border-sky-500/40 text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
              >
                <Database size={13} />
                Pustaka Turats Syamilah →
              </button>
            </div>
          </div>

          {/* Authority Metrics */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">114 Surah</div>
              <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>30 Juz Lengkap & Audio</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">10 Qira'at</div>
              <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>20 Riwayat Mutawatirah</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">5 Layer Riset</div>
              <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Takhrij & Dialektika Turats</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">8.000+ Jilid</div>
              <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Kitab Kuning Terindeks RAG</div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* HERO INTERACTIVE SHOWCASE CARD (Live Audio Demo) */}
          {/* ========================================================= */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className={`rounded-3xl border p-5 sm:p-8 shadow-2xl relative overflow-hidden ${
              isDark ? 'bg-slate-900/90 border-emerald-900/50 shadow-emerald-950/20' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              {/* Card Header & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    ١
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">Surah Al-Fatihah : Ayat 1-2</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Simulasi Pengenalan Suara & Analisis Fonetik Tajwid Real-Time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlayAudio}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isPlaying 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30' 
                        : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                    }`}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlaying ? 'Jeda Audio Qari' : 'Dengarkan Contoh'}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('tahsin')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mic size={14} />
                    <span>Buka Studio Tahsin</span>
                  </button>
                </div>
              </div>

              {/* Quran Text with Interactive Tajwid Chips */}
              <div className="py-8 text-center" dir="rtl">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-serif leading-[2.2] tracking-wide flex flex-wrap justify-center gap-2 sm:gap-3">
                  {tajwidWords.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTajwidWord(idx)}
                      className={`px-2.5 py-1 rounded-2xl transition-all cursor-pointer border ${
                        selectedTajwidWord === idx
                          ? 'ring-2 ring-emerald-400 scale-105 bg-emerald-950/60 ' + item.color
                          : 'border-transparent hover:bg-slate-800/60'
                      }`}
                    >
                      {item.word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tajwid Detail Inspector Bar */}
              <div className="mt-4 pt-4 border-t border-slate-800/60">
                {selectedTajwidWord !== null && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Lafazh / Latin</span>
                      <span className="text-xs sm:text-sm font-semibold text-emerald-400">
                        {tajwidWords[selectedTajwidWord].latin}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Kaidah Tajwid</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200">
                        {tajwidWords[selectedTajwidWord].rule}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Kaidah Hukum</span>
                      <span className="text-xs sm:text-sm font-semibold text-amber-300">
                        {tajwidWords[selectedTajwidWord].hukum}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Makharijul Huruf</span>
                      <span className="text-xs text-slate-300">
                        {tajwidWords[selectedTajwidWord].makhraj}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer CTA */}
              <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                  Ingin mengevaluasi rekaman suara tilawah Anda sendiri secara presisi kata-per-kata?
                </span>
                <button
                  onClick={() => onNavigate('tahsin')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Mic size={14} />
                  <span>Uji Suara Anda Sekarang</span>
                  <ChevronRight size={14} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PAIN POINTS & AGITATION SECTION (CRO Conversion Driver) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
              <AlertTriangle size={14} />
              <span>Realita & Tantangan Belajar Agama Saat Ini</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Mengapa Mempelajari Al-Qur'an & Kitab Turats Masih Terasa Begitu Berat?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Di era digital yang serba cepat, banyak dari kita berniat mulia memperdalam ilmu agama, namun seringkali terbentur oleh 3 tembok besar ini:
            </p>
          </div>

          {/* 3 Core Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            
            {/* Pain Point 1: Keterbatasan Waktu */}
            <div className={`p-8 rounded-3xl border relative flex flex-col justify-between ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold text-lg mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  1. Keterbatasan Waktu & Padatnya Kesibukan Harian
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Tuntutan pekerjaan, kuliah, atau aktivitas rumah tangga menyita sebagian besar waktu. Untuk membuka puluhan jilid kitab tafsir fisik, mencari takhrij hadits, atau menyimak rekaman panjang membutuhkan waktu berjam-jam yang sulit dialokasikan setiap hari.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs font-medium text-rose-400 flex items-center gap-1.5">
                <AlertTriangle size={14} /> Akhirnya riset agama tertunda berbulan-bulan.
              </div>
            </div>

            {/* Pain Point 2: Kebingungan Rujukan & Keraguan Sanad */}
            <div className={`p-8 rounded-3xl border relative flex flex-col justify-between ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-lg mb-6">
                  <BookText size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  2. Kebingungan Rujukan & Keraguan Sanad Dalil
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Informasi agama berseliweran di media sosial tanpa pertanggungjawaban sanad. Banyak tafsir liar, hadis dhaif disebarkan tanpa takhrij, serta minimnya akses langsung ke teks matan Arab klasik (Turats) yang mu'tamad dari para ulama salaf.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs font-medium text-amber-400 flex items-center gap-1.5">
                <AlertTriangle size={14} /> Khawatir mengamalkan dalil yang keliru atau syadz.
              </div>
            </div>

            {/* Pain Point 3: Minimnya Lingkungan Belajar (Circle Positif) */}
            <div className={`p-8 rounded-3xl border relative flex flex-col justify-between ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  3. Minimnya Lingkungan Belajar (Circle) yang Istiqamah
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Belajar sendirian di ruang hampa seringkali berujung pada rasa futur (kehilangan semangat). Tanpa adanya ekosistem komunitas pembelajar yang saling mengingatkan dan asatidz pembimbing, progres belajar Quran dan hafalan mudah buyar di tengah jalan.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs font-medium text-indigo-400 flex items-center gap-1.5">
                <AlertTriangle size={14} /> Semangat tinggi di awal, hilang tanpa jejak.
              </div>
            </div>

          </div>

          {/* Solusi Integratif Quranica AI */}
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 relative overflow-hidden shadow-2xl">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
                Jawaban & Solusi Terintegrasi
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Quranica AI Hadir Memadukan Khazanah Turats dengan Kecerdasan Buatan Terkini
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Kami merancang Quranica AI sebagai asisten riset dan pembelajaran pribadi Anda. Jawaban berbasis data primer kitab kuning (Syamilah & Maktabah Salaf), validasi dalil bertingkat, koreksi suara makhraj instan, serta ekosistem komunitas terarah agar Anda belajar secara shahih, efisien, dan istiqamah.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => onNavigate('qa')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <MessageSquare size={17} />
                  <span>Buka Tanya Tafsir Langsung</span>
                  <ArrowRight size={15} />
                </button>
                <a 
                  href="#pricing"
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles size={16} className="text-amber-400" />
                  <span>Lihat Paket Patungan 10K & 50K</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FITUR UTAMA INTERAKTIF: TANYA TAFSIR SECTION */}
      {/* ========================================================= */}
      <section id="tanya-tafsir" className="relative border-b border-emerald-950/50 bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-950">
        <TanyaTafsirSection 
          currentUser={currentUser} 
          onNavigateToFullApp={onNavigate} 
          isDark={isDark} 
        />
      </section>

      {/* ========================================================= */}
      {/* 5. FITUR UNGGULAN QURANICA AI (Semua Klik Langsung ke Fitur!) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkle size={14} />
            <span>Mengapa Quranica AI Berbeda & Unggul</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Dirancang Berdasarkan Kaidah Sanad, Adab Santri, & Presisi Teknologi
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Klik fitur mana pun di bawah ini untuk langsung masuk ke modul aplikasi dan mencobanya:
          </p>
        </div>

        {/* Feature Grid (Interactive Direct Navigation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Tanya Tafsir Tematik */}
          <div 
            onClick={() => onNavigate('qa')}
            className="p-8 rounded-3xl border border-slate-800 bg-slate-900/90 hover:border-emerald-500/60 hover:bg-slate-900 transition-all group cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all font-bold">
                <MessageSquare size={24} />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                <span>Grounding Kitab Turats</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tanya Tafsir Tematik & Ayat Ahkam</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tanyakan ayat apa pun seputar problematika ibadah, muamalah, atau sains. Asisten AI langsung merujuk pada tafsir mu'tamad (Ibnu Katsir, Ath-Thabari, Al-Qurthubi, Al-Jalalain) lengkap dengan teks Arab dan maknanya.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1.5 transition-transform gap-1">
              Buka Halaman Tanya Tafsir Sekarang <ArrowRight size={14} />
            </div>
          </div>

          {/* Feature 2: Deep Research 5 Layer */}
          <div 
            onClick={() => onNavigate('research')}
            className="p-8 rounded-3xl border border-slate-800 bg-slate-900/90 hover:border-amber-500/60 hover:bg-slate-900 transition-all group cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all font-bold">
                <Compass size={24} />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                <span>Riset Ilmiah On-Time</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Deep Research 5 Layer & Takhrij Hadis</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Riset berjenjang bertahap: (1) Penelusuran Sumber, (2) Verifikasi Sanad, (3) Analisis Matan, (4) Dialektika Tesis & Antitesis Mazhab, (5) Sintesis On-Time + Ekspor PDF ilmiah untuk skripsi/tesis Anda.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1.5 transition-transform gap-1">
              Buka Modul Deep Research 5 Layer <ArrowRight size={14} />
            </div>
          </div>

          {/* Feature 3: E-Tahsin AI Voice Recognition */}
          <div 
            onClick={() => onNavigate('tahsin')}
            className="p-8 rounded-3xl border border-slate-800 bg-slate-900/90 hover:border-teal-500/60 hover:bg-slate-900 transition-all group cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all font-bold">
                <Mic size={24} />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-1">
                <span>Fonetik Real-Time</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">E-Tahsin Suara & Evaluasi Tajwid</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Bacakan ayat langsung ke mikrofon. AI membedah ketukan mad, dengung ghunnah, makhraj lidah/tenggorokan kata demi kata dengan presisi standar Matn Al-Jazariyah.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-teal-400 group-hover:translate-x-1.5 transition-transform gap-1">
              Buka Studio E-Tahsin Suara AI <ArrowRight size={14} />
            </div>
          </div>

          {/* Feature 4: Fiqh 4 Mazhab */}
          <div 
            onClick={() => onNavigate('fiqh')}
            className="p-8 rounded-3xl border border-slate-800 bg-slate-900/90 hover:border-amber-500/60 hover:bg-slate-900 transition-all group cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all font-bold">
                <Scale size={24} />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                <span>Adab Khilafiyah</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bidayatul Mutafaqqih & Fiqh 4 Mazhab</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Telaah perbandingan hukum fikih Hanafi, Maliki, Syafi'i, dan Hanbali secara adil dan ilmiah. Membantu Anda memahami dalil di balik setiap ragam pendapat fiqih.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1.5 transition-transform gap-1">
              Buka Modul Fiqh 4 Mazhab <ArrowRight size={14} />
            </div>
          </div>

          {/* Feature 5: Mushaf 30 Juz & Audio Qari */}
          <div 
            onClick={() => onNavigate('quran')}
            className="p-8 rounded-3xl border border-slate-800 bg-slate-900/90 hover:border-teal-500/60 hover:bg-slate-900 transition-all group cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all font-bold">
                <BookOpen size={24} />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-1">
                <span>Mushaf 30 Juz & Kearifan Lokal</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mushaf 30 Juz & Terjemahan Sunda</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Teks Rasm Utsmani Madinah & Kemenag, transliterasi latin, terjemahan Basa Sunda 30 juz lengkap, serta pemutar audio murottal dari 10+ qari terbaik dunia.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-teal-400 group-hover:translate-x-1.5 transition-transform gap-1">
              Buka Mushaf 30 Juz & Audio <ArrowRight size={14} />
            </div>
          </div>

          {/* Feature 6: Makharijul Huruf */}
          <div 
            onClick={() => onNavigate('hijaiyah')}
            className="p-8 rounded-3xl border border-slate-800 bg-slate-900/90 hover:border-rose-500/60 hover:bg-slate-900 transition-all group cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-slate-950 transition-all font-bold">
                <Sparkles size={24} />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-1">
                <span>Audio VN Asli</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Makharijul Huruf & Titik Artikulasi</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Panduan anatomi 28 huruf hijaiyah (Al-Halq, Al-Lisan, Asy-Syafatain, Al-Jauf) dilengkapi contoh suara rekaman Voice Note (VN) langsung dari asatidz.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-rose-400 group-hover:translate-x-1.5 transition-transform gap-1">
              Buka Latihan Makharijul Huruf <ArrowRight size={14} />
            </div>
          </div>

          {/* Feature 7: AI Carousel Infografis */}
          <div 
            onClick={() => onNavigate('carousel')}
            className="p-8 rounded-3xl border border-indigo-500/40 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 hover:border-indigo-400 transition-all group cursor-pointer flex flex-col justify-between shadow-lg col-span-1 md:col-span-2 lg:col-span-3"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
                  <Sparkles size={15} />
                  <span>Teknologi Baru · Grounding Style NotebookLM</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">
                  AI Infografis Carousel (Maksimal 10 Slide Siap Posting)
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Ubah bahasan tafsir panjang atau tema kajian rumit menjadi 10 slide carousel infografis edukatif. Lengkap dengan prompt image AI Nano Banana yang seragam gayanya (Master Style Anchor) untuk feed Instagram atau materi dakwah Anda.
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onNavigate('carousel'); }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer self-start md:self-center"
              >
                <Layers size={17} />
                <span>Buka Studio Carousel</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* 6. PRICING & OFFER STRUCTURE (CRO Direct Response Section) */}
      {/* ========================================================= */}
      <section id="pricing" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Gift size={14} />
            <span>Skema Patungan Penelitian & Penawaran Eksklusif</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Investasi Terbaik untuk Kecerdasan Spiritual & Literasi Qurani Anda
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Bukan biaya konsumtif, melainkan wakaf patungan penelitian untuk menopang server komputasi AI dan penyusunan literasi Turats yang bermanfaat bagi umat.
          </p>
        </div>

        {/* Pricing Cards Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          
          {/* ========================================== */}
          {/* PAKET 1: PENJELAJAH (STARTER) - Rp 10.000  */}
          {/* ========================================== */}
          <div className={`p-8 sm:p-10 rounded-3xl border flex flex-col justify-between transition-all ${
            isDark ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Paket Penjelajah (Starter)
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                  Pemula & Harian Santai
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white">Rp 10.000</span>
                <span className="text-slate-400 text-sm font-medium">/ bulan</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Investasi patungan super terjangkau (hanya ~Rp 330/hari) untuk mulai mengeksplorasi AI Quranica.
              </p>

              <div className="h-px bg-slate-800 w-full mb-6" />

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                Fasilitas yang Anda Dapatkan:
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                <li className="flex items-start gap-3">
                  <div className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong>Kuota 200 Chat per bulan</strong> bersama Quranica AI (Terverifikasi Akun & IP).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong>Akses Link Komunitas Eksklusif Quranica AI</strong> untuk ruang diskusi & sharing literasi.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Check size={14} />
                  </div>
                  <div>
                    Akses Tanya Tafsir tematik, Mushaf 30 Juz & Murottal multi-qari.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-0.5 rounded bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                    <Check size={14} />
                  </div>
                  <div>
                    Bebas iklan yang mengganggu kekhusyukan belajar.
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <a 
                href="https://ganbate-education.lynk.id/p/patungan-quranica-ai-belajar-al-qur-an-lebih-terarah"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
              >
                <span>Pilih Paket Penjelajah (10K)</span>
                <ExternalLink size={15} />
              </a>

              <button
                onClick={() => {
                  setModalDefaultTier('Premium');
                  setIsPaymentModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
              >
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>Konfirmasi / Aktivasi Akun Manual</span>
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* PAKET 2: PEMBELAJAR SERIUS (PRO VALUE) - Rp 50.000      */}
          {/* ======================================================== */}
          <div className="p-8 sm:p-10 rounded-3xl border-2 border-amber-500/60 bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-900 flex flex-col justify-between relative shadow-2xl shadow-amber-500/10">
            
            {/* Best Value Ribbon Badge */}
            <div className="absolute -top-3.5 right-6 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Star size={13} className="fill-slate-950 text-slate-950" />
              <span>BEST VALUE · PALING POPULER</span>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Paket Pembelajar Serius (Pro Value)
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  Santri, Peneliti & Akademisi
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-black text-white">Rp 50.000</span>
                <span className="text-slate-400 text-sm font-medium">/ bulan</span>
              </div>
              <p className="text-xs text-amber-300/90 font-medium mb-6">
                Nilai riil benefit lebih dari Rp 550.000! Penawaran tanpa ragu untuk akselerasi keilmuan.
              </p>

              <div className="h-px bg-amber-500/30 w-full mb-6" />

              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
                <Sparkles size={14} /> Seluruh Fasilitas Paket 10K Ditambah:
              </h4>

              <ul className="space-y-3.5 text-sm text-slate-200 mb-6">
                <li className="flex items-start gap-3">
                  <div className="p-0.5 rounded bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong className="text-white">Chat Unlimited Tanpa Batas</strong> + Fitur Riset Unggulan <strong className="text-amber-300">Deep Research 5 Layer</strong>.
                  </div>
                </li>

                {/* BONUS SPECIAL HIGHLIGHT: Bundling Ebook Senilai Rp 500.000 */}
                <li className="flex items-start gap-3 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/40">
                  <div className="p-1 rounded-lg bg-amber-400 text-slate-950 mt-0.5 shrink-0">
                    <Gift size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase text-amber-400 tracking-wide">
                      BONUS SPESIAL GRATIS (Senilai Rp 500.000):
                    </div>
                    <div className="text-xs text-slate-300 mt-1 space-y-1">
                      <div>📖 <em>Ebook Fiqih Kontemporer & Transaksi AI</em> (Valuasi Rp175.000)</div>
                      <div>🧠 <em>Ebook Neurosains Menghafal Al-Qur'an</em> (Valuasi Rp175.000)</div>
                      <div>📜 <em>Ebook Metodologi Riset Turats Kilat</em> (Valuasi Rp150.000)</div>
                      <span className="inline-block mt-1 text-[11px] text-amber-300 font-bold">
                        → Langsung Terkirim Otomatis Setelah Pembayaran!
                      </span>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-0.5 rounded bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong className="text-white">Hak Keanggotaan Resmi:</strong> Kesempatan otomatis diangkat menjadi Member Resmi setelah 3 bulan berlangganan aktif.
                  </div>
                </li>

                {/* HIGHLIGHT JALUR CEPAT 3 BULAN FAST-TRACK */}
                <li className="flex items-start gap-3 p-3 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/50">
                  <div className="p-1 rounded-lg bg-emerald-400 text-slate-950 mt-0.5 shrink-0">
                    <Zap size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase text-emerald-400 tracking-wide flex items-center gap-1">
                      <span>JALUR CEPAT (FAST-TRACK 3 BULAN) - Rp 150.000</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Langsung ambil 3 bulan di muka (Rp 150.000) untuk otomatis mendapat tiket eksklusif menjadi <strong className="text-emerald-300">Member VIP "Inner Circle" di ekosistem @rivalanisa.id</strong> (Akses konsultasi privat, diskon produk masa depan, & circle privat).
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <a 
                href="https://ganbate-education.lynk.id/p/belajar-tajwid-dan-hafalan-al-qur-an-dibantu-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center"
              >
                <span>Ambil Paket Pembelajar Serius (50K)</span>
                <ExternalLink size={16} />
              </a>

              <div className="flex gap-2">
                <a 
                  href="https://ganbate-education.lynk.id/p/belajar-tajwid-dan-hafalan-al-qur-an-dibantu-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-amber-500/40 text-center"
                >
                  <Zap size={13} />
                  <span>Jalur Cepat 3 Bulan VIP (150K)</span>
                </a>

                <button
                  onClick={() => {
                    setModalDefaultTier('Platinum');
                    setIsPaymentModalOpen(true);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all border border-slate-700"
                >
                  <ShieldCheck size={14} className="text-amber-400" />
                  <span>Aktivasi</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* BREAKDOWN VALUASI BENEFIT (NO-BRAINER OFFER PROOF) */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-amber-500/30 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            💡 Mengapa Tawaran Ini Keputusan Tanpa Ragu (<em className="text-amber-400">No-Brainer Offer</em>)?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-6">
            Bandingkan nilai riil fasilitas yang Anda bawa pulang dengan biaya donasi patungan yang Anda keluarkan:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">3 Bundling Ebook</span>
              <span className="text-sm font-black text-amber-400 line-through">Rp 500.000</span>
              <span className="text-xs font-bold text-emerald-400 block mt-0.5">GRATIS 100%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Deep Research AI</span>
              <span className="text-sm font-black text-amber-400 line-through">Rp 250.000</span>
              <span className="text-xs font-bold text-emerald-400 block mt-0.5">Termasuk Bebas Limit</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Komunitas & Circle</span>
              <span className="text-sm font-black text-amber-400 line-through">Rp 300.000</span>
              <span className="text-xs font-bold text-emerald-400 block mt-0.5">Tiket Eksklusif</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-slate-950 border border-amber-500/40">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Investasi Patungan</span>
              <span className="text-base sm:text-lg font-black text-white">Hanya 50K</span>
              <span className="text-[11px] font-bold text-amber-400 block mt-0.5">Hemat Lebih 90%!</span>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 7. BENEFIT KOMUNITAS & INNER CIRCLE @RIVALANISA.ID */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Users size={14} />
              <span>Aset Jangka Panjang Pengembangan Diri & Keluarga</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Mengapa Masuk ke Komunitas & Inner Circle @rivalanisa.id Adalah Investasi Berharga?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Teknologi hanyalah alat, tetapi lingkungan belajar (<em className="text-emerald-400 font-serif">Sohbah Shalihah</em>) adalah penentu istiqamah. Bergabung dalam ekosistem Quranica AI dan lingkar privat <strong className="text-white">@rivalanisa.id</strong> membuka peluang jangka panjang yang tak ternilai:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Users size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">1. Ekosistem Diskusi Terarah & Sevisi</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Bertemu dengan ratusan santri, akademisi, dan profesional muslim yang memiliki antusiasme sama dalam mempelajari Al-Qur'an dan literasi Turats.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">2. Bimbingan & Konsultasi Berkala</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Sesi tanya-jawab seputar metodologi menghafal, parenting Qurani anak, serta integrasi etika AI dengan adab keilmuan Islam bersama tim @rivalanisa.id.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Award size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">3. Akses Prioritas Fitur Baru & Diskon Masa Depan</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Member Inner Circle selalu mendapat prioritas uji coba fitur kecerdasan buatan paling mutakhir serta potongan harga istimewa untuk event atau produk mendatang.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card / Visual Credential */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/40 relative shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xl">
                ★
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Tiket Member VIP Inner Circle</h3>
                <p className="text-xs text-emerald-400 font-mono">Ekosistem Belajar @rivalanisa.id</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 pb-6 border-b border-slate-800">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Status Keanggotaan:</span>
                <span className="font-bold text-emerald-400">Member Resmi & VIP</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Syarat Kualifikasi:</span>
                <span className="font-semibold text-right">3 Bulan Aktif atau Fast-Track Rp 150K</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Fasilitas Konsultasi:</span>
                <span className="font-semibold text-amber-300">Tersedia di Circle Privat</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Bonus Khusus:</span>
                <span className="font-semibold text-teal-300">3 Ebook Premium Senilai Rp 500K</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a 
                href="https://ganbate-education.lynk.id/p/belajar-tajwid-dan-hafalan-al-qur-an-dibantu-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <span>Daftar Fast-Track VIP 3 Bulan (150K)</span>
                <ArrowRight size={16} />
              </a>
              <span className="text-[11px] text-slate-500 mt-2 block">
                Akses instan grup privat langsung aktif setelah checkout via Lynk.id
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 8. FAQ SECTION (High-Confidence Overcoming Objections) */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle size={14} className="text-emerald-400" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Segala Hal yang Perlu Anda Ketahui
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Berikut jawaban lengkap seputar metode pembayaran, aktivasi kuota, bonus ebook, dan grup keanggotaan.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? 'bg-slate-900/90 border-emerald-500/50 shadow-md' 
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={18} 
                    className={`text-emerald-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================= */}
      {/* 9. FINAL URGENCY CTA & CLOSING (CRO Maximum Conversion) */}
      {/* ========================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 border-2 border-emerald-500/50 text-center relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Clock size={14} />
            <span>Jangan Tunda Lagi Niat Baik Memperdalam Al-Qur'an</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
            Ambil Langkah Nyata Hari Ini Sebelum Kuota Komunitas & Bonus Ebook Ditutup!
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Program patungan riset ini dibuka terbatas demi menjaga keleluasaan server AI dan intensitas pendampingan belajar. Nikmati akses tanpa batas serta bundling Ebook senilai Rp 500.000 sekarang juga.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://ganbate-education.lynk.id/p/belajar-tajwid-dan-hafalan-al-qur-an-dibantu-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles size={20} />
              <span>Daftar Paket Pembelajar Serius (50K)</span>
              <ArrowRight size={18} />
            </a>

            <button
              onClick={() => onNavigate('qa')}
              className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-base border border-slate-700 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <MessageSquare size={18} className="text-emerald-400" />
              <span>Coba Fitur Gratis Sekarang</span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Garansi Keamanan Pembayaran Lynk.id</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={16} className="text-emerald-400" />
              <span>Akses Instan Tanpa Menunggu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gift size={16} className="text-amber-400" />
              <span>Bonus Ebook Rp 500K Langsung Dikirim</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. DETAILED FOOTER */}
      {/* ========================================================= */}
      <footer className="border-t py-12 bg-slate-950 border-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
            <div>
              <div className="font-bold text-slate-100 text-sm mb-3">Modul Al-Qur'an & Suara</div>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => onNavigate('qa')} className="hover:text-emerald-400 transition-colors text-left">Tanya Jawab Tafsir Tematik</button></li>
                <li><button onClick={() => onNavigate('research')} className="hover:text-emerald-400 transition-colors text-left">Deep Research 5 Layer</button></li>
                <li><button onClick={() => onNavigate('tahsin')} className="hover:text-emerald-400 transition-colors text-left">E-Tahsin Speech AI</button></li>
                <li><button onClick={() => onNavigate('quran')} className="hover:text-emerald-400 transition-colors text-left">Mushaf 30 Juz & Audio Qari</button></li>
                <li><button onClick={() => onNavigate('hijaiyah')} className="hover:text-emerald-400 transition-colors text-left">Makharijul Huruf & Sifat</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-100 text-sm mb-3">Kajian Turats & Fikih</div>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => onNavigate('fiqh')} className="hover:text-amber-400 transition-colors text-left">Bidayatul Mutafaqqih (Fiqh 4 Mazhab)</button></li>
                <li><button onClick={() => onNavigate('carousel')} className="hover:text-amber-400 transition-colors text-left">AI Infografis Carousel (NotebookLM)</button></li>
                <li><button onClick={() => onNavigate('research')} className="hover:text-emerald-400 transition-colors text-left">Varian Qira'at 'Asyrah Mutawatirah</button></li>
                <li><button onClick={() => onNavigate('mcp')} className="hover:text-emerald-400 transition-colors text-left">Maktabah Syamilah & Moraref</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-100 text-sm mb-3">Skema Langganan & Gateway</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href="https://ganbate-education.lynk.id/p/patungan-quranica-ai-belajar-al-qur-an-lebih-terarah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    Paket Penjelajah (10K / Bln) <ExternalLink size={11} />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ganbate-education.lynk.id/p/belajar-tajwid-dan-hafalan-al-qur-an-dibantu-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors flex items-center gap-1"
                  >
                    Paket Pembelajar Serius (50K) <ExternalLink size={11} />
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setModalDefaultTier('Platinum');
                      setIsPaymentModalOpen(true);
                    }}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    Konfirmasi Aktivasi Donasi
                  </button>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-slate-200 transition-colors">
                    Komparasi Benefit Paket
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-100 text-sm mb-3">Tentang Quranica AI</div>
              <p className="text-xs leading-relaxed text-slate-400 mb-3">
                Platform edutech asisten pembelajaran Qur'an, kajian Islam berbasis Turats, dan konsultasi literasi Islam berbasis kecerdasan buatan.
              </p>
              <div className="text-[11px] text-emerald-400 font-mono">
                Mitra Resmi: @rivalanisa.id
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} Quranica AI Studio · Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div className="flex items-center gap-4">
              <span>Rasm Utsmani Madinah & Kemenag RI</span>
              <span aria-hidden="true">·</span>
              <span>Afiliasi Akademik & Filologi Turats</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* 11. IN-APP PAYMENT GATEWAY MODAL (Aktivasi / Konfirmasi) */}
      {/* ========================================================= */}
      <PaymentGatewayModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        defaultTier={modalDefaultTier}
        currentUser={currentUser}
        onPaymentSuccess={() => {
          setIsPaymentModalOpen(false);
          onNavigate('qa');
        }}
      />

    </div>
  );
}
