import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-tint": "#c6c6c7",
        "secondary-fixed": "#d9e2ff",
        "surface-container-lowest": "#0e0e0e",
        secondary: "#b1c5ff",
        "on-secondary": "#002c70",
        "primary-container": "#e2e2e2",
        "on-error": "#690005",
        "inverse-surface": "#e5e2e1",
        "on-tertiary": "#313030",
        "on-tertiary-fixed-variant": "#474746",
        "surface-container-high": "#2a2a2a",
        primary: "#ffffff",
        "on-primary-fixed": "#1a1c1c",
        "tertiary-fixed-dim": "#c8c6c5",
        surface: "#131313",
        error: "#ffb4ab",
        "tertiary-fixed": "#e5e2e1",
        "on-tertiary-container": "#656464",
        "surface-bright": "#3a3939",
        "on-tertiary-fixed": "#1c1b1b",
        "on-surface": "#e5e2e1",
        "on-secondary-fixed": "#001946",
        "surface-dim": "#131313",
        "on-primary": "#2f3131",
        "surface-container-highest": "#353534",
        "secondary-fixed-dim": "#b1c5ff",
        "outline-variant": "#444748",
        "on-primary-container": "#636565",
        "tertiary-container": "#e5e2e1",
        outline: "#8e9192",
        "on-background": "#e5e2e1",
        "surface-container": "#201f1f",
        "inverse-primary": "#5d5f5f",
        "inverse-on-surface": "#313030",
        "on-error-container": "#ffdad6",
        "primary-fixed-dim": "#c6c6c7",
        "on-primary-fixed-variant": "#454747",
        "surface-variant": "#353534",
        "on-secondary-fixed-variant": "#00419d",
        tertiary: "#ffffff",
        "secondary-container": "#024ab0",
        "on-secondary-container": "#abc2ff",
        background: "#131313",
        "primary-fixed": "#e2e2e2",
        "on-surface-variant": "#c4c7c8",
        "error-container": "#93000a",
        "surface-container-low": "#1c1b1b",
        obsidian: "#050505",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
        pill: "9999px",
      },
      spacing: {
        gutter: "24px",
        lg: "24px",
        "2xl": "64px",
        unit: "4px",
        sm: "8px",
        md: "16px",
        xs: "4px",
        "container-max": "1440px",
        xl: "40px",
      },
      fontFamily: {
        "body-base": ["Inter", "sans-serif"],
        "display-lg": ["'Noto Serif'", "serif"],
        "mono-ui": ["Geist", "monospace"],
        "code-label": ["Geist", "monospace"],
        "headline-md": ["'Noto Serif'", "serif"],
        "body-sm": ["Inter", "sans-serif"],
        "display-lg-mobile": ["'Noto Serif'", "serif"],
      },
      fontSize: {
        "body-base": [
          "16px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
        "display-lg": [
          "64px",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            fontWeight: "400",
          },
        ],
        "mono-ui": [
          "12px",
          {
            lineHeight: "1.4",
            fontWeight: "400",
          },
        ],
        "code-label": [
          "13px",
          {
            lineHeight: "1.2",
            letterSpacing: "0.05em",
            fontWeight: "500",
          },
        ],
        "headline-md": [
          "32px",
          {
            lineHeight: "1.3",
            fontWeight: "400",
          },
        ],
        "body-sm": [
          "14px",
          {
            lineHeight: "1.5",
            fontWeight: "400",
          },
        ],
        "display-lg-mobile": [
          "40px",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
      },
      keyframes: {
        fadeInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up":
          "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up-delay-1":
          "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
        "fade-in-up-delay-2":
          "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
        "fade-in-up-delay-3":
          "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards",
        "fade-in-up-delay-4":
          "fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
