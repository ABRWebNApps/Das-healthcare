export interface JobPost {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Temporary";
  description: string;
  requirements: string[];
  responsibilities: string[];
  application_link?: string;
  salary_range?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  subject: string;
  reason: string;
  department: string;
  appointment_date: string;
  appointment_time: string;
  status: "pending" | "confirmed" | "rescheduled" | "cancelled" | "completed";
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  appointment_count: number;
  last_appointment?: string;
  created_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  job_title?: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  cover_letter?: string;
  files: string[];
  status: "pending" | "reviewed" | "approved" | "declined";
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  response?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}
