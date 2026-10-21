export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly sectionId: string;
}

export interface SiteConfig {
  readonly siteUrl: string;
  readonly logoPrefix: string;
  readonly logoDot: string;
  readonly themeColor: string;
  readonly seoDescription: string;
  readonly seoKeywords: ReadonlyArray<string>;
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
  themeColor: "#0D0D0D",
  seoDescription:
    "Om Prakash Chaubey is a Full-Stack and AI Engineer in Patiala, India, building Python, Next.js, FastAPI, LangGraph and MLOps projects. Open to internships.",
  seoKeywords: [
    "Full-Stack Developer",
    "AI Engineer",
    "Machine Learning",
    "Python",
    "React",
    "Next.js",
    "Agentic AI",
    "LangGraph",
    "MLOps",
    "Data Science",
    "India",
    "Patiala",
  ],
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
