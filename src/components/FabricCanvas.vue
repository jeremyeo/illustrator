<script setup lang="ts">
import { onMounted } from 'vue'
import useCanvas from '@/hooks/useCanvas'
import { useDesignStore } from '@/stores/design'
import { storeToRefs } from 'pinia'

const design = useDesignStore()
const [, initCanvas] = useCanvas()
const { wrapperRef, canvasRef } = storeToRefs(design)
onMounted(() => {
  initCanvas()
})
</script>

<template>
  <div relative w-60vw h-full mx-auto overflow-hidden ref="wrapperRef">
    <canvas id="canvas" ref="canvasRef" border-rounded-3 />
    <div
      absolute
      bottom-0
      opacity-40
      pointer-events-none
      class="left-1/2 transform -translate-1/2"
    >
      x:{{ design.pointer.x }} y:{{ design.pointer.y }}
    </div>
  </div>
</template>
