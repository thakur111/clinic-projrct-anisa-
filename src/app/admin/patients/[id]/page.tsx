import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, User, Phone, Mail, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Patient Record | Admin",
};

export default async function PatientRecordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!patient) {
    notFound();
  }

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/patients" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900">Patient Record</h1>
          <p className="text-slate-500 mt-1">ID: {patient.id.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Patient Profile */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl">{patient.name}</CardTitle>
              <p className="text-sm text-slate-500">Registered {new Date(patient.createdAt).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{patient.phone}</span>
              </div>
              {patient.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{patient.email}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Medical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">
                {patient.notes || "No medical notes have been added yet."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Appointment History */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Appointment History</CardTitle>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New
              </Button>
            </CardHeader>
            <CardContent>
              {patient.appointments.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                  <p>No appointments found for this patient.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {patient.appointments.map((apt) => (
                    <div key={apt.id} className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-slate-900">{new Date(apt.preferredDate || apt.createdAt).toLocaleDateString()} at {apt.preferredTime}</p>
                          <p className="text-sm text-slate-600">{apt.reason}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                          apt.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                        {apt.mode} Consultation
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
