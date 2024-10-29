<script setup lang="ts">
import { ref } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import CharacterInfo from '@/components/CharacterInfo.vue'
import type { Character } from '@/types/character'
import { apiPeopleUrl } from '@/api/paths'
import Loading from '@/components/Loading.vue'

const characters = ref<Character[]>([])
const loading = ref<boolean>(false)
const error = ref<string>('')
const selectedCharacter = ref<Character | null>(null)
const teamMembers = ref<Character[]>([])


const fetchCharacters = async () => {
  loading.value = true

  try {
    const response = await fetch(apiPeopleUrl)
    const data = await response.json()
    characters.value = data.results
  } catch (e) {
    error.value = `An error occurred while fetching the characters: ${e.message}`
  } finally {
    loading.value = false
  }
}

fetchCharacters()

const showInfo = (character: Character | null) => {
  selectedCharacter.value = character
}

const addToTeam = (character: Character) => {
  const isChecked = teamMembers.value.some((member) => member.url === character.url)
  if (!isChecked) {
    teamMembers.value.push(character)
    return
  }
  teamMembers.value = teamMembers.value.filter((member) => member.url !== character.url)
}
</script>

<template>
  <Loading :isLoading="loading" text="Loading characters">
    <div class="container">
      <div>
        <p v-if="error" class="error">{{ error }}</p>
        <div v-else>
          <p v-if="characters.length === 0">No characters available</p>
          <div v-else>
            <div v-for="character in characters" :key="character.url" class="character-list">
              <input
                type="checkbox"
                :checked="teamMembers.some((member) => member.url === character.url)"
                @change="(event) => addToTeam(character)"
              />
              <CharacterCard
                :character="character"
                @mouseover="showInfo(character)"
                @mouseleave="showInfo(null)"
                @click="addToTeam(character)"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <CharacterInfo
          v-if="selectedCharacter"
          :character="selectedCharacter"
          class="character-info"
        />
      </div>
      <div>
        <p>Your team</p>
        <CharacterCard
          v-for="character in teamMembers"
          :key="character.id"
          :character="character"
          @mouseover="showInfo(character)"
          @mouseleave="showInfo(null)"
        />
      </div>
    </div>
  </Loading>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.character-list {
  display: flex;
  justify-content: left;
  gap: 10px;
}
</style>
