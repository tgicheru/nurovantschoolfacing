/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#4970fc",
        silver: "#A2A2A1",
        dark: "#1b1b1b",
      },
      backgroundImage: {
        pattern: "url('/src/assets/auth-bg.png')",
      },
    },
  },
  plugins: [],
};
