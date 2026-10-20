// =======================================================================
// TEMPLATE SISTEMATIKA SYARAH BAKU KITAB BIDAYATUL MUTAFAQQIH
// Syaikh Dr. Wahid bin Abdussalam Bali
// Komparasi 4 Mazhab & Studi Hadits Ahkam Komprehensif
// =======================================================================

export interface KataKunciIstilah {
  lafalArab: string;
  transliterasi: string;
  maknaLughawi: string;     // Etimologi & akar kata (Lisanul Arab, Mu'jam Maqayis al-Lughah)
  maknaIshthilahi: string;  // Terminologi syariat para fuqaha
}

export interface DalilTakhrijDetail {
  nashArab: string;
  terjemah: string;
  takhrij: string;          // Kitab hadits & nomor takhrij
  derajatHadits: 'Muttafaqun \'Alaih' | 'Shahih' | 'Hasan' | 'Atsar Shahih';
  penilaiDerajat: string;   // Muhaddits yang mentahqiq (mis. Syaikh Al-Albani, Ibnu Hajar, dll.)
  wajhulDilalah: string;    // Sisi pendalilan (cara penarikan hukum dari lafazh)
  syahidMutabaah?: string;  // Riwayat penguat
}

export interface MazhabDetailItem {
  tokohUlama: string;
  kitabRujukan: string;
  halamanJilid: string;
  posisiHukum: string;
  dalilArgumentasi: string;
  statusQaul: string;
}

export interface Perbandingan4MazhabDetail {
  hanafi: MazhabDetailItem;
  maliki: MazhabDetailItem;
  syafii: MazhabDetailItem;
  hanbali: MazhabDetailItem;
}

export interface AnalisisTarjihDetail {
  pendapatTerpilih: string;
  alasanTarjih: string;
  kaidahUshulFiqh: string;
  ulamaMuhaqqiq: string;
}

export interface FaedahKontemporerDetail {
  studiKasusModern: string;
  konteksSainsTeknologi: string;
  fatwaLembagaDunia: string;
  dhowabithAplikatif: string;
}

export interface SyarahPasalTemplate {
  id: string;
  nomorPasal: number;
  judulPasal: string;
  kitabNama: string;
  dhabithArab: string;
  dhabithTerjemah: string;
  matanArab: string;
  matanTerjemah: string;
  // 5 PILAR SISTEMATIKA SYARAH:
  etimologiTerminologi: {
    istilahUtama: KataKunciIstilah[];
    kaidahBahasa: string;
  };
  analisisDalil: {
    dalilList: DalilTakhrijDetail[];
    asbabulWurud?: string;
  };
  perbandingan4Mazhab: Perbandingan4MazhabDetail;
  analisisTarjih: AnalisisTarjihDetail;
  faedahKontemporer: FaedahKontemporerDetail;
}

// ══════════════════════════════════════════════════════════════════
// FORMAT BAKU / PANDUAN KERANGKA SYARAH (UNTUK DRAFT RISET / SANTRI)
// ══════════════════════════════════════════════════════════════════
export const panduanSistematikaSyarah = {
  judul: "Sistematika Baku Syarah Pasal Kitab Bidayatul Mutafaqqih",
  tujuan: "Memberikan panduan metodologis ilmiah dalam mengurai matan Bidayatul Mutafaqqih ke dalam tradisi syarah turats yang komprehensif, terstruktur, berbasis nash shahih, komparasi 4 madzhab, tarjih muhaqqiq, dan kontekstualisasi zaman modern.",
  langkahLangkah: [
    {
      tahap: 1,
      nama: "Makna Etimologi & Terminologi (الدِّلَالَةُ اللُّغَوِيَّةُ وَالإِصْطِلَاحِيَّةُ)",
      deskripsi: "Mengurai akar kata (isytiqaq) lafazh kunci matan berdasarkan kamus-kamus klasik bahasa Arab (seperti Lisanul Arab karya Ibnul Manzhur, Mu'jam Maqayis al-Lughah karya Ibnu Faris, atau Al-Qamus Al-Muhith), dilanjutkan dengan merumuskan batasan definisi syar'i (hadd ishthilahi) yang disepakati atau diperselisihkan fuqaha."
    },
    {
      tahap: 2,
      nama: "Analisis Dalil & Takhrij Hadits (تَخْرِيجُ الأَحَادِيثِ وَوَجْهُ الدِّلَالَةِ)",
      deskripsi: "Menyajikan seluruh dalil Al-Qur'an dan As-Sunnah yang melandasi pasal, melakukan takhrij ke kutubus sittah atau musnad induk, menetapkan derajat keshahihan sanad berdasarkan penilaian muhaddits mu'tabar (Imam Al-Bukhari, Muslim, At-Tirmidzi, Ibnu Hajar, Syaikh Al-Albani), serta menjelaskan sisi pendalilan (wajh ad-dilalah)."
    },
    {
      tahap: 3,
      nama: "Perbandingan Pendapat Ulama 4 Mazhab (الفِقْهُ المُقَارَنُ بَيْنَ المَذَاهِبِ الأَرْبَعَةِ)",
      deskripsi: "Memetakan secara objektif posisi hukum dan argumentasi dari masing-masing 4 Mazhab mu'tabar: Mazhab Hanafi (Al-Mabsuth, Raddul Muhtar), Mazhab Maliki (Al-Mudawwanah, Bidayatul Mujtahid), Mazhab Syafi'i (Al-Umm, Minhajut Thalibin), dan Mazhab Hanbali (Al-Mughni, Umdatul Fiqh, Manar As-Sabil)."
    },
    {
      tahap: 4,
      nama: "Analisis Wajhul Istidlal & Tarjih (التَّرْجِيحُ وَتَحْرِيرُ مَحَلِّ النِّزَاعِ)",
      deskripsi: "Menegaskan titik temu (ijma'/ittifaq) dan titik perselisihan (mahallun niza'), menimbang kekuatan dalil masing-masing kubu dengan kaidah ushul fiqh, serta menyimpulkan pendapat yang paling kuat (rajih) selaras dengan manhaj Syaikh Wahid Bali dan para imam muhaqqiq."
    },
    {
      tahap: 5,
      nama: "Faedah Kontemporer & Studi Kasus Modern (النَّوَازِلُ الفِقْهِيَّةُ وَالمَسَائِلُ المُعَاصِرَةُ)",
      deskripsi: "Menghubungkan dhabith (kaidah matan) dengan persoalan masa kini, sains medis, teknologi rekayasa, transaksi keuangan modern, serta keputusan lembaga fatwa internasional (Majma' Al-Fiqh Al-Islami / Darul Ifta)."
    }
  ]
};

