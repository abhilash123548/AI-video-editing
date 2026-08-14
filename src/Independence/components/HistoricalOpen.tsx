import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { OnScreenText } from "./OnScreenText";
import { FilmGrain } from "./FilmGrain";
import { palette } from "../fonts";

// 0:00-0:03 — no real 1947 archival footage exists or is fetchable here, so
// this is deliberately NOT a fake "vintage photo" collage (that reads as
// cheap AI slop and disrespects the subject). Instead: black, quiet, a
// single warm hairline drawing itself in, "79 YEARS" fading up small.
// Swap in real archival footage/photos behind this treatment when available.
export const HistoricalOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const lineProgress = spring({ frame: frame - 10, fps, config: { damping: 24, stiffness: 60 } });
  const textP = spring({ frame: frame - 45, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill
        style={{
          opacity: fadeIn,
          background: `radial-gradient(circle at 50% 50%, ${palette.historical.warm}18 0%, transparent 60%)`,
        }}
      />
      <div style={{ width: 320, height: 1, position: "relative", opacity: fadeIn }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            height: 1,
            width: `${lineProgress * 160}px`,
            background: palette.historical.warm,
            transform: "translateX(-50%)",
          }}
        />
      </div>
      <div style={{ position: "absolute", opacity: textP }}>
        <OnScreenText text="79 YEARS" fontSize={44} color={palette.historical.warm} delay={0} />
      </div>
      <FilmGrain intensity={0.1} />
    </AbsoluteFill>
  );
};
