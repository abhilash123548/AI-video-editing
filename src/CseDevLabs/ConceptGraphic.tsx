import { interpolate } from "remotion";
import type { GraphicVariant } from "./beats";
import { palette } from "./fonts";

type Props = {
  variant: GraphicVariant;
  frame: number;
  duration: number;
  seed: number;
};

// A small library of abstract (non-literal) animated glyphs, one per concept
// category. Each draws in via SVG `pathLength` (dash-offset works regardless
// of the path's real geometry), holds, then fades with the word beat.
export const ConceptGraphic: React.FC<Props> = ({ variant, frame, duration, seed }) => {
  const gradientId = `conceptStroke-${seed}`;
  const drawIn = Math.min(16, Math.max(3, Math.floor(duration * 0.4)));
  const outFrames = Math.min(8, Math.max(2, Math.floor(duration * 0.25)));
  const outStart = Math.max(drawIn, duration - outFrames);

  const draw = interpolate(frame, [0, drawIn], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [outStart, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = draw * fadeOut;
  const scale = interpolate(draw, [0, 1], [0.8, 1]);
  const wobble = (seed % 7) - 3; // -3..3 deg, keeps repeated variants feeling less identical
  const ringRotate = (seed % 2 === 0 ? 1 : -1) * frame * 0.9;
  const ringOpacity = interpolate(draw, [0, 0.5], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 260,
        height: 220,
        opacity,
        transform: `scale(${scale}) rotate(${wobble}deg)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        width={200}
        height={200}
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          opacity: ringOpacity,
          transform: `rotate(${ringRotate}deg)`,
        }}
      >
        <circle
          cx={100}
          cy={100}
          r={92}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
      </svg>
      <svg width={210} height={170} viewBox="0 0 240 200">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.blue} />
            <stop offset="100%" stopColor={palette.violet} />
          </linearGradient>
        </defs>
        {renderVariant(variant, draw, frame, seed, gradientId)}
      </svg>
    </div>
  );
};

function renderVariant(
  variant: GraphicVariant,
  draw: number,
  frame: number,
  seed: number,
  gradientId: string,
) {
  const stroke = `url(#${gradientId})`;
  switch (variant) {
    case "network":
      return <NetworkGlyph draw={draw} stroke={stroke} seed={seed} />;
    case "chain":
      return <ChainGlyph draw={draw} stroke={stroke} />;
    case "shield":
      return <ShieldGlyph draw={draw} stroke={stroke} frame={frame} />;
    case "bars":
      return <BarsGlyph draw={draw} />;
    case "device":
      return <DeviceGlyph draw={draw} stroke={stroke} />;
    case "code":
      return <CodeGlyph draw={draw} stroke={stroke} />;
    case "doc":
      return <DocGlyph draw={draw} stroke={stroke} />;
    case "burst":
      return <BurstGlyph draw={draw} />;
    case "people":
      return <PeopleGlyph draw={draw} stroke={stroke} />;
    case "spark":
      return <SparkGlyph draw={draw} stroke={stroke} />;
    default:
      return null;
  }
}

const dash = (progress: number, delay = 0, span = 1) => {
  const local = interpolate(progress, [delay, delay + span], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { strokeDasharray: 1, strokeDashoffset: 1 - local };
};

const NetworkGlyph: React.FC<{ draw: number; stroke: string; seed: number }> = ({
  draw,
  stroke,
  seed,
}) => {
  const base = [
    [50, 60],
    [120, 30],
    [190, 55],
    [60, 130],
    [130, 110],
    [195, 140],
    [120, 170],
  ];
  const nodes = base.map(([x, y], i) => {
    const jitter = ((seed * (i + 3)) % 9) - 4;
    return [x + jitter, y + jitter / 2] as const;
  });
  const edges = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 6],
  ];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          pathLength={1}
          opacity={0.85}
          {...dash(draw, i * 0.06, 0.5)}
        />
      ))}
      {nodes.map(([x, y], i) => {
        const s = interpolate(draw, [0.3 + i * 0.05, 0.55 + i * 0.05], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return <circle key={i} cx={x} cy={y} r={5 * s + 2} fill={stroke} />;
      })}
    </g>
  );
};

