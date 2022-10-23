<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useCanvas from '@/composables/useCanvas'
import { useDesignStore } from '@/stores/design'

withDefaults(defineProps<{
  showTips: boolean
}>(), { showTips: false })

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
      opacity-30
      pointer-events-none
      text-sm
      class="left-1/2 transform -translate-1/2"
    >
      x: {{ design.pointer.x.toFixed(2) }} y:
      {{ design.pointer.y.toFixed(2) }} zoom: {{ design.zoom.toFixed(2) }}
    </div>

    <Transition name="fade">
      <pre v-show="showTips" absolute left-0 top-0 text-sm opacity-10 pointer-events-none>
  DEL: remove selected object
  ESC / Mouse Right: end or cancel draw, exit edit
  Mouse Left Double: edit selected object
  Ctrl / Command + Mouse Wheel: scale fabric
  Ctrl / Command + Mouse Left: move fabric view
      </pre>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all ease 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
