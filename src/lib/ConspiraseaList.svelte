<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import {
		conspiraseas,
		serializableConspiraseas,
		conspiraseaIndex,
		currentConspirasea,
		type SerializableConspirasea
	} from './elements';

	let dataLoaded = false;

	onMount(() => {
		const data = localStorage.getItem('data');
		if (!data) return;
		const jsonData = JSON.parse(data) as SerializableConspirasea[];
		$conspiraseas = jsonData;
		dataLoaded = true;
	});

	$: if (
		$conspiraseas &&
		globalThis.localStorage &&
		(dataLoaded || localStorage.getItem('data') == null)
	) {
		localStorage.setItem('data', JSON.stringify($serializableConspiraseas));
	}

	export let visible: boolean;
</script>

<svelte:window />

{#if visible}
	<div
		on:click={() => {
			visible = !visible;
		}}
		transition:fade
		class="fixed z-10 top-0 left-0 w-screen h-screen bg-gray-600/50"
	/>
	<div
		transition:fly={{ x: -150 }}
		class="rounded-r-lg text-center fixed z-20 top-0 left-0 bg-white min-h-screen shadow-lg p-5"
	>
		{#each $conspiraseas as conspirasea, i}
			<div class="bg-gray-100 rounded-lg shadow-lg p-4 mt-4">
				{#if conspirasea.editable}
					<input
						on:blur={() => {
							conspirasea.editable = false;
						}}
						placeholder="Name"
						bind:value={conspirasea.name}
					/>
				{:else}
					<p
						on:dblclick={() => {
							conspirasea.editable = !conspirasea.editable;
						}}
					>
						{conspirasea.name}
					</p>
				{/if}
				<div>
					<button
						class="m-2 px-4 py-2 bg-gray-300 transition-all rounded-lg hover:bg-gray-400 active:bg-gray-500"
						disabled={$currentConspirasea == conspirasea}
						on:click={() => {
							$conspiraseaIndex = i;
						}}
					>
						{#if $currentConspirasea == conspirasea}
							Loaded
						{:else}
							Load
						{/if}
					</button>
				</div>
			</div>
		{/each}
		<button
			class="active:ring ring-lime-200 transition-all m-2 mt-4 rounded-full bg-lime-300 hover:bg-lime-400 active:bg-lime-500 p-4"
			on:click={() =>
				($conspiraseas = [...$conspiraseas, { name: 'New Conspirasea', elements: [] }])}
		>
			<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"
				><path
					d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
					clip-rule="evenodd"
					fill-rule="evenodd"
				/></svg
			>
		</button>
	</div>
{/if}
