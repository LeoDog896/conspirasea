<script lang="ts">
  import { fly } from "svelte/transition"
  import { elementsAsSerializableElements, elements } from "$lib/elements"

  let topBarVisible = true
</script>
{#if topBarVisible}
  <div transition:fly={{ y: -150 }} class="fixed top-0 left-0 w-screen p-4 bg-white shadow-lg">
    <button class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400">Conspiraseas</button>
    <button class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400" on:click={() => alert(JSON.stringify(elementsAsSerializableElements($elements)))}>Save</button>
    <button class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400">Load</button>
  </div>
{/if}
<button class="fixed top-0 right-0 m-4 px-4 py-2 rounded-lg mx-2 bg-cyan-200" on:click={() => topBarVisible = !topBarVisible }>
  {topBarVisible ? "Hide" : "Show"}
</button>