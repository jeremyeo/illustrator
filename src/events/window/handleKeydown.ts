import handleExitMode from './handleExitMode'
import useCanvas from '@/composables/useCanvas'
import { designStore, useDesignStore } from '@/stores/design'

export default (e: KeyboardEvent) => {
  const design = useDesignStore()
  const [canvas] = useCanvas()
  switch (e.code) {
    case 'ControlLeft':
      if (design.isCtrlKey)
        break
      design.isCtrlKey = true
      canvas.setCursor('grab')
      break
    case 'Escape':
      handleExitMode()
      break
    case 'Delete':
      designStore.cleanSelections()
      break
  }
}
