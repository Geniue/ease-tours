"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  GOOGLE_REVIEWS_URL,
  mountTrustindexWidget,
} from "@/lib/trustindex";

type WindowWithIdleCallback = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

function runWhenIdle(callback: () => void) {
  const idleWindow = window as WindowWithIdleCallback;

  if (idleWindow.requestIdleCallback) {
    const idleId = idleWindow.requestIdleCallback(callback, { timeout: 1500 });
    return () => idleWindow.cancelIdleCallback?.(idleId);
  }

  const timeoutId = window.setTimeout(callback, 1);
  return () => window.clearTimeout(timeoutId);
}

export default function GoogleReviewsSection() {
  const t = useTranslations("reviews");
  const sectionRef = useRef<HTMLElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const widget = widgetRef.current;

    if (!section || !widget) {
      return;
    }

    let isActive = true;
    let cancelIdle: (() => void) | undefined;

    const loadWidget = () => {
      cancelIdle = runWhenIdle(() => {
        mountTrustindexWidget(widget, t("loading")).catch(() => {
          if (isActive) {
            setHasError(true);
          }
        });
      });
    };

    const IntersectionObserverConstructor = window.IntersectionObserver;

    if (typeof IntersectionObserverConstructor === "function") {
      const observer = new IntersectionObserverConstructor(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            loadWidget();
          }
        },
        { rootMargin: "300px 0px" }
      );

      observer.observe(section);

      return () => {
        isActive = false;
        cancelIdle?.();
        observer.disconnect();
      };
    }

    if (document.readyState === "complete") {
      loadWidget();
    } else {
      window.addEventListener("load", loadWidget, { once: true });
    }

    return () => {
      isActive = false;
      cancelIdle?.();
      window.removeEventListener("load", loadWidget);
    };
  }, [t]);

  return (
    <section
      id="google-reviews"
      ref={sectionRef}
      aria-labelledby="google-reviews-title"
      className="py-20 bg-white"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="google-reviews-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-gray-500 mb-12">{t("intro")}</p>
        </div>

        <div
          ref={widgetRef}
          className="mx-auto min-h-[540px] sm:min-h-[470px] lg:min-h-[390px] max-w-6xl overflow-hidden rounded-lg border border-gray-100 bg-gray-50 p-4 shadow-sm md:p-6"
          aria-live="polite"
          aria-busy="true"
        >
          {hasError ? (
            <div className="flex min-h-[inherit] flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="font-medium text-gray-700">{t("error")}</p>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#1a73a7] hover:underline"
              >
                {t("viewOnGoogle")}
              </a>
            </div>
          ) : (
            <div className="flex min-h-[inherit] items-center justify-center px-6 text-center text-sm font-medium text-gray-500">
              {t("loading")}
            </div>
          )}
        </div>

        <noscript>
          <p className="mt-6 text-center text-sm text-gray-500">
            {t("noscript")}{" "}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#1a73a7] underline"
            >
              {t("viewOnGoogle")}
            </a>
          </p>
        </noscript>
      </div>
    </section>
  );
}
