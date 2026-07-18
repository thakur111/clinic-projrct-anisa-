import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Search, Plus, Trash2, CheckCircle, XCircle, Star, MessageSquareQuote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "@/app/actions/cms";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "Testimonials CMS | Admin",
};

async function toggleTestimonialStatus(id: string, published: boolean) {
  "use server";
  await prisma.testimonial.update({
    where: { id },
    data: { published },
  });
  revalidatePath("/admin/testimonials");
}

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Patient Testimonials</h1>
          <p className="text-slate-500 mt-1">Manage and approve patient success stories.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search testimonials..." className="pl-9 bg-white" />
          </div>
          <Link href="/admin/testimonials/new" className={buttonVariants({ className: "bg-primary text-white" })}>
            <Plus className="h-4 w-4 mr-2" />
            Add Manually
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-600">Patient Name</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Review Snippet</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Rating</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <MessageSquareQuote className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                      <p>No testimonials found. Add a patient review to get started.</p>
                    </td>
                  </tr>
                ) : (
                  testimonials.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{t.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600 truncate max-w-sm">"{t.content}"</div>
                        <div className="text-xs text-slate-400 mt-1">{t.createdAt.toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex text-amber-400">
                          {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {t.published ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            <CheckCircle className="h-3 w-3 mr-1" /> Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                            <XCircle className="h-3 w-3 mr-1" /> Hidden
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 flex items-center justify-end">
                        <form action={async () => { "use server"; await toggleTestimonialStatus(t.id, !t.published); }}>
                          <Button variant="outline" size="sm">
                            {t.published ? 'Hide' : 'Approve'}
                          </Button>
                        </form>
                        <form action={async () => { "use server"; await deleteTestimonial(t.id); }}>
                          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-destructive hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
