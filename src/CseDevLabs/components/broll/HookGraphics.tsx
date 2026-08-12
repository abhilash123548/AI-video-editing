import { interpolate, useCurrentFrame } from "remotion";
import { brand } from "../../fonts";

// Motion-graphic stand-ins for the Hook section's b-roll, built from shapes
// only (no stock footage/photos exist in the repo). Each is deliberately
// desaturated/dim so the foreground text stays the focal point.

// Beat 1: "Student at laptop, stressed, scrolling code — freeze-frame on
// their face." A hunched silhouette over a flickering laptop glow.
export const LaptopGlowScene: React.FC<{ tension?: number }> = ({ tension = 0 }) => {
  const frame = useCurrentFrame();
  const flicker = 0.75 + Math.sin(frame / 4) * 0.08 + tension * 0.1;

  return (
    <svg
      width="360"
      height="320"
      viewBox="0 0 360 320"
      style={{ position: "absolute", left: 0, right: 0, margin: "0 auto", bottom: 40, opacity: 0.4 }}
    >
      {/* screen glow */}
      <ellipse cx="180" cy="150" rx="150" ry="90" fill={brand.cool.accent} opacity={0.12 * flicker} />
      {/* hunched figure */}
      <path
        d="M110 250 Q120 170 180 165 Q240 170 250 250 Z"
        fill="#0d1730"
        stroke={brand.cool.accent}
        strokeWidth="1.5"
        opacity={0.8}
      />
      <circle cx="180" cy="130" r="34" fill="#0d1730" stroke={brand.cool.accent} strokeWidth="1.5" opacity={0.8} />
      {/* laptop */}
      <rect x="120" y="230" width="120" height="8" rx="2" fill={brand.cool.dim} />
      <rect
        x="140"
        y="170"
        width="80"
        height="58"
        rx="4"
        fill="#0a1024"
        stroke={brand.cool.accent}
        strokeWidth="2"
        opacity={flicker}
      />
      <rect x="146" y="176" width="68" height="4" fill={brand.cool.accent} opacity={0.5 * flicker} />
      <rect x="146" y="184" width="50" height="4" fill={brand.cool.accent} opacity={0.35 * flicker} />
      <rect x="146" y="192" width="60" height="4" fill={brand.cool.accent} opacity={0.4 * flicker} />
    </svg>
  );
};

// Beat 2: "generic-looking project (chatbot UI)... boring-looking GitHub
// repo" — a deliberately unremarkable laptop-screen UI mockup with a
// cursor scrolling down.
export const BoringAppMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const scroll = interpolate(frame % 90, [0, 90], [0, -60]);

  const bubbles = [
    { w: 140, align: "left" as const },
    { w: 90, align: "right" as const },
    { w: 160, align: "left" as const },
    { w: 110, align: "right" as const },
    { w: 130, align: "left" as const },
    { w: 100, align: "right" as const },
  ];

  return (
    <div
      style={{
        width: 520,
        height: 400,
        borderRadius: 20,
        background: "#0c1224",
        border: `2px solid ${brand.cool.dim}66`,
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          height: 40,
          background: "#101b36",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 14px",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a4666" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a4666" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a4666" }} />
        <div style={{ marginLeft: 10, width: 120, height: 8, borderRadius: 4, background: "#2a3555" }} />
      </div>
      <div style={{ position: "relative", height: 360, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20 + scroll, left: 0, right: 0, display: "flex", flexDirection: "column", gap: 16, padding: "0 20px" }}>
          {bubbles.map((b, i) => (
            <div
              key={i}
              style={{
                alignSelf: b.align === "left" ? "flex-start" : "flex-end",
                width: b.w,
                height: 26,
                borderRadius: 12,
                background: b.align === "left" ? "#2c3a63" : `${brand.cool.accent}66`,
              }}
            />
          ))}
        </div>
        {/* blinking cursor */}
        <div
          style={{
            position: "absolute",
            right: 24,
            top: 12,
            width: 10,
            height: 18,
            background: brand.cool.accent,
            opacity: Math.floor(frame / 10) % 2 === 0 ? 0.9 : 0.1,
          }}
        />
      </div>
    </div>
  );
};

// Beat 3, flash 1: recruiter skimming a resume, unimpressed.
export const RecruiterGlyph: React.FC = () => (
  <svg width="200" height="200" viewBox="0 0 200 200">
    <circle cx="70" cy="70" r="30" fill="#26314f" stroke={brand.cool.dim} strokeWidth="2" />
    <path d="M30 150 Q35 100 70 98 Q105 100 110 150 Z" fill="#26314f" stroke={brand.cool.dim} strokeWidth="2" />
    <rect x="115" y="60" width="60" height="80" rx="4" fill="#f4efe4" opacity={0.85} />
    <rect x="124" y="72" width="42" height="5" fill="#999" />
    <rect x="124" y="84" width="30" height="5" fill="#ccc" />
    <rect x="124" y="94" width="36" height="5" fill="#ccc" />
    <rect x="124" y="104" width="24" height="5" fill="#ccc" />
    <path d="M60 75 Q70 80 80 75" stroke={brand.cool.danger} strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

// Beat 3, flash 2: professor striking through with a red pen.
export const ProfessorGlyph: React.FC = () => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="60" cy="65" r="26" fill="#26314f" stroke={brand.cool.dim} strokeWidth="2" />
      <path d="M28 140 Q32 96 60 94 Q88 96 92 140 Z" fill="#26314f" stroke={brand.cool.dim} strokeWidth="2" />
      <rect x="100" y="55" width="70" height="90" rx="4" fill="#f4efe4" opacity={0.85} />
      <rect x="110" y="68" width="50" height="5" fill="#999" />
      <rect x="110" y="80" width="36" height="5" fill="#ccc" />
      <rect x="110" y="92" width="44" height="5" fill="#ccc" />
      <line
        x1="106"
        y1="120"
        x2={106 + 58 * strike}
        y2={120 + 8 * strike}
        stroke={brand.cool.danger}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Beat 3, flash 3: a stack of identical laptops — "seen a hundred times".
export const LaptopStackGlyph: React.FC = () => (
  <svg width="220" height="200" viewBox="0 0 220 200">
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={40 + i * 10}
        y={60 - i * 14}
        width="120"
        height="80"
        rx="6"
        fill="#141b30"
        stroke={brand.cool.dim}
        strokeWidth="2"
        opacity={0.55 + i * 0.12}
      />
    ))}
  </svg>
);
