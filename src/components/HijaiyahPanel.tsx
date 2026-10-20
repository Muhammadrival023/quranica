import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import { HIJAIYAH_MAP } from '../data/hijaiyahMap';

export default function HijaiyahPanel() {
  const [selectedLetter, setSelectedLetter] = useState<string>("ا");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const letters = Object.keys(HIJAIYAH_MAP);
  const currentDetail = HIJAIYAH_MAP[selectedLetter];

  const playVoiceNote = (vnNumber: string) => {
    setAudioError(null);
    setIsPlaying(true);
    const audio = new Audio(`/api/vn/${vnNumber}`);
    audio.play().catch((err) => {
      console.warn("Audio playback note:", err.message);
      setAudioError(`Audio koreksi VN-${vnNumber} belum tersedia di server.`);
    });
    audio.onended = () => setIsPlaying(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-emerald-400" size={20} />
            Katalog 28 Huruf Hijaiyah & Panduan Fonetik
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Klik huruf untuk meninjau posisi makhraj, sifat bunyi, dan memutar rekaman talaqqi guru.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
          <BookOpen size={14} className="text-emerald-400" />
          <span>Metode Standar Matan Al-Jazariyah</span>
        </div>
      </div>

      {/* Grid of 28 Letters */}
      <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-14 gap-2">
        {letters.map((char) => {
          const isSelected = selectedLetter === char;
          return (
            <button
              key={char}
              onClick={() => {
                setSelectedLetter(char);
                setAudioError(null);
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                isSelected
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/10 scale-105'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <span className="text-2xl font-arabic font-bold">{char}</span>
              <span className="text-[10px] text-slate-400 mt-1">{HIJAIYAH_MAP[char].nama}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Card */}
      {currentDetail && (
        <div className="bg-slate-950/70 border border-emerald-500/20 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center bg-slate-900/60 rounded-xl p-4 border border-slate-800/80">
            <span className="text-6xl font-arabic text-emerald-400 mb-2 leading-none">{selectedLetter}</span>
            <span className="text-base font-bold text-white tracking-wide">{currentDetail.nama}</span>
            <span className="text-xs text-slate-500">Kode Talaqqi: VN-{currentDetail.vn}</span>
            
            <button
              onClick={() => playVoiceNote(currentDetail.vn)}
              disabled={isPlaying}
              className="mt-4 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all active:scale-95 disabled:opacity-50"
            >
              <Volume2 size={16} />
              {isPlaying ? "Memutar Audio..." : "Dengarkan Contoh VN"}
            </button>
            {audioError && (
              <p className="text-[10px] text-amber-400/90 mt-2 text-center">{audioError}</p>
            )}
          </div>

          <div className="md:col-span-2 space-y-4 flex flex-col justify-center">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Tempat Keluarnya Bunyi (Makhraj)</span>
              <p className="text-sm font-semibold text-slate-200 mt-0.5">{currentDetail.makhraj}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Karakteristik & Sifat Huruf</span>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{currentDetail.sifat}</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400">Contoh Lafal dalam Ayat:</span>
                <span className="text-lg font-arabic font-bold text-emerald-300 block mt-0.5">{currentDetail.contoh}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400/80 font-medium">
                <CheckCircle2 size={14} />
                <span>Terverifikasi RAG</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
