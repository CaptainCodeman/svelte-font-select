<script lang="ts" context="module">
	const loaded: Record<string, boolean> = {}
	const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<script lang="ts">
	import { filtered } from './stores'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	export let index: number
	export let text: string
	export let size: number
	export let spacing: number
	export let delay: number

	let abort = false

	$: font = $filtered[index]
	$: loader = load(font)

	async function load(font: any) {
		if (!font) return
		if (loaded[font.family]) return
		await pause(delay)
		const fontface = new FontFace(font.family, `url(${font.file})`)
		await fontface.load()
		document.fonts.add(fontface)
		loaded[font.family] = true
	}

	onMount(() => () => (abort = true))
</script>

<div style:height={`${size * 24 + 32}px`}>
	{#if font}
		<h2>{font.family}</h2>
		{#await loader then}
			<p
				style:font-family={font.family}
				style:font-size={`${size}rem`}
				style:letter-spacing={spacing ? `${spacing}rem` : 'normal'}
				in:fade={{ delay: 0, duration: 240 }}
			>
				{text}
			</p>
		{/await}
	{/if}
</div>

<style>
	div {
		padding: 4px;
		border-radius: 6px;
		border: 1px solid transparent;
		position: relative;
		display: flex;
		align-items: center;
	}

	div:hover {
		border: 1px solid #ddd;
		background-color: #f7f7f7;
	}

	h2 {
		font-family: Arial, Helvetica, sans-serif;
		font-size: 14px;
		line-height: 0;
		color: #999;
		position: absolute;
		top: 12px;
		left: 4px;
	}

	p {
		white-space: pre;
		padding-top: 8px;
		padding-left: 16px;
		overflow: hidden;
		line-height: 2;
		margin: 0;
	}
</style>
