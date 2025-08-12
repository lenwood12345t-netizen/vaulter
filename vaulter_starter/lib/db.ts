// In real deploy, replace with Supabase (see supabase/README).
// Here we include a minimal in-memory fallback so the site loads with seeds.
type Story = {
  id: string
  slug?: string
  ai_title: string
  ai_subtitle: string
  ai_body_md: string
  image_url?: string
  tags?: string[]
  region?: string
  category?: string
  published_at?: string
  created_at: string
  bottom_line?: string
}
const mem: { stories: Story[] } = { stories: [] }

export async function listStories({ limit = 12 } = {}) {
  return mem.stories.slice(0, limit)
}
export async function getStoryBySlug(slug: string) {
  return mem.stories.find(s => s.slug === slug || s.id === slug)
}
export async function insertStory(s: Story) {
  if (s.slug) {
    const base = s.slug
    let candidate = base
    let i = 1
    while (mem.stories.some(story => story.slug === candidate)) {
      candidate = `${base}-${i++}`
    }
    s.slug = candidate
  }
  mem.stories.unshift(s)
  return s
}
export function _seedStories(stories: Story[]) {
  mem.stories = stories.concat(mem.stories)
}
