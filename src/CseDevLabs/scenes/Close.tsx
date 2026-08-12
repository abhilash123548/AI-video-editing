import { AbsoluteFill, Sequence } from "remotion";
import { LogoLockup } from "../components/LogoLockup";
import { PhoneHero } from "../components/PhoneHero";

// 0:92-1:00.6 — CLOSE. Bookends the Solution-section logo reveal, then
// lands the final stamp-motif callback on the CTA button.
export const Close: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:92-0:98 */}
      <Sequence  durationInFrames={180}>
        <LogoLockup
          bouncy={false}
          taglineLines={["You graduate.", "We build the thing that gets you hired."]}
        />
      </Sequence>

      {/* 0:98-1:00.6 */}
      <Sequence from={180} durationInFrames={78}>
        <PhoneHero variant="button" label="CALL NOW" digitDelay={3} />
      </Sequence>
    </AbsoluteFill>
  );
};
