import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Patient Testimonials | Dr. Anisa Sarvath Clinic",
  description: "Read success stories and experiences from our patients.",
};

export const revalidate = 0;

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-primary/5 pt-20 pb-16 border-b border-primary/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Patient Stories
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Real experiences from people who have embraced Ayurveda to heal naturally and restore their health.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                <p>New patient stories are being updated. Check back soon!</p>
              </div>
            ) : (
              testimonials.map((t) => (
                <Card key={t.id} className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex text-accent mb-4">
                      {[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-6 italic">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-xs text-slate-500">
                          {t.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
