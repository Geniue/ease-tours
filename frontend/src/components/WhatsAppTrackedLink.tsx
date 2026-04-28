"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useLocale } from "next-intl";
import { trackLeadEvent } from "@/lib/tracking";

interface WhatsAppTrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  ctaLocation: string;
  sourceType?: string;
  sourceId?: number | null;
}

export default function WhatsAppTrackedLink({
  children,
  ctaLocation,
  sourceType,
  sourceId,
  onClick,
  href = "https://wa.me/201105001389",
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: WhatsAppTrackedLinkProps) {
  const locale = useLocale();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackLeadEvent({
      event_type: "whatsapp_click",
      locale,
      cta_location: ctaLocation,
      source_type: sourceType,
      source_id: sourceId,
    });
    onClick?.(event);
  }

  return (
    <a href={href} target={target} rel={rel} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
