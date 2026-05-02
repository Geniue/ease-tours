export const TRUSTINDEX_WIDGET_ID = "5512620703f0990246662c87bf4";
export const TRUSTINDEX_SCRIPT_SRC = `https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`;
export const TRUSTINDEX_CDN_ORIGIN = "https://cdn.trustindex.io";
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Ease%20Travel&query_place_id=ChIJC08FLolTAA0RyoOPrwi5FYA";

declare global {
  interface Window {
    renderTrustindexWidgets?: () => void;
  }
}

let trustindexScriptPromise: Promise<void> | null = null;

function addTrustindexPreconnect() {
  if (document.querySelector('link[data-trustindex-preconnect="true"]')) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = TRUSTINDEX_CDN_ORIGIN;
  link.crossOrigin = "anonymous";
  link.setAttribute("data-trustindex-preconnect", "true");
  document.head.appendChild(link);
}

function loadTrustindexScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.renderTrustindexWidgets) {
    return Promise.resolve();
  }

  if (trustindexScriptPromise) {
    return trustindexScriptPromise;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    'script[src*="cdn.trustindex.io/loader.js"]'
  );

  if (existingScript) {
    trustindexScriptPromise = new Promise<void>((resolve, reject) => {
      const handleLoad = () => {
        if (window.renderTrustindexWidgets) {
          resolve();
        } else {
          reject(new Error("Trustindex loaded without a render function."));
        }
      };

      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Trustindex script failed to load.")),
        { once: true }
      );
    }).catch((error) => {
      trustindexScriptPromise = null;
      throw error;
    });

    return trustindexScriptPromise;
  }

  trustindexScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TRUSTINDEX_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-skip-init", "true");
    script.setAttribute("data-trustindex-loader", "ease-travel");

    script.addEventListener(
      "load",
      () => {
        script.remove();

        if (window.renderTrustindexWidgets) {
          resolve();
        } else {
          reject(new Error("Trustindex loaded without a render function."));
        }
      },
      { once: true }
    );

    script.addEventListener(
      "error",
      () => {
        script.remove();
        reject(new Error("Trustindex script failed to load."));
      },
      { once: true }
    );

    document.body.appendChild(script);
  }).catch((error) => {
    trustindexScriptPromise = null;
    throw error;
  });

  return trustindexScriptPromise;
}

function clearElement(element: HTMLElement) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createLoadingFallback(label: string) {
  const fallback = document.createElement("div");
  fallback.className =
    "flex items-center justify-center px-6 text-center text-sm font-medium text-gray-500";
  fallback.style.minHeight = "inherit";
  fallback.textContent = label;

  return fallback;
}

function markReadyWhenWidgetRenders(container: HTMLElement) {
  const markReady = () => {
    if (container.querySelector(".ti-widget")) {
      container.setAttribute("aria-busy", "false");
      return true;
    }

    return false;
  };

  if (markReady()) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (markReady()) {
      observer.disconnect();
    }
  });

  observer.observe(container, { childList: true, subtree: true });
}

function nudgeTrustindexQueues() {
  [0, 500, 1500, 3000].forEach((delay) => {
    window.setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("mousemove"));
    }, delay);
  });
}

function renderTrustindexWidget(container: HTMLElement, loadingLabel: string) {
  clearElement(container);

  const widgetMount = document.createElement("div");
  widgetMount.setAttribute("data-src", TRUSTINDEX_SCRIPT_SRC);
  widgetMount.className = "min-h-[inherit]";
  widgetMount.appendChild(createLoadingFallback(loadingLabel));

  container.appendChild(widgetMount);
  markReadyWhenWidgetRenders(container);
  window.renderTrustindexWidgets?.();
  nudgeTrustindexQueues();
}

export async function mountTrustindexWidget(
  container: HTMLElement,
  loadingLabel: string
) {
  if (container.dataset.trustindexWidgetMounted === "true") {
    return;
  }

  container.dataset.trustindexWidgetMounted = "true";
  container.setAttribute("aria-busy", "true");

  addTrustindexPreconnect();
  await loadTrustindexScript();

  if (!container.isConnected) {
    return;
  }

  renderTrustindexWidget(container, loadingLabel);
}
