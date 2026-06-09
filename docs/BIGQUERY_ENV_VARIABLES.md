# BigQuery Environment Variables Setup

Add these to your `.env.local` file:

## Required Variables

```bash
# BigQuery Configuration
BIGQUERY_PROJECT_ID=scalepods-analytics
BIGQUERY_DATASET_ID=analytics_scalepods
GA4_PROPERTY_ID=512927379

# Note: GA4_SERVICE_ACCOUNT_JSON is already set from Phase 1 (GA4 API setup)
# It includes all credentials needed for BigQuery auth (JWT signing)
```

## Existing Variables (Already Configured)

These are from your previous GA4 + GSC setup:

```bash
# Google Analytics 4 API
GA4_SERVICE_ACCOUNT_JSON=<base64-encoded service account JSON>

# Supabase (already set up)
NEXT_PUBLIC_SUPABASE_URL=https://pjblbouksmeypryiyoyr.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

## Verification

Check that these are set:

```bash
# Terminal
echo $BIGQUERY_PROJECT_ID
echo $BIGQUERY_DATASET_ID
echo $GA4_PROPERTY_ID

# Should output:
# scalepods-analytics
# analytics_scalepods
# 512927379
```

## Security Notes

- **GA4_SERVICE_ACCOUNT_JSON**: Keep this base64-encoded in Vercel secrets
- **Never commit** these to git — use `.env.local` (already in .gitignore)
- Service account has read access to BigQuery only (scopes: `bigquery`, `bigquery.readonly`)

## No Changes to Existing Auth

The BigQuery provider reuses `GA4_SERVICE_ACCOUNT_JSON` — no new credentials needed!

Both GA4 API and BigQuery queries use the same service account JWT authentication.
