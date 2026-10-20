"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";

interface LenisContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
});

export function useLenisScroll(): LenisContextValue {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  readonly children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps): React.JSX.Element {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number): void => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    const handleMotionChange = (event: MediaQueryListEvent): void => {
      if (event.matches) {
        window.cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number }): void => {
      const offset = options?.offset ?? -80;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset });
        return;
      }

      // Native fallback when prefers-reduced-motion is active or Lenis is not initialized
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
      } else if (typeof target === "string") {
        const element = document.querySelector<HTMLElement>(target);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: "auto" });
        }
      } else if (target instanceof HTMLElement) {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "auto" });
      }
    },
    []
  );

  const contextValue = useMemo(() => ({ scrollTo }), [scrollTo]);

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
