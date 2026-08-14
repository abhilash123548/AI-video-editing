export const FPS = 30;
export const s = (seconds: number) => Math.round(seconds * FPS);

export type ColorPhase = "historical" | "journey" | "modern" | "gym" | "final";

export type SceneDef = {
  id: string;
  startSec: number;
  endSec: number;
  /** which component renders this scene */
  component: string;
  /** asset ids this scene draws on (see ASSETS below); empty = pure graphics */
  assets?: string[];
  transitionIn?: "cut" | "dissolve" | "fade" | "matchcut";
  colorPhase: ColorPhase;
  sfxNote?: string;
  onScreenText?: string;
};

// ---------------------------------------------------------------------------
// SCENES — the single source of truth for timing. Every component reads its
// window from here (durationInFrames is passed down); nothing is
// hard-coded per-component.
//
// NOTE on total length: the brief's own 0:00-0:30 timestamps assume the VO
// is read faster than the script actually supports. At a genuinely "calm
// and sincere, not rushed" cinematic pace (the brief's own delivery note),
// the full ~103-word script — with the pauses its own punctuation implies
// (the two "…" ellipses, the em-dash, sentence breaths) — runs to ~38s, not
// 30s. The brief explicitly allows this: "the total spoken script may
// naturally exceed 30 seconds... intelligently compress pauses and shot
// durations rather than cutting important words." Every word is kept;
// nothing here was cut to force a 30.0s runtime. Still very much in format
// for a Reel (30-90s is normal). Flagged to the user; trim on request.
// ---------------------------------------------------------------------------
export const SCENES: SceneDef[] = [
  {
    id: "historical-open",
    startSec: 0,
    endSec: 2.1,
    component: "HistoricalOpen",
    transitionIn: "fade",
    colorPhase: "historical",
    sfxNote: "low cinematic drone + one soft heartbeat/impact at 0:00",
    onScreenText: "79 YEARS",
  },
  {
    id: "journey-montage",
    startSec: 2.1,
    endSec: 6.5,
    component: "JourneyMontage",
    transitionIn: "dissolve",
    colorPhase: "journey",
    sfxNote: "subtle crowd/railway ambience easing into soft whooshes",
  },
  {
    id: "modern-india",
    startSec: 6.5,
    endSec: 12.3,
    component: "ModernIndiaFast",
    transitionIn: "dissolve",
    colorPhase: "modern",
    sfxNote: "restrained cinematic risers under fast cuts",
  },
  {
    id: "pause",
    startSec: 12.3,
    endSec: 15.5,
    component: "PauseBeat",
    transitionIn: "cut",
    colorPhase: "modern",
    sfxNote: "music/SFX drop out, let it breathe",
    onScreenText: "INDIA HAS COME A LONG WAY.",
  },
  {
    id: "gym-transition",
    startSec: 15.5,
    endSec: 19.1,
    component: "MatchCutTransition",
    assets: ["gym-9"],
    transitionIn: "matchcut",
    colorPhase: "gym",
    sfxNote: "riser resolving into a barbell/plate impact on landing",
    onScreenText: "ONE STEP AT A TIME.",
  },
  {
    id: "training",
    startSec: 19.1,
    endSec: 22.6,
    component: "GymTraining",
    assets: ["gym-1", "gym-2", "gym-5"],
    transitionIn: "cut",
    colorPhase: "gym",
    sfxNote: "chalk + grip + plate clank + heavy footstep, synced to cuts",
  },
  {
    id: "message",
    startSec: 22.6,
    endSec: 28.5,
    component: "AvatarSlot",
    transitionIn: "cut",
    colorPhase: "gym",
    sfxNote: "gym ambience under, no music swell yet",
    onScreenText: "STRONGER YOU. STRONGER INDIA.",
  },
  {
    id: "final",
    startSec: 28.5,
    endSec: 38.0,
    component: "FinalCard",
    transitionIn: "dissolve",
    colorPhase: "final",
    sfxNote: "music reaches emotional peak on 'Jai Hind', then resolves",
  },
];

export const TOTAL_DURATION = s(38.0);

// ---------------------------------------------------------------------------
// ASSETS — every real file this reel is allowed to use. No stock, no
// fabricated footage: the real Deadlift gym stills + the brand logo, the
// only assets that actually exist in this project.
// ---------------------------------------------------------------------------
export const ASSETS: Record<string, { file: string; shows: string }> = {
  "gym-1": { file: "images/gym-1.jpg", shows: "training floor, weights rack" },
  "gym-2": { file: "images/gym-2.jpg", shows: "member mid-lift" },
  "gym-3": { file: "images/gym-3.jpg", shows: "training floor detail" },
  "gym-4": { file: "images/gym-4.jpg", shows: "gym interior" },
  "gym-5": { file: "images/gym-5.jpg", shows: "member training, focused" },
  "gym-7": { file: "images/gym-7.jpg", shows: "gym interior wide" },
  "gym-8": { file: "images/gym-8.jpg", shows: "training detail" },
  "gym-9": { file: "images/gym-9.jpg", shows: "mural wall, strongest single frame" },
  "gym-10": { file: "images/gym-10.jpg", shows: "member training" },
  logo: { file: "brand/logo.jpg", shows: "Deadlift Fitness Studio logo" },
};

