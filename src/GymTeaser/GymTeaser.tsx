import { fade } from "@remotion/transitions/fade";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, staticFile } from "remotion";
import { IntroLogo } from "./scenes/IntroLogo";
import { TextOverImage } from "./scenes/TextOverImage";
import { BrandReveal } from "./scenes/BrandReveal";
import { OutroCard } from "./scenes/OutroCard";

const TRANSITION = 15;

export const SCENE_DURATIONS = [100, 140, 130, 170, 110, 110, 140, 200];
export const GYM_TEASER_DURATION =
  SCENE_DURATIONS.reduce((a, b) => a + b, 0) - (SCENE_DURATIONS.length - 1) * TRANSITION;

export const GymTeaser: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[0]}>
          <IntroLogo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[1]}>
          <TextOverImage
            image={staticFile("images/gym-1.jpg")}
            durationInFrames={SCENE_DURATIONS[1]}
            direction="in"
            focalPosition="center 30%"
            verticalAlign="end"
            lines={[
              { text: "Everyone else is scrolling.", delay: 8, fontSize: 62 },
              { text: "You're here.", delay: 45, fontSize: 88, color: "#ff3b3b" },
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[2]}>
          <TextOverImage
            image={staticFile("images/gym-3.jpg")}
            durationInFrames={SCENE_DURATIONS[2]}
            direction="out"
            verticalAlign="center"
            lines={[
              { text: "No excuses.", delay: 8, fontSize: 92 },
              { text: "No shortcuts.", delay: 40, fontSize: 92 },
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[3]}>
          <TextOverImage
            image={staticFile("images/gym-4.jpg")}
            durationInFrames={SCENE_DURATIONS[3]}
            direction="in"
            verticalAlign="center"
            lines={[
              { text: "Just weight, sweat,", delay: 8, fontSize: 58 },
              { text: "and the version of you", delay: 35, fontSize: 58 },
              { text: "that's still waiting to show up.", delay: 65, fontSize: 58, color: "#ff3b3b" },
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[4]}>
          <TextOverImage
            image={staticFile("images/gym-5.jpg")}
            durationInFrames={SCENE_DURATIONS[4]}
            direction="out"
            verticalAlign="end"
            lines={[{ text: "Stronger than yesterday.", delay: 8, fontSize: 80 }]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[5]}>
          <TextOverImage
            image={staticFile("images/gym-1.jpg")}
            durationInFrames={SCENE_DURATIONS[5]}
            direction="out"
            focalPosition="center 30%"
            verticalAlign="center"
            lines={[{ text: "Louder than your doubts.", delay: 8, fontSize: 80, color: "#ff3b3b" }]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[6]}>
          <BrandReveal />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[7]}>
          <OutroCard durationInFrames={SCENE_DURATIONS[7]} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