const ChainGlyph: React.FC<{ draw: number; stroke: string }> = ({ draw, stroke }) => {
  const hexes = [50, 120, 190];
  const points = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 })
      .map((_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
      })
      .join(" ");
  return (
    <g>
      {hexes.map((cx, i) => {
        const s = interpolate(draw, [i * 0.22, i * 0.22 + 0.4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <polygon
            key={cx}
            points={points(cx, 100, 34)}
            fill="none"
            stroke={stroke}
            strokeWidth={3}
            opacity={s}
            transform={`scale(${0.6 + 0.4 * s})`}
            transform-origin={`${cx}px 100px`}
          />
        );
      })}
      {[0, 1].map((i) => (
        <line
          key={i}
          x1={hexes[i] + 34}
          y1={100}
          x2={hexes[i + 1] - 34}
          y2={100}
          stroke={stroke}
          strokeWidth={3}
          pathLength={1}
          {...dash(draw, 0.5 + i * 0.15, 0.3)}
        />
      ))}
    </g>
  );
};

const ShieldGlyph: React.FC<{ draw: number; stroke: string; frame: number }> = ({
  draw,
  stroke,
  frame,
}) => {
  const path = "M120 20 L190 45 L190 100 C190 145 160 175 120 190 C80 175 50 145 50 100 L50 45 Z";
  const scanY = 30 + (interpolate(frame % 30, [0, 30], [0, 1]) * 150);
  return (
    <g>
      <path d={path} fill="none" stroke={stroke} strokeWidth={4} pathLength={1} {...dash(draw, 0, 0.7)} />
      <circle
        cx={120}
        cy={110}
        r={interpolate(draw, [0.4, 1], [0, 46])}
        fill="none"
        stroke={palette.cyan}
        strokeWidth={2}
        opacity={interpolate(draw, [0.4, 0.7, 1], [0, 0.5, 0])}
      />
      <clipPath id="shieldClip">
        <path d={path} />
      </clipPath>
      <line
        x1={40}
        x2={200}
        y1={scanY}
        y2={scanY}
        stroke={palette.cyan}
        strokeWidth={3}
        clipPath="url(#shieldClip)"
        opacity={draw}
      />
    </g>
  );
};

