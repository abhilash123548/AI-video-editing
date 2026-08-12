import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { brand } from "../fonts";
import { TONE_TURN_FRAME } from "../data/timeline";

// Full-timeline background wash. Cool/desaturated for Problem-Agitate,
// warms up into the brand palette from the Solution section onward.
export const Grade: React.FC = () => {
  const frame = useCurrentFrame();
  const warmth = interpolate(frame, [TONE_TURN_FRAME - 20, TONE_TURN_FRAME + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bg0 = mixHex(brand.cool.bg0, brand.warm.bg0, warmth);
  const bg1 = mixHex(brand.cool.bg1, brand.warm.bg1, warmth);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 20%, ${bg1} 0%, ${bg0} 70%)`,
      }}
    />
  );
};

function mixHex(a: string, b: string, t: number): string {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
