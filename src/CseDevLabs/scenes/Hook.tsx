import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { StampImpact } from "../components/StampImpact";
import { KineticWords } from "../components/KineticWords";
import {
  CodeSignal,
  BoringAppMockup,
  RecruiterGlyph,
  ProfessorGlyph,
  LaptopStackGlyph,
} from "../components/broll/HookGraphics";
import { brand, headlineFont } from "../fonts";
import { shakeOffset, flashOpacity } from "../utils/shake";

// 0:00-0:09 — HOOK. Fast, chaotic, cold-toned. Opens with the recurring
// stamp motif (callback at 0:77 and 1:00). Every beat is composed
// off-center (diagonal icon/text pairs) rather than stacked in one column.
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

      {/* 0:06-0:09 — rapid triple flash, each with its own b-roll glyph,
          alternating side, and rotation */}
      <Sequence from={180} durationInFrames={30}>
        <FlashCard text="BY RECRUITERS." rotate={-6} glyph={<RecruiterGlyph />} side="left" vOffset={-9} />
      </Sequence>
      <Sequence from={210} durationInFrames={30}>
        <FlashCard text="BY YOUR PROFESSOR." rotate={4} glyph={<ProfessorGlyph />} side="right" vOffset={7} />
      </Sequence>
      <Sequence from={240} durationInFrames={30}>
        <FlashCard
          text={"A HUNDRED\nTIMES OVER."}
          rotate={-3}
          glyph={<LaptopStackGlyph />}
          side="left"
          vOffset={-4}
          badge="x100"
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const BeatOne: React.FC = () => {
  const frame = useCurrentFrame();
  // tension ramps up toward the stamp landing at frame ~2 (spring impact)
  const tension = interpolate(frame, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: "28%", top: "30%", transform: "translate(-50%, -50%)" }}>
        <CodeSignal tension={tension} />
      </div>
      <StampImpact
        text={"ARE YOU A\nFINAL-YEAR CS STUDENT?"}
        fontSize={56}
        color={brand.cool.text}
        posX={60}
        posY={68}
        rotateTo={-4}
      />
    </AbsoluteFill>
  );
};

const BeatTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mockupP = spring({ frame, fps, config: { damping: 16 } });
  const mockupScale = interpolate(mockupP, [0, 1], [0.85, 0.68]);
  const tilt = interpolate(mockupP, [0, 1], [10, 4]);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "68%",
          top: "36%",
          opacity: interpolate(mockupP, [0, 1], [0, 0.9]),
          transform: `translate(-50%, -50%) scale(${mockupScale}) perspective(900px) rotateY(-${tilt}deg) rotateX(3deg)`,
          filter: "grayscale(0.2) brightness(0.95)",
        }}
      >
        <BoringAppMockup />
      </div>
      <div style={{ position: "absolute", left: "14%", top: "72%", transform: "translate(0, -50%)", maxWidth: 620 }}>
        <KineticWords
          align="flex-start"
          lines={[
            { text: "THEN HEAR THIS —", delay: 3, fontSize: 50, color: brand.cool.text },
            { text: "YOUR PROJECT HAS", delay: 12, fontSize: 50, color: brand.cool.text },
            { text: "ALREADY BEEN SEEN.", delay: 22, fontSize: 56, color: brand.cool.danger, underline: true },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};

const FlashCard: React.FC<{
  text: string;
  badge?: string;
  rotate: number;
  glyph: React.ReactNode;
  side: "left" | "right";
  vOffset: number;
}> = ({ text, badge, rotate, glyph, side, vOffset }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 10, stiffness: 300, mass: 0.6 } });
  const scale = interpolate(progress, [0, 1], [1.4, 1]);
  const rot = interpolate(progress, [0, 1], [rotate * 2, rotate]);
  const offset = shakeOffset(frame, 1, 6, 7);
  const flash = flashOpacity(frame, 1, 4);
  const horizontalOffset = side === "left" ? -50 : 50;

  return (
    <AbsoluteFill style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${50 + vOffset}%`,
          transform: `translate(-50%, -50%) translateX(${horizontalOffset}px) scale(${scale}) rotate(${rot}deg)`,
          display: "flex",
          flexDirection: side === "left" ? "row" : "row-reverse",
          alignItems: "center",
          gap: 22,
          opacity: progress,
        }}
      >
        <div style={{ opacity: 0.9 }}>{glyph}</div>
        <div
          style={{
            border: `4px solid ${brand.cool.text}`,
            borderRadius: 14,
            padding: "12px 24px",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <KineticWords lines={[{ text, delay: 0, fontSize: 48, color: brand.cool.text }]} />
        </div>
      </div>

      {badge ? <BadgeStamp text={badge} side={side === "left" ? "right" : "left"} vOffset={vOffset} /> : null}

      <AbsoluteFill style={{ backgroundColor: "#ffffff", opacity: flash, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

// The x100 badge lands independently, after the card settles — its own
// hard stamp-slam (overshoot + shake) rather than riding the parent fade.
const BadgeStamp: React.FC<{ text: string; side: "left" | "right"; vOffset: number }> = ({
  text,
  side,
  vOffset,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const landDelay = 13;
  const local = frame - landDelay;
  const progress = spring({ frame: local, fps, config: { damping: 8, stiffness: 400, mass: 0.5 } });
  const scale = interpolate(progress, [0, 1], [2.2, 1]);
  const rot = interpolate(progress, [0, 1], [side === "left" ? -35 : 35, side === "left" ? -8 : 8]);
  const opacity = interpolate(local, [0, 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const offset = shakeOffset(frame, landDelay + 1, 10, 8);
  const flash = flashOpacity(frame, landDelay + 1, 5);
  const horizontalOffset = side === "left" ? -34 : 34;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: `${68 + vOffset}%`,
          transform: `translate(-50%, -50%) translate(${horizontalOffset + offset.x}px, ${offset.y}px) scale(${scale}) rotate(${rot}deg)`,
          opacity,
          fontFamily: headlineFont,
          fontSize: 42,
          color: "#000",
          background: brand.cool.danger,
          padding: "8px 22px",
          borderRadius: 10,
          boxShadow: `0 0 30px ${brand.cool.danger}88`,
        }}
      >
        {text}
      </div>
      <AbsoluteFill style={{ backgroundColor: "#ffffff", opacity: flash, pointerEvents: "none" }} />
    </>
  );
};
