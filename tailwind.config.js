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
        background: "#FEF8EF",
        primary: "#FF8835",
        primary2: "#FF5858",
        secondary: "#FFBF12",
        text1: "#1D293D",
        text2: "#62748E",
      },
      fontFamily: {
        prociono: ["Prociono-Regular"],
        poppins: ["Poppins-Regular"],
        poppinsMedium: ["Poppins-Medium"],
      },
    },
  },
  plugins: [],
}