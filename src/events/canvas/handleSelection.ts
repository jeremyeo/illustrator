import { designStore } from '@/stores/design'
import type { ISelectionEvent } from '@/utils/initFabricPrototype'

export default (e: ISelectionEvent) => {
  designStore.selections = e.selected
}
