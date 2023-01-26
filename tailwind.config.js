/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      stone: colors.stone,
      slate: colors.slate,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      rose: colors.rose,
      violet: colors.violet,
      purple: colors.purple
    },
    extend: {
      borderRadius: {
        '3px': '3px',
        '5px': '5px',
        '8px': '8px',
        '10px': '10px',
        '12px': '12px',
        '15px': '15px',
        '32px': '32px',
      },
      lineHeight: {
        'none': '1',
        'tight': '0.8',
        'snug': '1.2',
        'normal': '1.2',
        'relaxed': '1.2',
        'loose': '1.2',
        '3': '1.2',
        '4': '1.2',
        '5': '1.2',
        '6': '1.2',
        '7': '1.2',
        '8': '1.2',
        '9': '1.2',
        '10': '1.2',
      }
    },
    screens: {
      '2xl': { 'max' :'1536px'},

      'xl': { 'max' :'1280px'},

      'lg': { 'max' :'1024px'},

      'md': { 'max' :'767px'},

      'sm': { 'max' : '640px'},
      'xs': { 'max' : '320px'},
    },
  },
  plugins: [],
}