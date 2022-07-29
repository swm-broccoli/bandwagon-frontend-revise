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
          secondary: '#59c9c2',
          accent: '#2d2d2d',
          neutral: '#888888',
          error: '#eb0553',
        },
      },
      'lemonade',
    ],
  },
};
