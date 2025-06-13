'use client';
import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  colorSchemes: { light: true, dark: false },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  palette: {
    tosca: {
      main: '#00DDD8',
      light: '#00DDD8',
      dark: '#00DDD8',
      contrastText: '#000',
    },
    limeGreen: {
      main: '#d9f634',
      light: '#d9f634',
      dark: '#d9f634',
      contrastText: '#000',
    },
    gray: {
      main: '#C3C3C3',
      light: '#C3C3C3',
      dark: '#C3C3C3',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        hr: {
          height: 1,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderBottomRightRadius: 30,
          color: "black",
          padding: "10px 0"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: 'none',
          borderRadius: 999,
          padding: "8px 16px"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    },
  },
});

export default theme;
