<template>
  <header>
    <ThemeToggle />
  </header>
</template>

<script lang="ts" setup>
  import ThemeToggle from "./ThemeToggle.vue";
</script>

<style scoped>
  header {
    display: flex;
    flex-flow: row wrap;
    background: gray;
    padding: 0.5rem 1rem;
    width: 100%;
  }

  button {
    margin: 0 0 0 auto;
  }
</style>