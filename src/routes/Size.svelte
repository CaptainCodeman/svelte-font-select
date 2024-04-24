<script lang="ts">
	export let size: number
</script>

<div class={$$props.class}>
	<label for="size" class="block text-sm font-medium leading-6 text-gray-900">Font Size</label>
	<input id="size" type="range" bind:value={size} min="1" max="5" step="0.01" />
</div>
