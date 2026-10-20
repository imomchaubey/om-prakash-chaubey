import { isTodo } from "@/utils/todo";

export interface ProjectMetric {
  readonly label: string;
  readonly value: string;
  readonly context?: string;
}

export interface FeaturedProject {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly problem: string;
  readonly approach: string;
  readonly architecture: string;
  readonly stack: ReadonlyArray<string>;
  readonly verifiedResults: ReadonlyArray<ProjectMetric>;
  readonly whatILearned: string;
  readonly repoUrl: string;
  readonly demoUrl: string | null;
  readonly screenshot: string;
  readonly screenshotAlt: string;
  readonly cardHighlightBadge?: string;
}

export interface OtherProject {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly summary: string;
  readonly stack: ReadonlyArray<string>;
  readonly repoUrl: string;
  readonly demoUrl: string | null;
}

export const featuredProjects: ReadonlyArray<FeaturedProject> = [
  {
    slug: "zoom-clone",
    title: "Zoom Clone",
    summary: "Full-stack video conferencing.",
    problem: "TODO(problem statement for Zoom Clone)",
    approach: "Full-stack video conferencing built with TypeScript, Next.js, FastAPI, and WebRTC.",
    architecture: "Simplified overview: Next.js frontend, FastAPI backend, WebRTC.",
    stack: ["TypeScript", "Next.js", "FastAPI", "WebRTC"],
    verifiedResults: [
      {
        label: "Results",
        value: "TODO(verified results for Zoom Clone)",
      },
    ],
    whatILearned: "TODO(what I learned for Zoom Clone)",
    repoUrl: "https://github.com/imomchaubey/zoom-clone-fullstack",
    demoUrl: null,
    screenshot: "TODO(screenshot for zoom-clone: public/images/projects/zoom-clone.png)",
    screenshotAlt: "Zoom Clone — full-stack video conferencing",
  },
  {
    slug: "restaurant-ai-agent",
    title: "Autonomous Restaurant AI Agent",
    summary: "Multi-turn conversational ordering agent.",
    problem: "TODO(problem statement for Autonomous Restaurant AI Agent)",
    approach: "Multi-turn conversational ordering agent built with Python, LangGraph, and LLMs.",
    architecture: "TODO(architecture overview for Autonomous Restaurant AI Agent)",
    stack: ["Python", "LangGraph", "LLMs"],
    verifiedResults: [
      {
        label: "Results",
        value: "TODO(verified results for Autonomous Restaurant AI Agent)",
      },
    ],
    whatILearned: "TODO(what I learned for Autonomous Restaurant AI Agent)",
    repoUrl: "https://github.com/imomchaubey/restrunt-ai-agent",
    demoUrl: null,
    screenshot: "TODO(screenshot for restaurant-ai-agent: public/images/projects/restaurant-ai-agent.png)",
    screenshotAlt: "Autonomous Restaurant AI Agent — multi-turn conversational ordering agent",
  },
  {
    slug: "youtube-sentiment-mlops",
    title: "YouTube Sentiment MLOps Pipeline",
    summary:
      "End-to-end sentiment classification pipeline (TF-IDF features + Logistic Regression) served through a FastAPI service, containerised with Docker and tested with GitHub Actions CI.",
    problem: "TODO(problem statement for YouTube Sentiment MLOps Pipeline)",
    approach:
      "End-to-end sentiment classification pipeline (TF-IDF features + Logistic Regression) served through a FastAPI service, containerised with Docker and tested with GitHub Actions CI.",
    architecture: "TODO(architecture overview for YouTube Sentiment MLOps Pipeline)",
    stack: ["Python", "Scikit-learn", "FastAPI", "Docker", "GitHub Actions"],
    verifiedResults: [
      {
        label: "Results",
        value: "TODO(confirm details against repo README for YouTube Sentiment MLOps Pipeline)",
      },
    ],
    whatILearned: "TODO(what I learned for YouTube Sentiment MLOps Pipeline)",
    repoUrl: "https://github.com/imomchaubey/youtube-sentiment-mlops",
    demoUrl: null,
    screenshot:
      "TODO(screenshot for youtube-sentiment-mlops: public/images/projects/youtube-sentiment-mlops.png)",
    screenshotAlt: "YouTube Sentiment MLOps Pipeline",
  },
  {
    slug: "network-anomaly-detection",
    title: "Network Traffic Anomaly Detection",
    summary:
      "Hybrid classifier combining Isolation Forest decision functions with a Random Forest, using SMOTE oversampling to handle minority attack classes.",
    problem: "TODO(problem statement for Network Traffic Anomaly Detection)",
    approach:
      "Hybrid classifier combining Isolation Forest decision functions with a Random Forest, using SMOTE oversampling to handle minority attack classes. Dataset: UNSW-NB15. Cross-tested on CIC-IDS2017 to analyse domain-adaptation challenges.",
    architecture: "TODO(architecture overview for Network Traffic Anomaly Detection)",
    stack: ["Python", "Scikit-learn", "Isolation Forest", "Random Forest", "SMOTE"],
    verifiedResults: [
      {
        label: "F1-score (UNSW-NB15, attack class)",
        value: "0.96",
      },
      {
        label: "Precision (UNSW-NB15, attack class)",
        value: "1.00",
        context: "Zero false positives in primary testing",
      },
      {
        label: "Accuracy (UNSW-NB15)",
        value: "95%",
      },
      {
        label: "Recall (UNSW-NB15)",
        value: "TODO(recall)",
      },
      {
        label: "Train/test split",
        value: "TODO(train/test split)",
      },
      {
        label: "Class balance",
        value: "TODO(class balance)",
      },
      {
        label: "CIC-IDS2017 cross-test results",
        value: "TODO(CIC-IDS2017 cross-test results)",
      },
    ],
    whatILearned: "TODO(what I learned for Network Traffic Anomaly Detection)",
    repoUrl: "https://github.com/imomchaubey/Anamoly_detection_in-_Network",
    demoUrl: null,
    screenshot:
      "TODO(screenshot for network-anomaly-detection: public/images/projects/network-anomaly-detection.png)",
    screenshotAlt: "Network Traffic Anomaly Detection",
    cardHighlightBadge: "0.96 F1 · attack class",
  },
];

