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
        text3: "#272B35",
      },
      fontFamily: {
        prociono: ["Prociono-Regular"],
        poppins: ["Poppins-Regular"],
        poppinsMedium: ["Poppins-Medium"],
        poppinsLight: ["Poppins-Light"],
        poppinsLightItalic: ["Poppins-LightItalic"],
        poppinsThin: ["Poppins-Thin"],
        poppinsThinItalic: ["Poppins-ThinItalic"],
        poppinsBold: ["Poppins-Bold"],
        poppinsBoldItalic: ["Poppins-BoldItalic"],
        poppinsSemiBold: ["Poppins-SemiBold"],
        poppinsSemiBoldItalic: ["Poppins-SemiBoldItalic"],
        poppinsExtraBold: ["Poppins-ExtraBold"],
        poppinsExtraBoldItalic: ["Poppins-ExtraBoldItalic"],
        poppinsBlack: ["Poppins-Black"],
        poppinsBlackItalic: ["Poppins-BlackItalic"],
        poppinsItalic: ["Poppins-Italic"],
        poppinsMediumItalic: ["Poppins-MediumItalic"],
      },
    },
  },
  plugins: [],
}
