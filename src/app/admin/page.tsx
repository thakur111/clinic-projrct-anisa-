import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, FileText, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin Dashboard | Dr. Anisa Sarvath",
};

export default async function AdminDashboard() {
  const [
    totalAppointments,
    pendingAppointments,
    totalPatients,
    pendingContacts,
    publishedBlogs,
    draftBlogs,
    recentAppointments,
    recentContacts
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: 'pending' } }),
    prisma.patient.count(),
    prisma.contactRequest.count({ where: { status: 'new' } }),
    prisma.blog.count({ where: { published: true } }),
    prisma.blog.count({ where: { published: false } }),
    prisma.appointment.findMany({ 
      take: 5, 
      orderBy: { createdAt: 'desc' },
      include: { patient: true } 
    }),
    prisma.contactRequest.findMany({ 
      take: 5, 
      orderBy: { createdAt: 'desc' },
      where: { status: 'new' }
    })
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-heading font-bold text-foreground mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Appointments</CardTitle>
            <CalendarDays className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalAppointments}</div>
            <p className="text-xs text-muted-foreground mt-1">{pendingAppointments} pending confirmation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalPatients}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered in system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Pending Requests</CardTitle>
            <CheckCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{pendingContacts}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires your attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Published Blogs</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{publishedBlogs}</div>
            <p className="text-xs text-muted-foreground mt-1">{draftBlogs} drafts pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-slate-500">
              {recentAppointments.length === 0 ? (
                <p>No recent appointments found.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentAppointments.map(app => (
                    <div key={app.id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-foreground">{app.patient?.name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">{new Date(app.preferredDate).toLocaleDateString()} at {app.preferredTime}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                        app.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Contact Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-slate-500">
              {recentContacts.length === 0 ? (
                <p>No new inquiries found.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {recentContacts.map(contact => (
                    <div key={contact.id} className="py-3 flex flex-col gap-1">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <span className="text-xs text-muted-foreground">{contact.createdAt.toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{contact.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
