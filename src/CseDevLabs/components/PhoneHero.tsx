import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { bodyFont, brand, headlineFont } from "../fonts";

const NUMBER = "8008125134";

type Props = {
  variant?: "reveal" | "button";
  digitDelay?: number;
  label?: string;
};

// The single boldest graphic in the video: the phone number takes over the
// screen, digit-by-digit, then locks in with the recurring stamp motif.
// "button" variant is the final-frame CTA (0:98-1:00.6).
export const PhoneHero: React.FC<Props> = ({ variant = "reveal", digitDelay = 4, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const digits = NUMBER.split("");
  const lockAt = digitDelay * digits.length + 4;
  const lockProgress = spring({ frame: frame - lockAt, fps, config: { damping: 9, stiffness: 260 } });
  const lockScale = interpolate(lockProgress, [0, 1], [1.2, 1]);
  const pulse = variant === "button" ? 1 + Math.sin(frame / 8) * 0.03 : 1;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        {label ? (
          <div
            style={{
              fontFamily: bodyFont,
              fontWeight: 800,
              fontSize: 34,
              color: brand.whatsapp,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {label}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            gap: 4,
            transform: `scale(${lockScale * pulse})`,
            border: `5px solid ${brand.whatsapp}`,
            borderRadius: 22,
            padding: "20px 30px",
            background: "rgba(0,0,0,0.35)",
          }}
        >
          {digits.map((d, i) => {
            const delay = i * digitDelay;
            const p = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 320, mass: 0.5 } });
            const scale = interpolate(p, [0, 1], [0.2, 1]);
            const ty = interpolate(p, [0, 1], [-60, 0]);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  fontFamily: headlineFont,
                  fontSize: 78,
                  color: "#ffffff",
                  opacity: p,
                  transform: `translateY(${ty}px) scale(${scale})`,
                }}
              >
                {d}
              </span>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 18, opacity: interpolate(frame - lockAt, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <MessageIcon />
          <CallIcon />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const MessageIcon: React.FC = () => (
  <div
    style={{
      width: 54,
      height: 54,
      borderRadius: "50%",
      background: brand.whatsapp,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8.5 10.5c0 3 2.5 5.5 5.5 5.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </div>
);

const CallIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = 1 + Math.sin(frame / 5) * 0.08;
  return (
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: "50%",
        background: brand.warm.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${ring})`,
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2 2.2z"
          fill="#111"
        />
      </svg>
    </div>
  );
};
