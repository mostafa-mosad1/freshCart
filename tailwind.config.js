import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily:{
        titleCard: ["Pacifico", "cursive"],
        font_weight: "900",
        font_style: "normal"
      },
       colors:{
       mainColor:"#0aad0a",
       light_color:"#f0f3f2",
       rating_color:"#ffc908",
       },
       boxShadow:{
        "cardShadow": "2px 2px 10px #4fa74f"
       },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "4rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
