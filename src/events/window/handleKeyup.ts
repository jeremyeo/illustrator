import useCanvas from '@/composables/useCanvas'
import { useDesignStore } from '@/stores/design'

export default (e: KeyboardEvent) => {
  const design = useDesignStore()
  const [canvas] = useCanvas()
  switch (e.code) {
    case 'ControlRigth':
    case 'MetaRigth':
    case 'MetaLeft':
    case 'ControlLeft':
      design.isCtrlKey = false
      canvas.setCursor('default')
      break
  }
}
