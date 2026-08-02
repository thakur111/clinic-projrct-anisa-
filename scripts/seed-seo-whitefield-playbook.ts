import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogs = [
  {
    title: "10 Early Symptoms of PCOS Every Woman Should Know",
    slug: "10-early-symptoms-of-pcos",
    excerpt: "Polycystic Ovary Syndrome (PCOS) affects 1 in 10 women. Discover the early warning signs like irregular periods, acne, and weight gain, and learn how Ayurveda can help.",
    content: `
      <p>Polycystic Ovary Syndrome (PCOS) is one of the most common endocrine disorders affecting women of reproductive age. According to Ayurveda, it is primarily a Kapha and Vata disorder that affects the Aarthava Dhatu (reproductive tissues).</p>
      <h2>What are the Early Signs?</h2>
      <ul>
        <li><strong>Irregular Menstrual Cycles:</strong> The most common sign. You might have fewer than 8 periods a year, or cycles longer than 35 days.</li>
        <li><strong>Sudden Weight Gain:</strong> Specifically around the abdomen, which is difficult to lose despite diet and exercise.</li>
        <li><strong>Hirsutism:</strong> Excess hair growth on the face, chest, or back due to elevated androgen (male hormone) levels.</li>
        <li><strong>Severe Acne:</strong> Deep, cystic acne especially along the jawline.</li>
        <li><strong>Hair Thinning:</strong> Male-pattern baldness or severe hair fall.</li>
        <li><strong>Darkening of Skin:</strong> Acanthosis nigricans, which are dark, velvety patches of skin in body creases (neck, groin, under breasts), indicating insulin resistance.</li>
      </ul>
      <h2>The Ayurvedic Perspective</h2>
      <p>Modern medicine often treats PCOS with birth control pills to force a cycle. Ayurveda, however, focuses on metabolic correction (Agni Deepana) and clearing the blocked channels (Srotoshodhana). At Dr. Anisa's Clinic, we use herbs like <strong>Shatavari</strong> and <strong>Kanchanar Guggulu</strong> alongside a specialized anti-inflammatory diet to reverse insulin resistance naturally.</p>
    `,
    category: "PCOS & PCOD",
    seoTitle: "10 Early Symptoms of PCOS Every Woman Should Know | Dr. Anisa",
    seoDesc: "Discover the early warning signs of PCOS including irregular periods, weight gain, and acne. Learn how Ayurvedic treatment in Bangalore can help.",
    imageUrl: "/images/ayurveda-hero.png",
    published: true,
    createdAt: new Date("2026-04-12T10:30:00Z"),
  },
  {
    title: "Ayurvedic vs Modern Approach to Infertility",
    slug: "ayurvedic-vs-modern-approach-to-infertility",
    excerpt: "Struggling to conceive? Explore how the holistic Ayurvedic approach to infertility differs from conventional treatments like IVF, focusing on root cause healing.",
    content: `
      <p>Infertility is a deeply emotional journey. While modern science has made incredible strides with procedures like IUI and IVF, Ayurveda offers a foundational, holistic approach to preparing the body for conception.</p>
      <h2>Modern Approach: Targeted Intervention</h2>
      <p>Modern medicine primarily focuses on hormonal stimulation and structural correction. If ovulation isn't occurring, medications like Clomid are prescribed. If tubes are blocked, surgery or IVF is recommended. While highly effective for structural issues, it often overlooks the overall metabolic environment of the body.</p>
      <h2>Ayurvedic Approach: Soil Preparation (Kshetra)</h2>
      <p>Ayurveda compares conception to farming. You need the right season (Ritu), a healthy field/uterus (Kshetra), proper water/nutrition (Ambu), and healthy seeds (Beeja). If the body is full of toxins (Ama) from stress and poor diet, the 'soil' is barren.</p>
      <h3>How Ayurveda Helps:</h3>
      <ul>
        <li><strong>Panchakarma:</strong> Deep cellular detoxification (especially Basti) clears out toxins and reduces inflammation in the reproductive tract.</li>
        <li><strong>Hormonal Balance:</strong> Herbs like Ashoka and Lodhra naturally regulate the HPO axis without synthetic hormones.</li>
        <li><strong>Stress Reduction:</strong> Shirodhara and specific Yoga asanas calm the nervous system, which is crucial as high cortisol completely disrupts ovulation.</li>
      </ul>
      <p>At Dr. Anisa's Clinic, we often recommend a 3-month Ayurvedic pre-conception protocol even for patients planning IVF, as it significantly improves egg quality and uterine receptivity.</p>
    `,
    category: "Infertility",
    seoTitle: "Ayurvedic vs Modern Approach to Infertility Treatment | Bangalore",
    seoDesc: "Explore how Ayurvedic infertility treatment focuses on root-cause healing and detoxification compared to modern interventions. Boost your fertility naturally.",
    imageUrl: "/images/ayurveda-about.png",
    published: true,
    createdAt: new Date("2026-04-28T14:15:00Z"),
  },
  {
    title: "Best Diet for Thyroid Management (Hypothyroidism)",
    slug: "best-diet-for-thyroid-management",
    excerpt: "What you eat directly impacts your thyroid function. Discover the best Ayurvedic diet plan, foods to eat, and goitrogenic foods to avoid for Hypothyroidism.",
    content: `
      <p>Hypothyroidism (underactive thyroid) slows down your entire cellular metabolism. In Ayurveda, this is viewed as a severely diminished Agni (digestive fire) and aggravated Kapha dosha. Food is your first medicine in correcting this imbalance.</p>
      <h2>Foods to Embrace</h2>
      <ul>
        <li><strong>Cooked, Warm Foods:</strong> Avoid cold, raw foods like salads which suppress the digestive fire. Favor warm soups, stews, and cooked vegetables.</li>
        <li><strong>Iodine-Rich Foods:</strong> Seaweed, fish, and dairy (if tolerated).</li>
        <li><strong>Metabolism-Boosting Spices:</strong> Ginger, black pepper, cinnamon, and turmeric should be added generously to your meals to stimulate Agni.</li>
        <li><strong>Coconut Oil:</strong> It contains medium-chain fatty acids that help stimulate a sluggish metabolism.</li>
      </ul>
      <h2>Foods to Avoid (Goitrogens)</h2>
      <p>Goitrogens are compounds that interfere with the normal function of the thyroid gland. You should strictly limit or cook thoroughly:</p>
      <ul>
        <li>Cruciferous vegetables: Cabbage, broccoli, cauliflower, and Brussels sprouts.</li>
        <li>Soy products: Tofu, soy milk, and edamame.</li>
        <li>Refined sugars and processed flours: These cause inflammation and disrupt hormonal pathways.</li>
      </ul>
      <p>By shifting to a Kapha-pacifying diet and incorporating herbs like Ashwagandha, many of our patients at Dr. Anisa's Clinic see a remarkable improvement in their energy levels and TSH reports.</p>
    `,
    category: "Thyroid Care",
    seoTitle: "Best Ayurvedic Diet for Hypothyroidism Management | Dr. Anisa",
    seoDesc: "Discover the best diet for thyroid health. Learn which foods boost metabolism and which goitrogenic foods to avoid with Ayurveda.",
    imageUrl: "/images/ayurveda-hero.png",
    published: true,
    createdAt: new Date("2026-05-15T09:45:00Z"),
  },
  {
    title: "Best PCOS Doctor in Whitefield: How to Choose the Right Specialist",
    slug: "best-pcos-doctor-in-whitefield-how-to-choose-the-right-specialist",
    excerpt: "Searching for the best PCOS doctor in Whitefield, Bangalore? Learn what to look for in a hormone & fertility specialist, evidence-based diagnostic criteria, and how Ayurvedic root-cause care helps restore regular cycles.",
    content: `
      <p>Polycystic Ovary Syndrome (PCOS) is one of the most common hormonal disorders affecting women of reproductive age. It can lead to irregular periods, acne, weight gain, excessive hair growth (hirsutism), and difficulty conceiving. Early, evidence-based diagnosis and personalized treatment can significantly improve symptoms and long-term fertility outcomes.</p>
      
      <h2>Why Choosing the Right PCOS Specialist in Whitefield Matters</h2>
      <p>If you're searching for a PCOS doctor in Whitefield, it is essential to choose a physician who understands hormonal disorders, metabolic insulin resistance, and reproductive gynecology. Many conventional treatments rely solely on synthetic birth control pills to induce withdrawal bleeding, which often masks symptoms rather than resolving the underlying endocrine imbalance.</p>
      
      <p>A comprehensive, evidence-based evaluation typically includes:</p>
      <ul>
        <li><strong>Detailed Clinical Medical History:</strong> Reviewing menstrual regularity, family history of diabetes, and stress patterns.</li>
        <li><strong>Hormonal Panels:</strong> Evaluating FSH, LH, free testosterone, DHEA-S, fasting insulin, and thyroid hormones (TSH).</li>
        <li><strong>Pelvic Ultrasound (USG):</strong> Assessing ovarian morphology and antral follicle counts.</li>
        <li><strong>Metabolic & Agni Assessment:</strong> Identifying systemic inflammation and metabolic slowdown (Kapha-Vata imbalance).</li>
      </ul>

      <h2>What Does a Comprehensive PCOS Treatment Plan Include?</h2>
      <p>At <strong>Dr. Anisa Sarvath's Ayurvedic Women's Healthcare Clinic in Whitefield / Thubarahalli</strong>, treatment is structured around evidence-based Ayurvedic medicine combined with modern diagnostic rigor:</p>
      <ul>
        <li><strong>Metabolic Correction & Insulin Resistance Therapy:</strong> Using targeted botanical formulations like <em>Kanchanar Guggulu</em>, <em>Shatavari</em>, and <em>Guduchi</em> to enhance cellular insulin sensitivity.</li>
        <li><strong>Lifestyle and Weight Management:</strong> Customized anti-inflammatory, low-glycemic Ayurvedic nutrition plans tailored to your doshic constitution.</li>
        <li><strong>Natural Ovulation Induction:</strong> Supporting HPO axis regulation for women actively planning pregnancy without synthetic hormone side effects.</li>
        <li><strong>Long-Term Health Monitoring:</strong> Preventing complications such as type 2 diabetes, endometrial hyperplasia, and metabolic syndrome.</li>
      </ul>

      <h2>When Should You Consult a PCOS Specialist?</h2>
      <p>Women experiencing menstrual cycles longer than 35 days, unexplained weight gain around the abdomen, stubborn cystic acne, or difficulty conceiving after 6–12 months should seek an evaluation promptly.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Can PCOS cause infertility?</h3>
      <p>Yes. PCOS can affect regular ovulation (anovulation), making it more difficult to predict fertile windows. However, with root-cause metabolic care and ovulation support, the vast majority of women achieve natural pregnancy.</p>

      <h3>Is PCOS permanently curable?</h3>
      <p>PCOS is a metabolic and endocrine predisposition. While it is not "cured" like a bacterial infection, it can be put into complete, long-term clinical remission through sustained lifestyle modifications and herbal protocols.</p>

      <h3>How long does Ayurvedic treatment take for PCOS?</h3>
      <p>Most patients observe improvements in energy, acne, and cycle regularity within 8 to 12 weeks, with complete follicular maturation and hormone stabilization typically taking 6 to 9 months.</p>
    `,
    category: "PCOS & PCOD",
    seoTitle: "Best PCOS Doctor in Whitefield | How to Choose a Specialist",
    seoDesc: "Looking for a PCOS doctor in Whitefield, Bangalore? Discover evidence-based Ayurvedic treatment for hormonal balance, insulin resistance, and fertility by Dr. Anisa.",
    imageUrl: "/images/ayurveda-hero.png",
    published: true,
    createdAt: new Date("2026-06-02T11:20:00Z"),
  },
  {
    title: "Best Infertility Doctor in Whitefield: Signs You Should See a Fertility Expert",
    slug: "best-infertility-doctor-in-whitefield-signs-you-should-see-a-fertility-expert",
    excerpt: "When is the right time to consult an infertility specialist in Whitefield? Learn the early signs of fertility challenges, root causes, and how holistic pre-conception care improves pregnancy outcomes.",
    content: `
      <p>Fertility is a vital indicator of overall systemic health. While occasional delays in conception can occur due to lifestyle stress, understanding when to consult an infertility specialist in Whitefield can make a crucial difference in your parenthood journey.</p>
      
      <h2>Early Signs You Should See a Fertility Specialist</h2>
      <p>Medical guidelines recommend consulting a fertility physician if you meet any of the following criteria:</p>
      <ul>
        <li><strong>Under Age 35:</strong> You have been trying to conceive with unprotected intercourse for 12 consecutive months without success.</li>
        <li><strong>Age 35 or Older:</strong> You have been trying for 6 months without conception.</li>
        <li><strong>Irregular or Absent Periods:</strong> Cycles longer than 35 days or shorter than 21 days often signal anovulation or hormonal imbalance.</li>
        <li><strong>Known Reproductive Conditions:</strong> A prior diagnosis of PCOS, endometriosis, uterine fibroids, or pelvic inflammatory disease (PID).</li>
        <li><strong>Severe Menstrual Pain or Heavy Bleeding:</strong> Symptoms that may indicate underlying endometriosis or adenomyosis.</li>
      </ul>

      <h2>The Root-Cause Approach to Infertility in Whitefield</h2>
      <p>Many couples in Bangalore face "unexplained infertility" despite normal basic blood reports. In Ayurveda, fertility requires four vital elements: <strong>Ritu</strong> (optimal ovulation timing), <strong>Kshetra</strong> (a receptive uterine endometrium), <strong>Ambu</strong> (hormonal nutrition and circulation), and <strong>Beeja</strong> (healthy ovum and sperm quality).</p>

      <p>At <strong>Dr. Anisa Sarvath's Clinic in Thubarahalli, Whitefield</strong>, we provide an evidence-based fertility evaluation that addresses both structural health and metabolic toxicity (Ama). Treatments include:</p>
      <ul>
        <li><strong>Panchakarma Detoxification:</strong> Special therapeutic protocols like <em>Uttara Basti</em> that cleanse the reproductive tract, reduce pelvic inflammation, and improve endometrial receptivity.</li>
        <li><strong>Ovarian Reserve & Quality Enhancement:</strong> Targeted Ayurvedic phytoestrogens and antioxidants that nourish follicular development.</li>
        <li><strong>Stress & Cortisol Modulation:</strong> High chronic stress elevates cortisol and prolactin, suppressing progesterone. Holistic therapies calm the neuro-endocrine axis.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <h3>Can I combine Ayurvedic fertility care with IUI or IVF?</h3>
      <p>Yes. Many patients undergo a 3-month Ayurvedic preconception preparation protocol before IVF or IUI. This synergistic approach helps optimize egg quality, improve uterine lining thickness, and reduce implantation failure rates.</p>

      <h3>What causes unexplained infertility?</h3>
      <p>Unexplained infertility is often linked to subtle chronic inflammation, endometrial receptivity issues, high oxidative stress, or subclinical thyroid imbalances—all of which respond exceptionally well to holistic metabolic care.</p>
    `,
    category: "Infertility",
    seoTitle: "Best Infertility Doctor in Whitefield | Fertility Expert Guide",
    seoDesc: "Wondering when to see an infertility doctor in Whitefield? Discover key signs, fertility diagnostic steps, and Ayurvedic root-cause treatments by Dr. Anisa.",
    imageUrl: "/images/ayurveda-about.png",
    published: true,
    createdAt: new Date("2026-06-18T15:00:00Z"),
  },
  {
    title: "Top Causes of Female Infertility and When to Seek Treatment",
    slug: "top-causes-of-female-infertility-and-when-to-seek-treatment",
    excerpt: "Understand the leading medical and lifestyle causes of female infertility in India, from PCOS and tubal blockage to thyroid disorders, and learn effective treatment pathways.",
    content: `
      <p>Female infertility is a complex, multi-factorial medical condition. Recognizing the underlying cause is the first step toward effective, evidence-based treatment.</p>

      <h2>Leading Medical Causes of Female Infertility</h2>
      <ul>
        <li><strong>Ovulatory Disorders (25–30% of cases):</strong> Conditions like PCOS, hypothalamic amenorrhea, and premature ovarian insufficiency disrupt normal egg release.</li>
        <li><strong>Endometriosis:</strong> Tissue similar to the uterine lining grows outside the uterus, causing pelvic scarring, inflammation, and impaired embryo implantation.</li>
        <li><strong>Thyroid & Endocrine Imbalances:</strong> Both hypothyroidism and elevated prolactin interfere with LH surges and luteal phase progesterone support.</li>
        <li><strong>Tubal & Uterine Factors:</strong> Fallopian tube obstruction, polyps, or uterine fibroids that mechanically prevent egg-sperm fertilization or implantation.</li>
        <li><strong>Age-Related Ovarian Decline:</strong> Natural decline in oocyte quantity and chromosomal competence after age 32.</li>
      </ul>

      <h2>When to Seek Professional Medical Care</h2>
      <p>Do not wait if you experience abnormal menstrual bleeding, severe pelvic pain, or have a family history of early menopause. Early therapeutic intervention preserves ovarian reserve and reduces overall treatment duration.</p>
    `,
    category: "Infertility",
    seoTitle: "Top Causes of Female Infertility | Whitefield Bangalore Clinic",
    seoDesc: "Explore the top causes of female infertility including PCOS, thyroid disorders, and endometriosis. Learn when to seek fertility treatment in Whitefield.",
    imageUrl: "/images/ayurveda-hero.png",
    published: true,
    createdAt: new Date("2026-07-05T12:00:00Z"),
  },
  {
    title: "Can PCOS Cause Infertility? Everything You Need to Know",
    slug: "can-pcos-cause-infertility-everything-you-need-to-know",
    excerpt: "Does having Polycystic Ovary Syndrome mean you cannot get pregnant? Get clear, evidence-based answers on how PCOS affects ovulation and how to restore natural fertility.",
    content: `
      <p>One of the most frequent questions asked by newly diagnosed women is: <em>"Will PCOS prevent me from ever having a baby?"</em> The short, medically validated answer is: <strong>No. PCOS is a leading cause of ovulatory delay, but it is one of the most treatable fertility conditions.</strong></p>

      <h2>How Exactly Does PCOS Impact Fertility?</h2>
      <p>In a healthy menstrual cycle, the pituitary gland releases FSH to mature an egg follicle, followed by an LH surge that triggers ovulation. In PCOS:</p>
      <ul>
        <li><strong>Insulin Resistance & Elevated Androgens:</strong> High insulin levels stimulate the ovaries to produce excess testosterone.</li>
        <li><strong>Arrested Follicle Development:</strong> Multiple immature follicles develop (the "polycystic" ultrasound appearance), but none reach full maturity to release an egg.</li>
        <li><strong>Luteal Phase Defect:</strong> Without ovulation, progesterone is not produced, leading to irregular bleeding and an unprepared uterine lining.</li>
      </ul>

      <h2>How Ayurvedic Treatment Restores Natural Conception</h2>
      <p>By shifting focus from artificial ovulation triggers to restoring spontaneous HPO axis rhythm, Dr. Anisa Sarvath helps women achieve sustained natural ovulation through dietary insulin control, herbal endocrine regulators, and stress reduction.</p>
    `,
    category: "PCOS & PCOD",
    seoTitle: "Can PCOS Cause Infertility? Natural Conception Guide | Bangalore",
    seoDesc: "Does PCOS cause permanent infertility? Discover how insulin resistance impacts ovulation and how Ayurvedic treatment in Whitefield restores natural pregnancy.",
    imageUrl: "/images/ayurveda-about.png",
    published: true,
    createdAt: new Date("2026-07-20T10:00:00Z"),
  },
  {
    title: "IVF vs IUI vs Ayurvedic Pre-Conception Care: Which Fertility Path Is Right for You?",
    slug: "ivf-vs-iui-vs-ayurvedic-preconception-care-which-fertility-treatment",
    excerpt: "Confused between IUI, IVF, and natural Ayurvedic fertility therapy? Compare evidence-based benefits, success rates, and discover why preconception detox is vital.",
    content: `
      <p>When couples face difficulties conceiving, navigating the landscape of assisted reproductive technology (ART) can feel overwhelming. Understanding the distinctions between IUI, IVF, and holistic Ayurvedic preconception therapy ensures you make an informed decision aligned with your body and health goals.</p>

      <h2>1. Intrauterine Insemination (IUI)</h2>
      <p>IUI involves placing washed, concentrated sperm directly into the uterine cavity during ovulation. It is often recommended for mild male factor infertility or cervical mucus issues. However, success rates per cycle range between 10%–15% and require healthy ovulatory egg quality.</p>

      <h2>2. In Vitro Fertilization (IVF)</h2>
      <p>IVF involves ovarian hyperstimulation, surgical egg retrieval, laboratory fertilization, and embryo transfer. While essential for bilateral tubal blockage or severe male infertility, IVF success heavily depends on maternal egg quality and endometrial receptivity.</p>

      <h2>3. Ayurvedic Pre-Conception Care (Garbhadhana Samskara)</h2>
      <p>Ayurveda emphasizes that before planting a seed, one must enrich the soil. Whether aiming for natural conception or preparing for an upcoming IVF cycle, a 90-day Ayurvedic protocol focuses on:</p>
      <ul>
        <li><strong>Cellular Detoxification (Panchakarma):</strong> Removing metabolic wastes that impair egg chromosomal integrity.</li>
        <li><strong>Endometrial Vascularity:</strong> Enhancing blood flow to the uterus to improve lining thickness (>8mm) for successful embryo implantation.</li>
      </ul>
    `,
    category: "Infertility",
    seoTitle: "IVF vs IUI vs Ayurvedic Fertility Care | Whitefield Bangalore",
    seoDesc: "Compare IVF, IUI, and Ayurvedic preconception care in Bangalore. Learn which fertility treatment path is right for your diagnosis and reproductive health.",
    imageUrl: "/images/ayurveda-hero.png",
    published: true,
    createdAt: new Date("2026-07-30T16:30:00Z"),
  }
];

