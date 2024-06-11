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
        secondary: "#101828",
        success: "#58BE80",
        primary: "#4970fc",
        silver: "#A2A2A1",
        light: "#f9f9f9",
        dark: "#1b1b1b",
        gray: "#667085",
        fint: "#F5F5F5",
        lit: "#EEF2F9",
      },
      backgroundImage: {
        pattern: "url('/src/assets/auth-bg.png')",
        homeBg: "url('/src/assets/Background.png')",
      },
    },
  },
  plugins: [],
};
