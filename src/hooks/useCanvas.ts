import '@/utils/initFabricPrototype'
import { fabric } from 'fabric'
import type { Canvas } from 'fabric/fabric-impl'
import { useDesignStore } from '../stores/design'

import { addWindowEvent } from '@/events/window'
import { addFabricCanvasEvent } from '@/events/canvas'
import handleDarkModeChange from '@/events/canvas/handleDarkModeChange'

let canvas: null | Canvas = null

// 切换 Fabric Canvas 可否区域选择
export const toggleSelection = (selection?: boolean) => {
  if (!canvas) return
  canvas.selection = selection !== undefined ? selection : !canvas.selection
}

// 初始化 Fabric Canvas
const initCanvas = () => {
  const design = useDesignStore()
  canvas = new fabric.Canvas(design.canvasRef, {
    width: design.getWidth(),
    height: design.getHeight(),
    preserveObjectStacking: true,
  })
  // 触发右键事件
  canvas.fireRightClick = true
  // 禁用右键菜单
  canvas.stopContextMenu = true
  // 监听黑暗模式变化，改变 Canvas 背景色与各物件的颜色
  handleDarkModeChange()

  // 添加 Canvas 上的处理事件
  addFabricCanvasEvent()
  // 添加 Window 对象上的处理事件
  addWindowEvent()
}

type TUseCanvas = [Canvas, typeof initCanvas]
export default (): TUseCanvas => [canvas as Canvas, initCanvas]
