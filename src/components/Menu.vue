<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>
<template>
  <div class="menu">
    <RouterLink to="/">Characters</RouterLink>
    <RouterLink to="/planets">Planets</RouterLink>
  </div>
</template>
<style scoped>
.menu {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

a {
  color: var(--color-text);
}
</style>
