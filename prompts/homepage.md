# Implement the Synapse home page

## Goal
Build the public marketing/landing home page (`/`) to match `design/synapse-homepage.png` exactly: navbar, hero with search, topic pills, and a Popular Courses section with three course cards. This is UI work only — no new backend, schema, or data fetching.

## Skills and docs read
- `AGENTS.md` (sections 2, 3, 5, 6, 13) — workflow, UI fidelity rules, workspace boundaries, tech stack, checks.
- `sanity-best-practices` skill was considered but is not relevant here: no schema or data access is being added in this task.
- No Next.js docs needed (no routing/data-fetching changes beyond the existing single route).

## Code inspected
- `design/synapse-homepage.png` — target layout (navbar, hero, popular courses).
- `design/synapse-designsystem.png` — color/type/spacing/radius/shadow/button/badge/card tokens.
- `app/page.tsx` — currently a design-system reference page (not a real home page), built from the same components listed below.
- `app/layout.tsx`, `app/globals.css` — Tailwind v4 theme tokens (`primary-*`, `neutral-*`, `text-display/h1/h2/h3/body-lg/body/small`, `rounded-soft/small/medium/large/xl`, shadows).
- `components/layout/Navbar.tsx`, `Logo.tsx`, `Sidebar.tsx` — current navbar has only Courses/My Learning links (Courses hardcoded active), a search box, bell, and a plain "AK" avatar circle — missing Home/Resources links, active-link flexibility, and the avatar dropdown chevron the design shows.
- `components/ui/Card.tsx` — `CourseCard` exists but only supports a plain gradient thumbnail + "Course" label + lessons/duration meta. The design's course cards need a per-course icon, a duration-badge with a play glyph on the thumbnail, and a difficulty/level meta item — none of which the current component supports.
- `components/ui/Badge.tsx`, `Button.tsx`, `Input.tsx` (`SearchInput`), `ProgressBar.tsx` — reusable as-is.
- `package.json` — no Sanity, Clerk, or PostHog packages installed yet; this is a pre-integration, static-data stage of the project.
- Confirmed `lucide-react` exports `Atom`, `Braces`, `Sigma`, `Brain`, `Code2`, `Network`, `ChevronDown`, `ChevronRight`, `Bell`, `Play`, `BookOpen`, `Clock`, `BarChart3` for the icons this page needs.

