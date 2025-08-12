import { _seedStories } from '../lib/db.ts'

const demo = [{
  id: crypto.randomUUID(),
  slug: 'demo-wsdot-ferries',
  ai_title: 'WSDOT adjusts ferry schedule during maintenance',
  ai_subtitle: 'Agency cites vessel maintenance; riders advised to check updated sailings.',
  ai_body_md: 'Demo content body.',
  image_url: '',
  image_alt: 'Demo image alt text',
  tags: ['demo'],
  published_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  bottom_line: 'Expect temporary delays; verify sailings before you go.'
}]

_seedStories(demo)
console.log('Seeded demo story.')
