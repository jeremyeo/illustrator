import type { IEvent } from 'fabric/fabric-impl'
import nodeController from '@/controller/NodeController'
import { useDataStore } from '@/stores/data'

export default (e: IEvent) => {
  const dataStore = useDataStore()
  dataStore.selections = []
  if (!e.target && nodeController.isEdit)
    nodeController.exit()
}
