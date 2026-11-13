/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        janseva: {
          navy: {
            50: '#F0F4F8',
            100: '#D9E2EC',
            200: '#BCCCDC',
            300: '#9FB3C8',
            400: '#829AB1',
            500: '#627D98',
            600: '#486581',
            700: '#334E68',
            800: '#102A43',
            900: '#0B1D3A',
            950: '#071224',
          },
          saffron: {
            DEFAULT: '#FF671F',
            light: '#FFA05C',
            dark: '#E05309',
            50: '#FFF7ED',
            100: '#FFEDD5',
            500: '#FF671F',
            600: '#EA580C',
          },
          green: {
            DEFAULT: '#046A38',
            light: '#0E9F6E',
            dark: '#03542C',
            50: '#F0FDF4',
            100: '#DCFCE7',
            500: '#16A34A',
            600: '#046A38',
            700: '#03542C',
          },
          gold: '#FFD700',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', '"Tunga"', '"Kedage"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(11, 29, 58, 0.08), 0 1px 4px -1px rgba(11, 29, 58, 0.04)',
        'card-hover': '0 12px 24px -6px rgba(11, 29, 58, 0.12), 0 4px 8px -2px rgba(11, 29, 58, 0.06)',
      }
    },
  },
  plugins: [],
}
