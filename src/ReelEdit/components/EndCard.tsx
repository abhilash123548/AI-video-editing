import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./Backdrop";
import { bodyFont, headlineFont } from "../../GymTeaser/fonts";

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoProgress = spring({ frame, fps, config: { damping: 11, stiffness: 140 } });
  const textProgress = spring({ frame: frame - 15, fps, config: { damping: 18 } });

  return (
    <AbsoluteFill>
      <Backdrop opacity={0.82} />
      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "0 90px",
          textAlign: "center",
        }}
      >
        <Img
          src={staticFile("brand/logo.jpg")}
          style={{
            width: 200,
            borderRadius: 20,
            opacity: logoProgress,
            transform: `scale(${interpolate(logoProgress, [0, 1], [0.6, 1])})`,
          }}
        />
        <div
          style={{
            opacity: textProgress,
            transform: `translateY(${interpolate(textProgress, [0, 1], [20, 0])}px)`,
            fontFamily: headlineFont,
            fontSize: 46,
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          Follow Deadlift Fitness Studio
        </div>
        <div
          style={{
            opacity: textProgress,
            fontFamily: bodyFont,
            fontSize: 28,
            color: "#f2c9c9",
          }}
        >
          for more practical fitness tips
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
