import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { SlotCounter } from "../components/SlotCounter";
import { SplitScreen } from "../components/SplitScreen";
import { PhoneHero } from "../components/PhoneHero";
import { bodyFont, brand } from "../fonts";

// 0:69-0:92 — URGENCY + CTA. The phone number becomes the dominant visual
// and (via PersistentPhoneStrip in the parent) stays on screen from here on.
export const Urgency: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:69-0:74 */}
      <Sequence  durationInFrames={150}>
        <SlotCounter total={15} filled={12} />
      </Sequence>

      {/* 0:74-0:77 */}
      <Sequence from={150} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SplitScreen
            left={{ label: "SMALL GROUP", sub: "Focused attention", color: brand.warm.accent }}
            right={{ label: "FACELESS CROWD", sub: "Doesn't scale", color: brand.cool.dim }}
            revealDelay={6}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 0:77-0:83 — the phone number takes over */}
      <Sequence from={240} durationInFrames={180}>
        <PhoneHero variant="reveal" label="MESSAGE US NOW" digitDelay={5} />
      </Sequence>

      {/* 0:83-0:87 */}
      <Sequence from={420} durationInFrames={120}>
        <CallVariant />
      </Sequence>

      {/* 0:87-0:92 */}
      <Sequence from={540} durationInFrames={150}>
        <SlotCounter total={15} filled={14} urgent fillDelay={8} />
      </Sequence>
    </AbsoluteFill>
  );
};

const CallVariant: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = 1 + Math.sin(frame / 5) * 0.06;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            border: `4px solid ${brand.warm.accent}`,
            borderRadius: 20,
            padding: "18px 28px",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: brand.warm.accent,
              transform: `scale(${ring})`,
            }}
          />
          <div style={{ fontFamily: "Anton", fontSize: 60, color: "#ffffff" }}>8008125134</div>
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 700,
            fontSize: 30,
            color: "#ffffff",
            textAlign: "center",
            opacity: interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          Or call — if you'd rather talk it through.
        </div>
      </div>
    </AbsoluteFill>
  );
};
