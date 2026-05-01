/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          950: "#0a0a0f",
          900: "#12121a",
          800: "#1c1c28",
          700: "#272736",
        },
        signal: {
          DEFAULT: "#e8ff47",
          dim: "#c9e030",
        },
        coral: "#ff6b6b",
        sky: "#47d0ff",
      },
      animation: {
        "slide-in": "slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-12px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
