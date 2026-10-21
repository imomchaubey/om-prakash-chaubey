import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoadingPage(): React.JSX.Element {
  return (
    <section
      aria-label="Loading page content"
      aria-busy="true"
      className="section-spacing min-h-screen bg-bg"
    >
      <div className="section-container flex min-h-[50vh] flex-col items-start justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold tracking-wider text-accent uppercase">
          <span
            className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent"
            aria-hidden="true"
          />
          <span>Loading Portfolio</span>
        </div>

        <div className="mt-6 w-full max-w-2xl space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded-[10px] bg-surface-2" />
          <div className="h-5 w-full animate-pulse rounded-[8px] bg-surface" />
          <div className="h-5 w-5/6 animate-pulse rounded-[8px] bg-surface" />
        </div>

        <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="h-24 animate-pulse rounded-[14px] border border-border bg-surface p-5" />
          <div className="h-24 animate-pulse rounded-[14px] border border-border bg-surface p-5" />
          <div className="h-24 animate-pulse rounded-[14px] border border-border bg-surface p-5" />
        </div>

        <Link
          href="/"
          className="hover-lift mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-primary transition-all hover:border-accent hover:text-accent active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return Home</span>
        </Link>
      </div>
    </section>
  );
}
