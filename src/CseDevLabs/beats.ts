// Auto-generated word-timing data for the CSE DevLabs promo voiceover.
// scene: which sentence/scene the word belongs to
// start/duration: frame offsets at 30fps, derived from word length + punctuation pauses
// (plus extra weight per graphic category so each glyph has time to read),
// normalized to the real voiceover duration (48.75s).
// graphic: abstract-motion-graphic variant shown behind every word ("spark" is the
// minimal fallback for connector/grammar words that have no distinct concept).
export type GraphicVariant =
  | "network"
  | "chain"
  | "shield"
  | "bars"
  | "device"
  | "code"
  | "doc"
  | "burst"
  | "people"
  | "spark";

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
  { scene: 0, word: "Struggling", start: 0, duration: 15, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "to", start: 15, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "find", start: 24, duration: 10, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "a", start: 34, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "final-year", start: 43, duration: 20, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 0, word: "CSE", start: 63, duration: 15, emphasis: true, sentenceEnd: false, graphic: "code" },
  { scene: 0, word: "project", start: 78, duration: 19, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 0, word: "that", start: 97, duration: 10, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "actually", start: 107, duration: 13, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "stands", start: 120, duration: 11, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "out", start: 131, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "to", start: 140, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "your", start: 149, duration: 10, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "professors", start: 159, duration: 21, emphasis: false, sentenceEnd: false, graphic: "people" },
  { scene: 0, word: "and", start: 180, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 0, word: "recruiters?", start: 189, duration: 28, emphasis: false, sentenceEnd: true, graphic: "people" },
  { scene: 1, word: "Welcome", start: 217, duration: 19, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 1, word: "to", start: 236, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 1, word: "CSE", start: 245, duration: 15, emphasis: true, sentenceEnd: false, graphic: "code" },
  { scene: 1, word: "DevLabs!", start: 260, duration: 26, emphasis: true, sentenceEnd: true, graphic: "code" },
  { scene: 1, word: "We", start: 286, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 1, word: "help", start: 295, duration: 16, emphasis: false, sentenceEnd: false, graphic: "people" },
  { scene: 1, word: "computer", start: 311, duration: 20, emphasis: false, sentenceEnd: false, graphic: "people" },
  { scene: 1, word: "science", start: 331, duration: 19, emphasis: false, sentenceEnd: false, graphic: "people" },
  { scene: 1, word: "students", start: 350, duration: 20, emphasis: false, sentenceEnd: false, graphic: "people" },
  { scene: 1, word: "bridge", start: 370, duration: 18, emphasis: false, sentenceEnd: false, graphic: "network" },
  { scene: 1, word: "the", start: 388, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 1, word: "gap", start: 397, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 1, word: "between", start: 406, duration: 12, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 1, word: "academic", start: 418, duration: 20, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 1, word: "submissions", start: 438, duration: 22, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 1, word: "and", start: 460, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 1, word: "real-world,", start: 469, duration: 24, emphasis: false, sentenceEnd: false, graphic: "network" },
  { scene: 1, word: "industry-grade", start: 493, duration: 24, emphasis: false, sentenceEnd: false, graphic: "bars" },
  { scene: 1, word: "software.", start: 517, duration: 27, emphasis: false, sentenceEnd: true, graphic: "code" },
  { scene: 2, word: "Whether", start: 544, duration: 12, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 2, word: "you're", start: 556, duration: 11, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 2, word: "building", start: 567, duration: 20, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 2, word: "in", start: 587, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 2, word: "Artificial", start: 596, duration: 21, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Intelligence,", start: 617, duration: 27, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Machine", start: 644, duration: 19, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Learning,", start: 663, duration: 24, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Neural", start: 687, duration: 18, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Networks,", start: 705, duration: 24, emphasis: true, sentenceEnd: false, graphic: "network" },
  { scene: 2, word: "Blockchain,", start: 729, duration: 25, emphasis: true, sentenceEnd: false, graphic: "chain" },
  { scene: 2, word: "Cybersecurity,", start: 754, duration: 28, emphasis: true, sentenceEnd: false, graphic: "shield" },
  { scene: 2, word: "Big", start: 782, duration: 15, emphasis: true, sentenceEnd: false, graphic: "bars" },
  { scene: 2, word: "Data", start: 797, duration: 16, emphasis: true, sentenceEnd: false, graphic: "bars" },
  { scene: 2, word: "Analytics,", start: 813, duration: 24, emphasis: true, sentenceEnd: false, graphic: "bars" },
  { scene: 2, word: "or", start: 837, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 2, word: "Cross-Platform", start: 846, duration: 24, emphasis: true, sentenceEnd: false, graphic: "device" },
  { scene: 2, word: "Mobile", start: 870, duration: 18, emphasis: true, sentenceEnd: false, graphic: "device" },
  { scene: 2, word: "Apps—", start: 888, duration: 20, emphasis: true, sentenceEnd: false, graphic: "device" },
  { scene: 2, word: "we", start: 908, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 2, word: "provide", start: 917, duration: 19, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 2, word: "complete", start: 936, duration: 20, emphasis: false, sentenceEnd: false, graphic: "bars" },
  { scene: 2, word: "end-to-end", start: 956, duration: 20, emphasis: false, sentenceEnd: false, graphic: "chain" },
  { scene: 2, word: "technical", start: 976, duration: 20, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 2, word: "execution.", start: 996, duration: 28, emphasis: false, sentenceEnd: true, graphic: "code" },
  { scene: 3, word: "From", start: 1024, duration: 10, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "project", start: 1034, duration: 19, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 3, word: "architecture", start: 1053, duration: 23, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 3, word: "and", start: 1076, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "source", start: 1085, duration: 18, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 3, word: "code", start: 1103, duration: 16, emphasis: false, sentenceEnd: false, graphic: "code" },
  { scene: 3, word: "to", start: 1119, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "research", start: 1128, duration: 20, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 3, word: "paper", start: 1148, duration: 17, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 3, word: "publication—", start: 1165, duration: 26, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 3, word: "we've", start: 1191, duration: 10, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "got", start: 1201, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "you", start: 1210, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "covered.", start: 1219, duration: 26, emphasis: false, sentenceEnd: true, graphic: "shield" },
  { scene: 3, word: "Fill", start: 1245, duration: 16, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 3, word: "out", start: 1261, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "the", start: 1270, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "form", start: 1279, duration: 16, emphasis: false, sentenceEnd: false, graphic: "doc" },
  { scene: 3, word: "below", start: 1295, duration: 11, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "or", start: 1306, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "contact", start: 1315, duration: 19, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 3, word: "CSE", start: 1334, duration: 15, emphasis: true, sentenceEnd: false, graphic: "code" },
  { scene: 3, word: "DevLabs", start: 1349, duration: 19, emphasis: true, sentenceEnd: false, graphic: "code" },
  { scene: 3, word: "today", start: 1368, duration: 17, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 3, word: "to", start: 1385, duration: 9, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "kickstart", start: 1394, duration: 20, emphasis: false, sentenceEnd: false, graphic: "burst" },
  { scene: 3, word: "your", start: 1414, duration: 10, emphasis: false, sentenceEnd: false, graphic: "spark" },
  { scene: 3, word: "project!", start: 1424, duration: 26, emphasis: false, sentenceEnd: true, graphic: "code" },
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
