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
  readonly address: {
    readonly addressLocality: string;
    readonly addressCountry: string;
  };
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
  address: {
    addressLocality: "Patiala",
    addressCountry: "IN",
  },
  roleTitle: "Full-Stack & AI Engineer",
  availabilityBadge: "Open to internships & entry-level roles",
  valueStatement:
    "Full-Stack Developer and B.Tech Computer Science student at Thapar Institute building web apps, LangGraph AI agents, and ML pipelines.",
  aboutBio:
    "I am a pre-final year Computer Science and Engineering student at Thapar Institute, specializing in AI/ML and full-stack web development. I focus on architecting end-to-end solutions that bridge the gap between complex machine learning models and scalable, user-centric applications. My recent technical work spans building autonomous AI agents using LangGraph, deploying containerized MLOps pipelines, and engineering decentralized IoT platforms like De-Insure. I am driven by a passion for leveraging data-driven insights and modern backend frameworks to build robust, impactful software.",
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
