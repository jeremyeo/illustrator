import useCanvas from '@/composables/useCanvas'
import { useDesignStore } from '@/stores/design'

export default () => {
  const design = useDesignStore()
  const [canvas] = useCanvas()
  canvas
    && canvas.setDimensions({
      width: design.getWidth(),
      height: design.getHeight(),
    })
}
