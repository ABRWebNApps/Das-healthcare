-- Migration: Add job_title column to job_applications table
-- Date: 2024
-- Description: Adds the missing job_title column to the job_applications table
--              This column stores the job title for easier querying without joins

-- Step 1: Check if job_title column exists, if not add it
DO $$
BEGIN
    -- Check if the column already exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'job_applications' 
        AND column_name = 'job_title'
    ) THEN
        -- Add the job_title column
        ALTER TABLE job_applications ADD COLUMN job_title TEXT;
        RAISE NOTICE 'Added job_title column to job_applications table';
    ELSE
        RAISE NOTICE 'job_title column already exists in job_applications table';
    END IF;
END $$;

-- Step 2: Update existing records to populate job_title from jobs table (if any exist)
UPDATE job_applications 
SET job_title = (
    SELECT title 
    FROM jobs 
    WHERE jobs.id = job_applications.job_id
)
WHERE job_title IS NULL 
AND job_id IS NOT NULL;

-- Step 3: Add comment to document the column
COMMENT ON COLUMN job_applications.job_title IS 'Denormalized job title for easier querying without joins';

