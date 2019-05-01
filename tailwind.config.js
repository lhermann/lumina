const defaultConfig = require("tailwindcss/defaultConfig");

module.exports = {
  theme: {
    colors: {
      ...defaultConfig.theme.colors,
      brand: {
        100: "#c3f7e8",
        200: "#91d8c3",
        300: "#6dc1a5",
        400: "#30a079",
        500: "#18845e",
        600: "#04663d",
        700: "#00542e",
        800: "#003f20",
        900: "#002610",
        950: "#001407"
      }
    },
    screens: {
      // sm: "640px",
      md: "768px"
      // lg: "1024px",
      // xl: "1280px"
    },
    container: {
      center: false,
      padding: "1rem"
    }
  },
  variants: {},
  plugins: [],
  corePlugins: {}
};
