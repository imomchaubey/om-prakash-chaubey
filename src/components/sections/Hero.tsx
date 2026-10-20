"use client";

import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaKaggle } from "react-icons/fa6";
import { Download, ArrowDownRight } from "lucide-react";
import { profileData, type SocialPlatform } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { getTotalProjectCount } from "@/data/projects";
import { getUniqueTechnologyCount } from "@/data/skills";
import { useLenisScroll } from "@/components/layout/LenisProvider";

function renderSocialIcon(platform: SocialPlatform): React.JSX.Element {
  switch (platform) {
    case "GitHub":
      return <FaGithub className="h-4 w-4" aria-hidden="true" />;
    case "LinkedIn":
      return <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />;
    case "Kaggle":
      return <FaKaggle className="h-4 w-4" aria-hidden="true" />;
  }
}

export function Hero(): React.JSX.Element {
  const { scrollTo } = useLenisScroll();
  const totalProjects = getTotalProjectCount();
  const totalSkillsAndTools = getUniqueTechnologyCount();

  const handleViewProjectsClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    scrollTo("#projects", { offset: -80 });
    window.history.replaceState(null, "", "#projects");
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="hero-angled-bg relative overflow-hidden border-b border-border-subtle pt-10 pb-0 lg:pt-16"
    >
      {/* Subtle orange ambient glow behind the title (matching reference design) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-[8%] -z-0 h-[340px] w-[420px] -translate-y-1/2 rounded-full bg-accent/12 blur-[110px]"
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Text, Socials, CTAs, Stats Card */}
          <div className="flex flex-col items-start pb-10 lg:col-span-7 lg:pb-16">
            {/* Availability Badge (small pill, orange dot) */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs font-medium text-text-muted">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#ff6b00]"
              />
              <span>{profileData.availabilityBadge}</span>
            </div>

            {/* Greeting & Name */}
            <p className="mt-6 text-base font-medium text-text-muted sm:text-lg">
              {profileData.greeting}
            </p>
            <p className="mt-1 text-2xl font-medium tracking-tight text-text-primary sm:text-3xl">
              {profileData.name}
            </p>

            {/* Primary H1 (the only h1 on the page, large bold orange) */}
            <h1 className="heading-h1 mt-2 text-accent">
              {profileData.roleTitle}
            </h1>

            {/* One-sentence verified value statement */}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              {profileData.valueStatement}
            </p>

            {/* Circular Social Icons with subtle borders */}
            <ul
              aria-label="Social media profiles"
              className="mt-6 flex items-center gap-3.5"
            >
              {profileData.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-muted transition-all hover:border-accent hover:bg-surface-2 hover:text-text-primary"
                  >
                    {renderSocialIcon(social.platform)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Two Buttons Side-by-Side */}
            <div className="mt-8 flex flex-row flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#projects"
                onClick={handleViewProjectsClick}
                className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-5 py-3 text-sm font-bold text-bg transition-colors hover:bg-accent-hover active:scale-[0.99] sm:px-7 sm:py-3.5"
              >
                <span>View Projects</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={siteConfig.resumePath}
                download
                aria-label="Download Om Prakash Chaubey Resume PDF"
                className="inline-flex items-center gap-2 rounded-[10px] border border-text-muted/50 bg-transparent px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-text-primary hover:bg-surface-2 active:scale-[0.99] sm:px-7 sm:py-3.5"
              >
                <Download className="h-4 w-4 text-text-muted" aria-hidden="true" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Stats Card with Rounded Dark Surface and Thin Vertical Dividers */}
            <dl
              aria-label="Portfolio key statistics"
              className="mt-10 grid w-full max-w-xl grid-cols-1 divide-y divide-border-subtle rounded-[12px] border border-border-subtle bg-surface/95 p-5 shadow-xl sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:p-6"
            >
              <div className="pb-4 sm:pr-5 sm:pb-0">
                <dd className="text-2xl font-bold tracking-tight text-accent sm:text-3xl">
                  {totalProjects}
                </dd>
                <dt className="mt-1 text-sm font-medium text-text-primary/90">
                  {profileData.headlineStats.projectsLabel}
                </dt>
              </div>

              <div className="py-4 sm:px-5 sm:py-0">
                <dd className="text-2xl font-bold tracking-tight text-accent sm:text-3xl">
                  {totalSkillsAndTools}
                </dd>
                <dt className="mt-1 text-sm font-medium text-text-primary/90">
                  {profileData.headlineStats.skillsLabel}
                </dt>
              </div>

              <div className="pt-4 sm:pt-0 sm:pl-5">
                <dd className="text-2xl font-bold tracking-tight text-accent sm:text-3xl">
                  {profileData.headlineStats.highlightValue}
                </dd>
                <dt className="mt-1 text-sm font-medium text-text-primary/90">
                  {profileData.headlineStats.highlightLabel}
                </dt>
              </div>
            </dl>
          </div>

          {/* Right Column: Portrait Cutout Overlapping Softly-Lighter Circle, Bottom Edge Cropped by Hero */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative flex h-[360px] w-[320px] items-end justify-center sm:h-[440px] sm:w-[400px] lg:h-[520px] lg:w-[460px]">
              {/* Large softly-lighter circular backdrop shifted slightly right/down so the portrait overlaps its perimeter */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 right-1 h-[290px] w-[290px] rounded-full border border-white/12 bg-[#1F1F1F] shadow-[0_0_60px_rgba(255,107,0,0.06),inset_0_1px_28px_rgba(255,255,255,0.05)] sm:h-[360px] sm:w-[360px] lg:-bottom-8 lg:right-2 lg:h-[420px] lg:w-[420px]"
              />

              {/* Portrait image overlapping top/left of the lighter circle, bottom edge cropped by hero overflow-hidden */}
              <div className="relative z-10 -mb-4 mr-4 h-[330px] w-[300px] sm:-mb-5 sm:mr-6 sm:h-[400px] sm:w-[370px] lg:-mb-6 lg:mr-8 lg:h-[470px] lg:w-[430px]">
                <Image
                  src={profileData.portraitPath}
                  alt={profileData.portraitAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 370px, 430px"
                  className="object-contain object-bottom drop-shadow-[0_18px_32px_rgba(0,0,0,0.85)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
