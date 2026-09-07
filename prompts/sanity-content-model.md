# Implement the Sanity content model and Studio, plus the server-side read client and data layer

## Goal
Model Synapse's core content (course, module, lesson, instructor, category) in Sanity, stand up a **standalone** Studio workspace to author it, and build the server-only read client + typed data-fetching layer the web app will use to render pages later. No pages, search, auth-gated writes, video ingestion, or agent context document in this task — those are separate jobs per AGENTS.md section 1.

## Skills and docs read
- `AGENTS.md` sections 1, 2, 5, 6, 7, 8, 12, 13 — scope, workflow, workspace boundaries, tech stack, decisions already made, data shape, gotchas, checks.
- `sanity-best-practices` skill — schema design, GROQ, TypeGen, project-structure conventions (standalone Studio vs. embedded, monorepo patterns). Its bundled reference files aren't present on disk in this environment, so schema/query/typegen decisions below follow standard Sanity conventions (`defineType`/`defineField`, `defineQuery`, `sanity schema extract` + `sanity typegen generate`) consistent with the skill's stated topics.
- `content-modeling-best-practices` skill considered but not separately loaded — AGENTS.md section 8 already fixes the relationships and required fields; only free field choices (validation, previews, orderings) needed judgment calls, made below.
- Did not read `sanity-migration`, `create-agent-with-sanity-context`, `dial-your-context`, `shape-your-agent`, or `node_modules/next/dist/docs/` — none apply to schema/Studio/data-layer work.

