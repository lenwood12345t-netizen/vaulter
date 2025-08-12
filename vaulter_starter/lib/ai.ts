import OpenAI from 'openai'
import { z } from 'zod'
import type { RawItem } from './ingest'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export type Generated = {
  ai_title: string
  ai_subtitle: string
  ai_body_md: string
  tags: string[]
  bottom_line: string
  image_alt: string
  image_url: string
}

const schema = z.object({
  ai_title: z.string().max(75),
  ai_subtitle: z.string().max(140),
  ai_body_md: z.string().min(200),
  tags: z.array(z.string().max(30)).min(1).max(5),
  bottom_line: z.string().min(10),
  image_alt: z.string().min(10)
})

export async function generateStory(item: RawItem): Promise<Generated & { slug: string }> {
  const prompt = `You are a neutral local news writer. Using the source text, craft a concise and impartial brief.\nSource: ${item.source}\nPublished: ${item.published_at}\nText: ${item.text}\nReturn JSON with keys: ai_title, ai_subtitle, ai_body_md, tags, bottom_line, image_alt.`

  const parsed = await client.responses.parse({
    model: 'gpt-4o-mini',
    input: prompt,
    temperature: 0.2,
    schema
  })

  const img = await client.images.generate({
    model: 'gpt-image-1',
    prompt: parsed.image_alt,
    size: '1024x1024'
  })
  const image_url = img.data[0]?.url ?? ''

  const slug = parsed.ai_title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return { ...parsed, image_url, slug }
}
