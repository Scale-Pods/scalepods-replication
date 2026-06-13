import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { GA4Provider }     from "@/lib/analytics/providers/ga4";
import { GSCProvider }     from "@/lib/analytics/providers/gsc";
import { ClarityProvider } from "@/lib/analytics/providers/clarity";

export const dynamic = "force-dynamic";

// Instantiated lazily so build-time evaluation doesn't require the key
let _client: OpenAI | null = null;
function getClient() {
  if (!_client) _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _client;
}

// ── System context (role + business objective) ────────────────────────────────

const SYSTEM_BASE = `You are an AI Analytics Assistant for ScalePods — a B2B SaaS company providing AI-powered sales automation and workflow solutions.

## Your Role
You behave like a combination of:
- Growth Analyst
- SEO Analyst
- CRO (Conversion Rate Optimization) Consultant
- Marketing Intelligence Analyst
- Website Performance Consultant

## Primary Business Objective
The ScalePods website exists to:
1. Attract qualified B2B traffic
2. Educate visitors about ScalePods services (AI SDR, workflow automation, sales pods)
3. Encourage visitors to explore service pages and case studies
4. Convert visitors into leads through contact forms and demo requests
5. Identify which traffic sources, campaigns, keywords, and content generate the highest quality leads

Every analysis you give must align with improving: traffic quality, user engagement, lead generation, conversion rate, SEO visibility, and marketing ROI.

## Insight Generation Rules
NEVER just report numbers. Always explain:
1. What happened
2. Why it happened (probable cause)
3. What business impact it has
4. What specific action ScalePods should take

Bad: "Sessions increased by 20%."
Good: "Sessions increased by 20%, driven primarily by organic search. The blog post on AI SDR workflows is attracting new visitors — consider adding a demo CTA at the bottom of that page to convert this traffic."

## Your Data Sources
You are given a live snapshot stitched together from FOUR systems. Know which to use:
1. Google Analytics 4 (GA4) — aggregate traffic, channels, trends, day/hour, per-page engagement.
2. Google Search Console (GSC) — search keywords, rankings/positions, impressions, CTR.
3. Microsoft Clarity — UX behaviour signals: scroll depth, engagement time, rage/dead clicks.
4. BigQuery User Sessions — INDIVIDUAL session-level & per-user data (the "User Sessions" explorer): each visitor's session quality score, device/geo/source, and their actual click-by-click journey (page-to-page navigation). Use this for "session quality", "what path do users take", "show me engaged vs bounce sessions", and individual-journey questions — GA4 only has aggregates, this has the per-session detail.

## What You Can Answer
- Traffic analysis: sources, trends, drops, spikes (GA4)
- SEO: keyword opportunities, ranking improvements, CTR optimization (GSC)
- Content: which pages engage, which lose users, what to create next (GA4 + Clarity)
- Funnel: where users drop off, form abandonment, conversion paths (BigQuery journeys + transitions)
- Session quality: engaged vs bounce breakdown, engagement-score distribution (BigQuery Sessions)
- User journeys: the most common page-to-page navigation paths real visitors take (BigQuery Sessions)
- Campaigns: which channels/sources drive quality traffic vs bounces (GA4 + session quality)
- Geography: which countries engage, which convert (all sources)
- UX signals: scroll depth, engagement time, bounce patterns (Clarity)
- Timing: best days and hours to publish or run campaigns (GA4)
- Recommendations: always prioritize actions that generate more leads

## Tone
Respond like a senior growth analyst briefing a founder. Be direct, specific, and actionable. Avoid vague statements. When data is limited, say so and explain what additional tracking would help.

## ScalePods Page Directory
Use this to map colloquial page names users mention to actual URL paths:
- "home", "homepage", "main page", "landing page" → /
- "gcc page", "global page", "gcc/global", "gcc global" → /gcc
- "UAE page", "dubai page" → /uae
- "contact page", "contact us" → /contact
- "about page", "about us" → /about
- "blog", "articles", "posts" → /blog or /resources
- "services page", "what we do" → /services or /solutions
- "pricing page" → /pricing
- "demo page", "book a demo", "request demo" → /demo or /contact
When a user refers to a page by a casual name, always translate it to the URL path and look it up in the data.

## Handling Time Range Questions
The snapshot covers the selected range (default 30 days). A dedicated "Last 7 days" page breakdown is always included regardless of selected range.
- If a user asks about "last week" or "last 7 days" → use the "Last 7 Days Page Views" section in the data
- If a user asks about "last month" or "last 30 days" → use the main per-page engagement table
- If a user asks for a custom date range (e.g., "April 1st to today") → explain you have the last 30 days only, then give the closest available data and suggest they check GA4 directly for historical ranges
- Never say "no data" if the page appears anywhere in the data tables — always give what you have and note the time range it covers`;

