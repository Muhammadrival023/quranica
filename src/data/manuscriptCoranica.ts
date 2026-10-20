export interface ManuscriptArchive {
  id: string;
  institution: string;
  city: string;
  country: string;
  totalFragments: number;
}

export interface Manuscript {
  id: string;
  name: string;
  archive: string;
  century: string;
  scriptType: string;
  carbonDateRange: string;
  surahRange: string;
  imageUrl?: string;
  folioUrl?: string;
}

export const MANUSCRIPT_STATS = {
  totalManuscripts: 4200,
  totalArchives: 48,
  countries: 19,
  carbonDated: 125,
  earliestDate: "Awal Abad ke-1 Hijriyah (650–700 M)"
};

export const MANUSCRIPT_ARCHIVES: ManuscriptArchive[] = [
  { id: "sanaa_dar_makhtutat", institution: "Dar al-Makhtutat (Sana'a Palimpsest)", city: "Sana'a", country: "Yaman", totalFragments: 920 },
  { id: "tubingen_ma_vi_165", institution: "Universitas Tübingen Library (Ma VI 165)", city: "Tübingen", country: "Jerman", totalFragments: 154 },
  { id: "birmingham_cadbury", institution: "Mingana Collection (Birmingham Quran)", city: "Birmingham", country: "Inggris", totalFragments: 18 },
  { id: "bnf_paris_arabe", institution: "Bibliothèque nationale de France (BnF Arabe 328)", city: "Paris", country: "Prancis", totalFragments: 640 },
  { id: "berlin_staatsbibliothek", institution: "Staatsbibliothek zu Berlin (Corpus Coranicum)", city: "Berlin", country: "Jerman", totalFragments: 412 },
  { id: "topkapi_sarayi", institution: "Museum Istana Topkapi (Mushaf Utsmani)", city: "Istanbul", country: "Turki", totalFragments: 408 },
  { id: "tiem_istanbul", institution: "Türk ve İslam Eserleri Müzesi (TIEM Samarkand)", city: "Istanbul", country: "Turki", totalFragments: 380 },
  { id: "leiden_or_14545", institution: "Universitas Leiden Library", city: "Leiden", country: "Belanda", totalFragments: 86 },
  { id: "st_petersburg_nrl", institution: "National Library of Russia (St. Petersburg)", city: "St. Petersburg", country: "Rusia", totalFragments: 295 },
  { id: "vatican_borg_ar_25", institution: "Biblioteca Apostolica Vaticana", city: "Vatikan", country: "Vatikan", totalFragments: 110 },
  { id: "khedivial_cairo", institution: "Darul Kutub Al-Mishriyyah (Kairo)", city: "Kairo", country: "Mesir", totalFragments: 530 },
  { id: "mashhad_imam_reza", institution: "Astan Quds Razavi Library", city: "Masyhad", country: "Iran", totalFragments: 310 }
];

export const MANUSCRIPTS: Manuscript[] = [
  {
    id: "ms_birmingham",
    name: "Birmingham Qur'an Manuscript (Mingana 1572a)",
    archive: "Universitas Birmingham",
    century: "Pertengahan Abad ke-1 H (~568–645 M)",
    scriptType: "Hijazi Awal",
    carbonDateRange: "Radiokarbon 95.4% probabilitas: 568–645 M",
    surahRange: "QS. 18:17–31, 19:91–98, 20:1–40",
    folioUrl: "https://corpuscoranicum.de/en/manuscripts"
  },
  {
    id: "ms_tubingen",
    name: "Tübingen Fragment (Ma VI 165)",
    archive: "Universitas Tübingen",
    century: "Abad ke-1 H (~649–675 M)",
    scriptType: "Hijazi Monumental",
    carbonDateRange: "Radiokarbon 95.4% probabilitas: 649–675 M",
    surahRange: "QS. 17:35 – 36:57",
    folioUrl: "https://corpuscoranicum.de/en/manuscripts"
  },
  {
    id: "ms_sanaa_dam01",
    name: "Sana'a Palimpsest (DAM 01-27.1)",
    archive: "Dar al-Makhtutat Sana'a",
    century: "Abad ke-1 H (~650–680 M)",
    scriptType: "Hijazi Kuno (Scriptio Inferior & Superior)",
    carbonDateRange: "Radiokarbon probabilitas: 614–656 M",
    surahRange: "Berbagai surah Al-Qur'an",
    folioUrl: "https://corpuscoranicum.de/en/manuscripts"
  }
];

export function getManuscriptUrl(surah: number, ayah: number = 1): string {
  return `https://corpuscoranicum.de/en/verse-navigator/sura/${surah}/verse/${ayah}/manuscripts`;
}
