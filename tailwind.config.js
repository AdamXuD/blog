/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      app: "#ffffff",
      primary: "#303133",
      regular: "#606266",
      secondary: "#909399",
      "dark-app": "#181818",
      "dark-primary": "#dfdfd7",
      "dark-regular": "#99999a",
      "dark-secondary": "#68686d",
      black: "#000000",
      white: "#ffffff",
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
