import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding SEO-optimized PCOS blog post into database...");

  const blogData = {
    title: "Ayurvedic Treatment for PCOS in Whitefield, Bangalore: A Natural, Hormone-Free Roadmap",
    slug: "ayurvedic-treatment-pcos-whitefield-bangalore",
    category: "Ayurvedic Gynecology",
    tags: "PCOS, PCOD, Whitefield, Bangalore, Ayurvedic Gynecology, Hormonal Balance, Ayurveda",
    excerpt: "Struggling with irregular periods, weight gain, or PCOS in Bangalore? Discover how Dr. Anisa Sarvath Clinic in Whitefield treats root hormonal imbalances naturally with Ayurveda.",
    seoTitle: "Ayurvedic Treatment for PCOS in Whitefield, Bangalore | Dr. Anisa Sarvath",
    seoDesc: "Struggling with irregular periods, weight gain, or PCOS in Bangalore? Discover how Dr. Anisa Sarvath Clinic in Whitefield treats root hormonal imbalances naturally with Ayurveda.",
    imageUrl: "https://dranisa.in/images/ayurveda-hero.png",
    published: true,
    content: `
      <h2>Why Working Women in Bangalore Are Turning to Ayurveda for PCOS</h2>
      <p>For thousands of women working across ITPL, Whitefield, Marathahalli, and East Bangalore, Polycystic Ovary Syndrome (PCOS) has become a daily silent battle. From stubborn weight gain and adult acne to irregular menstrual cycles and fertility anxiety, conventional treatments often rely heavily on synthetic birth control pills that only mask the symptoms.</p>
      <p>At <strong>Dr. Anisa Sarvath Clinic in Whitefield, Bangalore</strong>, we approach PCOS differently. Rather than forcing your hormones into submission, classical <strong>Ayurveda (BAMS-verified)</strong> identifies the underlying metabolic root cause—specifically <em>Artava Kshaya</em> and Kapha-Vata dosha imbalances—to restore natural, long-term ovulation and hormonal harmony.</p>

      <h2>The 3 Root Causes of PCOS According to Ayurveda</h2>
      <ul>
        <li><strong>Mandagni (Sluggish Digestive & Hormonal Fire):</strong> Chronic stress, late meals, and sedentary work schedules weaken tissue metabolism (<em>Dhatu Agni</em>), causing toxins (<em>Ama</em>) to accumulate in the ovarian channels.</li>
        <li><strong>Kapha-Vata Avarana (Channel Blockage):</strong> Excess Kapha creates cysts and insulin resistance, while aggravated Vata disrupts the natural monthly rhythm of ovulation and menstruation.</li>
        <li><strong>Chronic Cortisol Overload:</strong> Fast-paced urban lifestyles in East Bangalore elevate stress hormones, which directly suppress progesterone and thyroid function.</li>
      </ul>

      <h2>Our 4-Step Holistic PCOS Treatment Protocol in Whitefield</h2>
      <table class="w-full border-collapse border border-slate-200 my-6">
        <thead>
          <tr class="bg-emerald-50 dark:bg-emerald-950/40 text-left">
            <th class="p-3 border border-slate-200">Step</th>
            <th class="p-3 border border-slate-200">Treatment Focus</th>
            <th class="p-3 border border-slate-200">Ayurvedic Action</th>
            <th class="p-3 border border-slate-200">Patient Benefit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border border-slate-200 font-bold">1. Ama Pachana</td>
            <td class="p-3 border border-slate-200">Metabolic Detoxification</td>
            <td class="p-3 border border-slate-200">Gentle herbal decoctions to flush cellular toxins and improve insulin sensitivity.</td>
            <td class="p-3 border border-slate-200">Reduces bloating, fatigue, and sugar cravings within weeks.</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200 font-bold">2. Dosha Shamana</td>
            <td class="p-3 border border-slate-200">Custom Herbal Formulations</td>
            <td class="p-3 border border-slate-200">Classical herbs like <em>Shatavari</em>, <em>Ashokarishta</em>, <em>Kanchanar Guggulu</em>, and <em>Lodhra</em>.</td>
            <td class="p-3 border border-slate-200">Regulates menstrual cycles and shrinks ovarian follicle cysts naturally.</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200 font-bold">3. Ahara & Vihara</td>
            <td class="p-3 border border-slate-200">Bangalore Lifestyle Diet</td>
            <td class="p-3 border border-slate-200">Custom nutrition plan tailored to South Indian dietary habits without extreme starvation.</td>
            <td class="p-3 border border-slate-200">Sustained, healthy weight loss and restored skin clarity.</td>
          </tr>
          <tr>
            <td class="p-3 border border-slate-200 font-bold">4. Rasayana</td>
            <td class="p-3 border border-slate-200">Hormonal Rejuvenation</td>
            <td class="p-3 border border-slate-200">Deep ovarian nourishment to support egg quality and natural fertility.</td>
            <td class="p-3 border border-slate-200">Prepares the body for healthy conception without hormonal dependency.</td>
          </tr>
        </tbody>
      </table>

      <h2>Frequently Asked Questions (AI Search & Patient Guide)</h2>
      <h3>Can Ayurveda permanently cure PCOS without birth control pills?</h3>
      <p>While PCOS is a lifestyle-linked metabolic syndrome, Ayurveda successfully reverses clinical symptoms, regulates menstrual cycles, and restores natural ovulation without birth control pills by correcting insulin resistance and dosha balance.</p>

      <h3>How soon can I see results with Dr. Anisa Sarvath's PCOS protocol?</h3>
      <p>Most patients observe noticeable improvements in energy, digestion, and reduced cravings within <strong>30 to 45 days</strong>, with regular menstrual cycles typically established over <strong>3 to 6 months</strong> of consistent care.</p>

      <h3>Where is Dr. Anisa Sarvath Clinic located in Whitefield?</h3>
      <p>We are located in <strong>Whitefield, Bangalore (Karnataka 560066)</strong>, easily accessible from Marathahalli, ITPL, Brookefield, and Kadugodi. Both in-clinic consultations and online video appointments are available.</p>
    `,
  };

  const blog = await prisma.blog.upsert({
    where: { slug: blogData.slug },
    update: blogData,
    create: blogData,
  });

  console.log("Successfully seeded SEO blog post!");
  console.log("Slug:", blog.slug);
  console.log("ID:", blog.id);
}

main()
  .catch((e) => {
    console.error("Error seeding blog:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
