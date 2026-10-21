"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps): React.JSX.Element {
  return (
    <section
      aria-labelledby="heading-error"
      className="section-spacing bg-bg"
    >
      <div className="section-container flex min-h-[50vh] flex-col items-start justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/10 px-4 py-1.5 text-xs font-bold tracking-wider text-danger uppercase">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Application Error</span>
        </div>

        <h1 id="heading-error" className="heading-h1 mt-4 text-text-primary">
          Something went wrong
        </h1>

        <p className="mt-4 max-w-lg text-base text-text-muted">
          An unexpected error occurred while rendering this view. You can try
          reloading the component or return to the home page.
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-xs text-text-muted">
            Digest: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="hover-lift inline-flex min-h-[44px] items-center gap-2 rounded-[10px] bg-accent px-6 py-3 text-sm font-bold text-bg transition-all hover:bg-accent-hover active:scale-[0.98]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="hover-lift inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-border bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-all hover:border-accent hover:text-accent active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
