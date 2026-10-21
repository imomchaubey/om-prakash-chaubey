import React from "react";
import Image from "next/image";
import { isTodo } from "@/utils/todo";

interface ProjectScreenshotProps {
  readonly title: string;
  readonly stack: ReadonlyArray<string>;
  readonly screenshot: string;
  readonly screenshotAlt: string;
}

/**
 * Renders `next/image` with explicit sizes and alt text when a real screenshot path
 * is provided, or a clean dark graphic placeholder (title + stack on a subtle gradient,
 * with zero "TODO" text) when `screenshot` is a TODO placeholder.
 */
export function ProjectScreenshot({
  title,
  stack,
  screenshot,
  screenshotAlt,
}: ProjectScreenshotProps): React.JSX.Element {
  const missingImage = isTodo(screenshot) || !screenshot.startsWith("/");

  if (missingImage) {
    return (
      <div
        role="img"
        aria-label={screenshotAlt}
        className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden border-b border-border-subtle bg-gradient-to-br from-[#1B1B1B] via-[#141414] to-[#0D0D0D] p-6"
      >
        {/* Subtle decorative grid and warm accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
        />

        <div aria-hidden="true" className="relative z-10 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent/80" />
          <span className="text-xs font-medium tracking-wider text-text-muted uppercase">
            System Overview
          </span>
        </div>

        <div aria-hidden="true" className="relative z-10 my-auto py-3">
          <p className="text-lg font-bold tracking-tight text-text-primary sm:text-xl">
            {title}
          </p>
        </div>

        <div aria-hidden="true" className="relative z-10 flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-subtle bg-bg/70 px-2.5 py-0.5 text-[11px] font-medium text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border-subtle bg-surface-2">
      <Image
        src={screenshot}
        alt={screenshotAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
        className="object-cover object-top"
      />
    </div>
  );
}
