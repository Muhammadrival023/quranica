export interface Qiraat10Transmitter {
  id: string;
  name: string;
  nameEn: string;
  deathYear: number;
}

export interface Qiraat10Entry {
  id: string;
  name: string;
  nameEn: string;
  rank: 'sabah' | 'thalathah';
  region: string;
  deathYear: number;
  transmitters: Qiraat10Transmitter[];
  keyDifferences: string;
}

export const QIRAAT_10_STATS = {
  totalTransmitters: 20,
  canonicalSabah: 7,
  supplementaryThalathah: 3,
  source: "Kitab At-Taysir (Ad-Dani) & Thayyibatun Nasyr (Ibnul Jazari)",
  references: [
    "Ibn al-Jazari, An-Nasyr fi al-Qira'at al-'Asyr",
    "Ad-Dani, At-Taysir fi al-Qira'at as-Sab'",
    "Asy-Syathibi, Hirzul Amani wa Wajhut Tahani"
  ]
};

export const QIRAAT_10: Qiraat10Entry[] = [
  {
    id: "nafi",
    name: "نافع بن عبد الرحمن المدني",
    nameEn: "Nafi' al-Madani",
    rank: "sabah",
    region: "Madinah Munawwarah",
    deathYear: 169,
    transmitters: [
      { id: "qalun", name: "قالون", nameEn: "Qalun (w. 220 H)", deathYear: 220 },
      { id: "warsh", name: "ورش", nameEn: "Warsh (w. 197 H)", deathYear: 197 }
    ],
    keyDifferences: "Tashil dua hamzah, naql harakat hamzah, taqlil (imālah shughrā), dan taghlidh huruf lam pada riwayat Warsh."
  },
  {
    id: "ibn_kathir",
    name: "عبد الله بن كثير المكي",
    nameEn: "Ibn Kathir al-Makki",
    rank: "sabah",
    region: "Makkah Mukarramah",
    deathYear: 120,
    transmitters: [
      { id: "al_bazzi", name: "البزي", nameEn: "Al-Bazzi (w. 250 H)", deathYear: 250 },
      { id: "qunbul", name: "قنبل", nameEn: "Qunbul (w. 291 H)", deathYear: 291 }
    ],
    keyDifferences: "Shilah ha' dhamir bil-waw/ya' baik didahului sukun maupun berharakat, dan qashr madd munfashil."
  },
  {
    id: "abu_amr",
    name: "أبو عمرو بن العلاء البصري",
    nameEn: "Abu 'Amr al-Basri",
    rank: "sabah",
    region: "Bashrah",
    deathYear: 154,
    transmitters: [
      { id: "ad_duri", name: "الدوري", nameEn: "Ad-Duri (w. 246 H)", deathYear: 246 },
      { id: "as_susi", name: "السوسي", nameEn: "As-Susi (w. 261 H)", deathYear: 261 }
    ],
    keyDifferences: "Idgham kabir pada riwayat As-Susi, ibdal hamzah sukun, dan ikhtilas sebagian harakat."
  },
  {
    id: "ibn_amir",
    name: "عبد الله بن عامر الشامي",
    nameEn: "Ibn 'Amir ash-Shami",
    rank: "sabah",
    region: "Damaskus, Syam",
    deathYear: 118,
    transmitters: [
      { id: "hisham", name: "هشام", nameEn: "Hisham (w. 245 H)", deathYear: 245 },
      { id: "ibn_dhakwan", name: "ابن ذكوان", nameEn: "Ibn Dhakwan (w. 242 H)", deathYear: 242 }
    ],
    keyDifferences: "Idkhal alif baynas sakinatayn, tas-hil hamzah mutatharrifah 'indal waqf pada riwayat Hisham."
  },
  {
    id: "asim",
    name: "عاصم بن أبي النجود الكوفي",
    nameEn: "'Asim al-Kufi",
    rank: "sabah",
    region: "Kufah",
    deathYear: 127,
    transmitters: [
      { id: "syubah", name: "شعبة", nameEn: "Syu'bah (w. 193 H)", deathYear: 193 },
      { id: "hafs", name: "حفص", nameEn: "Hafs (w. 180 H) — Mushaf Standar Global", deathYear: 180 }
    ],
    keyDifferences: "Tahqiq al-hamzatain (kecuali pada 'A'a'jamiyyun), madd munfashil tawasuth 4 harakat."
  },
  {
    id: "hamzah",
    name: "حمزة بن حبيب الزيات الكوفي",
    nameEn: "Hamzah al-Kufi",
    rank: "sabah",
    region: "Kufah",
    deathYear: 156,
    transmitters: [
      { id: "khalaf_hamzah", name: "خلف", nameEn: "Khalaf (w. 229 H)", deathYear: 229 },
      { id: "khallad", name: "خلاد", nameEn: "Khallad (w. 220 H)", deathYear: 220 }
    ],
    keyDifferences: "Tawassu' dalam Imālah kubrā, saktah 'alas sakin qablal hamzah, dan isymam shad dengan zai."
  },
  {
    id: "al_kisai",
    name: "علي بن حمزة الكسائي",
    nameEn: "Al-Kisa'i al-Kufi",
    rank: "sabah",
    region: "Kufah",
    deathYear: 189,
    transmitters: [
      { id: "abul_harits", name: "أبو الحارث", nameEn: "Abul Harits (w. 240 H)", deathYear: 240 },
      { id: "duri_kisai", name: "الدوري", nameEn: "Ad-Duri 'an Al-Kisa'i (w. 246 H)", deathYear: 246 }
    ],
    keyDifferences: "Imālah ha' ta'nits saat waqaf, dan imālah vokal alif mutatharrifah."
  },
  {
    id: "abu_jafar",
    name: "أبو جعفر يزيد بن القعقاع المدني",
    nameEn: "Abu Ja'far al-Madani",
    rank: "thalathah",
    region: "Madinah Munawwarah",
    deathYear: 130,
    transmitters: [
      { id: "ibn_wardan", name: "ابن وردان", nameEn: "Ibn Wardan (w. 160 H)", deathYear: 160 },
      { id: "ibn_jammaz", name: "ابن جماز", nameEn: "Ibn Jammaz (w. 170 H)", deathYear: 170 }
    ],
    keyDifferences: "Ikhfa' nun sukun dan tanwin pada kha' dan ghain, saktah huruf hijaiyah muqaththa'ah."
  },
  {
    id: "yaqub",
    name: "يعقوب بن إسحاق الحضرمي البصري",
    nameEn: "Ya'qub al-Hadrami",
    rank: "thalathah",
    region: "Bashrah",
    deathYear: 205,
    transmitters: [
      { id: "ruwais", name: "رويس", nameEn: "Ruwais (w. 238 H)", deathYear: 238 },
      { id: "rauh", name: "روح", nameEn: "Rauh (w. 234 H)", deathYear: 234 }
    ],
    keyDifferences: "Itsbat ya'at az-zawa'id saat waqaf dan washal, serta dhammul ha' fi 'alaihim/ilaihim."
  },
  {
    id: "khalaf_ashir",
    name: "خلف بن هشام البزار (العاشر)",
    nameEn: "Khalaf al-'Ashir",
    rank: "thalathah",
    region: "Kufah / Baghdad",
    deathYear: 229,
    transmitters: [
      { id: "ishaq", name: "إسحاق", nameEn: "Ishaq al-Warraq (w. 286 H)", deathYear: 286 },
      { id: "idris", name: "إدريس", nameEn: "Idris al-Haddad (w. 292 H)", deathYear: 292 }
    ],
    keyDifferences: "Saktah tanpa nafas pada mafshul dan maushul, idgham nun sukun pada waw dan ya' tanpa ghunnah."
  }
];

export function getAllTransmitters(): Qiraat10Transmitter[] {
  return QIRAAT_10.flatMap(q => q.transmitters);
}
