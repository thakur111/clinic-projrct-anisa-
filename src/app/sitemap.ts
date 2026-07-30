import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dranisa.in";
  const currentDate = new Date();

  // 1. Core treatments
  const treatments = [
    "pcos-pcod",
    "thyroid-disorders",
    "infertility",
    "weight-management",
    "skin-hair",
    "menstrual-disorders"
  ];

  const treatmentUrls = treatments.map((slug) => ({
    url: `${baseUrl}/treatments/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // 2. Dynamically fetch blog posts from database (fallback gracefully if DB is offline during build)
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogs = await prisma.blog.findMany({
      select: { slug: true, updatedAt: true },
    });
    blogUrls = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch (error) {
    console.warn("Sitemap: Could not fetch blog posts from database during sitemap generation:", error);
  }

  // 3. Core pages
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/treatments`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/book-appointment`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...treatmentUrls,
    ...blogUrls,
  ];
}