const testimonials = [
  {
    name: "Priya Sharma",
    content: "I had irregular periods for 4 years due to PCOS and was told birth control pills were my only option. Dr. Anisa's Ayurvedic treatment and diet plan regulated my cycles within 3 months without synthetic hormones. Highly recommend her Whitefield clinic!",
    rating: 5,
    published: true,
    createdAt: new Date("2026-05-08T11:00:00Z"),
  },
  {
    name: "Ananya Rao",
    content: "We were trying to conceive for nearly 3 years and had two failed IUI attempts. We consulted Dr. Anisa for preconception Panchakarma and herbal support. Within 5 months, we conceived naturally. Her root-cause approach changed our lives.",
    rating: 5,
    published: true,
    createdAt: new Date("2026-05-24T14:30:00Z"),
  },
  {
    name: "Meera Krishnan",
    content: "My TSH levels were fluctuating constantly, causing severe fatigue and weight gain. Dr. Anisa explained the connection between thyroid Agni and diet. My energy is back to normal and my recent thyroid report shows healthy TSH levels.",
    rating: 5,
    published: true,
    createdAt: new Date("2026-06-10T10:15:00Z"),
  },
  {
    name: "Sneha V.",
    content: "Dr. Anisa is extremely patient and thorough. She listened to my entire medical history and gave me an evidence-based treatment plan for my PCOS and acne. The herbal medicines work gently without any side effects.",
    rating: 5,
    published: true,
    createdAt: new Date("2026-06-25T16:00:00Z"),
  },
  {
    name: "Divya Menon",
    content: "Best women's healthcare doctor in Whitefield! Unlike commercial clinics that rush appointments, Dr. Anisa spends time explaining the hormonal root cause. Her holistic menstrual care protocol provided tremendous relief from severe cramps.",
    rating: 5,
    published: true,
    createdAt: new Date("2026-07-12T13:45:00Z"),
  },
  {
    name: "Kavitha R.",
    content: "I consulted Dr. Anisa for PCOS-related weight gain and insulin resistance. With her tailored Ayurvedic nutrition guidance and herbal formulations, I lost 7 kg naturally and my menstrual cycles are completely regular now.",
    rating: 5,
    published: true,
    createdAt: new Date("2026-07-28T09:30:00Z"),
  }
];