// ---------------------------------------------------------------------------
// CAPTIONS — restrained subtitle track (the brief's "CAPTION STYLE"), the
// exact supplied VO text word-for-word, nothing cut. Timed at ~3.3 words/
// sec (calm, cinematic, not rushed) plus real pauses at punctuation — see
// the SCENES note above for why this runs ~38s rather than a hard 30s.
// emphasis: words rendered in saffron/green per the brief's selective rule.
// ---------------------------------------------------------------------------
export type CaptionLine = {
  startSec: number;
  endSec: number;
  text: string;
  emphasis?: string[];
};

export const CAPTIONS: CaptionLine[] = [
  { startSec: 0.3, endSec: 2.1, text: "79 years ago, India became free.", emphasis: ["79 years", "free"] },
  { startSec: 2.3, endSec: 4.6, text: "From a young nation finding its way…" },
  { startSec: 4.7, endSec: 6.5, text: "to the India we see today." },
  { startSec: 6.7, endSec: 8.2, text: "A country that has grown," },
  { startSec: 8.3, endSec: 9.0, text: "dreamed bigger," },
  { startSec: 9.1, endSec: 9.7, text: "reached space," },
  { startSec: 9.8, endSec: 10.7, text: "built new things," },
  { startSec: 10.8, endSec: 12.3, text: "and moved forward every day." },
  { startSec: 12.5, endSec: 14.3, text: "India has come a long way." },
  {
    startSec: 15.5,
    endSec: 19.1,
    text: "And just like India, we grow stronger one step at a time.",
    emphasis: ["grow stronger", "one step at a time"],
  },
  { startSec: 19.3, endSec: 19.9, text: "One workout." },
  { startSec: 20.0, endSec: 20.7, text: "One rep." },
  { startSec: 20.8, endSec: 22.6, text: "One more day of hard work." },
  { startSec: 22.9, endSec: 24.9, text: "At Deadlift Fitness Studio, we believe—" },
  { startSec: 25.0, endSec: 26.6, text: "when you make yourself stronger,", emphasis: ["stronger"] },
  { startSec: 26.7, endSec: 28.2, text: "you help make India stronger.", emphasis: ["India stronger"] },
  { startSec: 28.5, endSec: 29.5, text: "This Independence Day," },
  { startSec: 29.6, endSec: 32.9, text: "let's be proud of how far we have come…" },
  { startSec: 33.0, endSec: 34.2, text: "and keep moving forward." },
  { startSec: 34.5, endSec: 35.7, text: "Happy 79th Independence Day." },
  { startSec: 35.9, endSec: 36.5, text: "Jai Hind.", emphasis: ["Jai Hind"] },
];

// ---------------------------------------------------------------------------
// MUSIC — volume-automation points per the brief's structure, remapped onto
// the real ~38s runtime. No track is supplied yet; components read this
// shape so dropping a real file in later is a one-line change (see
// IndependenceDayReel.tsx).
// ---------------------------------------------------------------------------
export const MUSIC_POINTS: { t: number; vol: number }[] = [
  { t: 0, vol: 0.05 },
  { t: 6, vol: 0.05 },
  { t: 15.5, vol: 0.14 },
  { t: 19.1, vol: 0.08 },
  { t: 20, vol: 0.1 },
  { t: 28.5, vol: 0.16 },
  { t: 36.5, vol: 0.22 },
  { t: 38, vol: 0.16 },
];

/**
 * AGENT NOTE (read before rendering final):
 * - No VO audio file exists. Generate the ElevenLabs VO (voice
 *   ZUGxRSksEcT3B1egIkN8) from the exact script — unedited — save as
 *   public/audio/independence-vo.mp3, and wire it into
 *   IndependenceDayReel.tsx's <Audio> tag. If the real read comes in at a
 *   different pace than assumed here (~3.3 wps), re-check CAPTIONS/SCENES
 *   against it — no tool here can whisper-transcribe to verify automatically.
 * - No HeyGen avatar clip exists yet (avatar id c1673ddc227d440a95d40f7ea63b0fd7,
 *   group "Indipendence day"). AvatarSlot.tsx is a placeholder stage (dark bg
 *   + soft key + red rim light, matched to the gym grade) — swap its
 *   silhouette div for an <OffthreadVideo> once the clip is generated,
 *   ideally audio-driven from the same ElevenLabs file for lip-sync.
 * - No music track supplied. Nothing plays on the music bed until one is
 *   provided; MUSIC_POINTS is ready to drive it the moment it exists.
 */
