<script lang="ts">
	import { filter, categories } from 'svelte-font-select'
</script>

<div class={$$props.class}>
	<h3 class="block text-sm font-medium leading-6 text-gray-900">Categories</h3>
	{#each $categories as category}
		<label class="mr-3 inline-flex items-center text-sm font-medium leading-6 text-gray-900">
			<input class="mr-2" type="checkbox" bind:group={$filter} name="flavours" value={category} />
			{category}
		</label>
	{/each}
</div>
