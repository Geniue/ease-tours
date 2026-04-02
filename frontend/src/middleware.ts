import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Fix redirect URLs for Cloudflare Flexible SSL:
  // Cloudflare terminates HTTPS and forwards HTTP to origin,
  // so middleware generates http:// redirects. Correct them to https://.
  const location = response.headers.get("location");
  if (location?.startsWith("http://")) {
    const proto = request.headers.get("x-forwarded-proto");
    if (proto === "https") {
      response.headers.set(
        "location",
        location.replace("http://", "https://")
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
