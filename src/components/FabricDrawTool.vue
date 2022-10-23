<script setup lang="ts">
import { useDesignStore } from '../stores/design'
const design = useDesignStore()
</script>

<template>
  <div
    p-6
    flex
    flex-col
    justify-center
    gap-10
    absolute
    bg-overlay
    border-rounded-3
    class="top-0 left-1/2 translate-x-30vw"
    style="transform: translateX(calc((100% + 30vw + 20px) * -1))"
  >
    <div text-2xl>
      Tools
    </div>
    <div
      v-for="mode in design.modeList"
      :key="mode"
      :class="{ 'text-blue-500': design.mode === mode }"
      text-center
      hover:text-blue-500
      cursor-pointer
      hover:transition-200
      @click="design.handleChangeMode(mode)"
    >
      {{ mode }}
    </div>
  </div>
</template>
