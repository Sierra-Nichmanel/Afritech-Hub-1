/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./animations.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#E11D48",
        secondary: "#1E293B",
        "background-light": "#F8FAFC",
        "background-dark": "#020617",
      },
      fontFamily: {
        display: ["Montserrat", "Lexend", "Space Grotesk", "Sora", "Plus Jakarta Sans", "sans-serif"],
        sans: ["Inter", "Plus Jakarta Sans", "Outfit", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
}

