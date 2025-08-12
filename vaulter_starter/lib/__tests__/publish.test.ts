import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/db', () => ({
  insertStory: vi.fn(async (s) => s)
}))

import { publishStory } from '../publish'
import { insertStory } from '@/lib/db'
import type { Generated } from '../ai'

describe('publishStory', () => {
  it('writes a story via Supabase client', async () => {
    const g: Generated & { slug: string } = {
      slug: 'test-slug',
      ai_title: 'T',
      ai_subtitle: 'S',
      ai_body_md: 'a'.repeat(210),
      bottom_line: 'bottom line',
      image_alt: 'alt text'
    }
    const result = await publishStory(g)
    expect(insertStory).toHaveBeenCalledOnce()
    expect(result.slug).toBe('test-slug')
  })
})
