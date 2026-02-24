# Database Migration Guide

## Adding Application Fields Support

This migration adds support for dynamic application forms in the job application system.

### What This Migration Does

1. **Adds `application_fields` column to `jobs` table**
   - Stores custom form field configurations per job
   - Type: JSONB (allows flexible JSON data)
   - Allows admins to customize application forms for each job

2. **Adds `custom_responses` column to `job_applications` table**
   - Stores responses to custom form fields
   - Type: JSONB (allows flexible JSON data)
   - Preserves all custom field responses from applicants

3. **Adds performance index**
   - Creates index on `created_at` for faster queries

### How to Run

1. **For Supabase:**
   - Go to your Supabase Dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `MIGRATION_ADD_APPLICATION_FIELDS.sql`
   - Click "Run" to execute

2. **For PostgreSQL (direct connection):**
   ```bash
   psql -h your-host -U your-user -d your-database -f MIGRATION_ADD_APPLICATION_FIELDS.sql
   ```

### Safety Features

- ✅ **Idempotent**: Safe to run multiple times
- ✅ **Non-destructive**: Only adds new columns, doesn't modify existing data
- ✅ **Checks before adding**: Verifies columns don't exist before creating
- ✅ **Verification query**: Shows confirmation of added columns

### After Running

1. The migration will add the columns if they don't exist
2. Existing jobs will have `NULL` for `application_fields` (can be configured later)
3. Existing applications will have `NULL` for `custom_responses` (old applications won't have custom data)
4. New jobs can now use the form builder to create custom application forms
5. New applications will store custom field responses in `custom_responses`

### Troubleshooting

If you encounter errors:

1. **"Column already exists"**: This is fine - the script checks and skips if the column exists
2. **Permission errors**: Make sure your database user has ALTER TABLE permissions
3. **Connection issues**: Verify your database connection is active

### Rollback (if needed)

If you need to remove these columns (not recommended if you have data):

```sql
-- WARNING: This will delete all custom field data
ALTER TABLE jobs DROP COLUMN IF EXISTS application_fields;
ALTER TABLE job_applications DROP COLUMN IF EXISTS custom_responses;
```

