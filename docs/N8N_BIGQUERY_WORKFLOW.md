# GA4 BigQuery Sessions Sync Workflow (3-Hour Polling)

## Overview
This n8n workflow polls GA4 BigQuery every 3 hours to fetch user-level session data and stores it in Supabase for AI assistant enrichment.

## Workflow Architecture

```
Schedule (every 3 hours)
  ↓
BigQuery: Query Sessions
  ↓
Code: Transform Data
  ↓
Supabase: Upsert Sessions
  ↓
Error Handler (Slack notification)
```

## Setup Instructions

### Step 1: Create Workflow

1. Go to **n8n.srv1010832.hstgr.cloud**
2. Click **"New Workflow"**
3. Name it: **"GA4 BigQuery Sessions Sync"**

### Step 2: Add Schedule Trigger

1. Click **"Add node"** → Search **"Schedule"**
2. Select **"Schedule Trigger"**
3. Configure:
   - **Trigger type:** Every hours
   - **Hours interval:** 3
   - **Exact time:** 00:00 (midnight UTC)
4. Click **"Add"**

### Step 3: Add BigQuery Query Node

1. Click **"+"** below Schedule → **"Add node"**
2. Search **"Google BigQuery"** or use **"HTTP Request"**
3. Choose **"HTTP Request"** (easier than BigQuery node)
4. Configure:
   ```
   - Method: POST
   - URL: https://www.googleapis.com/bigquery/v2/projects/scalepods-analytics/queries
   - Headers:
     - Authorization: Bearer {{ $node["Get Token"].json.access_token }}
     - Content-Type: application/json
   - Body (JSON):
   {
     "query": "SELECT user_pseudo_id, CAST((SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'session_id') AS INT64) as session_id, TIMESTAMP_MILLIS(MIN(event_timestamp)) as session_start_time, TIMESTAMP_MILLIS(MAX(event_timestamp)) as session_end_time, COUNT(*) as event_count, SUM(engagement_time_msec) as engagement_time_msec, device.category, device.web_browser, device.operating_system, geo.country, geo.city, traffic_source.source, traffic_source.medium, (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_location') as page_location, (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'page_title') as page_title FROM `scalepods-analytics.analytics_512927379.events_*` WHERE PARSE_DATE('%Y%m%d', _TABLE_SUFFIX) >= DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY) GROUP BY user_pseudo_id, session_id, device, geo, traffic_source, page_location, page_title ORDER BY session_start_time DESC LIMIT 10000",
     "useLegacySql": false,
     "timeoutMs": 30000
   }
   ```

### Step 4: Transform Data (Code Node)

1. Add **"Code"** node
2. Set **mode:** "Run Once for All Items"
3. JavaScript code:
```javascript
// Transform BigQuery response to Supabase format
const rows = $input.all()[0].json.rows || [];
const schema = $input.all()[0].json.schema?.fields || [];

const transformed = rows.map(row => {
  const obj = {};
  row.f.forEach((field, idx) => {
    obj[schema[idx]?.name || `field_${idx}`] = field.v;
  });
  return obj;
});

return transformed.map(session => ({
  session_id: String(session.session_id),
  user_pseudo_id: session.user_pseudo_id,
  session_start_time: session.session_start_time,
  session_end_time: session.session_end_time,
  event_count: parseInt(session.event_count || 0),
  engagement_time_msec: parseInt(session.engagement_time_msec || 0),
  device_category: session.category || 'unknown',
  browser: session.web_browser || 'unknown',
  os: session.operating_system || 'unknown',
  country: session.country || 'unknown',
  city: session.city || 'unknown',
  session_source: session.source || 'direct',
  session_medium: session.medium || 'direct',
  first_page_location: session.page_location || '/',
  first_page_title: session.page_title || 'Unknown',
  synced_at: new Date().toISOString(),
})).map((item, i) => ({ json: item }));
```

### Step 5: Upsert to Supabase

1. Add **"Supabase"** node
2. Configure:
   - **Credential:** Your Supabase API key
   - **Operation:** Upsert
   - **Table:** ga4_sessions
   - **Upsert by:** session_id
   - **Fields to update:** All (or specific ones)
   - **Batch size:** 100
3. Map the data from Code node

### Step 6: Error Handler

1. Add **"Error Trigger"** node
2. Add **"Slack"** or **"HTTP Request"** to notify on failure
3. Message example:
```
❌ GA4 BigQuery Sync Failed
Error: {{ $node["BigQuery Query"].json.error }}
Time: {{ $now.toISOString() }}
```

### Step 7: Activate Workflow

1. Click **"Activate"** (top right)
2. Confirm the 3-hour schedule

---

## Alternative: Using BigQuery Credentials Directly

Instead of HTTP Request, use the native **"Google BigQuery"** node:

1. Add **"Google BigQuery"** node
2. **Credential:** Service Account (created earlier)
3. **Operation:** Query
4. **Project ID:** `scalepods-analytics`
5. **SQL Query:** (paste from Step 3 above)
6. Click **Execute**

---

## Testing

### Test Run
1. Click **"Test"** in the Schedule node
2. Verify BigQuery returns data
3. Check Supabase table gets populated

### Monitor Runs
- **Executions** tab → view all runs
- **Logs** tab → debug errors

---

## Cost Estimate

- **BigQuery queries:** $6.25 per TB scanned
- **3 queries/day × 30 days:** ~180 queries/month
- **Estimated cost:** $0.02–0.10/month (small dataset)

---

## Next Steps

1. **Create this workflow in n8n**
2. **Test with first manual run**
3. **Verify data in Supabase table**
4. **Check `/api/analytics/ga4-sessions/enriched` endpoint**
5. **Use `useGA4Sessions` hook in admin dashboard**

---

## Monitoring & Maintenance

### Check data freshness
```sql
SELECT MAX(synced_at) FROM public.ga4_sessions;
```

### View latest sessions
```sql
SELECT * FROM public.ga4_sessions 
ORDER BY session_start_time DESC 
LIMIT 10;
```

### Check sync errors in n8n
- **Executions** → filter by **Failed**
- **Logs** → search for **BigQuery** errors
