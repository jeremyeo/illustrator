import useCanvas from '@/composables/useCanvas'
import { useDesignStore } from '@/stores/design'

export default () => {
  const designStore = useDesignStore()
  const { canvas } = useCanvas()
  canvas
    && canvas.setDimensions({
      width: designStore.wrapperRef!.offsetWidth,
      height: designStore.wrapperRef!.offsetHeight,
    })
}
