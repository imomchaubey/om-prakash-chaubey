export type SocialPlatform = "GitHub" | "LinkedIn" | "Kaggle";

export interface SocialLink {
  readonly platform: SocialPlatform;
  readonly url: string;
  readonly ariaLabel: string;
}

export interface SpokenLanguage {
  readonly language: string;
  readonly proficiency: string;
}

export interface ProfileData {
  readonly greeting: string;
  readonly name: string;
  readonly location: string;
  readonly roleTitle: string;
  readonly availabilityBadge: string;
  readonly valueStatement: string;
  readonly aboutBio: string;
  readonly headlineStats: {
    readonly projectsLabel: string;
    readonly skillsLabel: string;
    readonly highlightValue: string;
    readonly highlightLabel: string;
  };
  readonly portraitPath: string;
  readonly portraitAlt: string;
  readonly socials: ReadonlyArray<SocialLink>;
  readonly spokenLanguages: ReadonlyArray<SpokenLanguage>;
}

export const profileData: ProfileData = {
  greeting: "Hi, I'm",
  name: "Om Prakash Chaubey",
  location: "Patiala, Punjab, India",
  roleTitle: "Full-Stack & AI Engineer",
  availabilityBadge: "Open to internships & entry-level roles",
  valueStatement:
    "B.Tech Computer Science student at Thapar Institute building full-stack web apps, LangGraph AI agents, and ML pipelines.",
  aboutBio: "TODO(about bio, 3–4 sentences from Om)",
  headlineStats: {
    projectsLabel: "Projects",
    skillsLabel: "Skills & Tools",
    highlightValue: "0.96 F1",
    highlightLabel: "Attack Detection",
  },
  portraitPath: "/images/portrait.png",
  portraitAlt: "Portrait of Om Prakash Chaubey",
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/imomchaubey",
      ariaLabel: "Om Prakash Chaubey on GitHub",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/ochaubey",
      ariaLabel: "Om Prakash Chaubey on LinkedIn",
    },
    {
      platform: "Kaggle",
      url: "https://www.kaggle.com/omchaubey",
      ariaLabel: "Om Prakash Chaubey on Kaggle",
    },
  ],
  spokenLanguages: [
    { language: "English", proficiency: "Professional" },
    { language: "Hindi", proficiency: "Fluent" },
    { language: "Nepali", proficiency: "Native" },
  ],
};
