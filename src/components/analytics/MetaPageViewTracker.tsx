"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getFacebookCookies, generateEventId } from "@/lib/metaPixelClient";

// Fires on every route change: pushes a custom dataLayer event (with a shared
// event_id) that GTM's Meta Pixel PageView tag reads for its Event ID field,
// and calls our server-side Conversions API PageView route with the same id
// so Meta deduplicates browser + server PageView events.
export default function MetaPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const eventId = generateEventId();
    const url = `${window.location.origin}${pathname}`;
    const { fbp, fbc } = getFacebookCookies();

    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "meta_page_view", event_id: eventId, page_path: pathname });

    fetch("/api/capi/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, url, fbp, fbc }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
