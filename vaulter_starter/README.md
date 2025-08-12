# Project Vaulter (Starter)
Mobile‑first automated local‑news site (Next.js App Router). This starter includes a **pipeline skeleton**, Tailwind, and API stubs so you can deploy fast and wire up Supabase + OpenAI later.

## Quick Start
1. **Download and unzip** this repo.
2. Run:
   ```bash
   npm install
   npm run dev
   ```
3. Visit http://localhost:3000 — you should see a seeded story.
4. Run unit tests:
   ```bash
   npm test
   ```

## Deploy to Vercel
- Import this repo into Vercel.
- Add a **Cron Job** in Vercel (Settings → Cron Jobs) to POST `/api/cron/run` every 30 minutes.
- Add environment variables later when you wire Supabase + OpenAI.

## Next Steps
- Replace the in‑memory DB with Supabase. See `supabase/migrations/` and `supabase/README.md`.
- Implement real RSS ingestion in `lib/ingest.ts`.
- Call OpenAI in `lib/ai.ts` with your neutrality prompt to generate real copy and images.
