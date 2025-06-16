export default function formatCurrency(
  value: number,
  {
    locale = "id-ID",
    currency = "IDR",
    maximumFractionDigits = 2,
  } = {}
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: maximumFractionDigits,
  }).format(value);
}