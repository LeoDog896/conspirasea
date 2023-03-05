<script lang="ts">
	import { currentConspirasea } from '$lib/elements';
	import { onMount } from 'svelte';
	import { Canvas, Layer, type Render } from "svelte-canvas"

	let width: number;
	let height: number;

	let render: Render;
	$: render = ({ context, width, height }) => {
		context.clearRect(0, 0, width, height);
		$currentConspirasea.elements.forEach((it) =>
			it.connections.forEach((connection) => {
				const elementSelection = $currentConspirasea.elements.filter((it) => it.id == connection);
				if (elementSelection.length === 0) return;
				const element = elementSelection[0];
				context.strokeStyle = 'rgba(235, 64, 52, 0.3)';
				context.lineWidth = 4;
				context.beginPath();
				const itX = it.position.x + (it.self?.clientWidth || 0) / 2;
				const itY = it.position.y + (it.self?.clientHeight || 0) / 8;
				const elementX = element.position.x + (element.self?.clientWidth || 0) / 2;
				const elementY = element.position.y + (element.self?.clientHeight || 0) / 8;
				context.moveTo(itX, itY);
				context.lineTo(elementX, elementY);
				context.stroke();

				context.strokeStyle = 'rgba(0, 0, 0, 0)';
				context.fillStyle = '#ebde34';
				context.beginPath();
				context.arc(itX, itY, 7, 0, 2 * Math.PI);
				context.fill();
				context.beginPath();
				context.arc(elementX, elementY, 7, 0, 2 * Math.PI);
				context.fill();
			})
		);
	}

	onMount(() => {
		width = window.innerWidth;
		height = window.innerHeight;
	});
</script>

<Canvas class="fixed top-0 left-0 pointer-events-none" {width} {height}>
	<Layer {render}></Layer>
</Canvas>
<svelte:window
	on:resize={() => {
		width = window.innerWidth;
		height = window.innerHeight;
	}}
/>
