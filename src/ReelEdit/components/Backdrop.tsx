import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Backdrop: React.FC<{ opacity?: number }> = ({ opacity = 0.72 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 20 } });
  const alpha = interpolate(progress, [0, 1], [0, opacity]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(4,4,6,${alpha})`,
        backdropFilter: `blur(${interpolate(progress, [0, 1], [0, 14])}px)`,
      }}
    />
  );
};
