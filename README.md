# Om Prakash Chaubey — Full-Stack & AI Engineer Portfolio

Personal developer portfolio for **Om Prakash Chaubey** (B.Tech Computer Science & Engineering student at Thapar Institute of Engineering & Technology, Patiala, graduating May 2027). Built with Next.js App Router, React 19, TypeScript, and Tailwind CSS v4 to showcase Full-Stack, Agentic AI, MLOps, and Machine Learning projects.

For direct contact details and social profiles, please use the **Contact** section on the live site.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Static Site Generation)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (`strict: true`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`)
- **Smooth Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis) (automatically disabled when `prefers-reduced-motion: reduce` is active)
- **Reduced-Motion Detection**: [Motion](https://motion.dev/) (`useReducedMotion`)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons (`react-icons/fa6`)](https://react-icons.github.io/react-icons/)

---

## Features

- **Single-Source Typed Data Layer**: All profile details, skills (`36` items across `5` categories), projects (`4` featured and `3` additional), education (`1` degree entry and `5` certifications), and site settings live in typed TypeScript modules under `src/data/`.
- **Production-Safe TODO Gate**: Unfinished optional content fields marked with `TODO(...)` in `src/data/` are checked by `isTodo()` and `shouldRenderTodoInUi()` in `src/utils/todo.ts` so they are omitted from the production build (`npm run build`) and audited via `npm run check:todos`.
- **Conditional Case-Study Routing**: Featured projects automatically receive a statically generated `/projects/[slug]` case-study page and `/sitemap.xml` entry via `isProjectCaseStudyEligible()` once their `problem`, `approach`, and `whatILearned` fields contain no `TODO(...)` markers and `verifiedResults` has at least one non-`TODO(...)` metric.
- **Accessibility**: Built to meet WCAG 2.2 AA; automated axe-core audits report 0 violations. Automated tools cannot prove full conformance. Includes semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), a skip-to-content link, a focus-trapped mobile navigation drawer, keyboard-accessible controls (`>= 44x44px` targets), and `prefers-reduced-motion: reduce` and `forced-colors: active` support.
- **SEO & Metadata**: Next.js Metadata API (`title` template, canonical URLs, Open Graph, Twitter cards), dynamic `1200x630` Open Graph image (`/opengraph-image`), app icons (`32x32` `/icon` and `180x180` `/apple-icon`), `/robots.txt`, `/sitemap.xml`, and `Person` JSON-LD structured data.
- **Resilient Contact Section**: Client-assembled direct email link with a one-click copy-to-clipboard button in the Contact section of the live site, paired with a Formspree message form (honeypot spam protection, field validation with `aria-describedby` / `role="alert"`, and double-submit protection) controlled by the `NEXT_PUBLIC_FORMSPREE_ID` environment variable. When `NEXT_PUBLIC_FORMSPREE_ID` is not set, the form fields and submit button are rendered in a disabled state with a notice directing visitors to use the direct email options alongside the form.

---

## Folder Structure

```text
portfolio/
├── .agents/
│   └── rules/
│       └── portfolio-rules.md    # Workspace ground rules
├── public/
│   └── images/
│       └── portrait.png          # Hero cutout portrait
├── scripts/
│   ├── check-todos.mjs           # Launch readiness & unresolved TODO auditor
│   └── process-portrait.py       # Offline portrait crop & grayscale/duotone utility
├── src/
│   ├── app/
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Dynamic project case-study route (SSG)
│   │   ├── apple-icon.tsx        # 180x180 Apple touch icon route
│   │   ├── error.tsx             # Global error boundary UI
│   │   ├── globals.css           # Design tokens, typography, and motion/contrast rules
│   │   ├── icon.tsx              # 32x32 app icon route
│   │   ├── layout.tsx            # Root layout, Metadata API, and Person JSON-LD
│   │   ├── loading.tsx           # Route loading skeleton
│   │   ├── not-found.tsx         # Custom 404 page
│   │   ├── opengraph-image.tsx   # 1200x630 Open Graph card generator
│   │   ├── page.tsx              # Home page (Hero, Skills, Projects, About, Contact)
│   │   ├── robots.ts             # /robots.txt generator
│   │   └── sitemap.ts            # /sitemap.xml generator
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx        # Site footer & back-to-top button
│   │   │   ├── LenisProvider.tsx # Smooth-scroll provider respecting reduced motion
│   │   │   └── Navbar.tsx        # Sticky header, active section observer & mobile menu
│   │   ├── sections/
│   │   │   ├── About.tsx         # Bio, education, certifications & spoken languages
│   │   │   ├── Contact.tsx       # Direct email card & Formspree contact form
│   │   │   ├── Hero.tsx          # Hero banner, CTAs, stats card & portrait
│   │   │   ├── Projects.tsx      # 4 featured cards & 3 compact project cards
│   │   │   └── Skills.tsx        # 5 categorized skill cards
│   │   └── ui/
│   │       ├── EmailDisplay.tsx      # Client-assembled email link & clipboard copy button
│   │       ├── ProjectScreenshot.tsx # next/image wrapper with dark fallback placeholder
│   │       ├── ScrollReveal.tsx      # Progressive-enhancement scroll reveal wrapper
│   │       ├── SpotlightCard.tsx     # Cursor-following radial spotlight card wrapper
│   │       └── ZoomArchDiagram.tsx   # SVG architecture diagram for Zoom Clone case study
│   ├── data/
│   │   ├── education.ts          # Degree details (educationEntries) & 5 certifications
│   │   ├── profile.ts            # Name, roleTitle, availabilityBadge, valueStatement, aboutBio, headlineStats, socials, spokenLanguages
│   │   ├── projects.ts           # featuredProjects (4), otherProjects (3) & eligibility helpers
│   │   ├── site.ts               # siteUrl, logo text, themeColor, seoDescription, seoKeywords, emailParts, resumePath, navLinks
│   │   └── skills.ts             # skillGroups (36 items across 5 categories) & getUniqueTechnologyCount()
│   └── utils/
│       ├── todo.ts               # isTodo() & shouldRenderTodoInUi()
│       └── types.ts              # Re-exported shared skill types
├── .env.example                  # Template for environment variables
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs             # ESLint v9 flat configuration
├── next.config.ts                # Next.js configuration & HTTP security headers
├── package-lock.json             # Locked dependency tree
├── package.json                  # Scripts, dependencies, and Node 24 engine constraint
├── postcss.config.mjs            # PostCSS configuration for Tailwind CSS v4
├── README.md                     # Project overview and documentation
└── tsconfig.json                 # Strict TypeScript configuration
```

---

## Available Scripts

Run these commands from the repository root (requires **Node.js 24.x**):

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local Next.js development server at `http://localhost:3000`. |
| `npm run build` | Create an optimized production build (`next build --webpack`). |
| `npm run start` | Start the Next.js production server on the built output. |
| `npm run lint` | Run ESLint across the codebase. |
| `npm run typecheck` | Run TypeScript compiler type-checking (`tsc --noEmit`). |
| `npm run check:todos` | List all `TODO(...)` markers in `src/data/` and exit with code `1` if any launch-required item is unresolved. |

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development, or configure these variables in your hosting provider (e.g. Vercel) before building:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes (for launch) | Canonical HTTPS URL of the deployed site (e.g. `https://your-domain.com`). Read in `src/data/site.ts` at build time for canonical links, Open Graph URLs, `/robots.txt`, `/sitemap.xml`, and `Person` JSON-LD. Defaults to `http://localhost:3000` locally. |
| `NEXT_PUBLIC_FORMSPREE_ID` | Yes (for launch) | Formspree form ID (from `https://formspree.io/f/<id>`). Read directly from `process.env.NEXT_PUBLIC_FORMSPREE_ID` in `src/components/sections/Contact.tsx` at build time. When unset or empty, the contact form inputs and submit button are disabled with a notice directing visitors to use the direct email options in the Contact section. |

---

## Editing Portfolio Content (`src/data/`)

All personal and project content is decoupled from JSX components. Edit the files in `src/data/`:

- **`src/data/profile.ts`**: Update `greeting`, `name`, `location`, `address`, `roleTitle`, `availabilityBadge`, `valueStatement`, `aboutBio` (About narrative), `headlineStats`, `portraitPath`, `portraitAlt`, `socials`, and `spokenLanguages`.
- **`src/data/skills.ts`**: Update `skillGroups` across the 5 categories (`Languages`, `AI & ML`, `Data Science & Analysis`, `Backend & Cloud`, `Frontend`). `getUniqueTechnologyCount()` computes the Hero `"Skills & Tools"` count automatically.
- **`src/data/projects.ts`**:
  - Update `featuredProjects` (`4` items) and `otherProjects` (`3` items). `getTotalProjectCount()` computes the Hero `"Projects"` count automatically.
  - To enable a full `/projects/[slug]` case-study page for a featured project (`isProjectCaseStudyEligible()`), replace all `TODO(...)` strings in its `problem`, `approach`, and `whatILearned` fields and ensure `verifiedResults` has at least one non-`TODO(...)` metric.
  - To add a project screenshot, create the directory `public/images/projects/`, place a `1600x900` PNG at `public/images/projects/<slug>.png`, and set `screenshot: "/images/projects/<slug>.png"`.
- **`src/data/education.ts`**: Update `educationEntries` (degree, institution, location, period, CGPA) and `certifications` (replace `credentialUrl: "TODO(certificate URLs)"` and set `credentialIsTodo: false` when verification links are ready).
- **`src/data/site.ts`**: Update `logoPrefix`, `logoDot`, `themeColor`, `seoDescription`, `seoKeywords`, `emailParts`, `resumePath`, and `navLinks`.

---

## Deploying

See `docs/walkthrough.md` for the step-by-step guide covering local setup on Windows, GitHub repository creation, Vercel deployment, custom domain DNS configuration, phone-free CV replacement, and post-deployment SEO and verification checks.