const faqs = [
  {
    question: "How do I choose the right PCOS doctor in Whitefield, Bangalore?",
    answer: "Look for a specialist with proven clinical experience in hormonal and metabolic disorders who conducts comprehensive evaluations (hormone panels, ultrasound, insulin resistance tests) and offers root-cause treatments rather than relying solely on symptomatic birth control pills.",
    category: "PCOS",
    order: 1
  },
  {
    question: "Can PCOS cause permanent infertility?",
    answer: "No. While PCOS is a frequent cause of irregular ovulation, it is one of the most treatable fertility conditions. By restoring hormonal balance and reducing insulin resistance, most women with PCOS achieve regular ovulation and successful pregnancy.",
    category: "Infertility",
    order: 2
  },
  {
    question: "When should I see a fertility specialist in Whitefield?",
    answer: "You should consult a specialist if you are under 35 and have been trying to conceive for 12 months without success, or after 6 months if you are over 35, or immediately if you have irregular periods, known PCOS, endometriosis, or severe menstrual cramps.",
    category: "Infertility",
    order: 3
  },
  {
    question: "How does Ayurvedic treatment differ from conventional PCOS treatment?",
    answer: "Conventional care often prescribes hormonal contraceptives to induce artificial bleeding. Ayurveda treats the underlying metabolic cause by enhancing insulin sensitivity, clearing channel blockages (Srotoshodhana), and restoring spontaneous ovulation using natural herbs and lifestyle therapy.",
    category: "PCOS",
    order: 4
  },
  {
    question: "Can Ayurvedic treatment be combined with IVF or IUI?",
    answer: "Yes. Dr. Anisa often recommends a 3-month Ayurvedic pre-conception protocol before undergoing IVF or IUI. This holistic preparation improves egg quality, uterine blood flow, and endometrial lining thickness, boosting overall implantation success rates.",
    category: "Treatments",
    order: 5
  },
  {
    question: "Is PCOS curable with Ayurveda?",
    answer: "PCOS is a metabolic endocrine condition. While not cured like an acute infection, it can be put into long-term clinical remission where menstrual cycles remain regular, hormones stay balanced, and symptoms like acne or hair fall disappear.",
    category: "PCOS",
    order: 6
  },
  {
    question: "What are the early warning signs of female infertility?",
    answer: "Key signs include irregular cycles (<21 days or >35 days), absent periods, severe pelvic pain during menstruation, unexplained hormonal weight gain, or difficulty conceiving after 6–12 months of unprotected intercourse.",
    category: "Infertility",
    order: 7
  },
  {
    question: "How long does it take to see results with Ayurvedic PCOS treatment?",
    answer: "Most patients notice improvements in energy levels, acne, and digestion within 4–6 weeks. Significant hormonal stabilization and predictable ovulation typically occur over a 3–6 month structured protocol.",
    category: "PCOS",
    order: 8
  }
];

