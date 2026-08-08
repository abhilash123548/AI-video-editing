import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import "./fonts";
import { monoFont } from "./fonts";
import { Background } from "./Background";
import { BrandBar } from "./BrandBar";
import { ProgressBar } from "./ProgressBar";
import { CornerFrame } from "./CornerFrame";
import { WordCard } from "./WordCard";
import { OutroCard } from "./OutroCard";
import { SCENE_LABELS, WORD_BEATS } from "./beats";
import { getSceneTheme } from "./theme";

const FPS = 30;
export const AUDIO_DURATION_SECONDS = 48.7465;
export const AUDIO_FRAMES = Math.round(AUDIO_DURATION_SECONDS * FPS);
const OUTRO_FRAMES = 80;
export const CSE_DEVLABS_DURATION = AUDIO_FRAMES + OUTRO_FRAMES;
const AUDIO_FADE_OUT = 20;

const sfx = (name: string) => staticFile(`audio/sfx/${name}`);

const SceneTag: React.FC<{ frame: number; ink: string }> = ({ frame, ink }) => {
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
        color: ink,
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
  const theme = getSceneTheme(frame);
  const audioVolume = interpolate(
    frame,
    [0, AUDIO_FRAMES - AUDIO_FADE_OUT, AUDIO_FRAMES],
    [1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <Audio src={staticFile("audio/cse-devlabs-voiceover.ogg")} volume={audioVolume} />
      <Background theme={theme} />
      <CornerFrame color={theme.ink} />
      <BrandBar ink={theme.ink} />
      <ProgressBar totalDuration={CSE_DEVLABS_DURATION} line={theme.line} />
      <SceneTag frame={frame} ink={theme.inkSoft} />

      {WORD_BEATS.map((beat, i) => {
        const sfxFile = beat.graphic === "burst" ? "chime.wav" : beat.graphic ? "whoosh.wav" : beat.emphasis ? "pop.wav" : null;
        return (
          <Sequence key={i} from={beat.start} durationInFrames={beat.duration} layout="none">
            <WordCard
              word={beat.word}
              duration={beat.duration}
              emphasis={beat.emphasis}
              graphic={beat.graphic}
              seed={i}
              start={beat.start}
            />
            {sfxFile && <Audio src={sfx(sfxFile)} volume={0.45} />}
          </Sequence>
        );
      })}

      <Sequence from={AUDIO_FRAMES} durationInFrames={OUTRO_FRAMES} layout="none">
        <OutroCard durationInFrames={OUTRO_FRAMES} />
        <Audio src={sfx("chime-big.wav")} volume={0.55} />
      </Sequence>
    </AbsoluteFill>
  );
};
