import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KineticWords } from "../components/KineticWords";
import { bodyFont, brand } from "../fonts";

// 0:60-0:69 — REASSURANCE / DIFFERENTIATOR. Slows down, breathes.
export const Reassurance: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:60-0:62 */}
      <Sequence  durationInFrames={60}>
        <NotATemplate />
      </Sequence>

      {/* 0:62-0:69 (includes the short silent beat at the end) */}
      <Sequence from={60} durationInFrames={210}>
        <ConfidentBeat />
      </Sequence>
    </AbsoluteFill>
  );
};

const NotATemplate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const xProgress = spring({ frame: frame - 18, fps, config: { damping: 12, stiffness: 260 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", display: "flex", gap: 14 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 90,
              height: 116,
              borderRadius: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              transform: `translateY(${i * 6}px)`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: -10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: brand.cool.danger,
            fontSize: 130,
            fontWeight: 900,
            opacity: xProgress,
            transform: `scale(${interpolate(xProgress, [0, 1], [0.4, 1])})`,
          }}
        >
          ✕
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 200 }}>
        <KineticWords lines={[{ text: "NOT A TEMPLATE WE RECYCLE.", delay: 0, fontSize: 44, color: "#ffffff" }]} />
      </div>
    </AbsoluteFill>
  );
};

const ConfidentBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drift = interpolate(frame, [0, 210], [0, -10]);
  const tagP = spring({ frame: frame - 40, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${drift}px)`,
      }}
    >
      <div
        style={{
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.warm.accent}33 0%, transparent 70%)`,
          border: `2px solid ${brand.warm.accent}55`,
        }}
      />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <KineticWords
            lines={[
              { text: "ONE-ON-ONE.", delay: 4, fontSize: 50, color: "#ffffff" },
              { text: "YOU KNOW IT COLD.", delay: 18, fontSize: 56, color: brand.warm.accent },
              { text: "NO HESITATION. NO PANIC.", delay: 34, fontSize: 40, color: brand.warm.dim },
            ]}
          />
          <div
            style={{
              opacity: tagP,
              fontFamily: bodyFont,
              fontWeight: 800,
              fontSize: 22,
              color: brand.warm.good,
              border: `2px solid ${brand.warm.good}`,
              borderRadius: 999,
              padding: "8px 22px",
              letterSpacing: "0.1em",
              marginTop: 10,
            }}
          >
            CONFIDENT
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
