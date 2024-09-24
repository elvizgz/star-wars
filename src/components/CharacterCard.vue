<script setup lang="ts">
import type { Character } from '@/types/character'

const { character } = defineProps<{ character: Character }>()

const selectCharacter = () => {
  // this.$emit('click', character)
}
</script>
<template>
  <div @click="selectCharacter">
    <h2>{{ character.id }} - {{ character.name }}</h2>
    <p></p>
  </div>
</template>
<style scoped></style>
