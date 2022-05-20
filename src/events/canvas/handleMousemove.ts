import handlePreview from './handlePreview'
import type { IEvent } from 'fabric/fabric-impl'
import { useDesignStore } from '@/stores/design'
import { handleDrawCursor } from '@/hooks/useCursor'
import handleAlignPointer from './handleAlignPointer'
import useCanvas from '@/hooks/useCanvas'
import useCursor from '@/hooks/useCursor'
import { fabric } from 'fabric'

let previousEvent: null | IEvent<MouseEvent> = null
export default (event: IEvent<MouseEvent>) => {
  const design = useDesignStore()
  const [canvas] = useCanvas()
  design.setPointer(event.absolutePointer)
  handleAlignPointer()
  handlePreview()
  if (event.e.ctrlKey) {
    const [, removeCursor] = useCursor()
    removeCursor()
    if (design.isCanvasDrag) {
      canvas.setCursor('grabbing')
      let { movementX } = event.e
      let { movementY } = event.e
      if (
        (movementX === undefined || movementY === undefined) &&
        previousEvent
      ) {
        movementX = event.e.screenX - previousEvent?.e.screenX
        movementY = event.e.screenY - previousEvent?.e.screenY
      }
      const delta = new fabric.Point(movementX, movementY)
      canvas.relativePan(delta)
      previousEvent = event
    } else {
      canvas.setCursor('grab')
    }

    return
  }
  handleDrawCursor()
}
