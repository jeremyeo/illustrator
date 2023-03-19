import handleExitMode from './handleExitMode'
import useCanvas from '@/composables/useCanvas'
import { useDesignStore } from '@/stores/design'
import design from '@/modules/DesignModule'

export default (e: KeyboardEvent) => {
  const designStore = useDesignStore()
  const { canvas } = useCanvas()

  switch (e.code) {
    case 'ControlRight':
    case 'MetaRight':
    case 'MetaLeft':
    case 'ControlLeft':
      if (designStore.isCtrlKey)
        break
      designStore.isCtrlKey = true
      canvas.setCursor('grab')
      break
    case 'Escape':
      handleExitMode()
      break
    case 'Delete':
      design.cleanSelections()
      break
  }
}