## Code inspected
- Root is currently a **single** Next.js app with an *embedded* Studio: `sanity.config.ts`, `sanity.cli.ts` at repo root, and `app/studio/[[...tool]]/page.tsx` mounting `NextStudio`. This directly violates AGENTS.md section 5 ("do not embed the Studio inside Next.js") and section 6 ("Do not use ... an embedded Studio"). These files are untracked (`git status` shows `?? app/studio/`, `?? sanity/`, `?? sanity.config.ts`, `?? sanity.cli.ts`) — nothing committed depends on this shape yet, so it's safe to restructure now rather than carry the violation forward.
- `sanity/schemaTypes/*`, `sanity/structure.ts` — the default `create-sanity` blog scaffold (`post`, `author`, `category`, `blockContent`). None of this matches Synapse's model; all Studio-only files move into the new workspace and get replaced.
- `sanity/lib/client.ts` — CDN client, no token, `useCdn: true`. `sanity/lib/live.ts` — `defineLive`/`SanityLive`, part of the Visual Editing / Presentation workflow, not requested anywhere in AGENTS.md (no `visual-editing` skill reference, no draft-mode requirement). `sanity/lib/image.ts` — plain `@sanity/image-url` builder, fine as-is.
- `.env.local` / `.env.example` — `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are already set to a real project (`z7oqtonb` / `production`). No read token is present yet, and I have no way to check or change the dataset's public/private visibility from here (needs `sanity login`, which isn't available in this session).
- `package.json` — single package, `sanity`/`@sanity/vision`/`@sanity/icons`/`styled-components` all live at root as runtime deps of the embedded Studio.
- `components/ui/Card.tsx`, `components/home/PopularCourses.tsx` — confirms the *shape* the UI eventually expects from course/lesson data (title, description, lesson count, formatted duration string, level, per-lesson clip length, resource type/description) with hardcoded placeholder content today. Nothing here implies extra schema fields beyond AGENTS.md section 8 (e.g. no course-level icon field is called for there, so I'm not adding one).
- `prompts/homepage.md` — confirms the home page's course cards are still fully static/hardcoded; this task doesn't need to touch them.
- Confirmed locally: `npx sanity --version` works (`@sanity/cli/6.7.2`) without login. `sanity schema extract` and `sanity typegen generate` are both static/local operations (no network, no auth) — I can run them as part of this task's checks. Anything that touches the live project (`sanity login`, `sanity dataset visibility ... private`, `sanity deploy`, creating a read token at manage.sanity.io) needs the user's Sanity account and is out of my reach here.

## Decisions and assumptions
1. **Split into two real workspaces now, not later.** New `studio/` directory becomes a standalone Sanity Studio with its own `package.json`, `sanity.config.ts`, `sanity.cli.ts`, schema, and desk structure. Root `sanity.config.ts`, `sanity.cli.ts`, `app/studio/`, and the old `sanity/schemaTypes`/`sanity/structure.ts` are deleted. The repo becomes an npm-workspaces monorepo: root `package.json` gets `"workspaces": ["studio"]`, root stays the web app (no need to move `app/`, `components/`, etc.). This is what AGENTS.md section 5 requires ("preserves independent deploys, Studio auto updates, and TypeGen") and section 6 explicitly forbids the embedded pattern that's currently checked out.
2. **Web keeps a slim `sanity/` folder, read-only.** `sanity/env.ts` (server + public env), `sanity/lib/client.ts` (server-only client with a read token), `sanity/lib/image.ts` (unchanged), `sanity/lib/queries.ts` (GROQ via `defineQuery`), `sanity/lib/data.ts` (typed fetch functions pages will call later), `sanity/types.ts` (generated, committed). Dropping `sanity/lib/live.ts` — Visual Editing / draft-mode preview isn't in scope anywhere in AGENTS.md for this task.
3. **Dataset must be private with a server-only read token (section 6/12).** I can't verify or flip the `production` dataset's visibility, or mint a token, from this session — that needs `sanity login` under the user's account. I'll write the client to require `SANITY_API_READ_TOKEN` and fail fast if it's missing, and call out the manual steps (flip visibility, create a **Viewer** token at manage.sanity.io, drop it in `.env.local`) in "Needs your attention" after implementing. Until that token exists, server fetches will error — expected, and not something to work around with a public dataset.
4. **Course/lesson counts and numbering stay derived, never stored**, per section 8 ("Module 5 / Lesson 5.1 ... derived from order, not stored"). Lesson count and total duration for a course, and a lesson's module/lesson index, are computed in GROQ or in the data-layer function — not schema fields.
5. **Lesson `duration` is stored as a number of seconds**, not a display string. Section 8 just says "a duration"; storing seconds keeps one source of truth and lets the (future) UI layer format it ("12:34" for a clip badge, "6h 24m" for a course total) and sum it for course-level totals. Same for `startSeconds`-style consistency with the video pipeline planned later.
6. **Outcome `icon` and resource `type` are constrained string selects**, not free text or actual components — Studio can't store a React icon, so these store a name/keyword the web layer maps to a `lucide-react` icon later. Icon list keeps to a small curated set (`CheckCircle`, `Target`, `Layers`, `Zap`, `Code2`, `Brain`, `Sigma`, `Network`, `BookOpen`) rather than every possible icon, so authors can't pick something the UI doesn't render.
7. **`module` and `outcome`/`resource` are plain objects** (`defineType({type: 'object', ...})`), not documents — section 8 is explicit that a module is "embedded ... not its own document," and outcomes/resources are structurally the same kind of authored-inline list item.
8. **Instructor `bio` is a plain `text` field, not Portable Text.** Section 7's "never markdown" rule is about *structured vs. markdown*, not "everything must be rich text" — section 8 only calls out lesson notes as needing Portable Text explicitly ("rich text notes in Portable Text"). A short instructor bio doesn't need block-level rich formatting, and keeping it plain text avoids an unnecessary abstraction.
9. **TypeGen is wired up and runnable offline.** `studio/schema.json` (gitignored, regenerated on demand) comes from `sanity schema extract` run inside `studio/`; root `sanity-typegen.json` points at it and at `sanity/**/*.ts` for query files, generating `sanity/types.ts` (committed, so `npm run build`/type-check works for anyone who clones without running Sanity CLI first). A `typegen` script at root re-runs both steps. I'll run this myself during implementation and commit the output, then re-run it as a check.
10. **`sanity`, `@sanity/vision`, `@sanity/icons`, `styled-components` move to `studio/package.json`.** Root keeps `next-sanity` and `@sanity/image-url` (needed for the read client and image URLs) and adds `sanity` as a root **devDependency** too (only for the `typegen` CLI script — no Studio code runs from it).
11. **No search-oriented projections yet** (e.g. `pt::text(notes)` for the plain-text search match section 7/11 describes). That's part of the search task, not this one — the data layer here only serves normal page reads.

## Files expected to touch
New (`studio/` workspace):
- `studio/package.json`, `studio/tsconfig.json`, `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/.env.example`
- `studio/structure.ts`
- `studio/schemaTypes/index.ts`
- `studio/schemaTypes/documents/course.ts`, `lesson.ts`, `instructor.ts`, `category.ts`
- `studio/schemaTypes/objects/module.ts`, `outcome.ts`, `resource.ts`, `blockContent.ts`

New (web data layer, root `sanity/`):
- `sanity/lib/data.ts` (typed fetch functions), `sanity/lib/queries.ts` (GROQ)
- `sanity/types.ts` (generated, committed)
- `sanity-typegen.json` (root)

Modified:
- `sanity/env.ts` — add server-only `apiReadToken`, keep `apiVersion`/`dataset`/`projectId`
- `sanity/lib/client.ts` — server-only client, token, `useCdn: false`, `perspective: 'published'`
- `package.json` — `"workspaces": ["studio"]`, drop Studio-only deps, add `typegen` script, add `sanity` devDependency
- `.env.example`, `.env.local` — add `SANITY_API_READ_TOKEN`
- `.gitignore` — `studio/node_modules`, `studio/dist`, `studio/schema.json`

Deleted:
- `sanity.config.ts`, `sanity.cli.ts` (root)
- `app/studio/` (entire directory)
- `sanity/schemaTypes/` (old blog scaffold), `sanity/structure.ts`, `sanity/lib/live.ts`

## Requirements (schema)
**category** (document): `title` (string, required), `slug` (slug from title, required), `description` (text).

**instructor** (document): `name` (string, required), `slug` (slug from name, required), `photo` (image, hotspot, required), `expertise` (array of strings, tag layout), `bio` (text, required).

**resource** (object): `type` (string select: Article/Video/Code/PDF/Link, required), `title` (string, required), `description` (text), `url` (url, required).

**outcome** (object): `icon` (string select from the curated list in decision 6, required), `title` (string, required), `description` (text, required).

**module** (object, embedded in course): `title` (string, required), `summary` (text), `lessons` (array of references to `lesson`, required, min 1, orderable).

**lesson** (document): `title` (string, required), `slug` (slug from title, required), `videoUrl` (url, required), `posterImage` (image, hotspot, required), `duration` (number, seconds, required, min 1), `freePreview` (boolean, default false), `studentCount` (number, default 0, min 0), `keyPoints` (array of strings), `notes` (Portable Text via `blockContent`), `proTip` (text, optional), `resources` (array of `resource` objects). No course/module back-reference field.

**course** (document): `title` (string, required), `slug` (slug from title, required), `summary` (text, required), `coverImage` (image, hotspot, required), `level` (string select: Beginner/Intermediate/Advanced, required), `price` (number, required, min 0), `popular` (boolean, default false), `studentCount` (number, default 0, min 0), `outcomes` (array of `outcome` objects, min 1), `instructor` (reference to instructor, required), `category` (reference to category, required), `modules` (array of `module` objects, required, min 1, orderable).

Previews on every document/object type (title/media/computed subtitle — e.g. lesson subtitle shows `mm:ss` from `duration`, module preview shows lesson count). Courses get an ordering by title A→Z / Z→A. Desk structure (`studio/structure.ts`) groups Courses / Lessons / Instructors / Categories as top-level list items.

## Requirements (data layer)
Exported from `sanity/lib/data.ts`, each backed by a `defineQuery` in `sanity/lib/queries.ts`, all fetched through a single server-only `sanityFetch` helper in `sanity/lib/client.ts`:
- `getCategories()`, `getCategoryBySlug(slug)`
- `getInstructors()`, `getInstructorBySlug(slug)` (includes that instructor's courses via a reverse lookup)
- `getCourses({ categorySlug?, popularOnly? })` — catalog listing with computed `lessonCount` and `totalDurationSeconds`, expanded instructor (name/photo) and category (title)
- `getPopularCourses(limit)`
- `getCourseBySlug(slug)` — full detail: outcomes, instructor, category, modules with their lessons expanded (summary fields: title, slug, duration, freePreview, posterImage — not full notes/resources)
- `getLessonBySlug(slug)` — full lesson detail: notes (Portable Text), keyPoints, proTip, resources, videoUrl, posterImage, duration, freePreview
- `getCourseForLesson(lessonId)` — reverse reference (`references($lessonId)`) returning the owning course plus enough of `modules[].lessons[]` to let a caller compute the module/lesson index and prev/next lesson (section 8: "derive the course with a reverse reference")

All queries fetch only published content (no `drafts.` perspective), matching "pages are read only" and no visual-editing requirement in scope.

## Security considerations
- `SANITY_API_READ_TOKEN` is server-only (no `NEXT_PUBLIC_` prefix); `sanity/lib/client.ts` imports the `server-only` package so any accidental client import fails the build instead of leaking the token to the browser.
- Dataset is treated as private end-to-end: the client always sends the token and never falls back to an unauthenticated/CDN path.
- No user input flows into these queries yet (no route handlers in this task), so no injection surface beyond GROQ's built-in parameterization (`$param`), which every query here uses instead of string interpolation.
- Nothing here writes content — this task is read-only by design, matching section 5's "Pages ... are read only."

## Acceptance criteria
- `studio/` runs independently (`npm run dev --workspace=studio`) and shows Courses/Lessons/Instructors/Categories with the fields above, previews, and validation.
- Root app no longer has any embedded Studio route or Studio config.
- `sanity/types.ts` exists, is generated from the real schema, and every `sanity/lib/data.ts` function is typed against it (no `any`).
- `npx tsc --noEmit` and `npm run lint` pass at root; `npm run build` succeeds (no page calls the new data layer yet, so this mainly checks the data layer compiles cleanly).
- `npm run typegen` (schema extract + typegen generate) runs clean with no errors.
- `.env.example` documents `SANITY_API_READ_TOKEN` with a comment that it needs Viewer access on a **private** dataset.

## Checks to run
- Root: `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npm run typegen`
- Studio: `npm run build --workspace=studio` (production Studio build compiles)

## Manual test steps
1. `npm install` at root (installs the new `studio` workspace too).
2. `npm run dev --workspace=studio`, open the printed local URL, confirm the desk shows Courses / Lessons / Instructors / Categories, and that creating a Category → Instructor → Lesson → Course (in that order, so references resolve) works end to end with previews rendering correctly.
3. In `.env.local`, confirm `SANITY_API_READ_TOKEN` is set (see "Needs your attention" — this requires a manual step outside this session). Without it, any call into `sanity/lib/data.ts` should throw a clear "missing token" error, not fail silently or fall back to public access.
4. `npm run typegen` at root, then open `sanity/types.ts` and confirm it contains generated types for `Course`, `Lesson`, `Instructor`, `Category`, and the query result types used by `sanity/lib/data.ts`.
5. `npx tsc --noEmit`, `npm run lint`, `npm run build` all succeed at root.
6. `npm run build --workspace=studio` succeeds.

---
Once you approve this, I'll implement it, run the checks above, and report back.
