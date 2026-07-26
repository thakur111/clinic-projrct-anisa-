"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { submitContact } from "@/app/actions/contact";

export function BookingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Auto-popup after 3 seconds for new visitors (once per session)
    const hasSeenPopup = sessionStorage.getItem('bookingPopupShown');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('bookingPopupShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const age = formData.get("age") as string;
    const rawMessage = formData.get("message") as string;
    
    // Combine age and message since our DB schema for ContactRequest doesn't have an age field natively
    const formattedMessage = `Age: ${age}\n\nMessage: ${rawMessage}`;

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formattedMessage,
    };

    const res = await submitContact(data);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 3000);
    }
    
    setIsSubmitting(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="text-slate-500 font-medium tracking-wide text-sm uppercase mb-2">
              Heal from Within. Live Without Limits.
            </p>
            <h2 className="text-3xl font-bold text-[#7CB342] tracking-tight">
              BOOK AN APPOINTMENT
            </h2>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {success ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-emerald-600 mb-2">Request Sent Successfully!</h3>
              <p className="text-slate-600">Our team will contact you shortly to confirm your appointment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  required 
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7CB342]/50 focus:border-[#7CB342] transition-all placeholder:text-slate-400"
                />
                <input 
                  type="number" 
                  name="age" 
                  placeholder="Age" 
                  required 
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7CB342]/50 focus:border-[#7CB342] transition-all placeholder:text-slate-400"
                />
              </div>
              
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7CB342]/50 focus:border-[#7CB342] transition-all placeholder:text-slate-400"
              />
              
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone Number" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7CB342]/50 focus:border-[#7CB342] transition-all placeholder:text-slate-400"
              />
              
              <textarea 
                name="message" 
                placeholder="Messages..." 
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7CB342]/50 focus:border-[#7CB342] transition-all placeholder:text-slate-400 resize-none"
              ></textarea>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto mx-auto block px-10 py-3 bg-[#7CB342] hover:bg-[#689F38] text-white font-bold rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
