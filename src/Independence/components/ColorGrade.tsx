import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette } from "../fonts";
import { s } from "../data/timeline";

const BOUNDS: { phase: keyof typeof palette; from: number; to: number }[] = [
  { phase: "historical", from: 0, to: 3 },
  { phase: "journey", from: 3, to: 8 },
  { phase: "modern", from: 8, to: 17 },
  { phase: "gym", from: 17, to: 28 },
  { phase: "final", from: 28, to: 30 },
];

const CROSSFADE = 15; // frames

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return `rgb(${Math.round(ar + (br - ar) * t)}, ${Math.round(ag + (bg - ag) * t)}, ${Math.round(ab + (bb - ab) * t)})`;
}

// The single background wash for the whole reel: historical muted-warm ->
// journey warm -> modern clean/bright -> gym charcoal/red -> final dark.
// Crossfades across phase boundaries instead of hard-cutting the grade.
export const ColorGrade: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = BOUNDS.findIndex((b) => frame < s(b.to)) ?? BOUNDS.length - 1;
  const current = BOUNDS[Math.max(0, idx)];
  const next = BOUNDS[Math.min(BOUNDS.length - 1, Math.max(0, idx) + 1)];

  const boundaryFrame = s(current.to);
  const t = interpolate(frame, [boundaryFrame - CROSSFADE, boundaryFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const curP = palette[current.phase];
  const nextP = palette[next.phase];
  const bg0 = mix(curP.bg0, nextP.bg0, t);
  const bg1 = mix(curP.bg1, nextP.bg1, t);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 25%, ${bg1} 0%, ${bg0} 75%)`,
      }}
    />
  );
};
