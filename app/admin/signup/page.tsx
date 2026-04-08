import { redirect } from "next/navigation";

// Signup is disabled — admin accounts are managed directly via Supabase.
export default function AdminSignup() {
  redirect("/admin/login");
}
