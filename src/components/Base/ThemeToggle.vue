<template>
  <button
    class="w-fit font-black underline decoration-accent decoration-3 hover:text-accent hover:decoration-cl"
    @click.prevent="toggleTheme"
  >
    {{ theme }}
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const theme = ref<"dark" | "light">("dark");

onMounted(() => (theme.value = document.documentElement.classList.contains("light") ? "light" : "dark"));

const toggleTheme = () => {
  const rootElement = document.documentElement;
  rootElement.classList.toggle("light");

  if (rootElement.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    theme.value = "light";
  } else {
    localStorage.setItem("theme", "dark");
    theme.value = "dark";
  }
};
</script>
