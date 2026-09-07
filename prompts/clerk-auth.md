# Add Clerk Authentication

## Goal

Wire up Clerk authentication in the Synapse Next.js app: install and link the
Clerk CLI to the existing Clerk application, scaffold the SDK/middleware via
`clerk init`, and surface sign-in / sign-up / signed-in controls in the
navbar so the user can create their first account.

## Skills read

- `AGENTS.md` (root) — sections 5 ("Auth is Clerk, wired through Next.js
  middleware... keeps its secret key on the server, exposes only its
  publishable key to the browser"), 6 (tech stack), 7 ("Authentication is
  Clerk... Keep browsing public and gate only what a feature marks as
  protected... learner progress keys off the Clerk user id"), 12 (Clerk
  secret key is server only), 13 (checks to run).
- `clerk-setup` skill (`.claude/skills/clerk-setup` via the `clerk` router) —
  the Quick Setup flow: install/update CLI, `clerk auth login`, `clerk init
  --app app_3IzFHKSRiyctRCOMVSycrSd7FKG`, verify the Next.js proxy matcher,
  add sign-in/sign-up/user-button controls, `clerk doctor`, start the app.

## Code inspected

- `package.json` — plain Next.js 16.3.4 / React 19 app at repo root, no
  `web`/`studio` workspace split yet, no Clerk dependency yet, no `.env` or
  `.env.example` file present.
- `app/layout.tsx` — root layout, single `RootLayout` wrapping `{children}`
  in `<html><body>`, no providers yet.
- `app/page.tsx`, `components/home/*` — home page composed of
  `Navbar` + hero/search/popular-courses sections.
- `components/layout/Navbar.tsx` — has a hardcoded placeholder avatar button
  (initials "AK", chevron, no real menu) where signed-in user state belongs,
  and no sign-in/sign-up controls for signed-out state.
- No `middleware.ts` or `proxy.ts` exists yet. Next 16 renamed middleware to
  `proxy.ts` (`node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`),
  confirmed via the AGENTS.md instruction to read the bundled docs before
  writing Next code.
- No `prompts/` precedent for auth; only `prompts/homepage.md` exists (UI
  prompt for the home page already built).

## Decisions and assumptions

- The repo has not yet been split into the `studio` / `web` workspaces
  described in AGENTS.md section 5 (no Studio exists yet). Clerk is
  installed into the current root Next.js app as-is; the workspace split is
  out of scope for this task and will apply to whichever directory holds the
  Next.js app when that reorg happens.
- Use `clerk init` (no `--framework`/`--pm` overrides) since this is an
  existing, non-empty Next.js project — the CLI will detect the framework
  and package manager (npm, per `package-lock.json`).
- Linking to Clerk application `app_3IzFHKSRiyctRCOMVSycrSd7FKG` as
  instructed by the skill.
- Replace the placeholder "AK" avatar button in `Navbar.tsx` with Clerk's
  `Show`/`SignInButton`/`SignUpButton`/`UserButton` pattern rather than
  adding a second, separate auth control, so the navbar keeps one visual
  slot for user identity.
- No shadcn (`components.json` not present), so the `@clerk/ui` shadcn theme
  step is skipped.
- `.env.example` doesn't exist yet; per AGENTS.md section 12 ("keep a
  committed `.env.example` as the canonical list") I'll make sure whatever
  `clerk init` writes to `.env.local` also gets mirrored (key names, no
  values) into a new `.env.example`, since this is the first env file in the
  repo.

## Files expected to touch

- `package.json` / `package-lock.json` — add `@clerk/nextjs`.
- `proxy.ts` (new, Next 16 middleware equivalent) — Clerk proxy/middleware
  wiring, with the matcher including `'/__clerk/:path*'` after
  `'/(api|trpc)(.*)'`.
- `app/layout.tsx` — wrap `<body>` contents in `<ClerkProvider>` (provider
  goes inside `<body>`, not wrapping `<html>`).
- `components/layout/Navbar.tsx` — replace the placeholder avatar with
  `Show`/`SignInButton`/`SignUpButton`/`UserButton`.
- `.env.local` (new, gitignored) — Clerk publishable/secret keys via
  `clerk init`.
- `.env.example` (new) — key names only, committed.
- Possibly `next.config.ts` if `clerk init` needs it (unlikely).

## Requirements

- Follow the `clerk-setup` skill's Quick Setup steps in order: CLI
  install/update, `clerk auth login`, `clerk init --app
  app_3IzFHKSRiyctRCOMVSycrSd7FKG`, verify the proxy matcher, add auth
  controls, `clerk doctor`, start the app.
- Keep browsing public — do not gate any existing route (home page stays
  accessible signed-out); this task only adds the SDK, provider, proxy, and
  visible auth controls, not route protection (no protected routes exist
  yet to gate).
- `CLERK_SECRET_KEY` must stay server-only (no `NEXT_PUBLIC_` prefix, never
  referenced from a Client Component).
- Only `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (and any other
  `NEXT_PUBLIC_CLERK_*` values Clerk's own scaffolding adds) may reach the
  browser.
- Use `@clerk/nextjs`, not `@clerk/clerk-react`.
- If `auth()` is used anywhere (not expected in this task), it must be
  `await`ed (Next.js 15+ async API).

## Security considerations

- Never print or read back the contents of `.env.local` in chat — only
  confirm which keys were written, per the skill's "do not read or print
  existing environment variable files" rule.
- Verify `CLERK_SECRET_KEY` doesn't leak into any Client Component
  (`"use client"` file) or into `NEXT_PUBLIC_*` env vars.
- Confirm the proxy matcher change doesn't accidentally widen route
  protection or expose the Clerk internal path publicly beyond what Clerk's
  own scaffolding intends.

## Acceptance criteria

- `@clerk/nextjs` installed, app linked to `app_3IzFHKSRiyctRCOMVSycrSd7FKG`.
- `proxy.ts` exists with `clerkMiddleware` and the matcher includes
  `'/__clerk/:path*'` once, after the API/TRPC matcher.
- `app/layout.tsx` renders `<ClerkProvider>` inside `<body>`.
- `components/layout/Navbar.tsx` shows `SignInButton`/`SignUpButton` when
  signed out and `UserButton` when signed in, replacing the static "AK"
  placeholder.
- `.env.example` committed with Clerk key names (no values); `.env.local`
  gitignored.
- `clerk doctor` reports no errors.
- `npm run lint` and `npx tsc --noEmit` (or the project's type-check script)
  pass.
- Dev server starts, home page loads signed-out with visible Sign in / Sign
  up controls in the navbar.

## Checks to run

- `npm run lint`
- Type check (`npx tsc --noEmit`, since no dedicated `typecheck` script
  exists in `package.json`)
- `clerk doctor`
- `npm run dev` and manually verify in browser

## Manual test steps

1. Run `npm run dev`, open the home page.
2. Confirm the navbar shows "Sign in" and "Sign up" controls in place of the
   old static avatar (signed out).
3. Click Sign up, complete Clerk's sign-up flow with a test account.
4. Confirm the navbar now shows a `UserButton` (profile icon) instead of the
   sign-in/sign-up controls.
5. Click the `UserButton`, confirm the Clerk user menu opens and the account
   matches what was just created.
6. Sign out via the `UserButton` menu, confirm the navbar reverts to
   Sign in / Sign up.
