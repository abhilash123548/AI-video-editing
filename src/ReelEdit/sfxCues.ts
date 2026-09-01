import { beats, FPS } from "./timeline";

export type SfxCue = { frame: number; src: string; volume?: number; durationFrames?: number };

const src = (name: string) => `audio/sfx/${name}`;
const secs = (s: number) => Math.round(s * FPS);

// The reversed cymbal swoop builds TO its crash at the very end of the clip,
// so it has to start playing this many frames before the moment it should land on.
const SWOOP_LEAD = secs(2.3);

export const sfxCues: SfxCue[] = [];

for (const beat of beats) {
  if (beat.kind === "section") {
    sfxCues.push({
      frame: Math.max(0, beat.from - SWOOP_LEAD),
      src: src("cymbal_swoop_reverse.mp3"),
      volume: 0.75,
      durationFrames: SWOOP_LEAD + 5,
    });
  }
  if (beat.kind === "rating") {
    if (beat.tier === "low") {
      sfxCues.push({ frame: beat.from, src: src("vine_boom.mp3"), volume: 0.8, durationFrames: secs(0.8) });
    } else if (beat.tier === "high") {
      sfxCues.push({ frame: beat.from, src: src("angel_choir.mp3"), volume: 0.55, durationFrames: secs(2.2) });
    } else {
      sfxCues.push({ frame: beat.from, src: src("positive_ding.wav"), volume: 0.85 });
    }
    if (beat.stat) {
      sfxCues.push({ frame: beat.from + 10, src: src("pop.wav"), volume: 0.6 });
    }
  }
  if (beat.kind === "line" && beat.text === "And one more thing —") {
    sfxCues.push({ frame: beat.from, src: src("impact.wav"), volume: 0.9 });
  }
  if (beat.kind === "cta") {
    sfxCues.push({ frame: beat.from, src: src("pop.wav"), volume: 0.9 });
  }
  if (beat.kind === "end") {
    sfxCues.push({ frame: beat.from, src: src("riser.wav"), volume: 0.7 });
  }
}

// "Listen up." — glitchy static cutting in to grab attention
const listenUpBeat = beats.find((b) => b.kind === "caption" && b.lines[0]?.text === "Listen up.");
if (listenUpBeat) {
  sfxCues.push({
    frame: listenUpBeat.from,
    src: src("varying_static.wav"),
    volume: 0.7,
    durationFrames: secs(1.3),
  });
}
