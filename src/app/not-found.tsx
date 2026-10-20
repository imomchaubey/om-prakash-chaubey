import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage(): React.JSX.Element {
  return (
    <section
      aria-labelledby="heading-not-found"
      className="section-spacing bg-bg"
    >
      <div className="section-container flex min-h-[50vh] flex-col items-start justify-center">
        <p className="text-sm font-bold tracking-wider text-accent uppercase">
          404 Error
        </p>
        <h1 id="heading-not-found" className="heading-h1 mt-2 text-text-primary">
          Page not found
        </h1>
        <p className="mt-4 max-w-lg text-base text-text-muted">
          The page or project case study you are looking for does not exist or
          is not yet published.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-accent px-6 py-3 text-sm font-bold text-bg transition-colors hover:bg-accent-hover"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return Home</span>
        </Link>
      </div>
    </section>
  );
}
