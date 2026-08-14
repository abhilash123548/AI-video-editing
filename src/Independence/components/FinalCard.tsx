import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ASSETS } from "../data/timeline";
import { sans, tricolor } from "../fonts";

// 0:28.5-0:38.0 — dark cinematic frame -> tricolor slowly appears -> logo
// -> text cascade -> held final frame. Timed so the tricolor settles while
// "This Independence Day... come... forward" is still playing, and the
// text cascade lands under "Happy 79th Independence Day. Jai Hind.",
// leaving a real hold after the VO finishes (not just a 1-frame freeze).
export const FinalCard: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bandP = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: "clamp" });
  const logoP = spring({ frame: frame - 150, fps, config: { damping: 18 } });
  const line1 = spring({ frame: frame - 180, fps, config: { damping: 20 } });
  const line2 = spring({ frame: frame - 200, fps, config: { damping: 20 } });
  const line3 = spring({ frame: frame - 215, fps, config: { damping: 20 } });
  const line4 = spring({ frame: frame - 235, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", justifyContent: "center", alignItems: "center" }}>
      {/* tricolor — three elegant bands, not a flag graphic */}
      <div
        style={{
          position: "absolute",
          top: 300,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          opacity: bandP,
          width: interpolate(bandP, [0, 1], [80, 220]),
        }}
      >
        <div style={{ height: 6, background: tricolor.saffron, borderRadius: 3 }} />
        <div style={{ height: 6, background: tricolor.white, borderRadius: 3 }} />
        <div style={{ height: 6, background: tricolor.green, borderRadius: 3 }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <Img
          src={staticFile(ASSETS.logo.file)}
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            opacity: logoP,
            transform: `scale(${interpolate(logoP, [0, 1], [0.7, 1])})`,
            objectFit: "cover",
          }}
        />

        <div
          style={{
            opacity: line1,
            transform: `translateY(${interpolate(line1, [0, 1], [14, 0])}px)`,
            fontFamily: sans,
            fontWeight: 800,
            fontSize: 38,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "0.02em",
            padding: "0 60px",
          }}
        >
          HAPPY 79TH INDEPENDENCE DAY
        </div>

        <div
          style={{
            opacity: line2,
            transform: `translateY(${interpolate(line2, [0, 1], [10, 0])}px)`,
            fontFamily: sans,
            fontWeight: 700,
            fontSize: 26,
            color: tricolor.saffron,
            letterSpacing: "0.08em",
          }}
        >
          DEADLIFT FITNESS STUDIO
        </div>

        <div
          style={{
            opacity: line3,
            transform: `translateY(${interpolate(line3, [0, 1], [10, 0])}px)`,
            fontFamily: sans,
            fontWeight: 500,
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Safilguda, Hyderabad
        </div>

        <div
          style={{
            opacity: line4,
            transform: `translateY(${interpolate(line4, [0, 1], [8, 0])}px)`,
            fontFamily: sans,
            fontWeight: 700,
            fontSize: 20,
            color: tricolor.green,
            letterSpacing: "0.16em",
            marginTop: 6,
          }}
        >
          JAI HIND
        </div>
      </div>
    </AbsoluteFill>
  );
};
