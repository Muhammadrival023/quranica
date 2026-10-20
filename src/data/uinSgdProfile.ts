export interface AcademicAchievement {
  year: string;
  title: string;
  category?: string;
}

export const UIN_SGD_PROFILE = {
  name: "UIN Sunan Gunung Djati Bandung",
  shortName: "UIN SGD Bandung",
  akreditasiInstitusi: "Akreditasi Unggul (BAN-PT)",
  visi: "Wahyu Memandu Ilmu dalam Bingkai Akhlak Karimah — Menjadi Universitas Islam Negeri yang Unggul dan Kompetitif di Tingkat Internasional.",
  fakultasUtama: "Fakultas Ushuluddin (Kajian Al-Qur'an dan Tafsir)",
  statistik: {
    totalMahasiswa: "29.400+",
    totalDosen: "1.150+",
    totalProdi: "56",
    guruBesar: "68"
  }
};

export const CAPAIAN_AKADEMIK: AcademicAchievement[] = [
  {
    year: "2024",
    title: "Peringkat #1 PTKIN Terbaik Versi Webometrics & Scimago Institutions Rankings",
    category: "Riset & Publikasi Internasional"
  },
  {
    year: "2023",
    title: "Akreditasi Institusi Predikat 'Unggul' dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT)",
    category: "Institusi"
  },
  {
    year: "2023",
    title: "Pusat Unggulan Riset Naskah Nusantara & Digitalisasi Khazanah Tafsir Klasik",
    category: "Kajian Turats"
  },
  {
    year: "2022",
    title: "Top Islamic Higher Education Institution in Research Productivity Kemenag RI",
    category: "Produktivitas Riset"
  }
];
