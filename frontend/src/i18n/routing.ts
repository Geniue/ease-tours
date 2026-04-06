import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  // Disable auto-generated Link header with hreflang from middleware.
  // Behind Cloudflare Flexible SSL, the middleware sees http:// requests,
  // causing incorrect http:// URLs in the Link header.
  // Hreflang is provided via HTML <link> tags from each page's generateMetadata instead.
  alternateLinks: false,
});
