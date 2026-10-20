export interface SecondarySource {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  uri: string;
  externalLink?: string;
  locationDetail?: string;
  mazhab?: string;
  era?: string;
}

export const secondarySources: SecondarySource[] = [
  // ==========================================
  // GOOGLE DRIVE CLOUD REPOSITORI TAFSIR & FIQH
  // ==========================================
  {
    id: "gdrive_turats_fiqh",
    title: "Koleksi Khazanah Fiqh 4 Mazhab & Tafsir Hukum (Drive Cloud)",
    author: "Repositori Turats & Ahkam Islam Cloud",
    category: "Google Drive Cloud Repository",
    mazhab: "4 Mazhab & Ayatul Ahkam",
    era: "Klasik & Kontemporer",
    content: "Folder repositori digital cloud Google Drive (ID: 1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq) yang memuat naskah pdf rujukan fiqh perbandingan, kitab-kitab tafsir ayat ahkam (Ahkam Al-Qur'an Al-Jashshash, Ibnu Al-Arabi, Al-Kiya Al-Harrasi, Al-Qurthubi, As-Sabuni), takhrij hadits, dan risalah hukum Islam.",
    uri: "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
    externalLink: "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
    locationDetail: "Google Drive Folder 1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq"
  },
  {
    id: "fq_ahkam_jassas",
    title: "Ahkam Al-Qur'an (أحكام القرآن للجصاص)",
    author: "Al-Imam Abu Bakr Ahmad bin Ali Al-Jashshash Al-Hanafi (w. 370 H)",
    category: "Tafsir Ayat Ahkam Hanafi",
    mazhab: "Hanafi",
    era: "Klasik (Abad 4 H)",
    content: "Kitab induk tafsir hukum tertua dari mazhab Hanafi yang mengkaji ayat-ayat hukum dengan metode istinbath ushul, qiyas, dan dalalah lafazh haqiqah/majaz.",
    uri: "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
    externalLink: "https://shamela.ws/book/8378",
    locationDetail: "Google Drive & Dar Ihya At-Turats"
  },
  {
    id: "fq_ahkam_ibnularabi",
    title: "Ahkam Al-Qur'an (أحكام القرآن لابن العربي)",
    author: "Al-Qadhi Abu Bakr Ibnu Al-Arabi Al-Ma'afiri Al-Maliki (w. 543 H)",
    category: "Tafsir Ayat Ahkam Maliki",
    mazhab: "Maliki",
    era: "Klasik (Abad 6 H)",
    content: "Mahakarya tafsir hukum Mazhab Maliki yang memadukan lughah, hadits, atsar sahabat, serta 'Amal Ahlil Madinah dengan kritisisme ilmiah tajam.",
    uri: "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
    externalLink: "https://shamela.ws/book/8377",
    locationDetail: "Google Drive & Darul Ma'rifah"
  },
  {
    id: "fq_ahkam_kiya",
    title: "Ahkam Al-Qur'an (أحكام القرآن للكيا الهراسي)",
    author: "Al-Kiya Al-Harrasi Imaduddin Asy-Syafi'i (w. 504 H)",
    category: "Tafsir Ayat Ahkam Syafi'i",
    mazhab: "Syafi'i",
    era: "Klasik (Abad 6 H)",
    content: "Tafsir hukum mazhab Syafi'i paling representatif mendampingi Al-Umm, menjawab argumen mazhab lain dengan kaidah ushul Asy-Syafi'i.",
    uri: "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
    externalLink: "https://shamela.ws/book/8379",
    locationDetail: "Google Drive & Darul Kutub Al-Ilmiyyah"
  },
  {
    id: "fq_jami_qurtubi",
    title: "Al-Jami' li Ahkam Al-Qur'an (الجامع لأحكام القرآن للقرطبي)",
    author: "Al-Imam Abu Abdillah Al-Qurthubi (w. 671 H)",
    category: "Ensiklopedi Tafsir Ahkam 4 Mazhab",
    mazhab: "Muqaran 4 Mazhab",
    era: "Klasik (Abad 7 H)",
    content: "Ensiklopedi tafsir hukum terlengkap di dunia Islam (20+ jilid) yang menguraikan setiap ayat hukum dengan masalah-masalah fiqh, qira'at, dan tarjih objektif.",
    uri: "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
    externalLink: "https://shamela.ws/book/21711",
    locationDetail: "Google Drive & Muassasah Ar-Risalah"
  },
  {
    id: "fq_rawai_sabuni",
    title: "Rawa'i' Al-Bayan Tafsir Ayat Al-Ahkam (روائع البيان للصابوني)",
    author: "Syaikh Muhammad Ali Ash-Shabuni (w. 1442 H)",
    category: "Tafsir Ahkam Kontemporer 4 Mazhab",
    mazhab: "Sistematika Modern & 4 Mazhab",
    era: "Kontemporer",
    content: "Kitab tafsir hukum komparatif modern dengan 5 langkah: Kosakata, Asbabun Nuzul, Latha'if, Khilaf 4 Mazhab, dan Hikmatut Tasyri'.",
    uri: "https://drive.google.com/drive/folders/1WI-NCISZe9K2DKb6vFrJrUZXRdIuUgq",
    externalLink: "https://shamela.ws/book/8381",
    locationDetail: "Google Drive & Maktabah Al-Ghazali"
  },

  // ==========================================
  // KITAB DASAR RUJUKAN BIDAYATUL MUTAFAQIH
  // ==========================================
  {
    id: "fq_bidayah",
    title: "Bidayatul Mutafaqqih (بداية المتفقه)",
    author: "Syaikh Dr. Wahid bin Abdussalam Bali (حفظه الله)",
    category: "Matan Dhowabith Fiqhiyyah",
    mazhab: "Muqaran & Dhabit Fiqh",
    era: "Kontemporer",
    content: "Ringkasan kaidah, rumus/dhowabith fiqhiyyah dasar, dan dalil qath'i Al-Qur'an dan Sunnah yang merunut pada sistematika Manar As-Sabil serta memetakan kesepakatan dan perbedaan 4 mazhab fiqh.",
    uri: "https://shamela.ws/index.php/book/10904",
    externalLink: "https://shamela.ws/index.php/book/10904",
    locationDetail: "Dar Adh-Dhiya' Mesir & Pustaka Arafah"
  },
  {
    id: "fq_manar",
    title: "Manar As-Sabil fi Syarh Ad-Dalil (منار السبيل في شرح الدليل)",
    author: "Syaikh Ibrahim bin Muhammad bin Salim Ibnu Duwayyan (w. 1353 H)",
    category: "Fiqh Hanbali & Dalil Ahkam",
    mazhab: "Hanbali",
    era: "Klasik Akhir",
    content: "Kitab rujukan utama sistematika bab Bidayatul Mutafaqqih yang menyertakan dalil nash hadits shahih (ditakhrij oleh Syaikh Al-Albani dalam Irwa'ul Ghalil).",
    uri: "https://shamela.ws/book/11568",
    externalLink: "https://shamela.ws/book/11568",
    locationDetail: "Maktabah Al-Ma'arif Riyadh, 2 Jilid"
  },

  // ==========================================
  // MAZHAB ASY-SYAFI'I (المذهب الشافعي)
  // ==========================================
  {
    id: "fq_umm",
    title: "Kitab Al-Umm (كتاب الأم)",
    author: "Al-Imam Muhammad bin Idris Asy-Syafi'i (w. 204 H)",
    category: "Kitab Induk Fiqh Syafi'i",
    mazhab: "Syafi'i",
    era: "Salaf (Abad 3 H)",
    content: "Induk mahakarya fiqh mazhab Syafi'i (qaul jadid di Mesir) yang memuat metodologi istinbath langsung dari Al-Qur'an, Sunnah, Ijma', dan Qiyas dengan dialog hujjah ilmiah.",
    uri: "https://shamela.ws/book/11812",
    externalLink: "https://shamela.ws/book/11812",
    locationDetail: "Darul Ma'rifah Beirut, 8 Jilid"
  },
  {
    id: "fq_taqrib",
    title: "Matan Al-Ghayah wat-Taqrib / Matan Abi Syuja' (الغابة والتقريب)",
    author: "Al-Qadhi Abu Syuja' Ahmad bin Al-Hasan Al-Ishfahani (w. 593 H)",
    category: "Matan Fiqh Syafi'i Dasar",
    mazhab: "Syafi'i",
    era: "Klasik (Abad 6 H)",
    content: "Matan fiqih dasar terpopuler di pesantren dan madrasah Islam nusantara yang memaparkan pasal-pasal ibadah, muamalah, munakahat, dan jinayat secara ringkas dan presisi.",
    uri: "https://shamela.ws/book/21731",
    externalLink: "https://shamela.ws/book/21731",
    locationDetail: "Darul Kutub Al-Ilmiyyah Beirut"
  },
  {
    id: "fq_fathulqarib",
    title: "Fathul Qarib Al-Mujib fi Syarh Alfazh At-Taqrib (فتح القريب المجيب)",
    author: "Al-Allamah Syamsuddin Muhammad bin Qasim Al-Ghazi (w. 918 H)",
    category: "Syarah Fiqh Syafi'i",
    mazhab: "Syafi'i",
    era: "Pertengahan (Abad 10 H)",
    content: "Syarah standar muktamad atas Matan Abi Syuja' yang menguraikan definisi lafazh, batasan rukun, syarat sah, dan furu' hukum fiqh praktis sehari-hari.",
    uri: "https://shamela.ws/book/11425",
    externalLink: "https://shamela.ws/book/11425",
    locationDetail: "Dar Ibni Hazm Beirut"
  },
  {
    id: "fq_minhaj",
    title: "Minhajut Thalibin wa 'Umdatul Muftin (منهاج الطالبين وعمدة المفتين)",
    author: "Al-Imam Abu Zakariya Yahya bin Syaraf An-Nawawi (w. 676 H)",
    category: "Matan Fiqh Muktamad Fatwa",
    mazhab: "Syafi'i",
    era: "Klasik (Abad 7 H)",
    content: "Kitab pegangan fatwa tertinggi mazhab Syafi'i yang menetapkan rajih (al-ashahh, al-azhhar, al-madzhab) atas perbedaan pendapat di kalangan ashab Asy-Syafi'i.",
    uri: "https://shamela.ws/book/11559",
    externalLink: "https://shamela.ws/book/11559",
    locationDetail: "Darul Fikr Beirut"
  },
  {
    id: "fq_majmu",
    title: "Al-Majmu' Syarah Al-Muhadzdzab (المجموع شرح المهذب)",
    author: "Al-Imam An-Nawawi (w. 676 H) & Taqiyuddin As-Subki (w. 756 H)",
    category: "Ensiklopedia Fiqh Komparatif",
    mazhab: "Syafi'i & Perbandingan Mazhab",
    era: "Klasik (Abad 7-8 H)",
    content: "Ensiklopedia fiqh terbesar mazhab Syafi'i yang mengulas hadits ahkam dengan takhrij sanad teliti serta komparasi detail dengan mazhab Abu Hanifah, Malik, dan Ahmad.",
    uri: "https://shamela.ws/book/21735",
    externalLink: "https://shamela.ws/book/21735",
    locationDetail: "Darul Fikr Beirut, 20 Jilid"
  },
  {
    id: "fq_kifayah",
    title: "Kifayatul Akhyar fi Halli Ghayatil Ikhtishar (كفاية الأخيار)",
    author: "Al-Imam Taqiyuddin Abu Bakr bin Muhammad Al-Hishni (w. 829 H)",
    category: "Syarah Fiqh Berdalil",
    mazhab: "Syafi'i",
    era: "Pertengahan (Abad 9 H)",
    content: "Syarah Matan Abi Syuja' yang diperkaya dengan penyebutan dalil ayat, hadits riwayat Bukhari-Muslim, ta'lil akal, serta fatwa-fatwa Imam Nawawi dan Ar-Rafi'i.",
    uri: "https://shamela.ws/book/11426",
    externalLink: "https://shamela.ws/book/11426",
    locationDetail: "Darul Khair Damaskus"
  },
  {
    id: "fq_fathulmuin",
    title: "Fathul Mu'in bi Syarhi Qurratil 'Ain (فتح المعين بشرح قرة العين)",
    author: "Al-Allamah Zainuddin Ahmad bin Abdul Aziz Al-Malibari (w. 987 H)",
    category: "Fiqh Tingkat Tinggi Pesantren",
    mazhab: "Syafi'i",
    era: "Pertengahan (Abad 10 H)",
    content: "Kitab kuning tingkat tinggi yang menjadi kurikulum utama santri senior di Nusantara, membedah rincian ibadah, muamalah, dan hukum sosial kemasyarakatan.",
    uri: "https://shamela.ws/book/11430",
    externalLink: "https://shamela.ws/book/11430",
    locationDetail: "Dar Ibni Hazm Beirut"
  },
  {
    id: "fq_tuhfah",
    title: "Tuhfatul Muhtaj fi Syarh Al-Minhaj (تحفة المحتاج في شرح المنهاج)",
    author: "Al-Imam Syihabuddin Ibnu Hajar Al-Haitami (w. 974 H)",
    category: "Syarah Minhaj Muktamad Ulama Hijaz",
    mazhab: "Syafi'i",
    era: "Pertengahan (Abad 10 H)",
    content: "Syarah monumental atas Minhajut Thalibin yang menjadi rujukan mutlak fatwa ulama Makkah dan Madinah dalam madzhab Syafi'iyyah.",
    uri: "https://shamela.ws/book/21732",
    externalLink: "https://shamela.ws/book/21732",
    locationDetail: "Al-Maktabah At-Tijariyyah Mesir, 10 Jilid"
  },
  {
    id: "fq_nihayah",
    title: "Nihayatul Muhtaj ila Syarh Al-Minhaj (نهاية المحتاج إلى شرح المنهاج)",
    author: "Al-Imam Syamsuddin Muhammad bin Ahmad Ar-Ramli (Asy-Syafi'i Ash-Shaghir) (w. 1004 H)",
    category: "Syarah Minhaj Muktamad Ulama Mesir",
    mazhab: "Syafi'i",
    era: "Pertengahan (Abad 11 H)",
    content: "Syarah Minhaj yang dibacakan di hadapan 400 ulama Al-Azhar Kairo dan disepakati sebagai rujukan fatwa muktamad selevel dengan Tuhfatul Muhtaj.",
    uri: "https://shamela.ws/book/21733",
    externalLink: "https://shamela.ws/book/21733",
    locationDetail: "Darul Fikr Beirut, 8 Jilid"
  },

  // ==========================================
  // MAZHAB AL-HANBALI (المذهب الحنبلي)
  // ==========================================
  {
    id: "fq_mughni",
    title: "Al-Mughni fi Fiqh Al-Imam Ahmad (المغني لابن قدامة)",
    author: "Al-Imam Muwaffaquddin Ibnu Qudamah Al-Maqdisi (w. 620 H)",
    category: "Ensiklopedia Akbar Perbandingan Mazhab",
    mazhab: "Hanbali & Muqaran",
    era: "Klasik (Abad 7 H)",
    content: "Kitab ensiklopedia fiqh perbandingan terbesar sepanjang sejarah Islam, memaparkan pendapat Imam Abu Hanifah, Malik, Asy-Syafi'i, Ahmad, Ats-Tsauri, dan Al-Auza'i beserta hujjah dalilnya.",
    uri: "https://shamela.ws/book/8463",
    externalLink: "https://shamela.ws/book/8463",
    locationDetail: "Dar 'Alam Al-Kutub Riyadh, 15 Jilid"
  },
  {
    id: "fq_zaad",
    title: "Zaad Al-Mustaqni' fi Ikhtishar Al-Muqni' (زاد المستقنع)",
    author: "Al-Allamah Syarafuddin Abu An-Naja Musa Al-Hajjawi (w. 968 H)",
    category: "Matan Pokok Fiqh Hanbali",
    mazhab: "Hanbali",
    era: "Pertengahan (Abad 10 H)",
    content: "Matan ringkas paling diberkahi dalam mazhab Hanbali yang merangkum hukum-hukum mu'tamad fatwa madzhab dan menjadi kurikulum utama universitas-universitas Islam di Timur Tengah.",
    uri: "https://shamela.ws/book/11566",
    externalLink: "https://shamela.ws/book/11566",
    locationDetail: "Darul Wathan Riyadh"
  },
  {
    id: "fq_raudh",
    title: "Ar-Raudh Al-Murbi' Syarh Zaad Al-Mustaqni' (الروض المربع)",
    author: "Al-Allamah Manshur bin Yunus Al-Buhuti (w. 1051 H)",
    category: "Syarah Fiqh Hanbali Muktamad",
    mazhab: "Hanbali",
    era: "Klasik Akhir (Abad 11 H)",
    content: "Syarah Zaad Al-Mustaqni' yang paling banyak diajarkan, menjelaskan setiap kalimat matan dengan dalil, ta'lil, dan kaidah qaul rajih.",
    uri: "https://shamela.ws/book/11567",
    externalLink: "https://shamela.ws/book/11567",
    locationDetail: "Darul Mu'ayyad Riyadh"
  },
  {
    id: "fq_kasysyaf",
    title: "Kasysyaf Al-Qina' 'an Matn Al-Iqna' (كشاف القناع عن متن الإقناع)",
    author: "Al-Allamah Manshur bin Yunus Al-Buhuti (w. 1051 H)",
    category: "Mausu'ah Fiqh Hanbali Rinci",
    mazhab: "Hanbali",
    era: "Klasik Akhir (Abad 11 H)",
    content: "Kitab rujukan fatwa dan qadha (peradilan) terlengkap di Mahkamah Syari'ah jazirah Arab, menguraikan furu' masalah fiqh Hanbali secara mendalam.",
    uri: "https://shamela.ws/book/21737",
    externalLink: "https://shamela.ws/book/21737",
    locationDetail: "Wizarat Al-'Adl Saudi Arabia, 15 Jilid"
  },
  {
    id: "fq_kafi",
    title: "Al-Kafi fi Fiqh Al-Imam Ahmad (الكافي في فقه الإمام أحمد)",
    author: "Al-Imam Ibnu Qudamah Al-Maqdisi (w. 620 H)",
    category: "Fiqh Hanbali Mutawassith",
    mazhab: "Hanbali",
    era: "Klasik (Abad 7 H)",
    content: "Tingkatan ketiga dari 4 kitab karya Ibnu Qudamah (setelah Al-'Umdah dan Al-Muqni', sebelum Al-Mughni), menyajikan dalil-dalil setiap riwayat dalam mazhab Ahmad.",
    uri: "https://shamela.ws/book/11565",
    externalLink: "https://shamela.ws/book/11565",
    locationDetail: "Darul Kutub Al-Ilmiyyah, 4 Jilid"
  },

  // ==========================================
  // MAZHAB AL-HANAFI (المذهب الحنفي)
  // ==========================================
  {
    id: "fq_mabsuth",
    title: "Al-Mabsuth (المبسوط للسرخسي)",
    author: "Syamsul A'immah Al-Imam Muhammad bin Ahmad As-Sarakhsi (w. 483 H)",
    category: "Kitab Induk Fiqh Hanafi Raksasa",
    mazhab: "Hanafi",
    era: "Klasik (Abad 5 H)",
    content: "Karya raksasa fiqh 30 jilid yang didiktekan dari hafalan As-Sarakhsi saat dipenjara di dasar sumur (jubb), membedah furu' fiqh Abu Hanifah, Abu Yusuf, dan Muhammad bin Hasan Asy-Syaibani.",
    uri: "https://shamela.ws/book/21738",
    externalLink: "https://shamela.ws/book/21738",
    locationDetail: "Darul Ma'rifah Beirut, 30 Jilid"
  },
  {
    id: "fq_hidayah",
    title: "Al-Hidayah fi Syarh Bidayat Al-Mubtadi (الهداية للمرغيناني)",
    author: "Al-Imam Burhanuddin Ali bin Abi Bakr Al-Marghinani (w. 593 H)",
    category: "Syarah Fiqh Hanafi Otoritatif",
    mazhab: "Hanafi",
    era: "Klasik (Abad 6 H)",
    content: "Kitab fiqh legendaris yang disematkan pepatah 'Innal Hidayata kal-Qur'an qad nusikhat bihi syara'i'u man qablahu', mengurai dalil qiyas dan istihsan mazhab Kufah.",
    uri: "https://shamela.ws/book/11571",
    externalLink: "https://shamela.ws/book/11571",
    locationDetail: "Dar Ihya At-Turats Al-Arabi, 4 Jilid"
  },
  {
    id: "fq_raddulmuhtar",
    title: "Radd Al-Muhtar 'ala Ad-Durr Al-Mukhtar (Hasyiyah Ibnu Abidin)",
    author: "Al-Allamah Muhammad Amin bin Umar Ibnu Abidin Asy-Syami (w. 1252 H)",
    category: "Kamus Fiqh Hanafi Akhir",
    mazhab: "Hanafi",
    era: "Klasik Akhir (Abad 13 H)",
    content: "Puncak rujukan fatwa muktamad mazhab Hanafi di seluruh wilayah Utsmaniyyah dan Asia Selatan, mengurai kaidah 'urf, maslahah, dan pembaruan hukum sosial.",
    uri: "https://shamela.ws/book/21739",
    externalLink: "https://shamela.ws/book/21739",
    locationDetail: "Darul Fikr Beirut, 12 Jilid"
  },
  {
    id: "fq_quduri",
    title: "Mukhtashar Al-Quduri (مختصر القدوري)",
    author: "Al-Imam Abul Husain Ahmad bin Muhammad Al-Quduri (w. 428 H)",
    category: "Matan Pokok Fiqh Hanafi",
    mazhab: "Hanafi",
    era: "Klasik (Abad 5 H)",
    content: "Matan dasar mazhab Hanafi (dijuluki Al-Kitab) yang memuat sekitar 12.000 masalah fiqh pokok dari thaharah hingga wasiat.",
    uri: "https://shamela.ws/book/11572",
    externalLink: "https://shamela.ws/book/11572",
    locationDetail: "Darul Kutub Al-Ilmiyyah Beirut"
  },
  {
    id: "fq_badai",
    title: "Bada'i' Ash-Sana'i' fi Tartib Asy-Syara'i' (بدائع الصنائع)",
    author: "Al-Imam Alauddin Abu Bakr bin Mas'ud Al-Kasani (Malakul Ulama) (w. 587 H)",
    category: "Sistematika Fiqh Analitis",
    mazhab: "Hanafi",
    era: "Klasik (Abad 6 H)",
    content: "Mahakarya dengan sistematika penulisan tercantik dalam literatur fiqh Islam: membagi setiap bab ke dalam syarat, rukun, sifat, pembatal, dan hikmah pensyariatan.",
    uri: "https://shamela.ws/book/21740",
    externalLink: "https://shamela.ws/book/21740",
    locationDetail: "Darul Kutub Al-Ilmiyyah, 7 Jilid"
  },

  // ==========================================
  // MAZHAB AL-MALIKI (المذهب المالكي)
  // ==========================================
  {
    id: "fq_mudawwanah",
    title: "Al-Mudawwanah Al-Kubra (المدونة الكبرى)",
    author: "Al-Imam Sahnun At-Tanukhi (w. 240 H) dari Abdurrahman bin Al-Qasim dari Imam Malik bin Anas (w. 179 H)",
    category: "Kitab Induk Fiqh Maliki",
    mazhab: "Maliki",
    era: "Salaf (Abad 3 H)",
    content: "Kitab rujukan paling primer mazhab Maliki yang meriwayatkan fatwa-fatwa Imam Malik dan perdebatan murid utamanya dengan landasan 'Amal Ahlil Madinah.",
    uri: "https://shamela.ws/book/11574",
    externalLink: "https://shamela.ws/book/11574",
    locationDetail: "Darul Kutub Al-Ilmiyyah, 6 Jilid"
  },
  {
    id: "fq_bidayatulmujtahid",
    title: "Bidayatul Mujtahid wa Nihayatul Muqtashid (بداية المجتهد ونهاية المقتصد)",
    author: "Al-Qadhi Abul Walid Muhammad bin Ahmad Ibnu Rusyd Al-Qurthubi (w. 595 H)",
    category: "Falsafah Fiqh & Asbab Ikhtilaf",
    mazhab: "Perbandingan Mazhab & Maliki",
    era: "Klasik (Abad 6 H)",
    content: "Kitab fiqh perbandingan terbaik yang membongkar akar perbedaan pendapat para imam (asbab ikhtilaf al-fuqaha), pertentangan dalil, dan kaidah ushul di baliknya.",
    uri: "https://shamela.ws/book/21741",
    externalLink: "https://shamela.ws/book/21741",
    locationDetail: "Dar Ibni Hazm Beirut, 2 Jilid"
  },
  {
    id: "fq_khalil",
    title: "Mukhtashar Khalil (مختصر خليل)",
    author: "Syaikh Khalil bin Ishaq Al-Jundi (w. 776 H)",
    category: "Matan Tertinggi Mazhab Maliki",
    mazhab: "Maliki",
    era: "Klasik (Abad 8 H)",
    content: "Kamus matan kodeks terpadat mazhab Maliki di Afrika Utara dan Barat yang menyaring qaul rajih dari ribuan fatwa ashab Malik.",
    uri: "https://shamela.ws/book/11575",
    externalLink: "https://shamela.ws/book/11575",
    locationDetail: "Darul Hadits Kairo"
  },
  {
    id: "fq_risalah_qairawani",
    title: "Matan Ar-Risalah (رسالة ابن أبي زيد القيرواني)",
    author: "Abu Muhammad Abdullah bin Abi Zaid Al-Qairawani (Malik Ash-Shaghir) (w. 386 H)",
    category: "Matan Fiqh & Aqidah Maliki",
    mazhab: "Maliki",
    era: "Salaf (Abad 4 H)",
    content: "Matan pembuka fiqh Maliki yang sangat diberkahi, merangkum aqidah ahlus sunnah, thaharah, shalat, zakat, puasa, dan adab akhlak Islam.",
    uri: "https://shamela.ws/book/11576",
    externalLink: "https://shamela.ws/book/11576",
    locationDetail: "Darul Fikr Beirut"
  },
  {
    id: "fq_dzakhirah",
    title: "Adz-Dzakhirah (الذخيرة للقرافي)",
    author: "Al-Imam Syihabuddin Ahmad bin Idris Al-Qarafi (w. 684 H)",
    category: "Mausu'ah Fiqh & Ushul Maliki",
    mazhab: "Maliki",
    era: "Klasik (Abad 7 H)",
    content: "Karya agung Imam Al-Qarafi yang menggabungkan analisis fiqih furu', kaidah ushul fiqh, dan kaidah fiqhiyyah maqashid dalam satu pembahasan terpadu.",
    uri: "https://shamela.ws/book/21742",
    externalLink: "https://shamela.ws/book/21742",
    locationDetail: "Darul Gharb Al-Islami Beirut, 14 Jilid"
  },

  // ==========================================
  // FIQH HADITS, TARJIH & ENSIKLOPEDIA KONTEMPORER
  // ==========================================
  {
    id: "fq_subulussalam",
    title: "Subulus Salam Syarah Bulughul Maram (سبل السلام)",
    author: "Al-Imam Muhammad bin Ismail Ash-Shan'ani (w. 1182 H)",
    category: "Syarah Hadits Ahkam & Tarjih",
    mazhab: "Fiqh Hadits & Tarjih",
    era: "Klasik Akhir (Abad 12 H)",
    content: "Syarah kitab Bulughul Maram karya Ibnu Hajar yang membedah keshahihan hadits hukum, istinbath fukaha 4 mazhab, dan tarjih dalil terkuat.",
    uri: "https://shamela.ws/book/21743",
    externalLink: "https://shamela.ws/book/21743",
    locationDetail: "Darul Hadits Kairo, 4 Jilid"
  },
  {
    id: "fq_nailulauthar",
    title: "Nailul Authar Syarah Muntaqa Al-Akhbar (نيل الأوطار للشوكاني)",
    author: "Al-Imam Muhammad bin Ali Asy-Syaukani (w. 1250 H)",
    category: "Mausu'ah Hadits Ahkam & Ijtihad",
    mazhab: "Fiqh Hadits & Muqaran",
    era: "Klasik Akhir (Abad 13 H)",
    content: "Karya puncak fiqh hadits komparatif yang menelaah sanad hadits Muntaqa Al-Akhbar karya Majduddin Ibnu Taimiyyah dengan analisis fikih bebas fanatisme mazhab.",
    uri: "https://shamela.ws/book/21744",
    externalLink: "https://shamela.ws/book/21744",
    locationDetail: "Darul Jeel Beirut, 9 Jilid"
  },
  {
    id: "fq_zuhaili",
    title: "Al-Fiqh Al-Islami wa Adillatuh (الفقه الإسلامي وأدلته)",
    author: "Prof. Dr. Wahbah Az-Zuhaili (w. 1436 H)",
    category: "Ensiklopedia Fiqh 4 Mazhab Modern",
    mazhab: "4 Mazhab Komparatif",
    era: "Kontemporer (Abad 21)",
    content: "Ensiklopedia 10 jilid standar internasional yang menyajikan kajian perbandingan 4 mazhab dilengkapi fatwa kontemporer (perbankan syariah, medis, organ, zakat modern).",
    uri: "https://waqfeya.net/book.php?bid=1409",
    externalLink: "https://waqfeya.net",
    locationDetail: "Darul Fikr Damaskus, 10 Jilid"
  },
  {
    id: "fq_fiqhussunnah",
    title: "Fiqh As-Sunnah (فقه السنة للغزالي والسيد سابق)",
    author: "Syaikh Sayyid Sabiq (w. 1420 H)",
    category: "Fiqh Tematik Berdasarkan Dalil Sunnah",
    mazhab: "Fiqh Sunnah & Tarjih",
    era: "Kontemporer",
    content: "Kitab fiqih tematik modern yang menyajikan hukum ibadah dan muamalah secara sistematis, mudah dipahami, berpegang teguh pada dalil Al-Qur'an dan Sunnah shahihah.",
    uri: "https://shamela.ws/book/21745",
    externalLink: "https://shamela.ws/book/21745",
    locationDetail: "Darul Kitab Al-Arabi Beirut, 3 Jilid"
  },

  // ==========================================
  // USHUL FIQH & KAIDAH FIQHIYYAH (قواعد الفقه)
  // ==========================================
  {
    id: "fq_asybah",
    title: "Al-Asybah wan Nazha'ir fi Qawa'id Fiqh Asy-Syafi'iyyah (الأشباه والنظائر)",
    author: "Al-Imam Jalaluddin As-Suyuthi (w. 911 H)",
    category: "Kaidah Fiqhiyyah Akbar",
    mazhab: "Kaidah Fiqh Syafi'i",
    era: "Pertengahan (Abad 10 H)",
    content: "Kitab kaidah fiqhiyyah terlengkap yang merumuskan 5 kaidah kubra ('Al-Umuru bi Maqashidiha', 'Al-Yaqinu la Yazulu bisy-Syakk', 'Al-Masyaqqatu Tajlibut Taysir', 'Adh-Dhararu Yuzal', 'Al-'Adatu Muhakkamah').",
    uri: "https://shamela.ws/book/21746",
    externalLink: "https://shamela.ws/book/21746",
    locationDetail: "Darul Kutub Al-Ilmiyyah Beirut"
  },
  {
    id: "fq_qawaid_izz",
    title: "Qawa'id Al-Ahkam fi Mashalih Al-Anam (قواعد الأحكام في مصالح الأنام)",
    author: "Al-Imam Izzuddin bin Abdis Salam (Sultanul Ulama) (w. 660 H)",
    category: "Kaidah Maslahah & Maqashid",
    mazhab: "Maqashid Syariah & Fiqh",
    era: "Klasik (Abad 7 H)",
    content: "Landasan filosofis pembagian hukum syariah untuk menarik maslahat bagi manusia dan menolak mafsadat, menjadi tonggak penting kajian fiqih prioritas.",
    uri: "https://shamela.ws/book/8375",
    externalLink: "https://shamela.ws/book/8375",
    locationDetail: "Darul Ma'arif Kairo, 2 Jilid"
  },
  {
    id: "fq_muwafaqat",
    title: "Al-Muwafaqat fi Ushul Asy-Syari'ah (الموافقات للشاطبي)",
    author: "Al-Imam Abu Ishaq Ibrahim bin Musa Asy-Syathibi (w. 790 H)",
    category: "Ushul Fiqh & Maqashid Syariah",
    mazhab: "Ushul Fiqh & Maliki",
    era: "Klasik (Abad 8 H)",
    content: "Karya puncak maqashid syariah: merumuskan perlindungan 5 pokok darurat (agama, jiwa, akal, keturunan, harta) serta tingkatan hajiyyat dan tahsiniyyat dalam penetapan hukum.",
    uri: "https://shamela.ws/book/8372",
    externalLink: "https://shamela.ws/book/8372",
    locationDetail: "Dar Ibni Affan Kairo, 6 Jilid"
  },
  {
    id: "fq_waraqat",
    title: "Matan Al-Waraqat fi Ushul Al-Fiqh (الورقات للجويني)",
    author: "Imam Al-Haramain Abu Al-Ma'ali Abdul Malik Al-Juwaini (w. 478 H)",
    category: "Matan Ushul Fiqh Dasar",
    mazhab: "Ushul Fiqh Syafi'i",
    era: "Klasik (Abad 5 H)",
    content: "Gerbang utama memahami metodologi ushul fiqih: definisi hukum taklifi, amr, nahy, 'amm, khash, mujmal, mubayyan, af'alun nabi, nasakh, ijma', qiyas, dan ijtihad.",
    uri: "https://shamela.ws/book/11578",
    externalLink: "https://shamela.ws/book/11578",
    locationDetail: "Darul Fikr Beirut"
  }
];
