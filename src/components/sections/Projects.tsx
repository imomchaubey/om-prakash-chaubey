import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  featuredProjects,
  otherProjects,
  isProjectCaseStudyEligible,
} from "@/data/projects";
import { isTodo } from "@/utils/todo";
import { ProjectScreenshot } from "@/components/ui/ProjectScreenshot";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Projects(): React.JSX.Element {
  return (
    <section
      id="projects"
      aria-labelledby="heading-projects"
      className="section-spacing border-b border-border-subtle bg-bg"
    >
      <div className="section-container">
        <ScrollReveal className="max-w-2xl">
          <h2 id="heading-projects" className="heading-h2 text-text-primary">
            Projects
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Selected full-stack engineering, conversational AI, MLOps, and
            applied machine learning projects.
          </p>
        </ScrollReveal>

        {/* 4 Featured Project Cards with Cursor-Following Soft Spotlight */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredProjects.map((project, index) => {
            const caseStudyEligible = isProjectCaseStudyEligible(project);
            const hasRepoUrl = Boolean(project.repoUrl) && !isTodo(project.repoUrl);
            const hasDemoUrl = Boolean(project.demoUrl) && !isTodo(project.demoUrl);

            return (
              <ScrollReveal key={project.slug} delayMs={index * 70}>
                <SpotlightCard
                  as="article"
                  className="flex h-full flex-col overflow-hidden rounded-[12px] border border-border-subtle bg-surface transition-all hover:-translate-y-0.5 hover:border-white/25"
                >
                  <ProjectScreenshot
                    title={project.title}
                    stack={project.stack}
                    screenshot={project.screenshot}
                    screenshotAlt={project.screenshotAlt}
                  />

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-xl font-semibold text-text-primary">
                        {project.title}
                      </h3>

                      {project.cardHighlightBadge && (
                        <span className="inline-flex items-center rounded-full border border-accent/40 bg-surface-2 px-3 py-1 text-xs font-bold text-accent">
                          {project.cardHighlightBadge}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-base leading-relaxed text-text-muted">
                      {project.summary}
                    </p>

                    {/* Stack Chips */}
                    <ul
                      aria-label={`${project.title} technology stack`}
                      className="mt-5 flex flex-wrap gap-2"
                    >
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-border-subtle bg-surface-2 px-3 py-1 text-xs font-medium text-text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons (44px min-height for mobile touch targets) */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4">
                      {hasRepoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code on GitHub`}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-border-subtle bg-surface-2 px-4 py-2.5 text-sm font-semibold text-text-primary transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent active:translate-y-0 active:scale-[0.99]"
                        >
                          <FaGithub className="h-4 w-4" aria-hidden="true" />
                          <span>GitHub</span>
                        </a>
                      )}

                      {hasDemoUrl && project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live demo for ${project.title}`}
                          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[10px] bg-accent px-4 py-2.5 text-sm font-bold text-bg transition-all hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 active:scale-[0.99]"
                        >
                          <span>Live demo</span>
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}

                      {caseStudyEligible && (
                        <Link
                          href={`/projects/${project.slug}`}
                          aria-label={`Read case study for ${project.title}`}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] bg-accent px-4 py-2.5 text-sm font-bold text-bg transition-all hover:-translate-y-0.5 hover:bg-accent-hover active:translate-y-0 active:scale-[0.99]"
                        >
                          <BookOpen className="h-4 w-4" aria-hidden="true" />
                          <span>Case study</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* More Projects Compact Grid (3 Other Projects) */}
        <div className="mt-16">
          <ScrollReveal>
            <h3 className="text-xl font-semibold text-text-primary">
              More Projects
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              Additional machine learning, deep learning, and mathematical
              optimisation projects from academic and independent work.
            </p>
          </ScrollReveal>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {otherProjects.map((project, index) => {
              const hasValidRepo =
                Boolean(project.repoUrl) && !isTodo(project.repoUrl);
              const hasValidDemo =
                Boolean(project.demoUrl) && !isTodo(project.demoUrl);

              return (
                <ScrollReveal key={project.id} delayMs={index * 60}>
                  <SpotlightCard
                    as="article"
                    className="flex h-full flex-col justify-between rounded-[12px] border border-border-subtle bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-white/25"
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-text-primary">
                          {project.title}
                        </h4>
                        <span className="shrink-0 rounded-full border border-border-subtle bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-text-muted">
                          {project.date}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-text-muted">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-5">
                      <ul
                        aria-label={`${project.title} technology stack`}
                        className="flex flex-wrap gap-1.5"
                      >
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-border-subtle bg-surface-2 px-2.5 py-1 text-xs font-medium text-text-muted"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>

                      {(hasValidRepo || hasValidDemo) && (
                        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-3">
                          {hasValidRepo && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${project.title} source code on GitHub`}
                              className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-semibold text-text-primary transition-colors hover:text-accent"
                            >
                              <FaGithub
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                              <span>GitHub</span>
                            </a>
                          )}
                          {hasValidDemo && project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open live demo for ${project.title}`}
                              className="inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-hover"
                            >
                              <span>Live demo</span>
                              <ArrowUpRight
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
