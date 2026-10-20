export interface QiraatWordVariant {
  readerId: string;
  readerName: string;
  variantText: string;
  type: string;
  explanation: string;
}

export interface QiraatWord {
  wordIndex: number;
  word: string;
  variants: QiraatWordVariant[];
}

export interface VerseQiraat {
  surah: number;
  verse: number;
  canonicalText: string;
  words: QiraatWord[];
}

export interface QiraatSummary {
  variantCount: number;
  readersInvolved: string[];
  rulesApplied: string[];
}

export const READERS = [
  { id: "nafi", name: "Nāfiʿ al-Madanī", symbol: "ن" },
  { id: "ibn_kathir", name: "Ibn Kathīr al-Makkī", symbol: "ك" },
  { id: "abu_amr", name: "Abū ʿAmr al-Baṣrī", symbol: "ع" },
  { id: "ibn_amir", name: "Ibn ʿĀmir ash-Shāmī", symbol: "ش" },
  { id: "asim", name: "ʿĀṣim al-Kūfī (Ḥafṣ)", symbol: "ص" },
  { id: "hamzah", name: "Ḥamzah al-Kūfī", symbol: "ح" },
  { id: "al_kisai", name: "al-Kisāʾī al-Kūfī", symbol: "س" },
  { id: "abu_jafar", name: "Abū Jaʿfar al-Madanī", symbol: "ج" },
  { id: "yaqub", name: "Yaʿqūb al-Ḥaḍramī", symbol: "ي" },
  { id: "khalaf", name: "Khalaf al-ʿĀshir", symbol: "خ" }
];

export function analyzeVerse(verseArabic: string, surahNum: number, verseNum: number): VerseQiraat {
  const wordsRaw = verseArabic.trim().split(/\s+/);
  const words: QiraatWord[] = wordsRaw.map((w, idx) => {
    const variants: QiraatWordVariant[] = [];
    
    // Al-Fatihah v4
    if (surahNum === 1 && verseNum === 4 && (w.includes("مَـٰلِكِ") || w.includes("مَالِكِ") || w.includes("مَلِكِ"))) {
      variants.push({
        readerId: "nafi",
        readerName: "Nafi', Ibn Kathir, Abu 'Amr",
        variantText: "مَلِكِ",
        type: "Qashr / Hazf Alif",
        explanation: "Dibaca tanpa alif dengan makna Penguasa / Raja Tunggal Hari Pembalasan."
      });
    }

    // Al-Fatihah v6
    if (surahNum === 1 && verseNum === 6 && (w.includes("ٱلصِّرَٰطَ") || w.includes("الصراط") || w.includes("الصِّراط"))) {
      variants.push({
        readerId: "hamzah",
        readerName: "Hamzah (Khalaf)",
        variantText: "ٱلزِّرَٰطَ",
        type: "Isymam",
        explanation: "Pencampuran bunyi Shad dengan Zai (Isymam)."
      });
      variants.push({
        readerId: "ibn_kathir",
        readerName: "Qunbul 'an Ibn Kathir",
        variantText: "ٱلسِّرَٰطَ",
        type: "Ibdal Sin",
        explanation: "Dibaca dengan huruf Sin murni."
      });
    }

    // General pattern check
    if (w.includes("يُخَـٰدِعُونَ") || w.includes("يُخَادِعُونَ")) {
      variants.push({
        readerId: "nafi",
        readerName: "Nafi' & Abu 'Amr",
        variantText: "يَخْدَعُونَ",
        type: "Bina Tsulatsi Mujarrad",
        explanation: "Dibaca yakhda'un (wazan fa'ala)."
      });
    }

    return {
      wordIndex: idx + 1,
      word: w,
      variants
    };
  });

  return {
    surah: surahNum,
    verse: verseNum,
    canonicalText: verseArabic,
    words
  };
}

export function getQiraatSummary(verseQiraat: VerseQiraat): QiraatSummary {
  let variantCount = 0;
  const readersSet = new Set<string>();
  const rulesSet = new Set<string>();

  verseQiraat.words.forEach(w => {
    w.variants.forEach(v => {
      variantCount++;
      readersSet.add(v.readerId);
      if (v.type) rulesSet.add(v.type);
    });
  });

  if (rulesSet.size === 0) {
    rulesSet.add("Madd & Qashr Kaidah Induk");
    rulesSet.add("Waqaf & Ibtida'");
  }

  return {
    variantCount,
    readersInvolved: Array.from(readersSet),
    rulesApplied: Array.from(rulesSet)
  };
}
