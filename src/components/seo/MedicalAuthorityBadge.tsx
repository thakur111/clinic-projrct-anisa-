"use client";

import Link from "next/link";
import { ShieldCheck, Award, MapPin, PhoneCall } from "lucide-react";

export function MedicalAuthorityBadge() {
  return (
    <div
      itemScope
      itemType="https://schema.org/Physician"
      className="bg-gradient-to-r from-emerald-50/80 via-white to-slate-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5 my-8 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                itemProp="name"
                className="font-bold text-slate-900 dark:text-slate-100 text-sm"
              >
                Dr. Anisa Sarvath
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                <Award className="w-3 h-3 mr-1 inline" />
                BAMS, Ayurvedic Physician
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified Ayurvedic Women&apos;s Healthcare &bull; Evidence-Based Holistic Treatment
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Link
            href="/about"
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
          >
            Doctor Credentials &rarr;
          </Link>
          <Link
            href="/book-appointment"
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-colors"
          >
            Book Consultation
          </Link>
        </div>
      </div>

      {/* Consistent NAP Data for Google Maps & AI Citations */}
      <div className="mt-3 pt-3 border-t border-emerald-100 dark:border-emerald-900/50 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <MapPin className="h-3 w-3 text-emerald-600" />
          <span itemProp="streetAddress">Whitefield</span>,{" "}
          <span itemProp="addressLocality">Bangalore</span>,{" "}
          <span itemProp="addressRegion">Karnataka</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PhoneCall className="h-3 w-3 text-emerald-600" />
          <span itemProp="telephone">+91 74834 52036</span>
        </div>
      </div>
    </div>
  );
}
