import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette } from "./fonts";

// Soft light-tech backdrop: dotted grid + two slow-drifting gradient blobs.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const blobA = {
    x: interpolate(frame, [0, 1450], [-6, 10], { extrapolateRight: "clamp" }),
    y: interpolate(frame, [0, 1450], [-4, 6], { extrapolateRight: "clamp" }),
  };
  const blobB = {
    x: interpolate(frame, [0, 1450], [8, -8], { extrapolateRight: "clamp" }),
    y: interpolate(frame, [0, 1450], [6, -6], { extrapolateRight: "clamp" }),
  };

  return (
    <AbsoluteFill style={{ backgroundColor: palette.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${palette.line} 1.5px, transparent 1.5px)`,
          backgroundSize: "44px 44px",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          transform: `translate(${blobA.x}%, ${blobA.y}%)`,
          background: `radial-gradient(circle at 20% 20%, ${palette.blueSoft} 0%, transparent 45%)`,
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          transform: `translate(${blobB.x}%, ${blobB.y}%)`,
          background: `radial-gradient(circle at 80% 80%, ${palette.violetSoft} 0%, transparent 45%)`,
          filter: "blur(2px)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, ${palette.bg} 92%)`,
        }}
      />
    </AbsoluteFill>
  );
};
