import type { IEvent } from 'fabric/fabric-impl'
import { fabric } from 'fabric'
import handlePreview from './handlePreview'
import handleAlignPointer from './handleAlignPointer'
import { useDesignStore } from '@/stores/design'
import useCursor from '@/composables/useCursor'
import useCanvas from '@/composables/useCanvas'
import design from '@/modules/DesignModule'
import { detect } from '@/utils/bezier'
import { useDataStore } from '@/stores/data'
import { Mode } from '@/types/design'

let previousEvent: null | IEvent<MouseEvent> = null
export default (event: IEvent<MouseEvent>) => {
  const { canvas } = useCanvas()
  const designStore = useDesignStore()
  const dataStore = useDataStore()
  const { removeCursor, updateCursor } = useCursor()

  design.updatePointer(event.absolutePointer)

  handleAlignPointer()
  handlePreview()

  const points = dataStore.objects.map((object) => {
    return detect({
      svgPath: object.svgPath,
      coord: event.absolutePointer!,
      distMin: 5,
    })!
  }).filter(Boolean).sort((a, b) => a.dist! - b.dist!)
  let detected = false
  if (points.length > 0 && designStore.mode === Mode.Detect) {
    design.updatePointer(points[0])
    detected = true
  }

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
  const newcursor = updateCursor()
  detected && newcursor?.fabricObject?.set({
    fill: 'rgb(239, 68, 68)',
    stroke: 'rgb(239, 68, 68)',
  })
}
