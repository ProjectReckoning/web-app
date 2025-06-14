"use client";

export default function formatCurrency(
  value: number,
  locale = "id-ID",
  currency = "IDR"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}