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
  }
];

async function main() {
  console.log("Seeding SEO blogs...");
  for (const blog of blogs) {
    const exists = await prisma.blog.findUnique({
      where: { slug: blog.slug }
    });
    
    if (!exists) {
      await prisma.blog.create({
        data: blog
      });
      console.log(`Created blog: ${blog.title}`);
    } else {
      console.log(`Blog already exists: ${blog.title}`);
    }
  }
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
