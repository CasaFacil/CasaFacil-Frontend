/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7f6',
          100: '#dcebe8',
          200: '#b8d6d0',
          300: '#8fbdb3',
          400: '#5f9c8f',
          500: '#3f7d70',
          600: '#2f6459',
          700: '#264f47',
          800: '#1f3f39',
          900: '#0f2320',
          950: '#081513',
        },
        sand: {
          50: '#fbf9f5',
          100: '#f4efe4',
          200: '#e7dcc4',
          300: '#d7c39a',
          400: '#c7a76e',
          500: '#b8904f',
          600: '#9c7440',
          700: '#7d5b35',
          800: '#634830',
          900: '#503b2a',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 30px -12px rgba(15, 35, 32, 0.25)',
      },
    },
  },
  plugins: [],
}