export const otherProjects: ReadonlyArray<OtherProject> = [
  {
    id: "ecommerce-dashboard",
    title: "E-Commerce Data Analysis & Prediction Dashboard",
    date: "2025",
    summary:
      "XGBoost model for predictive analytics reaching ~90% overall accuracy and improving recall from 54% to 82%; interactive Streamlit dashboard visualising business KPIs, including an Average Order Value of INR 158 and delivery-delay and seasonal-sales insights.",
    stack: ["Python", "XGBoost", "Streamlit"],
    repoUrl: "TODO(repo link)",
    demoUrl: null,
  },
  {
    id: "emotion-recognition-dl",
    title: "Emotion Recognition with Deep Learning",
    date: "2025",
    summary:
      "Convolutional model reaching 85.75% accuracy on held-out test data, using data augmentation (noise addition, pitch shifting); diagnosed real-world acoustic domain mismatch with live microphone demonstrations.",
    stack: ["Python", "Deep Learning (CNN)"],
    repoUrl: "TODO(repo link)",
    demoUrl: null,
  },
  {
    id: "topsis-nlp-ranking",
    title: "TOPSIS Ranking Framework for NLP Models",
    date: "Feb 2025",
    summary:
      "Python implementation of the TOPSIS algorithm ranking BERT, RoBERTa and DistilBERT on Cosine Similarity, Accuracy, Inference Time and Model Size; automated NumPy/Pandas pipeline exporting ranked CSVs and bar charts.",
    stack: ["Python", "NumPy", "Pandas"],
    repoUrl: "TODO(repo link)",
    demoUrl: null,
  },
];

/**
 * Computes total project count (featured + other) directly from data.
 */
export function getTotalProjectCount(): number {
  return featuredProjects.length + otherProjects.length;
}

export function getFeaturedProjectBySlug(slug: string): FeaturedProject | undefined {
  return featuredProjects.find((project) => project.slug === slug);
}

/**
 * A featured project is eligible for a case-study page, "Case study" link, and sitemap entry
 * ONLY if `problem`, `approach`, and `whatILearned` contain no TODO AND `verifiedResults`
 * contains at least one non-TODO row.
 */
export function isProjectCaseStudyEligible(project: FeaturedProject): boolean {
  if (
    isTodo(project.problem) ||
    isTodo(project.approach) ||
    isTodo(project.whatILearned)
  ) {
    return false;
  }

  const nonTodoMetrics = project.verifiedResults.filter(
    (metric) => !isTodo(metric.value) && !isTodo(metric.label)
  );

  return nonTodoMetrics.length > 0;
}

export function getEligibleFeaturedProjects(): ReadonlyArray<FeaturedProject> {
  return featuredProjects.filter(isProjectCaseStudyEligible);
}