// ══════════════════════════════════════════════════════════════════
// CONTOH SYARAH BAKU LENGKAP UNTUK PASAL-PASAL KUNCI
// ══════════════════════════════════════════════════════════════════
export const contohSyarahLengkap: SyarahPasalTemplate[] = [
  // ── CONTOH 1: KITAB ATH-THAHARAH (PASAL 1 - HUKUM AIR) ──
  {
    id: "syarah_th_01",
    nomorPasal: 1,
    judulPasal: "Pembagian Jenis Air, Batasan Dua Qullah, dan Hukum Kesuciannya",
    kitabNama: "Kitab Thaharah (كِتَابُ الطَّهَارَةِ)",
    dhabithArab: "الضَّابِطُ الأَوَّلُ: المِيَاهُ قِسْمَانِ: طَهُورٌ وَنَجِسٌ",
    dhabithTerjemah: "Kaidah Pokok Ke-1: Air terbagi menjadi dua bagian: Air Thahur (suci menyucikan) dan Air Najis.",
    matanArab: "المِيَاهُ قِسْمَانِ: طَهُورٌ: وَهُوَ البَاقِي عَلَى خِلْقَتِهِ، فَيَرْفَعُ الحَدَثَ وَيُزِيلُ الخَبَثَ. وَنَجِسٌ: وَهُوَ مَا تَغَيَّرَ بِنَجَاسَةٍ، أَوْ لَاقَاهَا وَهُوَ دُونَ القُلَّتَيْنِ.",
    matanTerjemah: "Air terbagi menjadi dua bagian: (1) Air Thahur: Yaitu air yang masih berada di atas sifat asli penciptaannya, maka ia dapat mengangkat hadats dan menghilangkan najis. (2) Air Najis: Yaitu air yang berubah karena najis, atau air yang terkena najis dalam jumlah kurang dari dua qullah.",
    
    // 1. Etimologi & Terminologi
    etimologiTerminologi: {
      istilahUtama: [
        {
          lafalArab: "الطَّهَارَةُ (Thaharah)",
          transliterasi: "Ath-Thahārah",
          maknaLughawi: "Berasal dari kata طَهُرَ - يَطْهُرُ - طَهَارَةً yang bermakna النَّظَافَةُ وَالنَّزَاهَةُ مِنَ الأَدْنَاسِ (kebersihan dan keterbebasan dari kotoran, baik kotoran kasat mata/hissi maupun kotoran batin/ma'nawi seperti syirik dan maksiat).",
          maknaIshthilahi: "Secara terminologi syar'i fuqaha: رَفْعُ الحَدَثِ، وَإِزَالَةُ النَّجَسِ، وَمَا فِي مَعْنَاهُمَا (Mengangkat hadats yang menghalangi shalat dan menghilangkan najis dari badan, pakaian, serta tempat shalat dengan air muthlaq atau penggantinya)."
        },
        {
          lafalArab: "الطَّهُورُ (Thahur)",
          transliterasi: "Ath-Thahūr",
          maknaLughawi: "Bentuk wazan فَعُول (fa'ūl) yang memiliki dua faedah bahasa: mubalaghah (kesucian yang sempurna) dan al-muta'addi (pensifat yang menyucikan selain dirinya). Berdasarkan kaidah: كُلُّ طَهُورٍ طَاهِرٌ، وَلَيْسَ كُلُّ طَاهِرٍ طَهُورًا (Setiap thahur pasti suci, namun tidak semua yang suci itu thahur).",
          maknaIshthilahi: "الطَّاهِرُ فِي نَفْسِهِ، المُطَهِّرُ لِغَيْرِهِ، غَيْرُ المَكْرُوهِ (Air yang zatnya suci dan mampu menyucikan hadats serta kotoran benda lain, dan tidak makruh digunakan)."
        },
        {
          lafalArab: "القُلَّتَانِ (Al-Qullatani)",
          transliterasi: "Al-Qullatān",
          maknaLughawi: "Bentuk tatsniyah (dual) dari perkataan قُلَّة (qullah), yang artinya wadah atau tempayan besar tanah liat buatan kawasan Hajar (desa dekat Madinah) yang bisa diangkat (tuqallu) oleh seorang pria dewasa.",
          maknaIshthilahi: "Ukuran volume air batas minimal yang menjadikannya berstatus 'air banyak' (mā' katsīr), diestimasi setara 500 rithl Baghdad, atau kurang lebih 216 liter (kubus 60 x 60 x 60 cm)."
        }
      ],
      kaidahBahasa: "Isim sifat fa'ul (طَهُور) dalam nash syar'i menunjukkan fungsi instrumental muta'addi, sebagaimana firman Allah: 'وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً طَهُورًا'."
    },

    // 2. Analisis Dalil & Takhrij Hadits
    analisisDalil: {
      dalilList: [
        {
          nashArab: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً طَهُورًا",
          terjemah: "\"Dan Kami turunkan dari langit air yang suci lagi menyucikan (thahur).\" (QS. Al-Furqan: 48)",
          takhrij: "Al-Qur'anul Karim, Surah Al-Furqan ayat 48",
          derajatHadits: "Shahih",
          penilaiDerajat: "Ayat Muhkamah Al-Qur'an (Qath'iyuts Tsubut)",
          wajhulDilalah: "Lafazh 'Thahuran' menegaskan bahwa air hujan dan seluruh sumber air alamiah memiliki sifat suci sekaligus sanggup menyucikan orang yang bersuci dengannya."
        },
        {
          nashArab: "هُوَ الطَّهُورُ مَاؤُهُ، الحِلُّ مَيْتَتُهُ",
          terjemah: "\"Laut itu suci menyucikan airnya dan halal bangkainya.\"",
          takhrij: "HR. Abu Dawud no. 83, At-Tirmidzi no. 69, An-Nasa'i no. 59, Ibnu Majah no. 386",
          derajatHadits: "Shahih",
          penilaiDerajat: "Imam At-Tirmidzi menyatakan: Hadits Hasan Shahih; Dishahihkan oleh Imam Al-Bukhari & Syaikh Al-Albani (Shahih Sunan Abi Dawud)",
          wajhulDilalah: "Jawaban Nabi ﷺ atas pertanyaan sahabat yang berlayar dan khawatir kehabisan air tawar membuktikan bahwa air laut, kendati asin pekat, tetap berada pada status 'thahur' yang sah untuk wudhu dan mandi.",
          syahidMutabaah: "Diriwayatkan melalui jalur Abu Hurairah, Jabir bin Abdillah, dan Al-Firkas dengan sanad mutashil."
        },
        {
          nashArab: "إِذَا كَانَ المَاءُ قُلَّتَيْنِ لَمْ يَحْمِلِ الخَبَثَ",
          terjemah: "\"Jika air telah mencapai dua qullah, niscaya ia tidak mengandung kotoran/najis.\"",
          takhrij: "HR. Ahmad 2/27, Abu Dawud no. 63, At-Tirmidzi no. 67, An-Nasa'i 1/46, Ibnu Majah no. 517",
          derajatHadits: "Shahih",
          penilaiDerajat: "Dishahihkan oleh Ibnu Khuzaimah, Ibnu Hibban, Al-Hakim, Ibnu Hajar (At-Talkhis 1/13), dan Al-Albani (Irwa'ul Ghalil no. 23)",
          wajhulDilalah: "Mafhum mukhalafah hadits: jika air kurang dari dua qullah, maka bila terkena najis ia menjadi terpengaruh (mutanajjis) menurut mayoritas ulama, sedangkan bila mencapai dua qullah maka tidak menjadi najis kecuali berubah rasa, bau, atau warnanya."
        }
      ],
      asbabulWurud: "Para sahabat bertanya kepada Rasulullah ﷺ ketika berada di padang sahara mengenai genangan air terbuka yang sering didatangi binatang buas dan ternak untuk minum dan kencing."
    },

    // 3. Perbandingan Pendapat 4 Mazhab
    perbandingan4Mazhab: {
      hanafi: {
        tokohUlama: "Imam Abu Hanifah & Abu Yusuf",
        kitabRujukan: "Al-Mabsuth karya As-Sarkhasi & Raddul Muhtar karya Ibnu Abidin",
        halamanJilid: "Al-Mabsuth 1/62, Raddul Muhtar 1/180",
        posisiHukum: "Tidak menggunakan batasan 'dua qullah'. Menggunakan patokan 'Al-Mā'ul Katsīr' (Air Banyak) dengan kriteria 'Ghairul Muta-harrik' (bila digerakkan di satu sisi wadah, sisinya yang lain tidak ikut bergoyang/10x10 dzira'). Bila kurang dari itu dan tertimpa najis, air najis seketika meski tidak berubah.",
        dalilArgumentasi: "Hadits 'Mā'un la yanjus illa bi taghayyur' serta mempertimbangkan bahwa hadits qullatain memiliki ikhtilaf pada matan (antara 2 qullah atau 3 qullah).",
        statusQaul: "Zhahirur Riwayah Mu'tamad"
      },
      maliki: {
        tokohUlama: "Imam Malik bin Anas",
        kitabRujukan: "Al-Mudawwanah Al-Kubra & Bidayatul Mujtahid karya Ibnu Rusyd",
        halamanJilid: "Al-Mudawwanah 1/5, Bidayatul Mujtahid 1/24",
        posisiHukum: "Air hanya terbagi menjadi 2: Thahur dan Najis. Tidak ada pembagian 3 jenis air. Air sedikit maupun banyak tidak menjadi najis kecuali jika benar-benar berubah salah satu dari tiga sifatnya (rasa, warna, atau bau) karena najis.",
        dalilArgumentasi: "Berdasarkan Hadits Sumur Budha'ah: 'إِنَّ المَاءَ طَهُورٌ لَا يُنَجِّسُهُ شَيْءٌ' (Sesungguhnya air itu thahur dan tidak dapat dinajiskan oleh apapun). Hadits dua qullah dinilai berderajat mudhtharib sanad oleh Malikiyah.",
        statusQaul: "Madzhab Ahlul Madinah Muktamad"
      },
      syafii: {
        tokohUlama: "Imam Muhammad bin Idris Asy-Syafi'i & Imam An-Nawawi",
        kitabRujukan: "Al-Umm & Minhajut Thalibin",
        halamanJilid: "Al-Umm 1/15, Minhajut Thalibin 1/12",
        posisiHukum: "Air terbagi menjadi 4 kategori: (1) Thahur Muthlaq, (2) Musyammas (makruh), (3) Thahir Ghairu Muthahhir (suci tidak menyucikan: musta'mal & bercampur materi suci yang merubah nama), (4) Mutanajjis (air kurang dari 2 qullah terkena najis meski tidak berubah, atau air 2 qullah yang berubah sifat).",
        dalilArgumentasi: "Menggabungkan dalil hadits dua qullah dan hadits larangan mencelupkan tangan ke bejana sebelum dicuci 3 kali setelah bangun tidur.",
        statusQaul: "Qaul Jadid Muktamad"
      },
      hanbali: {
        tokohUlama: "Imam Ahmad bin Hanbal, Ibnu Qudamah, Ibnu Duwayyan",
        kitabRujukan: "Al-Mughni, Umdatul Fiqh, Manar As-Sabil",
        halamanJilid: "Al-Mughni 1/18, Manar As-Sabil 1/11, Umdatul Fiqh hal. 14",
        posisiHukum: "Secara resmi madzhab membagi air menjadi 3 tingkatan: Thahur, Thahir, dan Najis. Namun para muhaqqiq Hanbali (seperti Ibnu Taimiyyah, Ibnul Qayyim, dan Syaikh Dr. Wahid Bali) mentarjih pembagian 2 bagian saja: Thahur dan Najis.",
        dalilArgumentasi: "Hadits 'Thahur la yanjusuhu syai'' sebagai dalil asal kesucian air, serta mafhum hadits dua qullah.",
        statusQaul: "Riwayat Mu'tamad Al-Khirasyi & Tarjih Ibnu Taimiyyah"
      }
    },

    // 4. Analisis Tarjih & Kaidah Ushul
    analisisTarjih: {
      pendapatTerpilih: "Pendapat yang mentarjih pembagian air menjadi DUA BAGIAN SAJA (Thahur dan Najis) sebagaimana dirumuskan oleh Syaikh Wahid Bali dalam Bidayatul Mutafaqqih, yang juga merupakan madzhab Malikiyah dan pilihan Syaikhul Islam Ibnu Taimiyyah.",
      alasanTarjih: "Tidak ada dalil shahih sharih dari Al-Qur'an maupun As-Sunnah yang menyebutkan keberadaan status 'Air Thahir Ghairu Muthahhir' (air suci tapi tak menyucikan). Status air musta'mal (bekas wudhu) tetap suci dan menyucikan asalkan tidak berubah oleh najis, karena para sahabat dahulu saling berebut sisa tetesan air wudhu Rasulullah ﷺ dan mengusapkannya ke kulit mereka.",
      kaidahUshulFiqh: "الأَصْلُ فِي المَاءِ الطَّهَارَةُ حَتَّى تَتَيَقَّنَ النَّجَاسَةُ (Hukum asal pada air adalah suci hingga diyakini adanya perubahan karena najis).",
      ulamaMuhaqqiq: "Syaikhul Islam Ibnu Taimiyyah (Majmu' Al-Fatawa 21/30), Ibnul Qayyim, Imam Asy-Syaukani (Nailul Authar), dan Syaikh Al-Albani (Tamamul Minnah)."
    },

    // 5. Faedah Kontemporer & Studi Kasus Modern
    faedahKontemporer: {
      studiKasusModern: "Hukum Air Hasil Daur Ulang IPAL (Instalasi Pengolahan Air Limbah) / Rekayasa Water Treatment PDAM & Reverse Osmosis.",
      konteksSainsTeknologi: "Melalui proses multi-stage aeration, sedimentasi kimiawi, mikro-filtrasi, dan ozonisasi/klorinasi modern, air limbah buangan yang semula mengandung kotoran (najis) dipisahkan total dari zat polutan hingga kembali jernih, higienis, serta tidak tersisa bau, warna, maupun rasa najis sedikitpun.",
      fatwaLembagaDunia: "Keputusan Majma' Al-Fiqh Al-Islami OKI (Keputusan No. 80 D 3/8) dan Fatwa MUI No. 2 Tahun 2010: Air daur ulang hukumnya SUCI DAN MENYUCIKAN (Thahur) untuk wudhu dan mandi, karena istihalah (perubahan hakikat zat) dan istihlak (pembersihan total materi najis hingga sifat aslinya kembali).",
      dhowabithAplikatif: "Air keran atau air penampungan toren rumah tangga yang mencapai volume di atas 216 liter (misal tandon 300-1000 liter) memiliki perlindungan syar'i kuat dari status mutanajjis apabila kejatuhan kotoran kecil selama tidak mengubah rasa, warna, atau aromanya."
    }
  },

  // ── CONTOH 2: KITAB ASH-SHALAH (PASAL RUKUN & THUMA'NINAH) ──
  {
    id: "syarah_sh_01",
    nomorPasal: 2,
    judulPasal: "Rukun-Rukun Shalat, Kedudukan Takbiratul Ihram, Al-Fatihah, dan Hakikat Thuma'ninah",
    kitabNama: "Kitab Shalat (كِتَابُ الصَّلَاةِ)",
    dhabithArab: "الضَّابِطُ الأَوَّلُ: أَرْكَانُ الصَّلَاةِ أَرْبَعَةَ عَشَرَ رُكْنًا",
    dhabithTerjemah: "Kaidah Pokok: Rukun shalat berjumlah 14 perkara, tidak sah shalat bila gugur salah satunya baik sengaja maupun lupa.",
    matanArab: "أَرْكَانُ الصَّلَاةِ: القِيَامُ مَعَ القُدْرَةِ، وَتَكْبِيرَةُ الإِحْرَامِ، وَقِرَاءَةُ الفَاتِحَةِ، وَالرُّكُوعُ، وَالاعْتِدَالُ، وَالسُّجُودُ، وَالجُلُوسُ بَيْنَ السَّجْدَتَيْنِ، وَالطُّمَأْنِينَةُ فِي الجَمِيعِ، وَالتَّشَهُّدُ الأَخِيرُ، وَجُلُوسُهُ، وَالصَّلَاةُ عَلَى النَّبِيِّ ﷺ، وَالتَّسْلِيمُ، وَالتَّرْتِيبُ.",
    matanTerjemah: "Rukun-rukun shalat ada 14: (1) Berdiri bagi yang mampu, (2) Takbiratul Ihram, (3) Membaca Surah Al-Fatihah, (4) Ruku', (5) I'tidal, (6) Sujud di atas 7 anggota badan, (7) Duduk di antara dua sujud, (8) Thuma'ninah pada semua gerakan rukun, (9) Tasyahhud akhir, (10) Duduk tasyahhud akhir, (11) Shalawat atas Nabi ﷺ, (12) Salam pertama, (13) Tertib berurutan.",

    etimologiTerminologi: {
      istilahUtama: [
        {
          lafalArab: "الرُّكْنُ (Ar-Rukn)",
          transliterasi: "Ar-Rukn (jamak: Arkān)",
          maknaLughawi: "جَانِبُ الشَّيْءِ الأَقْوَى (Bagian sudut yang paling kuat dari suatu bangunan penyangga).",
          maknaIshthilahi: "مَا كَانَ جُزْءًا دَاخِلًا فِي مَاهِيَّةِ الشَّيْءِ لَا يَتِمُّ إِلَّا بِهِ، وَلَا يَسْقُطُ عَمْدًا وَلَا سَهْوًا (Unsur pokok internal pembentuk hakikat ibadah yang tidak akan sah tanpanya, dan tidak dapat digantikan dengan sujud sahwi bila sengaja ditinggalkan)."
        },
        {
          lafalArab: "الطُّمَأْنِينَةُ (Ath-Thuma'ninah)",
          transliterasi: "Ath-Thuma'nīnah",
          maknaLughawi: "السُّكُونُ وَالاسْتِقْرَارُ بَعْدَ الحَرَكَةِ (Ketenangan, diam menetapnya anggota tubuh setelah bergerak).",
          maknaIshthilahi: "سُكُونُ جَمِيعِ الأَعْضَاءِ فِي مَوْضِعِهَا بِقَدْرِ تَسْبِيحَةٍ وَاحِدَةٍ عَلَى الأَقَلِّ (Diam dan tenangnya seluruh sendi dan persendian pada posisinya minimal seukuran membaca satu kali tasbih 'Subhana Rabbiyal Azhim/A'la')."
        }
      ],
      kaidahBahasa: "Perbedaan Ushul antara 'Rukn' dan 'Syarth': Syarat berada di luar amalan (seperti thaharah & menghadap kiblat), sedangkan Rukun berada di dalam substansi amalan shalat itu sendiri."
    },

    analisisDalil: {
      dalilList: [
        {
          nashArab: "صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي",
          terjemah: "\"Shalatlah kalian sebagaimana kalian melihat aku shalat.\" (HR. Al-Bukhari)",
          takhrij: "Shahih Al-Bukhari no. 631, Kitabul Adzan",
          derajatHadits: "Shahih",
          penilaiDerajat: "Imam Al-Bukhari (Muttafaqun 'Alaih substansinya)",
          wajhulDilalah: "Hadits ini adalah kaidah global shalat: seluruh tata cara Nabi yang wajib dipraktekkan menjadi penjelas (bayan) atas perintah muthlaq dalam Al-Qur'an 'Aqimush-shalah'."
        },
        {
          nashArab: "ارْجِعْ فَصَلِّ، فَإِنَّكَ لَمْ تُصَلِّ... ثُمَّ ارْكَعْ حَتَّى تَطْمَئِنَّ رَاكِعًا",
          terjemah: "\"Kembalilah dan ulangi shalatmu, karena sungguh engkau belum shalat!... Kemudian ruku'lah hingga engkau thuma'ninah dalam ruku'mu...\"",
          takhrij: "HR. Al-Bukhari no. 757, Muslim no. 397 (Hadits Al-Musi'u Shalatuhu)",
          derajatHadits: "Muttafaqun 'Alaih",
          penilaiDerajat: "Shahihaini (Puncak Keshahihan Hadits)",
          wajhulDilalah: "Pernyataan Nabi 'fa innaka lam tushalli' (engkau belum shalat) menjadi dalil sharih bahwa shalat tanpa thuma'ninah adalah bathil secara hakiki dan gugur pahala maupun keabsahannya."
        }
      ]
    },

    perbandingan4Mazhab: {
      hanafi: {
        tokohUlama: "Imam Abu Hanifah",
        kitabRujukan: "Al-Mabsuth 1/20, Raddul Muhtar 1/440",
        halamanJilid: "Juz 1 Hal 20",
        posisiHukum: "Membaca Al-Fatihah dan Thuma'ninah dikategorikan sebagai 'Wajib' (bukan Rukun Fardhu). Jika ditinggalkan secara sengaja shalat tetap sah namun berdosa dan wajib diulang; jika lupa cukup sujud sahwi.",
        dalilArgumentasi: "Ayat Al-Qur'an 'Faqra'u ma tayassara minal Qur'an' bersifat muthlaq, hadits ahad tidak bisa menasakh kemuthlaqan Al-Qur'an menjadi fardhu pembatal.",
        statusQaul: "Mu'tamad Madzhab Hanafi"
      },
      maliki: {
        tokohUlama: "Imam Malik bin Anas",
        kitabRujukan: "Al-Mudawwanah 1/68, Risalah Ibnu Abi Zaid Al-Qairawani",
        halamanJilid: "Juz 1 Hal 68",
        posisiHukum: "Thuma'ninah dan Al-Fatihah adalah rukun fardhu bagi imam dan munfarid (orang shalat sendiri). Makmum tidak wajib membaca Al-Fatihah dalam shalat jahriyyah.",
        dalilArgumentasi: "Hadits Al-Musi'u Shalatuhu dan 'Wa idza quri'al Qur'anu fastami'u lahu wa anshitu'.",
        statusQaul: "Mu'tamad Madzhab Maliki"
      },
      syafii: {
        tokohUlama: "Imam Asy-Syafi'i, Imam An-Nawawi",
        kitabRujukan: "Al-Umm 1/104, Al-Majmu' Syarah Al-Muhadzdzab 3/320",
        halamanJilid: "Al-Majmu' 3/320",
        posisiHukum: "Thuma'ninah adalah rukun mustaqil (independen) dalam ruku', i'tidal, sujud, dan duduk. Membaca Al-Fatihah fardhu atas imam, makmum, dan munfarid di setiap rakaat baik shalat sirriyyah maupun jahriyyah.",
        dalilArgumentasi: "Hadits shahih: 'Lā shalāta liman lam yaqra' bifātihatil kitāb' (Tidak sah shalat orang yang tak membaca Fatihatul Kitab).",
        statusQaul: "Qaul Jadid Muktamad"
      },
      hanbali: {
        tokohUlama: "Imam Ahmad bin Hanbal, Ibnu Qudamah",
        kitabRujukan: "Al-Mughni 2/120, Umdatul Fiqh hal. 22",
        halamanJilid: "Al-Mughni 2/120",
        posisiHukum: "Thuma'ninah adalah rukun mutlak shalat. Shalat orang yang mematuk cepat (cepat seperti ayam mematuk biji) bathil total.",
        dalilArgumentasi: "Hadits 'La yujzi'u shalatun la yuqimu fiha ar-rajulu shulbahu fir-ruku'i was-sujud'.",
        statusQaul: "Nash Imam Ahmad Mu'tamad"
      }
    },

    analisisTarjih: {
      pendapatTerpilih: "Pendapat Jumhur (Syafi'i, Maliki, Hanbali) bahwa Thuma'ninah dan Membaca Al-Fatihah adalah RUKUN SHALAT yang membatalkan keabsahan shalat bila ditinggalkan.",
      alasanTarjih: "Teguran langsung Nabi ﷺ kepada sahabat yang shalat terburu-buru sebanyak tiga kali berturut-turut dengan sabda tegas 'Shalatlah kembali karena engkau belum shalat' menjadi nash sharih yang menolak klaim keabsahan shalat tanpa thuma'ninah.",
      kaidahUshulFiqh: "النَّهْيُ يَقْتَضِي الفَسَادَ فِي العِبَادَاتِ (Larangan dalam konteks ibadah berkonsekuensi rusaknya/batalnya ibadah tersebut).",
      ulamaMuhaqqiq: "Imam An-Nawawi, Ibnu Hajar Al-Asqalani, Syaikh Al-Albani (Shifatu Shalatin Nabiyyi ﷺ)."
    },

    faedahKontemporer: {
      studiKasusModern: "Fenomena Shalat Kilat Tarawih di Sebagian Komunitas & Shalat di Dalam Moda Transportasi Berkecepatan Tinggi (Pesawat / Kereta Cepat Shinkansen).",
      konteksSainsTeknologi: "Studi neuromuskular membuktikan bahwa thuma'ninah (diam sejenak minimal 2-3 detik per rukun) memicu relaksasi saraf parasimpatis, melancarkan peredaran darah ke serebrum korteks saat sujud, dan menyelaraskan ritme detak jantung.",
      fatwaLembagaDunia: "Keputusan Lembaga Riset Ilmiah dan Fatwa (Lajnah Da'imah Saudi No. 4153): Shalat tarawih 20 rakaat dalam waktu 7-10 menit tanpa thuma'ninah adalah bathil dan tidak sah, wajib diulang atau dinasihati imamnya.",
      dhowabithAplikatif: "Shalat di atas pesawat terbang: bila waktu shalat masih panjang hingga mendarat, tunggu sampai mendarat untuk berdiri dan ruku' sempurna; bila waktu akan habis, shalat di lorong atau tempat duduk dengan isyarat ruku' dan sujud sesuai batas kemampuan ('Fattaqullaha mastatha'tum')."
    }
  },

  // ── CONTOH 3: KITABUL MUAMALAT (QIRADH / MUDHARABAH & BUYU') ──
  {
    id: "syarah_mu_01",
    nomorPasal: 3,
    judulPasal: "Hakikat Akad Qiradh (Mudharabah), Pembagian Nisbah Keuntungan, dan Tanggung Jawab Kerugian Finansial",
    kitabNama: "Kitab Muamalat (كِتَابُ المُعَامَلَاتِ)",
    dhabithArab: "الضَّابِطُ الأَوَّلُ: القِرَاضُ دَفْعُ مَالٍ مَعْلُومٍ لِمَنْ يَتَّجِرُ فِيهِ بِجُزْءٍ شَائِعٍ مِنَ الرِّبْحِ",
    dhabithTerjemah: "Kaidah Pokok: Qiradh adalah penyerahan sejumlah modal tertentu kepada pengelola (mudharib) untuk diniagakan dengan imbalan bagian persentase keuntungan yang jelas (nisbah).",
    matanArab: "القِرَاضُ: أَنْ يَدْفَعَ المَالِكُ مَالًا نَقْدِيًّا مَعْلُومًا لِعَامِلٍ لِيَتَّجِرَ فِيهِ، عَلَى أَنَّ الرِّبْحَ بَيْنَهُمَا عَلَى جُزْءٍ شَائِعٍ مَعْلُومٍ، وَالخَسَارَةُ عَلَى رَبِّ المَالِ وَحْدَهُ مَا لَمْ يُفَرِّطِ العَامِلُ.",
    matanTerjemah: "Qiradh (Mudharabah) adalah: pemilik modal menyerahkan sejumlah modal uang tunai yang jelas kepada pihak pengelola usaha untuk diniagakan, dengan kesepakatan bahwa pembagian keuntungan dibagi bersama secara persentase (nisbah) yang disepakati, sedangkan kerugian modal murni ditanggung pemilik dana selama pengelola tidak lalai atau curang.",

    etimologiTerminologi: {
      istilahUtama: [
        {
          lafalArab: "القِرَاضُ (Al-Qiradh)",
          transliterasi: "Al-Qirādh / Al-Muqāradhah",
          maknaLughawi: "Berasal dari kata القَرْضُ (Al-Qardhu) yang bermakna القَطْعُ (memotong). Dinamakan demikian karena pemilik modal 'memotong' sebagian hartanya untuk diamanahkan kepada amil, dan amil memotong sebagian laba sebagai imbalan jerih payahnya.",
          maknaIshthilahi: "عَقْدٌ يَدْفَعُ بِمُوجَبِهِ رَبُّ المَالِ مَالًا لِلْعَامِلِ لِيَتَّجِرَ فِيهِ عَلَى أَنْ يَكُونَ الرِّبْحُ مُشْتَرَكًا بَيْنَهُمَا حَسَبَ الشَّرْطِ (Akad persekutuan permodalan di mana shahibul mal menyediakan 100% modal dan mudharib menyediakan keahlian kerja, dengan laba dibagi sesuai persentase yang disepakati)."
        },
        {
          lafalArab: "المُضَارَبَةُ (Al-Mudharabah)",
          transliterasi: "Al-Mudhārabah",
          maknaLughawi: "Berasal dari kata الضَّرْبُ فِي الأَرْضِ (bepergian dan berusaha di muka bumi untuk berniaga), sebagaimana firman Allah: 'وَآخَرُونَ يَضْرِبُونَ فِي الْأَرْضِ يَبْتَغُونَ مِنْ فَضْلِ اللَّهِ' (QS. Al-Muzzammil: 20). Istilah ini dipakai oleh Ulama Iraq (Hanafi & Hanbali), sedangkan 'Qiradh' dipakai Ulama Hijaz (Maliki & Syafi'i).",
          maknaIshthilahi: "Sinonim mutlak dari istilah Qiradh."
        }
      ],
      kaidahBahasa: "Perbedaan dialek regional: Ulama Madinah dan Hijaz menyebutnya 'Qiradh' (menitikberatkan pemotongan modal), ulama Kufah dan Iraq menyebutnya 'Mudharabah' (menitikberatkan mobilitas ikhtiar berniaga)."
    },

    analisisDalil: {
      dalilList: [
        {
          nashArab: "وَآخَرُونَ يَضْرِبُونَ فِي الْأَرْضِ يَبْتَغُونَ مِن فَضْلِ اللَّهِ",
          terjemah: "\"Dan orang-orang yang berjalan di muka bumi mencari sebagian karunia Allah.\" (QS. Al-Muzzammil: 20)",
          takhrij: "Al-Qur'anul Karim, Surah Al-Muzzammil: 20",
          derajatHadits: "Shahih",
          penilaiDerajat: "Ayat Muhkamah Al-Qur'an",
          wajhulDilalah: "Pemberian legitimasi syar'i bagi aktivitas safar mencari nafkah dan rezeki lewat sistem permodalan niaga."
        },
        {
          nashArab: "أَنَّ العَبَّاسَ بْنَ عَبْدِ المُطَّلِبِ كَانَ إِذَا دَفَعَ مَالًا مُضَارَبَةً اشْتَرَطَ عَلَى صَاحِبِهِ أَنْ لَا يَسْلُكَ بِهِ بَحْرًا... فَبَلَغَ شَرْطُهُ رَسُولَ اللَّهِ ﷺ فَأَجَازَهُ",
          terjemah: "\"Bahwasanya Al-Abbas bin Abdul Muththalib apabila menyerahkan harta secara mudharabah, ia mensyaratkan kepada pengelolanya agar tidak membawanya mengarungi laut, menuruni lembah bahaya... Syarat ini sampai kepada Rasulullah ﷺ dan beliau membenarkannya.\"",
          takhrij: "HR. Ath-Thabarani dalam Al-Awsath no. 3122, Al-Baihaqi dalam As-Sunan Al-Kubra 6/111",
          derajatHadits: "Hasan",
          penilaiDerajat: "Di-hasankan oleh Imam Al-Haitsami (Majma' Az-Zawa'id 4/161) dan Al-Albani (Irwa'ul Ghalil no. 1475)",
          wajhulDilalah: "Taqrir (persetujuan) Nabi ﷺ terhadap syarat perlindungan modal dalam mudharabah membuktikan keabsahan 'Mudharabah Muqayyadah' (investasi bersyarat aman)."
        }
      ],
      asbabulWurud: "Para sahabat di masa Jahiliyyah terbiasa saling bermitra dalam kafilah dagang ke Syam dan Yaman, lalu tradisi ini diakui dan disucikan dari unsur riba oleh syariat Islam."
    },

    perbandingan4Mazhab: {
      hanafi: {
        tokohUlama: "Imam As-Sarkhasi, Al-Kasani",
        kitabRujukan: "Al-Mabsuth 22/18, Bada'iush Shana'i' 6/79",
        halamanJilid: "Bada'iush Shana'i' 6/79",
        posisiHukum: "Modal mudharabah harus berupa uang kartal tunai (dinar/dirham/mata uang sah). Tidak sah bermodal barang dagangan kecuali dinilai harga pasar tunainya saat penyerahan. Bila rugi, kerugian modal murni ditanggung pemodal, pekerja rugi waktu dan tenaga.",
        dalilArgumentasi: "Kaidah 'Al-Ghurmu bil-ghunmi' dan 'Al-Kharaju bidh-dhaman'.",
        statusQaul: "Mu'tamad Mazhab Hanafi"
      },
      maliki: {
        tokohUlama: "Imam Malik bin Anas, Ibnu Rusyd",
        kitabRujukan: "Al-Mudawwanah 5/12, Bidayatul Mujtahid 2/235",
        halamanJilid: "Bidayatul Mujtahid 2/235",
        posisiHukum: "Syarat qiradh mutlak: modal harus diserahkan secara kontan penuh (taslim tamm) ke tangan mudharib. Pemilik modal tidak boleh ikut campur bekerja atau membatasi secara berlebihan sehingga mengunci fleksibilitas pasar.",
        dalilArgumentasi: "Karena qiradh adalah amanah kemandirian kerja, intervensi pemodal merusak hakikat kemitraan.",
        statusQaul: "Mu'tamad Mazhab Maliki"
      },
      syafii: {
        tokohUlama: "Imam Asy-Syafi'i, Imam Ar-Rafi'i",
        kitabRujukan: "Al-Umm 4/25, Al-Majmu' 14/358",
        halamanJilid: "Al-Majmu' 14/358",
        posisiHukum: "Nisbah laba wajib berupa persentase murni (misal: 60:40 atau 50:50). Haram mutlak menetapkan nominal laba pasti di awal (misal: 'Pemodal dapat laba tetap 5 juta per bulan') karena itu riba terselubung.",
        dalilArgumentasi: "Penetapan nominal keuntungan mengubah akad kemitraan menjadi pinjaman berbunga (qardhun jarra naf'an fahuwa riba).",
        statusQaul: "Qaul Jadid Muktamad"
      },
      hanbali: {
        tokohUlama: "Ibnu Qudamah, Ibnu Taimiyyah",
        kitabRujukan: "Al-Mughni 7/134, Kasysyaf Al-Qina' 3/498",
        halamanJilid: "Al-Mughni 7/134",
        posisiHukum: "Boleh mudharabah musytarakah (percampuran modal pengelola dan modal investor). Pemodal boleh menuntut jaminan kerugian hanya jika terbukti adanya ta'addi (pelanggaran SOP) atau tafrith (kelalaian nyata).",
        dalilArgumentasi: "Al-Muslimuna 'ala syuruthihim (Orang Islam terikat pada syarat-syarat yang mereka sepakati).",
        statusQaul: "Mu'tamad Mazhab Hanbali"
      }
    },

    analisisTarjih: {
      pendapatTerpilih: "Ijma' Ulama 4 Mazhab bahwa pembagian keuntungan WAJIB berupa nisbah proporsional (juz'un sya'i'un ma'lum) dan kerugian finansial modal ditanggung oleh Shahibul Mal, sedangkan kerugian pengelola adalah hilangnya jerih payah kerja.",
      alasanTarjih: "Setiap syarat yang membebankan kerugian modal kepada pengelola tanpa adanya kelalaian (tafrith) adalah bathil dan merusak akad mudharabah menjadi akad ribawi yang diharamkan syariat.",
      kaidahUshulFiqh: "الوَضِيعَةُ عَلَى المَالِ، وَالرِّبْحُ عَلَى مَا اصْطَلَحَا عَلَيْهِ (Kerugian modal ditanggung oleh harta pemodal, sedangkan keuntungan dibagi menurut kesepakatan keduanya).",
      ulamaMuhaqqiq: "Konsensus seluruh fuqaha mu'tabar (Ibnu Abdil Barr dalam At-Tamhid, Ibnu Qudamah dalam Al-Mughni, Majma' Al-Fiqh Al-Islami)."
    },

    faedahKontemporer: {
      studiKasusModern: "Aplikasi Akad Mudharabah pada Produk Deposito Perbankan Syariah, Securities Crowdfunding, dan Modal Ventura Startup.",
      konteksSainsTeknologi: "Model algoritma automated revenue sharing dan smart contracts blockchain dapat menjamin transparansi pencatatan omzet dan laba bersih secara real-time tanpa manipulasi.",
      fatwaLembagaDunia: "Fatwa DSN-MUI No. 07/DSN-MUI/IV/2000 tentang Pembiayaan Mudharabah (Qiradh) dan AAOIFI Shariah Standard No. 13: Bank Syariah bertindak sebagai Mudharib yang mengelola dana nasabah, laba dibagi dengan nisbah bulanan sesuai saldo rata-rata harian.",
      dhowabithAplikatif: "Bila pengelola usaha sengaja memanipulasi laporan keuangan atau melanggar batasan bisnis yang disepakati (misal: modal dialihkan ke spekulasi kripto ilegal), maka tangan amanah (yad amanah) berubah seketika menjadi tangan penjamin (yad dhaman), sehingga pengelola wajib mengganti seluruh modal 100%."
    }
  }
];

