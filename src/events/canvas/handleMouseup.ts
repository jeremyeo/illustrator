import useCanvas from '@/composables/useCanvas'
import design from '@/modules/DesignModule'
import { useDesignStore } from '@/stores/design'

export default () => {
  const designStore = useDesignStore()
  const { canvas } = useCanvas()
  designStore.ismousedown = false
  if (designStore.isCanvasDrag) {
    canvas.setCursor('grab')
    designStore.isCanvasDrag = false
    design.toggleDisabledEvent(false)
  }
}
