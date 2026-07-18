import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, Calendar, Users, FileText, Settings, LogOut, MessageSquare, HelpCircle, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function AdminSidebar() {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="h-16 flex items-center justify-between px-6 border-b border-border">
        <span className="font-heading font-bold text-xl text-primary">Clinic Admin</span>
        <div className="hidden md:block"><ThemeToggle /></div>
      </div>
      
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/10 rounded-lg font-medium">
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/admin/appointments" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
          <Calendar className="h-5 w-5" />
          Appointments
        </Link>
        <Link href="/admin/patients" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
          <Users className="h-5 w-5" />
          Patients
        </Link>
        <Link href="/admin/contacts" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
          <Mail className="h-5 w-5" />
          Inbox
        </Link>
        <Link href="/admin/whatsapp" className="flex items-center gap-3 px-3 py-2 text-emerald-600 hover:bg-emerald-500/10 bg-emerald-500/10 rounded-lg font-medium transition-colors">
          <MessageSquare className="h-5 w-5" />
          WhatsApp Leads
        </Link>
        <Link href="/admin/blogs" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
          <FileText className="h-5 w-5" />
          Blogs
        </Link>
        <Link href="/admin/testimonials" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
          <MessageSquare className="h-5 w-5" />
          Testimonials
        </Link>
        <Link href="/admin/faq" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
          <HelpCircle className="h-5 w-5" />
          FAQs
        </Link>
        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium transition-colors">
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </nav>
      
      <div className="p-4 border-t border-border">
        <LogoutButton />
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-muted/30">
      {/* Mobile Header */}
      <div className="md:hidden h-16 flex items-center justify-between px-4 border-b border-border bg-card">
        <span className="font-heading font-bold text-lg text-primary">Clinic Admin</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger className="p-2 hover:bg-muted rounded-md transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <AdminSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-border flex-col">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
