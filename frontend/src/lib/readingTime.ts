// Reading-time estimate. Arabic averages ~180 wpm vs ~225 wpm for English (slower glyph density).
const WPM = { ar: 180, en: 225 } as const;

export function countWordsInHtml(html: string, locale: "ar" | "en"): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return 0;
  if (locale === "ar") {
    // Arabic: split on whitespace; each token is treated as a word
    return text.split(/\s+/).length;
  }
  return text.split(/\s+/).length;
}

export function readingTimeMinutes(html: string, locale: "ar" | "en"): number {
  const words = countWordsInHtml(html, locale);
  return Math.max(1, Math.round(words / WPM[locale]));
}

export function readingTimeLabel(html: string, locale: "ar" | "en"): string {
  const min = readingTimeMinutes(html, locale);
  if (locale === "ar") {
    return min === 1 ? "دقيقة قراءة" : min === 2 ? "دقيقتان قراءة" : `${min} دقائق قراءة`;
  }
  return min === 1 ? "1 min read" : `${min} min read`;
}
