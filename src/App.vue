<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import FabricCanvas from './components/FabricCanvas.vue'
import useDarkMode from './composables/useDarkMode'
import FabricDrawTool from './components/FabricDrawTool.vue'

const [, toggleDark] = useDarkMode()
const [showTips, toggleShowTips] = useToggle(false)
</script>

<template>
  <div
    flex
    flex-col
    bg-base
    transition-400
    w-100vw
    h-100vh
    overflow-hidden
    dark:c-white
    font-mono
  >
    <header
      flex justify-center flex-shrink-0
      py-8 text-4xl
      cursor-default
    >
      <div relative pr-2>
        Illustrator

        <div
          select-none absolute top-0 right-0
          translate-x-full p-3px rd-sm
          class="bg-red/60" text-sm
          @mouseenter="toggleShowTips()"
          @mouseleave="toggleShowTips()"
        >
          help
        </div>
      </div>
    </header>

    <main w-full m-auto grow box-border relative overflow-hidden>
      <FabricCanvas :show-tips="showTips" />
      <FabricDrawTool />
    </main>

    <footer m2 flex justify-center text-2xl gap-4 flex-shrink-0 py-5>
      <a
        op30
        hover="op80"
        href="https://github.com/jremye/illustrator"
        target="_blank"
      >
        <button
          i-carbon-logo-github
          c-inherit
          text-inherit
          cursor-pointer
        />
      </a>
      <button
        op30
        hover="op80"
        c-inherit
        cursor-pointer
        i-carbon-sun
        dark:i-carbon-moon
        @click="toggleDark()"
      />
    </footer>
  </div>
</template>
