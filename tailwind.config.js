/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            textShadow: "0 0 8px rgba(250, 179, 135, 0.3)",
          },
          "50%": {
            textShadow: "0 0 20px rgba(250, 179, 135, 0.6)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0) translateX(-50%)",
          },
          "50%": {
            transform: "translateY(-5px) translateX(-50%)",
          },
        },
      },
      transitionTimingFunction: {
        elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};
