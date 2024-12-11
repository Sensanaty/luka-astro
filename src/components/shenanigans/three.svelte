<script lang="ts">
  type Examples = {
    basic: boolean;
    rudimentaryControls: boolean;
  }

  let loadedExamples = $state<Examples>({
    basic: false,
    rudimentaryControls: false,
  });

  let shownExamples = $state<Examples>({
    basic: false,
    rudimentaryControls: false,
  });

  const toggleExample = (item: keyof Examples) => {
    loadedExamples[item] = true;
    shownExamples[item] = !shownExamples[item];
  };
</script>

<div class="mt-4">
  <div class="flex items-center bg-neutral-800 border p-2 w-fit">
    <span class="font-mono mr-4 rounded-full border border-amber-500 px-2 select-none" aria-hidden="true">i</span>

    <p>All examples below are loaded asynchronously to save on bandwith & decrease load times, so just click on the button to load the relevant example</p>
  </div>

  <div class="w-full h-1 bg-amber-500 mt-4 mb-2" aria-hidden="true"></div>

  <div class="flex flex-col justify-center items-center">
    <button class={ shownExamples.basic ? 'text-amber-500' : ''  } onclick={() => toggleExample('basic')}>Basic Example</button>

    {#if loadedExamples.basic && shownExamples.basic}
      {#await import("@/components/shenanigans/three/BasicExample.svelte")}
        <img src="/favicon.png" height="40" width="40" class="animate-spin mt-4" alt="Loading Spinner">
      {:then { default: Component }}
        <Component />
      {/await}
    {/if}

    <button class={ shownExamples.rudimentaryControls ? 'text-amber-500' : '' } onclick={() => toggleExample('rudimentaryControls')}>Rudimentary Controls</button>

    {#if loadedExamples.rudimentaryControls && shownExamples.rudimentaryControls}
      {#await import("@/components/shenanigans/three/RudimentaryControls.svelte")}
        <img src="/favicon.png" height="40" width="40" class="animate-spin mt-4" alt="Loading Spinner">
      {:then { default: Component }}
        <Component />
      {/await}
    {/if}
  </div>
</div>

<style lang="postcss">
  button {
    @apply w-fit bg-neutral-800 transition-colors duration-75 px-2 py-1.5 border mt-6 first-of-type:mt-0 hover:bg-neutral-900 active:bg-neutral-950;
  }
</style>
