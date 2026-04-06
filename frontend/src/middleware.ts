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

  const response = intlMiddleware(request);

  // Fix redirect Location headers for Cloudflare Flexible SSL
  if (request.headers.get("x-forwarded-proto") === "https") {
    const location = response.headers.get("location");
    if (location?.startsWith("http://")) {
      response.headers.set("location", location.replace("http://", "https://"));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
