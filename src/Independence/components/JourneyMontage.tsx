import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette } from "../fonts";

// 0:03-0:08 — "India's journey", 1947 to today. No real archival photos or
// footage exist for this beat either. A rising growth-line motif, drawn
// left to right, standing in for the montage until real footage/photos are
// supplied — it also sets up the visual language the modern section and
// gym match-cut both pay off (a trajectory that keeps climbing).
export const JourneyMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [10, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brighten = interpolate(frame, [0, 150], [0, 1]);
  const glow = mix(palette.journey.warm, palette.modern.accent, brighten);

  const points = [0, 0.3, 0.62, 1];
  const pathY = (t: number) => 0.62 - t * 0.22;

  const d = points
    .map((t, i) => {
      const x = t * 780 - 390;
      const y = (pathY(t) - 0.5) * 400;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <svg width="900" height="500" viewBox="-450 -250 900 500" style={{ overflow: "visible" }}>
        <path
          d={d}
          fill="none"
          stroke={glow}
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1 - draw,
            filter: `drop-shadow(0 0 8px ${glow}88)`,
          }}
        />
        {points.slice(1).map((t, i) => {
          const appearAt = 20 + i * 35;
          const p = interpolate(frame, [appearAt, appearAt + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = t * 780 - 390;
          const y = (pathY(t) - 0.5) * 400;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={5 * p}
              fill={glow}
              opacity={p}
              style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

function mix(a: string, b: string, t: number): string {
  const pa = hex(a);
  const pb = hex(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}
function hex(h: string): [number, number, number] {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
