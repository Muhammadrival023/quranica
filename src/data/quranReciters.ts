export interface Reciter {
  id: number;
  name: string;
  slug: string;
  serverUrl?: string;
  style?: string;
}

export const QURAN_RECITERS: Reciter[] = [
  {
    id: 1,
    name: "Mishary Rashid Alafasy",
    slug: "mishaari_raashid_al_3afaasee",
    serverUrl: "https://server8.mp3quran.net/afs",
    style: "Murattal"
  },
  {
    id: 2,
    name: "Mahmoud Khalil Al-Husary",
    slug: "mahmood_khaleel_al-husaree",
    serverUrl: "https://server13.mp3quran.net/husr",
    style: "Murattal Mujawwad"
  },
  {
    id: 3,
    name: "Abdul Basit Abdul Samad",
    slug: "abdul_baasit_murattal",
    serverUrl: "https://server7.mp3quran.net/basit",
    style: "Murattal"
  },
  {
    id: 4,
    name: "Saad Al-Ghamdi",
    slug: "sa3d_al-ghaamidi",
    serverUrl: "https://server7.mp3quran.net/s_gmd",
    style: "Murattal"
  },
  {
    id: 5,
    name: "Abu Bakr Ash-Shatri",
    slug: "abu_bakr_ash-shaatree",
    serverUrl: "https://server11.mp3quran.net/shatri",
    style: "Murattal"
  },
  {
    id: 6,
    name: "Ali Al-Hudhaify",
    slug: "ali_alhudhaifi",
    serverUrl: "https://server9.mp3quran.net/hthfi",
    style: "Murattal"
  }
];

export function getAudioUrl(reciter: Reciter, surahNumber: number): string {
  const padded = String(surahNumber).padStart(3, '0');
  const base = reciter.serverUrl || "https://server8.mp3quran.net/afs";
  return `${base}/${padded}.mp3`;
}
