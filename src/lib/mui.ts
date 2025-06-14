import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tosca: Palette['primary'];
    limeGreen: Palette['primary'];
    gray: Palette['primary'];
    purple: Palette['primary'];
    green: Palette['primary'];
    red: Palette['primary'];
    orange: Palette['primary'];
    border: Palette['primary'];
  }
  interface PaletteOptions {
    tosca?: PaletteColorOptions;
    limeGreen?: PaletteColorOptions;
    gray?: PaletteColorOptions;
    purple?: PaletteColorOptions;
    green?: PaletteColorOptions;
    red?: PaletteColorOptions;
    orange?: PaletteColorOptions;
    border?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tosca: true;
    limeGreen: true;
    gray: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    purple: true;
  }
}