export interface TextDifference {
  wordIndex: number;
  hafsText: string;
  variantText: string;
  note: string;
}

export interface PerReaderReading {
  qiraatId: string;
  qiraatName: string;
  differs: boolean;
  rank: 'sabah' | 'thalathah';
  fullText: string;
  textDifferences: TextDifference[];
  pronunciationNotes: string[];
}

export function getAllReadings(surahNum: number, verseNum: number, verseArabic: string): PerReaderReading[] {
  const isFatihah4 = surahNum === 1 && verseNum === 4;
  const isFatihah6 = surahNum === 1 && verseNum === 6;

  return [
    {
      qiraatId: "asim",
      qiraatName: "ʿĀṣim (Ḥafṣ)",
      differs: false,
      rank: "sabah",
      fullText: verseArabic,
      textDifferences: [],
      pronunciationNotes: ["Standar rujukan mushaf internasional (Madinah Munawwarah)."]
    },
    {
      qiraatId: "nafi",
      qiraatName: "Nāfiʿ (Warsh & Qālūn)",
      differs: isFatihah4,
      rank: "sabah",
      fullText: isFatihah4 ? verseArabic.replace(/مَـٰلِكِ|مَالِكِ/g, "مَلِكِ") : verseArabic,
      textDifferences: isFatihah4 ? [
        { wordIndex: 1, hafsText: "مَـٰلِكِ", variantText: "مَلِكِ", note: "Hazf Alif: Penguasa / Raja Tunggal" }
      ] : [],
      pronunciationNotes: [
        "Madd Munfashil: Qalun 2-4 harakat, Warsh 6 harakat lazim.",
        "Warsh menerapkan taghlidh lam dan taqlil pada vokal berakhiran alif."
      ]
    },
    {
      qiraatId: "ibn_kathir",
      qiraatName: "Ibn Kathīr al-Makkī",
      differs: isFatihah4 || isFatihah6,
      rank: "sabah",
      fullText: isFatihah4 ? verseArabic.replace(/مَـٰلِكِ|مَالِكِ/g, "مَلِكِ")
        : isFatihah6 ? verseArabic.replace(/ٱلصِّرَٰطَ|الصراط/g, "ٱلسِّرَٰطَ")
        : verseArabic,
      textDifferences: isFatihah4 ? [
        { wordIndex: 1, hafsText: "مَـٰلِكِ", variantText: "مَلِكِ", note: "Dibaca tanpa alif" }
      ] : isFatihah6 ? [
        { wordIndex: 2, hafsText: "ٱلصِّرَٰطَ", variantText: "ٱلسِّرَٰطَ", note: "Riwayat Qunbul dengan Sin murni" }
      ] : [],
      pronunciationNotes: ["Shilah Mim Jama' dan Qashr madd munfashil 2 harakat."]
    },
    {
      qiraatId: "abu_amr",
      qiraatName: "Abū ʿAmr al-Baṣrī",
      differs: isFatihah4,
      rank: "sabah",
      fullText: isFatihah4 ? verseArabic.replace(/مَـٰلِكِ|مَالِكِ/g, "مَلِكِ") : verseArabic,
      textDifferences: isFatihah4 ? [
        { wordIndex: 1, hafsText: "مَـٰلِكِ", variantText: "مَلِكِ", note: "Dibaca tanpa alif" }
      ] : [],
      pronunciationNotes: ["Idgham Kabir pada pertemuan dua huruf berharakat (riwayat As-Susi)."]
    },
    {
      qiraatId: "ibn_amir",
      qiraatName: "Ibn ʿĀmir ash-Shāmī",
      differs: isFatihah4,
      rank: "sabah",
      fullText: isFatihah4 ? verseArabic.replace(/مَـٰلِكِ|مَالِكِ/g, "مَلِكِ") : verseArabic,
      textDifferences: isFatihah4 ? [
        { wordIndex: 1, hafsText: "مَـٰلِكِ", variantText: "مَلِكِ", note: "Dibaca tanpa alif" }
      ] : [],
      pronunciationNotes: ["Idkhal hamzah baynas sakinatayn pada riwayat Hisham."]
    },
    {
      qiraatId: "hamzah",
      qiraatName: "Ḥamzah al-Kūfī",
      differs: isFatihah6,
      rank: "sabah",
      fullText: isFatihah6 ? verseArabic.replace(/ٱلصِّرَٰطَ|الصراط/g, "ٱلزِّرَٰطَ") : verseArabic,
      textDifferences: isFatihah6 ? [
        { wordIndex: 2, hafsText: "ٱلصِّرَٰطَ", variantText: "ٱلزِّرَٰطَ", note: "Isymam: suara Shad bercampur Zai" }
      ] : [],
      pronunciationNotes: ["Imālah kubrā vokal /ā/ ke /ē/, saktah 'alas sakin qablal hamzah."]
    },
    {
      qiraatId: "al_kisai",
      qiraatName: "al-Kisāʾī al-Kūfī",
      differs: false,
      rank: "sabah",
      fullText: verseArabic,
      textDifferences: [],
      pronunciationNotes: ["Imālah ha' ta'nits saat waqaf dan imālah dzuwatil ya'."]
    },
    {
      qiraatId: "abu_jafar",
      qiraatName: "Abū Jaʿfar al-Madanī",
      differs: isFatihah4,
      rank: "thalathah",
      fullText: isFatihah4 ? verseArabic.replace(/مَـٰلِكِ|مَالِكِ/g, "مَلِكِ") : verseArabic,
      textDifferences: isFatihah4 ? [
        { wordIndex: 1, hafsText: "مَـٰلِكِ", variantText: "مَلِكِ", note: "Dibaca tanpa alif" }
      ] : [],
      pronunciationNotes: ["Ikhfa' nun sukun/tanwin pada Kha' dan Ghain."]
    },
    {
      qiraatId: "yaqub",
      qiraatName: "Yaʿqūb al-Ḥaḍramī",
      differs: isFatihah4,
      rank: "thalathah",
      fullText: isFatihah4 ? verseArabic.replace(/مَـٰلِكِ|مَالِكِ/g, "مَلِكِ") : verseArabic,
      textDifferences: isFatihah4 ? [
        { wordIndex: 1, hafsText: "مَـٰلِكِ", variantText: "مَلِكِ", note: "Dibaca tanpa alif" }
      ] : [],
      pronunciationNotes: ["Dhammul Ha' pada 'alaihimu, ilaihimu, dan ladaihimu."]
    },
    {
      qiraatId: "khalaf_ashir",
      qiraatName: "Khalaf al-ʿĀshir",
      differs: isFatihah6,
      rank: "thalathah",
      fullText: isFatihah6 ? verseArabic.replace(/ٱلصِّرَٰطَ|الصراط/g, "ٱلزِّرَٰطَ") : verseArabic,
      textDifferences: isFatihah6 ? [
        { wordIndex: 2, hafsText: "ٱلصِّرَٰطَ", variantText: "ٱلزِّرَٰطَ", note: "Isymam pada seluruh lafazh ash-shirath" }
      ] : [],
      pronunciationNotes: ["Saktah tanpa bernafas pada mafshul."]
    }
  ];
}
