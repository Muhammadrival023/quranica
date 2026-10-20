import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Copy, Check, Sparkles, Scale, Compass, ShieldCheck, 
  FileText, Download, Share2, Layers, BookMarked, CheckCircle2, 
  ChevronRight, ArrowRight, ExternalLink, HelpCircle, Edit3, Eye, RefreshCw
} from 'lucide-react';
import { 
  contohSyarahLengkap, 
  panduanSistematikaSyarah, 
  generateMarkdownSyarahPasal, 
  blankMarkdownTemplate,
  type SyarahPasalTemplate 
} from '../data/syarahTemplateData';
import { bidayatulMutafaqqihBook } from '../data/bidayatulMutafaqqihData';

interface SyarahTemplateSectionProps {
  onSelectPassage?: (passageId: string) => void;
}

export default function SyarahTemplateSection({ onSelectPassage }: SyarahTemplateSectionProps) {
  const [selectedExampleId, setSelectedExampleId] = useState<string>("syarah_th_01");
  const [activePilarTab, setActivePilarTab] = useState<number>(0);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [showBlankTemplateModal, setShowBlankTemplateModal] = useState<boolean>(false);
  const [showDraftingStudio, setShowDraftingStudio] = useState<boolean>(false);

  // Drafting Studio State
  const [draftTitle, setDraftTitle] = useState<string>("Pasal Baru: Syarat Sah Wudhu & Pembatalnya");
  const [draftEtimologi, setDraftEtimologi] = useState<string>("Wudhu secara bahasa berasal dari al-wadha'ah (kebersihan dan kecantikan). Secara syar'i: penggunaan air thahur pada empat anggota badan khusus.");
  const [draftDalil, setDraftDalil] = useState<string>("QS. Al-Maidah: 6 ('Ya ayyuhalladzina amanu idza qumtum ilash-shalah...') & HR. Muslim ('La yaqbalullahu shalata ahadikum idza ahdatsa hatta yatawadh-dha').");
  const [draftHanafi, setDraftHanafi] = useState<string>("Mazhab Hanafi: Rukun wudhu hanya 4 sesuai nash ayat (membasuh wajah, kedua tangan, mengusap kepala, membasuh kaki). Niat dan tertib adalah sunnah muakkadah.");
  const [draftMaliki, setDraftMaliki] = useState<string>("Mazhab Maliki: Menambahkan syarat muwalat (berkesinambungan tanpa jeda kering) dan dalk (menggosok anggota wudhu dengan tangan).");
  const [draftSyafii, setDraftSyafii] = useState<string>("Mazhab Syafi'i: 6 rukun fardhu: niat, membasuh wajah, membasuh kedua tangan sampai siku, mengusap sebagian kepala, membasuh kaki sampai mata kaki, dan tertib berurutan.");
  const [draftHanbali, setDraftHanbali] = useState<string>("Mazhab Hanbali: 6 rukun fardhu dengan kewajiban membaca basmalah dan berkumur-istinsyaq termasuk dalam basuhan wajah.");
  const [draftTarjih, setDraftTarjih] = useState<string>("Tarjih: Niat dan tertib adalah rukun pokok berdasarkan sabda Nabi 'Innamal a'malu bin-niyyat' dan konsistensi Nabi dalam berwudhu tanpa pernah mendahului kaki sebelum wajah.");
  const [draftKontemporer, setDraftKontemporer] = useState<string>("Nawazil Modern: Menggunakan air keran hemat energi, perban medis/gips anti air (mas-h 'alal jaba'ir), dan status wudhu dengan kosmetik water-based / peel-off.");

  const activeSyarah = contohSyarahLengkap.find(s => s.id === selectedExampleId) || contohSyarahLengkap[0];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleExportCustomDraft = () => {
    const customMarkdown = `# DRAFT SYARAH PASAL: ${draftTitle.toUpperCase()}
*Disusun Mengikuti Sistematika Baku Syarah Bidayatul Mutafaqqih*

## 1. MAKNA ETIMOLOGI & TERMINOLOGI
${draftEtimologi}

## 2. ANALISIS DALIL & TAKHRIJ HADITS
${draftDalil}

## 3. PERBANDINGAN PENDAPAT 4 MAZHAB
- **Hanafi:** ${draftHanafi}
- **Maliki:** ${draftMaliki}
- **Syafi'i:** ${draftSyafii}
- **Hanbali:** ${draftHanbali}

## 4. ANALISIS WAJHUL ISTIDLAL & TARJIH
${draftTarjih}

## 5. FAEDAH KONTEMPORER & NAWAZIL MODERN
${draftKontemporer}

---
*Generated with Bidayatul Mutafaqqih Syarah Studio*`;

    handleCopy(customMarkdown, 'custom_draft');
  };

  return (
    <div className="space-y-6">
      {/* ────────────────────────────────────────────────────────
          BANNER SISTEMATIKA UTAMA: 5 PILAR SYARAH BAKU
          ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-6 md:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-indigo-400 to-emerald-400"></div>
        <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-400" />
                Template Metodologis Ilmiah
              </span>
              <span className="text-[10px] font-medium text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                Standar Turats & Perbandingan 4 Mazhab
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Sistematika Baku Syarah Per Pasal
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Struktur modular baku yang dirancang untuk mengurai setiap matan & kaidah (dhabith) dalam <strong className="text-amber-300">Kitab Bidayatul Mutafaqqih</strong> menjadi karya syarah ilmiah yang komprehensif, berbasis analisis bahasa, verifikasi dalil sanad, perbandingan empat mazhab, tarjih muhaqqiq, dan kontekstualisasi zaman modern.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => handleCopy(generateMarkdownSyarahPasal(activeSyarah), 'markdown_active')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              {copiedType === 'markdown_active' ? (
                <>
                  <Check size={14} className="text-white" />
                  <span>Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Salin Syarah Pasal Ini (Markdown)</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleCopy(blankMarkdownTemplate, 'blank_template')}
              className="px-4 py-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all border border-slate-700/80 flex items-center justify-center gap-2"
            >
              {copiedType === 'blank_template' ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Kerangka Kosong Tersalin!</span>
                </>
              ) : (
                <>
                  <Download size={14} className="text-indigo-400" />
                  <span>Unduh Kerangka Kosong Riset</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowDraftingStudio(!showDraftingStudio)}
              className="px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Edit3 size={13} />
              <span>{showDraftingStudio ? 'Tutup Studio Penyusunan' : 'Buka Studio Mandiri Santri'}</span>
            </button>
          </div>
        </div>

        {/* 5 PILAR VISUAL OVERVIEW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-slate-800/80">
          {panduanSistematikaSyarah.langkahLangkah.map((langkah, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                activePilarTab === idx
                  ? 'bg-indigo-950/60 border-indigo-400/60 shadow-md shadow-indigo-950'
                  : 'bg-slate-950/50 border-slate-850 hover:border-slate-750'
              }`}
              onClick={() => setActivePilarTab(idx)}
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 font-bold mb-1">
                <span>0{langkah.tahap}</span>
                <span className="text-slate-500">•</span>
                <span className="truncate">Langkah Pokok</span>
              </div>
              <h4 className="text-xs font-bold text-slate-100 line-clamp-1">
                {langkah.nama.split(' ')[0]} {langkah.nama.split(' ')[1] || ''}
              </h4>
              <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                {langkah.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          INTERACTIVE DRAFTING STUDIO (SANTRI / PENELITI MANDIRI)
          ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showDraftingStudio && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-900 rounded-3xl border border-indigo-500/30 p-6 space-y-5 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-850">
              <div className="flex items-center gap-2">
                <Edit3 className="text-indigo-400" size={18} />
                <h3 className="text-base font-bold text-white">
                  Studio Penyusunan Syarah Mandiri (Research Draft)
                </h3>
              </div>
              <button
                onClick={() => setShowDraftingStudio(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕ Tutup
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Gunakan formulir ini untuk merumuskan syarah pasal kustom Anda secara terstruktur berdasarkan 5 pilar baku. Seluruh isian dapat langsung diekspor ke format Markdown siap kutip.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300">Judul & Identitas Pasal</label>
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-amber-300">1. Makna Etimologi & Terminologi</label>
                <textarea
                  rows={2}
                  value={draftEtimologi}
                  onChange={(e) => setDraftEtimologi(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-emerald-300">2. Analisis Dalil Pokok & Takhrij</label>
                <textarea
                  rows={2}
                  value={draftDalil}
                  onChange={(e) => setDraftDalil(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-rose-300">3a. Mazhab Hanafi</label>
                <textarea
                  rows={2}
                  value={draftHanafi}
                  onChange={(e) => setDraftHanafi(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-indigo-300">3b. Mazhab Maliki</label>
                <textarea
                  rows={2}
                  value={draftMaliki}
                  onChange={(e) => setDraftMaliki(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-teal-300">3c. Mazhab Syafi'i</label>
                <textarea
                  rows={2}
                  value={draftSyafii}
                  onChange={(e) => setDraftSyafii(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-amber-300">3d. Mazhab Hanbali</label>
                <textarea
                  rows={2}
                  value={draftHanbali}
                  onChange={(e) => setDraftHanbali(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-cyan-300">4. Analisis Tarjih & Kaidah Ushul</label>
                <textarea
                  rows={2}
                  value={draftTarjih}
                  onChange={(e) => setDraftTarjih(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-purple-300">5. Faedah Kontemporer & Nawazil Modern</label>
                <textarea
                  rows={2}
                  value={draftKontemporer}
                  onChange={(e) => setDraftKontemporer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleExportCustomDraft}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
              >
                {copiedType === 'custom_draft' ? (
                  <>
                    <Check size={14} />
                    <span>Hasil Draf Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Salin Naskah Draf Lengkap</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────────────────────────────────────────────────────────
          PEMILIH CONTOH SYARAH BAKU
          ──────────────────────────────────────────────────────── */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <BookMarked size={16} className="text-amber-400" />
          <span className="text-xs font-bold text-slate-200">
            Pilih Naskah Syarah Pasal Contoh:
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {contohSyarahLengkap.map((ex) => {
            const isSelected = ex.id === selectedExampleId;
            return (
              <button
                key={ex.id}
                onClick={() => setSelectedExampleId(ex.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {ex.kitabNama.split(' ')[1] || ex.kitabNama}: Pasal {ex.nomorPasal}
              </button>
            );
          })}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          DETAIL DOKUMEN SYARAH PASAL TERPILIH
          ──────────────────────────────────────────────────────── */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Header Pasal Terpilih */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                {activeSyarah.kitabNama} &bull; PASAL {activeSyarah.nomorPasal}
              </span>
              <h3 className="text-lg md:text-xl font-extrabold text-white">
                {activeSyarah.judulPasal}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy(generateMarkdownSyarahPasal(activeSyarah), 'markdown_active_btn')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-all"
              >
                {copiedType === 'markdown_active_btn' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>Salin Markdown</span>
              </button>
            </div>
          </div>

          {/* Dhabith & Matan Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-extrabold">
                DHABITH (RUMUS KAIDAH MATAN)
              </span>
              <p className="text-sm font-serif text-amber-300 text-right leading-relaxed" dir="rtl">
                {activeSyarah.dhabithArab}
              </p>
              <p className="text-xs text-slate-300 italic border-t border-slate-850 pt-2">
                "{activeSyarah.dhabithTerjemah}"
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold">
                TEKS MATAN ASLI & TERJEMAH
              </span>
              <p className="text-sm font-serif text-slate-100 text-right leading-relaxed" dir="rtl">
                {activeSyarah.matanArab}
              </p>
              <p className="text-xs text-slate-300 border-t border-slate-850 pt-2 leading-relaxed">
                {activeSyarah.matanTerjemah}
              </p>
            </div>
          </div>
        </div>

        {/* TAB PILAR NAVIGATOR */}
        <div className="bg-slate-950 px-4 md:px-8 border-b border-slate-800 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 0, label: 'I. Etimologi & Terminologi', icon: BookOpen, color: 'text-amber-400' },
            { id: 1, label: 'II. Dalil & Takhrij Hadits', icon: ShieldCheck, color: 'text-emerald-400' },
            { id: 2, label: 'III. Perbandingan 4 Mazhab', icon: Compass, color: 'text-indigo-400' },
            { id: 3, label: 'IV. Wajhul Istidlal & Tarjih', icon: Scale, color: 'text-cyan-400' },
            { id: 4, label: 'V. Faedah Kontemporer (Nawazil)', icon: Sparkles, color: 'text-purple-400' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePilarTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePilarTab(tab.id)}
                className={`py-3.5 px-3 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-2 transition-all ${
                  isActive
                    ? `border-amber-400 text-white ${tab.color}`
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={14} className={isActive ? tab.color : 'text-slate-500'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ISI TAB SESUAI 5 PILAR */}
        <div className="p-6 md:p-8 space-y-6">
          {/* ────────────────────────────────────────────────────────
              PILAR 1: MAKNA ETIMOLOGI & TERMINOLOGI
              ──────────────────────────────────────────────────────── */}
          {activePilarTab === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  PILAR PERTAMA
                </span>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen size={16} className="text-amber-400" />
                  Makna Etimologi (Lughawi) & Terminologi Syar'i (Ishthilahi)
                </h4>
                <p className="text-xs text-slate-400">
                  Uraian isytiqaq (akar kata) dari kamus mu'tabar (Lisanul Arab & Mu'jam Maqayis al-Lughah) serta batasan definisi para fuqaha.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {activeSyarah.etimologiTerminologi.istilahUtama.map((istilah, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-850">
                      <div className="text-lg font-serif text-amber-400" dir="rtl">
                        {istilah.lafalArab}
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        Transliterasi: <strong className="text-slate-200">{istilah.transliterasi}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider font-mono">
                          📖 Makna Etimologi (Lughatan):
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {istilah.maknaLughawi}
                        </p>
                      </div>

                      <div className="space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                        <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider font-mono">
                          ⚖️ Makna Terminologi Fuqaha (Syar'an):
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {istilah.maknaIshthilahi}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {activeSyarah.etimologiTerminologi.kaidahBahasa && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
                  <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block mb-1">Kaidah Bahasa & Ushul Lughawi:</strong>
                    {activeSyarah.etimologiTerminologi.kaidahBahasa}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ────────────────────────────────────────────────────────
              PILAR 2: ANALISIS DALIL & TAKHRIJ HADITS
              ──────────────────────────────────────────────────────── */}
          {activePilarTab === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  PILAR KEDUA
                </span>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  Analisis Dalil Nash & Takhrij Hadits Ahkam
                </h4>
                <p className="text-xs text-slate-400">
                  Verifikasi sanad, derajat hadits dari kutubus sittah/musnad, dan cara penarikan hukum (wajhul dilalah).
                </p>
              </div>

              <div className="space-y-4">
                {activeSyarah.analisisDalil.dalilList.map((dalil, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-850">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Dalil Nash #{idx + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          {dalil.derajatHadits}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Tahqiq: {dalil.penilaiDerajat}
                        </span>
                      </div>
                    </div>

                    <div className="text-base font-serif text-slate-100 text-right leading-relaxed" dir="rtl">
                      {dalil.nashArab}
                    </div>

                    <p className="text-xs text-slate-300 italic">
                      "{dalil.terjemah}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                          📍 Takhrij Sumber:
                        </span>
                        <span className="text-slate-200 font-semibold">{dalil.takhrij}</span>
                      </div>

                      <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                          🎯 Wajhul Dilalah (Sisi Pendalilan):
                        </span>
                        <span className="text-slate-300">{dalil.wajhulDilalah}</span>
                      </div>
                    </div>

                    {dalil.syahidMutabaah && (
                      <div className="text-[11px] text-slate-400 border-t border-slate-850 pt-2 font-mono">
                        Syahid & Mutaba'ah: <span className="text-slate-300">{dalil.syahidMutabaah}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {activeSyarah.analisisDalil.asbabulWurud && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
                  <strong className="text-emerald-400 block font-mono text-[10px] uppercase">
                    Asbabul Wurud / Latar Belakang Sabda Nabi ﷺ:
                  </strong>
                  <p>{activeSyarah.analisisDalil.asbabulWurud}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* ────────────────────────────────────────────────────────
              PILAR 3: PERBANDINGAN PENDAPAT 4 MAZHAB
              ──────────────────────────────────────────────────────── */}
          {activePilarTab === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
                  PILAR KETIGA
                </span>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Compass size={16} className="text-indigo-400" />
                  Perbandingan Komparatif Antara 4 Mazhab (Fiqh Muqaran)
                </h4>
                <p className="text-xs text-slate-400">
                  Eksplorasi posisi hukum dan argumentasi dari kitab-kitab induk muktamad Hanafi, Maliki, Syafi'i, dan Hanbali.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Mazhab Hanafi */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-rose-500/20 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      1. Mazhab Hanafi
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {activeSyarah.perbandingan4Mazhab.hanafi.statusQaul}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">
                      Tokoh: {activeSyarah.perbandingan4Mazhab.hanafi.tokohUlama}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Rujukan: 📖 {activeSyarah.perbandingan4Mazhab.hanafi.kitabRujukan} ({activeSyarah.perbandingan4Mazhab.hanafi.halamanJilid})
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <strong className="text-slate-300 block text-[11px]">Posisi Hukum:</strong>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                      {activeSyarah.perbandingan4Mazhab.hanafi.posisiHukum}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs pt-1">
                    <strong className="text-slate-400 block text-[10px] uppercase font-mono">Dalil Hujjah:</strong>
                    <p className="text-slate-400 leading-relaxed italic">
                      {activeSyarah.perbandingan4Mazhab.hanafi.dalilArgumentasi}
                    </p>
                  </div>
                </div>

                {/* 2. Mazhab Maliki */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/20 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      2. Mazhab Maliki
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {activeSyarah.perbandingan4Mazhab.maliki.statusQaul}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">
                      Tokoh: {activeSyarah.perbandingan4Mazhab.maliki.tokohUlama}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Rujukan: 📖 {activeSyarah.perbandingan4Mazhab.maliki.kitabRujukan} ({activeSyarah.perbandingan4Mazhab.maliki.halamanJilid})
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <strong className="text-slate-300 block text-[11px]">Posisi Hukum:</strong>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                      {activeSyarah.perbandingan4Mazhab.maliki.posisiHukum}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs pt-1">
                    <strong className="text-slate-400 block text-[10px] uppercase font-mono">Dalil Hujjah:</strong>
                    <p className="text-slate-400 leading-relaxed italic">
                      {activeSyarah.perbandingan4Mazhab.maliki.dalilArgumentasi}
                    </p>
                  </div>
                </div>

                {/* 3. Mazhab Syafi'i */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/20 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      3. Mazhab Syafi'i
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {activeSyarah.perbandingan4Mazhab.syafii.statusQaul}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">
                      Tokoh: {activeSyarah.perbandingan4Mazhab.syafii.tokohUlama}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Rujukan: 📖 {activeSyarah.perbandingan4Mazhab.syafii.kitabRujukan} ({activeSyarah.perbandingan4Mazhab.syafii.halamanJilid})
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <strong className="text-slate-300 block text-[11px]">Posisi Hukum:</strong>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                      {activeSyarah.perbandingan4Mazhab.syafii.posisiHukum}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs pt-1">
                    <strong className="text-slate-400 block text-[10px] uppercase font-mono">Dalil Hujjah:</strong>
                    <p className="text-slate-400 leading-relaxed italic">
                      {activeSyarah.perbandingan4Mazhab.syafii.dalilArgumentasi}
                    </p>
                  </div>
                </div>

                {/* 4. Mazhab Hanbali */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/20 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      4. Mazhab Hanbali
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {activeSyarah.perbandingan4Mazhab.hanbali.statusQaul}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">
                      Tokoh: {activeSyarah.perbandingan4Mazhab.hanbali.tokohUlama}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Rujukan: 📖 {activeSyarah.perbandingan4Mazhab.hanbali.kitabRujukan} ({activeSyarah.perbandingan4Mazhab.hanbali.halamanJilid})
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <strong className="text-slate-300 block text-[11px]">Posisi Hukum:</strong>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-850">
                      {activeSyarah.perbandingan4Mazhab.hanbali.posisiHukum}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs pt-1">
                    <strong className="text-slate-400 block text-[10px] uppercase font-mono">Dalil Hujjah:</strong>
                    <p className="text-slate-400 leading-relaxed italic">
                      {activeSyarah.perbandingan4Mazhab.hanbali.dalilArgumentasi}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ────────────────────────────────────────────────────────
              PILAR 4: WAJHUL ISTIDLAL & TARJIH
              ──────────────────────────────────────────────────────── */}
          {activePilarTab === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  PILAR KEEMPAT
                </span>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale size={16} className="text-cyan-400" />
                  Analisis Wajhul Istidlal & Penetapan Tarjih Terkuat
                </h4>
                <p className="text-xs text-slate-400">
                  Penetapan pendapat rajih berdasarkan kekuatan dalil nash shahih, keselarasan qiyas, dan kaidah ushul fiqh.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-cyan-500/30 space-y-5">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-extrabold block">
                    PENDAPAT TERPILIH (AR-RĀJIH):
                  </span>
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/25 text-xs text-cyan-100 font-semibold leading-relaxed">
                    {activeSyarah.analisisTarjih.pendapatTerpilih}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold block">
                    ALASAN & ARGUMENTASI TARJIH:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {activeSyarah.analisisTarjih.alasanTarjih}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                      ⚖️ Kaidah Ushul Fiqh yang Berlaku:
                    </span>
                    <p className="text-xs font-serif text-amber-300" dir="rtl">
                      {activeSyarah.analisisTarjih.kaidahUshulFiqh}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono text-teal-400 uppercase font-bold block">
                      📚 Ulama Muhaqqiq yang Mendukung:
                    </span>
                    <p className="text-xs text-slate-300">
                      {activeSyarah.analisisTarjih.ulamaMuhaqqiq}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ────────────────────────────────────────────────────────
              PILAR 5: FAEDAH KONTEMPORER & NAWAZIL MODERN
              ──────────────────────────────────────────────────────── */}
          {activePilarTab === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  PILAR KELIMA
                </span>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-400" />
                  Faedah Kontemporer & Studi Kasus Modern (Nawazil Fiqhiyyah)
                </h4>
                <p className="text-xs text-slate-400">
                  Kontekstualisasi hukum dengan sains medis, teknologi masa kini, transaksi fintech, dan fatwa lembaga internasional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-purple-500/25 space-y-2">
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">
                    🔬 Studi Kasus / Isu Kontemporer:
                  </span>
                  <h5 className="text-xs font-bold text-white">
                    {activeSyarah.faedahKontemporer.studiKasusModern}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {activeSyarah.faedahKontemporer.konteksSainsTeknologi}
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/25 space-y-2">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
                    📜 Keputusan Fatwa Lembaga Dunia:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeSyarah.faedahKontemporer.fatwaLembagaDunia}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> Dhowabith Aplikatif Sehari-Hari:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeSyarah.faedahKontemporer.dhowabithAplikatif}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 font-mono">
            Modul Syarah Ilmiah &bull; 5 Pilar Baku Bidayatul Mutafaqqih
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePilarTab(prev => Math.max(0, prev - 1))}
              disabled={activePilarTab === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40"
            >
              &larr; Pilar Sebelumnya
            </button>
            <button
              onClick={() => setActivePilarTab(prev => Math.min(4, prev + 1))}
              disabled={activePilarTab === 4}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40"
            >
              Pilar Berikutnya &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
