import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "FAQ | Dr. Anisa Sarvath Clinic",
  description: "Evidence-based answers to frequently asked questions on PCOS, infertility, thyroid, and Ayurvedic women's healthcare in Whitefield, Bangalore.",
};

export const revalidate = 0;

export default async function FAQPage() {
  const dbFaqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });

  const fallbackFaqs = [
    {
      id: "1",
      question: "How do I choose the right PCOS doctor in Whitefield, Bangalore?",
      answer:
        "Look for a specialist with proven clinical experience in hormonal and metabolic disorders who conducts comprehensive evaluations (hormone panels, ultrasound, insulin resistance tests) and offers root-cause treatments rather than relying solely on symptomatic birth control pills.",
      category: "PCOS",
    },
    {
      id: "2",
      question: "Can PCOS cause permanent infertility?",
      answer:
        "No. While PCOS is a frequent cause of irregular ovulation, it is one of the most treatable fertility conditions. By restoring hormonal balance and reducing insulin resistance, most women with PCOS achieve regular ovulation and successful pregnancy.",
      category: "Infertility",
    },
    {
      id: "3",
      question: "When should I see a fertility specialist in Whitefield?",
      answer:
        "You should consult a specialist if you are under 35 and have been trying to conceive for 12 months without success, or after 6 months if you are over 35, or immediately if you have irregular periods, known PCOS, endometriosis, or severe menstrual cramps.",
      category: "Infertility",
    },
    {
      id: "4",
      question: "How does Ayurvedic treatment differ from conventional PCOS treatment?",
      answer:
        "Conventional care often prescribes hormonal contraceptives to induce artificial bleeding. Ayurveda treats the underlying metabolic cause by enhancing insulin sensitivity, clearing channel blockages (Srotoshodhana), and restoring spontaneous ovulation using natural herbs and lifestyle therapy.",
      category: "PCOS",
    },
    {
      id: "5",
      question: "Can Ayurvedic treatment be combined with IVF or IUI?",
      answer:
        "Yes. Dr. Anisa often recommends a 3-month Ayurvedic pre-conception protocol before undergoing IVF or IUI. This holistic preparation improves egg quality, uterine blood flow, and endometrial lining thickness, boosting overall implantation success rates.",
      category: "Treatments",
    },
    {
      id: "6",
      question: "Is PCOS curable with Ayurveda?",
      answer:
        "PCOS is a metabolic endocrine condition. While not cured like an acute infection, it can be put into long-term clinical remission where menstrual cycles remain regular, hormones stay balanced, and symptoms like acne or hair fall disappear.",
      category: "PCOS",
    },
    {
      id: "7",
      question: "What are the early warning signs of female infertility?",
      answer:
        "Key signs include irregular cycles (<21 days or >35 days), absent periods, severe pelvic pain during menstruation, unexplained hormonal weight gain, or difficulty conceiving after 6–12 months of unprotected intercourse.",
      category: "Infertility",
    },
    {
      id: "8",
      question: "How long does it take to see results with Ayurvedic PCOS treatment?",
      answer:
        "Most patients notice improvements in energy levels, acne, and digestion within 4–6 weeks. Significant hormonal stabilization and predictable ovulation typically occur over a 3–6 month structured protocol.",
      category: "PCOS",
    },
    {
      id: "9",
      question: "What is Panchakarma and how does it help fertility?",
      answer:
        "Panchakarma is a deep cellular detoxification program. In gynecology, specialized protocols like Uttara Basti clear pelvic inflammation, remove metabolic wastes (Ama), and nourish the uterine lining (Kshetra) for successful conception.",
      category: "Treatments",
    },
    {
      id: "10",
      question: "Do I need to follow a strict diet during treatment?",
      answer:
        "Yes, diet (Ahara) is considered half the medicine in Ayurveda. Your treatment plan will include tailored anti-inflammatory, low-glycemic dietary guidelines designed to stabilize insulin and support hormone production.",
      category: "General",
    },
    {
      id: "11",
      question: "Are your medicines safe to take with allopathic drugs?",
      answer:
        "Generally, yes, but it is crucial that you disclose all current medications during your consultation so Dr. Anisa can ensure there are no contraindications.",
      category: "Medicine",
    },
    {
      id: "12",
      question: "Do you offer online video consultations?",
      answer:
        "Yes! We offer video and audio consultations for patients across Bangalore and India who cannot visit the Whitefield clinic in person. Custom herbal formulations are delivered directly to your doorstep.",
      category: "Booking",
    },
  ];

  const displayFaqs = dbFaqs.length > 0 ? dbFaqs : fallbackFaqs;

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-primary/5 pt-20 pb-16 border-b border-primary/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Evidence-based answers to common questions on PCOS, fertility, thyroid health, and Ayurvedic women&apos;s healthcare in Whitefield, Bangalore.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <Accordion className="w-full space-y-4">
            {displayFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left font-bold text-lg text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
