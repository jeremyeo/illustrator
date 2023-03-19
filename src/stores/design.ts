import type { IPoint } from 'fabric/fabric-impl'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Mode } from '@/types/design'

export const useDesignStore = defineStore('design', () => {
  const wrapperRef = ref<HTMLDivElement>()
  const canvasRef = ref<HTMLCanvasElement>()
  const mode = ref<Mode>(Mode.Hand)
  const pointer = ref<IPoint>({ x: 0, y: 0 })
  const ismousedown = ref<boolean>(false)
  const isCanvasDrag = ref<boolean>(false)
  const isCtrlKey = ref<boolean>(false)
  const zoom = ref<number>(1)

  return {
    wrapperRef,
    canvasRef,
    mode,
    pointer,
    ismousedown,
    isCanvasDrag,
    isCtrlKey,
    zoom,
  }
})
