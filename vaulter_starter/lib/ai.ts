import { z } from 'zod'
import type { RawItem } from './ingest'

export type Generated = {
  ai_title: string
  ai_subtitle: string
  ai_body_md: string
  bottom_line: string
  image_alt: string
  image_url: string
  tags: string[]
  region: string
  category: string
}

const schema = z.object({
  ai_title: z.string().max(75),
  ai_subtitle: z.string().max(140),
  ai_body_md: z.string().min(200),
  bottom_line: z.string().min(10),
  image_alt: z.string().min(10),
  image_url: z.string().url(),
  tags: z.array(z.string()),
  region: z.string(),
  category: z.string()
})

export async function generateStory(item: RawItem): Promise<Generated & { slug: string }> {
  // Placeholder: in production, call OpenAI with neutrality prompt.
  const mock: Generated = {
    ai_title: 'WSDOT adjusts ferry schedule during maintenance',
    ai_subtitle: 'Agency cites vessel maintenance; riders advised to check updated sailings.',
    ai_body_md: `> Note: Demo content. Replace with AI output.\n\n${item.text}\n\n**Key details**\n- Source: ${item.source}\n- Published: ${item.published_at}`,
    bottom_line: 'Expect temporary delays; verify sailings before you go.',
    image_alt: 'Washington State ferry at dock during sunset',
    image_url: 'https://example.com/ferry.jpg',
    tags: ['transportation', 'ferry'],
    region: 'WA',
    category: 'transportation'
  }
  const parsed = schema.parse(mock)
  const slug = parsed.ai_title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return { ...parsed, slug }
}
