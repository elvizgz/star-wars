<script setup lang="ts">
import type { Character } from '@/types/character'

const { character } = defineProps<{ character: Character }>()
</script>
<template>
  <div class="card">
    <p class="character-name">{{ character.name }}</p>
    <p>Height: {{ character.height }}cm - Mass: {{ character.mass }}kg</p>
  </div>
</template>
<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
}
.card:hover {
  background-color: #6d6b6b;
}
.character-name {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