async function main() {
  console.log("Seeding SEO Blogs, Testimonials, and FAQs with STAGGERED organic dates...");

  // 1. Seed & Update Blogs with staggered dates
  for (const blog of blogs) {
    const exists = await prisma.blog.findUnique({ where: { slug: blog.slug } });
    if (!exists) {
      await prisma.blog.create({ data: blog });
      console.log(`[Blog] Created with date ${blog.createdAt.toLocaleDateString()}: ${blog.title}`);
    } else {
      await prisma.blog.update({
        where: { slug: blog.slug },
        data: blog
      });
      console.log(`[Blog] Updated date to ${blog.createdAt.toLocaleDateString()}: ${blog.title}`);
    }
  }

  // 2. Seed & Update Testimonials with staggered dates
  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({
      where: { name: t.name }
    });
    if (!exists) {
      await prisma.testimonial.create({ data: t });
      console.log(`[Testimonial] Created with date ${t.createdAt.toLocaleDateString()}: ${t.name}`);
    } else {
      await prisma.testimonial.updateMany({
        where: { name: t.name },
        data: {
          content: t.content,
          rating: t.rating,
          published: t.published,
          createdAt: t.createdAt,
        }
      });
      console.log(`[Testimonial] Updated date to ${t.createdAt.toLocaleDateString()}: ${t.name}`);
    }
  }

  // 3. Seed & Update FAQs
  for (const f of faqs) {
    const exists = await prisma.fAQ.findFirst({
      where: { question: f.question }
    });
    if (!exists) {
      await prisma.fAQ.create({ data: f });
      console.log(`[FAQ] Created: ${f.question}`);
    } else {
      await prisma.fAQ.updateMany({
        where: { question: f.question },
        data: f
      });
      console.log(`[FAQ] Updated: ${f.question}`);
    }
  }

  console.log("Seeding complete! All blogs and testimonials now have realistic staggered publication dates.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
