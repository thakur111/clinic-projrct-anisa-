import { buttonVariants, Button } from "@/components/ui/button";
import { ClinicLogo } from "@/components/ui/logo";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <ClinicLogo className="w-10 h-10 md:w-12 md:h-12" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl md:text-2xl text-primary leading-tight">
              Dr. Anisa Sarvath
            </span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
              Women's Health. Holistic Care.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground items-center">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/treatments" className="hover:text-foreground transition-colors">Treatments</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="/testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
          <Link href="/blogs" className="hover:text-foreground transition-colors">Blogs</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          <ThemeToggle />
          <Link href="/book-appointment" className={buttonVariants({ size: "sm", className: "rounded-full px-6" })}>
            Book
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger className="p-2 -mr-2 text-foreground" aria-label="Open mobile menu">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] flex flex-col pt-12">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-6 text-lg font-medium text-muted-foreground">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <Link href="/treatments" className="hover:text-foreground transition-colors">Treatments</Link>
                <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                <Link href="/testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
                <Link href="/blogs" className="hover:text-foreground transition-colors">Blogs</Link>
                <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                
                <div className="pt-6 mt-6 border-t border-border">
                  <Link href="/book-appointment" className={buttonVariants({ size: "lg", className: "w-full rounded-full" })}>
                    Book Appointment
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
