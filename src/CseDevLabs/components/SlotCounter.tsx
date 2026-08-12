import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, headlineFont } from "../fonts";

type Props = {
  total: number;
  filled: number;
  urgent?: boolean;
  fillDelay?: number;
};

// Reused for both scarcity beats: the initial "12/15 filled" reveal and the
// more urgent final countdown near the CTA.
export const SlotCounter: React.FC<Props> = ({ total, filled, urgent = false, fillDelay = 4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = urgent ? "#ff3b3b" : "#ffb020";

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div
          style={{
            fontFamily: headlineFont,
            fontSize: 40,
            color: "#ffffff",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Limited Slots
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: 700 }}>
          {Array.from({ length: total }).map((_, i) => {
            const isFilled = i < filled;
            const delay = fillDelay + i * 3;
            const progress = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 300 } });
            const flashRed = urgent && i === filled - 1;
            return (
              <div
                key={i}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  transform: `scale(${interpolate(progress, [0, 1], [0.3, 1])})`,
                  background: isFilled ? (flashRed ? "#ff3b3b" : accent) : "rgba(255,255,255,0.08)",
                  border: `2px solid ${isFilled ? accent : "rgba(255,255,255,0.2)"}`,
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 56,
            color: urgent ? "#ff3b3b" : "#ffffff",
          }}
        >
          {filled}/{total} FILLED
        </div>
      </div>
    </AbsoluteFill>
  );
};
