import type { IEvent } from 'fabric/fabric-impl'
import { nodeController } from '.'
import { designStore } from '@/stores/design'

export default (e: IEvent) => {
  designStore.selections = []
  if (!e.target && nodeController.isEdit)
    nodeController.exit()
}
