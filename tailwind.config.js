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
        fustat: ["Fustat", "sans-serif"],
      },
      colors: {
        secondary: "#101828",
        primary: "#4970FC",
        prim: {
          50: "#E1E7FF",
        },
        success: "#58BE80",
        silver: "#A2A2A1",
        light: "#f9f9f9",
        dark: "#1b1b1b",
        gray: "#667085",
        fint: "#F5F5F5",
        lit: "#EEF2F9",
        // neutral: {
        //   100: "#f9f9f9",
        //   200: "#f3f4f6",
        //   300: "#e5e7eb",
        //   400: "#d1d5db",
        //   500: "#9ca3af",
        //   600: "#57585A",
        //   700: "#414244",
        //   800: "#374151",
        //   900: "#161617",
        // },
      },
      backgroundImage: {
        pattern: "url('/src/assets/auth-bg.png')",
        homeBg: "url('/src/assets/Background.png')",
        authBg: "url('/src/assets/authBg.png')",
      },
    },
  },
  plugins: [],
};
