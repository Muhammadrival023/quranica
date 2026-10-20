export interface RujukanLink {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  uri?: string;
  mazhab?: string;
}

export const rujukanLinks: RujukanLink[] = [
  {
    id: "r_shamela_fiqh",
    title: "Al-Maktabah Asy-Syamilah (Qism Al-Fiqh)",
    category: "Pustaka Fiqh 4 Mazhab",
    description: "Repositori digital kitab fikih komparatif, ushul fiqh, dan kaidah fiqhiyyah terbesar dunia Islam.",
    url: "https://shamela.ws/category/13",
    uri: "https://shamela.ws/category/13",
    mazhab: "4 Mazhab & Muqaran"
  },
  {
    id: "r_waqfeya_fiqh",
    title: "Al-Maktabah Al-Waqfiyyah (Kutub Al-Fiqh)",
    category: "Repositori Fiqh PDF Muktamad",
    description: "Arsip cetakan tahqiq manuskrip kitab fikih induk mazhab Syafi'i, Hanbali, Hanafi, dan Maliki terlengkap.",
    url: "https://waqfeya.net/category.php?cid=14",
    uri: "https://waqfeya.net/category.php?cid=14",
    mazhab: "Turats Fiqh"
  },
  {
    id: "r_sunnah_ahkam",
    title: "Sunnah.one & Sunnah.com (Hadits Ahkam)",
    category: "Database Hadits Ahkam & Fiqh Sunnah",
    description: "Takhrij sanad hadits hukum Bulughul Maram, Umdatul Ahkam, dan Kutubus Sittah lintas perawi.",
    url: "https://sunnah.one",
    uri: "https://sunnah.one",
    mazhab: "Fiqh Hadits & Sunnah"
  },
  {
    id: "r_bidayah_fiqh",
    title: "Portal Bidayatul Mutafaqqih (Syaikh Wahid Bali)",
    category: "Matan Kaidah & Dhowabith Fiqhiyyah",
    description: "Kompilasi ringkasan fikih bersanad dengan patokan rumus fiqh dan dalil shahih Al-Qur'an dan Sunnah.",
    url: "https://shamela.ws/index.php/book/10904",
    uri: "https://shamela.ws/index.php/book/10904",
    mazhab: "Dhowabith Fiqh"
  },
  {
    id: "r_corpus",
    title: "Corpus Coranicum",
    category: "Arsip Manuskrip Kuno & Qira'at",
    description: "Proyek riset filologi manuskrip Al-Qur'an abad 1 Hijriah dan varian qira'at mutawatirah.",
    url: "https://corpuscoranicum.de",
    uri: "https://corpuscoranicum.de"
  }
];

export const portalJurnalLinks: RujukanLink[] = [
  {
    id: "j_moraref",
    title: "Moraref Kemenag RI (Jurnal Syariah & Fiqh)",
    category: "Portal Jurnal Islam Nasional",
    description: "Kompilasi artikel ilmiah dan riset terakreditasi SINTA bidang fiqh kontemporer dan ushul syariah.",
    url: "https://moraref.kemenag.go.id",
    uri: "https://moraref.kemenag.go.id"
  },
  {
    id: "j_uinsgd",
    title: "Jurnal Syariah & Hukum UIN SGD Bandung",
    category: "Jurnal Perguruan Tinggi Islam",
    description: "Publikasi jurnal kajian Fiqh Muamalah, Maqashid Syariah, dan Perbandingan Mazhab UIN SGD.",
    url: "https://journal.uinsgd.ac.id",
    uri: "https://journal.uinsgd.ac.id"
  }
];
