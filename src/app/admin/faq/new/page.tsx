"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createFAQ } from "@/app/actions/cms";

export default function NewFAQPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      category: formData.get("category") as string || "General",
    };

    const result = await createFAQ(data);
    if (result.success) {
      router.push("/admin/faq");
    } else {
      alert("Failed to create FAQ");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/faq" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Add New FAQ</h1>
          <p className="text-slate-500 mt-1">Create a new frequently asked question.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Question</label>
              <Input name="question" required placeholder="e.g. What is Panchakarma?" className="text-lg py-6" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Answer</label>
              <Textarea name="answer" required placeholder="Provide a detailed helpful answer..." className="min-h-[150px]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <Input name="category" placeholder="e.g. Treatments, General, Diet" />
            </div>

            <Button disabled={isSubmitting} type="submit" className="w-full bg-primary text-white h-12">
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Question"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
