import { derived, writable } from 'svelte/store'
import type { FontInfo } from './api'

export const fonts = writable([] as FontInfo[])

export const categories = derived(fonts, (fonts) => new Set(fonts.map((font) => font.category)))

export const filter = writable([] as string[])

export const value = writable('')

export const sort = writable(false)

const valueRegex = derived(value, (value) => (value.length ? new RegExp(value, 'gi') : null))

export const filtered = derived(
	[fonts, filter, sort, valueRegex],
	([fonts, filter, sort, valueRegex]) => {
		const result = fonts
			.filter((font) => filter.length === 0 || filter.includes(font.category))
			.filter((font) => valueRegex === null || font.family.match(valueRegex))
		return sort ? result.sort((a, b) => a.family.localeCompare(b.family, 'en')) : result
	},
)
