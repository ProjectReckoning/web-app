export function getNonWhiteShades(colorShades: Record<number, string>, fallback = "#f0f0f0") {
  const color = Object.values(colorShades).find((value) => value.toLowerCase() !== "#ffffff");
  return color ?? fallback;
}