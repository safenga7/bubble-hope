import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: { DEFAULT: "#FAF8F5", 100: "#F4EFE8", 200: "#EBE3D8" },
        amber: { DEFAULT: "#9E5D2A", deep: "#4A2E18", soft: "#E9D3BC" },
        taro: { DEFAULT: "#C7A9E5", soft: "#EADFF6", deep: "#8E6BB8" },
        matcha: { DEFAULT: "#4E8752", soft: "#DCEBDD" },
        mango: { DEFAULT: "#FF7A59", soft: "#FFE3DA" },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "var(--font-cairo)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "var(--font-cairo)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "var(--font-plex-ar)", "system-ui", "sans-serif"],
      },
      borderRadius: { "4xl": "2rem", "5xl": "2.5rem" },
      boxShadow: {
        glass: "0 8px 32px -8px rgba(74,46,24,0.18), inset 0 1px 0 rgba(255,255,255,0.7)",
        card: "0 14px 40px -18px rgba(74,46,24,0.35)",
        pop: "0 18px 36px -12px rgba(158,93,42,0.55)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        drip: {
          "0%": { transform: "scaleY(0.6)", opacity: "0.6" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        drip: "drip 2.4s ease-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
