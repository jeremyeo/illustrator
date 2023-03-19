import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), unocss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'fabric': fileURLToPath(new URL('./node_modules/fabric', import.meta.url)),
      'fabric/fabric-impl': fileURLToPath(new URL('./node_modules/fabric', import.meta.url)),
    },
  },
})
