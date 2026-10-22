export type SkillCategory =
  | "Languages"
  | "AI & ML"
  | "Data Science & Analysis"
  | "Backend & Cloud"
  | "Frontend";

export interface SkillGroup {
  readonly category: SkillCategory;
  readonly items: ReadonlyArray<string>;
}

export const skillGroups: ReadonlyArray<SkillGroup> = [
  {
    category: "Languages",
    items: ["Python", "C++", "C", "TypeScript", "JavaScript", "R", "SQL"],
  },
  {
    category: "AI & ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "XGBoost",
      "Random Forest",
      "Isolation Forest",
      "SMOTE",
      "LangChain",
      "LangGraph",
    ],
  },
  {
    category: "Data Science & Analysis",
    items: [
      "Pandas",
      "NumPy",
      "Statistics",
      "Predictive Modeling",
      "Matplotlib",
      "Seaborn",
      "Streamlit",
      "TOPSIS",
      "Linear Programming (PuLP)",
    ],
  },
  {
    category: "Backend & Cloud",
    items: ["FastAPI", "Flask", "Node.js", "Docker", "CI/CD", "Git"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
];

/**
 * Computes the total number of unique technologies across all skill categories.
 * Derived directly from `skillGroups` — never hardcoded.
 */
export function getUniqueTechnologyCount(): number {
  const uniqueSkills = new Set<string>();
  for (const group of skillGroups) {
    for (const item of group.items) {
      uniqueSkills.add(item);
    }
  }
  return uniqueSkills.size;
}
