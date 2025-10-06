/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a0f2c",
          800: "#10194e",
        },
      },
      fontFamily: {
        custom: ["Saira", "sans-serif"],
        // If using Google Font, replace 'CustomFont' with 'Roboto'
        // custom: ['Roboto', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
};
