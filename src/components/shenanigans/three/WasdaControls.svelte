<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { throttle } from "radash";
  import {createScene, stopScene} from "@/lib/three/wasdaControls.ts";

  let canvas: HTMLCanvasElement;

  let width = $state(window.innerWidth - 40);
  let height = $derived(width / 3);

  const handleResize = throttle({ interval: 100 }, () => {
    width = window.innerWidth - 40;
  });

  onMount(() => {
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    createScene(canvas);
  });

  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
    stopScene()
  });
</script>

<div class="flex flex-col items-center my-4">
  <p class="max-w-4xl text-center mb-4">Here, I wanted to figure out how to do some proper 3D scene controls, same as you'd encounter in any classic FPS game. The camera positioning should be controllable via WASD, and the Pitch & Yaw (not so much the Roll) should be controllable with the mouse itself.</p>

  <div class="flex items-center bg-neutral-800 border p-2 w-fit mb-4 max-w-4xl">
    <span class="font-mono mr-4 rounded-full border border-amber-500 px-2 select-none" aria-hidden="true">i</span>

    <p>This doesn't work too nicely on small screens (mainly touch devices, but that's difficult to detect without fingerprinting). I'll try handle touch devices in the future separately.</p>
  </div>

  <canvas style="width: {width}px; height: {height}px;" bind:this={canvas}></canvas>
</div>
