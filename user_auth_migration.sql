-- UPDATED AUTH USER MIGRATION SCRIPT
-- Run this in the NEW Supabase SQL Editor

-- 1. Ensure the pgcrypto extension is enabled for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Define the temporary password hash for Email users
-- Password will be: ScalePods2024!
DO $$
DECLARE
  temp_password_hash text := crypt('ScalePods2024!', gen_salt('bf'));
BEGIN

  -- User 1: admin@scalepods.co (Admin)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, is_super_admin, aud)
  VALUES (
    '5ba0e9f6-3f16-4035-8691-4f3cd3af53e2', 
    'admin@scalepods.co', 
    temp_password_hash, 
    '2026-04-24 08:53:08.795784+00',
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "Admin", "full_name": "Hrishikesh", "email_verified": true}',
    '2026-04-23 20:18:48.617281+00',
    now(),
    'authenticated',
    FALSE, 'authenticated'
  ) ON CONFLICT (id) DO NOTHING;

  -- User 2: adnan@scalepods.co (Google)
  INSERT INTO auth.users (id, email, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, is_super_admin, aud)
  VALUES (
    '5fb1daf5-7f9e-4b78-b5b1-33dfc70eac93', 
    'adnan@scalepods.co', 
    '2026-04-25 10:09:46.032993+00',
    '{"provider": "google", "providers": ["google"]}',
    '{"full_name": "Adnan Shaikh", "email_verified": true}',
    '2026-04-25 10:09:46.007096+00',
    now(),
    'authenticated',
    FALSE, 'authenticated'
  ) ON CONFLICT (id) DO NOTHING;

  -- User 3: client@scalepods.co (Client)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, is_super_admin, aud)
  VALUES (
    '89ac7f9c-fd27-4291-acb8-c166f8155e8f', 
    'client@scalepods.co', 
    temp_password_hash, 
    '2026-04-24 14:21:11.189445+00',
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "Client", "full_name": "Client User", "email_verified": true}',
    '2026-04-23 20:02:10.313783+00',
    now(),
    'authenticated',
    FALSE, 'authenticated'
  ) ON CONFLICT (id) DO NOTHING;

  -- User 4: designer@scalepods.co (Designer)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, is_super_admin, aud)
  VALUES (
    '2bbb0a93-a7b9-4313-8de6-26eeed9e62dc', 
    'designer@scalepods.co', 
    temp_password_hash, 
    '2026-04-24 14:21:11.491507+00',
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "Designer", "full_name": "Designer User", "email_verified": true}',
    '2026-04-23 20:02:13.780846+00',
    now(),
    'authenticated',
    FALSE, 'authenticated'
  ) ON CONFLICT (id) DO NOTHING;

  -- User 5: hrishikeshshiralaskar@gmail.com (Google)
  INSERT INTO auth.users (id, email, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, is_super_admin, aud)
  VALUES (
    '36a3fe8d-27e1-4c7c-868a-66f9965f94f6', 
    'hrishikeshshiralaskar@gmail.com', 
    '2026-04-23 20:08:27.215737+00',
    '{"provider": "google", "providers": ["google"]}',
    '{"full_name": "hrishikesh shiralaskar", "email_verified": true}',
    '2026-04-23 20:08:27.202024+00',
    now(),
    'authenticated',
    FALSE, 'authenticated'
  ) ON CONFLICT (id) DO NOTHING;

END $$;

-- 3. Create identities (Using 'id' which is the standard unique identity column)
INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
SELECT id, id, format('{"sub":"%s","email":"%s"}', id, email)::jsonb, 'email', now(), now(), now()
FROM auth.users
WHERE raw_app_meta_data->>'provider' = 'email'
ON CONFLICT (provider, id) DO NOTHING;

INSERT INTO auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
SELECT id, id, format('{"sub":"%s","email":"%s"}', id, email)::jsonb, 'google', now(), now(), now()
FROM auth.users
WHERE raw_app_meta_data->>'provider' = 'google'
ON CONFLICT (provider, id) DO NOTHING;
