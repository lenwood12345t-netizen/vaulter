import { insertStory } from '@/lib/db'
import type { Generated } from '@/lib/ai'

export async function publishStory(g: Generated & { slug: string }) {
  const row = await insertStory({
    id: crypto.randomUUID(),
    slug: g.slug,
    ai_title: g.ai_title,
    ai_subtitle: g.ai_subtitle,
    ai_body_md: g.ai_body_md,
    image_url: g.image_url,
    image_alt: g.image_alt,
    tags: g.tags,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    bottom_line: g.bottom_line
  })
  return row
}
