import React from "react";

/**
 * Signature element for the Zoom Clone case study.
 * Displays the verified stack: Next.js frontend (TypeScript, Tailwind CSS) ->
 * FastAPI backend -> SQLite database (via SQLAlchemy), plus a note on
 * Browser getUserMedia for camera and microphone preview, labelled "Simplified overview".
 */
export function ZoomArchDiagram(): React.JSX.Element {
  return (
    <figure
      className="rounded-[12px] border border-border-subtle bg-surface p-6"
      aria-label="Simplified overview of Zoom Clone stack: Next.js frontend (TypeScript, Tailwind CSS) to FastAPI backend to SQLite database (via SQLAlchemy)"
    >
      <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3">
        <span className="text-sm font-semibold text-text-primary">
          Simplified overview
        </span>
        <span className="text-xs text-text-muted">
          Next.js · FastAPI · SQLAlchemy · SQLite
        </span>
      </figcaption>

      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <div className="rounded-[12px] border border-border-subtle bg-surface-2 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Frontend
          </p>
          <p className="mt-1 text-sm font-semibold text-text-primary">
            Next.js frontend (TypeScript, Tailwind CSS)
          </p>
        </div>

        <div
          aria-hidden="true"
          className="text-center text-sm font-bold text-accent"
        >
          {"->"}
        </div>

        <div className="rounded-[12px] border border-border-subtle bg-surface-2 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Backend
          </p>
          <p className="mt-1 text-sm font-semibold text-text-primary">
            FastAPI backend
          </p>
        </div>

        <div
          aria-hidden="true"
          className="text-center text-sm font-bold text-accent"
        >
          {"->"}
        </div>

        <div className="rounded-[12px] border border-accent/40 bg-surface-2 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Database
          </p>
          <p className="mt-1 text-sm font-semibold text-accent">
            SQLite database (via SQLAlchemy)
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-text-muted">
        Browser getUserMedia for camera and microphone preview
      </p>
    </figure>
  );
}
