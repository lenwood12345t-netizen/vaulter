// Local cron runner (for dev). In Vercel, configure a Cron job calling /api/cron/run.
import fetch from 'node-fetch'
const url = process.env.CRON_URL || 'http://localhost:3000/api/cron/run'
const res = await fetch(url, { method: 'POST' })
console.log('Cron result', await res.json())
