import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, brand } from "../fonts";
import { PHONE_ON_SCREEN_FRAME } from "../data/timeline";

// "Phone number must stay on screen from 0:77 to the very end" — a compact
// pill pinned near the top so it never collides with whatever the main beat
// graphic or the lower-third captions are doing.
export const PersistentPhoneStrip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - PHONE_ON_SCREEN_FRAME;
  if (local < 0) return null;

  const progress = spring({ frame: local, fps, config: { damping: 16, stiffness: 220 } });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 80 }}>
      <div
        style={{
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [-20, 0])}px)`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "rgba(10,8,20,0.75)",
          border: `2px solid ${brand.whatsapp}`,
          borderRadius: 999,
          padding: "12px 26px",
        }}
      >
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: brand.whatsapp }} />
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 32,
            color: "#ffffff",
            letterSpacing: "0.02em",
          }}
        >
          8008125134
        </div>
      </div>
    </AbsoluteFill>
  );
};
