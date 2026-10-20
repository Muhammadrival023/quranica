import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Layers, Download, Share2, Copy, Check, ChevronLeft, 
  ChevronRight, Plus, RefreshCw, Trash2, Edit3, Eye, FileText, 
  BookOpen, ShieldCheck, Palette, Compass, ArrowRight, CornerDownRight,
  Maximize2, Database, Upload, Wand2, Info, Image as ImageIcon,
  CheckCircle2, AlertCircle, Sliders, ExternalLink, Hash, SplitSquareVertical
} from 'lucide-react';

export interface CarouselSlide {
  slideNumber: number;
  isMasterAnchor: boolean;
  type: 'cover' | 'key_point' | 'quote_ayah' | 'comparison' | 'summary';
  tag: string;
  title: string;
  arabicSnippet?: string;
  content: string;
  bulletPoints?: string[];
  citation: string;
  callToAction?: string;
  nanoBananaPrompt?: string;
  generatedImageUrl?: string;
}

export interface MasterStyle {
  themeId: string;
  themeName: string;
  bgGradient: string;
  bgColor: string;
  accentColor: string;
  secondaryAccent: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  tagColor: string;
  cardBg: string;
  patternStyle: string;
  fontHeading: string;
  fontBody: string;
  groundingWatermark: string;
  masterNanoBananaStylePrompt?: string;
}

export interface CarouselData {
  topic: string;
  summary: string;
  masterStyle: MasterStyle;
  slides: CarouselSlide[];
}

// Preset prompts specifically tailored for dividing into up to 10 carousel slides with Nano Banana
const NANO_BANANA_PRESETS = [
  {
    label: "10 Babak Surah Al-Kahfi & 4 Fitnah",
    prompt: "Bagi ke dalam 10 slide carousel: 10 Babak Penting Surah Al-Kahfi & 4 Fitnah Akhir Zaman (Fitnah Iman Ashabul Kahfi, Fitnah Harta Pemilik Dua Kebun, Fitnah Ilmu Nabi Musa & Khidir, Fitnah Kekuasaan Raja Dzulkarnain). Buat prompt Nano Banana gambar islami yang artistik dengan Slide 1 sebagai patokan gaya emas dan zamrud.",
    topic: "10 Babak Surah Al-Kahfi & 4 Fitnah Akhir Zaman",
    theme: "emerald_turats",
    slides: 10
  },
  {
    label: "10 Kaidah Emas Tajwid & Tartil",
    prompt: "Bagi ke dalam 10 slide carousel: 10 Kaidah Emas Tajwid & Makharijul Huruf Standar Mandhumah Al-Jazariyah. Mulai dari makhraj rongga mulut (Al-Jauf), tenggorokan (Al-Halq), lidah (Al-Lisan), bibir (Asy-Syafatain), hingga sifat lazimah dan aridhah. Setiap slide harus memiliki prompt Nano Banana visual berestetika kaligrafi kufic sapphire.",
    topic: "10 Kaidah Emas Tajwid & Tartil Al-Jazariyah",
    theme: "sapphire_kufic",
    slides: 10
  },
  {
    label: "10 Adab Membaca Al-Qur'an (Imam Nawawi)",
    prompt: "Bagi ke dalam 10 slide carousel: 10 Adab Berinteraksi dengan Al-Qur'an berdasarkan Kitab At-Tibyan karya Imam An-Nawawi: 1. Ikhlas niat, 2. Bersuci & siwak, 3. Memilih tempat tenang, 4. Menghadap kiblat, 5. Membaca ta'awudz & basmalah, 6. Tartil & tadabbur, 7. Menangis saat ayat ancaman, 8. Merespon ayat rahmat, 9. Menjaga mushaf, 10. Mengamalkan isi Al-Qur'an dalam keseharian.",
    topic: "10 Adab Interaksi Al-Qur'an (At-Tibyan)",
    theme: "manuscript_gold",
    slides: 10
  },
  {
    label: "10 Asmaul Husna Teragung",
    prompt: "Bagi ke dalam 10 slide carousel: 10 Asma'ul Husna Paling Agung dalam Al-Qur'an (Al-Hayyu, Al-Qayyum, Al-Awwal, Al-Akhir, Az-Zhahir, Al-Bathin, Al-Quddus, As-Salam, Al-Mu'min, Al-Muhaymin) beserta hikmah ketenangan batin untuk manusia modern.",
    topic: "10 Asma'ul Husna Teragung & Ketenangan Jiwa",
    theme: "andalusia_ruby",
    slides: 10
  },
  {
    label: "Maqashid Syariah & AI Modern (5 Poin)",
    prompt: "Bagi ke dalam 5 slide carousel: 5 Prinsip Perlindungan Universal Maqashid Syariah (Hifz Ad-Din, Hifz An-Nafs, Hifz Al-'Aql, Hifz An-Nasl, Hifz Al-Mal) di era revolusi kecerdasan buatan.",
    topic: "5 Pilar Maqashid Syariah di Era AI",
    theme: "notebooklm_slate",
    slides: 5
  }
];

