import { env } from '$env/dynamic/private'
import { createServerLoad } from 'svelte-font-select'

export const load = createServerLoad(env.GOOGLE_FONTS_API_KEY)
