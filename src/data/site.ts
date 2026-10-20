export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly sectionId: string;
}

export interface SiteConfig {
  readonly siteUrl: string;
  readonly logoPrefix: string;
  readonly logoDot: string;
  readonly emailParts: {
    readonly user: string;
    readonly domain: string;
  };
  readonly resumePath: string;
  readonly navLinks: ReadonlyArray<NavLink>;
}

export const siteConfig: SiteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  logoPrefix: "OM",
  logoDot: ".",
  // Stored in two parts and assembled on the client to reduce scraper spam.
  // Never include phone number anywhere in source or metadata.
  emailParts: {
    user: "om.chaubey65",
    domain: "gmail.com",
  },
  resumePath: "/Om_Prakash_Chaubey_Resume.pdf",
  navLinks: [
    { label: "Home", href: "#home", sectionId: "home" },
    { label: "Skills", href: "#skills", sectionId: "skills" },
    { label: "Projects", href: "#projects", sectionId: "projects" },
    { label: "About", href: "#about", sectionId: "about" },
    { label: "Contact", href: "#contact", sectionId: "contact" },
  ],
};
