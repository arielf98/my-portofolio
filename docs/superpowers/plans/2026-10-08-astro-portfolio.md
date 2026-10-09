# Astro Portfolio and Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the blank Nuxt starter with a bilingual Astro portfolio and blog in a close Substack publication style, ready for static deployment to GitHub Pages.

**Architecture:** Astro generates static pages. English is the default locale at `/`; Indonesian uses `/id/`. Shared layouts render the profile and resume, while Astro Content Collections load Markdown posts and generate localized archive and article pages.

**Tech Stack:** Astro (current stable), TypeScript, Astro Content Collections, Markdown, CSS, npm, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-08-astro-portfolio-design.md`

## Global Constraints

- The site is fully static and uses GitHub Pages.
- English is the default locale; Bahasa Indonesia uses the `/id/` prefix.
- Blog posts are Markdown files stored in Astro Content Collections.
- Do not add a CMS, database, server runtime, comments, search, newsletter form, or third-party integration.
- Use generic fictional resume examples with a visible "sample data" notice until the owner replaces them; never present them as real history or identity.
- Do not invent contact details, CV files, or blog posts.
- Use a white/charcoal/orange palette, serif publication and reading typography, system sans-serif navigation and metadata, rule-separated post rows, and no shadow cards or gradients. Use a dark orange for text and controls where the brighter brand orange would not meet readable contrast.
- Derive the standard GitHub Pages URL and project base from `GITHUB_REPOSITORY`; allow repository variables for a custom domain and do not publish with placeholders.
- The local repo has no remote or existing commits; `.git` is read-only in this workspace, so commit steps cannot run here.

## Review Focus

- A project-site `base` can break route, asset, canonical, or language-switch URLs; inspect generated URLs with `/my-porto` configured in the build task that owns Astro routing.
- A post without a translated counterpart can make the language switch lead to a missing page; inspect both translated and unpaired post links in the blog task.
- A draft can leak into the public archive; inspect generated output from a local `draft: true` entry in the blog task, then remove the temporary entry.
- Fictional resume details can be mistaken for real history; inspect that the sample-data notice is visible on every page showing those details and that absent optional fields are omitted.
- Narrow screens and keyboard navigation can break the header and long-form reading; inspect at mobile and desktop widths and tab through all links in the layout task.

---

## File Map

- `package.json`, `package-lock.json`: replace Nuxt scripts and packages with Astro.
- `nuxt.config.ts`, `app/app.vue`: remove the unused Nuxt starter.
- `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `README.md`: Astro config, type support, generated-file ignores, and setup instructions.
- `src/content.config.ts`: validated blog collection schema.
- `src/content/blog/id/`, `src/content/blog/en/`: Indonesian and English Markdown posts.
- `src/data/profile.ts`: bilingual sample profile/resume data, clearly marked as fictional until replaced by the owner.
- `src/components/SiteHeader.astro`, `SiteFooter.astro`, `LanguageSwitcher.astro`, `PostList.astro`, `ResumeContent.astro`: shared site chrome, locale navigation, feed rows, and resume sections.
- `src/layouts/BaseLayout.astro`, `ArticleLayout.astro`: document metadata/site frame and long-form reading layout.
- `src/styles/global.css`: design tokens, responsive layout, typography, focus, and colors.
- `public/favicon.svg`: a small publication-style icon using the site palette.
- `src/pages/index.astro`, `resume/index.astro`, `blog/index.astro`, `blog/[slug].astro`: English pages.
- `src/pages/id/index.astro`, `id/resume/index.astro`, `id/blog/index.astro`, `id/blog/[slug].astro`: Indonesian pages.
- `.github/workflows/deploy.yml`: static GitHub Pages build and deployment.

## Tasks

### Task 1: Replace the Nuxt starter with Astro

**Files:**
- Modify: `package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore`, `README.md`
- Create: `astro.config.mjs`, `src/content.config.ts`, `src/styles/global.css`
- Delete: `nuxt.config.ts`, `app/app.vue`

**Interfaces:**
- Produces the Astro project configuration, localized static routing (`id`, `en`; default `en`; no default-locale prefix), global stylesheet entry point, and blog collection schema consumed by later tasks.

- [x] Install the current stable Astro package and remove `nuxt`, `vue`, and `vue-router`; set npm scripts to `astro dev`, `astro build`, and `astro preview`.
- [x] Configure static output, trailing-slash routes, i18n locales `['id', 'en']`, default locale `'en'`, and `routing.prefixDefaultLocale: false` in `astro.config.mjs`.
- [x] Derive `site` and `base` from `GITHUB_REPOSITORY` in Actions; allow `ASTRO_SITE` and `ASTRO_BASE` repository variables for a custom domain.
- [x] Replace Nuxt ignore rules with Astro-generated paths and update README setup/run instructions for npm and Astro.
- [x] Run `npm run build` and confirm an empty Astro site produces `dist/` successfully.

