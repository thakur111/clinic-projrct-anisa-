import { Card, CardContent } from "@/components/ui/card";
import { Search, CheckCircle, Clock, Trash2, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { deleteWhatsAppLead, updateWhatsAppLeadStatus } from "@/app/actions/whatsapp";

export const metadata = {
  title: "WhatsApp Leads | Admin",
};

export default async function AdminWhatsAppLeadsPage() {
  const leads = await prisma.whatsAppLead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-emerald-500" />
            WhatsApp Leads
          </h1>
          <p className="text-slate-500 mt-1">Manage patients who initiated a chat via WhatsApp.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search name or phone..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-600">Patient Details</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Date Received</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                      <MessageCircle className="h-12 w-12 mx-auto text-emerald-200 mb-4" />
                      <p>No WhatsApp leads yet. When someone clicks the chat widget, they'll appear here.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{lead.name}</div>
                        <div className="text-slate-500 mt-1">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {lead.createdAt.toLocaleDateString()} at {lead.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="px-6 py-4">
                        {lead.status === 'new' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                            <Clock className="h-3 w-3 mr-1" /> New Lead
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            <CheckCircle className="h-3 w-3 mr-1" /> Contacted
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 flex items-center justify-end">
                        <form action={async () => { "use server"; await updateWhatsAppLeadStatus(lead.id, lead.status === 'new' ? 'contacted' : 'new'); }}>
                          <Button variant="outline" size="sm" className={lead.status === 'new' ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50' : ''}>
                            Mark as {lead.status === 'new' ? 'Contacted' : 'New'}
                          </Button>
                        </form>
                        <form action={async () => { "use server"; await deleteWhatsAppLead(lead.id); }}>
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
