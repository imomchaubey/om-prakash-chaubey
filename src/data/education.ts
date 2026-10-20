export interface EducationEntry {
  readonly degree: string;
  readonly institution: string;
  readonly location: string;
  readonly period: string;
  readonly cgpa: string;
}

export interface CertificationEntry {
  readonly id: string;
  readonly title: string;
  readonly issuer?: string;
  readonly credentialUrl: string;
  readonly credentialIsTodo: boolean;
}

export const educationEntries: ReadonlyArray<EducationEntry> = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Thapar Institute of Engineering & Technology",
    location: "Patiala, Punjab, India",
    period: "Aug 2023 – May 2027 (Expected)",
    cgpa: "7.18/10.0",
  },
];

export const certifications: ReadonlyArray<CertificationEntry> = [
  {
    id: "google-ai-specialization",
    title: "Google AI Specialization",
    issuer: "Coursera",
    credentialUrl: "TODO(certificate URLs)",
    credentialIsTodo: true,
  },
  {
    id: "nvidia-deep-learning",
    title: "NVIDIA: Fundamentals of Deep Learning",
    issuer: "NVIDIA",
    credentialUrl: "TODO(certificate URLs)",
    credentialIsTodo: true,
  },
  {
    id: "deep-learning-pytorch",
    title: "Deep Learning with PyTorch",
    credentialUrl: "TODO(certificate URLs)",
    credentialIsTodo: true,
  },
  {
    id: "transfer-learning-tf-hub",
    title: "Transfer Learning for NLP with TensorFlow Hub",
    credentialUrl: "TODO(certificate URLs)",
    credentialIsTodo: true,
  },
  {
    id: "genai-ml-pyspark",
    title: "Generative AI & Machine Learning with PySpark",
    credentialUrl: "TODO(certificate URLs)",
    credentialIsTodo: true,
  },
];

/**
 * Computes total certification count from data.
 */
export function getCertificationCount(): number {
  return certifications.length;
}
