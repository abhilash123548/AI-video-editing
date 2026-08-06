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
          config: { damping: 14, stiffness: 160, mass: 0.6 },
        });
        const translateY = interpolate(progress, [0, 1], [40, 0]);
        return (
          <span
            key={i}
            style={{
              opacity: progress,
              transform: `translateY(${translateY}px)`,
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
