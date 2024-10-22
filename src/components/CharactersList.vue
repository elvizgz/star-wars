<script setup lang="ts">
import { ref } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import CharacterInfo from '@/components/CharacterInfo.vue'
import type { Character } from '@/types/character'
import { apiPeopleUrl } from '@/api/paths'

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
  <div>
    <div v-if="loading">
      <p>Loading characters</p>
      <div class="loading">
        <div class="loading1"></div>
        <div class="loading2"></div>
        <div class="loading3"></div>
      </div>
    </div>
    <div v-else>
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
    </div>
  </div>
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

.error {
  color: red;
}

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
