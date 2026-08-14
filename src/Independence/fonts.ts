import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/latin-800.css";

// Brief's explicit type rule: "bold modern sans-serif... Inter Bold /
// Montserrat SemiBold / Poppins SemiBold" — no condensed-caps stamp font
// here, this brand voice is premium-cinematic, not punchy-social.
export const sans = "Inter";

export const tricolor = {
  saffron: "#FF9933",
  white: "#FFFFFF",
  green: "#138808",
};

export const palette = {
  historical: { bg0: "#1a140c", bg1: "#2b2013", grain: 0.12, warm: "#caa46b" },
  journey: { bg0: "#171512", bg1: "#241f18", warm: "#d8b988" },
  modern: { bg0: "#0a1018", bg1: "#132030", accent: "#3fa9ff" },
  gym: { bg0: "#0a0a0a", bg1: "#1a0808", red: "#c81414" },
  final: { bg0: "#050505", bg1: "#120202" },
};
