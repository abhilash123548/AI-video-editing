import { beats } from "./timeline";

export type SfxCue = { frame: number; src: string; volume?: number };

const src = (name: string) => `audio/sfx/${name}`;

export const sfxCues: SfxCue[] = [];

for (const beat of beats) {
  if (beat.kind === "section") {
    sfxCues.push({ frame: beat.from, src: src("whoosh.wav"), volume: 0.9 });
  }
  if (beat.kind === "rating") {
    if (beat.tier === "low") {
      sfxCues.push({ frame: beat.from, src: src("negative_buzz.wav"), volume: 0.8 });
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

// "Listen up." punch
const listenUpBeat = beats.find((b) => b.kind === "caption" && b.lines[0]?.text === "Listen up.");
if (listenUpBeat) {
  sfxCues.push({ frame: listenUpBeat.from, src: src("impact.wav"), volume: 0.85 });
}
