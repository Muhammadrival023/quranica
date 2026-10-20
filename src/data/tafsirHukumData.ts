// =======================================================================
// REPOSITORI DIGITAL RUJUKAN FIQH & TAFSIR HUKUM (AYATUL AHKAM)
// Terintegrasi dengan Google Drive Cloud Folder:
// https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq
// =======================================================================

export interface TafsirHukumSource {
  id: string;
  title: string;
  titleArabic: string;
  author: string;
  era: string;
  category: 'tafsir_ahkam' | 'fiqh_muqaran' | 'ushul_fiqh' | 'hadits_ahkam' | 'nawazil_kontemporer';
  mazhab: string;
  description: string;
  primaryAyatFokus: string[];
  signifikansiHukum: string;
  googleDriveFolder: string;
  sampleBabApplication: string;
  tahqiqDanCetakan?: string;
  topikKunci: string[];
}

export const GOOGLE_DRIVE_REF_FOLDER = {
  url: "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
  folderId: "1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
  name: "Koleksi Khazanah Fiqh & Tafsir Hukum Islam",
  description: "Repositori digital cloud dokumen referensi fiqh 4 mazhab, kitab-kitab tafsir ayat ahkam induk, takhrij hadits hukum, dan fatwa kontemporer."
};

export const tafsirHukumSources: TafsirHukumSource[] = [
  // ==========================================
  // 1. TAFSIR AYATIL AHKAM (تفسير آيات الأحكام)
  // ==========================================
  {
    id: "tf_ahkam_jassas",
    title: "Ahkam Al-Qur'an (أحكام القرآن للجصاص)",
    titleArabic: "أحكام القرآن للإمام أبي بكر الجصاص الرازي الحنفي",
    author: "Al-Imam Abu Bakr Ahmad bin Ali Al-Jashshash Al-Hanafi (w. 370 H)",
    era: "Klasik (Abad 4 H)",
    category: "tafsir_ahkam",
    mazhab: "Hanafi & Ushul Ahkam",
    description: "Kitab induk tafsir hukum tertua dari mazhab Hanafi yang mengkaji ayat-ayat hukum dengan metode istinbath mendalam, qiyas, dalalah lafazh (haqiqah, majaz, 'amm, khash), dan bantahan argumentatif.",
    primaryAyatFokus: [
      "QS. Al-Baqarah: 228 (Masa Iddah & Quru')",
      "QS. Al-Ma'idah: 6 (Rukun & Syarat Thaharah: Wudhu, Ghusl, Tayammum)",
      "QS. Al-Baqarah: 275 (Hukum Larangan Riba & Kehalalan Bai')",
      "QS. An-Nur: 2-3 (Hukum Had Zina & Kesaksian)"
    ],
    signifikansiHukum: "Menjadi rujukan pokok istidlal Mazhab Hanafi dalam memahami dalalah nash ayat Al-Qur'an untuk seluruh bab Bidayatul Mutafaqqih.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Air & Wudhu: Istinbath lafazh 'fa-msahu bi-ru'usikum' (kewajiban menyapu 1/4 kepala menurut Mazhab Hanafi).",
    tahqiqDanCetakan: "Tahqiq Muhammad Ash-Shadiq Qamhawi, Dar Ihya' At-Turats Al-Arabi",
    topikKunci: ["Dalalah Al-Fadz", "Haqiqah & Majaz", "Tafsir Mazhab Hanafi", "Istinbath Ahkam"]
  },
  {
    id: "tf_ahkam_ibnul_arabi",
    title: "Ahkam Al-Qur'an (أحكام القرآن لابن العربي)",
    titleArabic: "أحكام القرآن للإمام القاضي أبي بكر بن العربي المعافري المالكي",
    author: "Al-Qadhi Abu Bakr Muhammad bin Abdillah Ibnu Al-Arabi Al-Ma'afiri Al-Maliki (w. 543 H)",
    era: "Klasik (Abad 6 H)",
    category: "tafsir_ahkam",
    mazhab: "Maliki & Fiqh Madinah",
    description: "Mahakarya tafsir hukum Mazhab Maliki yang memadukan lughah, hadits, atsar sahabat, serta 'Amal Ahlil Madinah dengan kritisisme ilmiah tajam.",
    primaryAyatFokus: [
      "QS. Al-Ma'idah: 6 (Menyapu Seluruh Kepala dalam Wudhu & Menyentuh Wanita)",
      "QS. Al-Baqarah: 187 (Waktu Imsak, Pembatal Puasa, & I'tikaf)",
      "QS. An-Nisa: 3 (Poligami, Keadilan, & Mahar Pernikahan)",
      "QS. Al-Baqarah: 282 (Ayat Mudayanah & Saksi Transaksi)"
    ],
    signifikansiHukum: "Rujukan otoritatif Mazhab Maliki dalam mengurai ayat-ayat ibadah dan muamalah, mempertemukan dalil Quran dengan amalan penduduk Madinah.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Wudhu: Dalil kewajiban menyapu seluruh rambut kepala ('Isti'ab ar-ra's') dari huruf ba' lil-ilshaq bukan tab'idh.",
    tahqiqDanCetakan: "Tahqiq Ali Muhammad Al-Bijawi, Darul Ma'rifah Beirut",
    topikKunci: ["Amal Ahlil Madinah", "Fiqh Maliki", "Kritik Riwayat", "Lughah Ahkam"]
  },
  {
    id: "tf_ahkam_kiya_harrasi",
    title: "Ahkam Al-Qur'an (أحكام القرآن للكيا الهراسي)",
    titleArabic: "أحكام القرآن للإمام عماد الدين أبي الحسن علي بن محمد الطبري المعروف بالكيا الهراسي الشافعي",
    author: "Imaduddin Ali bin Muhammad Al-Kiya Al-Harrasi Asy-Syafi'i (w. 504 H)",
    era: "Klasik (Abad 6 H)",
    category: "tafsir_ahkam",
    mazhab: "Syafi'i & Manhaj Al-Umm",
    description: "Tafsir hukum mazhab Syafi'i paling representatif mendampingi Al-Umm. Menjawab argumen Al-Jashshash secara teliti dengan kaidah ushul Asy-Syafi'i.",
    primaryAyatFokus: [
      "QS. An-Nisa: 43 / Al-Ma'idah: 6 ('Aw laamastumun-nisaa' - Pembatal Wudhu Sentuhan Kulit)",
      "QS. At-Taubah: 60 (8 Golongan Mustahiq Zakat & Hak Pemilik)",
      "QS. Al-Ma'idah: 38 (Had Pencurian & Batasan Nishab Hirz)",
      "QS. An-Nisa: 23 (Mahram Pernikahan & Susuan)"
    ],
    signifikansiHukum: "Penopang argumentasi dalil Mazhab Syafi'i terhadap ayat-ayat ahkam yang sering menjadi khilafiyah mu'tabar.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Pembatal Wudhu: Makna 'Laamastum' menurut Syafi'iyah adalah sentuhan kulit laki-laki dan perempuan bukan mahram tanpa penghalang.",
    tahqiqDanCetakan: "Tahqiq Musa Muhammad Ali & Izzat Athiyah, Darul Kutub Al-Ilmiyyah Beirut",
    topikKunci: ["Ushul Syafi'i", "Dialektika Hujjah", "Tahqiq Ahkam", "Syarah Ayat Thaharah"]
  },
  {
    id: "tf_qurtubi",
    title: "Al-Jami' li Ahkam Al-Qur'an (الجامع لأحكام القرآن للقرطبي)",
    titleArabic: "الجامع لأحكام القرآن والمبين لما تضمنه من السنة وآي الفرقان للإمام القرطبي",
    author: "Al-Imam Abu Abdillah Muhammad bin Ahmad Al-Anshari Al-Qurthubi (w. 671 H)",
    era: "Klasik (Abad 7 H)",
    category: "tafsir_ahkam",
    mazhab: "Ensiklopedis (Maliki Berwawasan 4 Mazhab)",
    description: "Ensiklopedi tafsir hukum terlengkap di dunia Islam (20+ jilid). Menguraikan setiap ayat hukum dengan masalah-masalah fiqh terperinci (Mas'alah 1, 2, dst.), etimologi, qira'at, hadits, dan tarjih objektif tanpa fanatisme mazhab.",
    primaryAyatFokus: [
      "Seluruh Ayat Ahkam (± 500 Ayat Hukum dalam Al-Qur'an)",
      "QS. Al-Baqarah: 173 (Bangkai, Darah, Babi, & Kaidah Darurat)",
      "QS. Al-Baqarah: 222 (Hukum Haidh & Masa Suci Wanita)",
      "QS. Al-Hajj: 27-29 (Manasik Haji & Umrah)"
    ],
    signifikansiHukum: "Kamus perbandingan tafsir hukum paling netral dan kaya; menjadi jembatan antara teks Al-Qur'an dan konsensus ulama 4 mazhab.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Haidh & Nifas: Menjelaskan larangan jima' saat haidh dan penafsiran 'fa'tuhunna min haitsu amarakumullah'.",
    tahqiqDanCetakan: "Tahqiq Dr. Abdullah bin Abdul Muhsin At-Turki, Muassasah Ar-Risalah (24 Jilid)",
    topikKunci: ["Muqaran Mazhab", "Qiraat & Hukum", "Takhrij Hadits", "Kaidah Lughawiyyah"]
  },
  {
    id: "tf_rawai_sabuni",
    title: "Rawa'i' Al-Bayan Tafsir Ayat Al-Ahkam (روائع البيان للصابوني)",
    titleArabic: "روائع البيان في تفسير آيات الأحكام من القرآن للشيخ محمد علي الصابوني",
    author: "Syaikh Muhammad Ali Ash-Shabuni (w. 1442 H)",
    era: "Kontemporer (Abad 15 H)",
    category: "tafsir_ahkam",
    mazhab: "Sistematika Modern & Muqaran 4 Mazhab",
    description: "Kitab tafsir hukum paling populer di universitas-universitas Islam kontemporer. Disusun dengan metode teratur: Makna Kosakata, Sabab Nuzul, Latha'if Tafsiriyyah, Ahkam Syar'iyyah (Khilaf 4 Mazhab), dan Hikmatut Tasyri'.",
    primaryAyatFokus: [
      "Kajian 70+ Pokok Ayat Hukum Terpenting (Ibadah, Muamalah, Jinayat, & Keluarga)",
      "QS. Al-Baqarah: 196 (Kesempurnaan Haji & Umrah)",
      "QS. Al-An'am: 145 (Kriteria Makanan Halal & Haram)",
      "QS. An-Nur: 30-31 (Batasan Aurat & Hijab Syar'i)"
    ],
    signifikansiHukum: "Sangat mudah dipahami santri dan mahasiswa syariah; memetakan argumen 4 mazhab secara padat dan terstruktur.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Zakat: Pembahasan hukum zakat perhiasan emas wanita yang dipakai berdasarkan ayat Kanzul Mal dan khilaf Abu Hanifah vs Jumhur.",
    tahqiqDanCetakan: "Darul Kutub Al-Islamiyyah & Maktabah Al-Ghazali",
    topikKunci: ["Sistematika 5 Langkah", "Hikmatut Tasyri", "Komparasi Mazhab Ringkas", "Lughah Balaghah"]
  },

  // ==========================================
  // 2. FIQH MUQARAN & ENSAIKLOPEDIA 4 MAZHAB
  // ==========================================
  {
    id: "fq_zuhaili_wahbah",
    title: "Al-Fiqh Al-Islami wa Adillatuh (الفقه الإسلامي وأدلته للزحيلي)",
    titleArabic: "الفقه الإسلامي وأدلته للأستاذ الدكتور وهبة الزحيلي",
    author: "Prof. Dr. Wahbah Az-Zuhaili (w. 1436 H)",
    era: "Kontemporer",
    category: "fiqh_muqaran",
    mazhab: "Ensiklopedi 4 Mazhab & Fatwa Kontemporer",
    description: "Karya monumental 10 jilid yang menghimpun seluruh bab fikih ibadah, muamalah, jinayat, siyasah syar'iyyah, dan perbankan kontemporer dengan dalil komparatif 4 mazhab dan tarjih.",
    primaryAyatFokus: [
      "QS. Al-Baqarah: 280 (Penundaan Hutang bagi yang Kesulitan / Insolvensi)",
      "QS. An-Nisa: 29 (Tijarah 'an Taradhin & Larangan Batil)",
      "QS. Al-Ma'idah: 1 (Kewajiban Menepati Akad 'Awfu bil-'Uqud')"
    ],
    signifikansiHukum: "Sumber pembanding utama untuk memahami posisi Hanafi, Maliki, Syafi'i, dan Hanbali secara lengkap dengan fatwa Majma' Al-Fiqh Al-Islami internasional.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Seluruh Bab Bidayatul Mutafaqqih: Menyediakan tabel pembanding madzhab dan tinjauan kontemporer.",
    tahqiqDanCetakan: "Darul Fikr Damaskus, 10 Jilid",
    topikKunci: ["4 Mazhab Lengkap", "Nawazil Kontemporer", "Perbankan Syariah", "Muamalah Maliyyah"]
  },
  {
    id: "fq_juzairi",
    title: "Al-Fiqh 'ala Al-Madhahib Al-Arba'ah (الفقه على المذاهب الأربعة للجزيري)",
    titleArabic: "الفقه على المذاهب الأربعة للشيخ عبد الرحمن الجزيري",
    author: "Syaikh Abdurrahman Al-Juzairi (w. 1360 H)",
    era: "Modern Klasik",
    category: "fiqh_muqaran",
    mazhab: "4 Mazhab Resmi",
    description: "Proyek resmi Kementerian Wakaf Mesir yang memisahkan dan merinci pandangan masing-masing mazhab (Hanafi, Maliki, Syafi'i, Hanbali) dalam sub-poin khusus tanpa mencampuradukkan tafrilat.",
    primaryAyatFokus: [
      "Ayat-Ayat Syarat Sah Shalat & Waktu-Waktunya",
      "Ayat Jual Beli & Khiyar Transaksi",
      "Ayat Hudud, Qishash, dan Ta'zir"
    ],
    signifikansiHukum: "Memudahkan pembaca melihat rincian muktamad masing-masing mazhab secara mandiri dan komparatif.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Shalat Berjamaah: Mengupas apakah jamaah itu fardhu 'ain (Hanbali), fardhu kifayah (Syafi'i), atau sunnah muakkadah (Hanafi & Maliki).",
    tahqiqDanCetakan: "Darul Kutub Al-Ilmiyyah Beirut, 5 Jilid",
    topikKunci: ["Takhsis Tiap Mazhab", "Panduan Ibadah Praktis", "Hukum Pidana Islam", "Qawaid Madzhab"]
  },
  {
    id: "fq_bidayatul_mujtahid",
    title: "Bidayatul Mujtahid wa Nihayatul Muqtashid (بداية المجتهد لابن رشد)",
    titleArabic: "بداية المجتهد ونهاية المقتصد للإمام القاضي أبي الوليد ابن رشد القرطبي",
    author: "Al-Qadhi Abu Al-Walid Muhammad bin Ahmad bin Rusyd Al-Qurthubi (w. 595 H)",
    era: "Klasik (Abad 6 H)",
    category: "fiqh_muqaran",
    mazhab: "Falsafah Ikhtilaf & Fiqh Muqaran",
    description: "Kitab legendaris yang tidak hanya menyebutkan khilaf ulama, melainkan menjelaskan 'SEBAB PERBEDAAN PENDAPAT' (Asbab Ikhtilaf Al-Fuqaha), apakah karena perbedaan qiraat, riwayat hadits, ta'arudh, atau kaidah ushul.",
    primaryAyatFokus: [
      "QS. Al-Ma'idah: 6 (Perbedaan Qiraat 'Arjulakum' Nashab vs Khafadh)",
      "QS. Al-Baqarah: 228 (Makna Quru': Suci atau Haidh)",
      "QS. An-Nur: 33 (Akad Kitabah / Pembebasan Budak)"
    ],
    signifikansiHukum: "Membentuk nalar fikih kritis ('Aql Faqih) bagi santri untuk memahami mengapa para imam mazhab berbeda kesimpulan dari satu ayat yang sama.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Thaharah: Menjelaskan sebab khilaf mencuci vs menyapu kaki berdasarkan dua varian qira'at mutawatirah.",
    tahqiqDanCetakan: "Tahqiq Ahmad Abu Al-Majd, Pustaka Azzam / Darul Hadits",
    topikKunci: ["Asbab Ikhtilaf", "Nalar Ushul", "Kaidah Ta'arudh", "Filsafat Fiqh"]
  },
  {
    id: "fq_umdatul_fiqh",
    title: "'Umdatul Fiqh (عمدة الفقه لابن قدامة)",
    titleArabic: "عمدة الفقه في المذهب الحنبلي للإمام موفق الدين ابن قدامة المقدسي",
    author: "Al-Imam Muwaffaquddin Ibnu Qudamah Al-Maqdisi (w. 620 H)",
    era: "Klasik (Abad 7 H)",
    category: "fiqh_muqaran",
    mazhab: "Hanbali Muktamad Dasar",
    description: "Matan fikih Hanbali ringkas dengan satu riwayat terpilih (mu'tamad). Menjadi tangga pertama sebelum Al-Muqni', Al-Kafi, dan Al-Mughni.",
    primaryAyatFokus: [
      "Ayat-ayat Thaharah, Shalat, Zakat, & Muamalah Sederhana"
    ],
    signifikansiHukum: "Menjaga keaslian riwayat Imam Ahmad bin Hanbal dalam format yang sangat sistematis dan mudah dihafal.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Air: Membagi air menjadi tiga macam (Thahur, Thahir, Najis) khas mazhab Hanbali klasik.",
    tahqiqDanCetakan: "Penerbit Al-Qowam & Maktabah Ar-Rusyd",
    topikKunci: ["Matan Hanbali", "Satu Riwayat", "Tafrilat Ibadah", "Dasar Santri"]
  },
  {
    id: "tf_wajiz_badawi",
    title: "Al-Wajiz fi Fiqh As-Sunnah wal Kitab Al-Aziz (الوجيز لعبد العظيم بدوي)",
    titleArabic: "الوجيز في فقه السنة والكتاب العزيز للشيخ عبد العظيم بن بدوي الخلفي",
    author: "Syaikh Abdul Azhim bin Badawi Al-Khalafi",
    era: "Kontemporer",
    category: "hadits_ahkam",
    mazhab: "Ahlus Sunnah & Salaf Ash-Shalih",
    description: "Ensiklopedi fikih ringkas yang hanya berpegang pada nash ayat Al-Qur'an dan Hadits Shahih, tanpa memasukkan khilaf panjang.",
    primaryAyatFokus: [
      "Nash-Nash Pokok Perintah dan Larangan dalam Seluruh Bab Fikih"
    ],
    signifikansiHukum: "Sangat sejalan dengan visi Syaikh Wahid Bali dalam Bidayatul Mutafaqqih; menyajikan dalil murni tanpa takalluf.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Thaharah & Mandi Janabah: Menghadirkan dalil langsung firman Allah dan sabda Rasulullah tanpa ta'wil.",
    tahqiqDanCetakan: "Dar Ibni Rajab Kairo / Pustaka As-Sunnah",
    topikKunci: ["Hadits Shahih", "Dalil Qath'i", "Ringkas Praktis", "Fiqh Sunnah"]
  },
  {
    id: "tf_tamamul_minnah",
    title: "Tamamul Minnah fi Fiqh As-Sunnah (تمام المنة لعادل العزازي)",
    titleArabic: "تمام المنة في فقه الكتاب وصحيح السنة للشيخ عادل بن يوسف العزازي",
    author: "Syaikh Abu Abdurrahman Adil bin Yusuf Al-Azzazi",
    era: "Kontemporer",
    category: "hadits_ahkam",
    mazhab: "Tarjih & Takhrij Hadits Sunnah",
    description: "Kitab komprehensif 3 jilid (Thaharah, Shalat, Zakat, Puasa, Haji, Muamalah, Nikah) yang menyertakan takhrij riwayat secara detail merujuk pada penilaian Syaikh Al-Albani.",
    primaryAyatFokus: [
      "Ayat-ayat Ibadah, Shalat Jumat, Jenazah, dan Transaksi Keuangan"
    ],
    signifikansiHukum: "Rujukan utama untuk tarjih hadits-hadits ahkam yang menjadi perselisihan derajat (shahih/dha'if) di kalangan ulama.",
    googleDriveFolder: GOOGLE_DRIVE_REF_FOLDER.url,
    sampleBabApplication: "Bab Wudhu: Menelaah hadits menyapu leher (apakah shahih atau bid'ah dho'ifah) dan hadits membaca basmalah.",
    tahqiqDanCetakan: "Muassasah Qurthubah, 3 Jilid",
    topikKunci: ["Takhrij Al-Albani", "Tarjih Riwayat", "Khilaf Salaf", "Tahqiq Sanad"]
  }
];

