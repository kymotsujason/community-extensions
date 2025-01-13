import { 
    PartialSourceManga, 
    SearchRequest 
} from '@paperback/types'
import { MDImageQuality } from './MangaDexHelper'
import { MangaItem } from './MangaDexInterfaces'
import { relevanceScore } from './RelevanceScore'


export const parseMangaList = async (
    object: MangaItem[],
    source: any,
    thumbnailSelector: any,
    query?: SearchRequest
): Promise<PartialSourceManga[]> => {
    const results: { manga: PartialSourceManga; relevance: number }[] = []

    for (const manga of object) {
        const mangaId = manga.id ?? ''
        const mangaDetails = manga.attributes ?? {}

        const title = source.decodeHTMLEntity(
            mangaDetails.title?.en ??
            (mangaDetails.altTitles ?? [])
                .map(x => Object.values(x ?? {}).find((v) => v !== undefined))
                .find((t) => t !== undefined)
        ) || 'Unknown Title'

        const coverFileName = (manga.relationships ?? [])
            .filter((x) => x.type == 'cover_art')
            .map((x) => x.attributes?.fileName)[0]

        const image = coverFileName
            ? `${source.COVER_BASE_URL}/${mangaId}/${coverFileName}${MDImageQuality.getEnding(await thumbnailSelector(source.stateManager))}`
            : 'https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg'

        const subtitle = `${
            mangaDetails.lastVolume ? `Vol. ${mangaDetails.lastVolume}` : ''
        } ${mangaDetails.lastChapter ? `Ch. ${mangaDetails.lastChapter}` : ''}`

        const partialManga = App.createPartialSourceManga({
            mangaId: mangaId,
            title: title,
            image: image,
            subtitle: subtitle
        })

        let relevance = 0
        if (query?.title) {
            relevance = relevanceScore(title, query.title)
        }

        results.push({
            manga: partialManga,
            relevance: relevance
        })
    }

    results.sort((a, b) => b.relevance - a.relevance)
    return results.map((r) => r.manga)
}

