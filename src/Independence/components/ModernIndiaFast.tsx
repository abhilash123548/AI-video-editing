import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "../fonts";

// 0:08-0:14 — "grown, dreamed bigger, reached space, built new things,
// moved forward". No real ISRO/tech/city footage exists here either. Fast
// minimal line-icon beats (~1s each) continue the JourneyMontage's rising
// line rather than faking stock footage — growth -> ambition -> tech ->
// people -> future, brightening throughout. Swap for real footage per shot
// when available (see ASSETS in data/timeline.ts for the pattern).
const BEATS = [
  { icon: "rocket", label: "space" },
  { icon: "circuit", label: "technology" },
  { icon: "city", label: "cities" },
  { icon: "grad", label: "students" },
  { icon: "wheat", label: "farmers" },
  { icon: "build", label: "infrastructure" },
] as const;

const BEAT_FRAMES = 30; // 1s each, 6 beats = 6s

export const ModernIndiaFast: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(Math.floor(frame / BEAT_FRAMES), BEATS.length - 1);
  const local = frame - idx * BEAT_FRAMES;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Beat key={idx} icon={BEATS[idx].icon} local={local} />
    </AbsoluteFill>
  );
};

const Beat: React.FC<{ icon: string; local: number }> = ({ icon, local }) => {
  const { fps } = useVideoConfig();
  const p = spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } });
  const scale = interpolate(p, [0, 1], [0.75, 1]);
  const opacity = interpolate(local, [0, 6, BEAT_FRAMES - 8, BEAT_FRAMES], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(local, [0, BEAT_FRAMES], [24, -10]);
  const color = palette.modern.accent;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${rise}px) scale(${scale})`,
      }}
    >
      <Icon name={icon} color={color} />
    </div>
  );
};

const Icon: React.FC<{ name: string; color: string }> = ({ name, color }) => {
  const stroke = { stroke: color, strokeWidth: 2.5, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const wrap = (children: React.ReactNode) => (
    <svg width="180" height="180" viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 14px ${color}66)` }}>
      {children}
    </svg>
  );

  switch (name) {
    case "rocket":
      return wrap(
        <>
          <path d="M50 10 L62 45 L62 70 L38 70 L38 45 Z" {...stroke} />
          <path d="M38 55 L22 75 M62 55 L78 75 M42 70 L42 85 M58 70 L58 85" {...stroke} />
          <circle cx="50" cy="35" r="5" {...stroke} />
        </>,
      );
    case "circuit":
      return wrap(
        <>
          <circle cx="50" cy="50" r="8" {...stroke} />
          <path d="M50 20 V38 M50 62 V80 M20 50 H38 M62 50 H80 M28 28 L38 38 M72 28 L62 38 M28 72 L38 62 M72 72 L62 62" {...stroke} />
          <circle cx="50" cy="20" r="4" {...stroke} />
          <circle cx="50" cy="80" r="4" {...stroke} />
          <circle cx="20" cy="50" r="4" {...stroke} />
          <circle cx="80" cy="50" r="4" {...stroke} />
        </>,
      );
    case "city":
      return wrap(
        <>
          <path d="M15 85 V50 H30 V85 M35 85 V30 H50 V85 M55 85 V45 H70 V85 M75 85 V60 H88 V85" {...stroke} />
          <path d="M10 85 H92" {...stroke} />
        </>,
      );
    case "grad":
      return wrap(
        <>
          <path d="M15 42 L50 28 L85 42 L50 56 Z" {...stroke} />
          <path d="M30 48 V65 Q50 76 70 65 V48" {...stroke} />
          <path d="M85 42 V60" {...stroke} />
        </>,
      );
    case "wheat":
      return wrap(
        <>
          <path d="M50 85 V30" {...stroke} />
          <path d="M50 35 Q40 30 38 20 M50 35 Q60 30 62 20 M50 48 Q40 43 38 33 M50 48 Q60 43 62 33 M50 61 Q40 56 38 46 M50 61 Q60 56 62 46" {...stroke} />
        </>,
      );
    case "build":
      return wrap(
        <>
          <path d="M20 85 V40 L50 22 L80 40 V85" {...stroke} />
          <path d="M35 85 V60 H65 V85" {...stroke} />
          <path d="M20 55 H80" {...stroke} />
        </>,
      );
    default:
      return wrap(<circle cx="50" cy="50" r="20" {...stroke} />);
  }
};
