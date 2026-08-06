import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";

type Props = {
  src: string;
  durationInFrames: number;
  direction?: "in" | "out";
  focalPosition?: string;
};

export const KenBurnsImage: React.FC<Props> = ({
  src,
  durationInFrames,
  direction = "in",
  focalPosition = "center",
}) => {
  const frame = useCurrentFrame();
  const startScale = direction === "in" ? 1 : 1.15;
  const endScale = direction === "in" ? 1.15 : 1;
  const scale = interpolate(frame, [0, durationInFrames], [startScale, endScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focalPosition,
          transform: `scale(${scale})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
