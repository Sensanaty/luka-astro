<template>
  <header>
    <h1>luka salević<span aria-hidden="true">...</span><span aria-hidden="true" class="i-beam">|</span></h1>

    <nav>
      <a href="/about">about</a>
      <span class="divider" aria-hidden="true">&middot;</span>
      <a href="/contact">contact</a>
      <span class="divider" aria-hidden="true">&middot;</span>
      <a href="/work">work</a>
    </nav>

    <ThemeToggle />
  </header>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import ThemeToggle from "./ThemeToggle.vue";

  const showName = ref(true);
</script>

<style scoped>
  header {
    display: grid;
    grid-template: 1fr / 1fr 1fr 1fr;
    flex-flow: row wrap;
    align-items: center;
    background: var(--bg-highlight);
    padding: 0.7rem 1.5rem;
    width: 100%;
  }

  header * { font-family: "JetBrains Mono NL"; font-weight: bold; }

  nav {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
  }

  nav a {
    color: var(--cl);
    text-decoration: solid underline var(--accent) 2px;
  }

  nav a:hover {
    color: var(--accent);
    text-decoration: solid underline var(--cl) 2px;
  }

  h1 {
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
  }

  span { user-select: none; cursor: default; }
  .divider { margin: 0 6px; font-size: 1.15rem; }

  button { margin: 0 0 0 auto }

  .i-beam { animation: blinker 1250ms step-start infinite }
  @keyframes blinker { 50% { opacity: 0 } }
</style>