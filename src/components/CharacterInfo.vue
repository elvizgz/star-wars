<script setup lang="ts">
import { CharacterGender, type Character } from '@/types/character'
import type { Planet } from '@/types/planet'
import type { Specie } from '@/types/specie'
import { computed, ref } from 'vue'

const { character } = defineProps<{ character: Character }>()

const loadingPlanet = ref<boolean>(false)
const loadingSpecies = ref<boolean>(false)
const planet = ref<Planet | null>(null)
const species = ref<Specie[]>([])
const error = ref<string>('')

const fetchPlanet = async () => {
  loadingPlanet.value = true
  try {
    const response = await fetch(character.homeworld)
    const data = await response.json()
    planet.value = data
  } catch (e) {
    error.value = `An error occurred while fetching the planet: ${e.message}`
  } finally {
    loadingPlanet.value = false
  }
}

const fetchSpecies = async () => {
  loadingSpecies.value = true
  try {
    character.species.forEach(async (specie) => {
      const response = await fetch(specie)
      const data = await response.json()
      species.value.push(data)
    })
  } catch (e) {
    error.value = `An error occurred while fetching the species: ${e.message}`
  } finally {
    loadingSpecies.value = false
  }
}

fetchPlanet()
fetchSpecies()

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
      <li>Planet: {{ loadingPlanet ? 'Loading planet...' : planet?.name }}</li>
      <li>
        Species:
        <span v-if="loadingSpecies">Loading species...</span>
        <ul v-else-if="species.length">
          <li v-for="specie in species" :key="specie.url">
            {{ specie.name }} - {{ specie.classification }} - {{ specie.designation }}
          </li>
        </ul>
      </li>
    </ul>
    <p v-if="error" class="error">{{ error }}</p>
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
