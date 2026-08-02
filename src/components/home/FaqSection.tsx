import Link from "next/link";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/lib/prisma";

const fallbackFaqs = [
  {
    id: "1",
    question: "How do I choose the right PCOS doctor in Whitefield, Bangalore?",
    answer:
      "Look for a specialist with proven clinical experience in hormonal and metabolic disorders who conducts comprehensive evaluations (hormone panels, ultrasound, insulin resistance tests) and offers root-cause treatments rather than relying solely on symptomatic birth control pills.",
  },
  {
    id: "2",
    question: "Can PCOS cause permanent infertility?",
    answer:
      "No. While PCOS is a frequent cause of irregular ovulation, it is one of the most treatable fertility conditions. By restoring hormonal balance and reducing insulin resistance, most women with PCOS achieve regular ovulation and successful pregnancy.",
  },
  {
    id: "3",
    question: "When should I see a fertility specialist in Whitefield?",
    answer:
      "You should consult a specialist if you are under 35 and have been trying to conceive for 12 months without success, or after 6 months if you are over 35, or immediately if you have irregular periods, known PCOS, endometriosis, or severe menstrual cramps.",
  },
  {
    id: "4",
    question: "How does Ayurvedic treatment differ from conventional PCOS treatment?",
    answer:
      "Conventional care often prescribes hormonal contraceptives to induce artificial bleeding. Ayurveda treats the underlying metabolic cause by enhancing insulin sensitivity, clearing channel blockages (Srotoshodhana), and restoring spontaneous ovulation using natural herbs and lifestyle therapy.",
  },
  {
    id: "5",
    question: "Can Ayurvedic treatment be combined with IVF or IUI?",
    answer:
      "Yes. Dr. Anisa often recommends a 3-month Ayurvedic pre-conception protocol before undergoing IVF or IUI. This holistic preparation improves egg quality, uterine blood flow, and endometrial lining thickness, boosting overall implantation success rates.",
  },
  {
    id: "6",
    question: "How long does it take to see results with Ayurvedic PCOS treatment?",
    answer:
      "Most patients notice improvements in energy levels, acne, and digestion within 4–6 weeks. Significant hormonal stabilization and predictable ovulation typically occur over a 3–6 month structured protocol.",
  },
];

export async function FaqSection() {
  let dbFaqs: any[] = [];
  try {
    dbFaqs = await prisma.fAQ.findMany({
      orderBy: { order: "asc" },
      take: 6,
    });
  } catch (error) {
    console.error("Error fetching FAQs for home page:", error);
  }

  const displayFaqs = dbFaqs.length > 0 ? dbFaqs : fallbackFaqs;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Evidence-based answers to your most pressing questions about PCOS, natural fertility, and Ayurvedic women&apos;s healthcare in Whitefield, Bangalore.
          </p>
        </div>

        <Accordion className="w-full space-y-4">
          {displayFaqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-1 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-bold text-base md:text-lg text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-300 pb-5 leading-relaxed text-sm md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40 text-primary font-medium hover:bg-primary/5 transition-colors text-sm"
          >
            View All 12 Frequently Asked Questions &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
