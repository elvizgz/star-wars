<script setup lang="ts">
import { defineProps } from 'vue'

const { text, isLoading } = defineProps<{ text: string; isLoading: boolean }>()
</script>
<template>
  <div v-if="isLoading">
    <p>{{ text }}</p>
    <div class="loading">
      <div class="loading1"></div>
      <div class="loading2"></div>
      <div class="loading3"></div>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  gap: 5px;
  margin-top: 20px;
}

.loading > div {
  background-color: var(--color-text);
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
@keyframes loadingAnimation1 {
  0% {
    background-color: var(--color-text);
  }
  50% {
    background-color: #333;
  }
  100% {
    background-color: var(--color-text);
  }
}

@keyframes loadingAnimation2 {
  0% {
    background-color: #333;
  }
  50% {
    background-color: var(--color-text);
  }
  100% {
    background-color: #333;
  }
}

.loading .loading1 {
  animation: loadingAnimation1 2s infinite;
}
.loading .loading2 {
  animation: loadingAnimation2 2s infinite;
}
.loading .loading3 {
  animation: loadingAnimation1 2s infinite;
}
</style>
