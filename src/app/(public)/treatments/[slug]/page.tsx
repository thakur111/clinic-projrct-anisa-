import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, ChevronDown } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { treatmentData } from "@/data/treatments";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const treatment = treatmentData[resolvedParams.slug];

  if (!treatment) {
    return {
      title: "Treatment Not Found",
    };
  }

  return {
    title: treatment.seoTitle || `${treatment.title} Treatment`,
    description: treatment.seoDescription || treatment.description,
    openGraph: {
      title: treatment.seoTitle || `${treatment.title} Treatment | Dr. Anisa Sarvath`,
      description: treatment.seoDescription || treatment.description,
    },
    alternates: {
      canonical: `https://dranisa.in/treatments/${resolvedParams.slug}`
    }
  };
}

export default async function TreatmentDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const treatment = treatmentData[resolvedParams.slug];
  
  if (!treatment) {
    notFound();
  }

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": treatment.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Generate Medical Condition Schema
  const medicalConditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "name": treatment.title,
    "possibleTreatment": {
      "@type": "MedicalTherapy",
      "name": "Ayurvedic Treatment"
    },
    "signOrSymptom": treatment.symptoms.map((s: string) => ({
      "@type": "MedicalSymptom",
      "name": s
    }))
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Inject JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalConditionSchema) }} />

      {/* Hero */}
      <section className="bg-primary/5 pt-12 pb-20 border-b border-primary/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/treatments" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-8">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Treatments
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            {treatment.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {treatment.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-slate-900">The Ayurvedic Approach</h2>
              <div className="prose prose-lg text-slate-700 leading-relaxed max-w-none">
                {treatment.approach.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-slate-900">Common Symptoms We Treat</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {treatment.symptoms.map((symptom: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {treatment.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 list-none outline-none">
                      {faq.question}
                      <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="p-5 pt-0 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="md:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 text-center">
              <h3 className="font-heading font-bold text-xl mb-4">Start Your Healing Journey</h3>
              <p className="text-sm text-slate-500 mb-6">
                Consult with Dr. Anisa Sarvath for a personalized treatment plan.
              </p>
              <Link href="/book-appointment" className={buttonVariants({ size: "lg", className: "w-full bg-primary text-white hover:bg-primary/90 rounded-xl mb-3" })}>
                Book Consultation
              </Link>
              <Link href="/contact" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full border-primary text-primary hover:bg-primary/5 rounded-xl" })}>
                Contact Us
              </Link>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
