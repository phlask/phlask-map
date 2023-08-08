import { createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.15)'
      },
      variants: [
        {
          props: { variant: 'water' },
          style: {
            textTransform: 'capitalize',
            background: '#5285e9',
            color: '#ffffff',
            margin: '0 auto',
            padding: '4px, 0px, 8px, 0px',
            fontSize: '1.25rem',
            '&:hover': {
              background: '#bacef6'
            },
            '&:active': {
              background: '#bacef6'
            },
            paddingTop: '15.12px'
          }
        },
        {
          props: { variant: 'food' },
          style: {
            textTransform: 'capitalize',
            background: '#ff9a55',
            color: '#ffffff',
            margin: '0 auto',
            fontSize: '1.25rem',
            '&:hover': {
              background: '#ffd7bb'
            },
            '&:active': {
              background: '#ffd7bb'
            },
            paddingTop: '15.12px'
          }
        },
        {
          props: { variant: 'foraging' },
          style: {
            textTransform: 'none',
            background: '#5da694',
            color: '#ffffff',
            margin: '0 auto',
            fontSize: '1.25rem',
            '&:hover': {
              background: '#bedbd4'
            },
            '&:active': {
              background: '#bedbd4'
            },
            paddingTop: '15.12px'
          }
        },
        {
          props: { variant: 'bathrooms' },
          style: {
            textTransform: 'none',
            background: '#7c7c7c',
            color: '#ffffff',
            margin: '0 auto',
            fontSize: '1.25rem',
            '&:hover': {
              background: '#cbcbcb'
            },
            '&:active': {
              background: '#cbcbcb'
            },
            paddingTop: '15.12px'
          }
        },
        {
          props: { variant: 'waterDesktop' },
          style: {
            position: 'absolute',
            height: '80px',
            width: '209px',
            left: '124.75px',
            top: '150px',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.15)',

            borderRadius: '8px',
            padding: '4px 0px 8px 0px',
            gap: '2px',
            alignItems: 'center',

            background: '#5285e9',
            color: '#ffffff',

            fontSize: '1.25rem',
            '&:hover': {
              background: '#bacef6'
            },
            '&:active': {
              background: '#bacef6'
            }
          }
        },
        {
          props: { variant: 'foodDesktop' },
          style: {
            position: 'absolute',
            height: '80px',
            width: '209px',
            left: '124.75px',
            top: '254px',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            padding: '4px 0px 7px 0px',
            gap: '2px',
            alignItems: 'center',

            background: '#ff9a55',
            color: '#ffffff',

            fontSize: '1.25rem',
            '&:hover': {
              background: '#ffd7bb'
            },
            '&:active': {
              background: '#ffd7bb'
            }
          }
        },
        {
          props: { variant: 'foragingDesktop' },
          style: {
            position: 'absolute',
            height: '80px',
            width: '209px',
            left: '374.25px',
            top: '150px',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            padding: '4px 0px 8px 0px',
            gap: '2px',
            alignItems: 'center',

            background: '#5da694',
            color: '#ffffff',

            fontSize: '1.25rem',
            '&:hover': {
              background: '#bedbd4'
            },
            '&:active': {
              background: '#bedbd4'
            }
          }
        },
        {
          props: { variant: 'bathroomsDesktop' },
          style: {
            position: 'absolute',
            height: '80px',
            width: '209px',
            left: '374.25px',
            top: '254px',
            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            padding: '4px 0px 8px 0px',
            gap: '2px',
            alignItems: 'center',

            background: '#7c7c7c',
            color: '#ffffff',
            fontSize: '1.25rem',
            '&:hover': {
              background: '#cbcbcb'
            },
            '&:active': {
              background: '#cbcbcb'
            }
          }
        }
      ]
    },
    MuiBox: {
      variants: [
        {
          props: { variant: 'desktop' },
          style: {
            borderRadius: '10px',
            position: 'absolute',
            top: '840px',
            left: '20px',
            boxShadow: 3,
            background: 'white'
          }
        }
      ]
    }
  },
  palette: {
    style: {
      primary: {
        dark: '#092F8E',
        main: '#1C3F97',
        light: '#3352A1'
      },
      secondary: {
        dark: '#F15447',
        main: '#BAEAFF',
        light: '#F15447'
      },
      highlight: {
        dark: '#EFC715',
        main: '#F4D85B',
        light: '#FFE46A'
      }
    },
    resources: {
      water: {
        dark: '#456DBB',
        main: '#5286E9',
        light: '#6A9CFF'
      },
      food: {
        dark: '#F2853A',
        main: '#FF9A55',
        light: '#FFAE76'
      },
      foraging: {
        dark: '#489582',
        main: '#5DA694',
        light: '#74B8A7'
      },
      bathrooms: {
        dark: '#8F8F8F',
        main: '#9E9E9E',
        light: '#BFBFBF'
      }
    },
    highlight: {
      dark: '#EFC715',
      main: '#F4D85B',
      light: '#FFE46A'
    },
    global: {
      lightUI: {
        white1: '#FFFFFF',
        white2: '#F7F8FA',
        white3: '#E9EEF4'
      },
      mediumUI: {
        grey1: '#CBD5E2',
        grey2: '#B7C4D4',
        grey3: '#9DAEC8'
      },
      darkUI: {
        darkGrey1: '73839E',
        darkGrey2: '#60718C',
        darkGrey3: '#2D3748'
      },
      error: '#73839E',
      success: '#60718C',
      links: '#0000EE'
    }
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 500,
      fontSize: '1.728rem'
    },
    h2: {
      fontWeight: 500,
      fontSize: '1.44rem'
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '1.2rem'
    },
    body1: {
      fontWeight: 500,
      fontSize: '1rem'
    },
    body2: {
      fontWeight: 600,
      fontSize: '.694rem'
    },
    button1: {
      fontWeight: 600,
      fontSize: '.579rem'
    },
    button2: {
      fontWeight: 600,
      fontSize: '1.2rem'
    }
  }
});

theme = responsiveFontSizes(theme);

export default theme;
