import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { GA4Provider }     from "@/lib/analytics/providers/ga4";
import { GSCProvider }     from "@/lib/analytics/providers/gsc";
import { ClarityProvider } from "@/lib/analytics/providers/clarity";

export const dynamic = "force-dynamic";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

## What You Can Answer
- Traffic analysis: sources, trends, drops, spikes
- SEO: keyword opportunities, ranking improvements, CTR optimization
- Content: which pages engage, which lose users, what to create next
- Funnel: where users drop off, form abandonment, conversion paths
- Campaigns: which channels/sources drive quality traffic vs bounces
- Geography: which countries engage, which convert
- UX signals: scroll depth, engagement time, bounce patterns
- Recommendations: always prioritize actions that generate more leads

## Tone
Respond like a senior growth analyst briefing a founder. Be direct, specific, and actionable. Avoid vague statements. When data is limited, say so and explain what additional tracking would help.`;

// ── Data snapshot builder ─────────────────────────────────────────────────────

function num(n: number | undefined | null, suffix = "") {
  if (!n && n !== 0) return "N/A";
  return n.toLocaleString() + suffix;
}

async function buildDataContext(rangeDays: number): Promise<string> {
  const [ga4, ga4Trend, gsc, gscTrend, clarity] = await Promise.allSettled([
    GA4Provider.getOverview(rangeDays),
    GA4Provider.getTrend(rangeDays),
    GSCProvider.getOverview(rangeDays),
    GSCProvider.getTrend(rangeDays),
    ClarityProvider.getOverview(rangeDays),
  ]);

  const lines: string[] = [
    `\n\n═══════════════════════════════════════════`,
    `LIVE ANALYTICS DATA SNAPSHOT — Last ${rangeDays} days`,
    `═══════════════════════════════════════════\n`,
  ];

  // ── GA4 ──
  lines.push("## Google Analytics 4\n");
  if (ga4.status === "fulfilled") {
    const d = ga4.value;
    lines.push(`Sessions: ${num(d.sessions)}`);
    lines.push(`Active Users: ${num(d.activeUsers)}`);
    lines.push(`New Users: ${num(d.newUsers)}`);
    lines.push(`Avg Session Duration: ${d.avgSessionDuration > 0 ? `${Math.floor(d.avgSessionDuration / 60)}m ${d.avgSessionDuration % 60}s` : "N/A"}`);
    lines.push(`Bounce Rate: ${d.bounceRate > 0 ? d.bounceRate + "%" : "N/A"}`);
    lines.push(`\nTop Channels:`);
    (d.channels ?? []).slice(0, 6).forEach(c => lines.push(`  - ${c.name}: ${num(c.value)} sessions`));
    lines.push(`\nTop Traffic Sources:`);
    (d.sources ?? []).slice(0, 6).forEach(s => lines.push(`  - ${s.name}: ${num(s.value)} sessions`));
    lines.push(`\nTop Countries:`);
    (d.countries ?? []).slice(0, 8).forEach(c => lines.push(`  - ${c.name}: ${num(c.value)} sessions`));
    lines.push(`\nTop Pages (by views):`);
    (d.pages ?? []).slice(0, 10).forEach(p => lines.push(`  - ${p.path}: ${num(p.views)} views`));
    lines.push(`\nDevice Breakdown:`);
    (d.devices ?? []).forEach(d2 => lines.push(`  - ${d2.name}: ${num(d2.value)} sessions (${d2.percentage ?? 0}%)`));
    lines.push(`\nTop Browsers:`);
    (d.browsers ?? []).slice(0, 5).forEach(b => lines.push(`  - ${b.name}: ${num(b.value)} sessions`));
  } else {
    lines.push("GA4 data unavailable at this time.");
  }

  // ── GA4 Trend ──
  if (ga4Trend.status === "fulfilled" && ga4Trend.value.data.length > 0) {
    const data = ga4Trend.value.data;
    const totalSessions = data.reduce((s, d) => s + d.sessions, 0);
    const avgDaily = Math.round(totalSessions / data.length);
    const peak = data.reduce((max, d) => d.sessions > max.sessions ? d : max, data[0]);
    lines.push(`\nGA4 Trend (${rangeDays}d): Avg ${avgDaily} sessions/day, peak ${num(peak.sessions)} on ${peak.date}`);
  }

  // ── GSC ──
  lines.push("\n\n## Google Search Console\n");
  if (gsc.status === "fulfilled") {
    const d = gsc.value;
    lines.push(`Total Clicks: ${num(d.clicks)}`);
    lines.push(`Total Impressions: ${num(d.impressions)}`);
    lines.push(`Average CTR: ${d.ctr > 0 ? d.ctr + "%" : "N/A"}`);
    lines.push(`Average Position: ${d.avgPosition > 0 ? d.avgPosition : "N/A"}`);
    lines.push(`\nTop Search Queries (by clicks):`);
    (d.topQueries ?? []).slice(0, 15).forEach(q =>
      lines.push(`  - "${q.query}": ${num(q.clicks)} clicks, ${num(q.impressions)} impressions, CTR ${q.ctr}%, position ${q.position}`)
    );
    lines.push(`\nTop Pages in Search:`);
    (d.topPages ?? []).slice(0, 10).forEach(p =>
      lines.push(`  - ${p.page}: ${num(p.clicks)} clicks, position ${p.position}`)
    );
    lines.push(`\nTop Countries (by clicks):`);
    (d.countries ?? []).slice(0, 6).forEach(c => lines.push(`  - ${c.name}: ${num(c.value)} clicks`));
  } else {
    lines.push("GSC data unavailable at this time.");
  }

  // ── GSC Trend ──
  if (gscTrend.status === "fulfilled" && gscTrend.value.data.length > 0) {
    const data = gscTrend.value.data;
    const totalClicks = data.reduce((s, d) => s + d.clicks, 0);
    const avgDaily = Math.round(totalClicks / data.length);
    lines.push(`\nGSC Trend (${rangeDays}d): Avg ${avgDaily} clicks/day`);
  }

  // ── Clarity ──
  lines.push("\n\n## Microsoft Clarity\n");
  if (clarity.status === "fulfilled") {
    const d = clarity.value;
    lines.push(`Total Sessions: ${num(d.totalSessions)}`);
    lines.push(`Avg Scroll Depth: ${d.avgScrollDepth > 0 ? d.avgScrollDepth + "%" : "N/A"}`);
    lines.push(`Avg Engagement Time: ${d.avgEngagementSecs > 0 ? `${Math.floor(d.avgEngagementSecs / 60)}m ${d.avgEngagementSecs % 60}s` : "N/A"}`);
    lines.push(`\nTop Pages (by sessions):`);
    (d.pages ?? []).slice(0, 10).forEach((p: any) => lines.push(`  - ${p.path}: ${num(p.views)} sessions`));
    lines.push(`\nDevice Breakdown:`);
    (d.devices ?? []).forEach((dev: any) => lines.push(`  - ${dev.name}: ${num(dev.value)} sessions`));
    lines.push(`\nTop Browsers:`);
    (d.browsers ?? []).slice(0, 5).forEach((b: any) => lines.push(`  - ${b.name}: ${num(b.value)} sessions`));
    lines.push(`\nTop Countries:`);
    (d.countries ?? []).slice(0, 6).forEach((c: any) => lines.push(`  - ${c.name}: ${num(c.value)} sessions`));
    lines.push(`\nTop Traffic Sources:`);
    (d.sources ?? []).slice(0, 6).forEach((s: any) => lines.push(`  - ${s.name}: ${num(s.value)} sessions`));
    lines.push(`\nTop Channels:`);
    (d.channels ?? []).slice(0, 6).forEach((ch: any) => lines.push(`  - ${ch.name}: ${num(ch.value)} sessions`));
  } else {
    lines.push("Clarity data unavailable at this time.");
  }

  lines.push("\n═══════════════════════════════════════════");
  lines.push("Use the above data to answer the user's question with specific numbers and actionable insights.");
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

    // Stream from Claude
    const stream = await client.messages.create({
      model:      "claude-sonnet-4-5",
      max_tokens: 1024,
      system:     systemPrompt,
      messages,
      stream:     true,
    });

    // Return as a streaming text response
    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type":  "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });

  } catch (err: any) {
    console.error("[chat]", err?.message ?? err);
    return NextResponse.json({ error: err?.message ?? "Chat failed" }, { status: 500 });
  }
}
