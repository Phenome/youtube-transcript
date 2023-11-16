import { getSubtitles as extGetSubtitles } from 'npm:youtube-caption-extractor'

export async function getSubtitles(
  videoId: string,
  lang = 'en',
  asJson = false
) {
  try {
    const json = await extGetSubtitles({ videoID: videoId, lang })
    if (asJson) {
      return json
    } else return json.map((item: { text: string }) => item.text).join('\n\n')
  } catch (_e) {
    return ''
  }
}
