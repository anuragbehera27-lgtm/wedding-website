import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Replace Tailwind defaults for these — we own the full scale
    borderRadius: {
      none: "0",
      sm: "3px",
      DEFAULT: "3px",
      md: "8px",
      full: "9999px",
    },
    boxShadow: {
      none: "none",
      sm: "0 1px 4px rgba(28, 24, 38, 0.06)",
      DEFAULT: "0 1px 4px rgba(28, 24, 38, 0.06)",
      md: "0 4px 20px rgba(28, 24, 38, 0.08), 0 1px 4px rgba(28, 24, 38, 0.04)",
      lg: "0 16px 48px rgba(28, 24, 38, 0.10), 0 4px 12px rgba(28, 24, 38, 0.05)",
    },
    extend: {
      // ─── Color palette — 6 values, one accent ───
      colors: {
        bg:      "#FAF8F5", // page background
        ink:     "#1C1826", // headlines, primary text
        muted:   "#6B5F7E", // body copy, descriptions
        subtle:  "#C8BFCF", // borders, dividers, inactive
        surface: "#F0EBF5", // card backgrounds, form fields
        accent:  "#7C62A0", // the one accent: buttons, links, focus
      },

      // ─── Font families ───
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-josefin)", "'Helvetica Neue'", "sans-serif"],
        script:  ["var(--font-fleur)", "cursive"],
      },

      // ─── Type scale — 6 sizes ───
      // display  → hero names only
      // heading  → section h2 titles
      // title    → card headings, sub-titles (h3)
      // body     → paragraph copy
      // label    → nav, form labels, section tags
      // micro    → timestamps, captions
      fontSize: {
        display: [
          "clamp(4rem, 10vw, 7.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
        heading: [
          "clamp(2.25rem, 5vw, 3.625rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        title: [
          "clamp(1.25rem, 2.5vw, 1.75rem)",
          { lineHeight: "1.3", letterSpacing: "0em" },
        ],
        body: ["1rem", { lineHeight: "1.75", letterSpacing: "0em" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.25em" }],
        micro: ["0.625rem", { lineHeight: "1", letterSpacing: "0.25em" }],
      },

      // ─── Spacing — 4px base, 7 steps ───
      // Tailwind's default scale already covers these values exactly:
      // 1=4px  2=8px  4=16px  6=24px  10=40px  16=64px  24=96px
      // No custom spacing needed. Use those tokens directly.

      // ─── Transition durations ───
      transitionDuration: {
        fast:  "150ms", // button hover, toggles, active states
        base:  "280ms", // nav, focus states, language toggle
        enter: "600ms", // scroll-triggered reveals
        page:  "900ms", // hero entrance sequence only
      },

      // ─── Transition easings ───
      transitionTimingFunction: {
        "out-expo":    "cubic-bezier(0.16, 1, 0.3, 1)",   // exits, reveals
        "in-out-quart":"cubic-bezier(0.83, 0, 0.17, 1)",  // definite end states
        "spring":      "cubic-bezier(0.34, 1.3, 0.64, 1)",// button press only
      },

      // ─── Max width ───
      maxWidth: {
        site: "1240px",
      },

      // ─── Photo strip marquee ───
      animation: {
        "marquee-fwd": "marquee 130s linear infinite",
        "marquee-rev": "marquee 160s linear infinite reverse",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