### Task 2: Build the shared Substack-style shell and resume pages

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/components/SiteHeader.astro`, `SiteFooter.astro`, `LanguageSwitcher.astro`, `PostList.astro`, `ResumeContent.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro`, `src/pages/resume/index.astro`, `src/pages/id/index.astro`, `src/pages/id/resume/index.astro`

**Interfaces:**
- `profile.ts` exports `profileByLocale`, keyed by `'id' | 'en'`. Each profile has `isSample: boolean`, optional `name`, `headline`, `summary`, `email`, `cvPdf`, and `links`, plus `experience` and `education` arrays of `{ title, organization?, startDate?, endDate?, description? }` and a `skills` string array. Keep sample status true until user content replaces the fictional entries.
- `BaseLayout.astro` accepts `title`, `description`, `locale`, and `canonicalUrl` props.
- `LanguageSwitcher.astro` accepts the current locale, target locale, and destination URL; use Astro i18n URL helpers so the configured base path is respected.
- `PostList.astro` accepts normalized items with `href`, `title`, `description`, `pubDate`, and `tags`; it formats dates for the supplied locale.
- `ResumeContent.astro` accepts one localized profile and locale, rendering only populated summary, experience, education, and skills sections.

- [x] Define bilingual generic fictional profile/resume data, set `isSample: true`, and render a localized visible sample-data notice; render only populated fields and sections.
- [x] Build the header, footer, locale switch, and base document layout; set `<html lang>` and page metadata per locale.
- [x] Implement the approved visual tokens: white background, `#fafafa` secondary surface, `#363737` text, `#ff6719` accents, Georgia/Times serif for publication and long-form text, and system sans-serif for UI/metadata.
- [x] Implement compact navigation, thin gray separators, open feed rows, a centered ~680px article column, and responsive type sizes from the spec; avoid card shadows and gradients.
- [x] Build English home and resume pages at the root and Indonesian pages under `/id/`. Keep absent resume facts and the download action hidden until real content and a PDF are provided.
- [x] Reuse `PostList.astro` to show the three newest published posts on each home page; show a short localized empty state when there are none.
- [x] Inspect generated HTML, keyboard order, focus styling, and responsive CSS; run `npm run build` and confirm all four routes are generated. Visual browser inspection could not run because the environment denied local server access.

### Task 3: Add the bilingual Markdown blog

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/layouts/ArticleLayout.astro`
- Create: `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/pages/id/blog/index.astro`, `src/pages/id/blog/[slug].astro`
- Create: `src/content/blog/id/`, `src/content/blog/en/`

**Interfaces:**
- Blog entries use `title`, `description`, `pubDate`, optional `updatedDate`, `tags` (default `[]`), `lang: 'id' | 'en'`, optional `translationKey`, and `draft` (default `false`).
- `PostList.astro` from Task 2 is reused for locale-filtered archive entries.
- `ArticleLayout.astro` accepts article metadata, locale, canonical URL, and rendered Markdown content.

- [x] Define the Zod schema for the fields above; during `getStaticPaths()`, compare the entry ID's first path segment with `data.lang` and throw a build error on mismatch.
- [x] Implement Indonesian and English blog archives and static article routes using `getCollection()` and `getStaticPaths()`; sort published posts newest first and exclude drafts.
- [x] Render one post entry per Markdown file in the shared row layout and use the narrow serif reading layout for article pages.
- [x] Map the language switch to the paired article by `translationKey`; when no pair exists, send the visitor to the destination-language blog archive.
- [x] Build with no posts and confirm English and Indonesian empty archives render cleanly. For the draft review, create a temporary local draft, build and inspect `dist/`, then remove the draft and rebuild.
- [x] Inspect generated Indonesian and English routes, paired and unpaired language links, and output URLs under the configured `base`.

### Task 4: Configure GitHub Pages deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `astro.config.mjs`, `README.md`

**Interfaces:**
- Workflow builds the Astro project and deploys its `dist/` artifact through GitHub Pages using `withastro/action` and `actions/deploy-pages`.
- Workflow push trigger must match the actual GitHub default branch; retain `workflow_dispatch` for manual runs.

- [x] Add the two-job workflow with read contents, Pages write, and OIDC permissions; use the current documented action releases (`withastro/action@v6`, `actions/deploy-pages@v5`).
- [x] Derive the Pages URL and base path from GitHub Actions context; verify generated assets, internal links, and canonical URLs include the project base where required.
- [x] Gate push deployment to the GitHub default branch and document that repository Pages source must be set to GitHub Actions.
- [x] Run `npm run build` and inspect `dist/` for English pages at `/`, Indonesian pages at `/id/`, resume routes, blog archives, and any supplied article routes.
- [x] Leave live publishing for after the repo has a GitHub remote and correct Pages settings; do not claim deployment from a local build.

## Handoff Notes

- Standard GitHub Pages addresses are derived at deploy time. For a custom domain, configure `ASTRO_SITE`, `ASTRO_BASE`, and `public/CNAME` before deployment.
- Before publishing a real launch, obtain the owner's name, role, resume details, links, optional localized PDF CVs, and original post content; replace the sample values and set `isSample: false`.
- No automated test suite is added in this plan. Static build and the listed route, content, responsive, and keyboard inspections are the planned acceptance checks.
