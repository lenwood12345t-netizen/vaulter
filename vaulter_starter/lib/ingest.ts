export type RawItem = {
  url: string
  title: string
  text: string
  published_at?: string
  source?: string
}

export async function fetchFeeds(): Promise<RawItem[]> {
  // Placeholder: in production, fetch RSS feeds and parse
  return [{
    url: 'https://example.com/news/wa-transport',
    title: 'WSDOT updates ferry schedule amid maintenance',
    text: 'Washington State Department of Transportation announced schedule changes...',
    published_at: new Date().toISOString(),
    source: 'Seed'
  }]
}

export async function selectCandidates(items: RawItem[]): Promise<RawItem[]> {
  // Placeholder: simple dedupe/rank
  return items.slice(0, 1)
}
