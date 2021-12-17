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
		position?: Position,
		textarea?: HTMLTextAreaElement
	}

	function addElement(event: MouseEvent) {
		elements = [...elements, {
			position: {
				x: event.pageX,
				y: event.pageY
			},
			content: "My conspiracy note"
		}]
	}

	let elements: Element[] = []
</script>
	<Tailwindcss />
<ModeSwitcher />
<div id="container" class="h-full w-full" on:dblclick|self={addElement}>
	{#each elements as element}
		<div 
			on:dblclick={() => element.editable = !element.editable}
			use:draggable={{axis: "both", bounds: "#container", position: element.position, defaultClassDragging: "box-dragging"}}
			class="transition-shadow fixed max-w-md z-0 p-6 shadow-lg rounded-md bg-gray-50 dark:bg-black"
		>
			{#if element.editable}
				<textarea
					bind:this={element.textarea}
					class="resize-none dark:bg-black bg-white"
					on:blur={() => element.editable = false}
					bind:value={element.content}
					placeholder="Enter notes content..." 
				/>
			{:else}
				<span>{element.content || ""}</span>
			{/if}
		</div>
	{/each}
</div>

<style>
	:global(.box-dragging) {
		@apply shadow-xl;
	}
</style>