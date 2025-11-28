-- Migration Script: Add Application Fields Support
-- Run this script on your production database to add support for dynamic application forms
-- This script is safe to run on existing databases

-- Step 1: Add application_fields column to jobs table
-- This column stores the custom form field configuration for each job
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'jobs' 
        AND column_name = 'application_fields'
    ) THEN
        ALTER TABLE jobs ADD COLUMN application_fields JSONB;
        RAISE NOTICE 'Added application_fields column to jobs table';
    ELSE
        RAISE NOTICE 'application_fields column already exists in jobs table';
    END IF;
END $$;

-- Step 2: Add custom_responses column to job_applications table
-- This column stores the responses to custom form fields
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'job_applications' 
        AND column_name = 'custom_responses'
    ) THEN
        ALTER TABLE job_applications ADD COLUMN custom_responses JSONB;
        RAISE NOTICE 'Added custom_responses column to job_applications table';
    ELSE
        RAISE NOTICE 'custom_responses column already exists in job_applications table';
    END IF;
END $$;

-- Step 3: Add index for better query performance (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at 
ON job_applications(created_at);

-- Verification: Check that columns were added successfully
SELECT 
    'jobs' as table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'jobs' 
AND column_name IN ('application_fields')
UNION ALL
SELECT 
    'job_applications' as table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'job_applications' 
AND column_name IN ('custom_responses');

