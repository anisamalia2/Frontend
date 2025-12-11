/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        edubiru: {
          DEFAULT: '#004276',
          900: '#002F55',
          500: '#005292',
          100: '#cfe6f2'
        }
      },
      letterSpacing: {
        'extra-wide': '0.08em',
      },
      lineHeight: {
        'extra-loose': '2.5',
      }
    },
  },
  plugins: [],
}