# Migration: Add job_title Column to job_applications Table

## Problem
The `job_applications` table is missing the `job_title` column, causing errors when submitting job applications.

## Error Message
```
Could not find the 'job_title' column of 'job_applications' in the schema cache
```

## Solution
Run the SQL migration script to add the missing column.

## Steps to Apply

1. **Open your Supabase Dashboard**
   - Go to your Supabase project
   - Navigate to **SQL Editor**

2. **Run the Migration Script**
   - Open the file: `MIGRATION_ADD_JOB_TITLE_COLUMN.sql`
   - Copy the entire SQL script
   - Paste it into the SQL Editor
   - Click **Run** or press `Ctrl+Enter`

3. **Verify the Migration**
   - The script will automatically check if the column exists
   - If it doesn't exist, it will add it
   - If it already exists, it will skip (safe to run multiple times)

## What This Migration Does

- ✅ Adds `job_title TEXT` column to `job_applications` table (if missing)
- ✅ Updates existing records to populate `job_title` from the `jobs` table
- ✅ Adds documentation comment to the column
- ✅ Safe to run multiple times (won't duplicate the column)

## After Running

After running this migration, job applications should submit successfully. The `job_title` column stores the job title for easier querying without needing to join with the `jobs` table.

## Notes

- This migration is **idempotent** - you can run it multiple times safely
- Existing applications will have their `job_title` populated from the related job
- New applications will automatically have `job_title` set when submitted

