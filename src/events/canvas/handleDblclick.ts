import useCanvas from '@/hooks/useCanvas'
import { designStore } from '@/stores/design'
import type { IEvent } from 'fabric/fabric-impl'
import { nodeController } from '.'

export default (e: IEvent) => {
  const [canvas] = useCanvas()
  const object = !e.target?.id ? null : designStore.findObjectById(e.target?.id)

  if (object) {
    canvas.discardActiveObject()
    nodeController.edit(object)
  }
}
