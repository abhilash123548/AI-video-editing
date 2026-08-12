import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { StampImpact } from "../components/StampImpact";
import { KineticWords } from "../components/KineticWords";
import {
  LaptopGlowScene,
  BoringAppMockup,
  RecruiterGlyph,
  ProfessorGlyph,
  LaptopStackGlyph,
} from "../components/broll/HookGraphics";
import { brand } from "../fonts";
import { shakeOffset, flashOpacity } from "../utils/shake";

// 0:00-0:09 — HOOK. Fast, chaotic, cold-toned. Opens with the recurring
// stamp motif (callback at 0:77 and 1:00).
export const Hook: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:00-0:03 */}
      <Sequence durationInFrames={90}>
        <BeatOne />
      </Sequence>

      {/* 0:03-0:06 */}
      <Sequence from={90} durationInFrames={90}>
        <BeatTwo />
      </Sequence>

      {/* 0:06-0:09 — rapid triple flash, each with its own b-roll glyph and rotation */}
      <Sequence from={180} durationInFrames={30}>
        <FlashCard text="BY RECRUITERS." rotate={-6} glyph={<RecruiterGlyph />} />
      </Sequence>
      <Sequence from={210} durationInFrames={30}>
        <FlashCard text="BY YOUR PROFESSOR." rotate={4} glyph={<ProfessorGlyph />} />
      </Sequence>
      <Sequence from={240} durationInFrames={30}>
        <FlashCard text={"A HUNDRED\nTIMES OVER."} rotate={-3} glyph={<LaptopStackGlyph />} badge="x100" />
      </Sequence>
    </AbsoluteFill>
  );
};

const BeatOne: React.FC = () => {
  const frame = useCurrentFrame();
  // tension ramps up toward the stamp landing at frame ~2 (spring impact)
  const tension = interpolate(frame, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <LaptopGlowScene tension={tension} />
      <StampImpact text={"ARE YOU A\nFINAL-YEAR CS STUDENT?"} fontSize={60} color={brand.cool.text} />
    </AbsoluteFill>
  );
};

const BeatTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mockupP = spring({ frame, fps, config: { damping: 16 } });
  const mockupScale = interpolate(mockupP, [0, 1], [0.85, 0.62]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          opacity: interpolate(mockupP, [0, 1], [0, 0.85]),
          transform: `scale(${mockupScale}) translateY(-40px)`,
          filter: "grayscale(0.2) brightness(0.95)",
        }}
      >
        <BoringAppMockup />
      </div>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 420 }}>
        <KineticWords
          align="center"
          lines={[
            { text: "THEN HEAR THIS —", delay: 3, fontSize: 52, color: brand.cool.text },
            { text: "YOUR PROJECT HAS", delay: 12, fontSize: 52, color: brand.cool.text },
            { text: "ALREADY BEEN SEEN.", delay: 22, fontSize: 58, color: brand.cool.danger, underline: true },
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const FlashCard: React.FC<{ text: string; badge?: string; rotate: number; glyph: React.ReactNode }> = ({
  text,
  badge,
  rotate,
  glyph,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 10, stiffness: 300, mass: 0.6 } });
  const scale = interpolate(progress, [0, 1], [1.4, 1]);
  const rot = interpolate(progress, [0, 1], [rotate * 2, rotate]);
  const offset = shakeOffset(frame, 1, 6, 7);
  const flash = flashOpacity(frame, 1, 4);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          transform: `scale(${scale}) rotate(${rot}deg)`,
          opacity: progress,
        }}
      >
        <div style={{ opacity: 0.7 }}>{glyph}</div>
        <div
          style={{
            border: `4px solid ${brand.cool.text}`,
            borderRadius: 14,
            padding: "12px 24px",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <KineticWords lines={[{ text, delay: 0, fontSize: 50, color: brand.cool.text }]} />
        </div>
        {badge ? (
          <div
            style={{
              fontFamily: "Anton",
              fontSize: 40,
              color: "#000",
              background: brand.cool.danger,
              padding: "8px 22px",
              borderRadius: 10,
              transform: "rotate(-4deg)",
            }}
          >
            {badge}
          </div>
        ) : null}
      </div>
      <AbsoluteFill style={{ backgroundColor: "#ffffff", opacity: flash, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
