\# Portfolio project rules (always apply)



\- NEVER invent facts, metrics, links, employers, testimonials or dates. Use only the verified

&#x20; content in the master prompt.

\- If information is missing, use a visible placeholder `TODO(<what is needed>)` in the data

&#x20; file, make sure it never renders as a broken link, and list all TODOs in walkthrough.md.

\- All personal content lives in typed files under `src/data/`. Components contain no hardcoded

&#x20; personal content.

\- Derived numbers (project count, technology count, certification count) are computed from data.

\- TypeScript strict mode. No `any`. No unused dependencies. Small, reusable components.

\- Secrets go in `.env.local`; commit only `.env.example`.

\- Never put the phone number anywhere on the site, in metadata, JSON-LD or committed files.

\- Do not write the About bio; use a TODO placeholder.

\- Work in gated phases: after each phase produce evidence (build output, screenshots), then

&#x20; STOP and wait for my "approved" message.

\- Do not skip, merge or continue past a STOP phase.

\- Do not add libraries, pages or features not listed in the master prompt without asking me.

\- Do not use stock text such as "passionate developer" or "cutting-edge solutions".

\- Do not claim "production-grade" or "enterprise" unless the repo supports it.

\- Do not present the 95% accuracy figure without F1 and precision context.

\- Do not copy the reference design's text, logo or the model's photo, only its layout and mood.

\- Do not modify or delete anything in `\_inputs/`.

