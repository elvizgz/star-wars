<script setup lang="ts">
import { CharacterGender, type Character } from '@/types/character'
import { computed } from 'vue'

const { character } = defineProps<{ character: Character }>()
const isFemale = computed(() => character.gender === CharacterGender.Female)
</script>

<template>
  <div
    :class="{
      'card-info': true,
      'male-card': !isFemale,
      'female-card': isFemale
    }"
  >
    <h2>{{ character.name }}</h2>
    <ul>
      <li>Gender: {{ character.gender }}</li>
      <li>Birth: {{ character.birth_year }}</li>
      <li>Height: {{ character.height }}</li>
      <li>Mass: {{ character.mass }}</li>
    </ul>
  </div>
</template>

<style scoped>
.card-info {
  padding: 20px;
  border-radius: 12px;
  border-radius: 1px solid #ccc;
  color: #181818;
}
.male-card {
  background-color: #acedf5;
}
.female-card {
  background-color: #fab4e7;
}
</style>
