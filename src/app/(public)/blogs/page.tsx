import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Health Blogs | Dr. Anisa Sarvath",
  description: "Read our latest articles on Ayurvedic wellness and women's health.",
};

import { prisma } from "@/lib/prisma";

export const revalidate = 0; // ensure it's always up to date

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Wellness Insights</h1>
          <p className="text-muted-foreground text-lg">
            Explore our collection of articles on natural healing, Ayurvedic wisdom, and women's health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group">
              <Card className="h-full border-primary/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                {blog.imageUrl ? (
                  <div className="relative h-48 w-full bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={blog.imageUrl} alt={blog.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="h-48 bg-secondary/10 flex items-center justify-center">
                    <span className="text-secondary/40 font-heading text-4xl">Dr. Anisa</span>
                  </div>
                )}
                <CardHeader className="flex-1">
                  <div className="mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {blog.category}
                    </Badge>
                  </div>
                  <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {blog.excerpt || "Click to read more about this topic..."}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      {blog.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-primary font-medium flex items-center group-hover:underline">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
