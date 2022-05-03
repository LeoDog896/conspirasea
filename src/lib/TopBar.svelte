<script lang="ts">
  import { fly } from "svelte/transition"
  import { elementsAsSerializableElements, elements } from "$lib/elements"
  import ConspiraseaList from "./ConspiraseaList.svelte"

  let topBarVisible = true
  let listVisible = false
</script>
{#if topBarVisible}
  <div transition:fly={{ y: -150 }} class="fixed top-0 left-0 w-screen p-4 bg-white shadow-lg rounded-b-lg">
    <button class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400 active:ring ring-cyan-100" on:click={() => { listVisible = !listVisible }}>Conspiraseas</button>
    <button class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400 active:ring ring-cyan-100" on:click={() => alert(JSON.stringify(elementsAsSerializableElements($elements)))}>Download</button>
    <button class="bg-cyan-200 px-4 py-2 rounded-lg mx-2 hover:bg-cyan-300 transition-all active:bg-cyan-400 active:ring ring-cyan-100">Load</button>
  </div>
{/if}
<ConspiraseaList visible={listVisible}/>
<button class="fixed top-0 right-0 m-4 px-4 py-2 rounded-lg mx-2 bg-cyan-200" on:click={() => topBarVisible = !topBarVisible }>
  {topBarVisible ? "Hide" : "Show"}
</button>