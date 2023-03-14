/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      indie: ["Indie Flower", "cursive"],
      josefin: ["Josefin Sans", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      righteous: ["Righteous", "cursive"],
      secular: ["Secular One", "sans-serif"],
      shantell: ["Shantell Sans", "cursive"],
    },
    extend: {},
  },
  plugins: [],
};
