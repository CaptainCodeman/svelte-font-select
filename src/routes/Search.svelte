<script lang="ts">
	import { value } from 'svelte-font-select'
</script>

<div class={$$props.class}>
	<label for="search" class="block text-sm font-medium leading-6 text-gray-900">Quick search</label>
	<div class="relative mt-2 flex items-center">
		<input
			type="text"
			name="search"
			id="search"
			bind:value={$value}
			class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		/>
	</div>
</div>
