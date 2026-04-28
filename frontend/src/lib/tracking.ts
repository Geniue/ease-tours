import { API_URL } from "@/lib/api";

export type LeadEventType =
  | "booking_success"
  | "contact_success"
  | "newsletter_success"
  | "whatsapp_click";

export interface LeadEventInput {
  event_type: LeadEventType;
  locale?: string;
  cta_location?: string;
  source_type?: string;
  source_id?: number | null;
  trip_id?: number | null;
  service_id?: number | null;
  blog_id?: number | null;
  booking_id?: number | null;
  contact_message_id?: number | null;
  subscriber_id?: number | null;
  metadata?: Record<string, unknown>;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONVERSION_SEND_TO: Partial<Record<LeadEventType, string | undefined>> = {
  booking_success: process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION,
  contact_success: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION,
  newsletter_success: process.env.NEXT_PUBLIC_GOOGLE_ADS_NEWSLETTER_CONVERSION,
  whatsapp_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION,
};

function currentLocale(): string | undefined {
  const match = window.location.pathname.match(/^\/(ar|en)(?:\/|$)/);
  return match?.[1];
}

function landingPage(): string {
  const key = "ease_landing_page";
  const current = window.location.href;
  try {
    const stored = window.sessionStorage.getItem(key);
    if (stored) return stored;
    window.sessionStorage.setItem(key, current);
  } catch {
    return current;
  }
  return current;
}

function utmParams(): Record<string, string> {
  const searchParams = new URLSearchParams(window.location.search);
  const fields = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  return fields.reduce<Record<string, string>>((acc, field) => {
    const value = searchParams.get(field);
    if (value) acc[field] = value;
    return acc;
  }, {});
}

function fireGoogleAdsEvent(event: LeadEventType, payload: Record<string, unknown>): void {
  if (typeof window.gtag !== "function") return;

  const sendTo = CONVERSION_SEND_TO[event];
  if (sendTo) {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      event_category: "lead",
      event_label: event,
      ...payload,
    });
  }

  window.gtag("event", event, {
    event_category: "lead",
    event_label: payload.cta_location,
    ...payload,
  });
}

export function trackLeadEvent(input: LeadEventInput): void {
  if (typeof window === "undefined") return;

  const payload = {
    ...utmParams(),
    ...input,
    locale: input.locale ?? currentLocale(),
    page_url: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || undefined,
    landing_page: landingPage(),
  };

  fireGoogleAdsEvent(input.event_type, payload);

  const url = `${API_URL}/lead-events`;
  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon(url, blob)) return;
  }

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
