import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A", // Primary Navy
          deep: "#0E2A4D", // Deep Navy
        },
        gold: {
          DEFAULT: "#F5A623", // Accent Gold
        },
        gradient: {
          start: "#3AA0F0", // Gradient Blue Start (light)
          end: "#0B1F3A", // Gradient Blue End (navy)
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F7F9FC", // light gray-blue alternating sections
        },
        muted: {
          DEFAULT: "#5B6B82", // Text muted
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #3AA0F0 0%, #0B1F3A 100%)",
        "gradient-brand-soft":
          "linear-gradient(135deg, rgba(58,160,240,0.15) 0%, rgba(11,31,58,0.05) 100%)",
      },
      boxShadow: {
        card: "0 8px 30px rgba(11, 31, 58, 0.08)",
        "card-hover": "0 16px 40px rgba(11, 31, 58, 0.14)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
