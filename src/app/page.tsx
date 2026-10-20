import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
    </>
  );
}
