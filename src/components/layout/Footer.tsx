"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaKaggle } from "react-icons/fa6";
import { siteConfig } from "@/data/site";
import { profileData, type SocialPlatform } from "@/data/profile";
import { EmailDisplay } from "@/components/ui/EmailDisplay";
import { useLenisScroll } from "@/components/layout/LenisProvider";

function renderSocialIcon(platform: SocialPlatform): React.JSX.Element {
  switch (platform) {
    case "GitHub":
      return <FaGithub className="h-4 w-4" aria-hidden="true" />;
    case "LinkedIn":
      return <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />;
    case "Kaggle":
      return <FaKaggle className="h-4 w-4" aria-hidden="true" />;
  }
}

export function Footer(): React.JSX.Element {
  const { scrollTo } = useLenisScroll();

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ): void => {
    if (!href.startsWith("#")) {
      return;
    }
    event.preventDefault();
    scrollTo(href, { offset: -80 });
    window.history.replaceState(null, "", href);
  };

  const handleBackToTop = (): void => {
    scrollTo(0, { offset: 0 });
    window.history.replaceState(null, "", "#home");
  };

  return (
    <footer className="border-t border-border-subtle bg-surface py-12">
      <div className="section-container">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Brand & Client-Assembled Email */}
          <div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              aria-label="Om Prakash Chaubey — Back to top"
              className="text-2xl font-bold tracking-tight text-text-primary"
            >
              <span>{siteConfig.logoPrefix}</span>
              <span className="text-accent">{siteConfig.logoDot}</span>
            </a>
            <p className="mt-2 text-sm text-text-muted">
              {profileData.name} · {profileData.roleTitle} · {profileData.location}
            </p>
            <div className="mt-3">
              <EmailDisplay showCopyButton />
            </div>
          </div>

          {/* Section Links & Socials */}
          <div className="flex flex-col gap-4 md:items-end">
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap items-center gap-6">
                {siteConfig.navLinks.map((link) => (
                  <li key={link.sectionId}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm font-medium text-text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ul
              aria-label="Social links"
              className="flex items-center gap-3"
            >
              {profileData.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface-2 text-text-muted transition-colors hover:border-accent hover:text-text-primary"
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-2 px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
