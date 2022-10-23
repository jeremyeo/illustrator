<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useCanvas from '@/composables/useCanvas'
import { useDesignStore } from '@/stores/design'

const design = useDesignStore()
const [, initCanvas] = useCanvas()
const { wrapperRef, canvasRef } = storeToRefs(design)
onMounted(() => {
  initCanvas()
})
</script>

<template>
  <div ref="wrapperRef" relative w-60vw h-full mx-auto overflow-hidden>
    <canvas id="canvas" ref="canvasRef" border-rounded-3 />
    <div
      absolute
      bottom-0
      opacity-40
      pointer-events-none
      class="left-1/2 transform -translate-1/2"
    >
      x: {{ design.pointer.x.toFixed(2) }} y:
      {{ design.pointer.y.toFixed(2) }} zoom: {{ design.zoom.toFixed(2) }}
    </div>
  </div>
</template>
