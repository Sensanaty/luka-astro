<script lang="ts">
  import { fade } from 'svelte/transition';

  let showTooltip = $state(false);

  function toggleTooltip() {
    if (showTooltip) return;

    showTooltip = true;

    setTimeout(() => showTooltip = false, 1000);
  }

  async function copy() {
    const text = "salevic@lu-ka.me";

    try {
      await navigator.clipboard.writeText(text);

      toggleTooltip();

      return Promise.resolve(true);
    } catch (err) {
      console.error(err);

      return Promise.reject(false);
    }
  }
</script>

<button
    class="relative mt-2 text-xl font-bold border-2 w-fit mx-auto px-2 py-1 text-amber-500 hover:bg-neutral-900"
    onclick={() => copy()}
    aria-label="Copy email address salevic@lu-ka.me to clipboard"
>
  salevic@lu-ka.me

  {#if showTooltip}
    <span
      class="tooltip absolute bg-neutral-700 font-bold p-2 left-1/2 -translate-x-1/2 top-12 select-none pointer-events-none"
      transition:fade={{ duration: 50 }}
    >
      copied!
    </span>
  {/if}
</button>

<div
  role="status"
  class="sr-only"
  aria-live="polite"
>
  {#if showTooltip}
    Email address copied to clipboard
  {/if}
</div>

<style lang="postcss">
  .tooltip::before {
    @apply absolute left-1/2 -translate-x-1/2 bottom-11 block border-transparent border-b-neutral-700;
    content: '';
    border-width: 0 0.5rem 0.5rem 0.5rem;
  }
</style>
