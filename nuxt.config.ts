import { defineNuxtConfig  } from 'nuxt/config'

export default defineNuxtConfig ({
  // nitro: {
  //   preset: 'vercel-edge',
  // },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', {
        autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
      }
    ], 
  ],
})
