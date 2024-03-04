<template>
  <div class="relative mx-auto flex w-fit flex-row items-center text-xl font-black text-accent">
    <p class="border-r-2 border-bg bg-highlight px-3 py-4">salevic@lu-ka.me</p>

    <button class="bg-highlight px-3 py-4 transition-colors hover:bg-zinc-700 active:bg-zinc-600" @click.prevent="copy">
      copy me
    </button>

    <p v-if="showCopyText" class="absolute -right-20 select-none text-base sm:-bottom-8 sm:right-5" aria-hidden="true">
      copied!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showCopyText = ref(false);

async function copyText(): Promise<boolean> {
  const text = "salevic@lu-ka.me";

  try {
    await navigator.clipboard.writeText(text);

    return Promise.resolve(true);
  } catch (err) {
    console.error(err);

    return Promise.reject(false);
  }
}

const copy = async () => {
  copyText().then(() => {
    showCopyText.value = true;

    setTimeout(() => {
      showCopyText.value = false;
    }, 600);
  });
};
</script>
