import { AppointmentForm } from "@/components/appointment/AppointmentForm";

export const metadata = {
  title: "Book Appointment | Dr. Anisa Sarvath",
  description: "Schedule your consultation for holistic Ayurvedic healthcare.",
};

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Book Your Appointment</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Take the first step towards holistic wellness. Choose a time that works best for you, either online or in-person.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-sm mb-8">
            <div className="flex items-center gap-3 text-blue-900 dark:text-blue-200">
              <span className="text-xl">🏥</span>
              <div>
                <strong className="block font-semibold">Prefer booking on Practo?</strong>
                <span className="text-xs text-blue-700 dark:text-blue-300">Verified Practo Clinic Profile • Whitefield / Thubarahalli</span>
              </div>
            </div>
            <a
              href="https://www.practo.com/bangalore/clinic/dr-anisa-clinic-thubarahalli/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs whitespace-nowrap transition-colors shadow-sm"
            >
              Book on Practo &rarr;
            </a>
          </div>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-primary/10">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}
