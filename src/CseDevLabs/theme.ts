import { interpolate, interpolateColors } from "remotion";
import { SCENE_RANGES } from "./beats";
import { palette } from "./fonts";

const TRANSITION = 18;
const DARK_SCENE = 2; // "capabilities" — the tech list gets a dramatic dark-mode switch

export type SceneTheme = {
  bg: string;
  ink: string;
  inkSoft: string;
  line: string;
  darkness: number;
};

const LIGHT = { bg: palette.bg, ink: palette.ink, inkSoft: palette.inkSoft, line: palette.line };
const DARK = { bg: "#0B1220", ink: "#F5F7FF", inkSoft: "#A6B1D6", line: "rgba(255,255,255,0.14)" };

// Not a React hook despite the name shape — pure function of `frame`, so it's
// safe to call per-item inside a loop (e.g. once per word beat) as well as
// once per render for persistent chrome like the background.
export function getSceneTheme(frame: number): SceneTheme {
  const range = SCENE_RANGES.find((r) => r.scene === DARK_SCENE)!;
  const darkness = interpolate(
    frame,
    [range.start - TRANSITION, range.start, range.end, range.end + TRANSITION],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return {
    bg: interpolateColors(darkness, [0, 1], [LIGHT.bg, DARK.bg]),
    ink: interpolateColors(darkness, [0, 1], [LIGHT.ink, DARK.ink]),
    inkSoft: interpolateColors(darkness, [0, 1], [LIGHT.inkSoft, DARK.inkSoft]),
    line: interpolateColors(darkness, [0, 1], [LIGHT.line, DARK.line]),
    darkness,
  };
}
