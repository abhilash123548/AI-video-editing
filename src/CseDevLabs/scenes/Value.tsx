import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SplitScreen } from "../components/SplitScreen";
import { Checklist } from "../components/Checklist";
import { bodyFont, brand, headlineFont } from "../fonts";

// 0:40-0:60 — VALUE / PROOF.
export const Value: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:40-0:46 */}
      <Sequence  durationInFrames={180}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SplitScreen
            left={{ label: "COLLEGE PROJECT", color: brand.cool.dim }}
            right={{ label: "PRODUCTION-GRADE", color: brand.warm.accent }}
            revealDelay={40}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 0:46-0:52 */}
      <Sequence from={180} durationInFrames={180}>
        <Checklist items={["Real architecture", "Working code", "A full report"]} />
      </Sequence>

      {/* 0:52-0:60 */}
      <Sequence from={360} durationInFrames={240}>
        <PublishedPaper />
      </Sequence>
    </AbsoluteFill>
  );
};

const PublishedPaper: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardP = spring({ frame, fps, config: { damping: 16 } });
  const circleP = spring({ frame: frame - 24, fps, config: { damping: 14 } });
  const badgeP = spring({ frame: frame - 10, fps, config: { damping: 10, stiffness: 260 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          opacity: cardP,
          transform: `scale(${interpolate(cardP, [0, 1], [0.9, 1])})`,
          width: 620,
          background: "#f4efe4",
          borderRadius: 8,
          padding: "40px 44px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontFamily: bodyFont, fontSize: 14, color: "#555", letterSpacing: "0.1em" }}>
          INTERNATIONAL JOURNAL OF COMPUTER SCIENCE
        </div>
        <div
          style={{
            fontFamily: headlineFont,
            fontSize: 26,
            color: "#111",
            marginTop: 14,
            lineHeight: 1.2,
          }}
        >
          A Novel Approach to Scalable Systems
        </div>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: 18,
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 20,
            color: "#111",
          }}
        >
          Author: Your Name
          <div
            style={{
              position: "absolute",
              left: -8,
              top: -6,
              right: -8,
              bottom: -6,
              border: `3px solid ${brand.warm.accent2}`,
              borderRadius: 8,
              transform: `scale(${interpolate(circleP, [0, 1], [0.6, 1])})`,
              opacity: circleP,
            }}
          />
        </div>
        <div style={{ marginTop: 20, height: 2, background: "#ccc" }} />
        <div style={{ marginTop: 16, fontFamily: bodyFont, fontSize: 14, color: "#777", lineHeight: 1.6 }}>
          Abstract — This paper presents a comprehensive study of scalable
          architecture patterns applied to real-world constraints...
        </div>
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            background: brand.warm.good,
            color: "#fff",
            fontFamily: headlineFont,
            fontSize: 20,
            padding: "10px 18px",
            borderRadius: 10,
            transform: `scale(${interpolate(badgeP, [0, 1], [0.3, 1])}) rotate(8deg)`,
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          }}
        >
          PUBLISHED
        </div>
      </div>
    </AbsoluteFill>
  );
};
