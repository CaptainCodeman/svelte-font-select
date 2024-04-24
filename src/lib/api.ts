import type { ServerLoad } from '@sveltejs/kit'

interface GoogleFont {
	category: string
	family: string
	files: Record<string, string>
	kind: 'webfonts#webfont'
	lastModified: string
	menu: string
	subsets: string[]
	variants: string[]
	version: string
}

interface GoogleFontsList {
	items: GoogleFont[]
	kind: 'webfonts#webfontList'
}

export interface FontInfo {
	category: string
	family: string
	file: string
}

export type FontFilter = (font: GoogleFont) => boolean

export const defaultFilter = (font: GoogleFont) =>
	font.subsets.includes('latin') &&
	font.variants.includes('regular') &&
	(font.family === 'Noto Sans' || !font.family.startsWith('Noto Sans'))

type ServerLoadType = ServerLoad<
	Partial<Record<string, string>>,
	Record<string, any>,
	{ fonts: FontInfo[] }
>

export function createServerLoad(key: string, filter?: FontFilter): ServerLoadType {
	return async function load({ fetch, setHeaders }) {
		const url = new URL('https://www.googleapis.com/webfonts/v1/webfonts')
		url.searchParams.set('key', key)
		url.searchParams.set('subset', 'latin')
		url.searchParams.set('sort', 'popularity')
		const resp = await fetch(url)
		const data = (await resp.json()) as GoogleFontsList
		const items = filter ? data.items.filter(filter) : data.items

		const fonts = items.map((item) => {
			const { category, family } = item
			return {
				category,
				family,
				file: item.files.regular,
			}
		})

		// TODO: allow passing in caching parameters
		setHeaders({ 'cache-control': 'public, max-age=86400' })

		return { fonts }
	}
}
