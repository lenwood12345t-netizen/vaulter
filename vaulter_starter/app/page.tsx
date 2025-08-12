import Link from 'next/link'
import { listStories } from '@/lib/db'

export default async function HomePage() {
  let stories = []
  try {
    stories = await listStories({ limit: 12 })
  } catch (err) {
    console.error('Failed to load stories', err)
  }
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl">Latest</h1>
        <p className="text-sm opacity-70">Fresh local coverage, updated every 30 minutes.</p>
      </header>
      <ul className="grid gap-6">
        {stories.map(s => (
          <li key={s.id} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-sm">
            <Link href={`/story/${s.slug || s.id}`} className="no-underline">
              <h2 className="text-xl mb-1">{s.ai_title}</h2>
              <p className="opacity-80 text-sm">{s.ai_subtitle}</p>
              <p className="opacity-60 text-xs mt-2">{new Date(s.published_at ?? s.created_at).toLocaleString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
