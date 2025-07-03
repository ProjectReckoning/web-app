import tinycolor from 'tinycolor2';

type ShadeLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

function mixColor(baseHex: string, mixWith: string, amount: number): string {
  return tinycolor.mix(baseHex, mixWith, amount * 100).toHexString();
}

export default function generateShades(baseHex: string): Record<ShadeLevel, string> {
  const shadeMap: Record<ShadeLevel, string> = {
    50: mixColor(baseHex, '#ffffff', 0.9),
    100: mixColor(baseHex, '#ffffff', 0.8),
    200: mixColor(baseHex, '#ffffff', 0.6),
    300: mixColor(baseHex, '#ffffff', 0.3),
    400: mixColor(baseHex, '#ffffff', 0.2),
    500: baseHex,
    600: mixColor(baseHex, '#000000', 0.2),
    700: mixColor(baseHex, '#000000', 0.4),
    800: mixColor(baseHex, '#000000', 0.6),
    900: mixColor(baseHex, '#000000', 0.8),
  };

  return shadeMap;
}
