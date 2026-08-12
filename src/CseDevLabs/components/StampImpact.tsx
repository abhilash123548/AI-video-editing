import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { headlineFont } from "../fonts";
import { flashOpacity, shakeOffset } from "../utils/shake";

type Props = {
  text: string;
  sub?: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  rotateTo?: number;
  shake?: boolean;
};

const BLOBS = [
  { angle: 10, dist: 0.28, size: 1.3, radius: "63% 37% 54% 46% / 55% 48% 52% 45%" },
  { angle: 95, dist: 0.32, size: 1.1, radius: "42% 58% 63% 37% / 41% 55% 45% 59%" },
  { angle: 165, dist: 0.3, size: 1.4, radius: "58% 42% 39% 61% / 62% 44% 56% 38%" },
  { angle: 230, dist: 0.34, size: 1.15, radius: "48% 52% 61% 39% / 44% 58% 42% 56%" },
  { angle: 300, dist: 0.29, size: 1.25, radius: "55% 45% 47% 53% / 50% 40% 60% 50%" },
];

// The recurring "rubber stamp" motif: hard scale-in with overshoot, a
// splattered ink texture (irregular blobs, not a clean ring), a screen
// flash + shake on landing, and a slight rotation. Used identically at the
// hook (0:00), the phone lock-in (0:77), and the close (1:00) so it reads
// as an intentional signature.
export const StampImpact: React.FC<Props> = ({
  text,
  sub,
  delay = 0,
  fontSize = 84,
  color = "#ffffff",
  rotateTo = -3,
  shake = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;

  const progress = spring({ frame: local, fps, config: { damping: 9, stiffness: 260, mass: 0.7 } });
  const scale = interpolate(progress, [0, 1], [1.6, 1]);
  const rotate = interpolate(progress, [0, 1], [rotateTo - 8, rotateTo]);
  const opacity = interpolate(local, [0, 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const blobScale = interpolate(progress, [0, 1], [0.3, 1]);
  const blobOpacity = interpolate(local, [0, 3, 8, 22], [0, 0.8, 0.5, 0], { extrapolateRight: "clamp" });

  const impactFrame = delay + 2;
  const offset = shake ? shakeOffset(frame, impactFrame, 8, 9) : { x: 0, y: 0 };
  const flash = shake ? flashOpacity(frame, impactFrame, 5) : 0;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      {/* splattered ink texture behind the stamp */}
      <div style={{ position: "absolute", width: 460, height: 460, transform: `scale(${blobScale})` }}>
        {BLOBS.map((b, i) => {
          const rad = (b.angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * b.dist * 100;
          const y = 50 + Math.sin(rad) * b.dist * 100;
          const size = 130 * b.size;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                borderRadius: b.radius,
                background: color === "#ffffff" ? "rgba(255,59,59,0.55)" : `${color}88`,
                opacity: blobOpacity,
                filter: "blur(2px)",
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          opacity,
          transform: `scale(${scale}) rotate(${rotate}deg)`,
          border: `6px solid ${color}`,
          borderRadius: 18,
          padding: "22px 34px",
          background: "rgba(0,0,0,0.35)",
          boxShadow: `0 0 40px ${color}33`,
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

      {/* impact flash */}
      <AbsoluteFill style={{ backgroundColor: "#ffffff", opacity: flash, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
