import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build:{
    outDir: process.env.NODE_ENV === 'production' ? '/var/www' : 'dist',
    emptyOutDir: true
  },
  server: {
    allowedHosts: true,
    port: 3000,
    // hmr: {
    //   protocol: 'http',
    //   host: 'localhost',
    //   // port: 3000,
    // },
  },

})
