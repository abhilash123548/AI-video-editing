import { toFrame } from "./transcript";

// Section boundaries (seconds), from the edit script.
export const SECTION_BOUNDS = {
  hook: [0, 9],
  problem: [9, 17],
  agitate: [17, 26],
  solution: [26, 40],
  value: [40, 60],
  reassurance: [60, 69],
  urgency: [69, 92],
  close: [92, 100.6],
} as const;

export const sectionFrames = (key: keyof typeof SECTION_BOUNDS) => {
  const [start, end] = SECTION_BOUNDS[key];
  return { from: toFrame(start), durationInFrames: toFrame(end) - toFrame(start) };
};

// Tone turn point called out in the script's handoff notes: everything
// before this is cold/desaturated, everything after is warm/confident.
export const TONE_TURN_FRAME = toFrame(26);
export const PHONE_ON_SCREEN_FRAME = toFrame(77);
