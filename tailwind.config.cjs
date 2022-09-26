/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-25%)' },
          '50%': { transform: 'translateX(-50%)' },
          '75%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(-0%)' },
        },
      },
      animation: {
        'wave-animation': 'wave 5s -2.5s linear infinite',
        'wave-animation-2': 'wave 5s linear reverse infinite',
        'wave-animation-3': 'wave 5s -1s linear infinite',
      },
      fontFamily: {
        'sans-kr': ['Noto Sans KR', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
  daisyui: {
    themes: [
      {
        bandwagon: {
          primary: '#59c991',
          'primary-content': '#fff',
          secondary: '#59c9c2',
          'secondary-content': '#fff',
          accent: '#2d2d2d',
          neutral: '#888888',
          error: '#eb0553',
          'error-content': '#fff',
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
