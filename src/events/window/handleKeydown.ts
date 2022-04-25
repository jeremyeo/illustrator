import { designStore } from '@/stores/design'
import handleExitMode from './handleExitMode'

export default (e: KeyboardEvent) => {
  switch (e.code) {
    case 'Escape':
      handleExitMode()
      break
    case 'Delete':
      designStore.cleanSelections()
      break
  }
}
