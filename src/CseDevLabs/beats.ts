// Auto-generated word-timing data for the CSE DevLabs promo voiceover.
// scene: which sentence/scene the word belongs to
// start/duration: frame offsets at 30fps, derived from word length + punctuation pauses
// (plus extra weight for graphic words so their glyph has time to read),
// normalized to the real voiceover duration (48.75s).
// graphic: abstract-motion-graphic variant shown behind key concept words.
export type GraphicVariant =
  | "network"
  | "chain"
  | "shield"
  | "bars"
  | "device"
  | "code"
  | "doc"
  | "burst"
  | "people";

export type WordBeat = {
  scene: number;
  word: string;
  start: number;
  duration: number;
  emphasis: boolean;
  sentenceEnd: boolean;
  graphic: GraphicVariant | null;
};

export const WORD_BEATS: WordBeat[] = [
  { scene: 0, word: "Struggling", start: 0, duration: 12, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "to", start: 12, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "find", start: 18, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "a", start: 24, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "final-year", start: 30, duration: 11, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "CSE", start: 41, duration: 6, emphasis: true, sentenceEnd: false, graphic: null },
  { scene: 0, word: "project", start: 47, duration: 28, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 0, word: "that", start: 75, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "actually", start: 81, duration: 10, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "stands", start: 91, duration: 7, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "out", start: 98, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "to", start: 104, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "your", start: 110, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "professors", start: 116, duration: 32, emphasis: false, sentenceEnd: false, graphic: "people" },
  { scene: 0, word: "and", start: 148, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 0, word: "recruiters?", start: 154, duration: 36, emphasis: false, sentenceEnd: true, graphic: "people" },
  { scene: 1, word: "Welcome", start: 190, duration: 8, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "to", start: 198, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "CSE", start: 204, duration: 6, emphasis: true, sentenceEnd: false, graphic: null },
  { scene: 1, word: "DevLabs!", start: 210, duration: 20, emphasis: true, sentenceEnd: true, graphic: null },
  { scene: 1, word: "We", start: 230, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "help", start: 236, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "computer", start: 242, duration: 10, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "science", start: 252, duration: 8, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "students", start: 260, duration: 30, emphasis: false, sentenceEnd: false, graphic: "people" },
  { scene: 1, word: "bridge", start: 290, duration: 27, emphasis: false, sentenceEnd: false, graphic: "network" },
  { scene: 1, word: "the", start: 317, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "gap", start: 323, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "between", start: 329, duration: 8, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "academic", start: 337, duration: 10, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "submissions", start: 347, duration: 33, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 1, word: "and", start: 380, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "real-world,", start: 386, duration: 17, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 1, word: "industry-grade", start: 403, duration: 36, emphasis: false, sentenceEnd: false, graphic: "bars" },
  { scene: 1, word: "software.", start: 439, duration: 37, emphasis: false, sentenceEnd: true, graphic: "code" },
  { scene: 2, word: "Whether", start: 476, duration: 8, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "you're", start: 484, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "building", start: 490, duration: 10, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "in", start: 500, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "Artificial", start: 506, duration: 32, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Intelligence,", start: 538, duration: 37, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Machine", start: 575, duration: 28, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Learning,", start: 603, duration: 36, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Neural", start: 639, duration: 27, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Networks,", start: 666, duration: 36, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Blockchain,", start: 702, duration: 37, emphasis: true, sentenceEnd: false, graphic: "chain" },
  { scene: 2, word: "Cybersecurity,", start: 739, duration: 37, emphasis: true, sentenceEnd: false, graphic: "shield" },
  { scene: 2, word: "Big", start: 776, duration: 23, emphasis: true, sentenceEnd: false, graphic: "bars" },
  { scene: 2, word: "Data", start: 799, duration: 25, emphasis: true, sentenceEnd: false, graphic: "bars" },
  { scene: 2, word: "Analytics,", start: 824, duration: 37, emphasis: true, sentenceEnd: false, graphic: "bars" },
  { scene: 2, word: "or", start: 861, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "Cross-Platform", start: 867, duration: 36, emphasis: true, sentenceEnd: false, graphic: "device" },
  { scene: 2, word: "Mobile", start: 903, duration: 27, emphasis: true, sentenceEnd: false, graphic: "device" },
  { scene: 2, word: "Apps—", start: 930, duration: 31, emphasis: true, sentenceEnd: false, graphic: "device" },
  { scene: 2, word: "we", start: 961, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "provide", start: 967, duration: 8, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "complete", start: 975, duration: 10, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "end-to-end", start: 985, duration: 10, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "technical", start: 995, duration: 11, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 2, word: "execution.", start: 1006, duration: 37, emphasis: false, sentenceEnd: true, graphic: "code" },
  { scene: 3, word: "From", start: 1043, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "project", start: 1049, duration: 28, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 3, word: "architecture", start: 1077, duration: 15, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "and", start: 1092, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "source", start: 1098, duration: 7, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "code", start: 1105, duration: 25, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 3, word: "to", start: 1130, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "research", start: 1136, duration: 30, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 3, word: "paper", start: 1166, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "publication—", start: 1172, duration: 37, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 3, word: "we've", start: 1209, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "got", start: 1215, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "you", start: 1221, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "covered.", start: 1227, duration: 20, emphasis: false, sentenceEnd: true, graphic: null },
  { scene: 3, word: "Fill", start: 1247, duration: 25, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 3, word: "out", start: 1272, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "the", start: 1278, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "form", start: 1284, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "below", start: 1290, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "or", start: 1296, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "contact", start: 1302, duration: 28, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 3, word: "CSE", start: 1330, duration: 6, emphasis: true, sentenceEnd: false, graphic: null },
  { scene: 3, word: "DevLabs", start: 1336, duration: 8, emphasis: true, sentenceEnd: false, graphic: null },
  { scene: 3, word: "today", start: 1344, duration: 26, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 3, word: "to", start: 1370, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "kickstart", start: 1376, duration: 31, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 3, word: "your", start: 1407, duration: 6, emphasis: false, sentenceEnd: false, graphic: null },
  { scene: 3, word: "project!", start: 1413, duration: 37, emphasis: false, sentenceEnd: true, graphic: "code" },
];

export const SCENE_LABELS = [
  "hook",
  "intro",
  "capabilities",
  "cta",
];

export const WORDS_END_FRAME = 1450;

export type SceneRange = { scene: number; start: number; end: number };

export const SCENE_RANGES: SceneRange[] = SCENE_LABELS.map((_, scene) => {
  const words = WORD_BEATS.filter((b) => b.scene === scene);
  return {
    scene,
    start: words[0].start,
    end: words[words.length - 1].start + words[words.length - 1].duration,
  };
});
