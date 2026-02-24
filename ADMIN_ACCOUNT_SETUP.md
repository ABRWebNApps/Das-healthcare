# Admin Account Setup Guide

There are **two ways** to create an admin account for the DAS Healthcare admin backend:

## Method 1: Using the Signup Page (Recommended - Easiest)

1. **Navigate to the signup page:**
   ```
   http://localhost:3000/admin/signup
   ```

2. **Fill in the form:**
   - Enter your email address (e.g., `admin@dashealthcare.com`)
   - Enter a password (minimum 6 characters)
   - Confirm your password

3. **Click "Create Account"**

4. **You'll be automatically logged in** and redirected to the dashboard!

## Method 2: Using Supabase Dashboard

1. **Go to your Supabase Dashboard:**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Navigate to Authentication:**
   - Click on **"Authentication"** in the left sidebar
   - Click on **"Users"** tab

3. **Create a new user:**
   - Click the **"Add user"** or **"Create new user"** button
   - Choose **"Create user"** option
   - Enter:
     - **Email**: Your admin email (e.g., `admin@dashealthcare.com`)
     - **Password**: A secure password (minimum 6 characters)
   - **Uncheck** "Auto Confirm User" if you want email verification (or leave it checked to skip)
   - Click **"Create user"**

4. **Login with your credentials:**
   - Go to `http://localhost:3000/admin/login`
   - Enter the email and password you just created
   - Click "Login"

## Important Notes

### Email Confirmation
- If email confirmation is enabled in Supabase, you may need to:
  1. Check your email for a confirmation link
  2. Click the link to verify your account
  3. Then login

### Disable Email Confirmation (For Development)
If you want to skip email confirmation during development:

1. Go to **Authentication > Settings** in Supabase
2. Under **"Email Auth"**, find **"Enable email confirmations"**
3. **Toggle it OFF** (for development only)
4. Save changes

### Password Requirements
- Minimum 6 characters
- For better security, use a strong password with:
  - At least 8 characters
  - Mix of uppercase and lowercase letters
  - Numbers and special characters

## Troubleshooting

### "Invalid login credentials"
- Make sure you're using the correct email and password
- Check if email confirmation is required and verify your email
- Try resetting your password in Supabase dashboard

### "User already registered"
- The email is already in use
- Try logging in instead of signing up
- Or use a different email address

### Can't access admin panel after login
- Make sure your Supabase environment variables are set correctly in `.env.local`
- Check browser console for any errors
- Verify the database tables are created (see `DATABASE_SETUP.md`)

## Security Recommendations

1. **Use strong passwords** for admin accounts
2. **Enable email confirmation** in production
3. **Limit admin access** to trusted personnel only
4. **Regularly review** admin users in Supabase dashboard
5. **Use environment variables** for Supabase credentials (never commit them to git)

## Quick Start Checklist

- [ ] Supabase project created
- [ ] Environment variables added to `.env.local`
- [ ] Database tables created (see `DATABASE_SETUP.md`)
- [ ] Admin account created (via signup page or Supabase dashboard)
- [ ] Successfully logged in at `/admin/login`
- [ ] Can access dashboard at `/admin/dashboard`

---

**Need help?** Check the main `ADMIN_BACKEND_README.md` for more information.

