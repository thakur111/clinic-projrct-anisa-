import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppWidget } from "@/components/ui/whatsapp-widget";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch actual whatsapp number if available in settings, or use fallback
  const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  const whatsappNumber = settings?.whatsapp || settings?.phone || "+917483452036";

  return (
    <>
      <Navbar />
      {children}
      <WhatsAppWidget phoneNumber={whatsappNumber} />
      <Footer />
    </>
  );
}
