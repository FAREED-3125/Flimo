/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: "Manrope",
        pixels: "Pixelify Sans",
      },
    },
  },
  plugins: [],
};
