import { computed } from 'vue'
import { useDataStore } from '@/stores/data'
import design from '@/modules/DesignModule'

export default () => {
  const moduleStore = useDataStore()
  const activeObject = computed(() => design.findObjectById(moduleStore.activeObjectID))

  return activeObject
}
