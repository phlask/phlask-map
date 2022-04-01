import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    style: {
      primary: {
        dark: "#092F8E",
        main: "#1C3F97",
        light: "#3352A1"
      },
      secondary: {
        dark: "#F15447",
        main: "#BAEAFF",
        light: "#F15447"
      },
      highlight: {
        dark: "#EFC715",
        main: "#F4D85B",
        light: "#FFE46A"
      }
    },
    resources: {
      water: {
        dark: "#456DBB",
        main: "#5286E9",
        light: "#6A9CFF"
      },
      food: {
        dark: "#F2853A",
        main: "#FF9A55",
        light: "#FFAE76"
      },
      foraging: {
        dark: "#489582",
        main: "#5DA694",
        light: "#74B8A7"
      },
      bathrooms: {
        dark: "#8F8F8F",
        main: "#9E9E9E",
        light: "#BFBFBF"
      }
    },
    highlight: {
      dark: "#EFC715",
      main: "#F4D85B",
      light: "#FFE46A"
    },
    global: {
      lightUI: {
        white1: "#FFFFFF",
        white2: "#F7F8FA",
        white3: "#E9EEF4"
      },
      mediumUI: {
        grey1: "#CBD5E2",
        grey2: "#B7C4D4",
        grey3: "#9DAEC8"
      },
      darkUI: {
        darkGrey1: "73839E",
        darkGrey2: "#60718C",
        darkGrey3: "#2D3748"
      },
      error: "#73839E",
      success: "#60718C",
      links: "#0000EE"
    }
  },
  typography: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 500,
      fontSize: "1.728rem"
    },
    h2: {
      fontWeight: 500,
      fontSize: "1.44rem"
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1.2rem"
    },
    body1: {
      fontWeight: 500,
      fontSize: "1rem"
    },
    body2: {
      fontWeight: 600,
      fontSize: ".694rem"
    },
    button1: {
      fontWeight: 600,
      fontSize: ".579rem"
    },
    button2: {
      fontWeight: 600,
      fontSize: "1.2rem"
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
