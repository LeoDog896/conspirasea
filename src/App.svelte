<script lang="ts">
	import ModeSwitcher from './ModeSwitcher.svelte';
	import Tailwindcss from './Tailwindcss.svelte';
	import { draggable } from "svelte-drag"

	interface Element {
		imageURL?: string,
		content?: string
	}

	let elements: Element[] = [
		{
			content: "Hello World"
		},
		{
			content: "Testing 1-2-3"
		}
	]
</script>
<Tailwindcss />
<ModeSwitcher />
{#each elements as element}
	<div use:draggable class="w-px z-0 p-6 shadow-md bg-white dark:bg-black">
		<span class="text-black dark:text-white">{element.content}</span>
	</div>
{/each}