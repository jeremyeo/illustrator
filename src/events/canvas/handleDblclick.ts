import type { IEvent } from 'fabric/fabric-impl'
import { nodeController } from '.'
import useCanvas from '@/composables/useCanvas'
import { designStore } from '@/stores/design'

export default (e: IEvent) => {
  const [canvas] = useCanvas()
  const object = !e.target?.id ? null : designStore.findObjectById(e.target?.id)

  if (object) {
    canvas.discardActiveObject()
    nodeController.edit(object)
  }
}
