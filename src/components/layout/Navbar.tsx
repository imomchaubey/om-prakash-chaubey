"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useLenisScroll } from "@/components/layout/LenisProvider";

const NAVBAR_HEIGHT = 80;

export function Navbar(): React.JSX.Element {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { scrollTo } = useLenisScroll();

  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  const getNavbarOffset = useCallback((): number => {
    const height = headerRef.current?.getBoundingClientRect().height ?? NAVBAR_HEIGHT;
    return -Math.round(height);
  }, []);

  // Active section highlighting via IntersectionObserver
  useEffect(() => {
    const sectionIds = siteConfig.navLinks.map((item) => item.sectionId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const intersectingMap = new Map<string, HTMLElement>();

    const updateActiveFromEntries = (): void => {
      if (window.scrollY < 40) {
        setActiveSection("home");
        return;
      }

      const candidates = Array.from(intersectingMap.values());
      if (candidates.length === 0) {
        return;
      }

      // Pick the intersecting section whose top is closest to the bottom of the sticky navbar (80px)
      candidates.sort(
        (a, b) =>
          Math.abs(a.getBoundingClientRect().top - NAVBAR_HEIGHT) -
          Math.abs(b.getBoundingClientRect().top - NAVBAR_HEIGHT)
      );

      if (candidates[0]?.id) {
        setActiveSection(candidates[0].id);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            intersectingMap.set(el.id, el);
          } else {
            intersectingMap.delete(el.id);
          }
        }
        updateActiveFromEntries();
      },
      {
        rootMargin: `-${NAVBAR_HEIGHT + 8}px 0px -45% 0px`,
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Keyboard Escape and Focus Trap when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const drawer = mobileDrawerRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = drawer
      ? Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector))
      : [];

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab" && focusableElements.length > 0) {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId: string
  ): void => {
    if (!href.startsWith("#")) {
      return;
    }
    event.preventDefault();
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    scrollTo(href, { offset: getNavbarOffset() });
    window.history.replaceState(null, "", href);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 h-20 w-full border-b border-border-subtle bg-bg/90 backdrop-blur-md"
    >
      <div className="section-container flex h-full items-center justify-between">
        {/* Left: Text Logo "OM." */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home", "home")}
          aria-label="Om Prakash Chaubey — Back to top"
          className="text-2xl font-bold tracking-tight text-text-primary transition-opacity hover:opacity-90"
        >
          <span>{siteConfig.logoPrefix}</span>
          <span className="text-accent">{siteConfig.logoDot}</span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <li key={link.sectionId}>
                  <a
                    href={link.href}
                    onClick={(e) =>
                      handleNavClick(e, link.href, link.sectionId)
                    }
                    aria-current={isActive ? "location" : undefined}
                    className={`text-base transition-colors ${
                      isActive
                        ? "font-bold text-accent"
                        : "font-medium text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Solid Orange "Hire Me" CTA (text #0D0D0D for WCAG AA contrast) */}
        <div className="hidden md:flex md:items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact", "contact")}
            className="inline-flex items-center justify-center rounded-[10px] bg-accent px-6 py-2.5 text-sm font-bold text-bg transition-colors hover:bg-accent-hover active:scale-[0.99]"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-border-subtle bg-surface text-text-primary transition-colors hover:border-accent hover:text-accent md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="border-b border-border-subtle bg-surface px-5 pt-4 pb-6 shadow-2xl md:hidden"
        >
          <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Navigation
            </span>
            <button
              type="button"
              aria-label="Close mobile navigation menu"
              onClick={() => {
                setMobileMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-border-subtle bg-surface-2 text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-2">
              {siteConfig.navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <li key={link.sectionId}>
                    <a
                      href={link.href}
                      onClick={(e) =>
                        handleNavClick(e, link.href, link.sectionId)
                      }
                      aria-current={isActive ? "location" : undefined}
                      className={`block rounded-[10px] px-4 py-2.5 text-base transition-colors ${
                        isActive
                          ? "bg-surface-2 font-bold text-accent"
                          : "font-medium text-text-muted hover:bg-surface-2 hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 pt-3 border-t border-border-subtle">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact", "contact")}
                className="flex w-full items-center justify-center rounded-[10px] bg-accent px-6 py-3 text-sm font-bold text-bg transition-colors hover:bg-accent-hover"
              >
                Hire Me
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
