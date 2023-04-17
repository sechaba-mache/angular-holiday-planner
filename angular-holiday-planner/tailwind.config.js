/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      gridTemplateRows: {calendarRows: "20px repeat(6, 1fr)", homeBodyRows: "1fr"},
      gridTemplateColumns: {calendarColumns: "repeat(7, 1fr)", homeBodyColumns: "70% 1fr", tripColumns: "10% repeat(4, 1fr)", activityColumns: "5% repeat(3, 1fr) 10% 5% 5%"},
      backgroundImage: {
        "loginBackground": "url('src/assets/backgrounds/pexels-vittorio-staffolani-391726.jpg')",
        "logo": "url('src/assets/logos/planme-high-resolution-logo-color-on-transparent-background.png')",
        "logoHome": "url('src/assets/logos/planme-low-resolution-logo-black-on-transparent-background.png')"
      }
    },
  },
  plugins: ["tailwindcss ,autoprefixer", require('@tailwindcss/line-clamp'),],
}
