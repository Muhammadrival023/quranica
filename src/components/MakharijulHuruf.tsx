import React, { useState } from 'react';
import { BookOpen, Activity, ChevronRight, Layers } from 'lucide-react';

interface MakhrajCategory {
  id: string;
  name: string;
  arabicName: string;
  letters: string[];
  description: string;
  subPoints: {
    name: string;
    letters: string[];
    detail: string;
  }[];
}

const MAKHARIJ_DATA: MakhrajCategory[] = [
  {
    id: "al_jauf",
    name: "Al-Jauf",
    arabicName: "الجَوْف",
    letters: ["ا", "و", "ي"],
    description: "Rongga terbuka antara mulut dan tenggorokan. Merupakan tempat keluarnya huruf madd (panjang).",
    subPoints: [
      {
        name: "Huruf Madd Thobi'i",
        letters: ["ا", "و", "ي"],
        detail: "Alif sesudah fathah, Wawu sukun sesudah dhammah, dan Ya' sukun sesudah kasrah."
      }
    ]
  },
  {
    id: "al_halq",
    name: "Al-Halq",
    arabicName: "الحَلْق",
    letters: ["ء", "ه", "ع", "ح", "غ", "خ"],
    description: "Tenggorokan, terbagi menjadi 3 bagian spesifik: pangkal, tengah, dan ujung tenggorokan.",
    subPoints: [
      {
        name: "Aqshal Halq (Pangkal Tenggorokan)",
        letters: ["ء", "ه"],
        detail: "Bagian tenggorokan terdalam dekat pita suara (vocal cords)."
      },
      {
        name: "Wasathul Halq (Tengah Tenggorokan)",
        letters: ["ع", "ح"],
        detail: "Bagian tengah tenggorokan dekat katup epiglotis."
      },
      {
        name: "Adnal Halq (Ujung Tenggorokan)",
        letters: ["غ", "خ"],
        detail: "Tenggorokan bagian teratas dekat pangkal lidah dan anak lidah."
      }
    ]
  },
  {
    id: "al_lisan",
    name: "Al-Lisan",
    arabicName: "اللِّسَان",
    letters: ["ق", "ك", "ج", "ش", "ي", "ض", "ل", "ن", "ر", "ط", "د", "ت", "ص", "ز", "س", "ظ", "ذ", "ث"],
    description: "Lidah, memiliki 10 makhraj khusus untuk 18 huruf yang mencakup pangkal, tengah, sisi, dan ujung lidah.",
    subPoints: [
      {
        name: "Aqshal Lisan (Pangkal Lidah)",
        letters: ["ق", "ك"],
        detail: "Pangkal lidah menempel ke langit-langit lunak (Qaf) dan langit-langit keras (Kaf)."
      },
      {
        name: "Wasathul Lisan (Tengah Lidah)",
        letters: ["ج", "ش", "ي"],
        detail: "Tengah lidah terangkat ke langit-langit atas."
      },
      {
        name: "Hafatul Lisan (Tepi / Sisi Lidah)",
        letters: ["ض"],
        detail: "Sisi kiri atau kanan lidah bersentuhan dengan gigi geraham atas."
      },
      {
        name: "Tharaful Lisan (Ujung Lidah)",
        letters: ["ل", "ن", "ر", "ط", "د", "ت", "ص", "ز", "س", "ظ", "ذ", "ث"],
        detail: "Ujung lidah dengan gigi seri atas, bawah, ataupun gusi atas."
      }
    ]
  },
  {
    id: "asy_syafatain",
    name: "Asy-Syafatain",
    arabicName: "الشَّفَتَيْن",
    letters: ["ف", "ب", "م", "و"],
    description: "Dua bibir, terbagi menjadi bagian dalam bibir bawah dan pertemuan kedua bibir.",
    subPoints: [
      {
        name: "Bathnus Syafah (Bagian Dalam Bibir Bawah)",
        letters: ["ف"],
        detail: "Gigi seri atas menempel pada bagian dalam bibir bawah."
      },
      {
        name: "Dua Bibir Bersama (Keduanya)",
        letters: ["ب", "م", "و"],
        detail: "Merapatkan dua bibir (Ba', Mim) atau membundarkan dua bibir (Wawu)."
      }
    ]
  },
  {
    id: "al_khaisyum",
    name: "Al-Khaisyum",
    arabicName: "الخَيْشُوم",
    letters: ["مّ", "نّ"],
    description: "Pangkal hidung / rongga hidung, tempat keluarnya getaran dengung (ghunnah) pada Nun dan Mim.",
    subPoints: [
      {
        name: "Rongga Hidung (Ghunnah)",
        letters: ["مّ", "نّ"],
        detail: "Suara dengung murni berdurasi 2 harakat saat tasydid, ikhfa', atau idgham bighunnah."
      }
    ]
  }
];

export default function MakharijulHuruf() {
  const [activeMakhraj, setActiveMakhraj] = useState<string>("al_halq");
  const selected = MAKHARIJ_DATA.find(m => m.id === activeMakhraj) || MAKHARIJ_DATA[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="text-emerald-400" size={18} />
            Peta Anatomis Makhorijul Huruf (5 Sektor Global)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Pilah wilayah fonetik makhraj untuk mendiagnosis ketepatan makharij bacaan tahsin.
          </p>
        </div>
        <span className="text-[11px] font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 self-start md:self-auto">
          Matan Al-Jazariyah: 17 Makhraj
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {MAKHARIJ_DATA.map((item) => {
          const isActive = activeMakhraj === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMakhraj(item.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">{item.name}</span>
                <span className="text-sm font-arabic font-bold text-emerald-400/80">{item.arabicName}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.letters.slice(0, 4).map((l, i) => (
                  <span key={i} className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-300 font-arabic">
                    {l}
                  </span>
                ))}
                {item.letters.length > 4 && (
                  <span className="text-[9px] text-slate-500 self-center">+{item.letters.length - 4}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Makhraj Details */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">{selected.name}</span>
              <span className="text-lg font-arabic text-emerald-300">({selected.arabicName})</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">{selected.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Sub-Makhraj Spesifik & Huruf Terkait:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selected.subPoints.map((sub, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <ChevronRight size={14} className="text-emerald-400" />
                    {sub.name}
                  </span>
                  <div className="flex gap-1">
                    {sub.letters.map((l, i) => (
                      <span key={i} className="text-base font-arabic font-bold bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pl-5">{sub.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
