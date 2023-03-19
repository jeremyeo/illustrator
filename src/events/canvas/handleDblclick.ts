import type { IEvent } from 'fabric/fabric-impl'
import nodeController from '@/controller/NodeController'
import useCanvas from '@/composables/useCanvas'
import design from '@/modules/DesignModule'

export default (e: IEvent) => {
  const { canvas } = useCanvas()
  const object = !e.target?.id ? null : design.findObjectById(e.target?.id)

  if (object) {
    canvas.discardActiveObject()
    nodeController.edit(object)
  }
}
