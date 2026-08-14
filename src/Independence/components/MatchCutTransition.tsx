import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { KenBurnsImage } from "../../GymTeaser/KenBurnsImage";
import { OnScreenText } from "./OnScreenText";
import { ASSETS } from "../data/timeline";
import { palette } from "../fonts";
import { staticFile } from "remotion";

// 0:17-0:21 — "the most important transition in the entire Reel": the
// growth-line orb from the India section contracts into a ring (reads as
// a weight plate), then irises open on REAL Deadlift Fitness Studio
// footage. India's progress becomes personal progress in one continuous
// motion, not a hard cut.
export const MatchCutTransition: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // phase 1 (0-1.2s): orb contracts into a ring ("plate")
  const ringT = interpolate(frame, [0, 36], [0, 1], { extrapolateRight: "clamp" });
  const ringSize = interpolate(ringT, [0, 1], [200, 90]);
  const ringColor = mix(palette.modern.accent, "#c9c9c9", ringT);

  // phase 2 (1.0-2.6s): iris opens from the ring's position
  const irisT = interpolate(frame, [30, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const irisRadius = interpolate(irisT, [0, 1], [45, 1400]);

  const textP = interpolate(frame, [90, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      {/* revealed gym footage, masked by the growing iris */}
      <AbsoluteFill
        style={{
          clipPath: `circle(${irisRadius}px at 50% 50%)`,
        }}
      >
        <KenBurnsImage
          src={staticFile(ASSETS["gym-9"].file)}
          durationInFrames={durationInFrames}
          direction="in"
          focalPosition="center 35%"
        />
      </AbsoluteFill>

      {/* the contracting ring/plate, fades out once the iris takes over */}
      <div
        style={{
          position: "absolute",
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: `10px solid ${ringColor}`,
          opacity: interpolate(frame, [36, 60], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          boxShadow: `0 0 30px ${ringColor}aa`,
        }}
      />

      {/* upper-third placement — the caption layer owns the bottom zone */}
      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 260 }}>
        <div style={{ opacity: textP }}>
          <OnScreenText text="ONE STEP AT A TIME." fontSize={46} delay={0} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

function mix(a: string, b: string, t: number): string {
  const pa = hex(a);
  const pb = hex(b);
  return `rgb(${Math.round(pa[0] + (pb[0] - pa[0]) * t)},${Math.round(pa[1] + (pb[1] - pa[1]) * t)},${Math.round(pa[2] + (pb[2] - pa[2]) * t)})`;
}
function hex(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
