import design from '@/modules/DesignModule'
import { useDataStore } from '@/stores/data'
import type { ISelectionEvent } from '@/types/fabric'

export default (e: ISelectionEvent) => {
  const dataStore = useDataStore()
  dataStore.selections = e.selected.map((object) => {
    return design.findObjectById(Number(object.name))!
  }) as any
}
