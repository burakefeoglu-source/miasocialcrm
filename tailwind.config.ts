import type { Config } from "tailwindcss";

// Tasarım sisteminin tek kaynağı: renkler, yazı tipleri, köşe yuvarlaklığı.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6C5CE7",
          600: "#5B4BD8",
          50: "#F6F4FF",
          100: "#ECE9FF",
          200: "#DDD8FF",
        },
        ink: "#171717",
        mute: "#71717A",
        page: "#F7F7FA",
        line: "rgba(0,0,0,0.07)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04)",
        pop: "0 12px 32px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
