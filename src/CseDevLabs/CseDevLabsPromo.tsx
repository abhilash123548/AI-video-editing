import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import "./fonts";
import { monoFont, palette } from "./fonts";
import { Background } from "./Background";
import { BrandBar } from "./BrandBar";
import { ProgressBar } from "./ProgressBar";
import { WordCard } from "./WordCard";
import { OutroCard } from "./OutroCard";
import { SCENE_LABELS, WORD_BEATS } from "./beats";

const FPS = 30;
export const AUDIO_DURATION_SECONDS = 48.7465;
export const AUDIO_FRAMES = Math.round(AUDIO_DURATION_SECONDS * FPS);
const OUTRO_FRAMES = 80;
export const CSE_DEVLABS_DURATION = AUDIO_FRAMES + OUTRO_FRAMES;
const AUDIO_FADE_OUT = 20;

const SceneTag: React.FC<{ frame: number }> = ({ frame }) => {
  const beat = WORD_BEATS.find((b) => frame >= b.start && frame < b.start + b.duration);
  const sceneIndex = beat ? beat.scene : WORD_BEATS[WORD_BEATS.length - 1].scene;
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        bottom: 92,
        opacity: opacity * 0.7,
        fontFamily: monoFont,
        fontWeight: 500,
        fontSize: 20,
        color: palette.inkSoft,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {String(sceneIndex + 1).padStart(2, "0")} / {String(SCENE_LABELS.length).padStart(2, "0")}
      {"  "}
      {SCENE_LABELS[sceneIndex]}
    </div>
  );
};

export const CseDevLabsPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const audioVolume = interpolate(
    frame,
    [0, AUDIO_FRAMES - AUDIO_FADE_OUT, AUDIO_FRAMES],
    [1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: palette.bg }}>
      <Audio src={staticFile("audio/cse-devlabs-voiceover.ogg")} volume={audioVolume} />
      <Background />
      <BrandBar />
      <ProgressBar totalDuration={CSE_DEVLABS_DURATION} />
      <SceneTag frame={frame} />

      {WORD_BEATS.map((beat, i) => (
        <Sequence key={i} from={beat.start} durationInFrames={beat.duration} layout="none">
          <WordCard
            word={beat.word}
            duration={beat.duration}
            emphasis={beat.emphasis}
            graphic={beat.graphic}
            seed={i}
          />
        </Sequence>
      ))}

      <Sequence from={AUDIO_FRAMES} durationInFrames={OUTRO_FRAMES} layout="none">
        <OutroCard durationInFrames={OUTRO_FRAMES} />
      </Sequence>
    </AbsoluteFill>
  );
};
