/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        bandwagon: {
          primary: '#59c991',
          'primary-content': '#fff',
          secondary: '#59c9c2',
          accent: '#2d2d2d',
          neutral: '#888888',
          error: '#eb0553',
          'base-100': '#fff',
          'base-200': '#e5e5e5',
          'base-300': '#d0d0d2',
          success: '#ebfff5',
        },
      },
      'lemonade',
    ],
  },
};