## Decisions and assumptions
1. **Move the design-system showcase off `/`.** The current `app/page.tsx` is a component/token reference page, not the real home page. I'll move it to `app/design-system/page.tsx` unchanged, and build the real home page fresh at `app/page.tsx`. This keeps the reference available without losing it.
2. **No live data yet.** There is no Sanity course schema or client in this repo. The three "Popular Courses" cards will use static, hardcoded content matching the design's copy (titles, descriptions, lesson counts, durations, levels). When the real catalog/course model exists, this section will be swapped for a server fetch — out of scope here.
3. **Search bar and topic pills are presentational only.** No search route/agent exists yet (section 11 is a separate future task). The hero search input and submit button, and the topic filter pills, render and are focusable/hoverable but do not navigate or submit anywhere in this task.
4. **Card and CTA links point at future routes that don't exist yet** (`/courses`, and per-course slugs like `/courses/react-for-modern-web-apps`) using `next/link`. These will 404 until the catalog/course pages are built later — expected and harmless at this stage. Flagging so it's not mistaken for a bug.
5. **Brand icons approximated with lucide-react**, since pixel-exact React/Python logos aren't available as project icons: `Atom` (React card), `Code2` (Python card), `Brain` (Machine Learning card). Card thumbnails use gradient backgrounds matching the design's palette per card rather than reproducing the faint decorative code-snippet/dot-network background art (that texture is a nice-to-have, not core to the layout).
6. **`Navbar` becomes reusable across pages** by taking an `active` prop (`"home" | "courses" | "my-learning" | "resources"`) instead of hardcoding "Courses" as active, and gains the four nav links plus a chevron next to the avatar to match the design. This is a small, backward-compatible extension (defaults preserve today's usage in the design-system page).
7. **`CourseCard` gains optional props** (`icon`, `iconClassName`, `thumbnailClassName`, `videoDuration`, `level`, `href`) so the same shared card serves both the plain design-system demo and the richer homepage version, rather than forking a new component.
8. **Decorative hero art** (squiggle lines, the radiating play icon, the floating "React Hooks 12:45" mini card, background blobs) is reproduced with inline SVG/CSS, hidden below `lg` breakpoint since it's non-essential decoration and there's no mobile reference.

## Files expected to touch
- `app/page.tsx` — rewrite as the real home page (Hero + Popular Courses).
- `app/design-system/page.tsx` — new file, the relocated current content of `app/page.tsx` (no changes to its content).
- `components/layout/Navbar.tsx` — add nav links (Home, Courses, My Learning, Resources), `active` prop, avatar chevron.
- `components/ui/Card.tsx` — extend `CourseCard` with the optional props above.
- Possibly `components/home/Hero.tsx` and `components/home/PopularCourses.tsx` — small, page-specific sections extracted out of `app/page.tsx` for readability (only if `app/page.tsx` gets unwieldy inline; otherwise keep it inline). No other new abstractions.

## Requirements
- Match the reference image: layout, spacing, typography, colors, and states (hover on buttons/cards/pills using existing variants).
- Responsive down to mobile: hero text and search bar stack full-width, topic pills wrap, popular-course cards go from 3 columns → 1 column, decorative hero art hides on small screens. Desktop breakpoint stays pixel-faithful to the reference.
- Reuse existing Tailwind tokens and components (`Button`, `SearchInput`, `Badge`/`Label`, `Card` primitives, `Logo`) rather than introducing new ad hoc styles where an existing pattern fits.
- No new dependencies.

## Security considerations
- No user input is persisted or sent anywhere in this task (search is presentational only) — nothing to sanitize server-side yet.
- No secrets, tokens, or env vars involved.
- Plain `next/link` navigation only; no `dangerouslySetInnerHTML` or dynamic HTML.

## Acceptance criteria
- `/` renders the hero (headline, subtext, search bar, topic pills, decorative art) and Popular Courses (heading, subtext, View All Courses button, 3 course cards) matching the reference image.
- `/design-system` renders exactly what `/` used to render.
- Navbar shows Home/Courses/My Learning/Resources with Home active on `/`, and the design-system page still renders its navbar demo correctly.
- Page is usable and visually reasonable at mobile width (375px) and desktop width (1440px).
- `npm run lint` passes with no new errors.
- `npx tsc --noEmit` (or `next build`, which type-checks) passes with no new errors.
- `npm run build` succeeds.

## Checks to run
- `npm run lint`
- `npm run build` (routes changed, so a production build is required per AGENTS.md section 13)
- `npm run dev` and view in a browser at both desktop and mobile widths

## Manual test steps
1. Run `npm run dev`, open `http://localhost:3000/`.
2. Confirm the navbar shows Synapse logo, Home (active/underlined) · Courses · My Learning · Resources, the pill search box, bell icon, and "AK" avatar with a chevron.
3. Confirm the hero shows "Search Smarter." / "Learn Faster." headline, subtext, large search bar with a green circular arrow button, and topic pills (React, Data Structures, Machine Learning, Calculus, More).
4. Confirm the Popular Courses section shows the heading, subtext, "View All Courses" button, and 3 cards (React for Modern Web Apps, Python for Data Science, Machine Learning Fundamentals) each with a thumbnail icon, duration badge, COURSE label, title, description, and lessons/duration/level meta row.
5. Resize the browser to ~375px wide and confirm the layout stacks sensibly with no horizontal scroll or overlapping elements.
6. Open `http://localhost:3000/design-system` and confirm it looks the same as `/` used to before this change.
