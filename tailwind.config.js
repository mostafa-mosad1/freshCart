import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        heading: ["'Outfit'", "sans-serif"],
        cairo: ["'Cairo'", "sans-serif"],
        titleCard: ["Pacifico", "cursive"],
      },
      colors: {
        mainColor: "#10b981", // Emerald 500
        main_color: "#10b981",
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        light_color: "#f8fafc",
        rating_color: "#f59e0b",
      },
      boxShadow: {
        cardShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1), 0 8px 10px -6px rgba(16, 185, 129, 0.1)",
        cardHover: "0 20px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -3px rgba(16, 185, 129, 0.12)",
        glow: "0 0 20px rgba(16, 185, 129, 0.35)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};

