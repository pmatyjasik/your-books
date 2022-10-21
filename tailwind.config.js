module.exports = {
  mode: "jit",
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#355FE5",
        secondary: "#111827",
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
