module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#355FE5",
        secondary: "#111827",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
