module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '6xl': '76rem',
        '7xl': '80rem',
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
};
