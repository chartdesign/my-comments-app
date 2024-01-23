/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary colors
        moderateBlue: "	#5457b6",
        softRed: "#ed6468",
        lightGrayishBlue: "	#c3c4ef",
        paleRed: "#ffb8bb",
        // nuetral colors
        darkBlue: "#324152",
        grayishBlue: "#67727e",
        lightGray: "#eaecf1",
        veryLightGray: "#f5f6fa",
        white: "#ffffff",
      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
