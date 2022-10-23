<script setup lang="ts">
import FabricCanvas from './components/FabricCanvas.vue'
import useDarkMode from './composables/useDarkMode'
import FabricDrawTool from './components/FabricDrawTool.vue'

const [, toggleDark] = useDarkMode()
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
    <header flex justify-center flex-shrink-0 py-8 text-4xl>
      Illustrator
    </header>

    <main w-full m-auto grow box-border relative overflow-hidden>
      <FabricCanvas />
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
