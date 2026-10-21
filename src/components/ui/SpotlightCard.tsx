"use client";

import React, { useCallback, useEffect, useRef } from "react";

interface SpotlightCardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: "article" | "div";
}

/**
 * Signature Element 2: Cursor-following soft radial spotlight on project cards.
 * - Updates `--spotlight-x` and `--spotlight-y` via `requestAnimationFrame`.
 * - Automatically disabled on touch/coarse-pointer devices and when `prefers-reduced-motion: reduce` is enabled.
 */
export function SpotlightCard({
  children,
  className = "",
  as: Tag = "article",
}: SpotlightCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);
  const enabledRef = useRef<boolean>(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateEnabled = (): void => {
      enabledRef.current = !reducedMotion.matches && finePointer.matches;
      if (!enabledRef.current && cardRef.current) {
        cardRef.current.style.setProperty("--spotlight-opacity", "0");
      }
    };

    updateEnabled();
    reducedMotion.addEventListener("change", updateEnabled);
    finePointer.addEventListener("change", updateEnabled);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      reducedMotion.removeEventListener("change", updateEnabled);
      finePointer.removeEventListener("change", updateEnabled);
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => {
      if (!enabledRef.current || !cardRef.current) {
        return;
      }

      const clientX = event.clientX;
      const clientY = event.clientY;

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = window.requestAnimationFrame(() => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = Math.round(clientX - rect.left);
        const y = Math.round(clientY - rect.top);
        el.style.setProperty("--spotlight-x", `${x}px`);
        el.style.setProperty("--spotlight-y", `${y}px`);
        el.style.setProperty("--spotlight-opacity", "1");
      });
    },
    []
  );

  const handleMouseLeave = useCallback((): void => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--spotlight-opacity", "0");
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        cardRef.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
    >
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Tag>
  );
}
