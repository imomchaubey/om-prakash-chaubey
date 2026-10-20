import React from "react";
import { GraduationCap, Award, Globe, ExternalLink } from "lucide-react";
import { profileData } from "@/data/profile";
import {
  educationEntries,
  certifications,
  getCertificationCount,
} from "@/data/education";
import { isTodo } from "@/utils/todo";

export function About(): React.JSX.Element {
  const showBio = Boolean(profileData.aboutBio) && !isTodo(profileData.aboutBio);
  const totalCerts = getCertificationCount();

  return (
    <section
      id="about"
      aria-labelledby="heading-about"
      className="section-spacing border-b border-border-subtle bg-bg"
    >
      <div className="section-container">
        <div className="max-w-2xl">
          <h2 id="heading-about" className="heading-h2 text-text-primary">
            About
          </h2>
          {showBio && (
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              {profileData.aboutBio}
            </p>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Education Timeline & Spoken Languages */}
          <div className="flex flex-col gap-8 lg:col-span-6">
            {/* Education Card */}
            <div className="rounded-[12px] border border-border-subtle bg-surface p-6">
              <div className="flex items-center gap-2.5">
                <GraduationCap
                  className="h-5 w-5 text-accent"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold text-text-primary">
                  Education
                </h3>
              </div>

              <ol className="mt-5 space-y-6 border-l-2 border-accent/40 pl-5">
                {educationEntries.map((entry) => (
                  <li key={entry.degree} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg"
                    />
                    <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                      {entry.period}
                    </p>
                    <p className="mt-1 text-base font-semibold text-text-primary">
                      {entry.degree}
                    </p>
                    <p className="mt-0.5 text-sm text-text-muted">
                      {entry.institution} · {entry.location}
                    </p>
                    <p className="mt-2 inline-block rounded-full border border-border-subtle bg-surface-2 px-3 py-1 text-xs font-medium text-text-primary">
                      CGPA: {entry.cgpa}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Spoken Languages Card */}
            <div className="rounded-[12px] border border-border-subtle bg-surface p-6">
              <div className="flex items-center gap-2.5">
                <Globe className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-text-primary">
                  Spoken Languages
                </h3>
              </div>

              <ul
                aria-label="Spoken languages"
                className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {profileData.spokenLanguages.map((item) => (
                  <li
                    key={item.language}
                    className="rounded-[10px] border border-border-subtle bg-surface-2 p-3.5"
                  >
                    <p className="text-sm font-semibold text-text-primary">
                      {item.language}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {item.proficiency}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Certifications List */}
          <div className="lg:col-span-6">
            <div className="flex h-full flex-col rounded-[12px] border border-border-subtle bg-surface p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Award className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-text-primary">
                    Certifications
                  </h3>
                </div>
                <span className="rounded-full border border-border-subtle bg-surface-2 px-3 py-0.5 text-xs font-semibold text-accent">
                  {totalCerts}
                </span>
              </div>

              <ul
                aria-label="Certifications"
                className="mt-5 divide-y divide-border-subtle"
              >
                {certifications.map((cert) => {
                  const hasValidUrl =
                    Boolean(cert.credentialUrl) && !isTodo(cert.credentialUrl);

                  return (
                    <li
                      key={cert.id}
                      className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-text-primary sm:text-base">
                          {cert.title}
                        </p>
                        {cert.issuer && (
                          <p className="mt-0.5 text-xs text-text-muted">
                            {cert.issuer}
                          </p>
                        )}
                      </div>

                      {hasValidUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View credential for ${cert.title}`}
                          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border-subtle bg-surface-2 px-3 py-1 text-xs font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                        >
                          <span>Credential</span>
                          <ExternalLink
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
