import Navbar from "@/components/Navigation";
import ModernBookingForm from "@/components/ModernBookingForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <main className="relative">
        <Navbar />
        <div className="pt-20">
          <ModernBookingForm />
        </div>
      </main>
    </div>
  );
}
