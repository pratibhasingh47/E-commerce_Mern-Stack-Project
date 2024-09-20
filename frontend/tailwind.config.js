// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths if necessary
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'], // Define Lato font
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
