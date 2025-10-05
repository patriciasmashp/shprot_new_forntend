import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import mkcert from 'vite-plugin-mkcert'


let plugins = [vue(), vueDevTools()]
process.env.NODE_ENV === 'development' ? plugins.push(mkcert()) : {}
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ...plugins
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: process.env.NODE_ENV === 'production' ? '/var/www' : 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    allowedHosts: true,
    port: 3000,
    host: "127.0.0.1",
    cors: true
  },

})
