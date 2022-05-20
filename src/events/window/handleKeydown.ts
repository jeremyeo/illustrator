import useCanvas from '@/hooks/useCanvas'
import { designStore, useDesignStore } from '@/stores/design'
import handleExitMode from './handleExitMode'

export default (e: KeyboardEvent) => {
  const design = useDesignStore()
  const [canvas] = useCanvas()
  switch (e.code) {
    case 'ControlLeft':
      if (design.isCtrlKey) break
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
