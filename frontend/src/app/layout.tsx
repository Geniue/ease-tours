import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        {children}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="zYKVFyEjUTFYgD8B6w/WVg"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
