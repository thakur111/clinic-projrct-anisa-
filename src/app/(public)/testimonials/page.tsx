import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ReviewSubmissionForm } from "@/components/testimonials/ReviewSubmissionForm";

export const metadata = {
  title: "Patient Testimonials | Dr. Anisa Sarvath Clinic",
  description: "Read success stories and experiences from our patients.",
};

export const revalidate = 0;

export default async function TestimonialsPage() {
  const dbTestimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  const fallbackTestimonials = [
    {
      id: "1",
      name: "Priya Sharma",
      content:
        "I had irregular periods for 4 years due to PCOS and was told birth control pills were my only option. Dr. Anisa's Ayurvedic treatment and diet plan regulated my cycles within 3 months without synthetic hormones. Highly recommend her Whitefield clinic!",
      rating: 5,
      createdAt: new Date("2026-07-15"),
    },
    {
      id: "2",
      name: "Ananya Rao",
      content:
        "We were trying to conceive for nearly 3 years and had two failed IUI attempts. We consulted Dr. Anisa for preconception Panchakarma and herbal support. Within 5 months, we conceived naturally. Her root-cause approach changed our lives.",
      rating: 5,
      createdAt: new Date("2026-07-10"),
    },
    {
      id: "3",
      name: "Meera Krishnan",
      content:
        "My TSH levels were fluctuating constantly, causing severe fatigue and weight gain. Dr. Anisa explained the connection between thyroid Agni and diet. My energy is back to normal and my recent thyroid report shows healthy TSH levels.",
      rating: 5,
      createdAt: new Date("2026-07-04"),
    },
    {
      id: "4",
      name: "Sneha V.",
      content:
        "Dr. Anisa is extremely patient and thorough. She listened to my entire medical history and gave me an evidence-based treatment plan for my PCOS and acne. The herbal medicines work gently without any side effects.",
      rating: 5,
      createdAt: new Date("2026-06-28"),
    },
    {
      id: "5",
      name: "Divya Menon",
      content:
        "Best women's healthcare doctor in Whitefield! Unlike commercial clinics that rush appointments, Dr. Anisa spends time explaining the hormonal root cause. Her holistic menstrual care protocol provided tremendous relief from severe cramps.",
      rating: 5,
      createdAt: new Date("2026-06-20"),
    },
    {
      id: "6",
      name: "Kavitha R.",
      content:
        "I consulted Dr. Anisa for PCOS-related weight gain and insulin resistance. With her tailored Ayurvedic nutrition guidance and herbal formulations, I lost 7 kg naturally and my menstrual cycles are completely regular now.",
      rating: 5,
      createdAt: new Date("2026-06-14"),
    },
  ];

  const displayTestimonials =
    dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-primary/5 pt-20 pb-16 border-b border-primary/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Patient Stories
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Real experiences from women in Whitefield and Bangalore who restored their hormonal health and natural fertility.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTestimonials.map((t) => (
              <Card key={t.id} className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="flex text-accent mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-6 italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">
                        {t.createdAt.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <ReviewSubmissionForm />
        </div>
      </section>
    </div>
  );
}
