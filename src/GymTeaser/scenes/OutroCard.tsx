import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KenBurnsImage } from "../KenBurnsImage";
import { bodyFont, headlineFont } from "../fonts";

type Props = { durationInFrames: number };

export const OutroCard: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineProgress = spring({ frame, fps, config: { damping: 14 } });
  const cardProgress = spring({ frame: frame - 25, fps, config: { damping: 16 } });

  return (
    <AbsoluteFill>
      <KenBurnsImage
        src={staticFile("images/gym-4.jpg")}
        durationInFrames={durationInFrames}
        direction="out"
        focalPosition="center"
      />
      <AbsoluteFill style={{ backgroundColor: "rgba(5,5,5,0.72)" }} />

      <AbsoluteFill
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 140,
        }}
      >
        <div
          style={{
            opacity: headlineProgress,
            transform: `translateY(${interpolate(headlineProgress, [0, 1], [30, 0])}px)`,
            fontFamily: headlineFont,
            color: "#ffffff",
            fontSize: 74,
            textAlign: "center",
            textTransform: "uppercase",
            padding: "0 70px",
            lineHeight: 1.05,
          }}
        >
          Your First Rep Starts Now
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 90 }}
      >
        <div
          style={{
            opacity: cardProgress,
            transform: `translateY(${interpolate(cardProgress, [0, 1], [40, 0])}px)`,
            backgroundColor: "rgba(15,15,15,0.85)",
            border: "2px solid #c81414",
            borderRadius: 28,
            padding: "36px 44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            width: 780,
          }}
        >
          <Img src={staticFile("brand/logo.jpg")} style={{ width: 120, borderRadius: 16 }} />
          <div
            style={{
              fontFamily: headlineFont,
              color: "#ffffff",
              fontSize: 44,
              letterSpacing: "0.03em",
              textAlign: "center",
            }}
          >
            DEADLIFT FITNESS STUDIO
          </div>
          <div style={{ fontFamily: bodyFont, color: "#ffcf4d", fontSize: 28 }}>
            {"★".repeat(5)} 4.7 (386 reviews)
          </div>
          <div style={{ fontFamily: bodyFont, color: "#ffffff", fontSize: 30, textAlign: "center" }}>
            Safilguda, Hyderabad
          </div>
          <div style={{ fontFamily: bodyFont, color: "#ffffff", fontSize: 30 }}>
            +91 7702 297 173
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
