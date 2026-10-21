"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface ScrollRevealProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly delayMs?: number;
}

/**
 * Progressive-enhancement scroll reveal for below-the-fold content.
 *
 * Rules enforced:
 * 1. In SSR HTML and when JavaScript is disabled, renders at `opacity: 1` and `transform: none`
 *    so all content is 100% visible without JS and never causes CLS.
 * 2. When `prefers-reduced-motion: reduce` is active, stays static (`opacity: 1, transform: none`).
 * 3. On client mount (when reduced motion is off), if the element is below the fold, it transitions
 *    once from `opacity: 0, translateY(14px)` to `opacity: 1, translateY(0)` when entering the viewport,
 *    or instantaneously (0ms transition) when any descendant receives keyboard focus.
 */
export function ScrollReveal({
  children,
  className = "",
  delayMs = 0,
}: ScrollRevealProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hiddenBeforeReveal, setHiddenBeforeReveal] = useState<boolean>(false);
  const [instantReveal, setInstantReveal] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const rect = el.getBoundingClientRect();
    // If already in or above the viewport on mount, keep visible immediately
    if (rect.top < window.innerHeight * 0.92) {
      return;
    }

    // Element is below the fold: arm one-time scroll reveal
    const rafId = window.requestAnimationFrame(() => {
      if (!el.matches(":focus-within")) {
        setHiddenBeforeReveal(true);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHiddenBeforeReveal(false);
            observer.disconnect();
            break;
          }
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      }
    );

    observer.observe(el);

    const handleMotionChange = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        setInstantReveal(true);
        setHiddenBeforeReveal(false);
        observer.disconnect();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={ref}
      data-scroll-reveal={hiddenBeforeReveal ? "hidden" : "visible"}
      onFocusCapture={() => {
        setInstantReveal(true);
        if (hiddenBeforeReveal) {
          setHiddenBeforeReveal(false);
        }
      }}
      style={{
        opacity: hiddenBeforeReveal ? 0 : 1,
        transform: hiddenBeforeReveal ? "translateY(14px)" : "translateY(0px)",
        transitionProperty: "opacity, transform",
        transitionDuration: instantReveal ? "0ms" : "500ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: instantReveal ? "0ms" : `${delayMs}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
