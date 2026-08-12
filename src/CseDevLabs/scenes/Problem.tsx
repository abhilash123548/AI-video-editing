import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticWords } from "../components/KineticWords";
import { brand } from "../fonts";

// 0:09-0:17 — PROBLEM.
export const Problem: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:09-0:12 */}
      <Sequence  durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <KineticWords
            lines={[
              { text: "YOU KNOW THE THEORY.", delay: 3, fontSize: 54, color: brand.cool.text, strike: true },
              { text: "THAT'S NOT THE PROBLEM.", delay: 22, fontSize: 60, color: brand.cool.danger },
            ]}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 0:12-0:17 — stacking phrases */}
      <Sequence from={90} durationInFrames={150}>
        <StackingPhrases />
      </Sequence>
    </AbsoluteFill>
  );
};

const PHRASES = [
  { text: "REAL ARCHITECTURE", delay: 0, check: false },
  { text: "CODE THAT WORKS", delay: 40, check: true },
  { text: "SURVIVES THE VIVA", delay: 80, check: false },
];

const StackingPhrases: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {PHRASES.map((p, i) => {
          const local = frame - p.delay;
          const progress = spring({ frame: local, fps, config: { damping: 13, stiffness: 240 } });
          const isLatest = frame >= p.delay && (i === PHRASES.length - 1 || frame < PHRASES[i + 1].delay);
          const opacity = isLatest ? 1 : 0.4;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                opacity: interpolate(progress, [0, 1], [0, opacity]),
                transform: `translateX(${interpolate(progress, [0, 1], [-50, 0])}px)`,
              }}
            >
              {p.check ? <CheckDing frame={local} /> : null}
              <div
                style={{
                  fontFamily: "Anton",
                  fontSize: 52,
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                {p.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const CheckDing: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 6, fps, config: { damping: 10, stiffness: 320 } });
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: brand.warm.good,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${interpolate(progress, [0, 1], [0.3, 1])})`,
        flexShrink: 0,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 12.5L9.5 18L20 6" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
