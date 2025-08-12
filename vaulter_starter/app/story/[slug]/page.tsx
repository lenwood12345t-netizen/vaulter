import { getStoryBySlug } from '@/lib/db'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'

type Params = { slug: string }

export default async function StoryPage({ params }: { params: Params }) {
  const story = await getStoryBySlug(params.slug)
  if (!story) return notFound()
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{story.ai_title}</h1>
      <p className="lead">{story.ai_subtitle}</p>
      {story.image_url ? (
        <Image src={story.image_url} alt={story.ai_title} width={1200} height={630} className="rounded-xl border" />
      ) : null}
      <Markdown>{story.ai_body_md}</Markdown>
      <p className="text-sm opacity-60 mt-6">Bottom line: {story.bottom_line ?? '—'}</p>
    </article>
  )
}
