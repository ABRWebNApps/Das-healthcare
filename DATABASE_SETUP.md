# Database Setup Guide

This guide will help you set up the Supabase database tables for the DAS Healthcare admin backend.

## Prerequisites

1. A Supabase project (create one at https://supabase.com)
2. Your Supabase URL and anon key added to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Database Tables

Run these SQL commands in your Supabase SQL Editor:

### 1. Jobs Table

```sql
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Temporary')),
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  application_link TEXT,
  salary_range TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
```

### 2. Appointments Table

```sql
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  reason TEXT,
  department TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rescheduled', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
```

### 3. Enable Row Level Security (RLS)

```sql
-- Enable RLS on jobs table
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active jobs
CREATE POLICY "Public can view active jobs" ON jobs
  FOR SELECT USING (is_active = true);

-- Allow authenticated users full access to jobs
CREATE POLICY "Admins can manage jobs" ON jobs
  FOR ALL USING (auth.role() = 'authenticated');

-- Enable RLS on appointments table
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow public to insert appointments
CREATE POLICY "Public can create appointments" ON appointments
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users full access to appointments
CREATE POLICY "Admins can manage appointments" ON appointments
  FOR ALL USING (auth.role() = 'authenticated');
```

## Authentication Setup

1. Go to Authentication > Users in your Supabase dashboard
2. Create an admin user or use email/password authentication
3. The admin login page at `/admin/login` will use this authentication

## Notes

- Make sure to replace the RLS policies with your actual authentication requirements
- You may want to create a custom role for admins instead of using `auth.role() = 'authenticated'`
- The `updated_at` field can be automatically updated using a trigger (optional)