// ══════════════════════════════════════════════════════════════════
// FUNGSI GENERATOR EXPORT MARKDOWN LENGKAP UNTUK SANTRI / PENELITI
// ══════════════════════════════════════════════════════════════════
export function generateMarkdownSyarahPasal(syarah: SyarahPasalTemplate): string {
  return `# SYARAH PASAL ${syarah.nomorPasal}: ${syarah.judulPasal.toUpperCase()}
*Kitab: ${syarah.kitabNama} — Matan Bidayatul Mutafaqqih karya Syaikh Dr. Wahid bin Abdussalam Bali*

---

## 📌 MATAN & DHABITH FIQHI POKOK
**Lafazh Kaidah (Dhabith):**
> ${syarah.dhabithArab}
> *"${syarah.dhabithTerjemah}"*

**Teks Matan Asli:**
> ${syarah.matanArab}

**Terjemahan Matan:**
${syarah.matanTerjemah}

---

## 📖 I. MAKNA ETIMOLOGI & TERMINOLOGI (الدِّلَالَةُ اللُّغَوِيَّةُ وَالإِصْطِلَاحِيَّةُ)
${syarah.etimologiTerminologi.istilahUtama.map(item => `
### 🔹 ${item.lafalArab} (${item.transliterasi})
* **Makna Etimologi (Lughawi):**
  ${item.maknaLughawi}
* **Makna Terminologi (Ishthilahi Fuqaha):**
  ${item.maknaIshthilahi}
`).join('\n')}

**Kaidah Bahasa & Ushul:**
${syarah.etimologiTerminologi.kaidahBahasa}

---

## 📜 II. ANALISIS DALIL POKOK & TAKHRIJ HADITS (تَخْرِيجُ الأَحَادِيثِ وَوَجْهُ الدِّلَالَةِ)
${syarah.analisisDalil.dalilList.map((dalil, idx) => `
### Dalil Ke-${idx + 1}:
> ${dalil.nashArab}

*"${dalil.terjemah}"*

* **Takhrij Sumber:** ${dalil.takhrij}
* **Derajat Hadits:** \`[${dalil.derajatHadits}]\` — *Penahqiq: ${dalil.penilaiDerajat}*
* **Wajhul Dilalah (Sisi Pendalilan):** ${dalil.wajhulDilalah}
${dalil.syahidMutabaah ? `* **Syahid & Mutaba'ah:** ${dalil.syahidMutabaah}` : ''}
`).join('\n')}

${syarah.analisisDalil.asbabulWurud ? `**Asbabul Wurud / Latar Belakang Dalil:**\n${syarah.analisisDalil.asbabulWurud}\n` : ''}

---

## ⚖️ III. PERBANDINGAN PENDAPAT ULAMA 4 MAZHAB (الفِقْهُ المُقَارَنُ بَيْنَ المَذَاهِبِ الأَرْبَعَةِ)

| Mazhab | Tokoh Mu'tamad | Kitab Induk & Rujukan | Ringkasan Posisi Hukum | Status Qaul |
| :--- | :--- | :--- | :--- | :--- |
| **Hanafi** | ${syarah.perbandingan4Mazhab.hanafi.tokohUlama} | *${syarah.perbandingan4Mazhab.hanafi.kitabRujukan}* (${syarah.perbandingan4Mazhab.hanafi.halamanJilid}) | ${syarah.perbandingan4Mazhab.hanafi.posisiHukum} | \`${syarah.perbandingan4Mazhab.hanafi.statusQaul}\` |
| **Maliki** | ${syarah.perbandingan4Mazhab.maliki.tokohUlama} | *${syarah.perbandingan4Mazhab.maliki.kitabRujukan}* (${syarah.perbandingan4Mazhab.maliki.halamanJilid}) | ${syarah.perbandingan4Mazhab.maliki.posisiHukum} | \`${syarah.perbandingan4Mazhab.maliki.statusQaul}\` |
| **Syafi'i** | ${syarah.perbandingan4Mazhab.syafii.tokohUlama} | *${syarah.perbandingan4Mazhab.syafii.kitabRujukan}* (${syarah.perbandingan4Mazhab.syafii.halamanJilid}) | ${syarah.perbandingan4Mazhab.syafii.posisiHukum} | \`${syarah.perbandingan4Mazhab.syafii.statusQaul}\` |
| **Hanbali** | ${syarah.perbandingan4Mazhab.hanbali.tokohUlama} | *${syarah.perbandingan4Mazhab.hanbali.kitabRujukan}* (${syarah.perbandingan4Mazhab.hanbali.halamanJilid}) | ${syarah.perbandingan4Mazhab.hanbali.posisiHukum} | \`${syarah.perbandingan4Mazhab.hanbali.statusQaul}\` |

### Rincian Argumentasi Tiap Mazhab:
* **Mazhab Hanafi:** ${syarah.perbandingan4Mazhab.hanafi.dalilArgumentasi}
* **Mazhab Maliki:** ${syarah.perbandingan4Mazhab.maliki.dalilArgumentasi}
* **Mazhab Syafi'i:** ${syarah.perbandingan4Mazhab.syafii.dalilArgumentasi}
* **Mazhab Hanbali:** ${syarah.perbandingan4Mazhab.hanbali.dalilArgumentasi}

---

## 🎯 IV. ANALISIS WAJHUL ISTIDLAL & TARJIH (التَّرْجِيحُ وَتَحْرِيرُ مَحَلِّ النِّزَاعِ)
* **Pendapat Terpilih (Ar-Rajih):**
  ${syarah.analisisTarjih.pendapatTerpilih}

* **Landasan & Alasan Tarjih:**
  ${syarah.analisisTarjih.alasanTarjih}

* **Kaidah Ushul Fiqh yang Berlaku:**
  > \`${syarah.analisisTarjih.kaidahUshulFiqh}\`

* **Ulama Muhaqqiq Rujukan:**
  ${syarah.analisisTarjih.ulamaMuhaqqiq}

---

## 💡 V. FAEDAH KONTEMPORER & NAWAZIL MODERN (النَّوَازِلُ الفِقْهِيَّةُ وَالمَسَائِلُ المُعَاصِرَةُ)
* **Studi Kasus & Isu Kontemporer:**
  ${syarah.faedahKontemporer.studiKasusModern}

* **Relevansi Sains & Teknologi:**
  ${syarah.faedahKontemporer.konteksSainsTeknologi}

* **Fatwa Lembaga Dunia / Nasional:**
  ${syarah.faedahKontemporer.fatwaLembagaDunia}

* **Dhabith (Kaidah Patokan) Praktis:**
  ${syarah.faedahKontemporer.dhowabithAplikatif}

---
*Dihasilkan dari Modul Riset Syarah Bidayatul Mutafaqqih — Aplikasi Fiqh & Turats Islam Terpadu.*
`;
}

