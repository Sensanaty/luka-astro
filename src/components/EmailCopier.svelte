<script lang="ts">
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

<div class="flex flex-row sm:flex-col items-stretch w-fit font-mono mt-4">
  <div class="flex">
    <p class="text-amber-500 text-2xl select-all bg-neutral-800 px-2 py-1 border-y-2 border-l-2">salevic@lu-ka.me</p>

    <div class="border-2 border-l-neutral-900">
      <button class="text-amber-500 h-full bg-neutral-800 hover:bg-neutral-900 px-2" onclick={copy}>copy me</button>
    </div>
  </div>

  {#if showTooltip}
    <p class="ml-3 my-auto sm:mt-2 sm:ml-0 font-black">copied!</p>
  {/if}
</div>
