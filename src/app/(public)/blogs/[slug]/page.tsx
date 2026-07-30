import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { MedicalAuthorityBadge } from "@/components/seo/MedicalAuthorityBadge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.seoTitle || `${blog.title} | Dr. Anisa Sarvath`,
    description: blog.seoDesc || blog.excerpt || "Read this wellness article by Dr. Anisa Sarvath.",
    openGraph: {
      title: blog.title,
      description: blog.excerpt || "",
      images: blog.imageUrl ? [blog.imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!blog || !blog.published) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <Script
          id="article-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": blog.seoTitle || blog.title,
              "description": blog.seoDesc || blog.excerpt,
              "image": blog.imageUrl ? [blog.imageUrl] : [],
              "datePublished": blog.createdAt.toISOString(),
              "author": [{
                "@type": "Person",
                "name": "Dr. Anisa Sarvath",
                "url": "https://dranisa.in/about"
              }]
            })
          }}
        />
        <Breadcrumbs items={[
          { label: "Blogs", href: "/blogs" },
          { label: blog.title, href: `/blogs/${blog.slug}` }
        ]} />
        
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {blog.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="text-slate-500 text-sm mb-4">
            Published on {blog.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <ShareButtons title={blog.title} url={`/blogs/${blog.slug}`} />
        </div>

        {blog.imageUrl && (
          <div className="w-full h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden mb-12 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-primary mb-8">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        <MedicalAuthorityBadge />
      </div>
    </div>
  );
}
