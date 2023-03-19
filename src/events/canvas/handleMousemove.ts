import type { IEvent } from 'fabric/fabric-impl'
import { fabric } from 'fabric'
import handlePreview from './handlePreview'
import handleAlignPointer from './handleAlignPointer'
import { useDesignStore } from '@/stores/design'
import useCursor from '@/composables/useCursor'
import useCanvas from '@/composables/useCanvas'
import design from '@/modules/DesignModule'

let previousEvent: null | IEvent<MouseEvent> = null
export default (event: IEvent<MouseEvent>) => {
  const { canvas } = useCanvas()
  const designStore = useDesignStore()
  const { removeCursor, updateCursor } = useCursor()

  design.updatePointer(event.absolutePointer)

  handleAlignPointer()
  handlePreview()

  if (event.e.ctrlKey || event.e.metaKey) {
    removeCursor()
    if (designStore.isCanvasDrag) {
      canvas.setCursor('grabbing')
      let { movementX } = event.e
      let { movementY } = event.e
      if (
        (movementX === undefined || movementY === undefined)
        && previousEvent
      ) {
        movementX = event.e.screenX - previousEvent?.e.screenX
        movementY = event.e.screenY - previousEvent?.e.screenY
      }
      const delta = new fabric.Point(movementX, movementY)
      canvas.relativePan(delta)
      previousEvent = event
    }
    else {
      canvas.setCursor('grab')
    }

    return
  }
  updateCursor()
}
