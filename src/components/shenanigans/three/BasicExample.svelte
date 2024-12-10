<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { createScene, stopScene } from "@/lib/three/basic.ts";
  import { throttle } from "radash";

  let canvas: HTMLCanvasElement;
  let width = $state(600);
  let height = $state(300);

  const handleResize = throttle({ interval: 150 }, () => {
    width = Math.min(600, window.innerWidth - 40);
    height = width / 2;
  });

  onMount(() => {
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    createScene(canvas);
  });

  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
    stopScene();
  });
</script>

<div class="flex flex-col items-center mt-4">
  <p class="max-w-4xl text-center">A very simple example, basically just a POC to get me started. I more or less pulled this straight from the docs with a small spin in making it a torus rather than the default cube, wireframing and a transparent background color.</p>

  <canvas style="width: {width}px; height: {height}px;"  bind:this={canvas}></canvas>
</div>
