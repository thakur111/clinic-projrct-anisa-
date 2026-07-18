"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Input } from "./input";
import { Button } from "./button";
import { createWhatsAppLead } from "@/app/actions/whatsapp";

export function WhatsAppWidget({ phoneNumber = "+917483452036" }: { phoneNumber?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Allow other components to trigger the widget
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-whatsapp-widget', handleOpen);
    return () => window.removeEventListener('open-whatsapp-widget', handleOpen);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
    };

    // Save lead to database
    await createWhatsAppLead(data);

    // Redirect to WhatsApp
    const message = encodeURIComponent(`Hi, this is ${data.name}. I would like to inquire about Dr. Anisa's Clinic.`);
    // Clean phone number (remove +, spaces, dashes)
    const cleanPhone = phoneNumber.replace(/[\s\-\+]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");

    setIsSubmitting(false);
    setIsOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Pre-Chat Form Popup */}
      {isOpen && (
        <Card className="w-80 mb-4 shadow-xl border-emerald-100 animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-emerald-500 text-white rounded-t-lg pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Chat
              </CardTitle>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-emerald-50 text-xs mt-1 leading-relaxed">
              Please enter your details before starting the chat so our admin team can follow up with you.
            </p>
          </CardHeader>
          <CardContent className="p-4 bg-white rounded-b-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Full Name</label>
                <Input name="name" required placeholder="e.g. John Doe" className="h-9" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Phone Number</label>
                <Input name="phone" required placeholder="e.g. 9876543210" className="h-9" />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                {isSubmitting ? "Connecting..." : (
                  <>
                    Start Chat <Send className="h-3 w-3 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}
      </button>
    </div>
  );
}
