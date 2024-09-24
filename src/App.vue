<script setup lang="ts">
import { appStrings } from '@/App.constants'
import CharactersList from '@/components/CharactersList.vue'
</script>

<template>
  <h1>{{ appStrings.title }}</h1>
  <CharactersList />
</template>

<style scoped></style>
