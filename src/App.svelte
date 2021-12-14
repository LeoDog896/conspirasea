<script lang="ts">
	import ModeSwitcher from './ModeSwitcher.svelte';
	import Tailwindcss from './Tailwindcss.svelte';
	import { draggable } from "svelte-drag"
	import Modal from 'svelte-simple-modal';

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
<Modal>
	<Tailwindcss />
	<ModeSwitcher />
	<button class="px-4 py-2 justify-center w-full shadow-sm bg-blue-200 dark:bg-blue-900 fixed top-0">Add</button>
	{#each elements as element}
		<div use:draggable class="w-24 z-0 p-6 shadow-md bg-white dark:bg-black">
			<span class="text-black dark:text-white">{element.content}</span>
		</div>
	{/each}
</Modal>