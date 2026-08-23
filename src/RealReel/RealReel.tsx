import { fade } from "@remotion/transitions/fade";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";
import { WatermarkedVideo } from "./scenes/WatermarkedVideo";
import { OutroCard } from "../GymTeaser/scenes/OutroCard";

const TRANSITION = 20;
const VIDEO_DURATION = 1230; // 41s of real footage at 30fps
const OUTRO_DURATION = 195;
const MUSIC_FADE_IN = 40;
const MUSIC_FADE_OUT = 30;

export const REAL_REEL_DURATION = VIDEO_DURATION + OUTRO_DURATION - TRANSITION;

export const RealReel: React.FC = () => {
  const frame = useCurrentFrame();

  const musicVolume = interpolate(
    frame,
    [
      0,
      VIDEO_DURATION - MUSIC_FADE_IN,
      VIDEO_DURATION,
      REAL_REEL_DURATION - MUSIC_FADE_OUT,
      REAL_REEL_DURATION,
    ],
    [0, 0, 0.65, 0.65, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Audio src={staticFile("audio/gym-phonk.mp3")} volume={musicVolume} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={VIDEO_DURATION}>
          <WatermarkedVideo src={staticFile("videos/real-footage.mp4")} durationInFrames={VIDEO_DURATION} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
          <OutroCard durationInFrames={OUTRO_DURATION} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
