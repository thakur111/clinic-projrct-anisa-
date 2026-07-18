import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Store, Phone, Globe, Share2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { saveSiteSettings } from "@/app/actions/settings";

export const metadata = {
  title: "Site Settings | Admin",
};

export default async function AdminSettingsPage() {
  const dbSettings = await prisma.siteSettings.findUnique({
    where: { id: "default" }
  });

  const settings = dbSettings || {
    clinicName: "Dr. Anisa Sarvath Clinic",
    phone: "",
    email: "",
    address: "",
    workingHours: "",
    facebook: "",
    instagram: "",
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-slate-900">Site Settings</h1>
        <p className="text-slate-500 mt-1">Manage global website information and contact details.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1 text-sm font-medium text-slate-600">
          <div className="p-3 bg-white rounded-lg text-primary shadow-sm cursor-pointer flex items-center gap-2">
            <Store className="h-4 w-4" /> General Info
          </div>
          <div className="p-3 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center gap-2 transition-colors">
            <Phone className="h-4 w-4" /> Contact
          </div>
          <div className="p-3 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center gap-2 transition-colors">
            <Share2 className="h-4 w-4" /> Social Media
          </div>
          <div className="p-3 hover:bg-slate-100 rounded-lg cursor-pointer flex items-center gap-2 transition-colors">
            <Globe className="h-4 w-4" /> SEO Defaults
          </div>
        </div>

        <form action={async (formData: FormData) => { "use server"; await saveSiteSettings(formData); }} className="md:col-span-3 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>This information will be displayed in the header and footer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Clinic Name</label>
                <Input name="clinicName" defaultValue={settings.clinicName} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Physical Address</label>
                <Textarea name="address" defaultValue={settings.address || ""} className="h-20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Working Hours</label>
                <Textarea name="workingHours" defaultValue={settings.workingHours || ""} className="h-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
              <CardDescription>Where patients can reach you.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone / WhatsApp</label>
                <Input name="phone" defaultValue={settings.phone || ""} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <Input name="email" defaultValue={settings.email || ""} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your clinic's social presence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Instagram Profile</label>
                  <Input name="instagram" defaultValue={settings.instagram || ""} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Facebook Page</label>
                  <Input name="facebook" defaultValue={settings.facebook || ""} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
            <Button type="reset" variant="outline">Discard Changes</Button>
            <Button type="submit" className="bg-primary text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
