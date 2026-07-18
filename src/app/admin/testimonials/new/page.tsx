"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createTestimonial } from "@/app/actions/cms";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      content: formData.get("content") as string,
      rating: parseInt(formData.get("rating") as string) || 5,
      published: true,
    };

    const result = await createTestimonial(data);
    if (result.success) {
      router.push("/admin/testimonials");
    } else {
      alert("Failed to create testimonial");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/testimonials" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Add Testimonial</h1>
          <p className="text-slate-500 mt-1">Manually add a patient success story.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Patient Name (or Initials)</label>
              <Input name="name" required placeholder="e.g. Sarah J." className="text-lg py-6" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Testimonial Content</label>
              <Textarea name="content" required placeholder="Type the patient's review here..." className="min-h-[150px]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Rating (1-5)</label>
              <Input name="rating" type="number" min="1" max="5" defaultValue="5" required />
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full bg-primary text-white h-12">
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Testimonial"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