const THEME_OPTIONS = [
  { id: 'emerald_turats', name: 'Turats Emerald & Gold', dot: 'bg-emerald-500' },
  { id: 'sapphire_kufic', name: 'Royal Kufic Sapphire', dot: 'bg-sky-500' },
  { id: 'manuscript_gold', name: 'Manuscript Parchment & Amber', dot: 'bg-amber-500' },
  { id: 'notebooklm_slate', name: 'NotebookLM Modern Slate', dot: 'bg-teal-400' },
  { id: 'andalusia_ruby', name: 'Andalusia Ruby & Rose', dot: 'bg-rose-500' },
];

export default function CarouselGenerator() {
  // Input Modes
  const [activeInputMode, setActiveInputMode] = useState<'nano_banana_split' | 'notebooklm_research'>('nano_banana_split');
  
  // Prompt Split Mode States
  const [nanoBananaPromptInput, setNanoBananaPromptInput] = useState(NANO_BANANA_PRESETS[0].prompt);
  const [promptTopic, setPromptTopic] = useState(NANO_BANANA_PRESETS[0].topic);

  // NotebookLM Grounding States
  const [topic, setTopic] = useState(NANO_BANANA_PRESETS[0].topic);
  const [sourceNotes, setSourceNotes] = useState("Kajian komprehensif 10 bagian tematik turats Al-Qur'an, disintesis secara berurutan dari pengantar hingga kesimpulan.");
  const [groundingSource, setGroundingSource] = useState("Tafsir Ibnu Katsir & Riset Tematik Ulumul Qur'an");

  // Common Controls
  const [selectedTheme, setSelectedTheme] = useState("emerald_turats");
  const [slideCount, setSlideCount] = useState(10); // Strictly max 10
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5'>('1:1');

  // Carousel Data State
  const [carouselData, setCarouselData] = useState<CarouselData | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [copiedAllPrompts, setCopiedAllPrompts] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [batchDownloading, setBatchDownloading] = useState(false);

  // Nano Banana Image Generation state
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isBatchGeneratingImages, setIsBatchGeneratingImages] = useState(false);
  const [imageGenMessage, setImageGenMessage] = useState<string | null>(null);
  const [visualDisplayMode, setVisualDisplayMode] = useState<'infographic' | 'image_overlay'>('infographic');

  // Add Slide Modal
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);
  const [addSlidePrompt, setAddSlidePrompt] = useState("");
  const [isAddingSlide, setIsAddingSlide] = useState(false);

  // Edit Mode
  const [editMode, setEditMode] = useState(false);

  // Initial generation on component mount
  useEffect(() => {
    handleGenerateCarousel(
      NANO_BANANA_PRESETS[0].topic, 
      NANO_BANANA_PRESETS[0].prompt, 
      sourceNotes, 
      "emerald_turats", 
      10
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselData) return;
      if (e.key === 'ArrowLeft') {
        setActiveSlideIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveSlideIndex(prev => Math.min(carouselData.slides.length - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [carouselData]);

  // Main Generator Call: Handles splitting nano banana prompts into max 10 slides
  const handleGenerateCarousel = async (
    targetTopic = (activeInputMode === 'nano_banana_split' ? promptTopic : topic), 
    targetRawPrompt = (activeInputMode === 'nano_banana_split' ? nanoBananaPromptInput : ""),
    targetNotes = sourceNotes, 
    targetTheme = selectedTheme,
    targetCount = slideCount
  ) => {
    setIsGenerating(true);
    setImageGenMessage(null);
    try {
      const safeCount = Math.max(1, Math.min(10, targetCount));
      const res = await fetch("/api/carousel/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: targetTopic,
          rawPrompt: targetRawPrompt,
          sourceNotes: targetNotes,
          slideCount: safeCount,
          styleTheme: targetTheme,
          groundingSource: groundingSource,
        })
      });

      if (!res.ok) throw new Error("Gagal menghubungi server");
      const data: CarouselData = await res.json();
      setCarouselData(data);
      setActiveSlideIndex(0);
    } catch (err) {
      console.error("Carousel generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Image with Nano Banana for current slide
  const handleGenerateNanoBananaImage = async () => {
    if (!carouselData) return;
    const slide = carouselData.slides[activeSlideIndex];
    if (!slide || !slide.nanoBananaPrompt) return;

    setIsGeneratingImage(true);
    setImageGenMessage(null);

    try {
      const res = await fetch("/api/carousel/generate-nano-banana-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: slide.nanoBananaPrompt,
          aspectRatio: aspectRatio
        })
      });

      const result = await res.json();
      if (result.success && result.imageUrl) {
        const updated = [...carouselData.slides];
        updated[activeSlideIndex].generatedImageUrl = result.imageUrl;
        setCarouselData({ ...carouselData, slides: updated });
        setVisualDisplayMode('image_overlay');
        setImageGenMessage(`Gambar Nano Banana untuk Slide ${activeSlideIndex + 1} berhasil digenerate!`);
      } else {
        setImageGenMessage(result.message || "Model gambar sedang sibuk. Prompt siap disalin langsung ke Gemini / Imagen.");
      }
    } catch (err: any) {
      console.error("Nano Banana generation error:", err);
      setImageGenMessage("Gagal menghubungi endpoint Nano Banana.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Batch generate Nano Banana images for all slides
  const handleBatchGenerateNanoBananaImages = async () => {
    if (!carouselData || carouselData.slides.length === 0) return;
    setIsBatchGeneratingImages(true);
    setImageGenMessage("Memulai pembuatan gambar Nano Banana batch...");

    try {
      const updatedSlides = [...carouselData.slides];
      let successCount = 0;

      for (let i = 0; i < updatedSlides.length; i++) {
        const slide = updatedSlides[i];
        if (!slide.nanoBananaPrompt) continue;

        try {
          const res = await fetch("/api/carousel/generate-nano-banana-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: slide.nanoBananaPrompt,
              aspectRatio: aspectRatio
            })
          });
          const result = await res.json();
          if (result.success && result.imageUrl) {
            updatedSlides[i].generatedImageUrl = result.imageUrl;
            successCount++;
          }
        } catch (e) {
          console.warn(`Gagal generate gambar slide ${i + 1}`, e);
        }
      }

      setCarouselData({ ...carouselData, slides: updatedSlides });
      setVisualDisplayMode('image_overlay');
      setImageGenMessage(`Batch selesai: ${successCount} dari ${updatedSlides.length} gambar Nano Banana berhasil digenerate!`);
    } catch (err) {
      setImageGenMessage("Terjadi kendala saat batch gambar.");
    } finally {
      setIsBatchGeneratingImages(false);
    }
  };

  // Add Next Slide that inherits Slide 1's Master Style (Strictly Max 10)
  const handleAddSlide = async () => {
    if (!carouselData || !addSlidePrompt.trim()) return;
    if (carouselData.slides.length >= 10) {
      alert("Maksimal carousel adalah 10 slide.");
      return;
    }

    setIsAddingSlide(true);
    try {
      const res = await fetch("/api/carousel/add-slide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: carouselData.topic,
          masterStyle: carouselData.masterStyle, // Strictly passing Slide 1's master style!
          existingSlides: carouselData.slides,
          userPrompt: addSlidePrompt.trim(),
        })
      });

      if (!res.ok) throw new Error("Gagal menambah slide baru");
      const result = await res.json();
      if (result.slide) {
        setCarouselData(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            slides: [...prev.slides, result.slide]
          };
        });
        setActiveSlideIndex(carouselData.slides.length);
        setShowAddSlideModal(false);
        setAddSlidePrompt("");
      }
    } catch (err) {
      console.error("Add slide error:", err);
    } finally {
      setIsAddingSlide(false);
    }
  };

  // Delete slide
  const handleDeleteSlide = (index: number) => {
    if (!carouselData || carouselData.slides.length <= 1) return;
    const updated = carouselData.slides.filter((_, idx) => idx !== index).map((s, idx) => ({
      ...s,
      slideNumber: idx + 1,
      isMasterAnchor: idx === 0
    }));
    setCarouselData({ ...carouselData, slides: updated });
    setActiveSlideIndex(prev => Math.min(updated.length - 1, prev));
  };

  // Copy single slide Nano Banana prompt
  const handleCopySlidePrompt = (idx: number, promptText?: string) => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText).then(() => {
      setCopiedPromptIndex(idx);
      setTimeout(() => setCopiedPromptIndex(null), 2500);
    });
  };

  // Copy all Nano Banana prompts (Slide 1 to 10) in batch
  const handleCopyAllNanoBananaPrompts = () => {
    if (!carouselData) return;
    let batchText = `# BATCH NANO BANANA PROMPTS (MAKSIMAL 10 SLIDE)\n`;
    batchText += `Topik: ${carouselData.topic}\n`;
    batchText += `Jumlah Slide: ${carouselData.slides.length} Lembar (Maksimal 10)\n`;
    batchText += `Master Visual Style Anchor: Slide 1 (${carouselData.masterStyle.themeName})\n\n`;

    carouselData.slides.forEach((s) => {
      batchText += `=====================================\n`;
      batchText += `SLIDE ${s.slideNumber} / ${carouselData.slides.length}: ${s.title} ${s.isMasterAnchor ? '[📌 MASTER STYLE ANCHOR]' : '[MEWARISI STYLE SLIDE 1]'}\n`;
      batchText += `Prompt: ${s.nanoBananaPrompt || carouselData.masterStyle.masterNanoBananaStylePrompt}\n\n`;
    });

    navigator.clipboard.writeText(batchText).then(() => {
      setCopiedAllPrompts(true);
      setTimeout(() => setCopiedAllPrompts(false), 2500);
    });
  };

  // Copy carousel summary as text
  const handleCopyText = () => {
    if (!carouselData) return;
    let fullText = `📱 CAROUSEL INFOGRAFIS (${carouselData.slides.length} SLIDE): ${carouselData.topic}\n\n`;
    fullText += `📌 Ringkasan: ${carouselData.summary}\n\n`;
    carouselData.slides.forEach((s) => {
      fullText += `--- ${s.tag} ---\n`;
      fullText += `【${s.title}】\n`;
      if (s.arabicSnippet) fullText += `${s.arabicSnippet}\n`;
      fullText += `${s.content}\n`;
      if (s.bulletPoints) {
        s.bulletPoints.forEach(b => fullText += `• ${b}\n`);
      }
      fullText += `${s.citation}\n\n`;
    });
    fullText += `Dihasilkan oleh Quranica AI Studio · Grounding NotebookLM & Nano Banana`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  };

  // Helper function to render a slide onto an offscreen canvas
  const drawSlideCanvas = (slide: CarouselSlide, totalSlides: number, style: MasterStyle): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = aspectRatio === '1:1' ? 1080 : 1350;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    if (style.themeId === 'sapphire_kufic') {
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#172554');
      gradient.addColorStop(1, '#020617');
    } else if (style.themeId === 'manuscript_gold') {
      gradient.addColorStop(0, '#1c1917');
      gradient.addColorStop(0.5, '#292524');
      gradient.addColorStop(1, '#0c0a09');
    } else if (style.themeId === 'notebooklm_slate') {
      gradient.addColorStop(0, '#090d16');
      gradient.addColorStop(0.5, '#0f172a');
      gradient.addColorStop(1, '#020617');
    } else if (style.themeId === 'andalusia_ruby') {
      gradient.addColorStop(0, '#4c0519');
      gradient.addColorStop(0.5, '#2e0814');
      gradient.addColorStop(1, '#0f0206');
    } else {
      gradient.addColorStop(0, '#022c22');
      gradient.addColorStop(0.5, '#064e3b');
      gradient.addColorStop(1, '#021e17');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Outer Ornamental Frame
    ctx.strokeStyle = style.accentColor || '#10b981';
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(44, 44, width - 88, height - 88);

    // Decorative corner dots
    ctx.fillStyle = style.secondaryAccent || '#fbbf24';
    const corners = [
      [36, 36], [width - 36, 36],
      [36, height - 36], [width - 36, height - 36]
    ];
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Header: Tag & Watermark
    ctx.font = '600 20px Inter, sans-serif';
    ctx.fillStyle = style.accentColor || '#10b981';
    ctx.fillText(slide.tag.toUpperCase(), 70, 95);

    ctx.font = '500 16px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'right';
    ctx.fillText("Quranica AI · NotebookLM & Nano Banana", width - 70, 95);
    ctx.textAlign = 'left';

    // Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(70, 115);
    ctx.lineTo(width - 70, 115);
    ctx.stroke();

    // Title
    ctx.font = 'bold 44px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    let y = 175;
    const words = slide.title.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > width - 140 && n > 0) {
        ctx.fillText(line, 70, y);
        line = words[n] + ' ';
        y += 54;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 70, y);
    y += 40;

    // Arabic Snippet
    if (slide.arabicSnippet) {
      ctx.font = '36px "Amiri", serif';
      ctx.fillStyle = style.secondaryAccent || '#fbbf24';
      ctx.textAlign = 'right';
      ctx.fillText(slide.arabicSnippet, width - 70, y + 20);
      ctx.textAlign = 'left';
      y += 65;
    }

    // Content paragraph
    ctx.font = '22px Inter, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    const contentWords = slide.content.split(' ');
    let cLine = '';
    for (let n = 0; n < contentWords.length; n++) {
      const testLine = cLine + contentWords[n] + ' ';
      if (ctx.measureText(testLine).width > width - 140 && n > 0) {
        ctx.fillText(cLine, 70, y);
        cLine = contentWords[n] + ' ';
        y += 34;
      } else {
        cLine = testLine;
      }
    }
    ctx.fillText(cLine, 70, y);
    y += 50;

    // Bullet Points
    if (slide.bulletPoints && slide.bulletPoints.length > 0) {
      slide.bulletPoints.forEach((point) => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(70, y, width - 140, 68, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = style.accentColor || '#10b981';
        ctx.beginPath();
        ctx.arc(105, y + 34, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '500 20px Inter, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.fillText(point, 130, y + 41);

        y += 82;
      });
    }

    // Footer
    const footerY = height - 70;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(70, footerY - 25);
    ctx.lineTo(width - 70, footerY - 25);
    ctx.stroke();

    ctx.font = 'italic 16px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(slide.citation, 70, footerY);

    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillStyle = style.accentColor || '#10b981';
    ctx.textAlign = 'right';
    ctx.fillText(`${slide.slideNumber} / ${totalSlides}`, width - 70, footerY);
    ctx.textAlign = 'left';

    return canvas;
  };

  // Export current active slide to PNG
  const handleDownloadSlide = () => {
    if (!carouselData) return;
    const slide = carouselData.slides[activeSlideIndex];
    if (!slide) return;

    setDownloading(true);
    try {
      const canvas = drawSlideCanvas(slide, carouselData.slides.length, carouselData.masterStyle);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `quranica-carousel-slide-${slide.slideNumber}.png`;
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  // Export all slides in carousel as batch PNGs
  const handleBatchDownloadAllSlides = async () => {
    if (!carouselData || carouselData.slides.length === 0) return;
    setBatchDownloading(true);

    try {
      for (let i = 0; i < carouselData.slides.length; i++) {
        const slide = carouselData.slides[i];
        const canvas = drawSlideCanvas(slide, carouselData.slides.length, carouselData.masterStyle);
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `quranica-carousel-${String(i + 1).padStart(2, '0')}-of-${carouselData.slides.length}.png`;
        a.click();
        await new Promise(r => setTimeout(r, 300));
      }
    } finally {
      setBatchDownloading(false);
    }
  };

  const currentSlide = carouselData?.slides[activeSlideIndex];
  const masterStyle = carouselData?.masterStyle;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* ========================================================= */}
      {/* 1. TOP HEADER BANNER (Nano Banana Prompt & Max 10 Carousel) */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 relative">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <span className="text-base">🍌</span>
              <span>Generator Carousel dari Nano Banana Prompt</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold">Maksimal 10 Lembar Carousel</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-sky-400">Patokan Style Slide 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Studio Carousel Infografis & Generator Prompt Nano Banana
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Tulis atau tempelkan prompt Nano Banana Anda: AI secara otomatis <strong>membagi materi ke dalam maksimal 10 lembar slide carousel</strong> berurutan, lengkap dengan <strong>Nano Banana Prompt (AI Text-to-Image)</strong> untuk setiap slide di mana <strong>Slide 1</strong> mengunci master visual archetype!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleGenerateCarousel()}
              disabled={isGenerating}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
              <span>{isGenerating ? "Menyintesis..." : `Bagi ke ${slideCount} Slide Carousel`}</span>
            </button>
          </div>
        </div>

        {/* Quick Presets for Nano Banana Prompts */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 block mb-2 font-medium">
            Pilih Template Prompt Siap Bagi (Maksimal 10 Slide Carousel):
          </span>
          <div className="flex flex-wrap gap-2">
            {NANO_BANANA_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setNanoBananaPromptInput(preset.prompt);
                  setPromptTopic(preset.topic);
                  setTopic(preset.topic);
                  setSelectedTheme(preset.theme);
                  setSlideCount(preset.slides);
                  handleGenerateCarousel(preset.topic, preset.prompt, sourceNotes, preset.theme, preset.slides);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  promptTopic === preset.topic
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                    : "bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                🍌 {preset.label} ({preset.slides} Slide)
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. MAIN WORKBENCH: SETTINGS & CAROUSEL VIEWER */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Mode & Slide Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            
            {/* Input Mode Switcher */}
            <div className="flex rounded-2xl bg-slate-950 p-1 border border-slate-800">
              <button
                onClick={() => setActiveInputMode('nano_banana_split')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeInputMode === 'nano_banana_split'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🍌 Input Prompt Nano Banana</span>
              </button>
              <button
                onClick={() => setActiveInputMode('notebooklm_research')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeInputMode === 'notebooklm_research'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen size={14} />
                <span>Riset Turats / Dokumen</span>
              </button>
            </div>

            {/* MODE 1: NANO BANANA PROMPT SPLITTER (MAX 10 CAROUSEL) */}
            {activeInputMode === 'nano_banana_split' ? (
              <div className="space-y-4 animate-in fade-in-50">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Judul / Topik Utama
                  </label>
                  <input
                    type="text"
                    value={promptTopic}
                    onChange={(e) => setPromptTopic(e.target.value)}
                    placeholder="Contoh: 10 Rahasia Surah Al-Kahfi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 text-sm text-slate-100 outline-none transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-1.5">
                    <span>Prompt Nano Banana / Teks yang Ingin Dibagi</span>
                    <span className="text-[10px] text-amber-400 font-mono">Dibagi ke Max 10 Slide</span>
                  </label>
                  <textarea
                    rows={4}
                    value={nanoBananaPromptInput}
                    onChange={(e) => setNanoBananaPromptInput(e.target.value)}
                    placeholder="Tuliskan prompt Nano Banana atau ringkasan topik yang ingin Anda pecah menjadi maksimal 10 slide carousel..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs text-slate-200 outline-none transition-all leading-relaxed custom-scrollbar resize-none font-mono"
                  />
                </div>
              </div>
            ) : (
              /* MODE 2: NOTEBOOKLM RESEARCH GROUNDING */
              <div className="space-y-4 animate-in fade-in-50">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Topik Kajian
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Topik kajian Al-Qur'an..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-sm text-slate-100 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Catatan Riset / Dokumen Grounding
                  </label>
                  <textarea
                    rows={4}
                    value={sourceNotes}
                    onChange={(e) => setSourceNotes(e.target.value)}
                    placeholder="Tempelkan catatan penelitian NotebookLM..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-slate-200 outline-none resize-none custom-scrollbar"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Rujukan Primer / Kitab Turats
                  </label>
                  <input
                    type="text"
                    value={groundingSource}
                    onChange={(e) => setGroundingSource(e.target.value)}
                    placeholder="Contoh: Tafsir Ibnu Katsir & Mandhumah Al-Jazariyah"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Slider & Quick Buttons: Jumlah Slide (Maksimal 10) */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <SplitSquareVertical size={14} className="text-amber-400" />
                  <span>Bagi ke Dalam Slide Carousel (Maksimal 10):</span>
                </label>
                <span className="text-xs font-bold text-amber-400 font-mono px-2 py-0.5 rounded-lg bg-amber-950/60 border border-amber-800/40">
                  {slideCount} Slide
                </span>
              </div>
              
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={slideCount}
                onChange={(e) => setSlideCount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              {/* Quick Pills for 3, 5, 7, 10 slides */}
              <div className="flex items-center justify-between gap-1.5 mt-2">
                {[3, 5, 7, 10].map((count) => (
                  <button
                    key={count}
                    onClick={() => setSlideCount(count)}
                    className={`flex-1 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                      slideCount === count
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/60"
                        : "bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {count === 10 ? "10 Slide (Max)" : `${count} Slide`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tema Visual (Patokan Slide 1) */}
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between mb-2">
                <span>Tema & Master Visual Archetype</span>
                <span className="text-[10px] text-emerald-400 font-mono">Slide 1 Anchor</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {THEME_OPTIONS.map((thm) => (
                  <button
                    key={thm.id}
                    onClick={() => {
                      setSelectedTheme(thm.id);
                      if (carouselData) {
                        handleGenerateCarousel(carouselData.topic, nanoBananaPromptInput, sourceNotes, thm.id, carouselData.slides.length);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer text-left ${
                      selectedTheme === thm.id
                        ? "border-amber-500 bg-amber-950/40 text-amber-200 ring-1 ring-amber-500/30"
                        : "border-slate-800 bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${thm.dot} shrink-0`} />
                    <span className="truncate">{thm.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Rasio Gambar */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Format Rasio Slide</label>
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                <button
                  onClick={() => setAspectRatio('1:1')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    aspectRatio === '1:1' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  1:1 Square (Instagram / Post)
                </button>
                <button
                  onClick={() => setAspectRatio('4:5')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    aspectRatio === '4:5' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  4:5 Potret (Carousel Vertikal)
                </button>
              </div>
            </div>

            {/* Tombol Utama Eksekusi */}
            <button
              onClick={() => handleGenerateCarousel()}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
            >
              <Wand2 size={16} />
              <span>{isGenerating ? `Membagi ke dalam ${slideCount} Slide...` : `✨ Bagi ke ${slideCount} Slide Carousel & Generate Prompt`}</span>
            </button>
          </div>

          {/* Batch Actions & Quick Export */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Ekspor Prompt & Lembar Carousel</span>
              <span className="text-[10px] text-amber-400 font-mono font-bold">Max 10 Slides</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyAllNanoBananaPrompts}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-800 cursor-pointer"
              >
                {copiedAllPrompts ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedAllPrompts ? "Tersalin!" : "Salin Semua Prompt"}</span>
              </button>

              <button
                onClick={handleBatchDownloadAllSlides}
                disabled={batchDownloading}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-slate-800 cursor-pointer disabled:opacity-50"
              >
                {batchDownloading ? <RefreshCw size={13} className="animate-spin" /> : <Download size={13} />}
                <span>{batchDownloading ? "Mengunduh..." : "Unduh Semua PNG"}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Carousel Viewer & Nano Banana Prompt Inspector (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {carouselData && currentSlide && masterStyle && (
            <div className="space-y-4">
              
              {/* Top Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-300">
                    Slide {activeSlideIndex + 1} dari {carouselData.slides.length}
                  </span>
                  {currentSlide.isMasterAnchor ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      📌 Master Style Anchor
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-950/70 text-teal-300 border border-teal-800/40">
                      Mewarisi Style Slide 1
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Toggle Display Mode */}
                  {currentSlide.generatedImageUrl && (
                    <button
                      onClick={() => setVisualDisplayMode(visualDisplayMode === 'infographic' ? 'image_overlay' : 'infographic')}
                      className="px-2.5 py-1 rounded-xl text-xs font-medium bg-slate-800 text-teal-300 border border-teal-500/30 flex items-center gap-1 cursor-pointer"
                    >
                      <ImageIcon size={13} />
                      <span>{visualDisplayMode === 'infographic' ? "Lihat Gambar AI" : "Lihat Vektor"}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setEditMode(!editMode)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      editMode ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Edit3 size={13} />
                    <span>{editMode ? "Simpan" : "Edit Teks"}</span>
                  </button>

                  <button
                    onClick={handleCopyText}
                    className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedText ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedText ? "Tersalin!" : "Salin Naskah"}</span>
                  </button>

                  <button
                    onClick={handleDownloadSlide}
                    disabled={downloading}
                    className="px-3.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-700/20 cursor-pointer disabled:opacity-50"
                  >
                    <Download size={13} />
                    <span>{downloading ? "PNG..." : "Unduh PNG"}</span>
                  </button>
                </div>
              </div>

              {/* ========================================================= */}
              {/* THE CAROUSEL CARD (Visual Render) */}
              {/* ========================================================= */}
              <div 
                className={`w-full rounded-3xl bg-gradient-to-br ${masterStyle.bgGradient} border-2 ${masterStyle.borderColor} shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-300 p-6 sm:p-9 ${
                  aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[4/5]'
                }`}
                style={{
                  boxShadow: `0 20px 50px -10px ${masterStyle.accentColor}25`
                }}
              >
                {/* Optional Generated Nano Banana Background */}
                {currentSlide.generatedImageUrl && visualDisplayMode === 'image_overlay' && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={currentSlide.generatedImageUrl}
                      alt={currentSlide.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />
                  </div>
                )}

                {/* Ornamental background motif */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none z-0" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none z-0" />

                {/* Corner frame borders */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/60 z-10" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/60 z-10" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 z-10" />

                {/* --- HEADER: Tag & Watermark --- */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                    <span className={`font-mono text-[11px] font-bold tracking-wider px-2 py-0.5 rounded-lg ${masterStyle.tagColor}`}>
                      {currentSlide.tag}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wide">
                      {masterStyle.groundingWatermark}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="mt-4">
                    {editMode ? (
                      <input
                        type="text"
                        value={currentSlide.title}
                        onChange={(e) => {
                          const updated = [...carouselData.slides];
                          updated[activeSlideIndex].title = e.target.value;
                          setCarouselData({ ...carouselData, slides: updated });
                        }}
                        className="w-full text-xl sm:text-2xl font-extrabold bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 text-white outline-none"
                      />
                    ) : (
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug">
                        {currentSlide.title}
                      </h2>
                    )}
                  </div>
                </div>

                {/* --- BODY: Arabic Snippet & Content & Bullets --- */}
                <div className="space-y-3 my-auto py-2 relative z-10">
                  {/* Arabic Snippet */}
                  {currentSlide.arabicSnippet && (
                    <div className="text-right">
                      {editMode ? (
                        <input
                          type="text"
                          value={currentSlide.arabicSnippet}
                          onChange={(e) => {
                            const updated = [...carouselData.slides];
                            updated[activeSlideIndex].arabicSnippet = e.target.value;
                            setCarouselData({ ...carouselData, slides: updated });
                          }}
                          className="w-full text-right font-serif text-xl bg-black/40 border border-amber-500/30 rounded-xl px-3 py-1 text-amber-300 outline-none"
                        />
                      ) : (
                        <p className="font-serif text-xl sm:text-2xl text-amber-300 font-bold tracking-wide leading-loose dir-rtl">
                          {currentSlide.arabicSnippet}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Content Paragraph */}
                  <div>
                    {editMode ? (
                      <textarea
                        rows={3}
                        value={currentSlide.content}
                        onChange={(e) => {
                          const updated = [...carouselData.slides];
                          updated[activeSlideIndex].content = e.target.value;
                          setCarouselData({ ...carouselData, slides: updated });
                        }}
                        className="w-full text-xs sm:text-sm bg-black/40 border border-white/20 rounded-xl p-2 text-slate-200 outline-none leading-relaxed resize-none"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {currentSlide.content}
                      </p>
                    )}
                  </div>

                  {/* Bullet points cards */}
                  {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {currentSlide.bulletPoints.map((bp, bIdx) => (
                        <div 
                          key={bIdx}
                          className={`p-2.5 rounded-2xl ${masterStyle.cardBg} flex items-start gap-2.5 transition-all backdrop-blur-sm`}
                        >
                          <div 
                            className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: masterStyle.accentColor }}
                          />
                          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-normal">
                            {bp}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* --- FOOTER: Citation & Page Counter --- */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
                  <div className="italic truncate max-w-[70%]">
                    {currentSlide.citation}
                  </div>
                  <div className="font-bold font-mono text-amber-400 flex items-center gap-1.5">
                    <span>{currentSlide.slideNumber}</span>
                    <span className="text-slate-600">/</span>
                    <span>{carouselData.slides.length}</span>
                  </div>
                </div>

              </div>

              {/* Navigation Arrows & Dot Stepper */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeSlideIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span>Sebelumnya</span>
                </button>

                <div className="flex items-center gap-1">
                  {carouselData.slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSlideIndex === idx
                          ? "w-6 bg-amber-400"
                          : "w-2 bg-slate-800 hover:bg-slate-700"
                      }`}
                      aria-label={`Buka slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveSlideIndex(prev => Math.min(carouselData.slides.length - 1, prev + 1))}
                  disabled={activeSlideIndex === carouselData.slides.length - 1}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* ========================================================= */}
              {/* NANO BANANA PROMPT INSPECTOR (PER SLIDE) */}
              {/* ========================================================= */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-lg space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🍌</span>
                    <span className="text-xs font-bold text-amber-300">
                      Prompt Nano Banana (Slide {activeSlideIndex + 1} / {carouselData.slides.length})
                    </span>
                    {currentSlide.isMasterAnchor ? (
                      <span className="text-[10px] text-amber-400 font-semibold px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-800/40">
                        Patokan Master Style
                      </span>
                    ) : (
                      <span className="text-[10px] text-teal-400 font-semibold px-2 py-0.5 rounded-full bg-teal-950/70 border border-teal-800/40">
                        Mewarisi Style Slide 1
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopySlidePrompt(activeSlideIndex, currentSlide.nanoBananaPrompt || masterStyle.masterNanoBananaStylePrompt)}
                      className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                    >
                      {copiedPromptIndex === activeSlideIndex ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedPromptIndex === activeSlideIndex ? "Tersalin!" : "Salin Prompt Slide"}</span>
                    </button>

                    <button
                      onClick={handleGenerateNanoBananaImage}
                      disabled={isGeneratingImage || isBatchGeneratingImages}
                      className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {isGeneratingImage ? <RefreshCw size={12} className="animate-spin" /> : <Wand2 size={12} />}
                      <span>{isGeneratingImage ? "Memproses AI..." : "Generate Gambar Slide Ini"}</span>
                    </button>

                    <button
                      onClick={handleBatchGenerateNanoBananaImages}
                      disabled={isBatchGeneratingImages || isGeneratingImage}
                      className="px-3 py-1 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                      title="Generate gambar Nano Banana untuk semua slide secara berurutan"
                    >
                      {isBatchGeneratingImages ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      <span>{isBatchGeneratingImages ? "Batch Memproses..." : "Batch Semua Gambar"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed select-all">
                  {currentSlide.nanoBananaPrompt || masterStyle.masterNanoBananaStylePrompt || "Prompt Nano Banana sedang disiapkan..."}
                </div>

                {imageGenMessage && (
                  <div className="text-[11px] text-amber-300 flex items-center gap-1.5">
                    <Info size={13} />
                    <span>{imageGenMessage}</span>
                  </div>
                )}
              </div>

              {/* Slide Thumbnail Ribbon (Up to 10 slides strictly) */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">
                      Rangkaian {carouselData.slides.length} Slide Carousel
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      (Maksimal 10)
                    </span>
                  </div>
                  
                  {carouselData.slides.length < 10 ? (
                    <button
                      onClick={() => setShowAddSlideModal(true)}
                      className="px-3 py-1 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Tambah Slide ({carouselData.slides.length + 1}/10)</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-medium italic">
                      Maksimal 10 slide tercapai
                    </span>
                  )}
                </div>

                <div className="flex gap-2.5 overflow-x-auto pb-2 custom-scrollbar">
                  {carouselData.slides.map((s, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`min-w-[125px] p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shrink-0 ${
                        activeSlideIndex === idx
                          ? "border-amber-500 bg-amber-950/40 text-amber-200 ring-2 ring-amber-500/20"
                          : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-bold">Slide {s.slideNumber}/10</span>
                        {s.isMasterAnchor && (
                          <span className="text-amber-400 font-bold" title="Patokan Style Utama">📌</span>
                        )}
                        {carouselData.slides.length > 1 && !s.isMasterAnchor && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSlide(idx);
                            }}
                            className="text-rose-400 hover:text-rose-300 transition-colors"
                            title="Hapus slide ini"
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-slate-200 truncate">{s.title}</p>
                      <span className="text-[9px] text-slate-500 mt-1 block truncate">
                        {s.nanoBananaPrompt ? "🍌 Prompt Siap" : s.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. MODAL: ADD NEXT SLIDE WITH SLIDE 1 MASTER STYLE */}
      {/* ========================================================= */}
      {showAddSlideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in-50">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl shadow-emerald-950/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Plus size={18} className="text-emerald-400" />
                <h3 className="font-bold text-base text-white">
                  Tambah Slide Baru ({carouselData ? carouselData.slides.length + 1 : 1}/10)
                </h3>
              </div>
              <button
                onClick={() => setShowAddSlideModal(false)}
                className="text-slate-400 hover:text-slate-200 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Slide baru akan digenerate dengan <strong>mempertahankan 100% patokan desain dari Slide 1</strong> (warna, ornamen, dan format prompt Nano Banana), sehingga seluruh carousel tetap seragam.
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Poin / Aspek Khusus yang Ingin Ditambahkan
              </label>
              <textarea
                rows={3}
                value={addSlidePrompt}
                onChange={(e) => setAddSlidePrompt(e.target.value)}
                placeholder="Contoh: Tambahkan slide tentang kritik sanad hadits dan hikmah aplikatif..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-slate-200 outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAddSlideModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleAddSlide}
                disabled={isAddingSlide || !addSlidePrompt.trim()}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isAddingSlide ? <RefreshCw size={13} className="animate-spin" /> : <Plus size={13} />}
                <span>{isAddingSlide ? "Menghasilkan..." : "Generate Slide Baru"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
