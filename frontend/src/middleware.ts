import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Redirect www to non-www (301 permanent)
  const host = request.headers.get("host") || "";
  if (host.startsWith("www.")) {
    const proto = request.headers.get("x-forwarded-proto") || "https";
    const nonWww = host.replace("www.", "");
    const url = `${proto}://${nonWww}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(url, 301);
  }

  const isBehindHttps = request.headers.get("x-forwarded-proto") === "https";

  // Force HTTPS protocol in request URL so Next.js resolves metadata URLs with https://
  // (Cloudflare Flexible SSL terminates HTTPS at edge, origin receives http://)
  if (isBehindHttps && request.nextUrl.protocol === "http:") {
    request.nextUrl.protocol = "https:";
  }

  const response = intlMiddleware(request);

  if (isBehindHttps) {
    // Fix redirect Location headers for Cloudflare Flexible SSL
    const location = response.headers.get("location");
    if (location?.startsWith("http://")) {
      response.headers.set("location", location.replace("http://", "https://"));
    }

    // Fix Link headers: Next.js auto-generates hreflang Link headers
    // using the request protocol (http:// behind Cloudflare). Rewrite to https.
    const linkHeader = response.headers.get("link");
    if (linkHeader?.includes("http://")) {
      response.headers.set("link", linkHeader.replaceAll("http://", "https://"));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
