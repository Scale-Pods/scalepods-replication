# ScalePods.co — Master URL Redirections & SEO Canonical Map

**Last Updated:** November 9, 2026  
**Status:** All 301 Permanent Redirects Configured & Active in `next.config.ts`  
**Domain:** `https://www.scalepods.co`  

---

## 1. Executive Summary

This document serves as the official registry of all URL migrations, legacy aliases, and permanent 301 redirects across **ScalePods.co**.

Every redirect is configured at the edge layer in [`next.config.ts`](file:///f:/Scalepods.co/scalepods-website-nextjs/next.config.ts), ensuring:
1. **Zero Link Rot / 404 Errors:** Visitors and search engines following legacy or shortened URLs are automatically routed to the final canonical page.
2. **100% PageRank & Equity Preservation:** Google Search Console transfers all historical indexing signals, authority, and backlinks directly to the target destination.
3. **Sitemap Cleanliness:** All legacy source URLs are explicitly excluded from [`sitemap.xml`](file:///f:/Scalepods.co/scalepods-website-nextjs/src/app/sitemap.ts), preventing duplicate content or redirect warnings in Google Search Console.

---

## 2. Complete Redirections Master Table

| # | Category | Legacy / Source URL | Target Canonical URL | HTTP Status | Implementation |
| :---: | :--- | :--- | :--- | :---: | :---: |
| **1** | Case Study | `/blog/lotus-manor-case-study` | [`/case-study/lotus-manor-real-estate-sales-automation-dubai`](https://www.scalepods.co/case-study/lotus-manor-real-estate-sales-automation-dubai) | `301 Permanent` | `next.config.ts` |
| **2** | Case Study | `/blog/lotus-manor-real-estate-sales-automation-dubai` | [`/case-study/lotus-manor-real-estate-sales-automation-dubai`](https://www.scalepods.co/case-study/lotus-manor-real-estate-sales-automation-dubai) | `301 Permanent` | `next.config.ts` |
| **3** | Case Study | `/blog/zv-steels-recruitment-automation-tool` | [`/case-study/zv-steels-recruitment-automation-tool`](https://www.scalepods.co/case-study/zv-steels-recruitment-automation-tool) | `301 Permanent` | `next.config.ts` |
| **4** | Case Study | `/blog/asquared-real-estate-sales-automation-dubai` | [`/case-study/asquared-real-estate-sales-automation-dubai`](https://www.scalepods.co/case-study/asquared-real-estate-sales-automation-dubai) | `301 Permanent` | `next.config.ts` |
| **5** | Case Study | `/blog/lootah-group-procurement-workflow-automation` | [`/case-study/lootah-group-procurement-workflow-automation`](https://www.scalepods.co/case-study/lootah-group-procurement-workflow-automation) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **6** | Case Study | `/blog/macro-media-finance-workflow-automation` | [`/case-study/macro-media-finance-workflow-automation`](https://www.scalepods.co/case-study/macro-media-finance-workflow-automation) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **7** | Case Study | `/blog/bennett-realty-growth-os` | [`/case-study/bennett-realty-growth-os`](https://www.scalepods.co/case-study/bennett-realty-growth-os) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **8** | Case Study | `/blog/victory-energy-business-automation` | [`/case-study/victory-energy-business-automation`](https://www.scalepods.co/case-study/victory-energy-business-automation) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **9** | Case Study | `/blog/ryan-schwartz-fub-crm-automation` | [`/case-study/ryan-schwartz-fub-crm-automation`](https://www.scalepods.co/case-study/ryan-schwartz-fub-crm-automation) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **10** | Solution | `/salespod` | [`/solution/sales-workflow-automation`](https://www.scalepods.co/solution/sales-workflow-automation) | `301 Permanent` | `next.config.ts` |
| **11** | Solution | `/solution/operations-automation` | [`/solution/ops-workflow-automation`](https://www.scalepods.co/solution/ops-workflow-automation) | `301 Permanent` | `next.config.ts` |
| **12** | Solution | `/blog/operations-automation-guide` | [`/solution/ops-workflow-automation`](https://www.scalepods.co/solution/ops-workflow-automation) | `301 Permanent` | `next.config.ts` |
| **13** | Solution | `/ai-automation-for-manufacturing` | [`/solution/ai-automation-for-manufacturing`](https://www.scalepods.co/solution/ai-automation-for-manufacturing) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **14** | Solution | `/ai-automation-for-real-estate` | [`/solution/ai-automation-for-real-estate`](https://www.scalepods.co/solution/ai-automation-for-real-estate) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **15** | Regional / Core | `/gcc` | [`/global`](https://www.scalepods.co/global) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **16** | Regional / Core | `/uae` | [`/global`](https://www.scalepods.co/global) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **17** | Regional / Core | `/resources/ebooks` | [`/resources`](https://www.scalepods.co/resources) | `301 Permanent` | `next.config.ts` *(Newly Added)* |
| **18** | Core | `/use-cases` | [`/`](https://www.scalepods.co/) | `301 Permanent` | `next.config.ts` |

---

## 3. Trailing Slash Normalization

Next.js is configured with standard non-trailing slash URLs. Any request containing a trailing slash is automatically normalized via HTTP 308 Permanent Redirect:

* `https://www.scalepods.co/global/` ➔ `https://www.scalepods.co/global`
* `https://www.scalepods.co/solution/marketing-workflow-automation/` ➔ `https://www.scalepods.co/solution/marketing-workflow-automation`

This prevents duplicate URL penalties and guarantees that Google only indexes a single canonical version of each page.

---

## 4. Verification & Testing

Every redirect in this table has been validated to ensure:
1. Target routes return `HTTP 200 OK`.
2. Target routes contain self-referential canonical tags `<link rel="canonical" href="..." />`.
3. Target routes are actively mapped in [`src/app/sitemap.ts`](file:///f:/Scalepods.co/scalepods-website-nextjs/src/app/sitemap.ts).
4. No redirect chains or loops exist.
