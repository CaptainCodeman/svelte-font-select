<script lang="ts">
	export let spacing: number
</script>

<div class={$$props.class}>
	<label for="spacing" class="block text-sm font-medium leading-6 text-gray-900"
		>Letter Spacing</label
	>
	<input id="spacing" type="range" bind:value={spacing} min="-0.25" max="0.5" step="0.01" />
</div>
