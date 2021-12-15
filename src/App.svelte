<script lang="ts">
	import ModeSwitcher from './ModeSwitcher.svelte';
	import Tailwindcss from './Tailwindcss.svelte';
	import { draggable } from "svelte-drag"

	interface Position {
		x: number,
		y: number
	}

	interface Element {
		imageURL?: string,
		content?: string,
		editable?: boolean,
		position?: Position
	}

	let elements: Element[] = [{
		content: "My conspiracy note"
	}]

	function toggleEditable(index: number) {
		elements = [
			...elements.slice(0, index),
			Object.assign({}, elements[index], { editable: true }),
			...elements.slice(index + 1, elements.length)
		]
	}
</script>
<Tailwindcss />
<ModeSwitcher />
<div class="h-full w-full" on:click|self={() => alert(1)}>
	{#each elements as element, i}
		<div on:dblclick={() => toggleEditable(i)} use:draggable class="max-w-md z-0 p-6 shadow-md bg-white dark:bg-black">
			{#if element.editable}
				<textarea class="resizenone" bind:value={element.content} placeholder="Enter notes content..." />
			{:else}
				<span class="text-black dark:text-white">{element.content}</span>
			{/if}
		</div>
	{/each}
</div>