import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { brand } from "../fonts";
import { TONE_TURN_FRAME } from "../data/timeline";

// Full-timeline background wash. Cool/desaturated + tense for the
// Hook-Problem-Agitate run, warms up into the brand palette from the
// Solution section onward. Never a static color: a slow heartbeat pulse,
// drifting grain, and a vignette keep it feeling like a "cinematic build"
// rather than a flat fill.
export const Grade: React.FC = () => {
  const frame = useCurrentFrame();
  const warmth = interpolate(frame, [TONE_TURN_FRAME - 20, TONE_TURN_FRAME + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bg0 = mixHex(brand.cool.bg0, brand.warm.bg0, warmth);
  const bg1 = mixHex(brand.cool.bg1, brand.warm.bg1, warmth);

  // Slow tense heartbeat before the tone turn; a calmer, warmer breathing
  // pulse after it.
  const pulseSpeed = interpolate(warmth, [0, 1], [14, 26]);
  const pulseDepth = interpolate(warmth, [0, 1], [0.12, 0.06]);
  const pulse = 1 + Math.sin(frame / pulseSpeed) * pulseDepth;

  const glowColor = warmth < 0.5 ? brand.cool.danger : brand.warm.accent;
  const grainDrift = (frame * 3.7) % 240;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 22%, ${bg1} 0%, ${bg0} 72%)`,
        }}
      />
      {/* tense pulsing glow, red pre-turn / amber post-turn */}
      <AbsoluteFill
        style={{
          transform: `scale(${pulse})`,
          background: `radial-gradient(circle at 50% 30%, ${glowColor}22 0%, transparent 55%)`,
        }}
      />
      {/* drifting film-grain texture */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage:
            "repeating-radial-gradient(circle at 0 0, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)",
          backgroundSize: "5px 5px",
          transform: `translate(${grainDrift % 5}px, ${(grainDrift * 1.3) % 5}px)`,
        }}
      />
      {/* faint horizontal scanlines for a monitor/screen-glow feel */}
      <AbsoluteFill
        style={{
          opacity: 0.05,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, transparent 1px, transparent 3px)",
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
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
