import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, ShieldCheck, Sparkles, Award, CheckCircle2, 
  ExternalLink, HeartHandshake, ChevronRight, AlertCircle, RefreshCw,
  Lock, Globe, ArrowUpRight, BookOpen, Layers
} from 'lucide-react';
import { apiClient } from '../services/apiClient';

export const PAYMENT_GATEWAY_LINKS = {
  Premium: "https://ganbate-education.lynk.id/p/patungan-quranica-ai-belajar-al-qur-an-lebih-terarah",
  Platinum: "https://ganbate-education.lynk.id/p/belajar-tajwid-dan-hafalan-al-qur-an-dibantu-ai"
};

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: 'Premium' | 'Platinum';
  currentUser?: { uid: string; email: string; displayName?: string; tier?: string } | null;
  currentIp?: string;
  onPaymentSuccess?: (updatedUser: any, updatedQuota: any) => void;
}

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  defaultTier = 'Premium',
  currentUser,
  currentIp,
  onPaymentSuccess
}: PaymentGatewayModalProps) {
  const [selectedTier, setSelectedTier] = useState<'Premium' | 'Platinum'>(defaultTier);
  const [donorName, setDonorName] = useState(currentUser?.displayName || '');
  const [donorEmail, setDonorEmail] = useState(currentUser?.email || '');
  const [niatPenelitian, setNiatPenelitian] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'success'>('details');
  const [hasOpenedLink, setHasOpenedLink] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPaymentUrl = PAYMENT_GATEWAY_LINKS[selectedTier];
  const tierPrice = selectedTier === 'Platinum' ? 50000 : 10000;

  const handleOpenLynkIdGateway = () => {
    setHasOpenedLink(true);
    window.open(currentPaymentUrl, '_blank', 'noopener,noreferrer');
  };

  const handleConfirmAndActivate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!donorEmail.trim()) {
      setErrorMessage("Silakan cantumkan email Anda untuk sinkronisasi akun dan konfirmasi patungan.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.submitPatunganPayment({
        uid: currentUser?.uid || `guest_${Date.now()}`,
        email: donorEmail.trim().toLowerCase(),
        donorName: donorName || (currentUser?.displayName || "Peneliti Turats Fiqh"),
        tier: selectedTier,
        amount: tierPrice,
        paymentMethod: 'lynk_id_gateway',
        niat: niatPenelitian || `Patungan Penelitian Quranica AI (${selectedTier})`
      });

      if (response && response.success) {
        setPaymentStep('success');
        onPaymentSuccess?.(response.user, response.quota);
      } else {
        throw new Error(response.message || "Gagal memproses verifikasi patungan penelitian.");
      }
    } catch (err: any) {
      console.error("Payment activation error:", err);
      setErrorMessage(err.message || "Terjadi kendala saat aktivasi patungan.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden my-6"
      >
        {/* Top Gradient Bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <HeartHandshake size={22} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                Payment Gateway Patungan Penelitian
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Lynk.id Resmi
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pilih paket patungan untuk riset Turats, server AI GPU, & analisis fiqh komparatif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto custom-scrollbar space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {paymentStep === 'details' && (
            <>
              {/* Pilihan Paket Patungan */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  PILIH PAKET PATUNGAN PENELITIAN:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Premium Card (10K) */}
                  <div
                    onClick={() => setSelectedTier('Premium')}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all relative ${
                      selectedTier === 'Premium'
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                        : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    {selectedTier === 'Premium' && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">
                        <Check size={12} />
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Sparkles size={16} />
                      <span>Paket Premium (10K)</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-100">Rp 10.000</span>
                      <span className="text-[11px] text-slate-400">/ 10K</span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <strong>200 Chat per Hari</strong> (Login + IP)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        Akses Pustaka 4 Mazhab
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        Download Hasil PDF Akademis
                      </li>
                    </ul>
                  </div>

                  {/* Platinum Card (50K) */}
                  <div
                    onClick={() => setSelectedTier('Platinum')}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all relative ${
                      selectedTier === 'Platinum'
                        ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/50'
                        : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Rekomendasi Peneliti
                    </div>
                    {selectedTier === 'Platinum' && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-bold">
                        <Check size={12} />
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Award size={16} />
                      <span>Paket Platinum (50K)</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-100">Rp 50.000</span>
                      <span className="text-[11px] text-slate-400">/ 50K</span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-1.5 text-amber-300 font-bold">
                        <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                        <strong>Unlimited Chat Tanpa Batas</strong>
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-300 font-bold">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <strong>Deep Research 5 Layer</strong>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                        On-time Progressive Streaming
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                        Akses Full Google Drive Repositori
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dedicated Lynk.id Payment Gateway Action Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Globe size={15} />
                    <span>LINK PAYMENT GATEWAY RESMI LYNK.ID</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Nominal: Rp {tierPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <div className="text-[10px] text-slate-400 font-mono">Halaman Checkout Lynk.id:</div>
                    <a
                      href={currentPaymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:underline font-mono truncate block max-w-sm"
                    >
                      {currentPaymentUrl}
                    </a>
                  </div>
                  <a
                    href={currentPaymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setHasOpenedLink(true)}
                    className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs shrink-0 flex items-center gap-1"
                  >
                    <span>Buka</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Halaman resmi pembayaran mendukung seluruh metode: <strong>QRIS (BCA, Mandiri, BRI, BNI), GoPay, OVO, ShopeePay, DANA</strong>, serta Virtual Account bank resmi.
                </p>

                {/* Direct Lynk.id CTA Button */}
                <button
                  type="button"
                  onClick={handleOpenLynkIdGateway}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock size={15} />
                  <span>Buka Gateway Pembayaran Lynk.id ({selectedTier} - Rp {tierPrice.toLocaleString('id-ID')})</span>
                  <ExternalLink size={15} />
                </button>
              </div>

              {/* Data Donatur / Peneliti untuk Aktivasi Akun Langsung */}
              <form onSubmit={handleConfirmAndActivate} className="space-y-4 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    SINKRONISASI AKUN & AKTIVASI INSTAN:
                  </span>
                  {currentIp && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      IP Terkini: {currentIp}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Nama Anda atau Hamba Allah"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Niat / Doa Penelitian (Opsional)
                  </label>
                  <input
                    type="text"
                    value={niatPenelitian}
                    onChange={(e) => setNiatPenelitian(e.target.value)}
                    placeholder="Contoh: Niat infaq riset fiqh komparatif & tafsir ayat ahkam"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Instant Verification Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Mengaktifkan Paket {selectedTier}...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>⚡ Konfirmasi Patungan & Aktifkan Paket {selectedTier} Instan</span>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-500 text-center">
                  *Setelah menyelesaikan transfer di Lynk.id atau melalui formulir ini, status akun dan kuota chat Anda akan langsung diperbarui seketika.
                </p>
              </form>
            </>
          )}

          {paymentStep === 'success' && (
            <div className="py-6 px-2 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                <Check size={32} />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-100">
                  Alhamdulillah! Paket {selectedTier} Berhasil Aktif
                </h3>
                <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  Jazakumullahu khairan katsiran atas partisipasi Anda dalam patungan penelitian Turats Fiqh & Tafsir Ahkam.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 text-left space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Tingkat Akun:</span>
                  <span className="font-bold text-emerald-400">Paket {selectedTier} Aktif</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Kuota Chat:</span>
                  <span className="font-bold text-slate-200">
                    {selectedTier === 'Platinum' ? 'Unlimited Chat Tanpa Batas' : '200 Chat per Hari'}
                  </span>
                </div>
                {selectedTier === 'Platinum' && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Deep Research 5 Layer:</span>
                    <span className="font-bold text-amber-400">Aktif & Siap Digunakan</span>
                  </div>
                )}
                {currentIp && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tersinkronisasi IP:</span>
                    <span className="font-mono text-slate-300">{currentIp}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Mulai Mengkaji Tafsir & Fiqh Sekarang →
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
