# Seed Sanity from the provided seed files

## Goal
Load the pre-built course/lesson/instructor/category content in `studio/seed/seed.ndjson` into the `production` dataset using the Sanity CLI's dataset import, then verify the imported document counts match the file. No new content is generated, and neither seed file is modified.

## Skills and docs read
- `AGENTS.md` sections 5, 6, 8, 9, 12, 13 — server/client boundaries, private dataset + token rules, the fixed content shape, why video documents come from a separate offline pipeline, and which checks apply to Studio work.
- `sanity-migration` skill considered but not loaded — that skill covers building an extraction/transform pipeline from a foreign system; here the target-shaped ndjson already exists, so there's nothing to migrate or transform.
- `sanity-best-practices` not needed beyond what's already known about `sanity dataset import`'s asset-fetching convention (confirmed by inspecting the file itself, see below).

## Code inspected
- `studio/seed/seed.ndjson` (141 lines, one JSON doc per line): 10 `course`, 120 `lesson`, 6 `category`, 5 `instructor` documents. Matches the four document types in `studio/schemaTypes/documents/` exactly (`courseType.ts`, `lessonType.ts`, `categoryType.ts`, `instructorType.ts`) — no `video` document type exists in the schema yet.
- Image fields (`course.coverImage`, `lesson.thumbnail`) use `{ "_sanityAsset": "image@<url>", "_type": "image", "alt": ... }`. This is the Sanity CLI import tool's documented asset-fetching syntax — it downloads each URL and creates the asset itself during import. No pre-uploaded assets are required.
- `studio/seed/videos.json` is a flat lookup of YouTube video id/title/channel/duration/query per lesson slug. It is not ndjson and not shaped as Sanity documents — it's raw material for the future video-ingestion pipeline (AGENTS.md section 9), which builds `video` documents (chapters + transcript chunks) once that document type and ingestion tooling exist. **It plays no part in this task** and is not passed to the import command.
- `studio/sanity.cli.ts` / `studio/.env`: `SANITY_STUDIO_PROJECT_ID=z7oqtonb`, `SANITY_STUDIO_DATASET=production`.
- `npx sanity datasets list` (run from `studio/`) shows a single dataset, `production`.
- `npx sanity documents query '*[!(_id in path("_.**"))][0...5]{_id,_type}'` returned `[]` — the dataset is currently empty, so this is a first import, not a merge/overwrite.
- `npx sanity debug --secrets` confirms the CLI is already authenticated (Arthur Kim, google login) with a valid session token — import will run under the user's own Sanity account permissions, not an env API token. No write token exists in `.env`/`.env.example` and none is needed for this CLI-driven import.

## Decisions and assumptions
1. **Only `seed.ndjson` is imported.** `videos.json` has no corresponding document type or ingestion tooling yet, so importing it is out of scope — building the `video` schema and transcript/chapter ingestion is a separate task per AGENTS.md section 9.
2. **Plain import, no `--replace`/`--missing`.** The dataset is empty, so there's no collision to resolve; default behavior (fail on existing-ID collision) is safe and simplest.
3. **Run via the Studio's own CLI session**, from `studio/` (where `sanity.cli.ts` resolves project/dataset), rather than passing `--project-id`/`--dataset` explicitly, so it uses the same config the Studio itself uses.
4. **No files are edited.** This task is a data load against the remote dataset, not a code change — nothing in `studio/` or `web` is expected to be touched.

## Files expected to touch
None. This is a one-time data import against the live `production` dataset; no source files are created or modified.

## Requirements
- Command: `npx sanity dataset import seed/seed.ndjson production` run from `studio/` (CLI will prompt for confirmation; accept it).
- After import completes, verify counts with a GROQ query against the live dataset, grouped by `_type`, and confirm they match the file's counts exactly:
  - `course`: 10
  - `lesson`: 120
  - `category`: 6
  - `instructor`: 5
  - total: 141
- Confirm image assets referenced via `_sanityAsset` were created (spot-check one course's `coverImage` and one lesson's `thumbnail` resolve to a real asset `_ref`, not a dangling/missing reference).
- Do not modify `studio/seed/seed.ndjson` or `studio/seed/videos.json` in any way.

## Security considerations
- Import runs under the user's own authenticated Sanity CLI session (already logged in) — no token is written to disk or committed.
- The dataset's visibility (public/private) and read-token setup are unrelated to this task and untouched; seeding does not change dataset access configuration.
- All image source URLs in the file are `picsum.photos` (placeholder covers) and `i.ytimg.com` (YouTube thumbnails) — both are already trusted, non-secret sources referenced directly in the seed data, nothing user-supplied.

## Acceptance criteria
- `sanity dataset import` completes with 0 failed documents and 0 failed assets.
- Post-import GROQ count query matches the file's per-type and total counts exactly.
- `git status` shows no changes to `studio/seed/seed.ndjson` or `studio/seed/videos.json`.

## Checks to run
- Post-import GROQ verification query (see Requirements) — this *is* the check for a seed task; no type check/lint/build applies since no code changes.

## Manual test steps
1. From `studio/`, run `npx sanity dataset import seed/seed.ndjson production` and confirm the CLI reports success with counts matching 10/120/6/5 (141 total) and no failed assets.
2. Run `npx sanity documents query 'count(*[_type == "course"])'` (repeat for `lesson`, `category`, `instructor`) from `studio/` and confirm each matches the expected count above.
3. In the Studio (`npm run dev` inside `studio/`, or `npx sanity dev`), open one course (e.g. "Next.js App Router in Depth") and confirm its cover image renders and its modules resolve to real lesson documents, not broken references.
