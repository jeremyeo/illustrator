import handleMouseup from '@/events/canvas/handleMouseup'
import handleMousemove from '@/events/canvas/handleMousemove'
import handleMousedown from '@/events/canvas/handleMousedown'
import handleSelection from '@/events/canvas/handleSelection'
import useCanvas from '@/hooks/useCanvas'
import handleDblclick from './handleDblclick'
import NodeController from '@/controller/NodeController'
import handleObjectModified from './handleObjectModified'
import handleSelectionCleared from './handleSelectionCleared'

export const nodeController = new NodeController()

export const addFabricCanvasEvent = () => {
  const [canvas] = useCanvas()
  canvas.on('object:modified', handleObjectModified)
  canvas.on('mouse:down', handleMousedown)
  canvas.on('mouse:move', handleMousemove)
  canvas.on('mouse:up', handleMouseup)
  canvas.on('selection:updated', handleSelection)
  canvas.on('selection:created', handleSelection)
  canvas.on('selection:cleared', handleSelectionCleared)
  canvas.on('mouse:dblclick', handleDblclick)
}
