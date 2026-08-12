import { AbsoluteFill, Sequence } from "remotion";
import { StampImpact } from "../components/StampImpact";
import { KineticWords } from "../components/KineticWords";
import { brand } from "../fonts";

// 0:00-0:09 — HOOK. Fast, chaotic, cold-toned. Opens with the recurring
// stamp motif (callback at 0:77 and 1:00).
export const Hook: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0:00-0:03 */}
      <Sequence  durationInFrames={90}>
        <StampImpact text={"ARE YOU A\nFINAL-YEAR CS STUDENT?"} fontSize={62} color={brand.cool.text} />
      </Sequence>

      {/* 0:03-0:06 */}
      <Sequence from={90} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <KineticWords
            align="center"
            lines={[
              { text: "THEN HEAR THIS —", delay: 3, fontSize: 56, color: brand.cool.text },
              { text: "YOUR PROJECT HAS", delay: 12, fontSize: 56, color: brand.cool.text },
              { text: "ALREADY BEEN SEEN.", delay: 22, fontSize: 62, color: brand.cool.danger, underline: true },
            ]}
          />
        </AbsoluteFill>
      </Sequence>

      {/* 0:06-0:09 — rapid triple flash */}
      <Sequence from={180} durationInFrames={30}>
        <FlashCard text="BY RECRUITERS." />
      </Sequence>
      <Sequence from={210} durationInFrames={30}>
        <FlashCard text="BY YOUR PROFESSOR." />
      </Sequence>
      <Sequence from={240} durationInFrames={30}>
        <FlashCard text={"A HUNDRED\nTIMES OVER."} badge="x100" />
      </Sequence>
    </AbsoluteFill>
  );
};

const FlashCard: React.FC<{ text: string; badge?: string }> = ({ text, badge }) => {
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <KineticWords lines={[{ text, delay: 0, fontSize: 56, color: brand.cool.text }]} />
        {badge ? (
          <div
            style={{
              fontFamily: "Anton",
              fontSize: 40,
              color: "#000",
              background: brand.cool.danger,
              padding: "8px 22px",
              borderRadius: 10,
              transform: "rotate(-4deg)",
            }}
          >
            {badge}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
