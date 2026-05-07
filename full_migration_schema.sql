-- FULL MIGRATION SCHEMA (ScalePods + Marketing Tools + Clarity Analytics)
-- Run this in the New Supabase SQL Editor

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Independent Tables (No Foreign Keys)
CREATE TABLE public.clients (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  industry_type text,
  business_description text,
  target_audience text,
  platforms text,
  primary_goal text,
  brand_tone text,
  status text DEFAULT 'Awaiting Strategy'::text,
  client_feedback text,
  strategy_json jsonb,
  created_at timestamp with time zone DEFAULT now(),
  website_url text,
  competitors text,
  additional_notes text,
  content_json jsonb,
  content_approved_by text,
  content_reviewer_notes text,
  design_urls text[], -- Fixed ARRAY syntax
  design_feedback text,
  design_submitted_by text,
  revision_history jsonb DEFAULT '[]'::jsonb,
  figma_url text,
  canva_url text,
  export_source text DEFAULT 'upload'::text,
  blog_status text DEFAULT 'Idle'::text,
  blog_json jsonb,
  blog_word_count integer,
  blog_generated_at timestamp with time zone,
  CONSTRAINT clients_pkey PRIMARY KEY (id)
);

CREATE TABLE public.contact_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  full_name text,
  email text,
  phone text,
  source text,
  message text,
  CONSTRAINT contact_submissions_pkey PRIMARY KEY (id)
);

CREATE TABLE public.download_leads (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  full_name text NOT NULL,
  contact_number text NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT download_leads_pkey PRIMARY KEY (id)
);

CREATE TABLE public.user_accounts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role = ANY (ARRAY['user'::text, 'designer'::text])),
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_accounts_pkey PRIMARY KEY (id)
);

CREATE TABLE public.website_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  body text,
  hero_image text,
  category text DEFAULT 'Article'::text,
  tags text[] DEFAULT '{}'::text[], -- Fixed ARRAY syntax
  cta_label text DEFAULT 'Learn More'::text,
  cta_url text DEFAULT 'https://scalepods.co/contact'::text,
  status text DEFAULT 'draft'::text,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT website_content_pkey PRIMARY KEY (id)
);

-- 3. Dependent Tables (With Foreign Keys)
CREATE TABLE public.content_deliverables (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  client_id uuid,
  task_name text NOT NULL,
  post_type text,
  platform text,
  topic text,
  status text DEFAULT 'Pending Design'::text,
  design_url text,
  created_at timestamp with time zone DEFAULT now(),
  media_url text,
  rework_comments text,
  platform_target text,
  CONSTRAINT content_deliverables_pkey PRIMARY KEY (id),
  CONSTRAINT content_deliverables_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE
);

CREATE TABLE public.website_blogs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  client_id uuid,
  title text NOT NULL,
  header_image text,
  content text,
  blog_json jsonb,
  status text DEFAULT 'Review Pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT website_blogs_pkey PRIMARY KEY (id),
  CONSTRAINT website_blogs_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE
);

CREATE TABLE public.social_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  post_id uuid,
  client_id uuid,
  platform text NOT NULL CHECK (platform = ANY (ARRAY['instagram'::text, 'linkedin'::text, 'website'::text])),
  impressions integer DEFAULT 0,
  reach integer DEFAULT 0,
  likes integer DEFAULT 0,
  comments integer DEFAULT 0,
  shares integer DEFAULT 0,
  engagement_rate numeric DEFAULT 0,
  saves integer DEFAULT 0,
  profile_visits integer DEFAULT 0,
  new_followers integer DEFAULT 0,
  skip_rate numeric DEFAULT 0,
  clicks integer DEFAULT 0,
  followers integer DEFAULT 0,
  sessions integer DEFAULT 0,
  bounce_rate numeric DEFAULT 0,
  avg_time_on_page integer DEFAULT 0,
  conversions integer DEFAULT 0,
  new_visitors integer DEFAULT 0,
  data_source text DEFAULT 'manual'::text,
  recorded_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT social_analytics_pkey PRIMARY KEY (id),
  CONSTRAINT social_analytics_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.content_deliverables(id) ON DELETE SET NULL,
  CONSTRAINT social_analytics_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id) ON DELETE CASCADE
);

-- 4. New Custom Analytics Vault Table
CREATE TABLE IF NOT EXISTS public.clarity_analytics_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fetch_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    total_sessions INTEGER NOT NULL DEFAULT 0,
    avg_engagement_time_seconds NUMERIC(10,2) NOT NULL DEFAULT 0,
    avg_scroll_depth NUMERIC(5,2) NOT NULL DEFAULT 0,
    browser_stats JSONB DEFAULT '[]'::jsonb,
    device_stats JSONB DEFAULT '[]'::jsonb,
    country_stats JSONB DEFAULT '[]'::jsonb,
    os_stats JSONB DEFAULT '[]'::jsonb,
    popular_pages JSONB DEFAULT '[]'::jsonb,
    source_medium_stats JSONB DEFAULT '[]'::jsonb,
    raw_response JSONB
);

CREATE INDEX idx_clarity_cache_created_at ON public.clarity_analytics_cache(created_at DESC);

-- 5. Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clarity_analytics_cache ENABLE ROW LEVEL SECURITY;

-- 6. Basic RLS Policies (Allow Authenticated Reads)
CREATE POLICY "Allow authenticated read clients" ON public.clients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read submissions" ON public.contact_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read deliverables" ON public.content_deliverables FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read leads" ON public.download_leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read analytics" ON public.social_analytics FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated read accounts" ON public.user_accounts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow anyone to read blogs" ON public.website_blogs FOR SELECT USING (true);
CREATE POLICY "Allow anyone to read content" ON public.website_content FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read clarity" ON public.clarity_analytics_cache FOR SELECT TO authenticated USING (true);

-- 7. Public Insert Policies (Allow Anyone to submit forms)
CREATE POLICY "Allow public to submit contact form" ON public.contact_submissions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public to submit download leads" ON public.download_leads FOR INSERT TO anon WITH CHECK (true);

