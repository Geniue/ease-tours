export function processBodyImages(html: string): string {
  return html.replace(/<img\b([^>]*)>/gi, (_, attrs: string) => {
    let a = attrs;
    if (!/\balt\s*=/i.test(a))      a += ' alt=""';
    if (!/\bloading\s*=/i.test(a))  a += ' loading="lazy"';
    if (!/\bdecoding\s*=/i.test(a)) a += ' decoding="async"';
    return `<img${a}>`;
  });
}

export function countWords(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}
