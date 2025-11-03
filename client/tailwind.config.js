/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // your previous custom colors
        navy: {
          900: "#0a0f2c",
          800: "#10194e",
        },
        // new theme colors
        primary: "#16a34a", // nice green tone
        accent: "#f59e0b", // warm orange
      },
      fontFamily: {
        custom: ["Saira", "sans-serif"],
        // Example: custom: ['Roboto', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
};
