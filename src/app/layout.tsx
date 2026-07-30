// import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dranisa.in"),
  title: {
    default: "Dr. Anisa Sarvath | Ayurvedic Women's Healthcare Clinic",
    template: "%s | Dr. Anisa Sarvath",
  },
  description: "Premium holistic Ayurvedic treatments for women specializing in PCOS, Thyroid, Infertility, and natural weight management by Dr. Anisa Sarvath.",
  keywords: [
    // Location & General
    "Ayurvedic Doctor Bangalore",
    "Ayurvedic Clinic Whitefield",
    "Online Ayurvedic Consultant Bangalore",
    "Online Ayurveda Consultation",
    "Dr. Anisa Sarvath",
    "Women's Health Specialist Bangalore",
    
    // Treatments
    "PCOS Treatment Ayurveda Bangalore",
    "PCOD Natural Hormone Balance therapies",
    "Ayurvedic Infertility Treatment Whitefield",
    "Enhance fertility naturally detox therapies",
    "Menstrual Disorders Ayurvedic Care",
    "Relief heavy bleeding irregular cycles Ayurveda",
    "Ayurvedic Weight Management Bangalore",
    "Healthy sustainable weight loss Ayurveda",
    "Skin and Hair Ayurvedic detox protocols",
    "Holistic Cycle Regulation",
  ],
  authors: [{ name: "Dr. Anisa Sarvath" }],
  creator: "Dr. Anisa Sarvath",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dranisa.in",
    title: "Dr. Anisa Sarvath | Ayurvedic Women's Healthcare Clinic",
    description: "Experience holistic, personalized Ayurvedic care for PCOS, thyroid, infertility, and more.",
    siteName: "Dr. Anisa Sarvath Clinic",
    images: [
      {
        url: "/images/ayurveda-hero.png",
        width: 1200,
        height: 630,
        alt: "Dr. Anisa Sarvath Ayurvedic Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Anisa Sarvath | Ayurvedic Women's Healthcare Clinic",
    description: "Premium holistic Ayurvedic treatments for women.",
    images: ["/images/ayurveda-hero.png"],
  },
  alternates: {
    canonical: "https://dranisa.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Global JSON-LD Schema for Medical Clinic & Physician E-E-A-T */}
        <Script
          id="medical-clinic-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["MedicalClinic", "LocalBusiness"],
                  "@id": "https://dranisa.in/#clinic",
                  "name": "Dr. Anisa Sarvath Clinic",
                  "image": "https://dranisa.in/images/ayurveda-hero.png",
                  "url": "https://dranisa.in",
                  "telephone": "+917483452036",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Whitefield",
                    "addressLocality": "Bangalore",
                    "addressRegion": "Karnataka",
                    "postalCode": "560066",
                    "addressCountry": "IN"
                  },
                  "medicalSpecialty": ["Ayurvedic", "Gynecologic"],
                  "description": "Premium holistic Ayurvedic treatments for women specializing in PCOS, Thyroid, Infertility, and natural weight management by Dr. Anisa Sarvath.",
                  "areaServed": ["Whitefield", "Marathahalli", "ITPL", "Indiranagar", "Bangalore", "Karnataka"]
                },
                {
                  "@type": "Physician",
                  "@id": "https://dranisa.in/#physician",
                  "name": "Dr. Anisa Sarvath",
                  "jobTitle": "Ayurvedic Physician & Gynecologic Specialist",
                  "url": "https://dranisa.in/about",
                  "worksFor": {
                    "@id": "https://dranisa.in/#clinic"
                  },
                  "medicalSpecialty": ["Ayurvedic Medicine", "Women's Health", "PCOS & PCOD Care", "Infertility Treatment"],
                  "description": "BAMS qualified Ayurvedic Physician specializing in women's hormonal balance, menstrual health, and holistic wellness."
                }
              ]
            })
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
