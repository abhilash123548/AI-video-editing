import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { LogoLockup } from "../components/LogoLockup";
import { SplitScreen } from "../components/SplitScreen";
import { IconRow } from "../components/IconRow";
import { bodyFont, brand } from "../fonts";

// 0:26-0:40 — SOLUTION. Tone turns warm/confident here (see Grade.tsx).
export const Solution: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:26-0:29 — logo reveal */}
      <Sequence  durationInFrames={90}>
        <LogoLockup tagline="BUILT FOR GRADES. BUILT FOR HIRING." />
      </Sequence>

      {/* 0:29-0:33 — messy -> clean */}
      <Sequence from={90} durationInFrames={120}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SplitScreen
            left={{ label: "30 TABS. TANGLED CABLES.", color: brand.cool.dim }}
            right={{ label: "ONE CLEAR PROJECT.", color: brand.warm.accent }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 0:33-0:36 — collaboration montage */}
      <Sequence from={210} durationInFrames={90}>
        <CollabMontage />
      </Sequence>

      {/* 0:36-0:40 — domain icon row */}
      <Sequence from={300} durationInFrames={120}>
        <IconRow />
      </Sequence>
    </AbsoluteFill>
  );
};

const STEPS = ["MENTOR CALL", "WHITEBOARD PLANNING", "BUILDING TOGETHER"];

const CollabMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stepLen = 30;
  const idx = Math.min(Math.floor(frame / stepLen), STEPS.length - 1);
  const localFrame = frame - idx * stepLen;
  const fade = interpolate(localFrame, [0, 8, stepLen - 8, stepLen], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = spring({ frame: localFrame, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          opacity: fade,
          transform: `scale(${interpolate(scale, [0, 1], [0.96, 1])})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${brand.warm.accent2}44, ${brand.warm.accent}44)`,
            border: `2px solid ${brand.warm.accent}88`,
          }}
        />
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 32,
            color: "#ffffff",
            textTransform: "uppercase",
          }}
        >
          {STEPS[idx]}
        </div>
      </div>
    </AbsoluteFill>
  );
};
