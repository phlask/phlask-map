import { createTheme } from "@mui/material";

const theme = createTheme({
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
        dark: "#00A5EE",
        main: "#10B6FF",
        light: "#55C8FB"
      },
      food: {
        dark: "#933C70",
        main: "#B74B8C",
        light: "#D750A1"
      },
      foraging: {
        dark: "# 489582",
        main: "#5DA694",
        light: "#74B8A7"
      },
      bathrooms: {
        dark: "#F2853A",
        main: "#FF9A55",
        light: "#FFAE76"
      }
    },
    // Somewhat placeholder names
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
      success: "#60718C"
    }
  },
  shadows: {
    // shadows as seen in the design system figma
  },
  typography: {
    fontFamily: {
      // What is the official Phlask font?
    },
    h1: {
      fontFamily: ""
      // fontWeight: ,
      // fontSize: ,
      // lineHeight: ,
      // letterSpacing:
    }
  }
});

export default theme;
