<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import type { Planet } from '@/types/planet'
import { ref, onMounted, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const planets = ref<Planet[]>([])
const planet = ref<Planet | null>(null)
const loading = ref<boolean>(false)
const loadingPlanet = ref<boolean>(false)
const error = ref<string>('')

const fetchPlanets = async () => {
  loading.value = true
  try {
    const response = await fetch('https://swapi.dev/api/planets/')
    const data = await response.json()
    planets.value = data.results
  } catch (e) {
    error.value = `An error occurred while fetching the planet: ${e.message}`
  } finally {
    loading.value = false
  }
}

const fetchPlanet = async (planetUrl: string) => {
  loadingPlanet.value = true
  try {
    const response = await fetch(planetUrl)
    const data = await response.json()
    planet.value = data
  } catch (e) {
    error.value = `An error occurred while fetching the planets: ${e.message}`
  } finally {
    loadingPlanet.value = false
  }
}
onMounted(() => fetchPlanets())

onBeforeRouteUpdate(async (to) => {
  await fetchPlanet(to.params.id as string)
})

const formattedPopulation = computed(() => {
  if (!planet.value || planet.value.population === 'unknown') {
    return 'Unknown'
  }
  return new Intl.NumberFormat('es-ES', {}).format(parseInt(planet.value.population))
})

const formattedDiameter = computed(() => {
  return planet.value
    ? new Intl.NumberFormat('es-ES', { style: 'unit', unit: 'kilometer' }).format(
        parseInt(planet.value.diameter)
      )
    : ''
})
</script>

<template>
  <h1>Planets List</h1>
  <Loading :isLoading="loading" text="Loading planets">
    <div class="container">
      <p v-if="error" class="error">{{ error }}</p>
      <div>
        <ul>
          <li v-for="item in planets" :key="item.url">
            <RouterLink :to="{ name: 'planets', params: { id: item.url } }">{{
              item.name
            }}</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <Loading :isLoading="loadingPlanet" text="Loading planet">
          <div v-if="planet">
            <h2>{{ planet.name }}</h2>
            <ul>
              <li>Diameter: {{ formattedDiameter }}</li>
              <li>Population: {{ formattedPopulation }}</li>
              <li>
                Residents:
                <ul>
                  <li v-for="resident in planet.residents" :key="resident">
                    {{ resident }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Loading>
      </div>
    </div>
  </Loading>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
