-- GA4 Sessions Table: Store user-level session data from BigQuery
CREATE TABLE IF NOT EXISTS public.ga4_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE,
  user_pseudo_id text NOT NULL,

  -- Timing
  session_start_time timestamp with time zone,
  session_end_time timestamp with time zone,
  session_duration_seconds int GENERATED ALWAYS AS (
    EXTRACT(EPOCH FROM (session_end_time - session_start_time))::int
  ) STORED,

  -- Metrics
  event_count int DEFAULT 0,
  engagement_time_msec int DEFAULT 0,

  -- Device & Geo
  device_category text,
  browser text,
  os text,
  country text,
  city text,

  -- Traffic Source
  session_source text,
  session_medium text,

  -- Pages
  first_page_location text,
  first_page_title text,
  last_page_location text,
  last_page_title text,

  -- Enrichment
  clarity_session_id text,
  clarity_scroll_depth numeric(5,2),
  clarity_engagement_score numeric(5,2),

  -- Metadata
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  synced_at timestamp with time zone DEFAULT now(),

  CONSTRAINT ga4_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT unique_session_id UNIQUE (session_id)
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_ga4_sessions_user ON public.ga4_sessions(user_pseudo_id);
CREATE INDEX IF NOT EXISTS idx_ga4_sessions_date ON public.ga4_sessions(session_start_time DESC);
CREATE INDEX IF NOT EXISTS idx_ga4_sessions_engagement ON public.ga4_sessions(engagement_time_msec DESC);
CREATE INDEX IF NOT EXISTS idx_ga4_sessions_source ON public.ga4_sessions(session_source, session_medium);
CREATE INDEX IF NOT EXISTS idx_ga4_sessions_country ON public.ga4_sessions(country);

-- GA4 Events Table: Store individual events for journey analysis (optional)
CREATE TABLE IF NOT EXISTS public.ga4_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL REFERENCES public.ga4_sessions(session_id) ON DELETE CASCADE,
  user_pseudo_id text NOT NULL,

  event_name text NOT NULL,
  event_timestamp timestamp with time zone,
  event_params jsonb,

  page_location text,
  page_title text,

  created_at timestamp with time zone DEFAULT now(),

  CONSTRAINT ga4_events_pkey PRIMARY KEY (id)
);

-- Create indexes for event queries
CREATE INDEX IF NOT EXISTS idx_ga4_events_session ON public.ga4_events(session_id);
CREATE INDEX IF NOT EXISTS idx_ga4_events_user ON public.ga4_events(user_pseudo_id);
CREATE INDEX IF NOT EXISTS idx_ga4_events_timestamp ON public.ga4_events(event_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ga4_events_name ON public.ga4_events(event_name);

-- Session Enrichment Cache: Store AI context for sessions
CREATE TABLE IF NOT EXISTS public.session_enrichment_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE REFERENCES public.ga4_sessions(session_id) ON DELETE CASCADE,

  -- Aggregated metrics for AI context
  engagement_score numeric(5,2),
  intent_signals jsonb,
  behavior_summary text,
  recommended_actions text[] DEFAULT '{}',

  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),

  CONSTRAINT session_enrichment_pkey PRIMARY KEY (id)
);

-- Create index for enrichment lookups
CREATE INDEX IF NOT EXISTS idx_session_enrichment_session ON public.session_enrichment_cache(session_id);

-- Enable RLS (Row Level Security) if needed
ALTER TABLE public.ga4_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ga4_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_enrichment_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Service role (n8n) can write, anon can read
CREATE POLICY IF NOT EXISTS "Service role write access" ON public.ga4_sessions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Anon read access" ON public.ga4_sessions
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Service role write events" ON public.ga4_events
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Anon read events" ON public.ga4_events
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Service role write enrichment" ON public.session_enrichment_cache
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Anon read enrichment" ON public.session_enrichment_cache
  FOR SELECT USING (true);
