import { designStore } from '@/stores/design'
import type { ISelectionEvent } from '@/types'

export default (e: ISelectionEvent) => {
  designStore.selections = e.selected
}
