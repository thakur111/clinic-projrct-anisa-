import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, GripVertical, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteFAQ } from "@/app/actions/cms";

export const metadata = {
  title: "FAQ CMS | Admin",
};

export default async function AdminFAQPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Frequently Asked Questions</h1>
          <p className="text-slate-500 mt-1">Manage the questions that appear on your FAQ page.</p>
        </div>
        <Link href="/admin/faq/new" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {faqs.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <MessageCircleQuestion className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                <p>No FAQs found. Add some questions to help your patients!</p>
              </div>
            ) : (
              faqs.map((faq) => (
                <div key={faq.id} className="p-4 md:p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                  <div className="pt-1 cursor-move text-slate-300 hover:text-slate-500">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{faq.question}</span>
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 uppercase tracking-wider">
                        {faq.category}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <form action={async () => { "use server"; await deleteFAQ(faq.id); }}>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-destructive hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
