export default function formatDate(
  date: Date,
  {
    locale = "id-ID",
    weekday = "long",
    year = "numeric",
    month = "long",
    day = "numeric",
  }: {
    locale?: string;
    weekday?: "long" | "short" | "narrow";
    year?: "numeric" | "2-digit";
    month?: "long" | "short" | "narrow" | "numeric" | "2-digit";
    day?: "numeric" | "2-digit";
  } = {}
): string {
  return date.toLocaleDateString(locale, {
    weekday,
    year,
    month,
    day,
  });
}
