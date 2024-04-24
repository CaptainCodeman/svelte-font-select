<script lang="ts">
	import RenderFont from './RenderFont.svelte'
	import VirtualList from 'svelte-tiny-virtual-list'
	import { filtered } from 'svelte-font-select/stores'

	export let text = 'The Quick Brown Fox Jumped Over The Lazy Dogs '
	export let size = 2
	export let height = 600
	export let spacing = 0
	export let delay = 240

	$: adjustOffset(size)

	let sizePrev = size
	let scrollOffset = 0

	function afterScroll(e: CustomEvent<{ offset: number }>) {
		scrollOffset = e.detail.offset
	}

	function adjustOffset(size: number) {
		scrollOffset = (scrollOffset / itemHeight(sizePrev)) * itemHeight(size)
		sizePrev = size
	}

	function itemHeight(size: number) {
		return size * 24 + 40
	}
</script>

<ul class={$$props.class}>
	<VirtualList
		{height}
		width="auto"
		itemCount={$filtered.length}
		itemSize={itemHeight(size)}
		overscanCount={4}
		{scrollOffset}
		on:afterScroll={afterScroll}
	>
		<li slot="item" let:index let:style {style}>
			<RenderFont {index} {text} {size} {spacing} {delay} />
		</li>
	</VirtualList>
</ul>

<style>
	ul {
		height: 100%;
		padding: 6px;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	ul :global(.virtual-list-wrapper) {
		scrollbar-width: thin;
	}

	/*
	::-webkit-scrollbar {
	}

	::-webkit-scrollbar-track {
	}

	::-webkit-scrollbar-thumb {
	}
	*/
</style>
