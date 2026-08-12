import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, brand } from "../fonts";

type Props = { items: string[]; delayPerItem?: number; startDelay?: number };

export const Checklist: React.FC<Props> = ({ items, delayPerItem = 20, startDelay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {items.map((item, i) => {
          const delay = startDelay + i * delayPerItem;
          const local = frame - delay;
          const progress = spring({ frame: local, fps, config: { damping: 14, stiffness: 220 } });
          const checkProgress = spring({
            frame: local - 6,
            fps,
            config: { damping: 12, stiffness: 300 },
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: progress,
                transform: `translateX(${interpolate(progress, [0, 1], [-40, 0])}px)`,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: brand.warm.good,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${interpolate(checkProgress, [0, 1], [0.4, 1])})`,
                  flexShrink: 0,
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12.5L9.5 18L20 6"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: 30,
                      strokeDashoffset: interpolate(checkProgress, [0, 1], [30, 0]),
                    }}
                  />
                </svg>
              </div>
              <div
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 800,
                  fontSize: 46,
                  color: "#ffffff",
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
