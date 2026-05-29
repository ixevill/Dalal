import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        ivory: "#F5F4F0",
        linen: "#E8E5DF",
        "warm-gray": "#C9C5BC",
        charcoal: "#5C5852",
        noir: "#1C1C1C",
        "gold-light": "#E8D5B0",
        gold: "#C9A96E",
        "gold-deep": "#9A7A45",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        tajawal: ["var(--font-tajawal)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
        widest3: "0.25em",
        widest4: "0.35em",
      },
      borderWidth: {
        "0.5": "0.5px",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
