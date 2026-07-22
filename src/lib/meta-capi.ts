import crypto from "crypto";

// Server-only. Sends events to Meta's Conversions API, mirroring the browser
// Pixel (via GTM) so Meta can deduplicate on (event_id, event_name).
// Docs: https://developers.facebook.com/docs/marketing-api/conversions-api

const GRAPH_API_VERSION = "v21.0";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

// Meta requires normalized values hashed with SHA-256: trimmed, lowercased email.
export function hashEmail(email?: string): string | undefined {
  if (!email) return undefined;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return undefined;
  return sha256(normalized);
}

// Meta requires digits only (with country code), no leading zeros/symbols.
export function hashPhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  if (!digits) return undefined;
  return sha256(digits);
}

interface SendEventParams {
  eventName: string;
  eventId: string;
  eventSourceUrl: string;
  email?: string;
  phone?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  clientUserAgent?: string;
  customData?: Record<string, unknown>;
}

export interface SendEventOutcome {
  skipped: boolean;
  reason?: string;
  status?: number;
  responseBody?: string;
}

export async function sendMetaCapiEvent(params: SendEventParams): Promise<SendEventOutcome> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;

  if (!accessToken || !pixelId) {
    const reason = "Missing META_CAPI_ACCESS_TOKEN or META_PIXEL_ID";
    if (process.env.META_CAPI_DEBUG === "true") {
      console.warn(`[Meta CAPI] ${reason} — skipping "${params.eventName}" event`);
    }
    return { skipped: true, reason };
  }

  const userData: Record<string, unknown> = {};
  const hashedEmail = hashEmail(params.email);
  const hashedPhone = hashPhone(params.phone);
  if (hashedEmail) userData.em = [hashedEmail];
  if (hashedPhone) userData.ph = [hashedPhone];
  if (params.fbp) userData.fbp = params.fbp;
  if (params.fbc) userData.fbc = params.fbc;
  if (params.clientIp) userData.client_ip_address = params.clientIp;
  if (params.clientUserAgent) userData.client_user_agent = params.clientUserAgent;

  const event: Record<string, unknown> = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: params.eventId,
    event_source_url: params.eventSourceUrl,
    action_source: "website",
    user_data: userData,
  };
  if (params.customData) event.custom_data = params.customData;

  const body: Record<string, unknown> = { data: [event] };
  // Leave META_CAPI_TEST_EVENT_CODE set only while verifying in Events Manager
  // → Test Events tab, then remove it once confirmed.
  if (process.env.META_CAPI_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const responseBody = await res.text();
    if (!res.ok) {
      console.error(`[Meta CAPI] "${params.eventName}" failed (${res.status}):`, responseBody);
    }
    return { skipped: false, status: res.status, responseBody };
  } catch (err) {
    console.error(`[Meta CAPI] "${params.eventName}" request error:`, err);
    return { skipped: false, reason: err instanceof Error ? err.message : "Unknown error" };
  }
}

export function getClientInfo(headers: Headers): { ip?: string; userAgent?: string } {
  const forwardedFor = headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || headers.get("x-real-ip") || undefined;
  const userAgent = headers.get("user-agent") || undefined;
  return { ip, userAgent };
}
