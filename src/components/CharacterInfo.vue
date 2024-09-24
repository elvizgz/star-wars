<script setup lang="ts">
import type { Character } from '@types/character'

const { character } = defineProps<{ character: Character }>()
</script>

<template>
  <div>
    <h2>{{ character.id }} - {{ character.name }}</h2>
    <p>Extra info from the character</p>
    <ul>
        <li>Age: {{ character.age }}</li>
    </ul>
  </div>
</template>
