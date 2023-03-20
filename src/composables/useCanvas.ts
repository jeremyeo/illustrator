import '@/utils/initFabricPrototype'
import type { Canvas } from 'fabric/fabric-impl'
import { computed, onMounted } from 'vue'
import { useDesignStore } from '../stores/design'
import useCursor from './useCursor'
import initCanvas from '@/utils/initCanvas'
import { Mode } from '@/types/design'
import design from '@/modules/DesignModule'

let canvas: Canvas

export default () => {
  const designStore = useDesignStore()
  if (!canvas) {
    onMounted(() => {
      initCanvas(designStore, (instance) => {
        canvas = instance
      })
    })
  }

  const ready = computed(() => canvas !== undefined)

  const changeMode = (mode?: Mode) => {
    if (mode === designStore.mode || !ready.value) return
    if (mode) designStore.mode = mode
    const { removeCursor } = useCursor()
    design.resetTempSvgPath()
    switch (designStore.mode) {
      case Mode.Hand:
        design.toggleSelection(true)
        design.toggleDisabledEvent(false)
        removeCursor()
        canvas.defaultCursor = 'default'
        break
      case Mode.Line:
      case Mode.Curve:
      case Mode.Detect:
        design.toggleSelection(false)
        design.toggleDisabledEvent(true)
        canvas.defaultCursor = 'none'
        break
    }
  }

  return {
    canvas,
    changeMode,
    ready,
  }
}
