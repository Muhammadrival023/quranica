export interface VerseQiraatFull {
  surah: number;
  verse: number;
  hafsText: string;
  readings: {
    readerId: string;
    readerName: string;
    text: string;
    differences: string[];
    isCanonical: boolean;
  }[];
}

export function getVerseComparison(surah: number, verse: number, baseText: string = ""): VerseQiraatFull {
  return {
    surah,
    verse,
    hafsText: baseText,
    readings: [
      {
        readerId: "asim",
        readerName: "ʿĀṣim (Ḥafṣ)",
        text: baseText,
        differences: [],
        isCanonical: true
      },
      {
        readerId: "nafi",
        readerName: "Nāfiʿ (Warsh & Qālūn)",
        text: baseText,
        differences: ["Perbedaan pelafalan vokal dan madd"],
        isCanonical: true
      },
      {
        readerId: "ibn_kathir",
        readerName: "Ibn Kathīr",
        text: baseText,
        differences: ["Shilah mīm al-jamʿ"],
        isCanonical: true
      }
    ]
  };
}
