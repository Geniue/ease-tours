const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
const SITE_SUFFIXES = ["Ease Travel", "Ease Travel Tourism"];

const HTML_ENTITY_MAP: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: "\"",
  apos: "'",
  nbsp: " ",
  ndash: "-",
  mdash: "-",
  hellip: "...",
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(#\d+|#[xX][0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]+);/g, (match, entity) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      return String.fromCodePoint(parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(parseInt(entity.slice(1), 10));
    }
    return HTML_ENTITY_MAP[entity] ?? match;
  });
}

export function cleanText(value: string | null | undefined): string {
  if (!value) return "";

  return decodeHtmlEntities(value)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[\u200e\u200f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateByChars(value: string, maxLength = DESCRIPTION_MAX): string {
  const text = cleanText(value);
  if (text.length <= maxLength) return text;

  const sliced = text.slice(0, Math.max(0, maxLength - 1)).trim();
  const lastSpace = sliced.lastIndexOf(" ");
  const candidate = lastSpace > maxLength * 0.6 ? sliced.slice(0, lastSpace) : sliced;

  return `${candidate.replace(/[.,;:!?-]+$/g, "")}...`;
}

export function buildSeoTitle(
  value: string | null | undefined,
  maxLength = TITLE_MAX
): string {
  let title = cleanText(value);

  SITE_SUFFIXES.forEach((suffix) => {
    const suffixPattern = new RegExp(`\\s*(?:\\||-|\\u2014|\\u2013)\\s*${escapeRegExp(suffix)}\\s*$`, "i");
    while (suffixPattern.test(title)) {
      title = title.replace(suffixPattern, "").trim();
    }
  });

  return truncateByChars(title, maxLength);
}

export function buildMetaDescription(
  candidates: Array<string | null | undefined>,
  maxLength = DESCRIPTION_MAX
): string {
  const description = candidates.map(cleanText).find(Boolean) ?? "";
  return truncateByChars(description, maxLength);
}
