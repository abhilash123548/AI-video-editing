import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { iris } from "@remotion/transitions/iris";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, staticFile } from "remotion";
import { IntroLogo } from "./scenes/IntroLogo";
import { TextOverImage } from "./scenes/TextOverImage";
import { BrandReveal } from "./scenes/BrandReveal";
import { OutroCard } from "./scenes/OutroCard";

const TRANSITION = 15;
const WIDTH = 1080;
const HEIGHT = 1920;

export const SCENE_DURATIONS = [
  40, // intro logo flash
  90, // hook - 3s exactly
  105, // discipline
  90, // every rep matters
  105, // every drop of sweat
  135, // this isn't about
  105, // cardio strength grit
  105, // no shortcuts no excuses
  90, // just results
  105, // strength has no gender
  135, // brand reveal
  195, // outro
];
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

        {/* HOOK - 3s, mural wall as strongest opening visual */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[1]}>
          <TextOverImage
            image={staticFile("images/gym-9.jpg")}
            durationInFrames={SCENE_DURATIONS[1]}
            direction="in"
            verticalAlign="center"
            lines={[{ text: "Your excuses die here.", delay: 4, fontSize: 74, color: "#ff3b3b" }]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[2]}>
          <TextOverImage
            image={staticFile("images/gym-7.jpg")}
            durationInFrames={SCENE_DURATIONS[2]}
            direction="out"
            verticalAlign="center"
            lines={[
              { text: "Motivation fades.", delay: 6, fontSize: 82 },
              { text: "Discipline stays.", delay: 35, fontSize: 82, color: "#ff3b3b" },
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[3]}>
          <TextOverImage
            image={staticFile("images/gym-2.jpg")}
            durationInFrames={SCENE_DURATIONS[3]}
            direction="in"
            verticalAlign="end"
            lines={[{ text: "Every rep matters.", delay: 6, fontSize: 84 }]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[4]}>
          <TextOverImage
            image={staticFile("images/gym-3.jpg")}
            durationInFrames={SCENE_DURATIONS[4]}
            direction="out"
            verticalAlign="center"
            lines={[
              { text: "Every drop of sweat", delay: 6, fontSize: 58 },
              { text: "is a step forward.", delay: 32, fontSize: 58, color: "#ff3b3b" },
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={flip({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[5]}>
          <TextOverImage
            image={staticFile("images/gym-4.jpg")}
            durationInFrames={SCENE_DURATIONS[5]}
            direction="in"
            verticalAlign="center"
            lines={[
              { text: "This isn't about", delay: 6, fontSize: 56 },
              { text: "looking better.", delay: 30, fontSize: 56 },
              { text: "It's about becoming unstoppable.", delay: 58, fontSize: 52, color: "#ff3b3b" },
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-top" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[6]}>
          <TextOverImage
            image={staticFile("images/gym-1.jpg")}
            durationInFrames={SCENE_DURATIONS[6]}
            direction="out"
            focalPosition="center 30%"
            verticalAlign="end"
            lines={[{ text: "Cardio. Strength. Grit.", delay: 6, fontSize: 66 }]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[7]}>
          <TextOverImage
            image={staticFile("images/gym-5.jpg")}
            durationInFrames={SCENE_DURATIONS[7]}
            direction="in"
            verticalAlign="center"
            lines={[
              { text: "Show up.", delay: 6, fontSize: 92 },
              { text: "Even when it's hard.", delay: 32, fontSize: 62, color: "#ff3b3b" },
            ]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[8]}>
          <TextOverImage
            image={staticFile("images/gym-8.jpg")}
            durationInFrames={SCENE_DURATIONS[8]}
            direction="out"
            verticalAlign="center"
            lines={[{ text: "Just results.", delay: 6, fontSize: 92 }]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[9]}>
          <TextOverImage
            image={staticFile("images/gym-10.jpg")}
            durationInFrames={SCENE_DURATIONS[9]}
            direction="in"
            verticalAlign="center"
            lines={[{ text: "Strength has no gender.", delay: 6, fontSize: 66, color: "#ff3b3b" }]}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={iris({ width: WIDTH, height: HEIGHT })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[10]}>
          <BrandReveal />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS[11]}>
          <OutroCard durationInFrames={SCENE_DURATIONS[11]} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
