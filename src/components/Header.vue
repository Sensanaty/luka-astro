<template>
  <header>
    <h1>luka salević<span aria-hidden="true">...</span><span v-if="!trengo" aria-hidden="true" class="i-beam">|</span></h1>
    <h1 v-if="trengo" class="slightly-smaller">at trengo</h1>
    <ThemeToggle />
  </header>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import ThemeToggle from "./ThemeToggle.vue";

  const showName = ref(true);
  const props = defineProps({
    trengo: Boolean
  });
</script>

<style scoped>
  header {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    background: var(--bg-highlight);
    padding: 0.7rem 1.5rem;
    width: 100%;
  }

  header * { font-weight: bold; }

  nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
  }

  h1.slightly-smaller { font-size: 1.1rem; margin-left: 3px; }

  span { user-select: none; cursor: default; }
  .divider { margin: 0 6px; font-size: 1.15rem; }

  button { margin: 0 0 0 auto }

  .i-beam { animation: blinker 1250ms step-start infinite }
  @keyframes blinker { 50% { opacity: 0 } }
</style>