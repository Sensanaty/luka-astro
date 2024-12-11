<script lang="ts">
  import { throttle } from "radash";
  import { onDestroy, onMount } from "svelte";
  import { createScene, stopScene, cameraRotate, cameraSlide } from "@/lib/three/rudimentaryControls.ts";

  let canvas: HTMLCanvasElement;

  let width = $state(window.innerWidth - 40);
  let height = $derived(width / 3);

  let rotation = $state({ x: -0.250, y: 0, z: 0 });
  let positioning = $state({ x: 0, y: 25, z: 0 });

  $effect(() => cameraSlide(positioning.x, positioning.y, positioning.z));
  $effect(() => cameraRotate(rotation.x, rotation.y, rotation.z));

  function resetCamera() {
    rotation.x = -0.25;
    rotation.y = 0;
    rotation.z = 0;

    positioning.x = 0;
    positioning.y = 25;
    positioning.z = 0;
  }

  const handleResize = throttle({ interval: 100 }, () => {
    width = window.innerWidth - 40;
  });

  onMount(() => {
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    createScene(canvas)
  });

  onDestroy(() => {
    window.removeEventListener('resize', handleResize);
    stopScene();
  });
</script>

<div class="flex flex-col items-center my-4">
  <p class="max-w-4xl text-center mb-8">In this example I played around with generating lots of randomized geometry, with random dimensions and colors. I also wanted to take my first foray into letting the user control the camera, which I achieved with pretty unusable (but functional) sliders.</p>

  <button class="mb-4 w-fit bg-neutral-800 transition-colors duration-75 px-2 py-1.5 border hover:bg-neutral-900 active:bg-neutral-950" onclick={() => resetCamera()}>Reset camera</button>

  <div class="flex flex-col items-center w-full md:mb-4 max-w-5xl">
    <h1 class="text-xl font-black">Camera Positioning</h1>

    <div class="flex flex-row items-center w-full justify-evenly my-1 md:flex-col">
      <div class="flex flex-col items-center font-mono">
        <input class="mb-2" type="range" min="-400" max="400" bind:value={positioning.x} />
        X (Left/Right): {positioning.x}
      </div>

      <div class="flex flex-col items-center font-mono">
        <input class="mb-2" type="range" min="-50" max="50" bind:value={positioning.y} />
        Y (Down/Up): {positioning.y}
      </div>

      <div class="flex flex-col items-center font-mono">
        <input class="mb-2" type="range" min="-250" max="250" bind:value={positioning.z} />
        Z (Back/Forward): {positioning.z}
      </div>
    </div>
  </div>

  <div class="flex flex-col items-center w-full max-w-5xl">
    <h1 class="text-xl font-black">Camera Rotation</h1>

    <div class="flex flex-row items-center w-full justify-evenly my-1 md:flex-col">
      <div class="flex flex-col items-center font-mono">
        <input class="mb-2" type="range" min="{-Math.PI}" max="{Math.PI}" step="0.001" bind:value={rotation.x} />
        X (Pitch): {rotation.x.toFixed(3)}
      </div>

      <div class="flex flex-col items-center font-mono">
        <input class="mb-2" type="range" min="{-Math.PI}" max="{Math.PI}" step="0.001" bind:value={rotation.y} />
        Y (Yaw): {rotation.y.toFixed(3)}
      </div>

      <div class="flex flex-col items-center font-mono">
        <input class="mb-2" type="range" min="{-Math.PI}" max="{Math.PI}" step="0.001" bind:value={rotation.z} />
        Z (Roll): {rotation.z.toFixed(3)}
      </div>
    </div>
  </div>

  <canvas style="width: {width}px; height: {height}px;" bind:this={canvas}></canvas>
</div>
