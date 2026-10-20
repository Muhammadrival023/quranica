export interface MazhabCrossReference {
  mazhab: 'Syafi\'i' | 'Hanbali' | 'Maliki' | 'Hanafi' | 'Fiqh Hadits / Tarjih';
  kitabRujukan: string;
  penulis: string;
  halamanJilid: string;
  penjelasanHukum: string;
  dalilHujjah?: string;
  shamelaUrl?: string;
  statusQaul?: string;
}

export interface BidayahPassage {
  id: string;
  pasalNumber: number;
  subTitle: string;
  dhabitArab: string;
  dhabitTerjemah: string;
  matanArab: string;
  matanTerjemah: string;
  dalilNaqli: {
    teksArab: string;
    terjemah: string;
    sumber: string;
  }[];
  runutanFiqh: MazhabCrossReference[];
  faedahSantri?: string;
}

export interface BidayahKitab {
  id: string;
  titleArab: string;
  titleIndo: string;
  deskripsi: string;
  iconName: string;
  totalPasal: number;
  passages: BidayahPassage[];
}

export const bidayatulMutafaqqihBook: BidayahKitab[] = [
  // ==========================================
  // 1. KITAB ATH-THAHARAH (كِتَابُ الطَّهَارَةِ)
  // ==========================================
  {
    id: "thaharah",
    titleArab: "كِتَابُ الطَّهَارَةِ",
    titleIndo: "Kitab Thaharah (Bersuci)",
    deskripsi: "Pintu gerbang ibadah shalat yang membahas pembagian air, bejana, adab buang hajat, siwak, wudhu, khuffain, pembatal wudhu, mandi junub, tayamum, najis, dan haidh-nifas.",
    iconName: "Droplets",
    totalPasal: 5,
    passages: [
      {
        id: "th_01",
        pasalNumber: 1,
        subTitle: "Pembagian Jenis Air & Hukum Kesuciannya",
        dhabitArab: "الضَّابِطُ الأَوَّلُ: المِيَاهُ قِسْمَانِ: طَهُورٌ وَنَجِسٌ",
        dhabitTerjemah: "Kaidah Pokok Ke-1: Air terbagi menjadi dua bagian: Air Thahur (suci menyucikan) dan Air Najis.",
        matanArab: "المِيَاهُ قِسْمَانِ: طَهُورٌ: وَهُوَ البَاقِي عَلَى خِلْقَتِهِ، فَيَرْفَعُ الحَدَثَ وَيُزِيلُ الخَبَثَ. وَنَجِسٌ: وَهُوَ مَا تَغَيَّرَ بِنَجَاسَةٍ، أَوْ لَاقَاهَا وَهُوَ دُونَ القُلَّتَيْنِ.",
        matanTerjemah: "Air terbagi menjadi dua bagian: (1) Air Thahur: Yaitu air yang masih berada di atas sifat asli penciptaannya (seperti air hujan, air laut, air sungai, air sumur, salju, dan embun), maka ia dapat mengangkat hadats dan menghilangkan kotoran (najis). (2) Air Najis: Yaitu air yang berubah warna, rasa, atau aromanya karena tertimpa najis, atau air yang tertimpa najis dalam jumlah kurang dari dua qullah (meskipun tidak berubah).",
        dalilNaqli: [
          {
            teksArab: "وَأَنزَلْنَا مِنَ السَّمَاءِ مَاءً طَهُورًا",
            terjemah: "\"Dan Kami turunkan dari langit air yang amat suci (thahur).\" (QS. Al-Furqan: 48)",
            sumber: "QS. Al-Furqan: 48"
          },
          {
            teksArab: "هُوَ الطَّهُورُ مَاؤُهُ الحِلُّ مَيْتَتُهُ",
            terjemah: "\"Laut itu suci airnya dan halal bangkainya.\" (HR. Abu Dawud, At-Tirmidzi, Ibnu Majah; Shahih)",
            sumber: "HR. Abu Dawud no. 83, Shahih"
          },
          {
            teksArab: "إِذَا كَانَ المَاءُ قُلَّتَيْنِ لَمْ يَحْمِلِ الخَبَثَ",
            terjemah: "\"Jika air telah mencapai dua qullah, maka ia tidak membawa kotoran (najis).\" (HR. Lima Imam Hadits)",
            sumber: "HR. At-Tirmidzi no. 67, Hasan Shahih"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Al-Umm & Minhajut Thalibin",
            penulis: "Imam Asy-Syafi'i & Imam An-Nawawi",
            halamanJilid: "Al-Umm 1/15, Minhajut Thalibin 1/12",
            statusQaul: "Qaul Jadid Muktamad",
            penjelasanHukum: "Mazhab Syafi'i membagi air menjadi 4 kategori: Thahur (suci menyucikan tidak makruh), Makruh (air musyammas/terkena panas matahari dalam bejana logam berkarat), Thahir Ghairu Muthahhir (air suci tapi tidak menyucikan: air musta'mal & air tercampur zat suci hingga berubah nama), dan Mutanajjis (air najis kurang dari 2 qullah terkena najis meski tidak berubah, atau air banyak yang berubah rasa/warna/baunya).",
            shamelaUrl: "https://shamela.ws/book/11812/15"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/11, Al-Mughni 1/18",
            statusQaul: "Riwayat Mu'tamad",
            penjelasanHukum: "Dalam mazhab Hanbali (Manar As-Sabil): Air terbagi menjadi 3 jenis: Thahur, Thahir, dan Najis. Syaikh Wahid Bali dalam Bidayatul Mutafaqqih memilih tarjih Ibnu Taimiyyah dan Ibnul Qayyim (2 kategori: Thahur dan Najis) karena tidak ada dalil shahih yang membatalkan kesucian air musta'mal selama tidak bernajis. Ukuran dua qullah diestimasi setara kurang lebih 216 liter (atau bak 60x60x60 cm).",
            shamelaUrl: "https://shamela.ws/book/11568/11"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Al-Mudawwanah & Bidayatul Mujtahid",
            penulis: "Imam Malik & Ibnu Rusyd Al-Qurthubi",
            halamanJilid: "Al-Mudawwanah 1/5, Bidayatul Mujtahid 1/24",
            statusQaul: "Madzhab Ahlul Madinah",
            penjelasanHukum: "Mazhab Maliki berpendapat bahwa air pada asalnya hanya Thahur dan Najis. Air sedikit (kurang dari dua qullah) yang kemasukan najis tetapi tidak mengalami perubahan bau, rasa, maupun warna hukumnya tetap SUCI menyucikan, berpegang pada hadits sumur Budha'ah: 'Innal ma'a thahurun la yunajjisuhu syai''.",
            shamelaUrl: "https://shamela.ws/book/21741/24"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Mabsuth & Raddul Muhtar (Ibnu Abidin)",
            penulis: "Imam As-Sarakhsi & Ibnu Abidin",
            halamanJilid: "Al-Mabsuth 1/45, Raddul Muhtar 1/180",
            statusQaul: "Qaul Ash-Shadrul Awwal",
            penjelasanHukum: "Mazhab Hanafi tidak memakai takaran dua qullah hadits Ibnu Umar, melainkan memakai tolak ukur 'Maa' Katsir' berupa telaga/kolam yang berukuran sepuluh kali sepuluh hasta (Asyrah fi Asyrah). Jika satu sisi digerakkan dan sisi seberangnya tidak bergoyang, maka air dianggap banyak dan tidak najis kecuali ada perubahan fisik.",
            shamelaUrl: "https://shamela.ws/book/21738/45"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Subulus Salam & Nailul Authar",
            penulis: "Ash-Shan'ani & Asy-Syaukani",
            halamanJilid: "Subulus Salam 1/22, Nailul Authar 1/35",
            statusQaul: "Tahqiq Hadits Sunnah",
            penjelasanHukum: "Tarjih ulama hadits menegaskan: Batasan dua qullah (sekitar 500 rithl Baghdad / 192 - 216 liter) adalah dalil mafhum mukhalafah yang kuat. Air yang kurang dari dua qullah rawan terkontaminasi najis mikroskopis, sehingga kehati-hatian menjaganya dari najis adalah tuntunan Rasulullah SAW.",
            shamelaUrl: "https://shamela.ws/book/21743/22"
          }
        ],
        faedahSantri: "Ukuran 2 Qullah: 500 Rithl Baghdad = ± 216 Liter air murni. Apabila ragu kesucian air, kaidah fiqh berlaku: 'Al-Ashlu fil maa'i ath-thaharah' (Asal dari air adalah suci hingga terbukti ada najis yang mengubahnya)."
      },
      {
        id: "th_02",
        pasalNumber: 2,
        subTitle: "Fardhu-Fardhu (Rukun) Wudhu Menurut Sunnah",
        dhabitArab: "الضَّابِطُ الثَّانِي: فُرُوضُ الوُضُوءِ سِتَّةٌ",
        dhabitTerjemah: "Kaidah Pokok Ke-2: Fardhu (rukun wajib) wudhu ada enam perkara.",
        matanArab: "فُرُوضُ الوُضُوءِ سِتَّةٌ: (١) غَسْلُ الوَجْهِ وَمِنْهُ المَضْمَضَةُ وَالاِسْتِنْشَاقُ، (٢) غَسْلُ اليَدَيْنِ مَعَ المِرْفَقَيْنِ، (٣) مَسْحُ جَمِيعِ الرَّأْسِ وَمِنْهُ الأُذُنَانِ، (٤) غَسْلُ الرِّجْلَيْنِ مَعَ الكَعْبَيْنِ، (٥) التَّرْتِيبُ، (٦) المُوَالَاةُ.",
        matanTerjemah: "Fardhu wudhu ada enam: (1) Membasuh wajah, termasuk di dalamnya berkumur-kumur (madhmadhoh) dan menghirup air ke hidung (istinsyaq), (2) Membasuh kedua tangan sampai ke kedua siku, (3) Mengusap seluruh kepala, dan termasuk bagian kepala adalah kedua telinga, (4) Membasuh kedua kaki sampai ke kedua mata kaki, (5) Tertib (berurutan sesuai ayat Al-Qur'an), dan (6) Muwalah (bersambung terus-menerus tanpa jeda yang membuat anggota sebelumnya kering).",
        dalilNaqli: [
          {
            teksArab: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ",
            terjemah: "\"Wahai orang-orang yang beriman! Apabila kamu hendak melaksanakan shalat, maka basuhlah wajahmu dan tanganmu sampai ke siku, dan usaplah kepalamu dan (basuh) kedua kakimu sampai ke kedua mata kaki.\" (QS. Al-Ma'idah: 6)",
            sumber: "QS. Al-Ma'idah: 6"
          },
          {
            teksArab: "الأُذُنَانِ مِنَ الرَّأْسِ",
            terjemah: "\"Kedua telinga itu termasuk bagian dari kepala.\" (HR. Ibnu Majah no. 443, Shahih)",
            sumber: "HR. Ibnu Majah, At-Tirmidzi, Shahih"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Fathul Qarib & Minhajut Thalibin",
            penulis: "Ibnu Qasim Al-Ghazi & Imam An-Nawawi",
            halamanJilid: "Fathul Qarib hal. 7, Minhajut Thalibin 1/14",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Rukun wudhu dalam mazhab Syafi'i ada 6: (1) Niat saat membasuh wajah pertama kali, (2) Membasuh wajah, (3) Membasuh tangan hingga siku, (4) Mengusap sebagian kecil kepala (bahkan sehelai rambut yang ada di batas kepala), (5) Membasuh kaki hingga mata kaki, (6) Tertib. Adapun berkumur, istinsyaq, telinga, dan muwalah dihukumi sunnah muakkadah.",
            shamelaUrl: "https://shamela.ws/book/11425/7"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Zaad Al-Mustaqni'",
            penulis: "Ibnu Duwayyan & Al-Hajjawi",
            halamanJilid: "Manar As-Sabil 1/21, Zaad Al-Mustaqni' 1/8",
            statusQaul: "Pendapat yang diambil Bidayatul Mutafaqqih",
            penjelasanHukum: "Mazhab Hanbali mewajibkan mengusap SELURUH kepala (bukan sebagian), mewajibkan berkumur dan istinsyaq sebagai bagian dari wajah, memasukkan kedua telinga sebagai fardhu kepala, serta mewajibkan Muwalah (tidak menunda hingga anggota sebelumnya mengering). Niat adalah syarat sah sebelum memulai.",
            shamelaUrl: "https://shamela.ws/book/11568/21"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Risalah Al-Qairawani",
            penulis: "Khalil bin Ishaq & Ibnu Abi Zaid",
            halamanJilid: "Mukhtashar Khalil hal. 14, Risalah Qairawani hal. 22",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Fardhu wudhu dalam mazhab Maliki ada 7: Niat, membasuh wajah, membasuh tangan ke siku, mengusap seluruh kepala, membasuh kaki ke mata kaki, Muwalah (Al-Faur), dan Ad-Dalk (menggosok anggota wudhu dengan telapak tangan, bukan sekadar mengguyur air).",
            shamelaUrl: "https://shamela.ws/book/11575/14"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Mukhtashar Al-Quduri & Al-Hidayah",
            penulis: "Al-Quduri & Al-Marghinani",
            halamanJilid: "Mukhtashar Al-Quduri hal. 5, Al-Hidayah 1/13",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Fardhu wudhu murni hanya 4 perkara yang termaktub tegas dalam ayat QS. Al-Ma'idah: 6: membasuh wajah, membasuh kedua tangan sampai siku, mengusap seperempat kepala (miqdar rub'ir ra's), dan membasuh kaki. Niat, tertib, dan muwalah adalah sunnah menurut Hanafi karena ayat tidak menyebutkan syarat tersebut secara sharih.",
            shamelaUrl: "https://shamela.ws/book/11572/5"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Nailul Authar & Subulus Salam",
            penulis: "Asy-Syaukani & Ash-Shan'ani",
            halamanJilid: "Nailul Authar 1/142, Subulus Salam 1/65",
            statusQaul: "Tarjih Dalil Hadits",
            penjelasanHukum: "Hadits riwayat Humran maula Utsman bin Affan menjelaskan tata cara wudhu Nabi SAW secara tertib dan bersambung, membuktikan bahwa praktik amaliyah Rasulullah SAW senantiasa menjaga tertib dan muwalah tanpa pernah meninggalkannya.",
            shamelaUrl: "https://shamela.ws/book/21744/142"
          }
        ],
        faedahSantri: "Perbedaan pendapat mengenai 'Mengusap Kepala': Syafi'i (cukup sebagian/sehelai rambut), Hanafi (seperempat kepala), Maliki & Hanbali (seluruh kepala). Yang paling berhati-hati dan sempurna mengikuti sunnah adalah mengusap seluruh kepala dari depan ke tengkuk lalu kembali ke depan."
      },
      {
        id: "th_03",
        pasalNumber: 3,
        subTitle: "Pembatal-Pembatal Wudhu (Nawaqidh Al-Wudhu)",
        dhabitArab: "الضَّابِطُ الثَّالِثُ: نَوَاقِضُ الوُضُوءِ سَبْعَةٌ",
        dhabitTerjemah: "Kaidah Pokok Ke-3: Pembatal-pembatal wudhu ada tujuh perkara.",
        matanArab: "نَوَاقِضُ الوُضُوءِ: (١) الخَارِجُ مِنَ السَّبِيلَيْنِ، (٢) زَوَالُ العَقْلِ بِنَوْمٍ أَوْ غَيْرِهِ إِلَّا النَّوْمَ اليَسِيرَ قَاعِدًا أَوْ قَائِمًا، (٣) مَسُّ فَرْجِ الآدَمِيِّ بِلَا حَائِلٍ، (٤) أَكْلُ لَحْمِ الإِبِلِ، (٥) الرِّدَّةُ عَنِ الإِسْلَامِ، (٦) كُلُّ مَا أَوْجَبَ الغُسْلَ أَوْجَبَ الوُضُوءَ غَيْرَ المَوْتِ، (٧) خُرُوجُ الدَّمِ وَالقَيْءِ الكَثِيرِ عِنْدَ جَمَاعَةٍ مِنَ الفُقَهَاءِ.",
        matanTerjemah: "Pembatal wudhu meliputi: (1) Keluarnya sesuatu dari dua jalan (qubul dan dubur, berupa kencing, tinja, angin, mani, madzi, wadi), (2) Hilang akal karena gila, pingsan, mabuk, atau tidur lelap (kecuali tidur ringan dalam posisi duduk tegak), (3) Menyentuh kemaluan manusia dengan telapak tangan tanpa pembatas, (4) Memakan daging unta (lahmul ibil), (5) Murtad keluar dari Islam, (6) Segala hal yang mewajibkan mandi wajib otomatis membatalkan wudhu selain kematian, (7) Darah atau muntah yang keluar banyak menurut sebagian ulama.",
        dalilNaqli: [
          {
            teksArab: "أَوْ جَاءَ أَحَدٌ مِّنكُم مِّنَ الْغَائِطِ",
            terjemah: "\"Atau kembali dari tempat buang air (kakus)...\" (QS. Al-Ma'idah: 6)",
            sumber: "QS. Al-Ma'idah: 6"
          },
          {
            teksArab: "مَنْ مَسَّ ذَكَرَهُ فَلْيَتَوَضَّأْ",
            terjemah: "\"Barangsiapa menyentuh kemaluannya, maka hendaklah ia berwudhu.\" (HR. Abu Dawud, At-Tirmidzi, Shahih)",
            sumber: "HR. Abu Dawud no. 181, Shahih"
          },
          {
            teksArab: "تَوَضَّئُوا مِنْ لُحُومِ الإِبِلِ وَلَا تَتَوَضَّئُوا مِنْ لُحُومِ الغَنَمِ",
            terjemah: "\"Berwudhulah kalian karena memakan daging unta, dan janganlah berwudhu karena memakan daging kambing.\" (HR. Muslim)",
            sumber: "HR. Muslim no. 360"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Al-Majmu' & Matan Abi Syuja'",
            penulis: "Imam An-Nawawi & Al-Qadhi Abu Syuja'",
            halamanJilid: "Al-Majmu' 2/25, Taqrib hal. 9",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Mazhab Syafi'i menetapkan 5 pembatal wudhu: (1) Keluar sesuatu dari jalan dua, (2) Hilang akal selain tidur duduk menetap di lantai, (3) Bersentuhan kulit laki-laki dan perempuan ajnabi (bukan mahram) tanpa penghalang tanpa memandang syahwat atau tidak, (4) Menyentuh kemaluan anak adam dengan bathin telapak tangan, (5) Menyentuh lingkaran dubur. Syafi'i berpendapat makan daging unta tidak membatalkan wudhu (mentakwil hadits dengan mencuci tangan).",
            shamelaUrl: "https://shamela.ws/book/21735/225"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/29, Al-Mughni 1/130",
            statusQaul: "Pendapat Kuat Berdalil",
            penjelasanHukum: "Mazhab Hanbali mewajibkan wudhu setelah makan daging unta secara tegas berdasarkan hadits shahih Muslim no. 360 (Jabir bin Samurah). Sentuhan lawan jenis hanya membatalkan bila diiringi syahwat. Mengangkat/memandikan jenazah disunnahkan berwudhu.",
            shamelaUrl: "https://shamela.ws/book/11568/29"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Mabsuth & Bada'i' Ash-Sana'i'",
            penulis: "As-Sarakhsi & Al-Kasani",
            halamanJilid: "Al-Mabsuth 1/65, Bada'i' 1/24",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Mazhab Hanafi berpendapat menyentuh kemaluan dan bersentuhan kulit perempuan TIDAK membatalkan wudhu (berdalil hadits Thalaq bin Ali: 'Innama huwa bidh'atun minka'). Sebaliknya, keluar darah mengalir dari luka dan muntah sepenuh mulut MEMBATALKAN wudhu menurut Hanafi.",
            shamelaUrl: "https://shamela.ws/book/21738/65"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Bidayatul Mujtahid & Mukhtashar Khalil",
            penulis: "Ibnu Rusyd & Syaikh Khalil",
            halamanJilid: "Bidayatul Mujtahid 1/48, Khalil hal. 17",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Sentuhan kulit dengan wanita hanya membatalkan jika berniat mencari kelezatan (taladz-dzudz) atau menemukannya. Menyentuh kemaluan hanya membatalkan laki-laki bila menyentuh zakarnya secara langsung.",
            shamelaUrl: "https://shamela.ws/book/21741/48"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Nailul Authar",
            penulis: "Imam Asy-Syaukani",
            halamanJilid: "Nailul Authar 1/210",
            statusQaul: "Tarjih Ash-Shahih",
            penjelasanHukum: "Hadits Busrah binti Shafwan tentang menyentuh kemaluan adalah shahih dan lebih akhir periwayatannya dibanding hadits Thalaq bin Ali, sehingga menyentuh kemaluan membatalkan wudhu. Adapun bersentuhan kulit biasa tanpa syahwat tidak membatalkan sebagaimana hadits Aisyah RA di mana kaki beliau tersentuh Nabi SAW saat shalat malam.",
            shamelaUrl: "https://shamela.ws/book/21744/210"
          }
        ],
        faedahSantri: "Masalah Makan Daging Unta: Mazhab Ahmad (batal), Mazhab Tiga (Syafi'i, Maliki, Hanafi: tidak batal). Pendapat yang paling kuat dalilnya adalah mazhab Hanbali karena haditsnya shahih sharih tanpa penentang yang sepadan."
      },
      {
        id: "th_04",
        pasalNumber: 4,
        subTitle: "Mandi Wajib (Al-Ghusl): Sebab & Rukunnya",
        dhabitArab: "الضَّابِطُ الرَّابِعُ: مُوجِبَاتُ الغُسْلِ سِتَّةٌ، وَفُرُوضُهُ اثْنَانِ",
        dhabitTerjemah: "Kaidah Pokok Ke-4: Penyebab mandi wajib ada enam, dan rukun mandi wajib ada dua.",
        matanArab: "مُوجِبَاتُ الغُسْلِ: (١) خُرُوجُ المَنِيِّ دَفْقًا بِلَذَّةٍ، (٢) التِقَاءُ الخِتَانَيْنِ (تَغْيِيبُ الحَشَفَةِ)، (٣) انْقِطَاعُ دَمِ الحَيْضِ، (٤) انْقِطَاعُ دَمِ النِّفَاسِ، (٥) المَوْتُ غَيْرَ الشَّهِيدِ، (٦) دُخُولُ الكَافِرِ فِي الإِسْلَامِ. وَفُرُوضُ الغُسْلِ: النِّيَّةُ، وَتَعْمِيمُ البَدَنِ كُلِّهِ بِالمَاءِ مَعَ المَضْمَضَةِ وَالاِسْتِنْشَاقِ.",
        matanTerjemah: "Hal-hal yang mewajibkan mandi ada enam: (1) Keluarnya air mani memancar disertai syahwat (atau saat bangun tidur walau tanpa terasa memancar), (2) Bertemunya dua kemaluan (tenggelamnya hasyafah ke dalam farji walau tanpa keluar mani), (3) Berhentinya darah haidh, (4) Berhentinya darah nifas, (5) Kematian (selain syahid di medan perang), (6) Masuk Islamnya orang kafir. Sedangkan rukun fardhu mandi wajib ada dua: Niat mengangkat janabah/hadas besar, dan meratakan air ke seluruh permukaan tubuh dan rambut, disertai berkumur dan menghirup air.",
        dalilNaqli: [
          {
            teksArab: "وَإِن كُنتُمْ جُنُبًا فَاطَّهَّرُوا",
            terjemah: "\"Dan jika kamu junub, maka bersucilah (mandilah).\" (QS. Al-Ma'idah: 6)",
            sumber: "QS. Al-Ma'idah: 6"
          },
          {
            teksArab: "إِذَا جَلَسَ بَيْنَ شُعَبِهَا الأَرْبَعِ ثُمَّ مَسَّ الخِتَانُ الخِتَانَ فَقَدْ وَجَبَ الغُسْلُ",
            terjemah: "\"Apabila seorang suami duduk di antara empat anggota badan istrinya lalu khitan bertemu khitan, maka sungguh wajib mandi (meskipun belum keluar mani).\" (HR. Muslim no. 349)",
            sumber: "HR. Muslim no. 349"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Fathul Qarib & Al-Majmu'",
            penulis: "Ibnu Qasim Al-Ghazi & Imam Nawawi",
            halamanJilid: "Fathul Qarib hal. 11, Al-Majmu' 2/155",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Fardhu mandi dalam mazhab Syafi'i ada 2: (1) Niat saat air pertama mengenai badan, (2) Meratakan air ke seluruh rambut (lahir dan batin hingga pangkal) dan seluruh kulit tubuh tanpa terkecuali. Berkumur dan istinsyaq hukumnya sunnah muakkadah.",
            shamelaUrl: "https://shamela.ws/book/11425/11"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/36, Al-Mughni 1/190",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Mazhab Hanbali mewajibkan berkumur dan istinsyaq di dalam mandi wajib karena mulut dan hidung termasuk bagian tubuh luar yang harus disucikan. Masuk Islamnya orang kafir wajib mandi.",
            shamelaUrl: "https://shamela.ws/book/11568/36"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Al-Mudawwanah & Mukhtashar Khalil",
            penulis: "Imam Malik & Syaikh Khalil",
            halamanJilid: "Mukhtashar Khalil hal. 20",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Fardhu mandi ada 5: Niat, meratakan air, ad-dalk (menggosok badan dengan tangan), muwalah (bersambung), dan menyela-nyela rambut kepala. Bila tidak digosok tangan, mandi belum sah menurut Malik.",
            shamelaUrl: "https://shamela.ws/book/11575/20"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/17, Raddul Muhtar 1/150",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Fardhu mandi menurut Hanafi ada 3: Berkumur-kumur secara merata, istinsyaq (menghirup air ke hidung), dan membasuh seluruh sisa badan.",
            shamelaUrl: "https://shamela.ws/book/11571/17"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Subulus Salam & Fiqhus Sunnah",
            penulis: "Ash-Shan'ani & Sayyid Sabiq",
            halamanJilid: "Subulus Salam 1/95, Fiqhus Sunnah 1/68",
            statusQaul: "Sifat Ghusl Nabawi",
            penjelasanHukum: "Hadits Ummul Mukminin Aisyah dan Maimunah radhiyallahu 'anhuma merinci sunnah mandi Nabi SAW: mencuci tangan 3x, membersihkan kemaluan, berwudhu sempurna seperti wudhu shalat, menyela rambut dengan air 3x gayung ke kepala, lalu mengguyur seluruh badan dimulai dari sisi kanan.",
            shamelaUrl: "https://shamela.ws/book/21743/95"
          }
        ],
        faedahSantri: "Kaidah Mandi: Mandi wajib telah mencakup hadats kecil. Jika seseorang mandi junub dengan niat mengangkat hadats besar, ia tidak wajib mengulang wudhu lagi untuk shalat selama tidak menyentuh kemaluan atau buang angin."
      },
      {
        id: "th_05",
        pasalNumber: 5,
        subTitle: "Najis & Cara Mensucikannya (Mughalladhah, Mukhaffafah, Mutawassithah)",
        dhabitArab: "الضَّابِطُ الخَامِسُ: النَّجَاسَاتُ ثَلَاثَةُ أَنْوَاعٍ: مُغَلَّظَةٌ، وَمُخَفَّفَةٌ، وَمُتَوَسِّطَةٌ",
        dhabitTerjemah: "Kaidah Pokok Ke-5: Najis terbagi menjadi tiga tingkatan: Mughalladhah (berat), Mukhaffafah (ringan), dan Mutawassithah (sedang).",
        matanArab: "النَّجَاسَاتُ: مُغَلَّظَةٌ: نَجَاسَةُ الكَلْبِ وَالخِنْزِيرِ، وَتُطَهَّرُ بِغَسْلِهَا سَبْعَ مَرَّاتٍ إِحْدَاهُنَّ بِالتُّرَابِ. مُخَفَّفَةٌ: بَوْلُ الصَّبِيِّ الَّذِي لَمْ يَطْعَمْ غَيْرَ اللَّبَنِ، وَيُطَهَّرُ بِالنَّضْحِ. مُتَوَسِّطَةٌ: سَائِرُ النَّجَاسَاتِ (كَالبَوْلِ وَالغَائِطِ وَالدَّمِ)، وَتُطَهَّرُ بِزَوَالِ عَيْنِهَا وَأَثَرِهَا بِالمَاءِ.",
        matanTerjemah: "Tingkatan najis: (1) Mughalladhah: Najis anjing dan babi, cara mensucikannya dengan dibasuh 7 kali dan salah satunya dicampur dengan tanah suci. (2) Mukhaffafah: Air kencing bayi laki-laki yang belum memakan makanan selain ASI, cukup disucikan dengan memercikkan air hingga merata tanpa harus dialirkan/diperas. (3) Mutawassithah: Najis lainnya (air kencing manusia, kotoran, darah, nanah, bangkai), disucikan dengan mencuci hingga hilang warna, bau, dan rasanya.",
        dalilNaqli: [
          {
            teksArab: "طَهُورُ إِنَاءِ أَحَدِكُمْ إِذَا وَلَغَ فِيهِ الكَلْبُ أَنْ يَغْسِلَهُ سَبْعَ مَرَّاتٍ أُولَاهُنَّ بِالتُّرَابِ",
            terjemah: "\"Sucinya bejana salah seorang di antara kalian jika dijilat anjing adalah dengan membasuhnya tujuh kali, yang pertamanya dicampur dengan tanah.\" (HR. Muslim no. 279)",
            sumber: "HR. Muslim no. 279"
          },
          {
            teksArab: "يُرَشُّ مِنْ بَوْلِ الغُلَامِ وَيُغْسَلُ مِنْ بَوْلِ الجَارِيَةِ",
            terjemah: "\"Dicipratkan (air) dari kencing bayi laki-laki dan dicuci dari kencing bayi perempuan.\" (HR. Abu Dawud, An-Nasa'i, Shahih)",
            sumber: "HR. Abu Dawud no. 377, Shahih"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Kifayatul Akhyar",
            penulis: "Imam An-Nawawi & Imam Al-Hishni",
            halamanJilid: "Kifayatul Akhyar hal. 42, Minhaj 1/19",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Mazhab Syafi'i menyamakan babi dengan anjing dalam hal wajib dibasuh 7 kali dengan tanah (qiyas aulawi karena babi lebih buruk daripada anjing). Najis 'Ainiyyah harus dihilangkan sifat warna, rasa, dan baunya. Jika warna atau bau sukar hilang setelah digosok maksimal, maka dimaafkan (ma'fu).",
            shamelaUrl: "https://shamela.ws/book/11426/42"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/45, Al-Mughni 1/85",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Mazhab Hanbali mewajibkan 7 basuhan untuk najis anjing. Untuk najis lainnya, dalam riwayat madzhab masyhur dianjurkan 7 kali basuhan, namun qaul rajih cukup sampai hilang 'ain najisnya.",
            shamelaUrl: "https://shamela.ws/book/11568/45"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Bidayatul Mujtahid & Al-Mudawwanah",
            penulis: "Ibnu Rusyd & Imam Malik",
            halamanJilid: "Bidayatul Mujtahid 1/65",
            statusQaul: "Pandangan Imam Malik",
            penjelasanHukum: "Imam Malik berpendapat anjing itu suci zatnya, dan perintah membasuh 7 kali pada jilatan anjing adalah ibadah ta'abbudi (bukan karena anjing najis 'ain).",
            shamelaUrl: "https://shamela.ws/book/21741/65"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Raddul Muhtar & Al-Mabsuth",
            penulis: "Ibnu Abidin & As-Sarakhsi",
            halamanJilid: "Raddul Muhtar 1/290",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Mazhab Hanafi tidak mensyaratkan 7 kali dan debu untuk selain jilatan bejana, melainkan cukup dibasuh sampai suci dan bersih menurut keyakinan (ghalabatuzh zhann).",
            shamelaUrl: "https://shamela.ws/book/21739/290"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Nailul Authar & Al-Fiqh Al-Islami",
            penulis: "Asy-Syaukani & Wahbah Az-Zuhaili",
            halamanJilid: "Nailul Authar 1/78, Zuhaili 1/310",
            statusQaul: "Kajian Komparatif Modern",
            penjelasanHukum: "Riset medis modern membuktikan air liur anjing mengandung telur cacing pita (Echinococcus granulosus) yang partikelnya hanya dapat diserap dan dibersihkan secara steril oleh partikel lumpur debu (tanah) melalui daya serap ioniknya.",
            shamelaUrl: "https://shamela.ws/book/21744/78"
          }
        ],
        faedahSantri: "Kencing Bayi Laki-laki: Hanya diringankan (cukup diciprati air) jika memenuhi 2 syarat: (1) Berjenis kelamin laki-laki, (2) Belum mengonsumsi makanan/minuman selain ASI sebagai asupan utama."
      }
    ]
  },

  // ==========================================
  // 2. KITAB ASH-SHALAH (كِتَابُ الصَّلَاةِ)
  // ==========================================
  {
    id: "shalah",
    titleArab: "كِتَابُ الصَّلَاةِ",
    titleIndo: "Kitab Shalat (Tiang Agama)",
    deskripsi: "Rukun Islam kedua yang menjadi pembeda antara mukmin dan kekafiran, memuat syarat sah shalat, rukun shalat, wajib shalat, sunnah haiat dan ab'adh, sujud sahwi, dan shalat berjamaah.",
    iconName: "Compass",
    totalPasal: 4,
    passages: [
      {
        id: "sh_01",
        pasalNumber: 1,
        subTitle: "Syarat-Syarat Sah Shalat (Syuruth Ash-Shalah)",
        dhabitArab: "الضَّابِطُ الأَوَّلُ: شُرُوطُ الصَّلَاةِ تِسْعَةٌ",
        dhabitTerjemah: "Kaidah Pokok Ke-1: Syarat sah shalat ada sembilan perkara.",
        matanArab: "شُرُوطُ الصَّلَاةِ: (١) الإِسْلَامُ، (٢) العَقْلُ، (٣) التَّمْيِيزُ، (٤) رَفْعُ الحَدَثِ، (٥) إِزَالَةُ النَّجَاسَةِ عَنِ الثَّوْبِ وَالبَدَنِ وَالمَكَانِ، (٦) سَتْرُ العَوْرَةِ، (٧) دُخُولُ الوَقْتِ، (٨) اسْتِقْبَالُ القِبْلَةِ، (٩) النِّيَّةُ.",
        matanTerjemah: "Syarat-syarat shalat ada sembilan: (1) Islam, (2) Berakal sehat, (3) Tamyiz (mampu membedakan hal baik dan buruk, sekitar usia 7 tahun), (4) Suci dari hadats kecil dan besar, (5) Suci badan, pakaian, dan tempat shalat dari najis yang tidak dimaafkan, (6) Menutup aurat dengan pakaian yang tidak transparan, (7) Telah masuk waktu shalat secara yakin atau dugaan kuat, (8) Menghadap kiblat (Ka'bah Al-Musyarrafah), dan (9) Niat shalat.",
        dalilNaqli: [
          {
            teksArab: "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا",
            terjemah: "\"Sungguh, shalat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman.\" (QS. An-Nisa': 103)",
            sumber: "QS. An-Nisa': 103"
          },
          {
            teksArab: "فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ",
            terjemah: "\"Maka hadapkanlah wajahmu ke arah Masjidil Haram.\" (QS. Al-Baqarah: 144)",
            sumber: "QS. Al-Baqarah: 144"
          },
          {
            teksArab: "لَا يَقْبَلُ اللَّهُ صَلَاةَ أَحَدِكُمْ إِذَا أَحْدَثَ حَتَّى يَتَوَضَّأَ",
            terjemah: "\"Allah tidak menerima shalat salah seorang di antara kalian apabila ia berhadats hingga ia berwudhu.\" (HR. Al-Bukhari no. 135)",
            sumber: "HR. Bukhari no. 135 & Muslim no. 225"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Fathul Qarib hal. 14, Minhaj 1/26",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Dalam Syafi'i, niat dimasukkan ke dalam RUKUN shalat (bukan sekadar syarat), karena niat harus menyertai (muqaranah) takbiratul ihram secara langsung di dalam hati. Aurat laki-laki adalah antara pusar dan lutut, sedangkan aurat wanita merdeka dalam shalat adalah seluruh badan kecuali wajah dan kedua telapak tangan (lahir dan batin).",
            shamelaUrl: "https://shamela.ws/book/11559/26"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Zaad Al-Mustaqni'",
            penulis: "Ibnu Duwayyan & Al-Hajjawi",
            halamanJilid: "Manar As-Sabil 1/53, Zaad 1/15",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Niat diklasifikasikan sebagai syarat sah yang boleh mendahului takbiratul ihram dalam rentang waktu yang dekat selama tidak dibatalkan. Laki-laki wajib menutup aurat antara pusar dan lutut ditambah menutup kedua pundak bila mampu (berdasarkan hadits Abu Hurairah: 'La yushalliyanna ahadukum fi tsaubin wahidin laisa 'ala 'atiqayhi syai'').",
            shamelaUrl: "https://shamela.ws/book/11568/53"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/43, Raddul Muhtar 1/402",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Mazhab Hanafi berpendapat kedua telapak kaki wanita (bagian punggung dan telapaknya) bukan aurat dalam shalat menurut qaul yang dipilih oleh Al-Marghinani dan Abu Hanifah demi kemudahan.",
            shamelaUrl: "https://shamela.ws/book/11571/43"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Al-Mudawwanah & Bidayatul Mujtahid",
            penulis: "Imam Malik & Ibnu Rusyd",
            halamanJilid: "Al-Mudawwanah 1/110, Bidayatul Mujtahid 1/112",
            statusQaul: "Tafshil Aurat Mughalladhah vs Mukhaffafah",
            penjelasanHukum: "Mazhab Maliki membedakan aurat menjadi Aurat Mughalladhah (vital: kemaluan dan dubur) dan Aurat Mukhaffafah (paha bagi pria, dada dan lengan bagi wanita). Shalat tetap sah tapi makruh bila terbuka aurat mukhaffafah.",
            shamelaUrl: "https://shamela.ws/book/21741/112"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Nailul Authar",
            penulis: "Asy-Syaukani",
            halamanJilid: "Nailul Authar 2/85",
            statusQaul: "Tarjih Dalil",
            penjelasanHukum: "Menghadap kiblat bagi yang dekat dengan Ka'bah wajib menghadap 'Ainul Ka'bah (fisik Ka'bah persis), sedangkan bagi yang jauh di luar Makkah cukup menghadap Jihah (arah kiblat secara umum), berdasar sabda Nabi SAW: 'Maa baina al-masyriqi wal maghribi qiblah'.",
            shamelaUrl: "https://shamela.ws/book/21744/85"
          }
        ],
        faedahSantri: "Perbedaan Syarat dan Rukun: Syarat adalah hal yang harus ada SEBELUM shalat dimulai dan terus berlangsung hingga selesai (seperti wudhu dan menutup aurat). Rukun adalah bagian integral yang ada DI DALAM shalat itu sendiri (seperti ruku' dan sujud)."
      },
      {
        id: "sh_02",
        pasalNumber: 2,
        subTitle: "Rukun-Rukun Shalat (Arkan Ash-Shalah)",
        dhabitArab: "الضَّابِطُ الثَّانِي: أَرْكَانُ الصَّلَاةِ أَرْبَعَةَ عَشَرَ رُكْنًا",
        dhabitTerjemah: "Kaidah Pokok Ke-2: Rukun-rukun shalat ada empat belas perkara.",
        matanArab: "أَرْكَانُ الصَّلَاةِ: (١) القِيَامُ مَعَ القُدْرَةِ فِي الفَرْضِ، (٢) تَكْبِيرَةُ الإِحْرَامِ، (٣) قِرَاءَةُ الفَاتِحَةِ، (٤) الرُّكُوعُ، (٥) الاِعْتِدَالُ بَعْدَ الرُّكُوعِ، (٦) السُّجُودُ عَلَى الأَعْضَاءِ السَّبْعَةِ، (٧) الرَّفْعُ مِنَ السُّجُودِ، (٨) الجُلُوسُ بَيْنَ السَّجْدَتَيْنِ، (٩) الطُّمَأْنِينَةُ فِي جَمِيعِ الأَرْكَانِ، (١٠) التَّشَهُّدُ الأَخِيرُ، (١١) الجُلُوسُ لِلتَّشَهُّدِ الأَخِيرِ، (١٢) الصَّلَاةُ عَلَى النَّبِيِّ ﷺ فِيهِ، (١٣) التَّسْلِيمُ، (١٤) التَّرْتِيبُ بَيْنَ الأَرْكَانِ.",
        matanTerjemah: "Rukun shalat ada 14: (1) Berdiri bagi yang mampu pada shalat fardhu, (2) Takbiratul Ihram, (3) Membaca Surah Al-Fatihah pada setiap rakaat, (4) Ruku', (5) I'tidal setelah ruku', (6) Sujud di atas tujuh anggota badan, (7) Bangkit dari sujud, (8) Duduk di antara dua sujud, (9) Thuma'ninah (tenang sejenak seukuran subhanallah) di setiap rukun, (10) Tasyahhud akhir, (11) Duduk untuk tasyahhud akhir, (12) Membaca shalawat kepada Nabi SAW di tasyahhud akhir, (13) Salam pertama, dan (14) Tertib sesuai urutan.",
        dalilNaqli: [
          {
            teksArab: "صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي",
            terjemah: "\"Shalatlah kalian sebagaimana kalian melihat aku shalat.\" (HR. Al-Bukhari no. 631)",
            sumber: "HR. Al-Bukhari no. 631"
          },
          {
            teksArab: "لَا صَلَاةَ لِمَنْ لَمْ يَقْرَأْ بِفَاتِحَةِ الكِتَابِ",
            terjemah: "\"Tidak ada shalat bagi orang yang tidak membaca Fatihatul Kitab (Surah Al-Fatihah).\" (HR. Al-Bukhari no. 756 & Muslim no. 394)",
            sumber: "HR. Bukhari no. 756 & Muslim no. 394"
          },
          {
            teksArab: "أُمِرْتُ أَنْ أَسْجُدَ عَلَى سَبْعَةِ أَعْظُمٍ: عَلَى الجَبْهَةِ - وَأَشَارَ بِيَدِهِ إِلَى أَنْفِهِ - وَاليَدَيْنِ، وَالرُّكْبَتَيْنِ، وَأَطْرَافِ القَدَمَيْنِ",
            terjemah: "\"Aku diperintahkan bersujud di atas tujuh anggota tulang: kening (dan beliau menunjuk hidungnya), kedua tangan, kedua lutut, dan ujung jari-jemari kedua kaki.\" (HR. Al-Bukhari no. 812 & Muslim no. 490)",
            sumber: "HR. Bukhari no. 812 & Muslim no. 490"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Al-Majmu' & Minhajut Thalibin",
            penulis: "Imam An-Nawawi",
            halamanJilid: "Minhajut Thalibin 1/31, Al-Majmu' 3/280",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Dalam mazhab Syafi'i, membaca Al-Fatihah adalah rukun mutlak bagi imam, makmum, dan munfarid (orang yang shalat sendirian) di semua shalat sirriyyah maupun jahriyyah. Basmalah adalah salah satu ayat dari Al-Fatihah yang wajib dibaca secara jahir pada shalat jahriyyah. Rukun shalat dihitung 13 atau 17 rukun (memasukkan niat dan thuma'ninah di 4 rukun gerak).",
            shamelaUrl: "https://shamela.ws/book/11559/31"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/68, Al-Mughni 1/345",
            statusQaul: "Sistematika Bidayatul Mutafaqqih",
            penjelasanHukum: "Mazhab Hanbali membagi amalan shalat menjadi: Rukun (14), Wajib (8 hal, seperti takbir intiqal, ucapan sami'allahu liman hamidah, tasbih ruku' dan sujud, tasyahhud awal), dan Sunnah. Makmum gugur bacaan Fatihahnya bila makmum masbuq mendapati imam sedang ruku', dan disunnahkan mendengar bacaan imam pada shalat jahriyyah.",
            shamelaUrl: "https://shamela.ws/book/11568/68"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Mabsuth & Al-Hidayah",
            penulis: "As-Sarakhsi & Al-Marghinani",
            halamanJilid: "Al-Hidayah 1/48",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Hanafi menetapkan rukun shalat hanya 6: Takbiratul ihram (tahrima), qiyam, qira'ah (bacaan ayat apa saja dari Al-Qur'an, tidak harus Fatihah secara fardhu, Fatihah berstatus wajib), ruku', sujud, dan duduk tasyahhud akhir seukuran tasyahhud. Makmum MAKRUH TAHRIM membaca Fatihah di belakang imam.",
            shamelaUrl: "https://shamela.ws/book/11571/48"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Bidayatul Mujtahid & Al-Mudawwanah",
            penulis: "Ibnu Rusyd & Imam Malik",
            halamanJilid: "Bidayatul Mujtahid 1/130",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Makmum tidak membaca Fatihah pada shalat jahriyyah, dan dianjurkan membaca pada shalat sirriyyah. Basmalah bukan bagian dari Fatihah dan makruh dibaca di awal Fatihah dalam shalat fardhu menurut Imam Malik.",
            shamelaUrl: "https://shamela.ws/book/21741/130"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Subulus Salam & Sifat Shalat Nabi (Al-Albani)",
            penulis: "Ash-Shan'ani & Al-Albani",
            halamanJilid: "Subulus Salam 1/168",
            statusQaul: "Tahqiq Sunnah Shahihah",
            penjelasanHukum: "Hadits 'Al-Musii' Shalatuhu' (sahabat yang buruk shalatnya) yang diajari oleh Rasulullah SAW adalah dalil pokok pembatas antara Rukun Shalat (yang membatalkan shalat bila tertinggal) dan amalan Sunnah.",
            shamelaUrl: "https://shamela.ws/book/21743/168"
          }
        ],
        faedahSantri: "Tujuh Anggota Sujud: (1) Dahi bersama hidung, (2-3) Dua telapak tangan, (4-5) Dua lutut, (6-7) Jari-jemari kedua kaki. Menempelkan ketujuh anggota ini ke tempat sujud adalah rukun yang tidak boleh terangkat selama sujud."
      },
      {
        id: "sh_03",
        pasalNumber: 3,
        subTitle: "Sujud Sahwi: Sebab-Sebab & Tempat Pelaksanaannya",
        dhabitArab: "الضَّابِطُ الثَّالِثُ: أَسْبَابُ سُجُودِ السَّهْوِ ثَلَاثَةٌ: الزِّيَادَةُ، وَالنَّقْصُ، وَالشَّكُّ",
        dhabitTerjemah: "Kaidah Pokok Ke-3: Sebab-sebab sujud sahwi ada tiga: Az-Ziyadah (penambahan), An-Naqsh (pengurangan), dan Asy-Syakk (keragu-raguan).",
        matanArab: "يُشْرَعُ سُجُودُ السَّهْوِ لِثَلَاثَةِ أَسْبَابٍ: (١) الزِّيَادَةُ: كَزِيَادَةِ رُكُوعٍ أَوْ سُجُودٍ سَهْوًا، فَيَسْجُدُ بَعْدَ السَّلَامِ. (٢) النَّقْصُ: كَنَقْصِ وَاجِبٍ مِنَ الوَاجِبَاتِ (كَالتَّشَهُّدِ الأَوَّلِ)، فَيَسْجُدُ قَبْلَ السَّلَامِ. (٣) الشَّكُّ: فَإِنْ تَرَدَّدَ بَنَى عَلَى اليَقِينِ (وَهُوَ الأَقَلُّ) وَسَجَدَ قَبْلَ السَّلَامِ، وَإِنْ غَلَبَ عَلَى ظَنِّهِ أَمْرٌ بَنَى عَلَيْهِ وَسَجَدَ بَعْدَ السَّلَامِ.",
        matanTerjemah: "Disyariatkan sujud sahwi karena 3 sebab: (1) Az-Ziyadah (menambah gerakan rukun shalat karena lupa, seperti menambah rakaat, ruku', atau sujud), maka sujud sahwi dilakukan SETELAH salam. (2) An-Naqsh (mengurangi kewajiban shalat, seperti lupa tasyahhud awal), maka sujud sahwi dilakukan SEBELUM salam. (3) Asy-Syakk (ragu-ragu tentang jumlah rakaat): jika tidak ada dugaan kuat maka ia berpegang pada keyakinan (mengambil jumlah rakaat yang lebih sedikit) lalu sujud SEBELUM salam; jika memiliki dugaan kuat maka ia berpegang pada dugaannya lalu sujud SETELAH salam.",
        dalilNaqli: [
          {
            teksArab: "إِذَا شَكَّ أَحَدُكُمْ فِي صَلَاتِهِ فَلَمْ يَدْرِ كَمْ صَلَّى ثَلَاثًا أَمْ أَرْبَعًا؟ فَلْيَطْرَحِ الشَّكَّ وَلْيَبْنِ عَلَى مَا اسْتَيْقَنَ، ثُمَّ يَسْجُدُ سَجْدَتَيْنِ قَبْلَ أَنْ يُسَلِّمَ",
            terjemah: "\"Apabila salah seorang di antara kalian ragu dalam shalatnya, sehingga tidak tahu apakah sudah shalat 3 atau 4 rakaat, maka buanglah keraguan dan bangunlah di atas apa yang diyakini (jumlah terkecil), kemudian sujudlah dua kali sebelum ia mengucapkan salam.\" (HR. Muslim no. 571)",
            sumber: "HR. Muslim no. 571"
          },
          {
            teksArab: "حَدِيثُ ذِي اليَدَيْنِ: حِينَ سَلَّمَ النَّبِيُّ ﷺ مِنْ رَكْعَتَيْنِ فِي إِحْدَى صَلَاتَيِ العَشِيِّ، ثُمَّ أَتَمَّ وَسَجَدَ بَعْدَ السَّلَامِ",
            terjemah: "\"Hadits Dzul Yadain: Ketika Nabi SAW lupa salam pada rakaat kedua shalat ashar, beliau menyempurnakan sisa rakaat lalu sujud sahwi setelah salam.\" (HR. Al-Bukhari no. 482 & Muslim no. 573)",
            sumber: "HR. Bukhari no. 482 & Muslim no. 573"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Mu'in",
            penulis: "Imam An-Nawawi & Al-Malibari",
            halamanJilid: "Minhaj 1/38, Fathul Mu'in hal. 32",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Dalam mazhab Syafi'i, SEMUA sujud sahwi posisinya dilakukan SEBELUM salam, apapun sebabnya (baik karena penambahan, pengurangan ab'adh seperti qunut subuh dan tasyahhud awal, maupun keraguan). Sujud sahwi hukumnya sunnah muakkadah.",
            shamelaUrl: "https://shamela.ws/book/11559/38"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/88, Al-Mughni 2/20",
            statusQaul: "Dirinci Sesuai Hadits",
            penjelasanHukum: "Mazhab Hanbali merinci: bila sahwi karena penambahan atau salam sebelum waktunya maka sujud setelah salam. Bila karena pengurangan wajib (seperti tasyahhud awal) maka sujud sebelum salam. Bila ragu tanpa tarjih maka sebelum salam, bila ragu dengan tarjih ghalabatuzh zhann maka setelah salam.",
            shamelaUrl: "https://shamela.ws/book/11568/88"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Bidayatul Mujtahid",
            penulis: "Syaikh Khalil & Ibnu Rusyd",
            halamanJilid: "Mukhtashar Khalil hal. 34, Bidayatul Mujtahid 1/170",
            statusQaul: "Kaidah Qabli dan Ba'di",
            penjelasanHukum: "Mazhab Maliki membuat kaidah masyhur: Jika sahwi karena pengurangan (Naqsh) maka sujud Qabli (sebelum salam). Jika sahwi karena penambahan (Ziyadah) maka sujud Ba'di (setelah salam). Jika bercampur antara penambahan dan pengurangan, maka didahulukan yang Qabli.",
            shamelaUrl: "https://shamela.ws/book/11575/34"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/74",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Mazhab Hanafi berpendapat SEMUA sujud sahwi dilakukan SETELAH salam satu kali ke kanan, lalu sujud dua kali, membaca tasyahhud lagi, dan bersalam dua kali.",
            shamelaUrl: "https://shamela.ws/book/11571/74"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Subulus Salam & Nailul Authar",
            penulis: "Ash-Shan'ani & Asy-Syaukani",
            halamanJilid: "Subulus Salam 1/205",
            statusQaul: "Tarjih Syaikhul Islam",
            penjelasanHukum: "Pendapat perincian (seperti yang dirumuskan Bidayatul Mutafaqqih dan mazhab Ahmad serta pilihan Ibnu Taimiyyah) adalah pendapat yang paling mengkompromikan seluruh hadits-hadits shahih tanpa mempertentangkannya.",
            shamelaUrl: "https://shamela.ws/book/21743/205"
          }
        ],
        faedahSantri: "Rumus Praktis: Berkurang = Sujud SEBELUM Salam. Bertambah = Sujud SETELAH Salam. Ragu tanpa dugaan = Ambil yang paling sedikit dan sujud SEBELUM Salam."
      },
      {
        id: "sh_04",
        pasalNumber: 4,
        subTitle: "Shalat Berjamaah & Ketentuan Makmum Masbuq",
        dhabitArab: "الضَّابِطُ الرَّابِعُ: صَلَاةُ الجَمَاعَةِ تَفْضُلُ صَلَاةَ الفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً",
        dhabitTerjemah: "Kaidah Pokok Ke-4: Shalat berjamaah lebih utama daripada shalat sendirian dengan selisih dua puluh tujuh derajat.",
        matanArab: "صَلَاةُ الجَمَاعَةِ فَرْضُ عَيْنٍ عَلَى الرِّجَالِ الأَحْرَارِ القَادِرِينَ فِي الحَضَرِ (عِنْدَ الحَنَابِلَةِ)، أَوْ فَرْضُ كِفَايَةٍ (عِنْدَ الشَّافِعِيَّةِ). وَتُدْرَكُ الرَّكْعَةُ بِإِدْرَاكِ الرُّكُوعِ مَعَ الإِمَامِ مَعَ الطُّمَأْنِينَةِ فِيهِ. وَيَتَحَمَّلُ الإِمَامُ عَنِ المَأْمُومِ سَهْوَهُ.",
        matanTerjemah: "Hukum shalat berjamaah bagi laki-laki: fardhu 'ain menurut mazhab Hanbali, atau fardhu kifayah menurut mazhab Syafi'i. Seseorang dianggap mendapati satu rakaat bersama imam apabila ia mendapati ruku' bersama imam secara thuma'ninah sebelum imam bangkit i'tidal. Imam menanggung kesalahan lupa makmum (sehingga makmum tidak perlu sujud sahwi sendiri bila lupa di belakang imam).",
        dalilNaqli: [
          {
            teksArab: "صَلَاةُ الجَمَاعَةِ تَفْضُلُ صَلَاةَ الفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً",
            terjemah: "\"Shalat berjamaah melampaui shalat sendirian sebanyak dua puluh tujuh derajat.\" (HR. Al-Bukhari no. 645 & Muslim no. 650)",
            sumber: "HR. Bukhari no. 645 & Muslim no. 650"
          },
          {
            teksArab: "مَنْ أَدْرَكَ الرُّكُوعَ فَقَدْ أَدْرَكَ الرَّكْعَةَ",
            terjemah: "\"Barangsiapa mendapati ruku' (bersama imam), maka sungguh ia telah mendapati rakaat itu.\" (HR. Abu Dawud no. 893, Shahih)",
            sumber: "HR. Abu Dawud no. 893"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Al-Umm",
            penulis: "Imam An-Nawawi & Imam Asy-Syafi'i",
            halamanJilid: "Minhajut Thalibin 1/42",
            statusQaul: "Fardhu Kifayah Muktamad",
            penjelasanHukum: "Hukum shalat berjamaah shalat lima waktu adalah fardhu kifayah bagi kaum pria di suatu pemukiman, hingga syiar shalat tampak tegak. Jika ditinggalkan seluruh warga satu kampung, mereka berdosa dan diperangi.",
            shamelaUrl: "https://shamela.ws/book/11559/42"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/95, Al-Mughni 2/130",
            statusQaul: "Fardhu 'Ain di Masjid",
            penjelasanHukum: "Hukum shalat berjamaah lima waktu di masjid adalah Fardhu 'Ain bagi setiap lelaki mukallaf yang mampu tanpa udzur (berdasarkan hadits Ibnu Ummi Maktum yang buta namun tetap diperintahkan ke masjid saat mendengar adzan).",
            shamelaUrl: "https://shamela.ws/book/11568/95"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/55",
            statusQaul: "Sunnah Muakkadah mendekati Wajib",
            penjelasanHukum: "Hanafi menghukuminya sebagai Sunnah Muakkadah 'alal a'yan yang menyerupai wajib dalam hal celaan dan dosa bagi yang sengaja terus-menerus meninggalkannya.",
            shamelaUrl: "https://shamela.ws/book/11571/55"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Bidayatul Mujtahid",
            penulis: "Syaikh Khalil & Ibnu Rusyd",
            halamanJilid: "Bidayatul Mujtahid 1/145",
            statusQaul: "Sunnah Muakkadah",
            penjelasanHukum: "Dalam madzhab Maliki hukumnya sunnah muakkadah bagi setiap individu shalat fardhu, kecuali shalat Jumat yang fardhu 'ain.",
            shamelaUrl: "https://shamela.ws/book/21741/145"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Nailul Authar",
            penulis: "Asy-Syaukani",
            halamanJilid: "Nailul Authar 3/135",
            statusQaul: "Tarjih Dalil Nash",
            penjelasanHukum: "Ancaman keras Nabi SAW dalam hadits Abu Hurairah hendak membakar rumah orang-orang yang tidak shalat berjamaah menunjukkan betapa pentingnya shalat berjamaah bagi laki-laki mukallaf.",
            shamelaUrl: "https://shamela.ws/book/21744/135"
          }
        ],
        faedahSantri: "Masbuq Ruku': Syarat sah dihitung satu rakaat saat masbuq: makmum telah bertakbiratul ihram sambil berdiri sempurna, lalu turun ruku' dan tangannya telah memegang lutut bersamaan dengan imam masih dalam posisi ruku' secara thuma'ninah."
      }
    ]
  },

  // ==========================================
  // 3. KITAB AZ-ZAKAH (كِتَابُ الزَّكَاةِ)
  // ==========================================
  {
    id: "zakah",
    titleArab: "كِتَابُ الزَّكَاةِ",
    titleIndo: "Kitab Zakat (Pembersih Harta)",
    deskripsi: "Pilar ketiga Islam untuk menata keadilan ekonomi umat, mencakup syarat wajib zakat, nisab emas-perak, perdagangan, pertanian, peternakan, zakat fitrah, dan 8 golongan ashnaf mustahiq.",
    iconName: "HardDrive",
    totalPasal: 3,
    passages: [
      {
        id: "zk_01",
        pasalNumber: 1,
        subTitle: "Nisab Harta & Syarat Wajib Zakat",
        dhabitArab: "الضَّابِطُ الأَوَّلُ: شُرُوطُ وُجُوبِ الزَّكَاةِ خَمْسَةٌ",
        dhabitTerjemah: "Kaidah Pokok Ke-1: Syarat wajib zakat ada lima perkara.",
        matanArab: "شُرُوطُ وُجُوبِ الزَّكَاةِ: (١) الإِسْلَامُ، (٢) الحُرِّيَّةُ، (٣) المِلْكُ التَّامُّ، (٤) بُلُوغُ النِّصَابِ، (٥) حَوَلَانُ الحَوْلِ فِي غَيْرِ الخَارِجِ مِنَ الأَرْضِ. وَنِصَابُ الذَّهَبِ: عِشْرُونَ دِينَارًا (٨٥ جِرَامًا)، وَنِصَابُ الفِضَّةِ: مِائَتَا دِرْهَمٍ (٥٩٥ جِرَامًا)، وَالمِقْدَارُ الوَاجِبُ: رُبُعُ العُشْرِ (٢.٥٪).",
        matanTerjemah: "Syarat wajib zakat ada lima: (1) Islam, (2) Merdeka, (3) Kepemilikan sempurna (milk taam), (4) Mencapai nisab, (5) Berlalu satu tahun hijriah (haul) selain hasil bumi yang dizakati saat panen. Nisab emas adalah 20 dinar murni (setara 85 gram emas), nisab perak adalah 200 dirham murni (setara 595 gram perak), dan kadar wajib yang dikeluarkan adalah seperempat dari sepersepuluh (2,5%). Zakat perdagangan dihitung berdasarkan nilai aset lancar dikurangi utang jatuh tempo saat genap haul, disetarakan dengan nisab emas/perak.",
        dalilNaqli: [
          {
            teksArab: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا",
            terjemah: "\"Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan menyucikan mereka.\" (QS. At-Taubah: 103)",
            sumber: "QS. At-Taubah: 103"
          },
          {
            teksArab: "لَيْسَ فِي حَبٍّ وَلَا تَمْرٍ صَدَقَةٌ حَتَّى يَبْلُغَ خَمْسَةَ أَوْسُقٍ، وَلَا فِيمَا دُونَ خَمْسِ أَوَاقٍ مِنَ الوَرِقِ صَدَقَةٌ",
            terjemah: "\"Tidak ada zakat pada biji-bijian dan kurma hingga mencapai lima wasaq (± 653 kg), dan tidak ada zakat pada perak yang kurang dari lima uqiyah (200 dirham).\" (HR. Muslim no. 979)",
            sumber: "HR. Muslim no. 979"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Minhaj 1/62, Fathul Qarib hal. 22",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Zakat perniagaan dihitung modal dan labanya di akhir haul menggunakan mata uang yang dipakai saat pembelian awal. Harta anak yatim dan orang gila wajib dizakati oleh walinya. Zakat perhiasan emas wanita yang dipakai secara wajar (mubah) TIDAK wajib dizakati menurut qaul mu'tamad Syafi'i.",
            shamelaUrl: "https://shamela.ws/book/11559/62"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/140, Al-Mughni 2/590",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Zakat perniagaan dinilai dengan nisab yang paling menguntungkan orang miskin di antara emas atau perak pada akhir tahun. Utang yang mendesak mengurangi nisab zakat.",
            shamelaUrl: "https://shamela.ws/book/11568/140"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/96, Raddul Muhtar 2/290",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Mazhab Hanafi mewajibkan zakat pada PERHIASAN emas wanita meskipun dipakai sehari-hari bila mencapai nisab. Harta anak kecil tidak dizakati karena zakat adalah ibadah yang mensyaratkan taklif baligh menurut Abu Hanifah.",
            shamelaUrl: "https://shamela.ws/book/11571/96"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Bidayatul Mujtahid & Al-Mudawwanah",
            penulis: "Ibnu Rusyd & Imam Malik",
            halamanJilid: "Bidayatul Mujtahid 1/240",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Pedagang dibagi menjadi Mudir (pedagang aktif berputar harian) yang menaksir zakat setahun sekali, dan Muhtakir (penimbun/spekulan) yang baru menzakati dagangannya saat barang terjual untuk satu tahun saja.",
            shamelaUrl: "https://shamela.ws/book/21741/240"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Al-Fiqh Al-Islami wa Adillatuh",
            penulis: "Prof. Dr. Wahbah Az-Zuhaili",
            halamanJilid: "Al-Fiqh Al-Islami 3/1820",
            statusQaul: "Kontemporer",
            penjelasanHukum: "Uang kertas kontemporer (Rupiah, Dollar, Real) dihukumi sama persis seperti emas dan perak karena memiliki fungsi mutlak tsamaniyyah (daya beli dan nilai tukar), sehingga wajib dizakati 2,5% bila tabungan/deposito mencapai harga 85 gram emas dan bertahan satu haul.",
            shamelaUrl: "https://waqfeya.net/book.php?bid=1409"
          }
        ],
        faedahSantri: "Konversi Modern: Nisab Emas = 85 gram emas murni (24 karat). Jika harga emas Rp 1.300.000/gram, maka nisab tabungan/perniagaan adalah 85 x Rp 1.300.000 = Rp 110.500.000. Zakat wajib = Rp 110.500.000 x 2,5% = Rp 2.762.500."
      },
      {
        id: "zk_02",
        pasalNumber: 2,
        subTitle: "Delapan Golongan Penerima Zakat (Mustahiq)",
        dhabitArab: "الضَّابِطُ الثَّانِي: مَصَارِفُ الزَّكَاةِ ثَمَانِيَةٌ لَا يَجُوزُ صَرْفُهَا لِغَيْرِهِمْ",
        dhabitTerjemah: "Kaidah Pokok Ke-2: Ashnaf penerima zakat ada delapan golongan dan tidak boleh disalurkan kepada selain mereka.",
        matanArab: "مَصَارِفُ الزَّكَاةِ ثَمَانِيَةٌ بِنَصِّ القُرْآنِ: (١) الفُقَرَاءُ، (٢) المَسَاكِينُ، (٣) العَامِلُونَ عَلَيْهَا، (٤) المُؤَلَّفَةُ قُلُوبُهُمْ، (٥) فِي الرِّقَابِ، (٦) الغَارِمُونَ، (٧) فِي سَبِيلِ اللَّهِ، (٨) ابْنُ السَّبِيلِ. وَلَا يَجُوزُ إِعْطَاؤُهَا لِغَنِيٍّ، وَلَا لِقَوِيٍّ مُكْتَسِبٍ، وَلَا لِآلِ مُحَمَّدٍ ﷺ، وَلَا لِمَنْ تَلْزَمُ المُزَكِّيَ نَفَقَتُهُ (كَالأُصُولِ وَالفُرُوعِ وَالزَّوْجَةِ).",
        matanTerjemah: "Golongan yang berhak menerima zakat ada delapan sebagaimana ditegaskan dalam Al-Qur'an: (1) Orang fakir (tidak punya harta dan penghasilan atau kurang dari separuh kebutuhan pokok), (2) Orang miskin (punya penghasilan namun hanya menutupi separuh lebih tapi belum mencukupi kebutuhan pokok), (3) Amil zakat (petugas yang ditunjuk penguasa/lembaga resmi amil zakat), (4) Muallaf yang dilunakkan hatinya, (5) Riqab (memerdekakan budak / membebaskan muslim tertawan), (6) Gharimin (orang yang terlilit utang karena mendamaikan perselisihan atau utang kebutuhan pokok halal), (7) Fi Sabilillah (para mujahidin pejuang dakwah Islam), (8) Ibnu Sabil (musafir kehabisan bekal dalam perjalanan halal). Zakat TIDAK boleh diberikan kepada orang kaya, orang kuat yang mampu bekerja, keluarga keturunan Nabi SAW (Bani Hasyim dan Bani Muthallib), dan orang yang wajib dinafkahi oleh muzakki (orang tua, anak kandung, dan istri).",
        dalilNaqli: [
          {
            teksArab: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ",
            terjemah: "\"Sesungguhnya zakat itu hanyalah untuk orang-orang fakir, orang miskin, amil zakat, yang dilunakkan hatinya (mualaf), untuk (memerdekakan) hamba sahaya, untuk (membebaskan) orang yang berutang, untuk jalan Allah dan untuk orang yang sedang dalam perjalanan, sebagai kewajiban dari Allah. Allah Maha Mengetahui, Mahabijaksana.\" (QS. At-Taubah: 60)",
            sumber: "QS. At-Taubah: 60"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Fathul Qarib hal. 24",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Jika zakat dibagikan oleh muzakki sendiri, wajib diratakan kepada seluruh golongan yang ada di wilayahnya (minimal 3 orang dari setiap ashnaf yang wujud). Mazhab Syafi'i menafsirkan 'Fi Sabilillah' secara spesifik hanya untuk para pejuang perang sukarela yang tidak memiliki gaji rutin dari baitul mal.",
            shamelaUrl: "https://shamela.ws/book/11425/24"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/165, Al-Mughni 2/668",
            statusQaul: "Pilihan yang Lebih Luas",
            penjelasanHukum: "Boleh menyalurkan seluruh zakat kepada SATU golongan saja atau bahkan kepada satu orang fakir saja bila sangat mendesak. Syaikhul Islam Ibnu Taimiyyah memasukkan penuntut ilmu syar'i yang tidak mampu mencari nafkah ke dalam Fi Sabilillah.",
            shamelaUrl: "https://shamela.ws/book/11568/165"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/110",
            statusQaul: "Syarat Tamlik",
            penjelasanHukum: "Hanafi mensyaratkan Tamlik (menyerahkan kepemilikan zat harta langsung kepada penerima). Karena itu zakat tidak boleh digunakan untuk membangun masjid, rumah sakit, jembatan, atau mengafani jenazah karena tidak ada unsur penyerahan hak milik pribadi.",
            shamelaUrl: "https://shamela.ws/book/11571/110"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Bidayatul Mujtahid",
            penulis: "Syaikh Khalil & Ibnu Rusyd",
            halamanJilid: "Bidayatul Mujtahid 1/265",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Boleh memberikan zakat kepada sebagian ashnaf dan tidak wajib membagi rata ke delapan ashnaf. Yang diutamakan adalah yang paling membutuhkan (Al-Ahwaj).",
            shamelaUrl: "https://shamela.ws/book/21741/265"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Fiqh Az-Zakah (Dr. Yusuf Al-Qaradhawi)",
            penulis: "Dr. Yusuf Al-Qaradhawi & Wahbah Az-Zuhaili",
            halamanJilid: "Fiqh Zakah 2/630",
            statusQaul: "Fatwa Ulama Kontemporer",
            penjelasanHukum: "Sebagian fukaha kontemporer memperluas makna 'Fi Sabilillah' mencakup media dakwah Islam internasional, percetakan Al-Qur'an, beasiswa kader ulama, dan advokasi hukum membela kaum muslimin tertindas di kancah global.",
            shamelaUrl: "https://waqfeya.net"
          }
        ],
        faedahSantri: "Memberi Zakat ke Kerabat: Memberi zakat kepada saudara kandung, paman, bibi, atau keponakan yang fakir hukumnya SAH bahkan lebih utama karena mengandung dua pahala: pahala zakat dan pahala silaturrahim (asalkan bukan orang tua kandung atau anak kandung)."
      },
      {
        id: "zk_03",
        pasalNumber: 3,
        subTitle: "Zakat Fitrah: Syarat, Takaran & Waktu Pembayaran",
        dhabitArab: "الضَّابِطُ الثَّالِثُ: زَكَاةُ الفِطْرِ صَاعٌ مِنْ غَالِبِ قُوتِ البَلَدِ عَنْ كُلِّ مُسْلِمٍ",
        dhabitTerjemah: "Kaidah Pokok Ke-3: Zakat Fitrah adalah satu sha' dari makanan pokok setempat bagi setiap jiwa muslim.",
        matanArab: "زَكَاةُ الفِطْرِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ حُرٍّ أَوْ عَبْدٍ ذَكَرٍ أَوْ أُنْثَى، إِذَا فَضَلَ عَنْ قُوتِهِ وَقُوتِ مَنْ يَلْزَمُهُ نَفَقَتُهُ فِي يَوْمِ العِيدِ وَلَيْلَتِهِ صَاعٌ. وَالمِقْدَارُ: صَاعٌ نَبَوِيٌّ (نَحْوُ ٢.٥ إِلَى ٣ كِيلُوجِرَامَاتٍ مِنْ غَالِبِ قُوتِ البَلَدِ كَالأَرُزِّ). وَوَقْتُ الوُجُوبِ: غُرُوبُ شَمْسِ آخِرِ يَوْمٍ مِنْ رَمَضَانَ، وَأَفْضَلُ أَوْقَاتِهَا: قَبْلَ صَلَاةِ العِيدِ.",
        matanTerjemah: "Zakat fitrah adalah kewajiban bagi setiap muslim merdeka maupun hamba sahaya, laki-laki maupun perempuan, yang memiliki kelebihan makanan untuk dirinya dan keluarganya pada siang dan malam hari raya Idul Fitri. Takarannya adalah 1 sha' Nabawi (setara sekitar 2,5 hingga 3 kilogram makanan pokok daerah setempat seperti beras). Waktu wajibnya adalah terbenamnya matahari hari terakhir Ramadhan, dan waktu paling utama mengeluarkannya adalah pagi hari sebelum shalat Idul Fitri didirikan.",
        dalilNaqli: [
          {
            teksArab: "فَرَضَ رَسُولُ اللَّهِ ﷺ زَكَاةَ الفِطْرِ صَاعًا مِنْ تَمْرٍ أَوْ صَاعًا مِنْ شَعِيرٍ عَلَى العَبْدِ وَالحُرِّ وَالذَّكَرِ وَالأُنْثَى وَالصَّغِيرِ وَالكَبِيرِ مِنَ المُسْلِمِينَ",
            terjemah: "\"Rasulullah SAW mewajibkan zakat fitrah sebanyak satu sha' kurma atau satu sha' gandum atas budak dan orang merdeka, laki-laki dan perempuan, anak kecil dan dewasa dari kaum muslimin.\" (HR. Al-Bukhari no. 1503 & Muslim no. 984)",
            sumber: "HR. Bukhari no. 1503 & Muslim no. 984"
          },
          {
            teksArab: "طُهْرَةً لِلصَّائِمِ مِنَ اللَّغْوِ وَالرَّفَثِ وَطُعْمَةً لِلْمَسَاكِينِ",
            terjemah: "\"Sebagai pembersih bagi orang yang berpuasa dari perbuatan sia-sia dan kotor, serta sebagai hidangan makanan bagi orang-orang miskin.\" (HR. Abu Dawud no. 1609, Hasan)",
            sumber: "HR. Abu Dawud no. 1609"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Fathul Qarib hal. 23",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Zakat fitrah WAJIB dikeluarkan berupa makanan pokok setempat (di Indonesia: beras), TIDAK boleh diganti dengan uang menurut qaul muktamad Syafi'i. Boleh dibayarkan sejak awal bulan Ramadhan (ta'jil). Takaran 1 sha' diukur setara 2,75 - 3 liter / 2,5 kg beras bersih.",
            shamelaUrl: "https://shamela.ws/book/11425/23"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Zaad Al-Mustaqni'",
            penulis: "Ibnu Duwayyan & Al-Hajjawi",
            halamanJilid: "Manar As-Sabil 1/158",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Wajib berupa makanan (kurma, gandum, kismis, aqith, atau makanan pokok beras). Waktu pembayaran paling awal boleh dimajukan 1 atau 2 hari sebelum Idul Fitri (seperti amalan sahabat Ibnu Umar RA).",
            shamelaUrl: "https://shamela.ws/book/11568/158"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/116, Raddul Muhtar 2/365",
            statusQaul: "Boleh Menggunakan Uang (Qimah)",
            penjelasanHukum: "Mazhab Hanafi MEMBOLEHKAN bahkan menganggap lebih utama membayar zakat fitrah dengan QIMAH (senilai uang), karena uang lebih bermanfaat dan fleksibel bagi kaum miskin untuk membeli baju, obat, atau lauk hari raya.",
            shamelaUrl: "https://shamela.ws/book/11571/116"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Bidayatul Mujtahid",
            penulis: "Syaikh Khalil & Ibnu Rusyd",
            halamanJilid: "Mukhtashar Khalil hal. 55",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Wajib berupa makanan pokok dari 9 jenis komoditas atau apa yang menjadi kebiasaan penduduk negeri. Tidak sah menggunakan nilai uang menurut Malik.",
            shamelaUrl: "https://shamela.ws/book/11575/55"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Subulus Salam & Nailul Authar",
            penulis: "Ash-Shan'ani & Asy-Syaukani",
            halamanJilid: "Subulus Salam 2/130",
            statusQaul: "Keluasan Syariah",
            penjelasanHukum: "Fatwa Majelis Ulama Indonesia (MUI) dan ormas Islam di Indonesia membolehkan mengikuti mazhab Hanafi dalam pembayaran zakat fitrah dengan uang seharga 2,5 - 3 kg beras kualitas konsumsi harian keluarga.",
            shamelaUrl: "https://shamela.ws/book/21743/130"
          }
        ],
        faedahSantri: "Batas Akhir Waktu: Jika zakat fitrah dibayarkan setelah shalat Idul Fitri sebelum tenggelam matahari hukumnya makruh (atau qadha). Jika ditunda melewati hari raya Idul Fitri tanpa udzur hukumnya haram dan berstatus sedekah biasa."
      }
    ]
  },

  // ==========================================
  // 4. KITAB ASH-SHIYAM (كِتَابُ الصِّيَامِ)
  // ==========================================
  {
    id: "shiyam",
    titleArab: "كِتَابُ الصِّيَامِ",
    titleIndo: "Kitab Puasa (Perisai Nafsu)",
    deskripsi: "Rukun Islam keempat yang melatih ketakwaan batin, mengupas syarat, rukun, pembatal puasa, adab berbuka dan sahur, udzur syar'i (musafir & orang sakit), kafarat jimak, dan iktikaf sepuluh malam terakhir.",
    iconName: "Sparkles",
    totalPasal: 2,
    passages: [
      {
        id: "sy_01",
        pasalNumber: 1,
        subTitle: "Rukun & Pembatal-Pembatal Puasa",
        dhabitArab: "الضَّابِطُ الأَوَّلُ: الصِّيَامُ إِمْسَاكٌ عَنِ المُفَطِّرَاتِ بِنِيَّةٍ مِنْ طُلُوعِ الفَجْرِ إِلَى غُرُوبِ الشَّمْسِ",
        dhabitTerjemah: "Kaidah Pokok Ke-1: Puasa adalah menahan diri dari segala hal yang membatalkan disertai niat dari terbit fajar shadiq hingga terbenam matahari.",
        matanArab: "رُكْنَا الصِّيَامِ: (١) النِّيَّةُ لَيْلًا قَبْلَ الفَجْرِ فِي الفَرْضِ، (٢) الإِمْسَاكُ عَنِ المُفَطِّرَاتِ مِنْ طُلُوعِ الفَجْرِ إِلَى غُرُوبِ الشَّمْسِ. وَمُفَطِّرَاتُ الصَّوْمِ: الأَكْلُ وَالشُّرْبُ عَمْدًا، الجِمَاعُ، الاِسْتِقَاءَةُ عَمْدًا، خُرُوجُ المَنِيِّ بِشَهْوَةٍ، خُرُوجُ دَمِ الحَيْضِ أَوِ النِّفَاسِ، وَمَا كَانَ فِي مَعْنَى الأَكْلِ وَالشُّرْبِ كالإِبَرِ المُغَذِّيَةِ.",
        matanTerjemah: "Dua rukun puasa: (1) Niat di malam hari sebelum terbit fajar pada puasa wajib (tabyitun niyyah), (2) Menahan diri dari hal-hal yang membatalkan dari terbit fajar shadiq hingga terbenam matahari. Pembatal puasa meliputi: Makan dan minum secara sengaja, berhubungan suami-istri (jimak), muntah dengan sengaja, keluarnya air mani karena syahwat (onani/bersentuhan), keluarnya darah haidh atau nifas, serta sesuatu yang semakna dengan makan-minum seperti suntikan infus bernutrisi glukosa.",
        dalilNaqli: [
          {
            teksArab: "وَكُلُوا وَاشْرَبُوا حَتَّىٰ يَتَبَيَّنَ لَكُمُ الْخَيْطُ الأَبْيَضُ مِنَ الْخَيْطِ الأَسْوَدِ مِنَ الْفَجْرِ ۖ ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ",
            terjemah: "\"Dan makan minumlah hingga terang bagimu benang putih dari benang hitam, yaitu fajar. Kemudian sempurnakanlah puasa itu sampai (datang) malam.\" (QS. Al-Baqarah: 187)",
            sumber: "QS. Al-Baqarah: 187"
          },
          {
            teksArab: "مَنْ لَمْ يُجْمِعِ الصِّيَامَ قَبْلَ الفَجْرِ فَلَا صِيَامَ لَهُ",
            terjemah: "\"Barangsiapa yang tidak membulatkan niat puasa sebelum terbit fajar, maka tidak ada puasa baginya.\" (HR. Abu Dawud no. 2454, Shahih)",
            sumber: "HR. Abu Dawud no. 2454"
          },
          {
            teksArab: "مَنْ نَسِيَ وَهُوَ صَائِمٌ فَأَكَلَ أَوْ شَرِبَ فَلْيُتِمَّ صَوْمَهُ، فَإِنَّمَا أَطْعَمَهُ اللَّهُ وَسَقَاهُ",
            terjemah: "\"Barangsiapa lupa ketika berpuasa lalu makan atau minum, maka hendaklah ia menyempurnakan puasanya, karena sesungguhnya Allah yang memberinya makan dan minum.\" (HR. Al-Bukhari no. 1933 & Muslim no. 1155)",
            sumber: "HR. Bukhari no. 1933 & Muslim no. 1155"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Fathul Qarib hal. 25, Minhaj 1/68",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Niat puasa Ramadhan wajib diperbarui setiap malam (tidak cukup berniat satu bulan sekaligus di awal Ramadhan). Masuknya benda ('ain) ke dalam rongga terbuka (jauf) seperti mulut, hidung, telinga, jalan depan/belakang membatalkan puasa meski tidak mengandung nutrisi. Sengaja menelan dahak yang sudah sampai di makhraj huruf membatalkan puasa.",
            shamelaUrl: "https://shamela.ws/book/11425/25"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Zaad Al-Mustaqni'",
            penulis: "Ibnu Duwayyan & Al-Hajjawi",
            halamanJilid: "Manar As-Sabil 1/175, Zaad 1/40",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Bekam (hijamah) membatalkan puasa bagi yang membekam dan yang dibekam berdasarkan hadits: 'Afthara al-haajimu wal mahjuum'. Niat wajib di setiap malam puasa fardhu. Sengaja menelan dahak membatalkan bila sampai ke rongga mulut.",
            shamelaUrl: "https://shamela.ws/book/11568/175"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Bidayatul Mujtahid",
            penulis: "Syaikh Khalil & Ibnu Rusyd",
            halamanJilid: "Mukhtashar Khalil hal. 60, Bidayatul Mujtahid 1/280",
            statusQaul: "Cukup Niat Sekali Sebulan",
            penjelasanHukum: "Mazhab Maliki membolehkan niat SATU KALI di malam pertama Ramadhan untuk puasa sebulan penuh, selama puasanya bersambung tanpa jeda safar atau sakit.",
            shamelaUrl: "https://shamela.ws/book/21741/280"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/120",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Niat puasa Ramadhan boleh dilakukan hingga sebelum pertengahan siang (Dhahuwah Kubra) asalkan belum makan atau minum apa pun sejak subuh. Berbekam tidak membatalkan puasa.",
            shamelaUrl: "https://shamela.ws/book/11571/120"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Majmu' Fatawa (Ibnu Taimiyyah) & Zuhaili",
            penulis: "Ibnu Taimiyyah & Wahbah Az-Zuhaili",
            halamanJilid: "Majmu' Fatawa 25/233, Fiqh Islami 3/1730",
            statusQaul: "Tarjih Fiqh Kontemporer",
            penjelasanHukum: "Tarjih Ibnu Taimiyyah: Suntikan obat (injeksi otot/urat, insulin diabetes), obat tetes mata/telinga, dan inhaler asma TIDAK membatalkan puasa karena bukan makan-minum dan tidak mengenyangkan tubuh.",
            shamelaUrl: "https://shamela.ws/book/7288"
          }
        ],
        faedahSantri: "Kafarat Jimak di Siang Ramadhan: Siapa yang melakukan hubungan badan di siang hari Ramadhan dengan sengaja saat berpuasa, wajib membayar kafarat 'uzhma: (1) Memerdekakan budak, jika tak mampu (2) Puasa dua bulan berturut-turut, jika tak mampu (3) Memberi makan 60 orang miskin."
      },
      {
        id: "sy_02",
        pasalNumber: 2,
        subTitle: "Iktikaf & Syarat Kesempurnaannya di Masjid",
        dhabitArab: "الضَّابِطُ الثَّانِي: الاِعْتِكَافُ لُزُومُ مَسْجِدٍ لِطَاعَةِ اللَّهِ تَعَالَى",
        dhabitTerjemah: "Kaidah Pokok Ke-2: Iktikaf adalah berdiam diri di dalam masjid untuk ketaatan kepada Allah Ta'ala.",
        matanArab: "شُرُوطُ الاِعْتِكَافِ: (١) الإِسْلَامُ، (٢) العَقْلُ، (٣) التَّمْيِيزُ، (٤) النِّيَّةُ، (٥) أَنْ يَكُونَ فِي مَسْجِدٍ تُقَامُ فِيهِ الجَمَاعَةُ. وَيَبْطُلُ بِالخُرُوجِ مِنَ المَسْجِدِ لِغَيْرِ حَاجَةٍ ضَرُورِيَّةٍ (كَقَضَاءِ حَاجَةٍ أَوْ إِحْضَارِ طَعَامٍ)، وَبِالجِمَاعِ، وَبِزَوَالِ العَقْلِ.",
        matanTerjemah: "Syarat-syarat iktikaf: (1) Islam, (2) Berakal, (3) Tamyiz, (4) Niat beriktikaf, (5) Dilakukan di dalam masjid yang didirikan shalat berjamaah. Iktikaf batal jika keluar dari area masjid tanpa kebutuhan yang sangat mendesak (seperti buang hajat atau mengambil makanan jika tak ada yang mengantarkan), batal karena jimak, dan hilang akal.",
        dalilNaqli: [
          {
            teksArab: "وَلَا تُبَاشِرُوهُنَّ وَأَنتُمْ عَاكِفُونَ فِي الْمَسَاجِدِ",
            terjemah: "\"Dan janganlah kamu campuri mereka (istrimu), sedang kamu beriktikaf dalam masjid.\" (QS. Al-Baqarah: 187)",
            sumber: "QS. Al-Baqarah: 187"
          },
          {
            teksArab: "أَنَّ النَّبِيَّ ﷺ كَانَ يَعْتَكِفُ العَشْرَ الأَوَاخِرَ مِنْ رَمَضَانَ حَتَّى تَوَفَّاهُ اللَّهُ",
            terjemah: "\"Bahwasanya Nabi SAW senantiasa beriktikaf pada sepuluh hari terakhir bulan Ramadhan hingga beliau diwafatkan oleh Allah.\" (HR. Al-Bukhari no. 2026 & Muslim no. 1172)",
            sumber: "HR. Bukhari no. 2026 & Muslim no. 1172"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Fathul Qarib hal. 27",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Iktikaf sah meski sesaat (lahzhah / seukuran thuma'ninah shalat) dengan niat iktikaf di masjid mana pun. Tidak disyaratkan harus berpuasa saat iktikaf menurut madzhab Syafi'i.",
            shamelaUrl: "https://shamela.ws/book/11425/27"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/192",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Disyaratkan di masjid yang didirikan shalat berjamaah agar ia tidak perlu keluar meninggalkan iktikafnya saat waktu shalat lima waktu tiba. Boleh iktikaf tanpa puasa.",
            shamelaUrl: "https://shamela.ws/book/11568/192"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/128",
            statusQaul: "Disyaratkan Berpuasa",
            penjelasanHukum: "Iktikaf wajib (nazar) mensyaratkan puasa. Bagi wanita, lebih utama beriktikaf di ruang khusus shalat di dalam rumahnya (Masjid baitiha).",
            shamelaUrl: "https://shamela.ws/book/11571/128"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Al-Mudawwanah",
            penulis: "Syaikh Khalil & Imam Malik",
            halamanJilid: "Bidayatul Mujtahid 1/310",
            statusQaul: "Minimal Sehari Semalam",
            penjelasanHukum: "Mazhab Maliki mensyaratkan puasa saat beriktikaf, dan durasi minimal iktikaf menurut Malik adalah sehari semalam (yaum wa lailah).",
            shamelaUrl: "https://shamela.ws/book/21741/310"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Nailul Authar",
            penulis: "Asy-Syaukani",
            halamanJilid: "Nailul Authar 4/290",
            statusQaul: "Sunnah Muakkadah",
            penjelasanHukum: "Waktu masuk iktikaf sepuluh terakhir Ramadhan yang paling utama adalah sebelum terbenam matahari malam ke-21 Ramadhan, guna mengejar kemuliaan Lailatul Qadar.",
            shamelaUrl: "https://shamela.ws/book/21744/290"
          }
        ],
        faedahSantri: "Adab Iktikaf: Mengisi waktu dengan tilawah Al-Qur'an, dzikir, qiyamul lail, istighfar, dan meninggalkan perdebatan atau kesibukan bermain ponsel/gadget yang melalaikan tujuan iktikaf."
      }
    ]
  },

  // ==========================================
  // 5. KITAB AL-HAJJ WAL 'UMRAH (كِتَابُ الحَجِّ)
  // ==========================================
  {
    id: "hajj",
    titleArab: "كِتَابُ الحَجِّ وَالعُمْرَةِ",
    titleIndo: "Kitab Haji & Umrah (Tamu Allah)",
    deskripsi: "Penyempurna rukun Islam kelima ke Baitullah Al-Haram, mengupas syarat istitha'ah, miqat zamani dan makani, ihram, 4 rukun haji, 7 wajib haji, larangan ihram, dan dam kafarat.",
    iconName: "ShieldCheck",
    totalPasal: 2,
    passages: [
      {
        id: "hj_01",
        pasalNumber: 1,
        subTitle: "Empat Rukun Haji & Tujuh Wajib Haji",
        dhabitArab: "الضَّابِطُ الأَوَّلُ: أَرْكَانُ الحَجِّ أَرْبَعَةٌ، وَوَاجِبَاتُهُ سَبْعَةٌ",
        dhabitTerjemah: "Kaidah Pokok Ke-1: Rukun haji ada empat perkara, dan wajib haji ada tujuh perkara.",
        matanArab: "أَرْكَانُ الحَجِّ أَرْبَعَةٌ لَا يَصِحُّ الحَجُّ إِلَّا بِهَا وَلَا يُجْبَرُ تَرْكُهَا بِدَمٍ: (١) الإِحْرَامُ (النِّيَّةُ)، (٢) الوُقُوفُ بِعَرَفَةَ، (٣) طَوَافُ الإِفَاضَةِ، (٤) السَّعْيُ بَيْنَ الصَّفَا وَالمَرْوَةِ. وَوَاجِبَاتُ الحَجِّ سَبْعَةٌ مَنْ تَرَكَ مِنْهَا شَيْئًا لَزِمَهُ دَمٌ: (١) الإِحْرَامُ مِنَ المِيقَاتِ، (٢) الوُقُوفُ بِعَرَفَةَ إِلَى اللَّيْلِ، (٣) المَبِيتُ بِمُزْدَلِفَةَ، (٤) المَبِيتُ بِمِنًى لَيَالِيَ التَّشْرِيقِ، (٥) رَمْيُ الجِمَارِ، (٦) الحَلْقُ أَوِ التَّقْصِيرُ، (٧) طَوَافُ الوَدَاعِ.",
        matanTerjemah: "Rukun haji ada empat yang tidak sah haji tanpanya dan tidak dapat ditebus dengan dam: (1) Ihram (niat memasuki ibadah haji), (2) Wukuf di Arafah (puncaknya tanggal 9 Dzulhijjah), (3) Thawaf Ifadhah, (4) Sa'i antara Shafa dan Marwah. Sedangkan wajib haji ada tujuh yang jika salah satunya tertinggal, hajinya tetap sah namun wajib membayar dam (menyembelih seekor kambing): (1) Ihram dari miqat makani yang ditentukan, (2) Wukuf di Arafah hingga terbenam matahari, (3) Mabit di Muzdalifah pada malam nahr, (4) Mabit di Mina pada malam-malam tasyriq, (5) Melontar jumrah (Ula, Wustha, Aqabah), (6) Bercukur gundul (halq) atau memendekkan rambut (taqshir), (7) Thawaf Wada' saat hendak meninggalkan kota suci Makkah.",
        dalilNaqli: [
          {
            teksArab: "الحَجُّ عَرَفَةُ",
            terjemah: "\"Haji itu adalah wukuf di Arafah.\" (HR. At-Tirmidzi no. 889, Abu Dawud, Shahih)",
            sumber: "HR. At-Tirmidzi no. 889"
          },
          {
            teksArab: "وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ",
            terjemah: "\"Dan hendaklah mereka melakukan thawaf di sekeliling Baitul 'Atiq (Baitullah Ka'bah).\" (QS. Al-Hajj: 29)",
            sumber: "QS. Al-Hajj: 29"
          },
          {
            teksArab: "مَنْ تَرَكَ نُسُكًا أَوْ نَسِيَهُ فَلْيُهْرِقْ دَمًا",
            terjemah: "\"Barangsiapa meninggalkan salah satu manasik wajib atau melupakannya, maka hendaklah ia menumpahkan darah (menyembelih dam).\" (Atsar Shahih Ibnu Abbas, riwayat Malik dalam Al-Muwaththa')",
            sumber: "Al-Muwaththa' 1/422"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Fathul Qarib hal. 28, Minhaj 1/75",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Rukun haji dalam mazhab Syafi'i dihitung ada 6: (1) Ihram, (2) Wukuf di Arafah, (3) Thawaf Ifadhah, (4) Sa'i, (5) Halq/Taqshir (mencukur rambut dimasukkan sebagai rukun, bukan sekadar wajib), (6) Tertib di sebagian besar rukun. Thawaf Wada' dihukumi wajib yang bila ditinggalkan kena dam.",
            shamelaUrl: "https://shamela.ws/book/11559/75"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Zaad Al-Mustaqni'",
            penulis: "Ibnu Duwayyan & Al-Hajjawi",
            halamanJilid: "Manar As-Sabil 1/205, Zaad 1/50",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Rukun ada 4 persis seperti matan Bidayatul Mutafaqqih. Halq/Taqshir diklasifikasikan sebagai wajib haji, bukan rukun. Wukuf di Arafah mencukupi kapan saja sejak fajar hari Arafah hingga terbit fajar hari Nahr (10 Dzulhijjah).",
            shamelaUrl: "https://shamela.ws/book/11568/205"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Al-Mabsuth",
            penulis: "Al-Marghinani & As-Sarakhsi",
            halamanJilid: "Al-Hidayah 1/135",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Rukun fardhu haji menurut Hanafi hanya 2: Wukuf di Arafah dan Thawaf Ifadhah (sebanyak 4 putaran pertama). Sa'i antara Shafa dan Marwah berstatus WAJIB (bila tertinggal ditebus dam, hajinya tetap sah).",
            shamelaUrl: "https://shamela.ws/book/11571/135"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Bidayatul Mujtahid",
            penulis: "Syaikh Khalil & Ibnu Rusyd",
            halamanJilid: "Bidayatul Mujtahid 1/330",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Rukun haji ada 4: Ihram, Thawaf, Sa'i, dan Wukuf. Wukuf di Arafah disyaratkan mengambil sebagian waktu malam setelah terbenam matahari.",
            shamelaUrl: "https://shamela.ws/book/21741/330"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Nailul Authar & Al-Mughni",
            penulis: "Asy-Syaukani & Ibnu Qudamah",
            halamanJilid: "Nailul Authar 5/12, Al-Mughni 3/250",
            statusQaul: "Tahqiq Manasik Nabawi",
            penjelasanHukum: "Hadits Jabir bin Abdillah radhiyallahu 'anhu dalam Shahih Muslim no. 1218 adalah naskah rujukan terlengkap yang mendeskripsikan secara kronologis seluruh gerak manasik Haji Wada' Rasulullah SAW dari Madinah hingga tahallul.",
            shamelaUrl: "https://shamela.ws/book/21744/12"
          }
        ],
        faedahSantri: "Perbedaan Rukun vs Wajib Haji: Rukun bila tertinggal haji BATAL dan tidak bisa diganti dam (harus mengulang tahun depan). Wajib haji bila tertinggal hajinya TETAP SAH namun harus membayar dam seekor kambing."
      },
      {
        id: "hj_02",
        pasalNumber: 2,
        subTitle: "Larangan-Larangan Ihram (Mahzhurat Al-Ihram)",
        dhabitArab: "الضَّابِطُ الثَّانِي: مَحْظُورَاتُ الإِحْرَامِ تِسْعَةٌ",
        dhabitTerjemah: "Kaidah Pokok Ke-2: Larangan-larangan ihram ada sembilan perkara.",
        matanArab: "مَحْظُورَاتُ الإِحْرَامِ: (١) حَلْقُ الشَّعْرِ، (٢) تَقْلِيمُ الأَظَافِرِ، (٣) تَغْطِيَةُ الرَّأْسِ لِلرَّجُلِ بِمُلَاصِقٍ، (٤) لُبْسُ المَخِيطِ لِلرَّجُلِ، (٥) الطِّيبُ فِي البَدَنِ أَوِ الثَّوْبِ، (٦) قَتْلُ صَيْدِ البَرِّ، (٧) عَقْدُ النِّكَاحِ، (٨) المُبَاشَرَةُ لِشَهْوَةٍ، (٩) الجِمَاعُ (وَهُوَ أَعْظَمُهَا يُفْسِدُ الحَجَّ قَبْلَ التَّحَلُّلِ الأَوَّلِ).",
        matanTerjemah: "Larangan-larangan ihram ada sembilan: (1) Mencukur rambut kepala atau bulu badan, (2) Memotong kuku, (3) Menutup kepala bagi laki-laki dengan penutup yang menempel (seperti peci/topi), (4) Mengenakan pakaian berjahit yang membentuk lekuk tubuh bagi laki-laki (seperti kemeja, celana, celana dalam), (5) Memakai wewangian di badan atau pakaian ihram, (6) Berburu hewan darat liar yang halal dimakan, (7) Akad nikah (melakukan akad atau menikahkan orang lain), (8) Bercumbu dengan syahwat tanpa jimak, (9) Berhubungan badan (jimak): merupakan larangan terberat yang merusak/membatalkan haji jika dilakukan sebelum tahallul pertama.",
        dalilNaqli: [
          {
            teksArab: "وَلَا تَحْلِقُوا رُءُوسَكُمْ حَتَّىٰ يَبْلُغَ الْهَدْيُ مَحِلَّهُ",
            terjemah: "\"Dan jangan kamu mencukur kepalamu, sebelum korban sampai di tempat penyembelihannya.\" (QS. Al-Baqarah: 196)",
            sumber: "QS. Al-Baqarah: 196"
          },
          {
            teksArab: "لَا يَنْكِحُ المُحْرِمُ وَلَا يُنْكَحُ وَلَا يَخْطُبُ",
            terjemah: "\"Orang yang sedang berihram tidak boleh menikah, tidak boleh menikahkan, dan tidak boleh meminang.\" (HR. Muslim no. 1409)",
            sumber: "HR. Muslim no. 1409"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Fathul Qarib hal. 29",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Bila memotong 3 helai rambut atau 3 kuku berturut-turut dikenai Fidyah pilihan: Puasa 3 hari, memberi makan 6 orang miskin (masing-masing 1/2 sha'), atau menyembelih seekor kambing. Wanita dilarang menutup wajah dengan cadar niqab dan dilarang memakai sarung tangan saat ihram.",
            shamelaUrl: "https://shamela.ws/book/11425/29"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/215, Al-Mughni 3/280",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Laki-laki boleh berteduh di bawah payung, tenda, atau atap mobil karena tidak menempel di kepala. Sabuk pengikat kain ihram dan sandal yang tidak menutupi mata kaki dibolehkan.",
            shamelaUrl: "https://shamela.ws/book/11568/215"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Raddul Muhtar",
            penulis: "Al-Marghinani & Ibnu Abidin",
            halamanJilid: "Al-Hidayah 1/142",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "Akad nikah saat ihram sah menurut Abu Hanifah (karena hadits Ibnu Abbas yang menyebut Nabi SAW menikahi Maimunah saat ihram), namun mayoritas ulama 3 mazhab menganggap akad nikah batal berdasarkan riwayat shahih Maimunah sendiri di Shahih Muslim.",
            shamelaUrl: "https://shamela.ws/book/11571/142"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Mukhtashar Khalil & Bidayatul Mujtahid",
            penulis: "Syaikh Khalil & Ibnu Rusyd",
            halamanJilid: "Bidayatul Mujtahid 1/345",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Wewangian yang tersisa aromanya sebelum ihram makruh menurut Malik bila masih berbekas setelah niat ihram.",
            shamelaUrl: "https://shamela.ws/book/21741/345"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Subulus Salam & Nailul Authar",
            penulis: "Ash-Shan'ani & Asy-Syaukani",
            halamanJilid: "Subulus Salam 2/220",
            statusQaul: "Tarjih Dalil Hadits",
            penjelasanHukum: "Hadits Ka'ab bin Ujrah radhiyallahu 'anhu saat kutu kepalanya berjatuhan menjadi landasan fidyah takhyir (boleh memilih puasa 3 hari, fidyah makan 6 miskin, atau kambing) bagi siapa saja yang terpaksa melanggar karena udzur medis.",
            shamelaUrl: "https://shamela.ws/book/21743/220"
          }
        ],
        faedahSantri: "Dua Tahallul: (1) Tahallul Awwal: Diperoleh setelah mengerjakan 2 dari 3 amalan (lempar jumrah aqabah, mencukur rambut, thawaf ifadhah), dengannya halal seluruh larangan ihram KECUALI wanita (hubungan suami-istri). (2) Tahallul Tsani: Setelah menyelesaikan ketiganya, dengannya halal seluruh larangan termasuk hubungan suami-istri."
      }
    ]
  },

  // ==========================================
  // 6. KITAB AL-BUYU' WAL MU'AMALAT (كِتَابُ البُيُوعِ)
  // ==========================================
  {
    id: "buyu",
    titleArab: "كِتَابُ البُيُوعِ وَالمُعَامَلَاتِ",
    titleIndo: "Kitab Jual Beli & Muamalah",
    deskripsi: "Pilar transaksi peradaban syariah, mengatur syarat sah jual beli, hak khiyar konsumen, pencegahan riba fadhl dan nasi'ah, akad salam, syirkah, dan prinsip keridhaan.",
    iconName: "CreditCard",
    totalPasal: 2,
    passages: [
      {
        id: "by_01",
        pasalNumber: 1,
        subTitle: "Rukun Jual Beli, Syarat Sah & Hak Khiyar",
        dhabitArab: "الضَّابِطُ الأَوَّلُ: الأَصْلُ فِي المُعَامَلَاتِ الإِبَاحَةُ إِلَّا مَا دَلَّ الدَّلِيلُ عَلَى تَحْرِيمِهِ",
        dhabitTerjemah: "Kaidah Pokok Ke-1: Hukum asal dalam transaksi muamalah adalah halal dan boleh, kecuali apa yang ada dalil tegas yang mengharamkannya.",
        matanArab: "أَرْكَانُ البَيْعِ ثَلَاثَةٌ: (١) العَاقِدَانِ (البَائِعُ وَالمُشْتَرِي)، (٢) المَعْقُودُ عَلَيْهِ (الثَّمَنُ وَالمُثْمَنُ)، (٣) الصِّيغَةُ (الإِيجَابُ وَالقَبُولُ). وَشُرُوطُهُ: الرِّضَا، الرُّشْدُ، مِلْكُ العَيْنِ أَوِ الإِذْنُ فِيهَا، القُدْرَةُ عَلَى التَّسْلِيمِ، مَعْرِفَةُ المَبِيعِ وَالثَّمَنِ عِلْمًا يَنْفِي الجَهَالَةَ، وَأَنْ يَكُونَ مِمَّا يُبَاحُ نَفْعُهُ مُطْلَقًا. وَيَثْبُتُ الخِيَارُ: خِيَارُ المَجْلِسِ، وَخِيَارُ الشَّرْطِ، وَخِيَارُ العَيْبِ.",
        matanTerjemah: "Tiga rukun jual-beli: (1) Dua pihak yang berakad (penjual dan pembeli), (2) Objek akad (harga dan barang), (3) Shighah (ijab dan qabul, baik dengan ucapan maupun mu'athah/tindakan saling serah-terima). Syarat sah jual beli: (a) Saling ridha, (b) Mukallaf dan rasyid (cerdas mengelola uang), (c) Barang milik penjual atau telah diizinkan oleh pemiliknya, (d) Mampu diserahterimakan (bukan ikan lepas di laut atau burung di udara), (e) Barang dan harga diketahui jelas tanpa gharar/ketidakpastian, (f) Objek memiliki manfaat yang mubah secara syariat. Konsumen memiliki hak khiyar (hak memilih melanjutkan atau membatalkan): Khiyar Majlis (selama belum berpisah tempat), Khiyar Syarat (masa peninjauan yang disepakati), dan Khiyar 'Aib (bila ditemukan cacat tersembunyi pada barang).",
        dalilNaqli: [
          {
            teksArab: "وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا",
            terjemah: "\"Dan Allah telah menghalalkan jual-beli dan mengharamkan riba.\" (QS. Al-Baqarah: 275)",
            sumber: "QS. Al-Baqarah: 275"
          },
          {
            teksArab: "إِنَّمَا البَيْعُ عَنْ تَرَاضٍ",
            terjemah: "\"Sesungguhnya jual beli itu hanyalah sah apabila didasari suka sama suka (saling ridha).\" (HR. Ibnu Majah no. 2185, Shahih)",
            sumber: "HR. Ibnu Majah no. 2185"
          },
          {
            teksArab: "البَيِّعَانِ بِالخِيَارِ مَا لَمْ يَتَفَرَّقَا",
            terjemah: "\"Dua orang yang berjual-beli memiliki hak khiyar selama keduanya belum berpisah raga.\" (HR. Al-Bukhari no. 2079 & Muslim no. 1531)",
            sumber: "HR. Bukhari no. 2079 & Muslim no. 1531"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Minhajut Thalibin & Fathul Qarib",
            penulis: "Imam An-Nawawi & Ibnu Qasim",
            halamanJilid: "Fathul Qarib hal. 30, Minhaj 1/82",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "Akad jual beli mu'athah (transaksi supermarket tanpa ijab qabul lisan) dibolehkan dan disahkan oleh Imam An-Nawawi untuk barang-barang bernilai kecil maupun besar. Hak khiyar majlis berlaku mutlak sampai kedua pihak berpisah badan dari tempat akad.",
            shamelaUrl: "https://shamela.ws/book/11425/30"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/230, Al-Mughni 4/5",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "Mazhab Hanbali mengakui 8 macam hak khiyar (termasuk khiyar ghabn bila ada manipulasi harga ekstrem, khiyar tadlis bila ada penipuan kosmetik barang). Jual beli barang yang belum ada di tangan penjual dilarang berdasar sabda Nabi SAW: 'Laa tabi' maa laisa 'indaka'.",
            shamelaUrl: "https://shamela.ws/book/11568/230"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Al-Mabsuth",
            penulis: "Al-Marghinani & As-Sarakhsi",
            halamanJilid: "Al-Hidayah 2/12",
            statusQaul: "Tidak Ada Khiyar Majlis",
            penjelasanHukum: "Mazhab Hanafi berpendapat TIDAK ADA Khiyar Majlis setelah ijab dan qabul diucapkan (akad langsung mengikat mengunci seketika). Sabda 'maa lam yatafarraqa' ditakwil Hanafi sebagai berpisah ucapan kata, bukan berpisah fisik badan.",
            shamelaUrl: "https://shamela.ws/book/11571/12"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Bidayatul Mujtahid & Al-Mudawwanah",
            penulis: "Ibnu Rusyd & Imam Malik",
            halamanJilid: "Bidayatul Mujtahid 2/105",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "Mazhab Maliki juga menolak khiyar majlis dengan landasan 'Amal Ahlil Madinah (amalan penduduk Madinah yang menganggap jual beli mengikat langsung begitu disepakati). Namun mengakui khiyar syarat dan khiyar 'aib.",
            shamelaUrl: "https://shamela.ws/book/21741/105"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Subulus Salam & Nailul Authar",
            penulis: "Ash-Shan'ani & Asy-Syaukani",
            halamanJilid: "Subulus Salam 3/15",
            statusQaul: "Kekuatan Dalil Hadits",
            penjelasanHukum: "Hadits Ibnu Umar tentang khiyar majlis berderajat mutawatir ma'nawi di mana Ibnu Umar sendiri mempraktikkan berjalan beberapa langkah jika ingin mengikat jual beli tersebut secara permanen. Pendapat Syafi'i dan Ahmad terbukti paling kuat secara teks dalil hadits.",
            shamelaUrl: "https://shamela.ws/book/21743/15"
          }
        ],
        faedahSantri: "Jual Beli Online Modern: Sah menurut fukaha kontemporer apabila deskripsi spesifikasi barang (katalog, foto asli, dimensi, bahan) dijelaskan secara presisi dan pembeli diberikan hak 'khiyar ru'yah' (opsi retur pengembalian barang jika barang yang tiba tidak sesuai deskripsi)."
      },
      {
        id: "by_02",
        pasalNumber: 2,
        subTitle: "Hukum Riba: Riba Fadhl & Riba Nasi'ah",
        dhabitArab: "الضَّابِطُ الثَّانِي: كُلُّ قَرْضٍ جَرَّ مَنْفَعَةً فَهُوَ رِبًا",
        dhabitTerjemah: "Kaidah Pokok Ke-2: Setiap pinjaman (utang piutang) yang menarik keuntungan atau manfaat bersyarat bagi kreditur, maka itu adalah riba.",
        matanArab: "الرِّبَا مُحَرَّمٌ بِالكِتَابِ وَالسُّنَّةِ وَالإِجْمَاعِ، وَهُوَ نَوْعَانِ: (١) رِبَا الفَضْلِ: بَيْعُ المَالِ الرِّبَوِيِّ بِجِنْسِهِ مَعَ التَّفَاضُلِ، (٢) رِبَا النَّسِيئَةِ: بَيْعُ المَالِ الرِّبَوِيِّ بِمَالٍ رِبَوِيٍّ مَعَ تَأْخِيرِ القَبْضِ. وَالأَصْنَافُ الرِّبَوِيَّةُ السِّتَّةُ المَنْصُوصَةُ: الذَّهَبُ، وَالفِضَّةُ، وَالبُرُّ، وَالشَّعِيرُ، وَالتَّمْرُ، وَالمِلْحُ. فَإِذَا اتَّحَدَ الجِنْسُ شُرِطَ التَّمَاثُلُ وَالتَّقَابُضُ، وَإِذَا اخْتَلَفَ الجِنْسُ وَاتَّحَدَتِ العِلَّةُ شُرِطَ التَّقَابُضُ فَقَطْ.",
        matanTerjemah: "Riba diharamkan berdasarkan Al-Qur'an, Sunnah, dan Ijma'. Riba terbagi menjadi dua pokok: (1) Riba Fadhl: Menukar komoditas ribawi dengan komoditas sejenis dengan adanya kelebihan takaran/timbangan (misal: menukar 10 gram emas lama dengan 9 gram emas baru), (2) Riba Nasi'ah: Menukar komoditas ribawi dengan penundaan serah terima waktu (tempo) atau bunga tempo pinjaman uang. Enam komoditas ribawi yang ditegaskan dalam hadits: Emas, Perak, Gandum halus (burr), Gandum kasar (sya'ir), Kurma, dan Garam. Aturan pertukaran: Jika jenisnya sama, disyaratkan sama takaran/timbangannya (tamatsul) dan tunai di tempat (taqabudh). Jika jenisnya berbeda namun satu 'illat (seperti emas ditukar perak, atau gandum ditukar kurma), boleh berbeda jumlah namun wajib diserahterimakan tunai (taqabudh) di majlis akad.",
        dalilNaqli: [
          {
            teksArab: "يَمْحَقُ اللَّهُ الرِّبَا وَيُرْبِي الصَّدَقَاتِ",
            terjemah: "\"Allah memusnahkan riba dan menyuburkan sedekah.\" (QS. Al-Baqarah: 276)",
            sumber: "QS. Al-Baqarah: 276"
          },
          {
            teksArab: "الذَّهَبُ بِالذَّهَبِ، وَالفِضَّةُ بِالفِضَّةِ، وَالبُرُّ بِالبُرِّ، وَالشَّعِيرُ بِالشَّعِيرِ، وَالتَّمْرُ بِالتَّمْرِ، وَالمِلْحُ بِالمِلْحِ، مِثْلًا بِمِثْلٍ، سَوَاءً بِسَوَاءٍ، يَدًا بِيَدٍ، فَإِذَا اخْتَلَفَتْ هَذِهِ الأَصْنَافُ فَبِيعُوا كَيْفَ شِئْتُمْ إِذَا كَانَ يَدًا بِيَدٍ",
            terjemah: "\"Emas dengan emas, perak dengan perak, gandum dengan gandum, jelai dengan jelai, kurma dengan kurma, garam dengan garam, harus semisal dengan semisal, sama dengan sama, tunai dari tangan ke tangan. Jika berbeda jenis-jenis ini, maka juallah sesuka kalian asalkan tunai dari tangan ke tangan.\" (HR. Muslim no. 1587 dari Ubadah bin Ash-Shamit)",
            sumber: "HR. Muslim no. 1587"
          }
        ],
        runutanFiqh: [
          {
            mazhab: "Syafi'i",
            kitabRujukan: "Al-Umm & Minhajut Thalibin",
            penulis: "Imam Asy-Syafi'i & Imam An-Nawawi",
            halamanJilid: "Al-Umm 3/12, Minhaj 1/86",
            statusQaul: "Mu'tamad Syafi'iyyah",
            penjelasanHukum: "'Illat hukum riba dalam mazhab Syafi'i ada 2: (1) Ats-Tsamaniyyah (satuan harga/alat tukar mutlak: emas dan perak, diqiyaskan uang kertas hari ini), (2) Ath-Thu'm (makanan yang dikonsumsi manusia untuk pokok, lauk, buah, atau obat). Menukar beras dengan beras harus sama timbangannya dan tunai.",
            shamelaUrl: "https://shamela.ws/book/11559/86"
          },
          {
            mazhab: "Hanbali",
            kitabRujukan: "Manar As-Sabil & Al-Mughni",
            penulis: "Ibnu Duwayyan & Ibnu Qudamah",
            halamanJilid: "Manar As-Sabil 1/238, Al-Mughni 4/125",
            statusQaul: "Mu'tamad Hanabilah",
            penjelasanHukum: "'Illat riba menurut mazhab Hanbali adalah Al-Kayl (ditakar) atau Al-Wazn (ditimbang) bersamaan dengan makanan atau tsamaniyyah. Bunga bank konvensional dan denda keterlambatan pinjaman masuk dalam kategori Riba Jahiliyyah (Nasi'ah) yang haram secara qath'i.",
            shamelaUrl: "https://shamela.ws/book/11568/238"
          },
          {
            mazhab: "Hanafi",
            kitabRujukan: "Al-Hidayah & Bada'i' Ash-Sana'i'",
            penulis: "Al-Marghinani & Al-Kasani",
            halamanJilid: "Al-Hidayah 2/25",
            statusQaul: "Mu'tamad Hanafiyyah",
            penjelasanHukum: "'Illat riba menurut Hanafi adalah Qadr (takaran atau timbangan) yang disertai kesamaan jenis (jins). Setiap komoditas yang ditakar atau ditimbang (termasuk besi atau semen) terkena hukum riba fadhl bila ditukar sejenis.",
            shamelaUrl: "https://shamela.ws/book/11571/25"
          },
          {
            mazhab: "Maliki",
            kitabRujukan: "Bidayatul Mujtahid & Al-Mudawwanah",
            penulis: "Ibnu Rusyd & Imam Malik",
            halamanJilid: "Bidayatul Mujtahid 2/130",
            statusQaul: "Mu'tamad Malikiyyah",
            penjelasanHukum: "'Illat riba pada makanan menurut Maliki adalah Al-Iqqtiyat wad-Dikhkhar (makanan pokok yang disimpan lama dan menjadi penopang hidup seperti beras, gandum, kurma).",
            shamelaUrl: "https://shamela.ws/book/21741/130"
          },
          {
            mazhab: "Fiqh Hadits / Tarjih",
            kitabRujukan: "Buhuts fi Qadhaya Fiqhiyyah Mu'ashirah & DSN-MUI",
            penulis: "Syaikh Taqi Utsmani & Dewan Syariah Nasional",
            halamanJilid: "Buhuts Fiqhiyyah 1/140",
            statusQaul: "Fatwa Perbankan Syariah Global",
            penjelasanHukum: "Ijma' lembaga fiqih internasional (Majma' Al-Fiqh Al-Islami OKI Jeddah): Bunga bank konvensional (interest/faidah) adalah riba nasi'ah yang diharamkan syariat Islam. Solusinya adalah akad syirkah mudharabah, musyarakah, murabahah bil-wakalah, dan ijarah muntahiya bit-tamlik.",
            shamelaUrl: "https://waqfeya.net"
          }
        ],
        faedahSantri: "Tukar Tambah Emas: Sering terjadi di toko emas: menukar gelang emas lama seberat 10 gram ditambah uang Rp 300.000 untuk mendapatkan gelang baru 10 gram. Ini adalah RIBA FADHL. Cara syar'inya: Jual dahulu gelang lama secara tunai, terima uangnya, lalu beli gelang baru dengan akad terpisah."
      }
    ]
  }
];
