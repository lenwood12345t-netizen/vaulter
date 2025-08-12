import { supabase } from './supabase'

export type Story = {
  id: string
  slug?: string
  ai_title: string
  ai_subtitle: string
  ai_body_md: string
  image_url?: string
  published_at?: string
  created_at: string
  bottom_line?: string
}

export async function listStories({ limit = 12 } = {}) {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data as Story[]
}

export async function getStoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .maybeSingle()
  if (error) throw error
  return data as Story | null
}

export async function insertStory(s: Story) {
  const { data, error } = await supabase
    .from('stories')
    .insert(s)
    .select()
    .single()
  if (error) throw error
  return data as Story
}

export async function _seedStories(stories: Story[]) {
  for (const s of stories) {
    await insertStory(s)
  }
}
