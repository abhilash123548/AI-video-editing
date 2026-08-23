import { AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";

type Props = {
  src: string;
  durationInFrames: number;
  fadeOutFrames?: number;
};

export const WatermarkedVideo: React.FC<Props> = ({ src, durationInFrames, fadeOutFrames = 20 }) => {
  const frame = useCurrentFrame();

  const volume = interpolate(
    frame,
    [0, durationInFrames - fadeOutFrames, durationInFrames],
    [1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const watermarkOpacity = interpolate(frame, [0, 20], [0, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <OffthreadVideo src={src} volume={volume} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill
        style={{ justifyContent: "flex-end", alignItems: "flex-end", padding: 36 }}
      >
        <div
          style={{
            opacity: watermarkOpacity,
            backgroundColor: "rgba(10,10,10,0.55)",
            borderRadius: 16,
            padding: 8,
            boxShadow: "0 4px 18px rgba(0,0,0,0.45)",
          }}
        >
          <Img src={staticFile("brand/logo.jpg")} style={{ width: 88, borderRadius: 10, display: "block" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
