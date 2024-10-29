<script setup lang="ts">
import { appStrings } from '@/App.constants'
import Menu from '@/components/Menu.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <h1>{{ appStrings.title }}</h1>
  <Menu />
  <RouterView />
</template>

<style scoped></style>
