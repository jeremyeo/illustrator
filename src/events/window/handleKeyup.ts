import useCanvas from '@/composables/useCanvas'
import { useDesignStore } from '@/stores/design'

export default (e: KeyboardEvent) => {
  const designStore = useDesignStore()
  const { canvas } = useCanvas()
  switch (e.code) {
    case 'ControlRigth':
    case 'MetaRigth':
    case 'MetaLeft':
    case 'ControlLeft':
      designStore.isCtrlKey = false
      canvas.setCursor('default')
      break
  }
}
