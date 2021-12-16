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
				x: event.offsetX,
				y: event.offsetY
			},
			content: "My conspiracy note"
		}]
	}

	let elements: Element[] = []
</script>
<Tailwindcss />
<ModeSwitcher />
<div class="h-full w-full" on:dblclick|self={addElement}>
	{#each elements as element}
		<div 
			on:dblclick={() => element.editable = !element.editable}
			use:draggable={{axis: "both", bounds: "body", position: element.position, defaultClassDragging: "box-dragging"}}
			class="transition-shadow fixed max-w-md z-0 p-6 shadow-md bg-white dark:bg-black"
		>
			{#if element.editable}
				<textarea
					bind:this={element.textarea}
					class="resizenone dark:bg-black bg-white"
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
		@apply shadow-lg scale-50;
	}
</style>