import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { OnScreenText } from "./OnScreenText";
import { palette } from "../fonts";

// 0:14-0:17 — emotional reset. Editing slows down, one calm held frame,
// let the music breathe. No real "strong modern India shot" exists, so
// this holds the journey motif at rest — a settled, steady glow rather
// than more motion — with the beat's one on-screen line.
export const PauseBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 45, 90], [0.5, 0.85, 0.6]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          opacity: glow * 0.35,
          background: `radial-gradient(circle, ${palette.modern.accent}55 0%, transparent 70%)`,
        }}
      />
      <OnScreenText text="INDIA HAS COME A LONG WAY." fontSize={46} delay={10} />
    </AbsoluteFill>
  );
};
