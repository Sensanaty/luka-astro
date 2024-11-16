<script lang="ts">
  import {onMount} from "svelte";

  let monkey: HTMLElement;

  let shouldAnimate = $state(false);
  let showTooltip = $state(false);

  onMount(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (localStorage.getItem("noAnimate") || prefersReduce.matches) {
      monkey.classList.remove("animate");
      shouldAnimate = false;
    } else {
      monkey.classList.add("animate");
      shouldAnimate = true;
    }
  })

  function toggleAnimate() {
    monkey.classList.toggle("animate");
    shouldAnimate = !shouldAnimate;
    shouldAnimate ? localStorage.removeItem("noAnimate") : localStorage.setItem("noAnimate", "true");
  }
</script>

<button
  onclick={toggleAnimate}
  onfocus={() => showTooltip = true}
  onblur={() => showTooltip = false}
  onmouseenter={() => showTooltip = true}
  onmouseleave={() => showTooltip = false}
  aria-label="Click to toggle the dancing animation of the monkey."
>
  <img bind:this={monkey} class="h-6 animate" src="/favicon.png" alt="A pixelated cartoon monkey face. Luka uses it as his avatar.">
</button>

{#if showTooltip}
  <span class="left-0 text-amber-500 font-bold text-sm md:!text-xs ml-2.5" aria-hidden="true">click me to { shouldAnimate ? 'disable' : 'enable' } the dance</span>
{/if}

<style>
  .animate {
    animation: sway 900ms linear infinite;
  }

  @keyframes sway {
    0% { transform: rotate(9deg) }
    20% { transform: rotate(49deg) }
    45% { transform: rotate(-10deg) }
    65% { transform: rotate(35deg) }
    85% { transform: rotate(-21deg) }
    100% { transform: rotate(5deg) }
  }
</style>
