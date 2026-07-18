import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Mail, CheckCircle2, Trash2, Archive } from "lucide-react";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { updateContactStatus } from "@/app/actions/contact";

export const metadata = {
  title: "Inbox | Admin",
};

export default async function AdminContactsPage() {
  const messages = await prisma.contactRequest.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Patient Inbox</h1>
          <p className="text-slate-500 mt-1">Manage inquiries from the public website contact form.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search messages..." className="pl-9 bg-white" />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-600">Sender Details</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Message Content</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Received On</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <Mail className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                      <p>Your inbox is empty. When someone submits the contact form, it will appear here.</p>
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id} className={`hover:bg-slate-50 transition-colors ${msg.status === 'new' ? 'bg-primary/5' : ''}`}>
                      <td className="px-6 py-4">
                        <div className={`font-medium ${msg.status === 'new' ? 'text-slate-900' : 'text-slate-700'}`}>{msg.name}</div>
                        <div className="text-slate-500">{msg.phone}</div>
                        <div className="text-xs text-slate-400">{msg.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`font-medium mb-1 ${msg.status === 'new' ? 'text-slate-900' : 'text-slate-700'}`}>Contact Inquiry</div>
                        <div className="text-slate-600 line-clamp-2 max-w-lg">{msg.message}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                        {msg.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap flex items-center justify-end">
                        {msg.status === 'new' && (
                          <form action={async () => { "use server"; await updateContactStatus(msg.id, "read"); }}>
                            <Button variant="ghost" size="icon" className="text-green-600 hover:bg-green-50">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                          </form>
                        )}
                        <form action={async () => { "use server"; await updateContactStatus(msg.id, "archived"); }}>
                          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary">
                            <Archive className="h-4 w-4" />
                          </Button>
                        </form>
                        <form action={async () => { "use server"; await updateContactStatus(msg.id, "deleted"); }}>
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
