import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Backdrop: React.FC<{ opacity?: number; tint?: string }> = ({
  opacity = 0.72,
  tint = "255,59,59",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 20 } });
  const alpha = interpolate(progress, [0, 1], [0, opacity]);

  const driftX = 50 + Math.sin(frame / 55) * 22;
  const driftY = 40 + Math.cos(frame / 70) * 18;
  const sweep = ((frame * 1.6) % 220) - 60;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(4,4,6,${alpha})`,
          backdropFilter: `blur(${interpolate(progress, [0, 1], [0, 14])}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: alpha,
          background: `radial-gradient(circle at ${driftX}% ${driftY}%, rgba(${tint},0.35) 0%, rgba(${tint},0) 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: alpha * 0.5,
          background: `linear-gradient(115deg, transparent ${sweep - 18}%, rgba(255,255,255,0.10) ${sweep}%, transparent ${sweep + 18}%)`,
        }}
      />
    </AbsoluteFill>
  );
};
