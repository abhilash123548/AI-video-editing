import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette } from "./fonts";
import type { SceneTheme } from "./theme";

type Props = {
  theme: SceneTheme;
};

// Soft light-tech backdrop: dotted grid + two slow-drifting gradient blobs.
// Crossfades into a dramatic dark surface for the capabilities section.
export const Background: React.FC<Props> = ({ theme }) => {
  const frame = useCurrentFrame();

  const blobA = {
    x: interpolate(frame, [0, 1450], [-6, 10], { extrapolateRight: "clamp" }),
    y: interpolate(frame, [0, 1450], [-4, 6], { extrapolateRight: "clamp" }),
  };
  const blobB = {
    x: interpolate(frame, [0, 1450], [8, -8], { extrapolateRight: "clamp" }),
    y: interpolate(frame, [0, 1450], [6, -6], { extrapolateRight: "clamp" }),
  };

  const blobOpacity = interpolate(theme.darkness, [0, 1], [1, 0.7]);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${theme.line} 1.5px, transparent 1.5px)`,
          backgroundSize: "44px 44px",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          opacity: blobOpacity,
          transform: `translate(${blobA.x}%, ${blobA.y}%)`,
          background: `radial-gradient(circle at 20% 20%, ${palette.blueSoft} 0%, transparent 45%)`,
          filter: "blur(2px)",
          mixBlendMode: theme.darkness > 0.5 ? "screen" : "normal",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          opacity: blobOpacity,
          transform: `translate(${blobB.x}%, ${blobB.y}%)`,
          background: `radial-gradient(circle at 80% 80%, ${palette.violetSoft} 0%, transparent 45%)`,
          filter: "blur(2px)",
          mixBlendMode: theme.darkness > 0.5 ? "screen" : "normal",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${theme.bg} 92%)`,
        }}
      />
    </AbsoluteFill>
  );
};
