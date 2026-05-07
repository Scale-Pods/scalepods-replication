-- supabase_clarity_schema.sql
-- Create a table for Clarity Analytics Cache

CREATE TABLE IF NOT EXISTS public.clarity_analytics_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- The timestamp of when n8n fetched this data
    fetch_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    
    -- High-level aggregated metrics
    total_sessions INTEGER NOT NULL DEFAULT 0,
    avg_engagement_time_seconds NUMERIC(10,2) NOT NULL DEFAULT 0,
    avg_scroll_depth NUMERIC(5,2) NOT NULL DEFAULT 0,
    
    -- JSON blobs for dimension breakdowns (aggregated by n8n)
    -- Example structure: [{"name": "Chrome", "value": 500}, {"name": "Safari", "value": 300}]
    browser_stats JSONB DEFAULT '[]'::jsonb,
    device_stats JSONB DEFAULT '[]'::jsonb,
    country_stats JSONB DEFAULT '[]'::jsonb,
    os_stats JSONB DEFAULT '[]'::jsonb,
    
    -- Top Pages / URLs
    popular_pages JSONB DEFAULT '[]'::jsonb,

    -- Marketing sources
    source_medium_stats JSONB DEFAULT '[]'::jsonb,
    
    -- Optional: Store the raw 1000 rows if you ever need to backfill or re-calculate
    raw_response JSONB
);

-- Index on created_at so we can quickly fetch the most recent row for the dashboard
CREATE INDEX idx_clarity_cache_created_at ON public.clarity_analytics_cache(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.clarity_analytics_cache ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access for authenticated admins
CREATE POLICY "Allow authenticated reads on clarity_analytics_cache"
ON public.clarity_analytics_cache
FOR SELECT
TO authenticated
USING (true);

-- Allow service role (which n8n will use) to insert new records
CREATE POLICY "Allow service role inserts on clarity_analytics_cache"
ON public.clarity_analytics_cache
FOR INSERT
TO service_role
WITH CHECK (true);
