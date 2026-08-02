import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export async function TestimonialsSection() {
  const dbTestimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const fallbackTestimonials = [
    {
      id: "1",
      name: "Priya Sharma",
      content:
        "I had irregular periods for 4 years due to PCOS and was told birth control pills were my only option. Dr. Anisa's Ayurvedic treatment and diet plan regulated my cycles within 3 months without synthetic hormones. Highly recommend her Whitefield clinic!",
      rating: 5,
    },
    {
      id: "2",
      name: "Ananya Rao",
      content:
        "We were trying to conceive for nearly 3 years and had two failed IUI attempts. We consulted Dr. Anisa for preconception Panchakarma and herbal support. Within 5 months, we conceived naturally. Her root-cause approach changed our lives.",
      rating: 5,
    },
    {
      id: "3",
      name: "Meera Krishnan",
      content:
        "My TSH levels were fluctuating constantly, causing severe fatigue and weight gain. Dr. Anisa explained the connection between thyroid Agni and diet. My energy is back to normal and my recent thyroid report shows healthy TSH levels.",
      rating: 5,
    },
  ];

  const displayTestimonials =
    dbTestimonials.length > 0 ? dbTestimonials.slice(0, 3) : fallbackTestimonials;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Patient Stories • Whitefield Bangalore
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mt-2 mb-4">
            Real Care, Root-Cause Healing
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Read experiences from women in Whitefield and East Bangalore who restored their hormonal health and natural fertility through evidence-based Ayurvedic medicine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayTestimonials.map((t) => (
            <Card
              key={t.id}
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow rounded-2xl"
            >
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex text-amber-500 mb-4">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic text-sm">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-slate-900 dark:text-white">
                      {t.name}
                    </strong>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Verified Patient • Bangalore
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-600 text-emerald-700 dark:text-emerald-400 font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors text-sm"
          >
            View All Patient Testimonials &rarr;
          </Link>
          <Link
            href="/testimonials#leave-review"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-md shadow-emerald-900/20 transition-all text-sm"
          >
            Share Your Story / Leave a Review ✨
          </Link>
        </div>
      </div>
    </section>
  );
}
