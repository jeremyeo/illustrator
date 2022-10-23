import useCanvas from './useCanvas'
import { designStore } from '@/stores/design'

let disabled = false

const toggle = (status = false) => {
  const [canvas] = useCanvas()
  disabled = status || !disabled
  designStore.objects.forEach(object => object.update())
  canvas.selection = !status
  canvas.discardActiveObject()
}

export default (): [boolean, typeof toggle] => [disabled, toggle]
