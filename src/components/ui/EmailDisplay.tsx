"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

const emptySubscribe = (): (() => void) => () => {};

function getClientEmail(): string {
  return `${siteConfig.emailParts.user}@${siteConfig.emailParts.domain}`;
}

function getServerEmail(): string {
  return "";
}

interface EmailDisplayProps {
  readonly showCopyButton?: boolean;
  readonly className?: string;
}

/**
 * Assembles the email address on the client from `siteConfig.emailParts`
 * using `useSyncExternalStore` so plain-text scraper bots do not harvest it
 * from static SSR HTML, while avoiding synchronous `setState` in `useEffect`.
 */
export function EmailDisplay({
  showCopyButton = true,
  className = "",
}: EmailDisplayProps): React.JSX.Element {
  const email = useSyncExternalStore(
    emptySubscribe,
    getClientEmail,
    getServerEmail
  );
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    const assembled = email || getClientEmail();
    try {
      await navigator.clipboard.writeText(assembled);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      // Fallback if clipboard API is blocked
    }
  };

  return (
    <div className={`inline-flex flex-wrap items-center gap-3 ${className}`}>
      {email ? (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent"
          aria-label={`Send an email to ${email}`}
        >
          <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>{email}</span>
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm text-text-muted">
          <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>Loading email…</span>
        </span>
      )}

      {showCopyButton && (
        <button
          type="button"
          onClick={() => {
            void handleCopy();
          }}
          disabled={!email}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface-2 px-3 py-1 text-xs font-medium text-text-primary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
              <span>Copy email</span>
            </>
          )}
        </button>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </div>
  );
}
