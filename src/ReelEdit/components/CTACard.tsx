import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "./Backdrop";
import { BookmarkIcon } from "../icons";
import { headlineFont } from "../../GymTeaser/fonts";

export const CTACard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 8, stiffness: 260, mass: 0.6 } });
  const scale = interpolate(progress, [0, 0.55, 1], [0.3, 1.25, 1]);
  const bob = Math.sin(frame / 5) * 4;

  return (
    <AbsoluteFill>
      <Backdrop opacity={0.75} />
      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div style={{ opacity: progress, transform: `scale(${scale}) translateY(${bob}px)` }}>
          <BookmarkIcon size={120} color="#ff3b3b" />
        </div>
        <div
          style={{
            opacity: progress,
            transform: `scale(${scale})`,
            fontFamily: headlineFont,
            fontSize: 84,
            color: "#ffffff",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Save This Video
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
