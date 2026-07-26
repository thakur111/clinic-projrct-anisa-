"use client";

import { Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const fullUrl = `https://dranisa.in${url}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20-${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  return (
    <div className="flex items-center gap-2 py-4 border-t border-b border-slate-100 dark:border-slate-800 my-6">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mr-2">
        <Share2 className="h-3.5 w-3.5" /> Share Article:
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
      >
        WhatsApp
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
      >
        Facebook
      </a>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X (Twitter)"
        className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
      >
        X (Twitter)
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
      >
        LinkedIn
      </a>
    </div>
  );
}
