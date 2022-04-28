<script lang="ts">
	import { draggable } from "@neodrag/svelte"
  import { onMount, tick } from "svelte"
  import TopBar from "$lib/TopBar.svelte"
  import { elements } from "$lib/elements"

  let width: number;
  let height: number;
  let canvas: HTMLCanvasElement | null = null;

  onMount(() => {
    width = window.innerWidth
    height = window.innerHeight
  })

	function addElement(event: MouseEvent) {
		$elements = [...$elements, {
			position: {
				x: event.pageX,
				y: event.pageY
			},
      connections: [],
      id: crypto.randomUUID(),
			content: "My conspiracy note"
		}]
	}

  $: if (width && height && $elements.length > 0 && canvas && canvas.getContext("2d")) {
    const context = canvas.getContext("2d")!
    context.clearRect(0, 0, width, height);
    $elements.forEach(it => it.connections.forEach(connection => {
      const elementSelection = $elements.filter(it => it.id == connection)
      if (elementSelection.length === 0) return
      const element = elementSelection[0]
      context.strokeStyle = "rgba(235, 64, 52, 0.3)"
      context.lineWidth = 4
      context.beginPath()
      const itX = it.position.x + (it.self?.clientWidth || 0) / 2
      const itY = it.position.y + (it.self?.clientHeight || 0) / 8
      const elementX = element.position.x + (element.self?.clientWidth || 0) / 2
      const elementY = element.position.y + (element.self?.clientHeight || 0) / 8
      context.moveTo(itX, itY)
      context.lineTo(elementX, elementY)
      context.stroke()

      context.strokeStyle = "rgba(0, 0, 0, 0)"
      context.fillStyle = "#ebde34"
      context.beginPath();
      context.arc(itX, itY, 7, 0, 2 * Math.PI);
      context.fill();
      context.beginPath();
      context.arc(elementX, elementY, 7, 0, 2 * Math.PI);
      context.fill();
    }))
  }

</script>
<svelte:window on:resize={() => {
  width = window.innerWidth
  height = window.innerHeight
}}></svelte:window>
<div id="container" 
class="fixed top-0 left-0 h-full w-screen bg-gray-300" 
on:click|self={() => {
  $elements = $elements.map(it => {
    it.selected = false;
    return it;
  })
}}
on:dblclick|self={addElement}
>
	{#each $elements as element}
		<div
      bind:this={element.self} 
			on:dblclick={() => {
        element.editable = !element.editable;
        tick().then(() => element.textarea?.focus())
      }}
      on:click={() => {
        const otherSelectedElement = $elements.filter(it => it !== element).filter(it => it.selected);
        if (otherSelectedElement.length !== 0) {
          if (otherSelectedElement[0].connections.some(elem => elem == element.id)) return
          $elements[$elements.indexOf(otherSelectedElement[0])].selected = false
          element.connections = [...element.connections, otherSelectedElement[0].id]
          $elements = $elements
          return
        }

        element.selected = !element.selected
      }}
			use:draggable={{ axis: "both", bounds: "#container", position: element.position, defaultClassDragging: "box-dragging" }}
      on:neodrag={event => {
        if (!event || !event.detail) return
        const { offsetX, offsetY } = event.detail;
        element.position.x = offsetX;
        element.position.y = offsetY;
      }}
      on:neodrag:end={() => tick().then(() => {
        element.selected = false
      })}
			class="transition-shadow fixed max-w-md z-0 p-6 shadow-lg rounded-md
      {element.selected ? "bg-gray-200" : "bg-white"} dark:bg-black"
		>
			{#if element.editable}
				<textarea
          on:keydown={event => {
            if (event.key == "Escape" || event.key == "Esc") {
              element.editable = false
            }
          }}
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
<canvas class="fixed top-0 left-0 pointer-events-none" bind:this={canvas} {width} {height}/>
<TopBar></TopBar>