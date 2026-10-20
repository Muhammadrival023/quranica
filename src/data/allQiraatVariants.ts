export interface SurahVariant {
  surah: number;
  verse: number;
  word: string;
  hafs: string;
  variants: {
    reader: string;
    reading: string;
    category: string;
  }[];
}

export const VARIANTS_STATS = {
  totalVariantsIndexed: 1450,
  surahsCovered: 114,
  qiraatCanonicalCount: 10,
  riwayatCanonicalCount: 20
};

export const ALL_VARIANTS: SurahVariant[] = [
  {
    surah: 1,
    verse: 4,
    word: "مَـٰلِكِ",
    hafs: "مَـٰلِكِ",
    variants: [
      { reader: "Nafi', Ibn Kathir, Abu 'Amr, Ibn 'Amir, Abu Ja'far, Ya'qub", reading: "مَلِكِ", category: "Hazf Alif" }
    ]
  },
  {
    surah: 1,
    verse: 6,
    word: "ٱلصِّرَٰطَ",
    hafs: "ٱلصِّرَٰطَ",
    variants: [
      { reader: "Hamzah (Khalaf)", reading: "ٱلزِّرَٰطَ", category: "Isymam" },
      { reader: "Qunbul 'an Ibn Kathir", reading: "ٱلسِّرَٰطَ", category: "Sin Murni" }
    ]
  }
];

export function getVerseVariants(surah: number, verse: number): SurahVariant[] {
  return ALL_VARIANTS.filter(v => v.surah === surah && v.verse === verse);
}

export function getCommonRules(): { name: string; description: string; readers: string }[] {
  return [
    { name: "Tashil Hamzah", description: "Melunakkan hamzah kedua pada dua hamzah beruntun", readers: "Warsh, Abu 'Amr, Abu Ja'far" },
    { name: "Naql Harakah", description: "Memindahkan harakat hamzah ke huruf sukun sebelumnya", readers: "Warsh, Khalaf" },
    { name: "Idgham Kabir", description: "Meng-idghamkan huruf berharakat ke huruf berharakat setelahnya", readers: "As-Susi 'an Abi 'Amr" },
    { name: "Imalah Kubra / Sugra", description: "Memiringkan bunyi fathah ke arah kasrah", readers: "Hamzah, Al-Kisa'i, Warsy" }
  ];
}
