<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import { tick } from 'svelte';
	import TopBar from '$lib/TopBar.svelte';
	import { currentConspirasea } from '$lib/elements';
	import Canvas from '$lib/Canvas.svelte';

	let canvas: Canvas;

	function addElement(event: MouseEvent) {
		$currentConspirasea.elements = [
			...$currentConspirasea.elements,
			{
				position: {
					x: event.pageX,
					y: event.pageY
				},
				connections: [],
				id: crypto.randomUUID(),
				content: 'My conspiracy note'
			}
		];
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="container"
	class="fixed top-0 left-0 h-full w-screen bg-gray-300"
	on:click|self={() => {
		$currentConspirasea.elements = $currentConspirasea.elements.map((it) => {
			it.selected = false;
			return it;
		});
	}}
	on:dblclick|self={addElement}
>
	{#each $currentConspirasea.elements as element}
		<div
			bind:this={element.self}
			on:dblclick={() => {
				element.editable = !element.editable;
				tick().then(() => element.textarea?.focus());
			}}
			on:click={() => {
				const otherSelectedElement = $currentConspirasea.elements
					.filter((it) => it !== element)
					.filter((it) => it.selected);
				if (otherSelectedElement.length !== 0) {
					if (otherSelectedElement[0].connections.some((elem) => elem == element.id)) return;
					$currentConspirasea.elements[
						$currentConspirasea.elements.indexOf(otherSelectedElement[0])
					].selected = false;
					element.connections = [...element.connections, otherSelectedElement[0].id];
					$currentConspirasea.elements = $currentConspirasea.elements;
					return;
				}

				element.selected = !element.selected;
			}}
			use:draggable={{
				axis: 'both',
				bounds: '#container',
				position: element.position,
				defaultClassDragging: 'box-dragging',
				onDrag(event) {
					const { offsetX, offsetY } = event;
					element.position.x = offsetX;
					element.position.y = offsetY;
				},
				onDragEnd() {
					tick().then(() => {
						element.selected = false;
					})
				}
			}}
			class="transition-shadow fixed max-w-md z-0 p-6 shadow-lg rounded-md
      {element.selected ? 'bg-gray-200' : 'bg-white'} dark:bg-black"
		>
			{#if element.editable}
				<textarea
					on:keydown={(event) => {
						if (event.key == 'Escape' || event.key == 'Esc') {
							element.editable = false;
						}
					}}
					bind:this={element.textarea}
					class="resize-none dark:bg-black bg-white"
					on:blur={() => (element.editable = false)}
					bind:value={element.content}
					placeholder="Enter notes content..."
				/>
			{:else}
				<span>{element.content || ''}</span>
			{/if}
		</div>
	{/each}
</div>
<TopBar bind:canvas />
<Canvas bind:this={canvas} />

<style>
	:global(.box-dragging) {
		@apply shadow-xl;
	}
</style>