const BarsGlyph: React.FC<{ draw: number }> = ({ draw }) => {
  const heights = [60, 95, 75, 120, 90];
  const colors = [palette.blue, palette.violet, palette.blue, palette.violet, palette.cyan];
  return (
    <g>
      {heights.map((h, i) => {
        const s = interpolate(draw, [i * 0.13, i * 0.13 + 0.45], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const x = 35 + i * 38;
        const barH = h * s;
        return (
          <rect
            key={i}
            x={x}
            y={175 - barH}
            width={24}
            height={barH}
            rx={6}
            fill={colors[i]}
            opacity={0.9}
          />
        );
      })}
      <line x1={25} y1={176} x2={215} y2={176} stroke={palette.line} strokeWidth={2} />
    </g>
  );
};

const DeviceGlyph: React.FC<{ draw: number; stroke: string }> = ({ draw, stroke }) => {
  return (
    <g>
      <rect
        x={70}
        y={15}
        width={100}
        height={170}
        rx={16}
        fill="none"
        stroke={stroke}
        strokeWidth={4}
        pathLength={1}
        {...dash(draw, 0, 0.7)}
      />
      {[0, 1, 2, 3].map((i) => {
        const cx = 95 + (i % 2) * 50;
        const cy = 60 + Math.floor(i / 2) * 50;
        const s = interpolate(draw, [0.45 + i * 0.08, 0.7 + i * 0.08], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return <rect key={i} x={cx - 12} y={cy - 12} width={24} height={24} rx={7} fill={stroke} opacity={s} />;
      })}
    </g>
  );
};

const CodeGlyph: React.FC<{ draw: number; stroke: string }> = ({ draw, stroke }) => {
  const leftX = interpolate(draw, [0, 0.4], [110, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rightX = interpolate(draw, [0, 0.4], [130, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <g opacity={interpolate(draw, [0, 0.15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
      <path
        d={`M${leftX} 60 L${leftX - 30} 100 L${leftX} 140`}
        fill="none"
        stroke={stroke}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M${rightX} 60 L${rightX + 30} 100 L${rightX} 140`}
        fill="none"
        stroke={stroke}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[0, 1, 2].map((i) => {
        const w = [46, 30, 38][i];
        const s = interpolate(draw, [0.35 + i * 0.15, 0.6 + i * 0.15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <rect
            key={i}
            x={120 - w / 2}
            y={78 + i * 16}
            width={w * s}
            height={6}
            rx={3}
            fill={palette.cyan}
            opacity={0.8}
          />
        );
      })}
    </g>
  );
};

const DocGlyph: React.FC<{ draw: number; stroke: string }> = ({ draw, stroke }) => {
  return (
    <g>
      <path
        d="M75 20 H140 L165 45 V180 H75 Z"
        fill="none"
        stroke={stroke}
        strokeWidth={4}
        pathLength={1}
        {...dash(draw, 0, 0.6)}
      />
      <path d="M140 20 V45 H165 Z" fill={stroke} opacity={interpolate(draw, [0.4, 0.6], [0, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {[0, 1, 2, 3].map((i) => {
        const w = [65, 50, 60, 40][i];
        const s = interpolate(draw, [0.5 + i * 0.1, 0.75 + i * 0.1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return <rect key={i} x={92} y={80 + i * 20} width={w * s} height={6} rx={3} fill={stroke} opacity={0.8} />;
      })}
    </g>
  );
};

const PeopleGlyph: React.FC<{ draw: number; stroke: string }> = ({ draw, stroke }) => {
  const positions: Array<[number, number]> = [
    [90, 110],
    [150, 110],
    [120, 70],
  ];
  const colors = [palette.blueSoft, palette.violetSoft, stroke];
  return (
    <g>
      {positions.map(([cx, cy], i) => {
        const s = interpolate(draw, [i * 0.18, i * 0.18 + 0.45], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <g key={i} opacity={s}>
            <circle cx={cx} cy={cy - 18 * s} r={18} fill={colors[i]} stroke={stroke} strokeWidth={2} />
            <path
              d={`M${cx - 26} ${cy + 46 * s} a26 22 0 0 1 52 0`}
              fill={colors[i]}
              stroke={stroke}
              strokeWidth={2}
            />
          </g>
        );
      })}
    </g>
  );
};

const BurstGlyph: React.FC<{ draw: number }> = ({ draw }) => {
  const rays = 8;
  return (
    <g>
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / rays;
        const len = interpolate(draw, [0, 0.6], [0, 62], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const op = interpolate(draw, [0, 0.3, 0.8], [0, 1, 0.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const x2 = 120 + Math.cos(angle) * len;
        const y2 = 100 + Math.sin(angle) * len;
        const x1 = 120 + Math.cos(angle) * 14;
        const y1 = 100 + Math.sin(angle) * 14;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={palette.violet}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={op}
          />
        );
      })}
      <circle cx={120} cy={100} r={interpolate(draw, [0, 0.4], [0, 16])} fill={palette.blue} />
    </g>
  );
};

// Minimal fallback glyph for connector/grammar words with no distinct concept —
// a single accent dot with a quick expanding ring, fast enough to read in ~6-9 frames.
const SparkGlyph: React.FC<{ draw: number; stroke: string }> = ({ draw, stroke }) => {
  const dot = interpolate(draw, [0, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringR = interpolate(draw, [0, 1], [6, 34]);
  const ringOp = interpolate(draw, [0, 0.3, 1], [0, 0.7, 0]);
  return (
    <g>
      <circle cx={120} cy={100} r={ringR} fill="none" stroke={stroke} strokeWidth={2} opacity={ringOp} />
      <circle cx={120} cy={100} r={9 * dot} fill={stroke} />
    </g>
  );
};
