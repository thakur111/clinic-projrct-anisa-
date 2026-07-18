import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar as CalendarIcon, Clock, User, Phone, CheckCircle2, XCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Appointments | Admin",
};

async function updateAppointmentStatus(id: string, status: string) {
  "use server";
  await prisma.appointment.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/appointments");
}

export default async function AdminAppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    include: {
      patient: true,
    },
    orderBy: {
      preferredDate: 'desc',
    },
  });

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 mt-1">Manage all clinic bookings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search appointments..." 
              className="pl-9 w-[250px] rounded-full bg-white border-slate-200 focus:border-primary"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-600">Patient Name</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Contact</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Requested Date</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Treatment</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Mode</th>
                  <th className="px-6 py-4 font-medium text-slate-600">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <CalendarIcon className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                      <p>No appointments found.</p>
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{apt.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600">{apt.phone}</div>
                        <div className="text-xs text-slate-400">{apt.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900">{new Date(apt.preferredDate).toLocaleDateString()}</div>
                        <div className="text-xs text-slate-500">{apt.preferredTime}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{apt.reason}</td>
                      <td className="px-6 py-4">
                        <span className="capitalize px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {apt.mode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`capitalize px-2.5 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          View
                        </Button>
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
