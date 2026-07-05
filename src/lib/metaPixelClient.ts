// Client-side helpers shared between lead forms and the PageView tracker so
// browser Pixel events and server-side Conversions API events can be
// deduplicated by Meta (same event_id) and matched via the same fbp/fbc cookies.

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function getFacebookCookies(): { fbp?: string; fbc?: string } {
  return { fbp: getCookie("_fbp"), fbc: getCookie("_fbc") };
}

export function generateEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
