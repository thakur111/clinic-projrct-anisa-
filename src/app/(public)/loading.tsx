import { Loader2 } from "lucide-react";

export default function PublicLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center relative border border-primary/10">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
      <p className="mt-6 text-sm font-medium text-slate-500 animate-pulse font-heading tracking-wide">
        Loading...
      </p>
    </div>
  );
}
