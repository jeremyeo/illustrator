import useCanvas from '@/composables/useCanvas'
import useDisableEvent from '@/composables/useDisableEvent'
import { useDesignStore } from '@/stores/design'

export default () => {
  const design = useDesignStore()
  const [canvas] = useCanvas()
  design.ismousedown = false
  if (design.isCanvasDrag) {
    canvas.setCursor('grab')
    const [, setDisableEvent] = useDisableEvent()
    design.isCanvasDrag = false
    setDisableEvent(false)
  }
}
