import { fetchFeeds, selectCandidates } from '@/lib/ingest'
import { generateStory } from '@/lib/ai'
import { publishStory } from '@/lib/publish'

export const runtime = 'edge'

export async function POST() {
  try {
    const fetched = await fetchFeeds()
    const picks = await selectCandidates(fetched)
    const results = []
    for (const item of picks) {
      const story = await generateStory(item)
      const published = await publishStory(story)
      results.push({ id: published.id, title: published.ai_title })
    }
    return Response.json({ ok: true, results })
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || 'unknown' }), { status: 500 })
  }
}
