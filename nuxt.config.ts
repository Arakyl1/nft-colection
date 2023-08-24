import { defineNuxtConfig  } from 'nuxt/config'

export default defineNuxtConfig ({
  // nitro: {
  //   preset: 'vercel-edge',
  // },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    ['@pinia/nuxt', {
        autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
      }
    ],
    'nuxt-vitest'
  ],
  postcss: {
    plugins:{
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  runtimeConfig: {
    cloudinaryName: process.env.CLOUDINARY__NAME,
    cloudinaryApiKey: process.env.CLOUDINARY__KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY__SECRET,
    
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefrechSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    public: {
      linkPhotoUserBase: 'https://res.cloudinary.com/dmxetw6p8/image/upload/v1675156698/upload-examples/w7xbdugi7bgqt0psz3kg.webp'
    },
    redis: {
      host: '',
      port: 0,
    },
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js"
      }
    }
  },
})
