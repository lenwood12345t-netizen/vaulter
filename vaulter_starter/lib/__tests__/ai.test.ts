import { describe, it, expect, vi } from 'vitest'
import { generateStory } from '../ai'
import type { RawItem } from '../ingest'

vi.mock('openai', () => ({ OpenAI: vi.fn() }))

describe('generateStory', () => {
  const raw: RawItem = {
    url: 'https://example.com',
    title: 'Sample',
    text: 'x'.repeat(250),
    published_at: '2024-01-01',
    source: 'Test'
  }

  it('validates and returns a slug', async () => {
    const result = await generateStory(raw)
    expect(result.slug).toBe('wsdot-adjusts-ferry-schedule-during-maintenance')
    expect(result.ai_body_md.length).toBeGreaterThan(200)
    expect(result.ai_title.length).toBeLessThanOrEqual(75)
  })
})
