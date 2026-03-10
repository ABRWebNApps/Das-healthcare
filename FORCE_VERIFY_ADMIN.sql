-- This script manually verifies the newly created admin account
-- Run this in your Supabase SQL Editor

UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'admin@dascareproviders.com';
