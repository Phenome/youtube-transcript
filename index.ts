import { getSubtitles } from './api.ts'

Deno.serve((req) => {
  const url = new URL(req.url)
  const path = url.pathname
  const query = url.searchParams
  if (!path.startsWith('/api/transcript')) {
    return new Response('Not found', { status: 404 })
  }
  const [video, lang] = path.split('/transcript/')[1].split('/')
  if (!video) {
    return new Response('Not found', { status: 400 })
  }
  const asJson = !!query.get('asJson')
  const promise = getSubtitles(video, lang, asJson)
  if (asJson === true) {
    return promise.then(
      (res) =>
        new Response(JSON.stringify(res), {
          headers: { 'Content-Type': 'application/json' }
        })
    )
  } else {
    return promise.then(
      (res) =>
        new Response(res as string, {
          headers: { 'Content-Type': 'text/plain' }
        })
    )
  }
})
