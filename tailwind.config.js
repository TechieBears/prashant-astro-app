/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4c669f",
        secondary: "#F98D07",
        accent: "#192f6a",
        danger: "#ff4d4f",
        success: "#52c41a",
        warning: "#faad14",
        muted: "#d1d5db",
        gray : "#D9D9D9",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}