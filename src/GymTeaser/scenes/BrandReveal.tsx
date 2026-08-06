import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, headlineFont } from "../fonts";

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameProgress = spring({ frame, fps, config: { damping: 11, stiffness: 140 } });
  const nameScale = interpolate(nameProgress, [0, 1], [0.6, 1]);
  const taglineOpacity = spring({ frame: frame - 20, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #1a0505 0%, #050505 70%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: nameProgress,
            transform: `scale(${nameScale})`,
            fontFamily: headlineFont,
            color: "#ffffff",
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          DEADLIFT
        </div>
        <div
          style={{
            opacity: nameProgress,
            transform: `scale(${nameScale})`,
            fontFamily: headlineFont,
            color: "#e0121a",
            fontSize: 64,
            letterSpacing: "0.15em",
          }}
        >
          FITNESS STUDIO
        </div>
        <div
          style={{
            opacity: taglineOpacity,
            fontFamily: bodyFont,
            color: "#f2c9c9",
            fontSize: 32,
            letterSpacing: "0.08em",
            marginTop: 10,
          }}
        >
          AC GYM FOR LADIES AND GENTS
        </div>
      </div>
    </AbsoluteFill>
  );
};
