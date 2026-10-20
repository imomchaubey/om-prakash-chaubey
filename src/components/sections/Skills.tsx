import React from "react";
import { skillGroups } from "@/data/skills";

export function Skills(): React.JSX.Element {
  return (
    <section
      id="skills"
      aria-labelledby="heading-skills"
      className="section-spacing border-b border-border-subtle bg-bg"
    >
      <div className="section-container">
        <div className="max-w-2xl">
          <h2 id="heading-skills" className="heading-h2 text-text-primary">
            Skills &amp; Tools
          </h2>
          <p className="mt-3 text-base text-text-muted">
            Languages, machine learning frameworks, data analysis tools, and
            full-stack web technologies.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="flex flex-col rounded-[12px] border border-border-subtle bg-surface p-6 transition-colors hover:border-white/20"
            >
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
                    className="rounded-full border border-border-subtle bg-surface-2 px-3.5 py-1.5 text-sm font-medium text-text-primary/90"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
