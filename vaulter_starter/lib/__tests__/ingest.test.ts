import { describe, it, expect } from 'vitest'
import { fetchFeeds, selectCandidates, type RawItem } from '../ingest'

describe('selectCandidates', () => {
  it('returns the highest ranked item', async () => {
    const items: RawItem[] = [
      { url: '1', title: 'First', text: 'A' },
      { url: '2', title: 'Second', text: 'B' }
    ]
    const selected = await selectCandidates(items)
    expect(selected).toHaveLength(1)
    expect(selected[0].url).toBe('1')
  })
})

describe('fetchFeeds', () => {
  it('fetches items with required fields', async () => {
    const items = await fetchFeeds()
    expect(items.length).toBeGreaterThan(0)
    const item = items[0]
    expect(item).toHaveProperty('url')
    expect(item).toHaveProperty('title')
    expect(item).toHaveProperty('text')
  })
})
