export enum CharacterGender {
  Male = 'male',
  Female = 'female'
}

export interface Character {
  name: string
  birth_year: string
  gender: CharacterGender
  height: string
  mass: string
  url: string
  homeworld: string
  species: string[]
}
