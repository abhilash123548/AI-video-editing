import { Composition } from "remotion";
import { GymTeaser, GYM_TEASER_DURATION } from "./GymTeaser/GymTeaser";
import { CseDevLabsPromo, CSE_DEVLABS_DURATION } from "./CseDevLabs/CseDevLabsPromo";

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
        id="CseDevLabsPromo"
        component={CseDevLabsPromo}
        durationInFrames={CSE_DEVLABS_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
