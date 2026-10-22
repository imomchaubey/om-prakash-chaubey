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
    summary:
      "Full-stack Zoom web-client clone: start, join and schedule meetings, with a pre-join camera and microphone preview and host controls in the meeting room.",
    problem:
      "Replicate the core Zoom web-client workflows (start, join, schedule and host a meeting) as a full-stack application with a relational backend.",
    approach:
      "A Next.js (App Router, Tailwind CSS) frontend talks over a REST/JSON API to a FastAPI backend that validates requests with Pydantic and stores data through SQLAlchemy in a SQLite database. Instant meetings get a generated 11-digit meeting ID and a host record; joining checks that the meeting exists; the pre-join screen uses the browser's getUserMedia API for a camera and microphone preview and mute preferences; scheduled meetings store a topic, description, date, time and duration. The meeting room has a participant grid, a participant panel and host controls (Mute All, remove participant). A startup script seeds the database with demo data.",
    architecture:
      "Next.js client -> HTTP/REST/JSON -> FastAPI API (Pydantic validation, CORS) -> SQLAlchemy ORM -> SQLite. Three tables: Users, Meetings (meeting code, title, description, host, instant or scheduled type, status, start time, duration) and Participants (who joined which meeting, display name, host or participant role, join and leave times).",
    stack: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "SQLite",
    ],
    verifiedResults: [
      {
        label: "Delivered",
        value:
          "Instant and scheduled meetings, join by meeting ID, camera and microphone pre-join, host controls (Mute All, remove participant)",
      },
      {
        label: "Scope limits",
        value:
          "No authentication (seeded host profile); no multi-user WebRTC media",
      },
    ],
    whatILearned:
      "Scoped the project to the core meeting lifecycle: authentication was replaced by a seeded host profile, and multi-user WebRTC media and signaling were left out because they need dedicated infrastructure beyond the assignment timeline.",
    repoUrl: "https://github.com/imomchaubey/zoom-clone-fullstack",
    demoUrl: "https://zoom-clone-fullstack-nine.vercel.app",
    screenshot: "TODO(screenshot for zoom-clone: public/images/projects/zoom-clone.png)",
    screenshotAlt: "Zoom Clone — start, join and schedule meetings",
  },
  {
    slug: "restaurant-ai-agent",
    title: "Restaurant Order Agent (LangGraph)",
    summary: "LangGraph agent that takes a food order, checks stock, then simulates cooking and serving with retries at each stage.",
    problem: "Explore how a multi-step ordering process (validate the request, extract the order, check stock, cook, serve) with retries and user decisions can be modelled as a LangGraph workflow.",
    approach: "Built with LangGraph and a Groq-hosted LLM (openai/gpt-oss-120b). The LLM acts as a food-only guardrail and extracts the dish and quantity through Pydantic structured output. The order is checked against a fixed menu and marked confirmed, partial or unavailable; for partial orders the user chooses to accept the available amount or place a new order. Cooking and serving are simulated, with retry limits at each stage, and the LLM writes the apology and success messages.",
    architecture: "Graph nodes: llm_node -> order_confirm -> user_decision (for partial or unavailable orders) -> cook -> serve. Cooking succeeds 60% of the time with up to 2 attempts; serving succeeds 80% of the time, and a serving failure sends the order back to cook while retries remain. Order, cook and serve retry counters are kept in the typed graph state.",
    stack: ["Python", "LangGraph", "LangChain", "Groq", "Pydantic"],
    verifiedResults: [
      {
        label: "Demo run",
        value: 'Order "2 pizza" cooked and served successfully (status: complete)',
        context: "Console demo with simulated cooking and serving",
      },
    ],
    whatILearned: "Modelling the workflow as a graph with typed state made every retry limit and failure path explicit. The console version waits for the user with input() inside a node; in a real application LangGraph's interrupt mechanism would be the better fit.",
    repoUrl: "https://github.com/imomchaubey/restrunt-ai-agent",
    demoUrl: null,
    screenshot: "TODO(screenshot for restaurant-ai-agent: public/images/projects/restaurant-ai-agent.png)",
    screenshotAlt: "Restaurant Order Agent (LangGraph) - multi-turn ordering workflow",
  },
  {
    slug: "youtube-sentiment-mlops",
    title: "YouTube Sentiment MLOps Pipeline",
    summary:
      "Chrome extension and FastAPI service that classify the sentiment of YouTube comments as positive, neutral or negative with a TF-IDF and Logistic Regression pipeline.",
    problem:
      "Understand what viewers think about a YouTube video without reading thousands of comments.",
    approach:
      "A Manifest V3 Chrome extension scrapes up to 50 loaded comments from the YouTube page and sends them in a single batch request to a Dockerized FastAPI service. The service cleans the text with a custom NLTK pipeline that keeps negation words, runs it through a TF-IDF (1-2 grams) and Logistic Regression model, and the extension shows the aggregated positive, neutral and negative breakdown. The Dockerfile pre-downloads the NLTK data at build time, and GitHub Actions runs the pytest suite on every push and pull request.",
    architecture:
      "Chrome extension (Manifest V3) -> POST /predict_batch -> FastAPI service in Docker -> text cleaning -> TF-IDF + Logistic Regression -> aggregated sentiment shown in the extension.",
    stack: [
      "Python",
      "Scikit-learn",
      "NLTK",
      "Pandas",
      "FastAPI",
      "Docker",
      "GitHub Actions",
      "Pytest",
      "JavaScript",
    ],
    verifiedResults: [
      {
        label: "Quality gates",
        value:
          "pytest suite runs on every push and pull request through GitHub Actions",
      },
      {
        label: "Model accuracy / F1",
        value: "TODO(model accuracy / F1)",
      },
      {
        label: "Training dataset",
        value: "TODO(training dataset)",
      },
    ],
    whatILearned:
      'Chose TF-IDF with Logistic Regression over a heavier deep-learning model for speed and low memory use, kept negation words such as "not" during text cleaning so that "this video is not good" is not read as positive, and used one batch endpoint instead of 50 separate requests.',
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
      "Hybrid intrusion-detection pipeline combining K-Means clustering, Isolation Forest anomaly scores and a Random Forest classifier, evaluated on UNSW-NB15 and cross-tested on CIC-IDS2017.",
    problem: "Traditional intrusion detection systems struggle with evolving attack patterns and with imbalanced attack classes.",
    approach:
      "K-Means groups similar network traffic profiles, Isolation Forest generates anomaly scores within each cluster, and a Random Forest uses the original features plus the anomaly score to classify traffic as Normal or Attack. SMOTE oversampling handles class imbalance, and custom ratio features (for example bytes and load ratios between source and destination) capture protocol-specific behaviour. UNSW-NB15 is used for training and validation; the DoS-Wednesday subset of CIC-IDS2017 is used for cross-dataset testing.",
    architecture: "K-Means clustering -> per-cluster Isolation Forest anomaly score -> Random Forest classifier (original features + anomaly score) -> Normal / Attack. Outputs include PCA cluster plots, ROC curves, confusion matrices and feature-importance plots.",
    stack: ["Python", "Scikit-learn", "K-Means", "Isolation Forest", "Random Forest", "SMOTE"],
    verifiedResults: [
      {
        label: "Evaluation data",
        value: "UNSW-NB15 (training and validation); CIC-IDS2017 DoS-Wednesday subset (cross-dataset test)",
      },
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
    whatILearned: "Cross-testing on CIC-IDS2017 showed how feature alignment affects accuracy when a model trained on UNSW-NB15 is applied to a different network environment (domain adaptation).",
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
