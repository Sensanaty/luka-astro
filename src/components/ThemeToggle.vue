<template>
  <button @click.prevent="toggleTheme()">Switch Theme</button>
</template>

<script lang="ts" setup>
  const toggleTheme = () => { 
    document.documentElement.classList.toggle("light");

    if (document.documentElement.classList.contains("light")) {
      window.localStorage.setItem("theme", "light");
    } else { 
      window.localStorage.setItem("theme", "dark")
    }
  }
</script>