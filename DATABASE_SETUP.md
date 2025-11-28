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
  application_fields JSONB, -- Custom application form fields configuration
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

### 3. Job Applications Table

```sql
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  job_title TEXT, -- Denormalized for easier querying
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT NOT NULL,
  cover_letter TEXT,
  files TEXT[] DEFAULT '{}',
  custom_responses JSONB, -- Store responses to custom form fields
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'approved', 'declined')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON job_applications(created_at);
```

### 4. Messages Table

```sql
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  response TEXT,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
```

### 5. Enable Row Level Security (RLS)

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

-- Allow public to read appointment availability (for booking calendar)
CREATE POLICY "Public can read appointment availability" ON appointments
  FOR SELECT USING (true);

-- Allow authenticated users full access to appointments
CREATE POLICY "Admins can manage appointments" ON appointments
  FOR ALL USING (auth.role() = 'authenticated');

-- Enable RLS on job_applications table
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Allow public to create applications
CREATE POLICY "Public can create applications" ON job_applications
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users full access to applications
CREATE POLICY "Admins can manage applications" ON job_applications
  FOR ALL USING (auth.role() = 'authenticated');

-- Enable RLS on messages table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow public to create messages
CREATE POLICY "Public can create messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users full access to messages
CREATE POLICY "Admins can manage messages" ON messages
  FOR ALL USING (auth.role() = 'authenticated');
```

### 6. Set Up Supabase Storage for File Uploads

**⚠️ IMPORTANT: This step is REQUIRED for job applications to work. Without this bucket, users will get a "bucket not found" error when submitting applications.**

#### Step-by-Step Instructions:

1. **Go to Storage** in your Supabase dashboard
   - Navigate to your Supabase project dashboard
   - Click on "Storage" in the left sidebar

2. **Create a new bucket** named `applications`
   - Click "New bucket" or "Create bucket" button
   - Name: `applications` (must be exactly this name, case-sensitive)
   - **Make the bucket PUBLIC** (toggle "Public bucket" to ON)
   - Click "Create bucket"

3. **Add storage policies** (REQUIRED for file uploads to work):

Go to the SQL Editor in your Supabase dashboard and run these commands:

```sql
-- Allow public to upload files
CREATE POLICY "Public can upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'applications');

-- Allow public to read files
CREATE POLICY "Public can read files" ON storage.objects
  FOR SELECT USING (bucket_id = 'applications');

-- Allow authenticated users to delete files
CREATE POLICY "Admins can delete files" ON storage.objects
  FOR DELETE USING (bucket_id = 'applications' AND auth.role() = 'authenticated');
```

#### Troubleshooting:

- **Error: "bucket not found"**: Make sure you've created the bucket with the exact name `applications` (lowercase)
- **Error: "new row violates row-level security policy"**: Make sure you've run the storage policy SQL commands above
- **Files not uploading**: Verify the bucket is set to "Public" in the bucket settings

## Authentication Setup

1. Go to Authentication > Users in your Supabase dashboard
2. Create an admin user or use email/password authentication
3. The admin login page at `/admin/login` will use this authentication

## Notes

- Make sure to replace the RLS policies with your actual authentication requirements
- You may want to create a custom role for admins instead of using `auth.role() = 'authenticated'`
- The `updated_at` field can be automatically updated using a trigger (optional)
