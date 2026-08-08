import { interpolate, useCurrentFrame } from "remotion";
import { palette } from "./fonts";

type Props = {
  totalDuration: number;
};

export const ProgressBar: React.FC<Props> = ({ totalDuration }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, totalDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        right: 56,
        bottom: 64,
        height: 4,
        borderRadius: 2,
        background: palette.line,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${palette.blue} 0%, ${palette.violet} 100%)`,
          borderRadius: 2,
        }}
      />
    </div>
  );
};
