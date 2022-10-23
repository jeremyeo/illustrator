import type { IEvent, IPoint } from 'fabric/fabric-impl'
import useCanvas from '@/composables/useCanvas'
import { useDesignStore } from '@/stores/design'

const zoomLimit = { min: 0.2, max: 5 }
export default ({ e, pointer }: IEvent<WheelEvent>) => {
  const design = useDesignStore()
  const [canvas] = useCanvas()
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    e.stopPropagation()
    const delta = e.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta
    if (zoom > zoomLimit.max)
      zoom = zoomLimit.max
    else if (zoom < zoomLimit.min)
      zoom = zoomLimit.min
    design.zoom = zoom
    canvas.zoomToPoint(pointer as IPoint, zoom)
    canvas.renderAll()
  }
}
