export interface HijaiyahDetail {
  nama: string;
  vn: string;
  makhraj?: string;
  sifat?: string;
  transliterasi?: string;
  contoh?: string;
}

export const HIJAIYAH_MAP: Record<string, HijaiyahDetail> = {
  "ا": { nama: "Alif", vn: "001", makhraj: "Al-Jauf (Rongga mulut & tenggorokan)", sifat: "Jahar, Rakhawah, Istifal, Infitah", transliterasi: "a", contoh: "قَالَ (Qāla)" },
  "ب": { nama: "Ba", vn: "002", makhraj: "Asy-Syafatain (Pertemuan dua bibir basah)", sifat: "Jahar, Syiddah, Istifal, Infitah, Idzlaq, Qalqalah", transliterasi: "b", contoh: "بِسْمِ (Bismi)" },
  "ت": { nama: "Ta", vn: "003", makhraj: "Ujung lidah menempel ke pangkal gigi seri atas", sifat: "Hams, Syiddah, Istifal, Infitah, Ishmat", transliterasi: "t", contoh: "تَبَّتْ (Tabbat)" },
  "ث": { nama: "Tsa", vn: "004", makhraj: "Ujung lidah keluar sedikit menyentuh ujung gigi seri atas", sifat: "Hams, Rakhawah, Istifal, Infitah, Ishmat", transliterasi: "ts", contoh: "ثُمَّ (Tsumma)" },
  "ج": { nama: "Jim", vn: "005", makhraj: "Tengah lidah bertemu dengan langit-langit keras atas", sifat: "Jahar, Syiddah, Istifal, Infitah, Ishmat, Qalqalah", transliterasi: "j", contoh: "جَآءَ (Jā'a)" },
  "ح": { nama: "Ha", vn: "006", makhraj: "Wasathul Halq (Tenggorokan bagian tengah/faring)", sifat: "Hams, Rakhawah, Istifal, Infitah, Ishmat", transliterasi: "h", contoh: "ٱلْحَمْدُ (Al-Hamdu)" },
  "خ": { nama: "Kha", vn: "007", makhraj: "Adnal Halq (Tenggorokan bagian atas mendekati anak lidah)", sifat: "Hams, Rakhawah, Isti'la, Infitah, Ishmat", transliterasi: "kh", contoh: "خَلَقَ (Khalaqa)" },
  "د": { nama: "Dal", vn: "008", makhraj: "Ujung lidah menempel pada pangkal gigi seri atas", sifat: "Jahar, Syiddah, Istifal, Infitah, Ishmat, Qalqalah", transliterasi: "d", contoh: "دِينِ (Dīn)" },
  "ذ": { nama: "Dzal", vn: "009", makhraj: "Ujung lidah keluar sedikit mengenai ujung gigi seri atas", sifat: "Jahar, Rakhawah, Istifal, Infitah, Ishmat", transliterasi: "dz", contoh: "ذَٰلِكَ (Dzālika)" },
  "ر": { nama: "Ra", vn: "010", makhraj: "Ujung lidah agak ke belakang mengenai gusi depan atas", sifat: "Jahar, Bainiyyah, Istifal, Infitah, Idzlaq, Inhiraf, Takrir", transliterasi: "r", contoh: "ٱلرَّحْمَـٰنِ (Ar-Rahmān)" },
  "ز": { nama: "Za", vn: "011", makhraj: "Ujung lidah di antara gigi seri atas dan bawah", sifat: "Jahar, Rakhawah, Istifal, Infitah, Ishmat, Shafir", transliterasi: "z", contoh: "زُلْزِلَتِ (Zulzilati)" },
  "س": { nama: "Sin", vn: "012", makhraj: "Ujung lidah bersanding dengan dinding gigi seri bawah", sifat: "Hams, Rakhawah, Istifal, Infitah, Ishmat, Shafir", transliterasi: "s", contoh: "سَمِيعٌ (Samī'un)" },
  "ش": { nama: "Syin", vn: "013", makhraj: "Tengah lidah bertemu langit-langit mulut atas", sifat: "Hams, Rakhawah, Istifal, Infitah, Ishmat, Tafasysyi", transliterasi: "sy", contoh: "ٱلشَّيْطَـٰنِ (Asy-Syaitān)" },
  "ص": { nama: "Shad", vn: "014", makhraj: "Ujung lidah di belakang gigi seri bawah dengan hembusan kuat", sifat: "Hams, Rakhawah, Isti'la, Ithbaq, Ishmat, Shafir", transliterasi: "sh", contoh: "ٱلصِّرَٰطَ (Ash-Shirāt)" },
  "ض": { nama: "Dhad", vn: "015", makhraj: "Salah satu atau kedua tepi sisi lidah menyentuh gigi geraham atas", sifat: "Jahar, Rakhawah, Isti'la, Ithbaq, Ishmat, Istithalah", transliterasi: "dh", contoh: "وَلَا ٱلضَّآلِّينَ (Wa lad-Dhāllīn)" },
  "ط": { nama: "Tha", vn: "016", makhraj: "Ujung lidah menempel kuat pada pangkal gigi seri atas", sifat: "Jahar, Syiddah, Isti'la, Ithbaq, Ishmat, Qalqalah", transliterasi: "th", contoh: "طَهَ (Tāhā)" },
  "ظ": { nama: "Zha", vn: "017", makhraj: "Ujung lidah menempel pada ujung gigi seri atas dengan pangkal terangkat", sifat: "Jahar, Rakhawah, Isti'la, Ithbaq, Ishmat", transliterasi: "zh", contoh: "ظَلَمُوا۟ (Zhalamū)" },
  "ع": { nama: "Ain", vn: "018", makhraj: "Wasathul Halq (Tenggorokan bagian tengah/epiglotis)", sifat: "Jahar, Bainiyyah, Istifal, Infitah, Ishmat", transliterasi: "'a", contoh: "عَلِيمٌ ('Alīmun)" },
  "غ": { nama: "Ghain", vn: "019", makhraj: "Adnal Halq (Tenggorokan atas dekat pangkal mulut)", sifat: "Jahar, Rakhawah, Isti'la, Infitah, Ishmat", transliterasi: "gh", contoh: "غَفُورٌ (Ghafūrun)" },
  "ف": { nama: "Fa", vn: "020", makhraj: "Bibir bawah bagian dalam bersentuhan dengan ujung gigi seri atas", sifat: "Hams, Rakhawah, Istifal, Infitah, Idzlaq", transliterasi: "f", contoh: "فَتَحْنَا (Fatahnā)" },
  "ق": { nama: "Qaf", vn: "021", makhraj: "Aqshal Lisan (Pangkal lidah paling belakang menempel langit-langit lunak)", sifat: "Jahar, Syiddah, Isti'la, Infitah, Ishmat, Qalqalah", transliterasi: "q", contoh: "قُلْ (Qul)" },
  "ك": { nama: "Kaf", vn: "022", makhraj: "Pangkal lidah agak ke depan di bawah makhraj Qaf", sifat: "Hams, Syiddah, Istifal, Infitah, Ishmat", transliterasi: "k", contoh: "كِتَـٰبٌ (Kitābun)" },
  "ل": { nama: "Lam", vn: "023", makhraj: "Tepi ujung lidah hingga ke ujungnya menempel gusi atas", sifat: "Jahar, Bainiyyah, Istifal, Infitah, Idzlaq, Inhiraf", transliterasi: "l", contoh: "لِلَّهِ (Lillāhi)" },
  "م": { nama: "Mim", vn: "024", makhraj: "Pertemuan kedua bibir atas dan bawah secara rapat (bibir kering)", sifat: "Jahar, Bainiyyah, Istifal, Infitah, Idzlaq, Ghunnah", transliterasi: "m", contoh: "مَالِكِ (Māliki)" },
  "ن": { nama: "Nun", vn: "025", makhraj: "Ujung lidah menempel pada gusi dua gigi seri atas", sifat: "Jahar, Bainiyyah, Istifal, Infitah, Idzlaq, Ghunnah", transliterasi: "n", contoh: "نَسْتَعِينُ (Nasta'īn)" },
  "و": { nama: "Waw", vn: "026", makhraj: "Memonyongkan kedua bibir dengan sedikit celah udara", sifat: "Jahar, Rakhawah, Istifal, Infitah, Ishmat, Lin", transliterasi: "w", contoh: "وَٱلْعَصْرِ (Wal-'Ashr)" },
  "ه": { nama: "Ha", vn: "027", makhraj: "Aqshal Halq (Pangkal tenggorokan paling bawah dekat pita suara)", sifat: "Hams, Rakhawah, Istifal, Infitah, Ishmat", transliterasi: "h", contoh: "هُوَ (Huwa)" },
  "ي": { nama: "Ya", vn: "028", makhraj: "Tengah lidah terangkat ke langit-langit tanpa menyentuh rapat", sifat: "Jahar, Rakhawah, Istifal, Infitah, Ishmat, Lin", transliterasi: "y", contoh: "يَوْمِ (Yaumi)" }
};

export function getKoreksiVn(huruf: string): { huruf: string; nama: string; vn: string; makhraj?: string; sifat?: string; contoh?: string } | null {
  const detail = HIJAIYAH_MAP[huruf];
  if (!detail) return null;
  return {
    huruf,
    nama: detail.nama,
    vn: detail.vn,
    makhraj: detail.makhraj,
    sifat: detail.sifat,
    contoh: detail.contoh
  };
}
