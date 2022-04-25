import { designStore } from '@/stores/design'
import type { IEvent } from 'fabric/fabric-impl'
import { nodeController } from '.'

export default (e: IEvent) => {
  designStore.selections = []
  if (!e.target && nodeController.isEdit) {
    nodeController.exit()
  }
}
