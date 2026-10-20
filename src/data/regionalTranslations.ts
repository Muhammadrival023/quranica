export interface RegionalLanguage {
  code: string;
  name: string;
  nativeName?: string;
  region: string;
  flag: string;
}

export const REGIONAL_LANGUAGES: RegionalLanguage[] = [
  { code: "su", name: "Basa Sunda", nativeName: "Basa Sunda", region: "Jawa Barat & Banten", flag: "🟩" },
  { code: "jv", name: "Basa Jawa", nativeName: "Basa Jawa", region: "Jawa Tengah & Jawa Timur", flag: "🟫" },
  { code: "ms", name: "Bahasa Melayu", nativeName: "Bahasa Melayu", region: "Sumatera & Riau", flag: "🟨" },
  { code: "min", name: "Bahasa Minangkabau", nativeName: "Baso Minang", region: "Sumatera Barat", flag: "🟥" },
  { code: "bug", name: "Basa Ugi (Bugis)", nativeName: "Basa Ugi", region: "Sulawesi Selatan", flag: "🟦" },
  { code: "ace", name: "Basa Acèh", nativeName: "Basa Acèh", region: "Aceh Darussalam", flag: "🟩" },
  { code: "ban", name: "Basa Bali", nativeName: "Basa Bali", region: "Bali & Lombok", flag: "🟧" },
  { code: "mad", name: "Basa Madura", nativeName: "Basa Madhurâ", region: "Madura & Tapal Kuda", flag: "🟪" }
];
