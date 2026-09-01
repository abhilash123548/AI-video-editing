export const FPS = 25;
export const TOTAL_FRAMES = 2207;

const f = (seconds: number) => Math.round(seconds * FPS);

export type Tier = "low" | "mid" | "high";

export type Beat =
  | { kind: "caption"; from: number; to: number; lines: { text: string; delay: number; fontSize?: number; color?: string }[] }
  | { kind: "section"; from: number; to: number; title: string }
  | { kind: "rating"; from: number; to: number; tier: Tier; label: string; line: string; stat?: string }
  | { kind: "line"; from: number; to: number; text: string; fontSize?: number }
  | { kind: "cta"; from: number; to: number }
  | { kind: "end"; from: number; to: number };

export const beats: Beat[] = [
  {
    kind: "caption",
    from: f(0),
    to: f(2),
    lines: [{ text: "Tired of getting the same results?", delay: 4, fontSize: 60 }],
  },
  {
    kind: "caption",
    from: f(2),
    to: f(4.8),
    lines: [{ text: "Your approach needs to change.", delay: 4, fontSize: 60, color: "#ff3b3b" }],
  },
  {
    kind: "caption",
    from: f(4.8),
    to: f(6.2),
    lines: [{ text: "Listen up.", delay: 2, fontSize: 88 }],
  },
  { kind: "section", from: f(6.2), to: f(8.9), title: "Gym Frequency" },
  {
    kind: "rating",
    from: f(8.9),
    to: f(10.1),
    tier: "low",
    label: "BAD",
    line: "Training every single day without enough recovery",
  },
  {
    kind: "rating",
    from: f(10.1),
    to: f(12.0),
    tier: "mid",
    label: "GOOD",
    line: "Training around 3 times a week",
    stat: "3× / WEEK",
  },
  {
    kind: "rating",
    from: f(12.0),
    to: f(15.1),
    tier: "high",
    label: "EXCELLENT",
    line: "Training consistently with proper rest and recovery",
  },
  {
    kind: "caption",
    from: f(15.1),
    to: f(17.3),
    lines: [{ text: "Let's talk sleep.", delay: 4, fontSize: 66 }],
  },
  { kind: "section", from: f(17.3), to: f(18.9), title: "Sleep" },
  {
    kind: "rating",
    from: f(18.9),
    to: f(21.1),
    tier: "low",
    label: "BAD",
    line: "Getting only 4 hours of sleep",
    stat: "4 HOURS",
  },
  {
    kind: "rating",
    from: f(21.1),
    to: f(24.3),
    tier: "mid",
    label: "BETTER",
    line: "Getting around 6 hours",
    stat: "6 HOURS",
  },
  {
    kind: "rating",
    from: f(24.3),
    to: f(28.4),
    tier: "high",
    label: "EXCELLENT",
    line: "Getting 7–8 hours consistently",
    stat: "7–8 HOURS",
  },
  {
    kind: "caption",
    from: f(28.4),
    to: f(31.7),
    lines: [
      { text: "Your muscles don't grow while you're lifting.", delay: 4, fontSize: 48 },
      { text: "Recovery is where the growth happens.", delay: 40, fontSize: 52, color: "#ff3b3b" },
    ],
  },
  { kind: "section", from: f(31.7), to: f(33.5), title: "Fat Loss Diet" },
  {
    kind: "rating",
    from: f(33.5),
    to: f(35.6),
    tier: "low",
    label: "BAD",
    line: "Maida, excess sugar and highly processed foods",
  },
  {
    kind: "rating",
    from: f(35.6),
    to: f(37.5),
    tier: "mid",
    label: "GOOD",
    line: "Balanced, home-cooked meals",
  },
  {
    kind: "rating",
    from: f(37.5),
    to: f(41.5),
    tier: "high",
    label: "EXCELLENT",
    line: "Enough protein + plenty of vegetables + proper hydration",
  },
  { kind: "section", from: f(41.5), to: f(42.8), title: "Weight Gain Diet" },
  {
    kind: "rating",
    from: f(42.8),
    to: f(44.2),
    tier: "low",
    label: "NOT ENOUGH",
    line: "Eating only rice and roti",
  },
  {
    kind: "rating",
    from: f(44.2),
    to: f(46.0),
    tier: "mid",
    label: "GOOD",
    line: "Rice + dal + sabzi",
  },
  {
    kind: "rating",
    from: f(46.0),
    to: f(49.2),
    tier: "high",
    label: "EXCELLENT",
    line: "Rice + eggs/paneer + dal + curd + vegetables",
  },
  {
    kind: "caption",
    from: f(49.2),
    to: f(53.5),
    lines: [
      { text: "Gaining healthy weight isn't just about eating more.", delay: 4, fontSize: 44 },
      { text: "It's about eating better.", delay: 42, fontSize: 58, color: "#ff3b3b" },
    ],
  },
  {
    kind: "caption",
    from: f(53.5),
    to: f(56.5),
    lines: [{ text: "One more thing.", delay: 4, fontSize: 70 }],
  },
  { kind: "section", from: f(56.5), to: f(57.6), title: "Cardio & Weights" },
  {
    kind: "rating",
    from: f(57.6),
    to: f(59.1),
    tier: "low",
    label: "NOT IDEAL",
    line: "Intense cardio before your weight training",
  },
  {
    kind: "rating",
    from: f(59.1),
    to: f(60.7),
    tier: "mid",
    label: "GOOD",
    line: "Weights first, then cardio",
  },
  {
    kind: "rating",
    from: f(60.7),
    to: f(63.4),
    tier: "high",
    label: "EXCELLENT",
    line: "Strength training + appropriate cardio + enough protein all day",
  },
  {
    kind: "caption",
    from: f(63.4),
    to: f(67.0),
    lines: [{ text: "Now here's the part most people skip.", delay: 4, fontSize: 52 }],
  },
  {
    kind: "line",
    from: f(67.0),
    to: f(68.4),
    text: "And one more thing —",
    fontSize: 66,
  },
  {
    kind: "caption",
    from: f(68.4),
    to: f(70.9),
    lines: [{ text: "Stop looking for shortcuts.", delay: 4, fontSize: 66, color: "#ff3b3b" }],
  },
  { kind: "line", from: f(70.9), to: f(72.8), text: "Train consistently." },
  { kind: "line", from: f(72.8), to: f(74.5), text: "Eat according to your goal." },
  { kind: "line", from: f(74.5), to: f(76.1), text: "Recover properly." },
  {
    kind: "caption",
    from: f(76.1),
    to: f(78.2),
    lines: [{ text: "And give your body time to adapt.", delay: 4, fontSize: 54 }],
  },
  {
    kind: "caption",
    from: f(78.2),
    to: f(80.2),
    lines: [{ text: "Do that consistently —", delay: 4, fontSize: 62 }],
  },
  {
    kind: "line",
    from: f(80.2),
    to: f(83.5),
    text: "And the results will speak for themselves.",
    fontSize: 48,
  },
  { kind: "cta", from: f(83.5), to: f(84.6) },
  { kind: "end", from: f(84.6), to: TOTAL_FRAMES },
];
