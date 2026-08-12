import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { headlineFont } from "../fonts";

type Props = {
  text: string;
  sub?: string;
  delay?: number;
  fontSize?: number;
  color?: string;
};

// The recurring "rubber stamp" motif: hard scale-in with overshoot, a slight
// rotation, and an ink-splatter ring behind the text. Used identically at
// the hook (0:00), the phone lock-in (0:77), and the close (1:00) so it
// reads as an intentional signature.
export const StampImpact: React.FC<Props> = ({
  text,
  sub,
  delay = 0,
  fontSize = 84,
  color = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;

  const progress = spring({ frame: local, fps, config: { damping: 9, stiffness: 260, mass: 0.7 } });
  const scale = interpolate(progress, [0, 1], [1.35, 1]);
  const rotate = interpolate(progress, [0, 1], [-9, -3]);
  const opacity = interpolate(local, [0, 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringScale = interpolate(progress, [0, 1], [0.4, 1]);
  const ringOpacity = interpolate(local, [0, 4, 16], [0, 0.55, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
          background:
            "repeating-conic-gradient(from 0deg, rgba(255,59,59,0.65) 0deg 4deg, rgba(255,59,59,0) 4deg 12deg)",
          filter: "blur(1px)",
        }}
      />
      <div
        style={{
          opacity,
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          border: `6px solid ${color}`,
          borderRadius: 18,
          padding: "22px 34px",
          background: "rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            fontFamily: headlineFont,
            fontSize,
            color,
            textAlign: "center",
            textTransform: "uppercase",
            lineHeight: 1.05,
            letterSpacing: "0.02em",
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </div>
        {sub ? (
          <div
            style={{
              fontFamily: headlineFont,
              fontSize: fontSize * 0.32,
              color,
              textAlign: "center",
              marginTop: 6,
              letterSpacing: "0.15em",
            }}
          >
            {sub}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
