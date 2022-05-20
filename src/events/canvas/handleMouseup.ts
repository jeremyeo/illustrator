import useCanvas from '@/hooks/useCanvas'
import useDisableEvent from '@/hooks/useDisableEvent'
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
