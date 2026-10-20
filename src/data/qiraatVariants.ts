export interface QiraatReader {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  deathYear: number;
}

export interface ShadhdhSource {
  id: string;
  name: string;
  nameEn: string;
}

export interface VariantItem {
  readerId: string;
  text: string;
  note?: string;
}

export interface VerseVariant {
  surah: number;
  verse: number;
  wordIndex: number;
  canonicalText: string;
  variants: VariantItem[];
}

export const QIRAAT_READERS: QiraatReader[] = [
  { id: "nafi", name: "نافع المدني", nameEn: "Nafi' al-Madani (Qalun & Warsh)", city: "Madinah", deathYear: 169 },
  { id: "ibn_kathir", name: "ابن كثير المكي", nameEn: "Ibn Kathir al-Makki (Al-Bazzi & Qunbul)", city: "Makkah", deathYear: 120 },
  { id: "abu_amr", name: "أبو عمرو البصري", nameEn: "Abu 'Amr al-Basri (Ad-Duri & As-Susi)", city: "Bashrah", deathYear: 154 },
  { id: "ibn_amir", name: "ابن عامر الشامي", nameEn: "Ibn 'Amir ad-Dimashqi (Hisham & Ibn Dhakwan)", city: "Damaskus", deathYear: 118 },
  { id: "asim", name: "عاصم الكوفي", nameEn: "'Asim al-Kufi (Syu'bah & Hafs)", city: "Kufah", deathYear: 127 },
  { id: "hamzah", name: "حمزة الكوفي", nameEn: "Hamzah al-Kufi (Khalaf & Khallad)", city: "Kufah", deathYear: 156 },
  { id: "al_kisai", name: "الكسائي الكوفي", nameEn: "Al-Kisa'i al-Kufi (Abul Harits & Ad-Duri)", city: "Kufah", deathYear: 189 },
  { id: "abu_jafar", name: "أبو جعفر المدني", nameEn: "Abu Ja'far al-Madani (Ibnu Wardan & Ibnu Jammaz)", city: "Madinah", deathYear: 130 },
  { id: "yaqub", name: "يعقوب الحضرمي", nameEn: "Ya'qub al-Hadrami (Ruwais & Rauh)", city: "Bashrah", deathYear: 205 },
  { id: "khalaf", name: "خلف العاشر", nameEn: "Khalaf al-'Asyir (Ishaq & Idris)", city: "Kufah", deathYear: 229 }
];

export const SHADHDH_SOURCES: ShadhdhSource[] = [
  { id: "hasan_al_basri", name: "الحسن البصري", nameEn: "Al-Hasan al-Basri (w. 110 H)" },
  { id: "ibn_muhaisin", name: "ابن محيصن", nameEn: "Ibn Muhaysin (w. 123 H)" },
  { id: "yahya_al_yazidi", name: "يحيى اليزيدي", nameEn: "Yahya al-Yazidi (w. 202 H)" },
  { id: "al_amasy", name: "الأعمش", nameEn: "Al-A'mash Sulaiman bin Mihran (w. 148 H)" }
];

export const VERSE_VARIANTS: VerseVariant[] = [
  {
    surah: 1,
    verse: 4,
    wordIndex: 1,
    canonicalText: "مَـٰلِكِ",
    variants: [
      { readerId: "nafi", text: "مَلِكِ", note: "Tanpa alif (Raja / Pemilik Kekuasaan Hakiki)" },
      { readerId: "ibn_kathir", text: "مَلِكِ", note: "Tanpa alif" },
      { readerId: "abu_amr", text: "مَلِكِ", note: "Tanpa alif" },
      { readerId: "ibn_amir", text: "مَلِكِ", note: "Tanpa alif" },
      { readerId: "hamzah", text: "مَـٰلِكِ", note: "Dengan alif (Pemilik Hari Pembalasan)" },
      { readerId: "asim", text: "مَـٰلِكِ", note: "Dengan alif (Standar Hafs)" }
    ]
  },
  {
    surah: 1,
    verse: 6,
    wordIndex: 2,
    canonicalText: "ٱلصِّرَٰطَ",
    variants: [
      { readerId: "hamzah", text: "ٱلزِّرَٰطَ", note: "Isymam: campuran bunyi Shad dan Zai" },
      { readerId: "ibn_kathir", text: "ٱلسِّرَٰطَ", note: "Dengan Sin murni (riwayat Qunbul)" },
      { readerId: "asim", text: "ٱلصِّرَٰطَ", note: "Dengan Shad murni (Hafs)" }
    ]
  },
  {
    surah: 2,
    verse: 9,
    wordIndex: 2,
    canonicalText: "يُخَـٰدِعُونَ",
    variants: [
      { readerId: "nafi", text: "يَخْدَعُونَ", note: "Wazan yakhda'un (tanpa alif)" },
      { readerId: "ibn_kathir", text: "يَخْدَعُونَ", note: "Wazan yakhda'un" },
      { readerId: "abu_amr", text: "يَخْدَعُونَ", note: "Wazan yakhda'un" },
      { readerId: "asim", text: "يُخَـٰدِعُونَ", note: "Wazan yukhadi'un (dengan alif)" }
    ]
  },
  {
    surah: 2,
    verse: 85,
    wordIndex: 12,
    canonicalText: "تَعْمَلُونَ",
    variants: [
      { readerId: "nafi", text: "يَعْمَلُونَ", note: "Ghaibah (Ya') menggantikan Khithab (Ta')" },
      { readerId: "ibn_kathir", text: "يَعْمَلُونَ", note: "Ghaibah" },
      { readerId: "asim", text: "تَعْمَلُونَ", note: "Khithab (Ta')" }
    ]
  },
  {
    surah: 2,
    verse: 125,
    wordIndex: 6,
    canonicalText: "وَٱتَّخِذُوا۟",
    variants: [
      { readerId: "nafi", text: "وَٱتَّخَذُوا۟", note: "Fi'il Madhi (Kha' dibaca fathah: 'Dan mereka telah mengambil')" },
      { readerId: "ibn_amir", text: "وَٱتَّخَذُوا۟", note: "Fi'il Madhi" },
      { readerId: "asim", text: "وَٱتَّخِذُوا۟", note: "Fi'il Amr (Kha' dibaca kasrah: 'Dan jadikanlah')" }
    ]
  },
  {
    surah: 2,
    verse: 184,
    wordIndex: 9,
    canonicalText: "فِدْيَةٌ طَعَامُ",
    variants: [
      { readerId: "nafi", text: "فِدْيَةُ طَعَامِ", note: "Idhafah fid-yatu tha'ami masakin" },
      { readerId: "ibn_amir", text: "فِدْيَةُ طَعَامِ", note: "Idhafah" },
      { readerId: "asim", text: "فِدْيَةٌ طَعَامُ", note: "Tanwin pada fidyatun" }
    ]
  }
];
