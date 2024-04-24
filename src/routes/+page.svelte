<script lang="ts">
	import { fonts, FontList } from 'svelte-font-select'
	import Search from './Search.svelte'
	import Text from './Text.svelte'
	import Categories from './Categories.svelte'
	import Size from './Size.svelte'
	import Spacing from './Spacing.svelte'

	export let data

	$: fonts.set(data.fonts)

	let text = 'The Quick Brown Fox Jumped Over The Lazy Dogs '
	let size = 2
	let height = 600
	let spacing = 0
	let delay = 240
</script>

<div class="m-4 grid grid-cols-2 gap-4">
	<Search />
	<Text bind:text />
	<Categories />
	<div>
		<Size bind:size />
		<Spacing bind:spacing />
	</div>
</div>

<FontList class="m-4" {text} {size} {height} {spacing} {delay} />
