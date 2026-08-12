import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, brand } from "../fonts";

type IconDef = { label: string; delay: number; icon: React.ReactNode };

const iconProps = { width: 40, height: 40, viewBox: "0 0 24 24", fill: "none" } as const;
const stroke = { stroke: brand.warm.accent, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const ICONS: IconDef[] = [
  {
    label: "AI",
    delay: 0,
    icon: (
      <svg {...iconProps}>
        <rect x="6" y="6" width="12" height="12" rx="2" {...stroke} />
        <circle cx="9" cy="9" r="1" fill={brand.warm.accent} />
        <circle cx="15" cy="9" r="1" fill={brand.warm.accent} />
        <path d="M9 15h6" {...stroke} />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" {...stroke} />
      </svg>
    ),
  },
  {
    label: "Machine Learning",
    delay: 8,
    icon: (
      <svg {...iconProps}>
        <circle cx="6" cy="6" r="2.4" {...stroke} />
        <circle cx="18" cy="6" r="2.4" {...stroke} />
        <circle cx="12" cy="18" r="2.4" {...stroke} />
        <path d="M8 7.5L11 16M16 7.5L13 16M8.4 6H15.6" {...stroke} />
      </svg>
    ),
  },
  {
    label: "Blockchain",
    delay: 16,
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="9" width="7" height="7" rx="1.5" {...stroke} />
        <rect x="14" y="9" width="7" height="7" rx="1.5" {...stroke} />
        <path d="M10 12.5h4" {...stroke} />
      </svg>
    ),
  },
  {
    label: "Cybersecurity",
    delay: 24,
    icon: (
      <svg {...iconProps}>
        <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" {...stroke} />
        <path d="M9 12l2 2 4-4" {...stroke} />
      </svg>
    ),
  },
  {
    label: "Big Data",
    delay: 32,
    icon: (
      <svg {...iconProps}>
        <path d="M4 10h4v10H4zM10 5h4v15h-4zM16 13h4v7h-4z" {...stroke} />
      </svg>
    ),
  },
  {
    label: "Mobile Apps",
    delay: 40,
    icon: (
      <svg {...iconProps}>
        <rect x="7" y="2" width="10" height="20" rx="2" {...stroke} />
        <path d="M11 19h2" {...stroke} />
      </svg>
    ),
  },
];

export const IconRow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 26,
          maxWidth: 820,
        }}
      >
        {ICONS.map((item, i) => {
          const progress = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 10, stiffness: 260, mass: 0.6 },
          });
          const scale = interpolate(progress, [0, 0.6, 1], [0.3, 1.15, 1]);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                opacity: progress,
                transform: `scale(${scale})`,
                background: "rgba(255,255,255,0.06)",
                border: `1.5px solid ${brand.warm.accent}55`,
                borderRadius: 20,
                padding: "22px 18px",
                width: 220,
              }}
            >
              {item.icon}
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 700,
                  fontSize: 24,
                  color: "#ffffff",
                  textAlign: "center",
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
