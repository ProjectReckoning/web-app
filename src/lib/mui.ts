import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tosca: Palette['primary'];
    limeGreen: Palette['primary'];
    gray: Palette['primary'];
    purple: Palette['primary'];
  }
  interface PaletteOptions {
    tosca?: PaletteColorOptions;
    limeGreen?: PaletteColorOptions;
    gray?: PaletteColorOptions;
    purple?: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tosca: true;
    limeGreen: true;
    gray: true;
  }
}