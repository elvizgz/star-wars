<script setup lang="ts">
import { ref } from 'vue'
import CharacterCard from '@/components/CharacterCard.vue'
import CharacterInfo from '@/components/CharacterInfo.vue'
import type { Character } from '@/types/character'

const characters = ref<Character[]>([
  { id: '1', name: 'Yoda', age: 900 },
  { id: '2', name: 'Luke Skywalker', age: 25 }
])
const selectedCharacter = ref<Character>()
const teamMembers = ref<Character[]>([])

const showInfo = (character: Character) => {
  selectedCharacter.value = character
}

const addToTeam = (isChecked: boolean, character: Character) => {
  if (!isChecked) {
    teamMembers.value = teamMembers.value.filter((member) => member.id !== character.id)
    return
  }
  teamMembers.value.push(character)
}
</script>

<template>
  <p>Click on a character to see more information</p>
  <div class="container">
    <div>
      <p v-if="characters.length === 0">No characters available</p>
      <div v-else>
        <div v-for="character in characters" :key="character.id" class="character-line">
          <input type="checkbox" @change="(event) => addToTeam(event.target?.checked, character)" />
          <CharacterCard :character="character" @click="showInfo(character)" />
        </div>
      </div>
    </div>
    <div>
      <p v-if="selectedCharacter">You have selected the following characters:</p>
      <CharacterInfo v-if="selectedCharacter" :character="selectedCharacter" />
    </div>
  </div>
  <div>
    <p>Your team</p>
    <CharacterCard v-for="character in teamMembers" :key="character.id" :character="character" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}

.character-line {
  display: flex;
  justify-content: left;
  gap: 10px;
}
</style>
