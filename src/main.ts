import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CharactersList from '@/components/CharactersList.vue'
import PlanetsList from '@/components/PlanetsList.vue'

const routes = [
  { path: '/', component: CharactersList },
  { path: '/planets/:id', component: PlanetsList, name: 'planets' },
  { path: '/planets', component: PlanetsList }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
