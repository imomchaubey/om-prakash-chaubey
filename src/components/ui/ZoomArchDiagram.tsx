import React from "react";

/**
 * Signature element for the Zoom Clone case study.
 * Strictly displays only the verified stack (Next.js frontend, FastAPI backend, WebRTC)
 * labelled "Simplified overview" — no unverified services, databases, or TURN/STUN servers.
 */
export function ZoomArchDiagram(): React.JSX.Element {
  return (
    <figure
      className="rounded-[12px] border border-border-subtle bg-surface p-6"
      aria-label="Simplified overview of Zoom Clone stack: Next.js frontend, FastAPI backend, and WebRTC"
    >
      <figcaption className="mb-4 flex items-center justify-between border-b border-border-subtle pb-3">
        <span className="text-sm font-semibold text-text-primary">
          Simplified overview
        </span>
        <span className="text-xs text-text-muted">
          TypeScript · Next.js · FastAPI · WebRTC
        </span>
      </figcaption>

      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
        <div className="rounded-[12px] border border-border-subtle bg-surface-2 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Frontend
          </p>
          <p className="mt-1 text-base font-semibold text-text-primary">
            Next.js (TypeScript)
          </p>
        </div>

        <div className="rounded-[12px] border border-border-subtle bg-surface-2 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Backend
          </p>
          <p className="mt-1 text-base font-semibold text-text-primary">
            FastAPI
          </p>
        </div>

        <div className="rounded-[12px] border border-accent/40 bg-surface-2 p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Real-Time Media
          </p>
          <p className="mt-1 text-base font-semibold text-accent">
            WebRTC
          </p>
        </div>
      </div>
    </figure>
  );
}
