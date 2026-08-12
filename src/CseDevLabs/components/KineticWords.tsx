import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { headlineFont } from "../fonts";

type Line = {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  strike?: boolean;
  underline?: boolean;
};

type Props = {
  lines: Line[];
  align?: "center" | "flex-start" | "flex-end";
};

// Punch-in text: 0.9 -> 1.05 -> 1.0 overshoot, per the global style guide.
export const KineticWords: React.FC<Props> = ({ lines, align = "center" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align, gap: 14 }}>
      {lines.map((line, i) => {
        const delay = line.delay ?? i * 10;
        const local = frame - delay;
        const progress = spring({ frame: local, fps, config: { damping: 13, stiffness: 260, mass: 0.6 } });
        const scale = interpolate(progress, [0, 0.6, 1], [0.9, 1.05, 1]);
        const opacity = interpolate(local, [0, 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const strikeProgress = interpolate(local, [10, 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const underlineProgress = interpolate(local, [8, 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div key={i} style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                display: "inline-block",
                opacity,
                transform: `scale(${scale})`,
                fontFamily: headlineFont,
                fontSize: line.fontSize ?? 72,
                color: line.color ?? "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "0.01em",
                lineHeight: 1.05,
                textAlign: align === "center" ? "center" : align === "flex-start" ? "left" : "right",
                textShadow: "0 4px 24px rgba(0,0,0,0.55)",
              }}
            >
              {line.text}
            </span>
            {line.strike ? (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  height: 6,
                  width: `${strikeProgress * 100}%`,
                  background: "#ff3b3b",
                  transform: "translateY(-50%) rotate(-2deg)",
                  borderRadius: 3,
                }}
              />
            ) : null}
            {line.underline ? (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: -8,
                  height: 6,
                  width: `${underlineProgress * 100}%`,
                  background: "#ff3b3b",
                  borderRadius: 3,
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
