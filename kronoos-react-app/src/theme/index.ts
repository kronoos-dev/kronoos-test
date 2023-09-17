import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main:'#236E45'
        },
        error: {
            main: '#D63232'
        },
        background: {
            default: '#FFFF'
        },
        text: {
            primary: '#1e1e1e'
        },
    },
    typography: {
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    }

});