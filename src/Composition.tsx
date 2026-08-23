import { Composition } from "remotion";
import { GymTeaser, GYM_TEASER_DURATION } from "./GymTeaser/GymTeaser";
import { RealReel, REAL_REEL_DURATION } from "./RealReel/RealReel";

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
        id="DeadliftRealReel"
        component={RealReel}
        durationInFrames={REAL_REEL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
