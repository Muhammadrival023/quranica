import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, ExternalLink, BookOpen, Layers, CheckCircle, Search, 
  Sparkles, Compass, Shield, BookMarked, Filter, Share2, Copy
} from 'lucide-react';
import { 
  tafsirHukumSources, 
  GOOGLE_DRIVE_REF_FOLDER, 
  INTEGRASI_SYARAH_TAFSIR_PANDUAN, 
  type TafsirHukumSource 
} from '../data/tafsirHukumData';

interface TafsirHukumSectionProps {
  onOpenSyarahTemplate?: () => void;
}

export default function TafsirHukumSection({ onOpenSyarahTemplate }: TafsirHukumSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<TafsirHukumSource | null>(tafsirHukumSources[0]);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredSources = tafsirHukumSources.filter(src => {
    const matchesCategory = selectedCategory === 'all' || src.category === selectedCategory;
    const matchesSearch = 
      src.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.mazhab.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyDriveLink = () => {
    navigator.clipboard.writeText(GOOGLE_DRIVE_REF_FOLDER.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ========================================================
          BANNER UTAMA: INTEGRASI GOOGLE DRIVE REPOSITORI TAFSIR & FIQH
          ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 p-6 md:p-8 border border-indigo-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <FolderGit2 size={13} className="text-indigo-400" />
              <span>Digital Turats Cloud Repository</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-mono">Drive Terintegrasi</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Khazanah Referensi Fiqh & <span className="bg-gradient-to-r from-amber-400 to-indigo-300 bg-clip-text text-transparent">Tafsir Hukum (Ayatul Ahkam)</span>
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Seluruh literatur turats dari Google Drive folder <span className="text-indigo-300 font-mono text-xs font-bold">1WI-NCISZe9K2DKb6v...</span> kini telah dipetakan sebagai landasan <span className="text-amber-300 font-semibold">Istinbath & Tafsir Ahkam</span> untuk menyempurnakan Syarah Kitab Bidāyatul Mutafaqqih karya Syaikh Dr. Wahid Bali.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
                📚 4 Mazhab (Hanafi, Maliki, Syafi'i, Hanbali)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
                ⚖️ 5 Kitab Induk Tafsir Ahkam
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
                🔍 Takhrij Hadits Sunnah
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={GOOGLE_DRIVE_REF_FOLDER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all border border-indigo-400/30 hover:scale-[1.02]"
            >
              <FolderGit2 size={16} />
              <span>Buka Google Drive Folder</span>
              <ExternalLink size={14} className="opacity-80" />
            </a>

            <button
              onClick={handleCopyDriveLink}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition-all"
            >
              <Copy size={13} />
              <span>{copiedLink ? 'Link Berhasil Disalin!' : 'Salin Tautan Drive'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          PANDUAN ALUR 5 LANGKAH INTEGRASI TAFSIR KE SYARAH
          ======================================================== */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass size={16} className="text-amber-400" />
            <h3 className="text-sm font-bold text-white">Sistematika Alur Integrasi: Dari Ayat Al-Qur'an Menuju Syarah Madzhab</h3>
          </div>
          {onOpenSyarahTemplate && (
            <button
              onClick={onOpenSyarahTemplate}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Buka Template 5 Pilar</span>
              <Sparkles size={12} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {INTEGRASI_SYARAH_TAFSIR_PANDUAN.map((item) => (
            <div 
              key={item.langkah}
              className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/40 transition-colors"
            >
              <div>
                <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-black flex items-center justify-center mb-2">
                  {item.langkah}
                </div>
                <h4 className="text-xs font-bold text-slate-200 mb-1">{item.nama}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          FILTER & PENCARIAN KITAB RUJUKAN
          ======================================================== */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Semua Rujukan ({tafsirHukumSources.length})
          </button>
          <button
            onClick={() => setSelectedCategory('tafsir_ahkam')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'tafsir_ahkam'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tafsir Ayat Ahkam (5)
          </button>
          <button
            onClick={() => setSelectedCategory('fiqh_muqaran')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'fiqh_muqaran'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Fiqh Muqaran 4 Mazhab (4)
          </button>
          <button
            onClick={() => setSelectedCategory('hadits_ahkam')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'hadits_ahkam'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Hadits Ahkam & Sunnah (2)
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kitab, pengarang, mazhab..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* ========================================================
          GRID 2 KOLOM: DAFTAR KITAB & DETAIL BEDAH TAFSIR
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Daftar Kartu Kitab */}
        <div className="lg:col-span-5 space-y-3">
          {filteredSources.map((source) => {
            const isSelected = selectedSource?.id === source.id;
            return (
              <motion.div
                key={source.id}
                onClick={() => setSelectedSource(source)}
                whileHover={{ scale: 1.01 }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-slate-900 to-indigo-950/80 border-indigo-400/60 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1 ${
                      source.category === 'tafsir_ahkam'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : source.category === 'fiqh_muqaran'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    }`}>
                      {source.mazhab}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {source.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {source.author} • <span className="text-slate-500">{source.era}</span>
                    </p>
                  </div>
                  <div className={`p-2 rounded-xl shrink-0 ${
                    isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    <BookOpen size={16} />
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {source.description}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                  <span className="text-indigo-400 font-medium">
                    {source.primaryAyatFokus.length} Fokus Ayat Utama
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <span>Google Drive</span>
                    <ExternalLink size={10} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Kolom Kanan: Detail Bedah Kitab & Relevansinya untuk Syarah Bidayah */}
        <div className="lg:col-span-7">
          {selectedSource ? (
            <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5 sticky top-4">
              {/* Header Detail */}
              <div className="border-b border-slate-800 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
                    {selectedSource.mazhab}
                  </span>
                  <span className="text-slate-500 text-xs font-medium">
                    {selectedSource.era}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-1">
                  {selectedSource.title}
                </h3>
                <p className="font-arabic text-lg text-amber-300/90 dir-rtl mb-2">
                  {selectedSource.titleArabic}
                </p>
                <p className="text-xs text-slate-300 font-medium">
                  Pengarang: <span className="text-white font-semibold">{selectedSource.author}</span>
                </p>
                {selectedSource.tahqiqDanCetakan && (
                  <p className="text-xs text-slate-400 mt-1">
                    Tahqiq/Cetakan: <span className="text-slate-300">{selectedSource.tahqiqDanCetakan}</span>
                  </p>
                )}
              </div>

              {/* Deskripsi & Metodologi */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookMarked size={13} className="text-amber-400" />
                  <span>Karakteristik & Signifikansi Metodologis</span>
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                  {selectedSource.description}
                </p>
              </div>

              {/* Fokus Ayat Ahkam Pokok */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-indigo-400" />
                  <span>Ayat-Ayat Ahkam Utama yang Dikaji</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSource.primaryAyatFokus.map((ayat, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-indigo-200 font-medium flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{ayat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contoh Aplikasi Nyata pada Bab Bidayatul Mutafaqqih */}
              <div className="bg-gradient-to-r from-amber-950/30 to-slate-950 p-4 rounded-2xl border border-amber-500/30">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Shield size={13} />
                  <span>Peran dalam Syarah Bidayatul Mutafaqqih</span>
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedSource.sampleBabApplication}
                </p>
              </div>

              {/* Tag Topik Kunci */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Topik Kajian Kunci:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSource.topikKunci.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tombol Akses Tautan Drive & Syarah */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={GOOGLE_DRIVE_REF_FOLDER.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
                >
                  <FolderGit2 size={14} />
                  <span>Lihat Dokumen di Google Drive</span>
                  <ExternalLink size={12} />
                </a>

                {onOpenSyarahTemplate && (
                  <button
                    onClick={onOpenSyarahTemplate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-md shadow-amber-500/20"
                  >
                    <BookOpen size={14} />
                    <span>Terapkan ke Template Syarah</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400 text-xs">
              Pilih salah satu kitab di kolom kiri untuk melihat analisis komprehensif tafsir hukumnya.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
