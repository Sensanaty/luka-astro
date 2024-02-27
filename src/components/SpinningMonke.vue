<template>
  <div class="flex flex-row items-center">
    <button @keydown.enter="toggleAnimation" @focus="shouldShowTooltip = true" @blur="shouldShowTooltip = false">
      <img
        ref="monkey"
        @mouseenter="shouldShowTooltip = true"
        @mouseleave="shouldShowTooltip = false"
        width="192"
        height="192"
        class="h-6 w-auto"
        @click.prevent="toggleAnimation"
        src="/favicon/android-chrome-192x192.png"
        alt="A pixelated cartoon monkey face (Luka's avatar on many social media sites)"
      />
    </button>

    <Transition mode="out-in">
      <p class="ml-3 text-sm font-black text-accent" v-if="shouldShowTooltip">
        Click me to
        <span v-if="shouldAnimate">disable</span>
        <span v-else>enable</span>
        the animation!
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const shouldShowTooltip = ref(false);
const monkey = ref<HTMLInputElement | null>(null);

const shouldAnimate = ref(false);

onMounted(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (localStorage.getItem("noAnimate") || prefersReducedMotion.matches) {
    monkey.value?.classList.remove("animate");
    shouldAnimate.value = false;
  } else {
    monkey.value?.classList.add("animate");
    shouldAnimate.value = true;
  }
});

const toggleAnimation = () => {
  monkey.value?.classList.toggle("animate");
  shouldAnimate.value = !shouldAnimate.value;
  shouldAnimate ? localStorage.removeItem("noAnimate") : localStorage.setItem("noAnimate", "true");
};
</script>

<style>
.animate {
  animation: sway 1000ms linear infinite;
}

@keyframes sway {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(53deg);
  }
  50% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-39deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
