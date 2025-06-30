import tinycolor from 'tinycolor2';

type ShadeLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export default function generateShades(baseHex: string): Record<ShadeLevel, string> {
  const shadeMap: Record<ShadeLevel, string> = {
    50: tinycolor(baseHex).lighten(40).toHexString(),
    100: tinycolor(baseHex).lighten(30).toHexString(),
    200: tinycolor(baseHex).lighten(20).toHexString(),
    300: tinycolor(baseHex).lighten(10).toHexString(),
    400: tinycolor(baseHex).lighten(5).toHexString(),
    500: tinycolor(baseHex).toHexString(),
    600: tinycolor(baseHex).darken(5).toHexString(),
    700: tinycolor(baseHex).darken(10).toHexString(),
    800: tinycolor(baseHex).darken(20).toHexString(),
    900: tinycolor(baseHex).darken(30).toHexString(),
  };

  return shadeMap;
}
