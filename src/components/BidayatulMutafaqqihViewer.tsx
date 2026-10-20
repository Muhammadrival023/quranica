import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, Copy, Check, ExternalLink, Bookmark, Sparkles, 
  ChevronDown, ChevronUp, Layers, Compass, Droplets, HardDrive, 
  CreditCard, ShieldCheck, Scale, Award, Info, BookMarked, Volume2, 
  Share2, ArrowRight, Library
} from 'lucide-react';
import { bidayatulMutafaqqihBook, type BidayahKitab, type BidayahPassage, type MazhabCrossReference } from '../data/bidayatulMutafaqqihData';
import { secondarySources } from '../data/secondarySources';
import SyarahTemplateSection from './SyarahTemplateSection';
import TafsirHukumSection from './TafsirHukumSection';
import { GOOGLE_DRIVE_REF_FOLDER } from '../data/tafsirHukumData';

interface BidayatulMutafaqqihViewerProps {
  onNavigateToTab?: (tab: string) => void;
  isDark?: boolean;
}

export default function BidayatulMutafaqqihViewer({ onNavigateToTab, isDark = true }: BidayatulMutafaqqihViewerProps) {
  const [selectedKitabId, setSelectedKitabId] = useState<string>("thaharah");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMazhabFilter, setSelectedMazhabFilter] = useState<string>("Semua");
  const [viewMode, setViewMode] = useState<'matan' | 'dhowabith' | 'pustaka' | 'template_syarah' | 'tafsir_hukum'>('matan');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedPassages, setBookmarkedPassages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bidayah_bookmarks');
      return saved ? JSON.parse(saved) : ["th_01"];
    } catch {
      return ["th_01"];
    }
  });
  const [expandedPassageIds, setExpandedPassageIds] = useState<Record<string, boolean>>({
    th_01: true,
    sh_01: true,
    zk_01: true
  });
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const currentKitab = useMemo(() => {
    return bidayatulMutafaqqihBook.find(k => k.id === selectedKitabId) || bidayatulMutafaqqihBook[0];
  }, [selectedKitabId]);

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedPassages(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('bidayah_bookmarks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Toggle expand
  const toggleExpand = (id: string) => {
    setExpandedPassageIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copy text handler
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Audio speech simulation (using Web Speech API if supported)
  const handlePlaySpeech = (id: string, text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (activeSpeechId === id) {
        window.speechSynthesis.cancel();
        setActiveSpeechId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.9;
      utterance.onend = () => setActiveSpeechId(null);
      utterance.onerror = () => setActiveSpeechId(null);
      setActiveSpeechId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filter passages based on search and mazhab filter
  const filteredPassages = useMemo(() => {
    return currentKitab.passages.filter(p => {
      const matchSearch = searchQuery.trim() === "" ||
        p.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.dhabitTerjemah.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.matanTerjemah.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.matanArab.includes(searchQuery) ||
        p.runutanFiqh.some(rf => 
          rf.kitabRujukan.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rf.penjelasanHukum.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchMazhab = selectedMazhabFilter === "Semua" ||
        p.runutanFiqh.some(rf => rf.mazhab.includes(selectedMazhabFilter));

      return matchSearch && matchMazhab;
    });
  }, [currentKitab, searchQuery, selectedMazhabFilter]);

  // Icons mapper
  const renderKitabIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'Droplets': return <Droplets size={size} />;
      case 'Compass': return <Compass size={size} />;
      case 'HardDrive': return <HardDrive size={size} />;
      case 'Sparkles': return <Sparkles size={size} />;
      case 'ShieldCheck': return <ShieldCheck size={size} />;
      case 'CreditCard': return <CreditCard size={size} />;
      default: return <BookOpen size={size} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ========================================================
          HERO BANNER & DESKRIPSI KITAB
          ======================================================== */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-6 md:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400"></div>
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Scale size={12} className="text-emerald-400" />
                Matan Dhowabith Fiqhiyyah & Muqaran 4 Mazhab
              </span>
              <span className="text-[10px] font-medium text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Karya Syaikh Dr. Wahid bin Abdussalam Bali
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans flex items-center gap-3">
              <span>Terjemahan Kitab Bidayatul Mutafaqqih</span>
              <span className="text-xl md:text-2xl font-serif text-emerald-400" dir="rtl">(بِدَايَةُ المُتَفَقِّهِ)</span>
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Kajian komprehensif matan fikih berlandaskan rumus kaidah pokok (dhowabith) dan dalil shahih Al-Qur'an dan As-Sunnah. Pembahasan ditata <strong className="text-emerald-300 font-semibold">merunut secara komparatif ke dalam kitab-kitab induk 4 Mazhab</strong> (Asy-Syafi'i, Ahmad bin Hanbal, Malik bin Anas, dan Abu Hanifah) serta kitab hadits ahkam mu'tabar.
            </p>
          </div>

          {/* Quick Stats Widget */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shadow-inner flex flex-col gap-2 min-w-[200px] shrink-0">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-850">
              <span className="text-slate-400">Total Kitab</span>
              <span className="font-bold text-emerald-400 font-mono">{bidayatulMutafaqqihBook.length} Bab Fiqh</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-850">
              <span className="text-slate-400">Kitab Rujukan</span>
              <span className="font-bold text-amber-400 font-mono">24+ Kitab Muktamad</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Tersimpan</span>
              <span className="font-bold text-cyan-400 font-mono">{bookmarkedPassages.length} Pasal</span>
            </div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setViewMode('matan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'matan'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <BookOpen size={14} />
            Matan & Runutan 4 Mazhab
          </button>
          <button
            onClick={() => setViewMode('dhowabith')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'dhowabith'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Scale size={14} />
            Daftar Dhowabith (Kaidah Fiqh)
          </button>
          <button
            onClick={() => setViewMode('pustaka')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'pustaka'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Library size={14} />
            Katalog Kitab Rujukan ({secondarySources.length})
          </button>
          <button
            onClick={() => setViewMode('template_syarah')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'template_syarah'
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-indigo-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/70 text-amber-300 hover:bg-slate-800 border border-amber-500/30'
            }`}
          >
            <Sparkles size={14} className={viewMode === 'template_syarah' ? 'text-slate-950' : 'text-amber-400'} />
            Template Syarah Baku (5 Pilar)
          </button>
          <button
            onClick={() => setViewMode('tafsir_hukum')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'tafsir_hukum'
                ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 text-white font-extrabold shadow-lg shadow-indigo-500/25'
                : 'bg-slate-950/70 text-indigo-300 hover:bg-slate-800 border border-indigo-500/40'
            }`}
          >
            <Layers size={14} className={viewMode === 'tafsir_hukum' ? 'text-white' : 'text-indigo-400'} />
            Tafsir Hukum & Drive Cloud
          </button>
        </div>
      </div>

      {/* ========================================================
          NAVIGASI PEMILIH BAB / KITAB (Horizontal Scrollable)
          ======================================================== */}
      <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {bidayatulMutafaqqihBook.map((kitab) => {
            const isSelected = kitab.id === selectedKitabId;
            return (
              <button
                key={kitab.id}
                onClick={() => setSelectedKitabId(kitab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl whitespace-nowrap text-xs font-bold transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/50 shadow-md shadow-emerald-600/20 scale-[1.02]'
                    : 'bg-slate-950/80 text-slate-300 hover:bg-slate-850 hover:text-white border-slate-800/80'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-emerald-400'}>
                  {renderKitabIcon(kitab.iconName, 15)}
                </span>
                <span>{kitab.titleIndo}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {kitab.passages.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          MODE 1: MATAN & RUNUTAN LINTAS 4 MAZHAB
          ======================================================== */}
      {viewMode === 'matan' && (
        <div className="space-y-6">
          {/* Filter Bar: Pencarian & Pilihan Mazhab */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-lg flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Cari lafazh Arab, kaidah, pasal, atau nama kitab fiqh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-emerald-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-200 outline-none transition-all focus:ring-1 ring-emerald-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-200 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mazhab Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
              <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <Scale size={12} className="text-emerald-400" /> Filter Mazhab:
              </span>
              {['Semua', 'Syafi\'i', 'Hanbali', 'Maliki', 'Hanafi', 'Fiqh Hadits / Tarjih'].map((mzh) => {
                const isSelected = selectedMazhabFilter === mzh;
                return (
                  <button
                    key={mzh}
                    onClick={() => setSelectedMazhabFilter(mzh)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border-slate-800'
                    }`}
                  >
                    {mzh === 'Fiqh Hadits / Tarjih' ? 'Hadits/Tarjih' : mzh}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitab Header Overview */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <BookMarked size={13} /> {currentKitab.titleArab}
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{currentKitab.titleIndo}</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{currentKitab.deskripsi}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl block">
                {filteredPassages.length} Pasal Ditampilkan
              </span>
            </div>
          </div>

          {/* List of Passages */}
          {filteredPassages.length === 0 ? (
            <div className="bg-slate-900 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
              <Info className="mx-auto text-amber-400" size={32} />
              <h3 className="text-base font-bold text-white">Tidak Ada Pasal yang Cocok</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Kueri pencarian "{searchQuery}" atau filter mazhab "{selectedMazhabFilter}" tidak menemukan pasal pada bab ini. Silakan reset pencarian Anda.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedMazhabFilter("Semua"); }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all"
              >
                Reset Filter Pencarian
              </button>
            </div>
          ) : (
            filteredPassages.map((passage) => {
              const isExpanded = expandedPassageIds[passage.id] ?? true;
              const isBookmarked = bookmarkedPassages.includes(passage.id);
              const isSpeaking = activeSpeechId === passage.id;

              return (
                <div 
                  key={passage.id}
                  className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden transition-all hover:border-slate-700/80"
                >
                  {/* Passage Header / Title Bar */}
                  <div className="bg-slate-950 p-4 md:p-5 border-b border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs">
                        #{passage.pasalNumber}
                      </div>
                      <div>
                        <h3 className="text-sm md:text-base font-bold text-white tracking-wide">
                          {passage.subTitle}
                        </h3>
                        <div className="text-[11px] text-emerald-400 font-serif mt-0.5" dir="rtl">
                          {passage.dhabitArab}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Audio Button */}
                      <button
                        onClick={() => handlePlaySpeech(passage.id, `${passage.dhabitArab}. ${passage.matanArab}`)}
                        className={`p-2 rounded-xl text-xs transition-all border ${
                          isSpeaking 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' 
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                        }`}
                        title="Dengarkan bacaan matan Arab"
                      >
                        <Volume2 size={16} />
                      </button>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => toggleBookmark(passage.id)}
                        className={`p-2 rounded-xl text-xs transition-all border ${
                          isBookmarked 
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                        }`}
                        title={isBookmarked ? "Hapus dari penanda" : "Tandai pasal ini"}
                      >
                        <Bookmark size={16} className={isBookmarked ? "fill-cyan-400" : ""} />
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(passage.id, `[Bidayatul Mutafaqqih - Pasal ${passage.pasalNumber}]\n${passage.dhabitArab}\n${passage.matanArab}\n\nTerjemahan:\n${passage.matanTerjemah}`)}
                        className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all text-xs"
                        title="Salin Matan & Terjemahan"
                      >
                        {copiedId === passage.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>

                      {/* Expand/Collapse Toggle */}
                      <button
                        onClick={() => toggleExpand(passage.id)}
                        className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 transition-all text-xs"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-5 md:p-6 space-y-6"
                      >
                        {/* 1. KOTAK DHABIT (RUMUS FIQH) */}
                        <div className="bg-gradient-to-r from-emerald-950/40 to-teal-950/30 p-4 rounded-2xl border border-emerald-500/25">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono mb-1 flex items-center gap-1.5">
                            <Scale size={12} /> DHABIT FIQHIYYAH (RUMUS PATOKAN MATAN)
                          </div>
                          <div className="text-xs md:text-sm font-semibold text-emerald-200">
                            {passage.dhabitTerjemah}
                          </div>
                        </div>

                        {/* 2. TEKS MATAN ARAB ASLI & TERJEMAHAN INDONESIA */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Matan Arab */}
                          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/90 space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                                نَصُّ المَتْنِ الأَصْلِيِّ (Teks Arab Matan)
                              </span>
                              <span className="text-[10px] text-slate-500">Berharakat Lengkap</span>
                            </div>
                            <div 
                              className="text-base md:text-lg font-serif text-slate-100 leading-loose text-right selection:bg-amber-500/30"
                              dir="rtl"
                            >
                              {passage.matanArab}
                            </div>
                          </div>

                          {/* Terjemahan Indonesia */}
                          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/90 space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                                TERJEMAHAN RESMI INDONESIA
                              </span>
                              <span className="text-[10px] text-slate-500">Bahasa Indonesia Baku</span>
                            </div>
                            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
                              {passage.matanTerjemah}
                            </p>
                          </div>
                        </div>

                        {/* 3. DALIL NAQLI (AL-QUR'AN & AS-SUNNAH SHAHIHAH) */}
                        {passage.dalilNaqli && passage.dalilNaqli.length > 0 && (
                          <div className="bg-slate-950/60 p-4 md:p-5 rounded-2xl border border-slate-800 space-y-3">
                            <div className="text-[11px] font-bold text-teal-400 uppercase tracking-wider font-mono flex items-center gap-2">
                              <Award size={13} /> DALIL POKOK NAQLI (AL-QUR'AN & AS-SUNNAH)
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {passage.dalilNaqli.map((dalil, idx) => (
                                <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                                  <div className="text-sm font-serif text-slate-200 text-right leading-relaxed" dir="rtl">
                                    {dalil.teksArab}
                                  </div>
                                  <div className="text-xs text-slate-300 italic">
                                    {dalil.terjemah}
                                  </div>
                                  <div className="text-[10px] font-mono text-emerald-400 font-semibold border-t border-slate-800/60 pt-1.5">
                                    Takhrij: {dalil.sumber}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 4. RUNUTAN KOMPARASI LINTAS KITAB FIQH 4 MAZHAB */}
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                              <Compass size={14} className="text-indigo-400" />
                              RUNUTAN KE DALAM PEMBAHASAN KITAB-KITAB FIQH 4 MAZHAB:
                            </h4>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {passage.runutanFiqh.length} Rujukan Fiqh Terkait
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {passage.runutanFiqh
                              .filter(rf => selectedMazhabFilter === 'Semua' || rf.mazhab.includes(selectedMazhabFilter))
                              .map((rf, rIdx) => {
                                const badgeColor = 
                                  rf.mazhab === 'Syafi\'i' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                  rf.mazhab === 'Hanbali' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                  rf.mazhab === 'Maliki' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' :
                                  rf.mazhab === 'Hanafi' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                                  'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';

                                return (
                                  <div 
                                    key={rIdx}
                                    className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-2.5 relative flex flex-col justify-between"
                                  >
                                    <div>
                                      {/* Header Kartu Rujukan */}
                                      <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${badgeColor}`}>
                                          Mazhab {rf.mazhab}
                                        </span>
                                        {rf.statusQaul && (
                                          <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                            {rf.statusQaul}
                                          </span>
                                        )}
                                      </div>

                                      <div className="font-bold text-xs text-slate-100 flex items-baseline gap-1.5">
                                        <span>📖 {rf.kitabRujukan}</span>
                                      </div>
                                      <div className="text-[10px] text-slate-400 font-mono">
                                        Penulis: {rf.penulis} &bull; {rf.halamanJilid}
                                      </div>

                                      {/* Penjelasan Pendapat Mazhab */}
                                      <p className="text-xs text-slate-300 leading-relaxed mt-2 pt-2 border-t border-slate-850">
                                        {rf.penjelasanHukum}
                                      </p>
                                    </div>

                                    {/* Link ke Shamela / Sumber Asli */}
                                    {rf.shamelaUrl && (
                                      <div className="pt-2">
                                        <a
                                          href={rf.shamelaUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/20 transition-all"
                                        >
                                          <ExternalLink size={11} /> Buka Naskah Asli di Maktabah Syamilah
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </div>

                        {/* 5. FAEDAH PENTING SANTRI / CATATAN AKADEMIK */}
                        {passage.faedahSantri && (
                          <div className="bg-amber-950/20 p-4 rounded-2xl border border-amber-500/25 flex items-start gap-3">
                            <Sparkles className="text-amber-400 shrink-0 mt-0.5" size={18} />
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                                FAEDAH ILMIAH & CATATAN PRAKTIS SANTRI
                              </span>
                              <p className="text-xs text-amber-100/90 leading-relaxed">
                                {passage.faedahSantri}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* 6. TOMBOL BEDAH SISTEMATIKA SYARAH BAKU */}
                        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                          <button
                            onClick={() => setViewMode('template_syarah')}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-indigo-500/30 text-amber-300 hover:text-white border border-amber-500/40 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
                          >
                            <Sparkles size={14} className="text-amber-400" />
                            <span>Buka Template Sistematika Syarah Baku (5 Pilar)</span>
                          </button>

                          <span className="text-[10px] text-slate-500 font-mono">
                            Etimologi &bull; Dalil/Takhrij &bull; 4 Mazhab &bull; Tarjih &bull; Nawazil Modern
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================
          MODE 2: RINGKASAN SELURUH DHOWABITH (FORMULA FIQH)
          ======================================================== */}
      {viewMode === 'dhowabith' && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Scale size={13} /> MAQASHID & KAIDAH MATAN POKOK
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white">
              Tabel Dhowabith Fiqhiyyah (Rumus Patokan Bidayatul Mutafaqqih)
            </h2>
            <p className="text-xs text-slate-400">
              Kompilasi rumus kaidah fikih ringkas yang disusun untuk memudahkan hafalan dan pemahaman para penuntut ilmu (mutafaqqih).
            </p>
          </div>

          <div className="space-y-4">
            {bidayatulMutafaqqihBook.map((kitab) => (
              <div key={kitab.id} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                    {renderKitabIcon(kitab.iconName, 14)}
                    {kitab.titleIndo} ({kitab.titleArab})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {kitab.passages.length} Kaidah
                  </span>
                </div>

                <div className="divide-y divide-slate-850">
                  {kitab.passages.map((p) => (
                    <div key={p.id} className="p-4 hover:bg-slate-900/30 transition-all space-y-1.5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-slate-200">
                          Pasal {p.pasalNumber}: {p.subTitle}
                        </span>
                        <span className="text-[11px] font-serif text-amber-400 text-right shrink-0" dir="rtl">
                          {p.dhabitArab}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-300/90 leading-relaxed">
                        {p.dhabitTerjemah}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          MODE 3: KATALOG KITAB RUJUKAN FIQH LENGKAP
          ======================================================== */}
      {viewMode === 'pustaka' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Library size={13} /> MAKTABAH TURATS FIQHUL ISLAMI
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white">
              Direktori Kitab-Kitab Rujukan Fiqh 4 Mazhab & Hadits Ahkam
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
              Seluruh rujukan yang dijadikan dasar pemaparan dalam aplikasi telah diselaraskan dengan kitab-kitab induk fikih mu'tabar dari Mazhab Syafi'i, Hanbali, Hanafi, Maliki, serta ushul fiqh dan kaidah fiqhiyyah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {secondarySources.map((source) => (
              <div 
                key={source.id}
                className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {source.category}
                    </span>
                    {source.mazhab && (
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {source.mazhab}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {source.title}
                  </h3>

                  <div className="text-[11px] text-slate-400 font-medium">
                    Penulis: <span className="text-slate-300">{source.author}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {source.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {source.locationDetail || "Maktabah Syamilah"}
                  </span>
                  <a
                    href={source.externalLink || source.uri}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-all"
                  >
                    Buka Kitab <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          MODE 4: TEMPLATE SISTEMATIKA SYARAH BAKU (5 PILAR)
          ======================================================== */}
      {viewMode === 'template_syarah' && (
        <SyarahTemplateSection />
      )}

      {/* ========================================================
          MODE 5: KHAZANAH TAFSIR HUKUM & GOOGLE DRIVE CLOUD
          ======================================================== */}
      {viewMode === 'tafsir_hukum' && (
        <TafsirHukumSection onOpenSyarahTemplate={() => setViewMode('template_syarah')} />
      )}
    </div>
  );
}