export const INTEGRASI_SYARAH_TAFSIR_PANDUAN = [
  {
    langkah: 1,
    nama: "Takhrij Ayat Ahkam Pokok",
    deskripsi: "Menghubungkan matan pasal Bidayatul Mutafaqqih dengan ayat hukum spesifik dari Al-Qur'an (misal: QS. Al-Ma'idah: 6 untuk Thaharah)."
  },
  {
    langkah: 2,
    nama: "Analisis Tafsir Ahkam 4 Mazhab",
    deskripsi: "Membedah ayat tersebut dengan rujukan Ahkam Al-Qur'an Al-Jashshash (Hanafi), Ibnu Al-Arabi (Maliki), Al-Kiya Al-Harrasi (Syafi'i), dan Al-Qurthubi (Muqaran)."
  },
  {
    langkah: 3,
    nama: "Asbab Ikhtilaf & Nalar Ushul",
    deskripsi: "Menggunakan Bidayatul Mujtahid Ibnu Rusyd untuk menjelaskan akar linguistik atau varian qira'at yang melahirkan perbedaan hukum."
  },
  {
    langkah: 4,
    nama: "Takhrij Hadits & Tarjih Dalil",
    deskripsi: "Menguji sanad riwayat penguat menggunakan Tamamul Minnah, Al-Wajiz, dan Ensiklopedi Hadits Al-Luhaidan."
  },
  {
    langkah: 5,
    nama: "Studi Komparasi & Fiqh Nawazil",
    deskripsi: "Memperkaya dengan fatwa kontemporer Wahbah Az-Zuhaili (Al-Fiqh Al-Islami wa Adillatuh) dan lembaga fatwa internasional."
  }
];
