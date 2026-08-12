import { Composition } from "remotion";
import { GymTeaser, GYM_TEASER_DURATION } from "./GymTeaser/GymTeaser";
import { CseDevLabsAd, CSE_DEVLABS_DURATION } from "./CseDevLabs/CseDevLabsAd";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="DeadliftGymTeaser"
        component={GymTeaser}
        durationInFrames={GYM_TEASER_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CseDevLabsAd"
        component={CseDevLabsAd}
        durationInFrames={CSE_DEVLABS_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
