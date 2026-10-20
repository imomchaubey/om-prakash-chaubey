import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  getEligibleFeaturedProjects,
  getFeaturedProjectBySlug,
  isProjectCaseStudyEligible,
} from "@/data/projects";
import { isTodo } from "@/utils/todo";
import { ProjectScreenshot } from "@/components/ui/ProjectScreenshot";
import { ZoomArchDiagram } from "@/components/ui/ZoomArchDiagram";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  const eligible = getEligibleFeaturedProjects();
  return eligible.map((project) => ({ slug: project.slug }));
}

interface CaseStudyPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);

  if (!project || !isProjectCaseStudyEligible(project)) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: CaseStudyPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const project = getFeaturedProjectBySlug(slug);

  if (!project || !isProjectCaseStudyEligible(project)) {
    notFound();
  }

  const nonTodoMetrics = project.verifiedResults.filter(
    (metric) => !isTodo(metric.value) && !isTodo(metric.label)
  );
  const showArchitectureSection =
    (Boolean(project.architecture) && !isTodo(project.architecture)) ||
    project.slug === "zoom-clone";
  const hasValidRepo = Boolean(project.repoUrl) && !isTodo(project.repoUrl);
  const hasValidDemo = Boolean(project.demoUrl) && !isTodo(project.demoUrl);

  return (
    <article className="section-spacing bg-bg">
      <div className="section-container max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Projects</span>
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="heading-h1 text-text-primary">{project.title}</h1>
            {project.cardHighlightBadge && (
              <span className="rounded-full border border-accent/40 bg-surface-2 px-3.5 py-1 text-xs font-bold text-accent">
                {project.cardHighlightBadge}
              </span>
            )}
          </div>

          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            {project.summary}
          </p>

          <ul
            aria-label="Project stack"
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border-subtle bg-surface px-3.5 py-1 text-xs font-medium text-text-primary"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {hasValidRepo && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="inline-flex items-center gap-2 rounded-[10px] border border-border-subtle bg-surface px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                <span>GitHub Repository</span>
              </a>
            )}

            {hasValidDemo && project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title}`}
                className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-colors hover:bg-accent-hover"
              >
                <span>Live demo</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </header>

        <div className="mt-10 overflow-hidden rounded-[12px] border border-border-subtle bg-surface">
          <ProjectScreenshot
            title={project.title}
            stack={project.stack}
            screenshot={project.screenshot}
            screenshotAlt={project.screenshotAlt}
          />
        </div>

        <div className="mt-12 space-y-10">
          {/* Problem */}
          <section aria-labelledby="case-study-problem">
            <h2
              id="case-study-problem"
              className="heading-h2 text-text-primary"
            >
              Problem
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-muted">
              {project.problem}
            </p>
          </section>

          {/* Approach */}
          <section aria-labelledby="case-study-approach">
            <h2
              id="case-study-approach"
              className="heading-h2 text-text-primary"
            >
              Approach
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-muted">
              {project.approach}
            </p>
          </section>

          {/* Architecture (hidden if TODO) */}
          {showArchitectureSection && (
            <section aria-labelledby="case-study-architecture">
              <h2
                id="case-study-architecture"
                className="heading-h2 text-text-primary"
              >
                Architecture
              </h2>
              {!isTodo(project.architecture) && (
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {project.architecture}
                </p>
              )}
              {project.slug === "zoom-clone" && (
                <div className="mt-5">
                  <ZoomArchDiagram />
                </div>
              )}
            </section>
          )}

          {/* Results Table */}
          {nonTodoMetrics.length > 0 && (
            <section aria-labelledby="case-study-results">
              <h2
                id="case-study-results"
                className="heading-h2 text-text-primary"
              >
                Results
              </h2>
              <div className="mt-4 overflow-x-auto rounded-[12px] border border-border-subtle bg-surface">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border-subtle bg-surface-2">
                      <th
                        scope="col"
                        className="px-5 py-3.5 font-semibold text-text-primary"
                      >
                        Metric
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3.5 font-semibold text-text-primary"
                      >
                        Verified Value
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3.5 font-semibold text-text-primary"
                      >
                        Context
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {nonTodoMetrics.map((metric) => (
                      <tr key={metric.label}>
                        <td className="px-5 py-3.5 font-medium text-text-primary">
                          {metric.label}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-accent">
                          {metric.value}
                        </td>
                        <td className="px-5 py-3.5 text-text-muted">
                          {metric.context && !isTodo(metric.context)
                            ? metric.context
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* What I Learned */}
          <section aria-labelledby="case-study-learned">
            <h2
              id="case-study-learned"
              className="heading-h2 text-text-primary"
            >
              What I Learned
            </h2>
            <p className="mt-3 text-base leading-relaxed text-text-muted">
              {project.whatILearned}
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