// ══════════════════════════════════════════════════════════════════
// TEMPLATE KOSONG BAKU (UNTUK PENELITIAN / TUGAS KULIAH SYARIAH)
// ══════════════════════════════════════════════════════════════════
export const blankMarkdownTemplate = `# TEMPLATE SISTEMATIKA SYARAH PASAL [NOMOR]
*Kitab Bidayatul Mutafaqqih karya Syaikh Dr. Wahid bin Abdussalam Bali*

## IDENTITAS PASAL
* **Kitab Induk:** [Isi Nama Kitab, misal: Kitab Thaharah / Shalat / Zakat]
* **Nomor & Judul Pasal:** Pasal [X] - [Isi Judul]
* **Dhabith (Kaidah Pokok):**
  * Teks Arab: [Isi Dhabith Arab]
  * Terjemah: [Isi Terjemah Kaidah]
* **Matan Asli:**
  * Teks Arab: [Isi Matan Arab]
  * Terjemah: [Isi Terjemah Matan]

---

## I. MAKNA ETIMOLOGI & TERMINOLOGI (الدِّلَالَةُ اللُّغَوِيَّةُ وَالإِصْطِلَاحِيَّةُ)
1. **Lafazh Kunci 1:**
   * Isytiqaq & Etimologi (Lisanul Arab / Mu'jam Maqayis): [Isi uraian bahasa]
   * Definisi Syar'i (Ishthilahi Fuqaha): [Isi definisi syar'i]
2. **Kaidah Bahasa:** [Isi kaidah ushul lughawi]

---

## II. ANALISIS DALIL & TAKHRIJ HADITS (تَخْرِيجُ الأَحَادِيثِ وَوَجْهُ الدِّلَالَةِ)
1. **Nash Dalil:** [Sertakan ayat atau hadits]
2. **Takhrij:** [Kitab, bab, nomor hadits]
3. **Derajat Sanad:** [Shahih / Hasan / Muttafaqun 'Alaih] berdasarkan [Nama Ulama Penahqiq]
4. **Wajhul Dilalah:** [Cara penarikan hukum dari lafazh dalil]

---

## III. PERBANDINGAN PENDAPAT 4 MAZHAB (الفِقْهُ المُقَارَنُ بَيْنَ المَذَاهِبِ)
* **1. Mazhab Hanafi (Al-Mabsuth / Raddul Muhtar):**
  * Pendapat: [Isi posisi hukum]
  * Dalil: [Isi hujjah]
* **2. Mazhab Maliki (Al-Mudawwanah / Bidayatul Mujtahid):**
  * Pendapat: [Isi posisi hukum]
  * Dalil: [Isi hujjah]
* **3. Mazhab Syafi'i (Al-Umm / Minhajut Thalibin):**
  * Pendapat: [Isi posisi hukum]
  * Dalil: [Isi hujjah]
* **4. Mazhab Hanbali (Al-Mughni / Manar As-Sabil / Umdatul Fiqh):**
  * Pendapat: [Isi posisi hukum]
  * Dalil: [Isi hujjah]

---

## IV. ANALISIS WAJHUL ISTIDLAL & TARJIH (التَّرْجِيحُ وَتَحْرِيرُ مَحَلِّ النِّزَاعِ)
* **Titik Sengketa (Mahallun Niza'):** [Jelaskan di mana perselisihannya]
* **Pendapat Terpilih (Ar-Rajih):** [Pilihan pendapat terkuat]
* **Alasan Tarjih & Kaidah Ushul:** [Kaidah ushul yang menguatkan]
* **Ulama Tarjih:** [Syaikh Wahid Bali / Ibnu Taimiyyah / Al-Albani]

---

## V. FAEDAH KONTEMPORER & NAWAZIL MODERN (النَّوَازِلُ الفِقْهِيَّةُ)
* **Kasus Kontemporer:** [Kasus modern saat ini]
* **Relevansi Sains/Medis/Finansial:** [Konteks modern]
* **Fatwa Lembaga Dunia:** [Fatwa MUI / Majma' Fiqh OKI / Darul Ifta]
* **Dhabith Praktis:** [Kaidah praktis untuk diamalkan]
`;
