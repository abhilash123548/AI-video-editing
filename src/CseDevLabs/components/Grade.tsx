import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { brand } from "../fonts";
import { TONE_TURN_FRAME } from "../data/timeline";

// Full-timeline background wash. Cool/desaturated + tense for the
// Hook-Problem-Agitate run, warms up into the brand palette from the
// Solution section onward. This is deliberately NOT a static fill: two
// drifting color blobs, a slow-rotating light-ray burst, grain, and a
// vignette keep it reading as a moving "cinematic build" at all times.
export const Grade: React.FC = () => {
  const frame = useCurrentFrame();
  const warmth = interpolate(frame, [TONE_TURN_FRAME - 20, TONE_TURN_FRAME + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bg0 = mixHex(brand.cool.bg0, brand.warm.bg0, warmth);
  const bg1 = mixHex(brand.cool.bg1, brand.warm.bg1, warmth);
  const glowA = warmth < 0.5 ? brand.cool.accent : brand.warm.accent2;
  const glowB = warmth < 0.5 ? brand.cool.danger : brand.warm.accent;

  // Two independently drifting blobs (Lissajous-style paths) — always in
  // motion, never settling into a static frame.
  const blobAx = 50 + Math.sin(frame / 90) * 26;
  const blobAy = 32 + Math.cos(frame / 130) * 16;
  const blobBx = 55 + Math.cos(frame / 110) * 30;
  const blobBy = 68 + Math.sin(frame / 150) * 18;

  const rayRotation = frame * 0.35;
  const grainDrift = (frame * 3.7) % 240;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ background: bg0 }} />

      {/* drifting color blobs */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${blobAx}% ${blobAy}%, ${glowA}33 0%, transparent 45%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${blobBx}% ${blobBy}%, ${glowB}2e 0%, transparent 42%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 20%, ${bg1}cc 0%, transparent 60%)`,
        }}
      />

      {/* slow-rotating light-ray burst, off-center for asymmetry */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-20%",
          width: 1400,
          height: 1400,
          opacity: 0.08,
          transform: `rotate(${rayRotation}deg)`,
          background: `repeating-conic-gradient(from 0deg, ${glowA} 0deg 2deg, transparent 2deg 14deg)`,
          borderRadius: "50%",
        }}
      />

      {/* drifting film-grain texture */}
      <AbsoluteFill
        style={{
          opacity: 0.08,
          mixBlendMode: "overlay",
          backgroundImage:
            "repeating-radial-gradient(circle at 0 0, rgba(255,255,255,0.9) 0, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 3px)",
          backgroundSize: "5px 5px",
          transform: `translate(${grainDrift % 5}px, ${(grainDrift * 1.3) % 5}px)`,
        }}
      />

      {/* vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle at 50% 45%, transparent 38%, rgba(0,0,0,0.6) 100%)",
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
