import { createTheme } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: '#10B6FF',
            secondary: '#283049'
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
            fontFamily: "",
            // fontWeight: ,
            // fontSize: ,
            // lineHeight: ,
            // letterSpacing: 
        },
    }  
})

export default theme;