"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const result = await submitContact(data);
    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSuccess(false), 5000);
    } else {
      alert("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We are here to help you on your journey to holistic wellness. Reach out to schedule a consultation or ask any questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Clinic Details</h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      Kadur, Chikkamagaluru<br />
                      Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Phone & WhatsApp</h3>
                    <p className="text-muted-foreground">+91 74834 52036</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Working Hours</h3>
                    <p className="text-muted-foreground">
                      Mon - Sat: 10:00 AM - 7:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">hello@dranisaclinic.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Map Placeholder */}
            <div className="h-64 bg-muted rounded-3xl overflow-hidden border border-border flex items-center justify-center text-muted-foreground">
              [Google Maps Embed]
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card text-card-foreground p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-border">
            <h2 className="text-2xl font-heading font-bold mb-6">Send an Inquiry</h2>
            
            {success ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />
                <h3 className="text-xl font-bold font-heading">Message Sent!</h3>
                <p>Thank you for reaching out. We will get back to you soon.</p>
                <Button onClick={() => setSuccess(false)} variant="outline" className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input name="name" required placeholder="Jane Doe" className="rounded-xl h-12 bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <Input name="phone" required placeholder="+91 xxxxx xxxxx" className="rounded-xl h-12 bg-background" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input name="email" type="email" required placeholder="jane@example.com" className="rounded-xl h-12 bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea name="message" required placeholder="How can we help you?" className="rounded-xl min-h-[120px] bg-background" />
                </div>
                <Button disabled={isSubmitting} type="submit" size="lg" className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-xl text-md">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
