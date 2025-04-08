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

  function onCanvasClick() {
    canvas.requestPointerLock();
  }
</script>

<div class="flex flex-col items-center my-4">
  <p class="max-w-4xl text-center mb-4">Here, I wanted to figure out how to do some proper 3D scene controls, same as you'd encounter in any classic FPS game. The camera positioning should be controllable via WASD, and the Pitch & Yaw (not so much the Roll) should be controllable with the mouse itself.</p>

  <p class="max-w-4xl text-center mb-4">It works, however the movement doesn't feel great and there's also no collision detection with the geometry or the walls. Implementing the ~300 lines of code to get even this basic example working gave me a lot of appreciation for the gamedevs out there, it's more obvious than ever how much work and talent goes into making a smooth experience.</p>

  <p class="max-w-4xl text-center mb-4">This small project forced me back into figuring out some basic mathematics that I've long since forgotten, and it felt quite cathartic to have it all come together like this! Hopefully in a future shenanigan, I'll be able to get some better feeling movement and camera controls going.</p>

  <div class="flex items-center bg-neutral-800 border p-2 w-fit mb-4 max-w-4xl">
    <span class="font-mono mr-4 rounded-full border border-amber-500 px-2 select-none" aria-hidden="true">i</span>

    <p>This doesn't work too nicely on small screens (aka touch devices, but that's difficult to detect without fingerprinting). I'll try handle touch devices in the future separately.</p>
  </div>

  <canvas style="width: {width}px; height: {height}px;" bind:this={canvas} onclick={onCanvasClick}></canvas>
</div>
