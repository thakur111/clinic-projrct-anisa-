"use client";

import { useState } from "react";
import { Star, CheckCircle, MessageSquarePlus } from "lucide-react";
import { submitPatientReview } from "@/app/actions/testimonial";
import { buttonVariants } from "@/components/ui/button";

export function ReviewSubmissionForm() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !content.trim()) {
      setError("Please fill in both your name and your review.");
      return;
    }

    setIsSubmitting(true);
    const result = await submitPatientReview({
      name,
      content,
      rating,
    });
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setName("");
      setContent("");
      setRating(5);
    } else {
      setError(result.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div id="leave-review" className="scroll-mt-24 mt-20">
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-emerald-800/40 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 mb-4">
            <MessageSquarePlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
            Share Your Healing Story
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
            Your experience can inspire and give hope to women in Whitefield and Bangalore searching for natural, root-cause Ayurvedic care.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 p-6">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-white mb-2">
              Thank You for Your Review!
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Your story has been shared and will appear in our patient testimonials.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-emerald-400 hover:underline"
            >
              Submit another review &rarr;
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-900/40 border border-red-700/60 text-red-200 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Overall Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(rating)}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm font-medium text-amber-400">
                  {hoverRating || rating} / 5 Stars
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="reviewer-name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Your Name / Initials
              </label>
              <input
                id="reviewer-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya S. (Whitefield)"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-sm transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="reviewer-story"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Your Experience & Healing Journey
              </label>
              <textarea
                id="reviewer-story"
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share how Dr. Anisa's Ayurvedic treatment helped with your PCOS, fertility, thyroid, or menstrual health..."
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-sm transition-all resize-none"
              ></textarea>
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonVariants({
                  size: "lg",
                  className:
                    "w-full sm:w-auto px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-900/50 transition-all",
                })}
              >
                {isSubmitting ? "Submitting Review..." : "Submit Your Review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
