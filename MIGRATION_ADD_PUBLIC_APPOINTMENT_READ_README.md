# Migration: Allow Public to Read Appointment Availability

## Problem
The frontend booking form cannot see which dates are already booked because Row Level Security (RLS) policies only allow public users to INSERT appointments, but not SELECT (read) them.

## Solution
This migration adds a policy that allows public users to read appointment data, which is needed for the booking calendar to show which dates are booked.

## Steps to Apply

1. **Open your Supabase Dashboard**
   - Go to your Supabase project
   - Navigate to **SQL Editor**

2. **Run the Migration Script**
   - Open the file: `MIGRATION_ADD_PUBLIC_APPOINTMENT_READ.sql`
   - Copy the entire SQL script
   - Paste it into the SQL Editor
   - Click **Run** or press `Ctrl+Enter`

3. **Verify the Migration**
   - The policy will be created automatically
   - You can verify it worked by checking the Policies section in Supabase

## What This Migration Does

- ✅ Adds a policy allowing public users to SELECT (read) appointments
- ✅ This allows the frontend booking form to check which dates/times are booked
- ✅ The booking calendar will now correctly show booked dates in red

## Security Note

This policy allows public users to read all appointment data. If you need more security, you could:
- Create a database view that only exposes `appointment_date` and `appointment_time`
- Allow public to read only that view
- Keep the main appointments table restricted

For most use cases, allowing public to see appointment dates/times is acceptable since this information is needed for booking availability.

## After Running

After running this migration:
1. The frontend booking form will be able to fetch booked appointments
2. Booked dates will appear in red on the calendar
3. Available dates will appear in green
4. Users won't be able to select already booked dates

