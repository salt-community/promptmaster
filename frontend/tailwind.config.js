/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ["Merriweather"],
      },
      colors: {
        custom: {
          primary: "#ebebeb",
          secondary: "#ff7961",
          tertiary: "#0f2d45",
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

