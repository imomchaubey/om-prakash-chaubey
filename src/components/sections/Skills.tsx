import React from "react";
import { skillGroups } from "@/data/skills";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Skills(): React.JSX.Element {
  return (
    <section
      id="skills"
      aria-labelledby="heading-skills"
      className="section-spacing border-b border-border-subtle bg-bg"
    >
      <div className="section-container">
        <ScrollReveal className="max-w-2xl">
          <h2 id="heading-skills" className="heading-h2 text-text-primary">
            Skills &amp; Tools
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Languages, machine learning frameworks, data analysis tools, and
            full-stack web technologies.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <ScrollReveal key={group.category} delayMs={index * 60}>
              <div className="flex h-full flex-col rounded-[12px] border border-border-subtle bg-surface p-6 transition-all hover:border-white/25 hover:bg-surface-2/40">
                <h3 className="text-lg font-semibold text-text-primary">
                  {group.category}
                </h3>

                <ul
                  aria-label={`${group.category} skills`}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border-subtle bg-surface-2 px-3.5 py-1.5 text-sm font-medium text-text-primary/90 transition-colors hover:border-accent/50 hover:text-text-primary"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
