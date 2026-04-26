// Extract a Q/A pair list from a blog body when the editor has marked the section
// with a heading like "## FAQ" / "## الأسئلة الشائعة" followed by alternating
// h3 questions + paragraph answers.
//
// Returns an empty array when no FAQ section is detected — callers should skip
// FAQPage JSON-LD emission in that case.

const FAQ_HEADINGS = [
  "faq", "faqs",
  "الأسئلة الشائعة", "أسئلة شائعة", "الاسئلة الشائعة", "أسئلة وأجوبة",
  "frequently asked questions",
];

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function isFaqHeading(text: string): boolean {
  const norm = text.trim().toLowerCase();
  return FAQ_HEADINGS.some((h) => norm.includes(h));
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function extractFaqs(html: string): FaqItem[] {
  if (!html) return [];

  // Find all h2 boundaries
  const h2Regex = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  const matches: { index: number; text: string; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = h2Regex.exec(html))) {
    matches.push({ index: m.index, text: stripTags(m[1]), end: m.index + m[0].length });
  }

  // Find the FAQ h2
  const faqIdx = matches.findIndex((mm) => isFaqHeading(mm.text));
  if (faqIdx === -1) return [];

  const startBody = matches[faqIdx].end;
  const endBody = matches[faqIdx + 1]?.index ?? html.length;
  const section = html.slice(startBody, endBody);

  // Extract h3 + following content up to next h3
  const h3Regex = /<h3\b[^>]*>([\s\S]*?)<\/h3>/gi;
  const h3Matches: { index: number; text: string; end: number }[] = [];
  let h: RegExpExecArray | null;
  while ((h = h3Regex.exec(section))) {
    h3Matches.push({ index: h.index, text: stripTags(h[1]), end: h.index + h[0].length });
  }

  if (h3Matches.length === 0) return [];

  const items: FaqItem[] = [];
  for (let i = 0; i < h3Matches.length; i++) {
    const q = h3Matches[i].text;
    const ansStart = h3Matches[i].end;
    const ansEnd = h3Matches[i + 1]?.index ?? section.length;
    const answer = stripTags(section.slice(ansStart, ansEnd));
    if (q && answer) items.push({ question: q, answer });
  }
  return items;
}
