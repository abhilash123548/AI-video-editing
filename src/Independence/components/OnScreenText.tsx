import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { sans } from "../fonts";

type Props = {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
};

// Sparse, restrained key-phrase card — the brief's "ON-SCREEN TEXT" layer,
// distinct from the subtitle captions. Fade + slight rise + gentle scale
// only; no bounce, no spin, no kinetic-type theatrics.
export const OnScreenText: React.FC<Props> = ({ text, delay = 0, fontSize = 56, color = "#ffffff" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;
  const progress = spring({ frame: local, fps, config: { damping: 20, stiffness: 120 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [18, 0]);
  const scale = interpolate(progress, [0, 1], [0.96, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        fontFamily: sans,
        fontWeight: 800,
        fontSize,
        letterSpacing: "0.01em",
        color,
        textAlign: "center",
        textShadow: "0 4px 24px rgba(0,0,0,0.6)",
        padding: "0 100px",
        whiteSpace: "pre-line",
      }}
    >
      {text}
    </div>
  );
};
