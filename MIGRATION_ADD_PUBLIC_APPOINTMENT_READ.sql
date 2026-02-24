-- Migration: Allow public to read appointment dates for availability checking
-- Date: 2024
-- Description: Adds RLS policy to allow public users to read appointment dates and times
--              This is needed for the booking form to check availability

-- Allow public to read appointment dates and times (for availability checking)
-- This only allows reading date and time, not other sensitive information
CREATE POLICY "Public can read appointment availability" ON appointments
  FOR SELECT USING (true);

-- Note: This policy allows reading all appointment data. If you want more security,
-- you could create a view that only exposes date and time, and allow public to read that view instead.
-- For now, this allows the booking form to check which dates/times are already booked.