// ── Extra GA4 queries run only for AI context ─────────────────────────────────

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id:     process.env.GA4_CLIENT_ID!,
      client_secret: process.env.GA4_CLIENT_SECRET!,
      refresh_token: process.env.GA4_REFRESH_TOKEN!,
      grant_type:    "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${await res.text()}`);
  const j = await res.json();
  return j.access_token;
}

async function ga4Extra(rangeDays: number) {
  const end   = new Date();
  const start = new Date();
  start.setDate(start.getDate() - rangeDays);
  const dr = {
    startDate: start.toISOString().slice(0, 10),
    endDate:   end.toISOString().slice(0, 10),
  };

  let token: string;
  try { token = await getAccessToken(); }
  catch { return null; }

  const PROPERTY_ID = process.env.GA4_PROPERTY_ID!;
  const BASE = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}`;

  async function run(body: object) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8_000);
    try {
      const r = await fetch(`${BASE}:runReport`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      if (!r.ok) return null;
      return r.json();
    } catch { return null; }
    finally { clearTimeout(t); }
  }

  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Always fetch last 7 days page data regardless of main range
  const dr7 = {
    startDate: (() => { const d = new Date(); d.setDate(d.getDate() - 7); return d.toISOString().slice(0, 10); })(),
    endDate:   new Date().toISOString().slice(0, 10),
  };

  const [dayOfWeek, hourOfDay, pageEngagement, sourceMedium, pages7d] = await Promise.all([
    // Sessions by day of week (0=Sun … 6=Sat)
    run({
      dateRanges: [dr],
      dimensions: [{ name: "dayOfWeek" }],
      metrics:    [{ name: "sessions" }],
      orderBys:   [{ dimension: { dimensionName: "dayOfWeek" }, desc: false }],
      limit: 7,
    }),
    // Sessions by hour of day (0–23)
    run({
      dateRanges: [dr],
      dimensions: [{ name: "hour" }],
      metrics:    [{ name: "sessions" }],
      orderBys:   [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 24,
    }),
    // Per-page: sessions + bounce rate + avg session duration
    run({
      dateRanges: [dr],
      dimensions: [{ name: "pagePath" }],
      metrics: [
        { name: "sessions" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
        { name: "screenPageViews" },
      ],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 15,
    }),
    // Source / medium breakdown
    run({
      dateRanges: [dr],
      dimensions: [{ name: "sessionSourceMedium" }],
      metrics:    [{ name: "sessions" }, { name: "bounceRate" }],
      orderBys:   [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 15,
    }),

    // Last 7 days: page views + active users (always, regardless of main range)
    run({
      dateRanges: [{ startDate: dr7.startDate, endDate: dr7.endDate }],
      dimensions: [{ name: "pagePath" }],
      metrics:    [{ name: "screenPageViews" }, { name: "activeUsers" }],
      orderBys:   [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 20,
    }),
  ]);

  return { dayOfWeek, hourOfDay, pageEngagement, sourceMedium, pages7d, DAY_NAMES };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function num(n: number | undefined | null, suffix = "") {
  if (!n && n !== 0) return "N/A";
  return n.toLocaleString() + suffix;
}

function pct(raw: number) {
  // GA4 bounceRate is 0–1 ratio
  const v = raw > 1 ? raw : raw * 100;
  return Math.round(v) + "%";
}

function dur(secs: number) {
  if (!secs) return "N/A";
  return `${Math.floor(secs / 60)}m ${Math.round(secs % 60)}s`;
}

function pathOf(url: string | null | undefined): string {
  if (!url) return "/";
  try { return new URL(url).pathname || "/"; } catch { return url; }
}

// ── BigQuery User-Session explorer context (Supabase: ga4_sessions / ga4_events) ─
// This is the per-session, per-user data (the "User Sessions" page) — distinct
// from the aggregate GA4 overview. It lets the AI reason about session QUALITY,
// individual journeys, and engagement-score distribution.

async function buildSessionContext(rangeDays: number): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const startISO = new Date(Date.now() - rangeDays * 86400_000).toISOString();

  const [sessRes, evtRes] = await Promise.all([
    supabase
      .from("ga4_sessions")
      .select(
        "session_id, user_pseudo_id, session_start_time, event_count, engagement_time_msec, device_category, country, city, session_source, session_medium, first_page_location, clarity_scroll_depth"
      )
      .gte("session_start_time", startISO)
      .order("session_start_time", { ascending: false })
      .limit(2000),
    supabase
      .from("ga4_events")
      .select("session_id, event_name, page_location, event_timestamp")
      .gte("event_timestamp", startISO)
      .order("event_timestamp", { ascending: true })
      .limit(20000),
  ]);

  const sessions = sessRes.data ?? [];
  if (sessions.length === 0) return null;

  // Engagement score — same formula as the User Sessions page
  const scoreOf = (engMsec: number, events: number) =>
    Math.min(100, Math.round((engMsec / 60000) * 20 + (events / 50) * 20 + 10));

  const total = sessions.length;
  const uniqueUsers = new Set(sessions.map((s) => s.user_pseudo_id)).size;
  const avgEvents = Math.round(sessions.reduce((a, s) => a + (s.event_count ?? 0), 0) / total);
  const avgEngSec = Math.round(
    sessions.reduce((a, s) => a + (s.engagement_time_msec ?? 0) / 1000, 0) / total
  );

  // Quality buckets
  const buckets = { bounce: 0, low: 0, mid: 0, high: 0 };
  const scored = sessions.map((s) => {
    const sc = scoreOf(s.engagement_time_msec ?? 0, s.event_count ?? 0);
    if (sc < 15) buckets.bounce++;
    else if (sc < 40) buckets.low++;
    else if (sc < 70) buckets.mid++;
    else buckets.high++;
    return { ...s, _score: sc };
  });
  const zeroEng = sessions.filter((s) => (s.engagement_time_msec ?? 0) === 0).length;

  // Tally helper
  const tally = (arr: string[]) => {
    const m = new Map<string, number>();
    arr.forEach((k) => m.set(k, (m.get(k) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  };

  const topLanding = tally(sessions.map((s) => pathOf(s.first_page_location))).slice(0, 10);
  const topSrcMed = tally(
    sessions.map((s) => `${s.session_source ?? "direct"} / ${s.session_medium ?? "direct"}`)
  ).slice(0, 10);
  const topCountry = tally(sessions.map((s) => s.country ?? "unknown")).slice(0, 8);
  const devSplit = tally(sessions.map((s) => s.device_category ?? "unknown"));

  // Most engaged individual sessions
  const topSessions = [...scored].sort((a, b) => b._score - a._score).slice(0, 6);

  // Journey analysis from events: page→page transitions + sample journeys
  const events = evtRes.data ?? [];
  const bySession = new Map<string, { name: string; path: string; ts: string }[]>();
  for (const e of events) {
    if (!e.session_id) continue;
    const arr = bySession.get(e.session_id) ?? [];
    arr.push({ name: e.event_name, path: pathOf(e.page_location), ts: e.event_timestamp });
    bySession.set(e.session_id, arr);
  }

  const transitions = new Map<string, number>();
  for (const arr of bySession.values()) {
    // ordered, collapse consecutive duplicate paths
    const seq: string[] = [];
    for (const ev of arr) {
      if (seq[seq.length - 1] !== ev.path) seq.push(ev.path);
    }
    for (let i = 0; i < seq.length - 1; i++) {
      const k = `${seq[i]} → ${seq[i + 1]}`;
      transitions.set(k, (transitions.get(k) ?? 0) + 1);
    }
  }
  const topTransitions = [...transitions.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);

  // Build sample journeys for the most engaged sessions
  const sampleJourneys = topSessions.slice(0, 3).map((s) => {
    const arr = bySession.get(s.session_id) ?? [];
    const steps = arr
      .map((e) => `${e.name}${e.path !== "/" ? `(${e.path})` : ""}`)
      .slice(0, 15)
      .join(" → ");
    return { s, steps };
  });

  // ── Render ──────────────────────────────────────────────────────────────────
  const L: string[] = [];
  L.push("\n\n## BigQuery User Sessions (individual session-level data)\n");
  L.push(
    "This is per-session/per-user data (the 'User Sessions' explorer), sourced from the GA4 BigQuery export. Use it to judge session QUALITY and individual visitor behaviour — not just aggregate totals."
  );
  L.push(`\nSessions: ${num(total)} | Unique users: ${num(uniqueUsers)}`);
  L.push(`Avg events/session: ${avgEvents} | Avg engaged time/session: ${dur(avgEngSec)}`);
  L.push(
    `Zero-engagement (likely bounce) sessions: ${num(zeroEng)} (${Math.round((zeroEng / total) * 100)}%)`
  );

  L.push(`\nSession quality (engagement score 0–100):`);
  L.push(`  - Bounce (0–14): ${num(buckets.bounce)} sessions`);
  L.push(`  - Low (15–39): ${num(buckets.low)} sessions`);
  L.push(`  - Mid (40–69): ${num(buckets.mid)} sessions`);
  L.push(`  - High (70–100): ${num(buckets.high)} sessions`);

  L.push(`\nTop landing pages (by sessions):`);
  topLanding.forEach(([p, c]) => L.push(`  - ${p}: ${num(c)} sessions`));

  L.push(`\nSession source / medium:`);
  topSrcMed.forEach(([sm, c]) => L.push(`  - ${sm}: ${num(c)} sessions`));

  L.push(`\nSessions by country:`);
  topCountry.forEach(([c, n]) => L.push(`  - ${c}: ${num(n)} sessions`));

  L.push(`\nDevice split:`);
  devSplit.forEach(([d, n]) => L.push(`  - ${d}: ${num(n)} sessions`));

  if (topTransitions.length) {
    L.push(`\nMost common page-to-page navigation (from real journeys):`);
    topTransitions.forEach(([t, c]) => L.push(`  - ${t}: ${num(c)}×`));
  }

  L.push(`\nMost engaged individual sessions:`);
  topSessions.forEach((s) => {
    const loc = [s.city, s.country].filter((x) => x && x !== "unknown").join(", ") || "unknown";
    L.push(
      `  - score ${s._score} | ${s.device_category} | ${loc} | ${s.session_source}/${s.session_medium} | ${s.event_count} events | ${dur(
        Math.round((s.engagement_time_msec ?? 0) / 1000)
      )} engaged | landed ${pathOf(s.first_page_location)}`
    );
  });

  if (sampleJourneys.length) {
    L.push(`\nSample journeys (most engaged sessions, event sequence):`);
    sampleJourneys.forEach(({ s, steps }, i) => {
      L.push(`  ${i + 1}. [score ${s._score}, ${s.device_category}, ${s.country}] ${steps || "(no events captured)"}`);
    });
  }

  return L.join("\n");
}

// ── Data snapshot builder ─────────────────────────────────────────────────────

async function buildDataContext(rangeDays: number): Promise<string> {
  const [ga4, ga4Trend, gsc, gscTrend, clarity, extra, sessionCtx] = await Promise.allSettled([
    GA4Provider.getOverview(rangeDays),
    GA4Provider.getTrend(rangeDays),
    GSCProvider.getOverview(rangeDays),
    GSCProvider.getTrend(rangeDays),
    ClarityProvider.getOverview(rangeDays),
    ga4Extra(rangeDays),
    buildSessionContext(rangeDays),
  ]);

  const lines: string[] = [
    `\n\n═══════════════════════════════════════════`,
    `LIVE ANALYTICS DATA SNAPSHOT — Last ${rangeDays} days`,
    `═══════════════════════════════════════════\n`,
  ];

  // ── GA4 Overview ──────────────────────────────────────────────────────────
  lines.push("## Google Analytics 4\n");
  if (ga4.status === "fulfilled") {
    const d = ga4.value;
    lines.push(`Sessions: ${num(d.sessions)}`);
    lines.push(`Active Users: ${num(d.activeUsers)}`);
    lines.push(`New Users: ${num(d.newUsers)} (returning: ${num(d.sessions - d.newUsers)})`);
    lines.push(`New User Rate: ${d.sessions > 0 ? Math.round((d.newUsers / d.sessions) * 100) : 0}%`);
    lines.push(`Avg Session Duration: ${dur(d.avgSessionDuration)}`);
    lines.push(`Bounce Rate: ${d.bounceRate > 0 ? d.bounceRate + "%" : "N/A"}`);

    lines.push(`\nTop Channels (by sessions):`);
    (d.channels ?? []).slice(0, 8).forEach(c =>
      lines.push(`  - ${c.name}: ${num(c.value)} sessions (${c.percentage ?? 0}%)`));

    lines.push(`\nTop Traffic Sources:`);
    (d.sources ?? []).slice(0, 10).forEach(s =>
      lines.push(`  - ${s.name}: ${num(s.value)} sessions`));

    lines.push(`\nTop Countries:`);
    (d.countries ?? []).slice(0, 10).forEach(c =>
      lines.push(`  - ${c.name}: ${num(c.value)} sessions`));

    lines.push(`\nTop Pages (by views):`);
    (d.pages ?? []).slice(0, 15).forEach(p =>
      lines.push(`  - ${p.path}: ${num(p.views)} views`));

    lines.push(`\nDevice Breakdown:`);
    (d.devices ?? []).forEach(dv =>
      lines.push(`  - ${dv.name}: ${num(dv.value)} sessions (${dv.percentage ?? 0}%)`));

    lines.push(`\nOperating Systems:`);
    (d.os ?? []).slice(0, 6).forEach(o =>
      lines.push(`  - ${o.name}: ${num(o.value)} sessions`));

    lines.push(`\nTop Browsers:`);
    (d.browsers ?? []).slice(0, 6).forEach(b =>
      lines.push(`  - ${b.name}: ${num(b.value)} sessions`));
  } else {
    lines.push("GA4 data unavailable at this time.");
  }

  // ── GA4 Trend ─────────────────────────────────────────────────────────────
  if (ga4Trend.status === "fulfilled" && ga4Trend.value.data.length > 0) {
    const data = ga4Trend.value.data;
    const total    = data.reduce((s, d) => s + d.sessions, 0);
    const avgDaily = Math.round(total / data.length);
    const peak     = data.reduce((mx, d) => d.sessions > mx.sessions ? d : mx, data[0]);
    const low      = data.reduce((mn, d) => d.sessions < mn.sessions ? d : mn, data[0]);
    // Week-over-week if enough data
    let wowNote = "";
    if (data.length >= 14) {
      const half = Math.floor(data.length / 2);
      const recent = data.slice(-half).reduce((s, d) => s + d.sessions, 0);
      const prior  = data.slice(0, half).reduce((s, d) => s + d.sessions, 0);
      const diff   = prior > 0 ? Math.round(((recent - prior) / prior) * 100) : 0;
      wowNote = ` | Period-over-period: ${diff >= 0 ? "+" : ""}${diff}%`;
    }
    lines.push(`\nGA4 Daily Trend (${rangeDays}d): Avg ${avgDaily} sessions/day, peak ${num(peak.sessions)} on ${peak.date}, low ${num(low.sessions)} on ${low.date}${wowNote}`);
    // Last 7 days detail
    const last7 = data.slice(-7);
    if (last7.length > 0) {
      lines.push(`Last 7 days sessions: ${last7.map(d => `${d.date}: ${d.sessions}`).join(", ")}`);
    }
  }

  // ── GA4 Extra: Day/Hour/Page-Engagement/Source-Medium ────────────────────
  if (extra.status === "fulfilled" && extra.value) {
    const { dayOfWeek, hourOfDay, pageEngagement, sourceMedium, pages7d, DAY_NAMES } = extra.value;

    if (dayOfWeek?.rows?.length) {
      lines.push(`\nSessions by Day of Week:`);
      const sorted = [...dayOfWeek.rows].sort((a: any, b: any) =>
        parseInt(b.metricValues[0].value) - parseInt(a.metricValues[0].value));
      sorted.forEach((row: any) => {
        const dayIdx = parseInt(row.dimensionValues[0].value);
        const sess   = Math.round(parseFloat(row.metricValues[0].value));
        lines.push(`  - ${DAY_NAMES[dayIdx]}: ${num(sess)} sessions`);
      });
    }

    if (hourOfDay?.rows?.length) {
      lines.push(`\nTop Hours of Day (by sessions, 24h):`);
      hourOfDay.rows.slice(0, 8).forEach((row: any) => {
        const hour = parseInt(row.dimensionValues[0].value);
        const sess = Math.round(parseFloat(row.metricValues[0].value));
        const label = `${hour.toString().padStart(2, "0")}:00–${(hour + 1).toString().padStart(2, "0")}:00`;
        lines.push(`  - ${label}: ${num(sess)} sessions`);
      });
    }

    if (pageEngagement?.rows?.length) {
      lines.push(`\nPer-Page Engagement (sessions / bounce rate / avg duration):`);
      pageEngagement.rows
        .filter((row: any) => {
          const path = row.dimensionValues[0].value;
          return !path.startsWith("/admin") && path !== "(not set)";
        })
        .slice(0, 12)
        .forEach((row: any) => {
          const path    = row.dimensionValues[0].value;
          const sess    = Math.round(parseFloat(row.metricValues[0].value));
          const bounce  = parseFloat(row.metricValues[1].value);
          const avgDur  = parseFloat(row.metricValues[2].value);
          lines.push(`  - ${path}: ${num(sess)} sessions | bounce ${pct(bounce)} | avg ${dur(avgDur)}`);
        });
    }

    if (sourceMedium?.rows?.length) {
      lines.push(`\nSource / Medium Breakdown:`);
      sourceMedium.rows.slice(0, 12).forEach((row: any) => {
        const sm     = row.dimensionValues[0].value;
        const sess   = Math.round(parseFloat(row.metricValues[0].value));
        const bounce = parseFloat(row.metricValues[1].value);
        lines.push(`  - ${sm}: ${num(sess)} sessions | bounce ${pct(bounce)}`);
      });
    }

    if (pages7d?.rows?.length) {
      lines.push(`\nLast 7 Days — Page Views & Unique Visitors (use this for "last week" questions):`);
      pages7d.rows
        .filter((row: any) => {
          const path = row.dimensionValues[0].value;
          return !path.startsWith("/admin") && path !== "(not set)";
        })
        .slice(0, 20)
        .forEach((row: any) => {
          const path        = row.dimensionValues[0].value;
          const views       = Math.round(parseFloat(row.metricValues[0].value));
          const uniqueUsers = Math.round(parseFloat(row.metricValues[1].value));
          lines.push(`  - ${path}: ${num(views)} views | ${num(uniqueUsers)} unique visitors`);
        });
    }
  }

  // ── Google Search Console ─────────────────────────────────────────────────
  lines.push("\n\n## Google Search Console\n");
  if (gsc.status === "fulfilled") {
    const d = gsc.value;
    lines.push(`Total Clicks: ${num(d.clicks)}`);
    lines.push(`Total Impressions: ${num(d.impressions)}`);
    lines.push(`Average CTR: ${d.ctr > 0 ? d.ctr + "%" : "N/A"}`);
    lines.push(`Average Position: ${d.avgPosition > 0 ? d.avgPosition : "N/A"}`);

    // Split queries into position buckets for clear AI reasoning
    const allQ = d.topQueries ?? [];
    const top3      = allQ.filter(q => q.position <= 3);
    const page1rest = allQ.filter(q => q.position > 3  && q.position <= 10);
    const page2     = allQ.filter(q => q.position > 10 && q.position <= 20);
    const beyond    = allQ.filter(q => q.position > 20);

    const fmtQ = (q: typeof allQ[0]) =>
      `  - "${q.query}": ${num(q.clicks)} clicks | ${num(q.impressions)} impr | CTR ${q.ctr}% | pos ${q.position}`;

    if (top3.length) {
      lines.push(`\nKeywords — Top 3 positions (strong rankings):`);
      top3.forEach(q => lines.push(fmtQ(q)));
    }
    if (page1rest.length) {
      lines.push(`\nKeywords — Page 1 positions 4–10:`);
      page1rest.forEach(q => lines.push(fmtQ(q)));
    }
    if (page2.length) {
      lines.push(`\nKeywords — Page 2 positions 11–20 (quick-win opportunities to push to page 1):`);
      page2.forEach(q => lines.push(fmtQ(q)));
    }
    if (beyond.length) {
      lines.push(`\nKeywords — Position 21+ (longer-term targets):`);
      beyond.slice(0, 5).forEach(q => lines.push(fmtQ(q)));
    }

    lines.push(`\nTop Pages in Search (clicks / impressions / CTR / position):`);
    (d.topPages ?? []).slice(0, 15).forEach(p =>
      lines.push(`  - ${p.page}: ${num(p.clicks)} clicks | ${num(p.impressions)} impr | CTR ${p.ctr}% | pos ${p.position}`));

    lines.push(`\nTop Countries by Clicks:`);
    (d.countries ?? []).slice(0, 8).forEach(c =>
      lines.push(`  - ${c.name}: ${num(c.value)} clicks`));

    if ((d.devices ?? []).length > 0) {
      lines.push(`\nSearch Device Breakdown:`);
      (d.devices ?? []).forEach(dv =>
        lines.push(`  - ${dv.name}: ${num(dv.value)} clicks`));
    }
  } else {
    lines.push("GSC data unavailable at this time.");
  }

  // ── GSC Trend ─────────────────────────────────────────────────────────────
  if (gscTrend.status === "fulfilled" && gscTrend.value.data.length > 0) {
    const data  = gscTrend.value.data;
    const total = data.reduce((s, d) => s + d.clicks, 0);
    const avg   = Math.round(total / data.length);
    const peak  = data.reduce((mx, d) => d.clicks > mx.clicks ? d : mx, data[0]);
    lines.push(`\nGSC Trend (${rangeDays}d): Avg ${avg} clicks/day, peak ${num(peak.clicks)} on ${peak.date}`);
    const last7 = data.slice(-7);
    if (last7.length > 0) {
      lines.push(`Last 7 days clicks: ${last7.map(d => `${d.date}: ${d.clicks}`).join(", ")}`);
    }
  }

  // ── Microsoft Clarity ─────────────────────────────────────────────────────
  lines.push("\n\n## Microsoft Clarity\n");
  if (clarity.status === "fulfilled") {
    const d = clarity.value;
    lines.push(`Total Sessions: ${num(d.totalSessions)}`);
    lines.push(`Avg Scroll Depth: ${d.avgScrollDepth > 0 ? d.avgScrollDepth + "%" : "N/A"}`);
    lines.push(`Avg Engagement Time: ${d.avgEngagementSecs > 0 ? dur(d.avgEngagementSecs) : "N/A"}`);

    lines.push(`\nTop Pages (by sessions + scroll depth signals):`);
    (d.pages ?? []).slice(0, 12).forEach((p: any) =>
      lines.push(`  - ${p.path}: ${num(p.views)} sessions`));

    lines.push(`\nDevice Breakdown:`);
    (d.devices ?? []).forEach((dv: any) =>
      lines.push(`  - ${dv.name}: ${num(dv.value)} sessions`));

    lines.push(`\nTop Browsers:`);
    (d.browsers ?? []).slice(0, 5).forEach((b: any) =>
      lines.push(`  - ${b.name}: ${num(b.value)} sessions`));

    lines.push(`\nTop Countries:`);
    (d.countries ?? []).slice(0, 8).forEach((c: any) =>
      lines.push(`  - ${c.name}: ${num(c.value)} sessions`));

    lines.push(`\nTop Traffic Sources:`);
    (d.sources ?? []).slice(0, 8).forEach((s: any) =>
      lines.push(`  - ${s.name}: ${num(s.value)} sessions`));

    lines.push(`\nTop Channels:`);
    (d.channels ?? []).slice(0, 6).forEach((ch: any) =>
      lines.push(`  - ${ch.name}: ${num(ch.value)} sessions`));
  } else {
    lines.push("Clarity data unavailable at this time.");
  }

  // ── BigQuery User Sessions ────────────────────────────────────────────────
  if (sessionCtx.status === "fulfilled" && sessionCtx.value) {
    lines.push(sessionCtx.value);
  } else {
    lines.push("\n\n## BigQuery User Sessions\n");
    lines.push("Session-level data unavailable at this time.");
  }

  lines.push("\n═══════════════════════════════════════════");
  lines.push("Use ALL the above data to answer the user's question with specific numbers.");
  lines.push("For SEO keyword questions: reference the position buckets (page 1, page 2, etc.) with real keyword names.");
  lines.push("For timing questions: use the day-of-week and hour-of-day tables above — never make up numbers.");
  lines.push("For page engagement: use the Per-Page Engagement table with real bounce rates and durations.");
  lines.push("If a specific metric is missing from the data, say so honestly and suggest how to track it.");
  lines.push("═══════════════════════════════════════════\n");

  return lines.join("\n");
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { messages, range = "30" } = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
      range?: string;
    };

    if (!messages?.length) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    const rangeDays = parseInt(range, 10) || 30;

    // Build full system prompt with live data
    const dataContext = await buildDataContext(rangeDays);
    const systemPrompt = SYSTEM_BASE + dataContext;

    // Stream from OpenAI gpt-4o
    const stream = await getClient().chat.completions.create({
      model:      "gpt-4o",
      max_tokens: 2048,
      stream:     true,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });

    // Return as a streaming text response
    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type":      "text/plain; charset=utf-8",
        "Cache-Control":     "no-cache",
        "X-Accel-Buffering": "no",
      },
    });

  } catch (err: any) {
    console.error("[chat]", err?.message ?? err);
    return NextResponse.json({ error: err?.message ?? "Chat failed" }, { status: 500 });
  }
}
