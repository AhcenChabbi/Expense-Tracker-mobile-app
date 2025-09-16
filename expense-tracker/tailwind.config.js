/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Expo Router pages
    "./components/**/*.{js,jsx,ts,tsx}", // Your components
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf9f7",
          100: "#f3e7de",
          200: "#e0c9b7",
          300: "#cea68d",
          400: "#b47a57",
          500: "#965a3e",
          600: "#7a4532",
          700: "#5d3225",
          800: "#3f1f19",
          900: "#1f0f0c",
        },
      },
    },
  },
  plugins: [],
};
