import { fabric } from 'fabric'
import type { useDesignStore } from '@/stores/design'
import handleDarkModeChange from '@/events/canvas/handleDarkModeChange'
import { addFabricCanvasEvent } from '@/events/canvas'
import { addWindowEvent } from '@/events/window'

export default function initCanvas(
  designStore: ReturnType<typeof useDesignStore>,
  setCanvas: (canvas: fabric.Canvas) => void,
) {
  const canvas = new fabric.Canvas(designStore.canvasRef!, {
    width: designStore.wrapperRef!.offsetWidth,
    height: designStore.wrapperRef!.offsetHeight,
    preserveObjectStacking: true,
  })
  // 触发右键事件
  canvas.fireRightClick = true
  // 禁用右键菜单
  canvas.stopContextMenu = true

  setCanvas(canvas)

  // 监听黑暗模式变化，改变 Canvas 背景色与各物件的颜色
  handleDarkModeChange()

  // 添加 Canvas 上的处理事件
  addFabricCanvasEvent()
  // 添加 Window 对象上的处理事件
  addWindowEvent()

  return canvas
}
