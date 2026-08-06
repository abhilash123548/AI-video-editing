import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
};

export const KineticLine: React.FC<Props> = ({
  text,
  delay = 0,
  fontSize = 90,
  color = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0 0.35em",
      }}
    >
      {words.map((word, i) => {
        const wordDelay = delay + i * 3;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 11, stiffness: 220, mass: 0.55 },
        });
        const translateY = interpolate(progress, [0, 1], [46, 0]);
        const scale = interpolate(progress, [0, 0.7, 1], [0.4, 1.08, 1]);
        const rotate = interpolate(progress, [0, 1], [-6, 0]);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
              fontSize,
              color,
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1.05,
              textTransform: "uppercase",
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
