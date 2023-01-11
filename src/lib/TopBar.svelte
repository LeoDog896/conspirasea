<script lang="ts">
	import { fly } from 'svelte/transition';
	import ConspiraseaList from './ConspiraseaList.svelte';
	import { currentConspirasea } from './elements';
	import type Canvas from './Canvas.svelte';

	let topBarVisible = true;
	let listVisible = false;
	export let canvas: Canvas;
</script>

{#if topBarVisible}
	<div
		transition:fly={{ y: -150 }}
		class="fixed top-0 left-0 w-screen p-4 bg-white shadow-lg rounded-b-lg"
	>
		<button
			class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400 active:ring ring-cyan-100"
			on:click={() => {
				listVisible = !listVisible;
			}}>Conspiraseas</button
		>
		<button
			class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400 active:ring ring-cyan-100"
			>Download</button
		>
		<button
			class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400 active:ring ring-cyan-100"
			>Load</button
		>
		<button
			class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400 active:ring ring-cyan-100"
			on:click={() => {
				const result = confirm('Are you sure you want to clear the elements?');
				if (result) {
					$currentConspirasea.elements = [];
					canvas.draw();
				}
			}}>Clear</button
		>
	</div>
{/if}
<ConspiraseaList visible={listVisible} />
<button
	class="fixed top-0 right-0 m-4 px-4 py-2 rounded-lg mx-2 bg-cyan-200"
	on:click={() => (topBarVisible = !topBarVisible)}
>
	{topBarVisible ? 'Hide' : 'Show'}
</button>
