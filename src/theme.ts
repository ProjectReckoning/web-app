'use client';
import { createTheme } from '@mui/material/styles';
import { Poppins } from 'next/font/google';
import { gray, limeGreen, orange, purple, red } from './lib/custom-color';

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
    green: {
      main: '#02C694',
      light: '#02C694',
      dark: '#02C694',
      contrastText: '#000',
    },
    gray: {
      main: gray[500],
      light: gray[50],
      dark: gray[700],
      contrastText: '#000',
    },
    border: {
      main: gray[200],
      light: gray[200],
      dark: gray[200],
      contrastText: '#000',
    },
    purple: {
      main: purple[500],
      light: purple[50],
      dark: '#a471e1',
      contrastText: '#000',
    },
    orange: {
      main: orange[500],
      light: orange[50],
      dark: '#FF7F00',
      contrastText: '#000',
    },
    red: {
      main: red[500],
      light: red[50],
      dark: red[700],
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: limeGreen[500],
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: 16,
        },
      },
    },
    MuiIcon: {
      defaultProps: {
        baseClassName: 'material-symbols-rounded',
      },
    },
  },
});

export default theme;
