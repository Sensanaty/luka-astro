<template>
  <button 
    @click.prevent="toggleTheme()" 
    :aria-label="'Toggle between dark & light themes. Currently using the ' + theme + ' theme'"
  >
    {{theme}}
  </button>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  const theme = ref();

  onMounted(() => {
    theme.value = document.documentElement.classList.contains("light") ? "light" : "dark";
  })

  const toggleTheme = () => { 
    document.documentElement.classList.toggle("light");

    if (document.documentElement.classList.contains("light")) {
      window.localStorage.setItem("theme", "light");
      theme.value = "light";
    } else { 
      window.localStorage.setItem("theme", "dark");
      theme.value = "dark";
    }
  }
</script>

<style scoped>
  button {
    background: var(--bg-accent);
    color: var(--cl);
    text-decoration: solid underline var(--accent) 2px;
  }

  button:hover {
    color: var(--accent);
    text-decoration-color: var(--cl)
  }
</style>