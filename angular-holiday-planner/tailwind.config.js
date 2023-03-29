/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      gridTemplateRows: {calendarRows: "20px repeat(6, 1fr)"},
      gridTemplateColumns: {calendarColumns: "repeat(7, 1fr)"},
    },
  },
  plugins: ["tailwindcss ,autoprefixer"],
}
