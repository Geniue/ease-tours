#!/usr/bin/env node

const siteUrl = (process.argv[2] || process.env.SITE_URL || "https://ease-travel.online").replace(/\/$/, "");
const maxPages = Number(process.env.SEO_AUDIT_LIMIT || process.argv[3] || 250);

function textBetween(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function countMatches(html, pattern) {
  return html.match(pattern)?.length || 0;
}

async function getText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "EaseTravelSeoAudit/1.0",
      accept: "text/html,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  const text = await response.text();
  return { status: response.status, text, bytes: Buffer.byteLength(text) };
}

async function sitemapUrls() {
  const { text } = await getText(`${siteUrl}/sitemap.xml`);
  const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
  return urls.length ? urls.slice(0, maxPages) : [siteUrl];
}

function auditPage(url, status, html, bytes) {
  const title = textBetween(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = textBetween(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i
  );
  const h1Count = countMatches(html, /<h1(?:\s|>)/gi);
  const canonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(html);

  return {
    url,
    status,
    bytes,
    titleLength: title.length,
    descriptionLength: description.length,
    h1Count,
    canonical,
    issues: [
      status >= 400 ? `status ${status}` : null,
      title.length === 0 ? "missing title" : null,
      title.length > 60 ? `long title ${title.length}` : null,
      description.length === 0 ? "missing description" : null,
      description.length > 160 ? `long description ${description.length}` : null,
      description.length > 0 && description.length < 80 ? `short description ${description.length}` : null,
      h1Count !== 1 ? `h1 count ${h1Count}` : null,
      !canonical ? "missing canonical" : null,
      bytes > 300000 ? `large page ${Math.round(bytes / 1024)}KB` : null,
    ].filter(Boolean),
  };
}

const urls = await sitemapUrls();
const results = [];

for (const url of urls) {
  try {
    const { status, text, bytes } = await getText(url);
    results.push(auditPage(url, status, text, bytes));
  } catch (error) {
    results.push({
      url,
      status: 0,
      bytes: 0,
      titleLength: 0,
      descriptionLength: 0,
      h1Count: 0,
      canonical: false,
      issues: [`fetch failed: ${error instanceof Error ? error.message : String(error)}`],
    });
  }
}

const issuePages = results.filter((result) => result.issues.length > 0);
const summary = {
  siteUrl,
  crawled: results.length,
  issuePages: issuePages.length,
  badStatus: results.filter((result) => result.status >= 400 || result.status === 0).length,
  longTitles: results.filter((result) => result.titleLength > 60).length,
  longDescriptions: results.filter((result) => result.descriptionLength > 160).length,
  h1Issues: results.filter((result) => result.h1Count !== 1).length,
  missingCanonicals: results.filter((result) => !result.canonical).length,
  largePages: results.filter((result) => result.bytes > 300000).length,
};

console.log(JSON.stringify(summary, null, 2));

if (issuePages.length > 0) {
  console.log("\nTop issues:");
  issuePages.slice(0, 30).forEach((result) => {
    console.log(`- ${result.url}`);
    console.log(`  ${result.issues.join(", ")}`);
  });
}
