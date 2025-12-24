/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        main: "#215BA0", // 메인 블루 색상
      },
      fontSize: {
        10: "10px",
        15: "15px",
        17: "17px",
      },
      fontFamily: {
        sans: ["Pretendard", "Roboto", "AppleSDGothicNeo", "sans-serif"],
      },
      screens: {
        "max-xs": { max: "360px" },
        "mini-mobile": { max: "400px" },
      },
    },
  },
  plugins: [],
};
