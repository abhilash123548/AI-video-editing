export const FPS = 30;
export const toFrame = (seconds: number) => Math.round(seconds * FPS);

export type Phrase = {
  start: number; // seconds
  end: number; // seconds
  text: string; // spoken VO text (used for captions, dashes stripped)
};

// Beat-by-beat VO timing, transcribed from the CSE DevLabs edit script.
const RAW_PHRASES: Phrase[] = [
  { start: 0, end: 3, text: "Are you a final-year CS student?" },
  { start: 3, end: 6, text: "Then hear this, your project has already been seen." },
  {
    start: 6,
    end: 9,
    text: "By recruiters. By your professor. A hundred times over. Before you even open your laptop.",
  },
  { start: 9, end: 12, text: "You know the theory. That's not the problem." },
  {
    start: 12,
    end: 17,
    text: "The problem is turning it into something real, architecture that makes sense, code that actually works, a project that doesn't fall apart the second someone asks you a question.",
  },
  { start: 17, end: 19, text: "Random tutorials. Errors you can't fix." },
  { start: 19, end: 23, text: "2 AM and you're still stuck on step one." },
  { start: 23, end: 26, text: "Deadline's not waiting for you to figure it out." },
  { start: 26, end: 29, text: "This is exactly why CSE DevLabs exists." },
  { start: 29, end: 33, text: "No more guessing. No more piecing it together alone." },
  { start: 33, end: 36, text: "We build it with you, start to finish." },
  { start: 36, end: 40, text: "AI. Machine Learning. Blockchain. Cybersecurity. Big Data. Mobile Apps." },
  {
    start: 40,
    end: 46,
    text: "Any domain, we build it like it's going into production, not just getting graded.",
  },
  { start: 46, end: 52, text: "Real architecture. Working code. A full report." },
  {
    start: 52,
    end: 60,
    text: "A published research paper with your name on it, if you want that edge over everyone else.",
  },
  { start: 60, end: 62, text: "This isn't a template we recycle." },
  {
    start: 62,
    end: 68,
    text: "It's built with you, one-on-one, so when they grill you in your viva, you know it cold. No hesitation. No panic.",
  },
  {
    start: 69,
    end: 74,
    text: "We only take a limited number of students each semester. On purpose.",
  },
  { start: 74, end: 77, text: "Because real attention doesn't scale to hundreds of people." },
  {
    start: 77,
    end: 83,
    text: "So message us right now on 8008125134 and just see how this works, no pressure, no commitment.",
  },
  { start: 83, end: 87, text: "Or call that same number if you'd rather talk it through directly." },
  { start: 87, end: 92, text: "Either way, do it before your slot's gone." },
  {
    start: 92,
    end: 98,
    text: "CSE DevLabs. You graduate. We build the thing that gets you hired.",
  },
  { start: 98, end: 100.6, text: "Call 8008125134 now." },
];

export type CaptionWord = {
  word: string;
  startFrame: number;
  endFrame: number;
};

export const CAPTION_WORDS: CaptionWord[] = RAW_PHRASES.flatMap((phrase) => {
  const words = phrase.text.split(" ").filter(Boolean);
  const startFrame = toFrame(phrase.start);
  const endFrame = toFrame(phrase.end);
  const span = endFrame - startFrame;
  return words.map((word, i) => ({
    word,
    startFrame: startFrame + Math.round((span * i) / words.length),
    endFrame: startFrame + Math.round((span * (i + 1)) / words.length),
  }));
});

export const TOTAL_DURATION = toFrame(100.6);
