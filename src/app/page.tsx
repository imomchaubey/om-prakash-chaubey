import React from "react";
import fs from "node:fs";
import path from "node:path";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { siteConfig } from "@/data/site";

export default function HomePage(): React.JSX.Element {
  const resumeDiskPath = path.join(
    process.cwd(),
    "public",
    siteConfig.resumePath.replace(/^\//, "")
  );
  const hasResumePdf = fs.existsSync(resumeDiskPath);

  return (
    <>
      <Hero hasResumePdf={hasResumePdf} />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
