import { interpolate, useCurrentFrame } from "remotion";
import { brand, headlineFont } from "../../fonts";

// Motion-graphic stand-ins for the Hook section's b-roll, built from shapes
// only (no stock footage/photos exist in the repo). Styled as one cohesive
// icon system — dark glass panels, accent-color glow, the "</>" bracket
// motif from the logo — rather than generic flat-icon clip art.

const GLOW = (c: string) => `drop-shadow(0 0 14px ${c}77)`;

// Beat 1: "Student at laptop, stressed, scrolling code — freeze-frame on
// their face." Rendered as a branded "signal" motif: a glass code-panel
// pulsing outward rings, standing in for the glowing laptop screen.
export const CodeSignal: React.FC<{ tension?: number }> = ({ tension = 0 }) => {
  const frame = useCurrentFrame();
  const flicker = 0.85 + Math.sin(frame / 5) * 0.06 + tension * 0.08;
  const ring1 = (frame % 70) / 70;
  const ring2 = ((frame + 35) % 70) / 70;

  return (
    <div style={{ position: "relative", width: 280, height: 280, filter: GLOW(brand.cool.accent) }}>
      {[ring1, ring2].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            margin: "auto",
            width: 170,
            height: 170,
            borderRadius: "50%",
            border: `2px solid ${brand.cool.accent}`,
            opacity: (1 - p) * 0.45,
            transform: `scale(${0.55 + p * 0.95})`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: 168,
          height: 122,
          borderRadius: 20,
          background: `linear-gradient(145deg, #0a1024 0%, ${brand.cool.accent}22 100%)`,
          border: `2px solid ${brand.cool.accent}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: headlineFont,
            fontSize: 50,
            color: brand.cool.accent,
            opacity: flicker,
          }}
        >
          {"</>"}
        </div>
      </div>
    </div>
  );
};

// Beat 2: "generic-looking project (chatbot UI)... boring-looking GitHub
// repo" — a deliberately unremarkable laptop-screen UI mockup with a
// cursor scrolling down, held in the same glass-panel language.
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
        width: 480,
        height: 380,
        borderRadius: 20,
        background: "#0c1224",
        border: `2px solid ${brand.cool.dim}88`,
        overflow: "hidden",
        boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 40px ${brand.cool.accent}22`,
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
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: brand.cool.danger }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#e0b23f" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: brand.warm.good }} />
        <div style={{ marginLeft: 10, width: 120, height: 8, borderRadius: 4, background: "#2a3555" }} />
      </div>
      <div style={{ position: "relative", height: 340, overflow: "hidden" }}>
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

const GlassPanel: React.FC<{ children: React.ReactNode; accent: string }> = ({ children, accent }) => (
  <div
    style={{
      width: 150,
      height: 108,
      borderRadius: 14,
      background: `linear-gradient(145deg, #0a1024 0%, ${accent}22 100%)`,
      border: `2px solid ${accent}`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 6,
      padding: "0 14px",
    }}
  >
    {children}
  </div>
);

// Beat 3, flash 1: recruiter skimming a resume, unimpressed — a "profile
// card" glass panel rather than a literal person icon.
export const RecruiterGlyph: React.FC = () => (
  <div style={{ filter: GLOW(brand.cool.accent) }}>
    <GlassPanel accent={brand.cool.accent}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: `${brand.cool.accent}33`,
            border: `1.5px solid ${brand.cool.accent}`,
          }}
        />
        <div style={{ width: 70, height: 6, borderRadius: 3, background: `${brand.cool.accent}66` }} />
      </div>
      <div style={{ width: "100%", height: 5, borderRadius: 3, background: "#2a3555" }} />
      <div style={{ width: "70%", height: 5, borderRadius: 3, background: "#2a3555" }} />
      <div style={{ width: 40, height: 4, borderRadius: 2, background: brand.cool.danger }} />
    </GlassPanel>
  </div>
);

// Beat 3, flash 2: professor striking through with a red pen.
export const ProfessorGlyph: React.FC = () => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ filter: GLOW(brand.cool.danger), position: "relative" }}>
      <GlassPanel accent={brand.cool.dim}>
        <div style={{ width: "80%", height: 5, borderRadius: 3, background: "#2a3555" }} />
        <div style={{ width: "60%", height: 5, borderRadius: 3, background: "#2a3555" }} />
        <div style={{ width: "70%", height: 5, borderRadius: 3, background: "#2a3555" }} />
      </GlassPanel>
      <div
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          width: `${strike * 122}px`,
          height: 4,
          background: brand.cool.danger,
          borderRadius: 2,
          transform: "translateY(-50%) rotate(-4deg)",
          boxShadow: `0 0 10px ${brand.cool.danger}`,
        }}
      />
    </div>
  );
};

// Beat 3, flash 3: a stack of identical panels — "seen a hundred times".
export const LaptopStackGlyph: React.FC = () => (
  <div style={{ position: "relative", width: 190, height: 140, filter: GLOW(brand.cool.accent) }}>
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: i * 12,
          top: 40 - i * 12,
          width: 140,
          height: 90,
          borderRadius: 12,
          background: `linear-gradient(145deg, #0a1024 0%, ${brand.cool.accent}18 100%)`,
          border: `2px solid ${brand.cool.accent}`,
          opacity: 0.5 + i * 0.14,
        }}
      />
    ))}
  </div>
);
