import { GOOGLE_FONTS_API_KEY } from '$env/static/private'
import { createServerLoad } from 'svelte-font-select'

export const load = createServerLoad(GOOGLE_FONTS_API_KEY)
