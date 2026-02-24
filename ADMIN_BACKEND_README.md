# Admin Backend System - DAS Healthcare

A comprehensive admin backend system for managing careers and appointments, seamlessly integrated with the existing DAS Healthcare website.

## Features

### 🎯 Careers Management

- **Full CRUD Operations**: Create, read, update, and delete job postings
- **Dynamic Job Listings**: Automatic display of active jobs on the careers page
- **Slug-based Detail Pages**: Each job gets a unique URL (e.g., `/careers/senior-care-assistant`)
- **Job Status Management**: Activate/deactivate jobs with one click
- **Rich Job Information**: Support for descriptions, requirements, responsibilities, salary ranges, and application links

### 📅 Appointments Management (CRM-like)

- **Appointment Dashboard**: View all appointments with filtering by status
- **Status Management**: Confirm, reschedule, cancel, or mark appointments as completed
- **Client Information**: View client details (name, email, phone)
- **Notes System**: Add and manage notes for each appointment
- **Real-time Updates**: Automatic refresh when appointments change
- **Calendar Integration**: Date and time selection in the booking form

### 🔐 Authentication

- **Secure Login**: Admin authentication using Supabase Auth
- **Protected Routes**: All admin pages require authentication
- **Session Management**: Automatic logout and session handling

### 🎨 Design

- **Minimalist Interface**: Clean, modern design matching the existing site
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion animations for better UX
- **Consistent Branding**: Uses the same color scheme and design language

## File Structure

```
app/
├── admin/
│   ├── login/              # Admin login page
│   ├── dashboard/          # Admin dashboard with stats
│   ├── careers/            # Careers management
│   │   ├── page.tsx        # List all jobs
│   │   ├── new/            # Create new job
│   │   └── [id]/edit/      # Edit existing job
│   ├── appointments/       # Appointments management
│   └── layout.tsx         # Admin layout with sidebar
├── careers/
│   ├── page.tsx            # Public careers page (updated)
│   └── [slug]/page.tsx     # Job detail page
└── contact/
    └── page.tsx            # Contact page (with booking)

components/
├── JobListings.tsx         # Dynamic job listings component
└── FormContact.tsx         # Updated contact form with booking

lib/
├── supabase/
│   ├── client.ts          # Supabase client setup
│   └── types.ts           # TypeScript types
└── utils.ts               # Utility functions
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at https://supabase.com
2. Add your credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Set Up Database

Run the SQL commands from `DATABASE_SETUP.md` in your Supabase SQL Editor to create the necessary tables.

### 4. Create Admin User

1. Go to Authentication > Users in Supabase dashboard
2. Create a new user with email/password
3. Use these credentials to log in at `/admin/login`

## Usage

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Enter your admin credentials
3. You'll be redirected to the dashboard

### Managing Jobs

1. Go to **Careers** in the sidebar
2. Click **Create New Job** to add a job posting
3. Fill in all required fields
4. The job will automatically appear on the public careers page if marked as active
5. Use the edit/delete buttons to manage existing jobs

### Managing Appointments

1. Go to **Appointments** in the sidebar
2. Filter by status (all, pending, confirmed, etc.)
3. Click the checkmark to confirm pending appointments
4. Click the edit icon to add notes
5. Click the X to cancel appointments

### Public-Facing Features

- **Careers Page**: Automatically displays all active job postings
- **Job Detail Pages**: Each job has a unique URL with full details
- **Contact Form**: Users can book appointments directly from the contact page

## Key Features Explained

### Real-time Updates

The appointments panel uses Supabase real-time subscriptions to automatically refresh when changes occur.

### Slug Generation

Job titles are automatically converted to URL-friendly slugs (e.g., "Senior Care Assistant" → "senior-care-assistant").

### Responsive Design

All admin pages are fully responsive and work seamlessly on all device sizes.

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Public users can only view active jobs and create appointments
- Only authenticated admin users can manage jobs and appointments
- All admin routes are protected by authentication

## Next Steps

1. Customize the RLS policies to match your security requirements
2. Add email notifications for new appointments
3. Implement appointment rescheduling functionality
4. Add analytics and reporting features
5. Customize the admin dashboard with additional metrics

## Support

For issues or questions, refer to:

- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs
