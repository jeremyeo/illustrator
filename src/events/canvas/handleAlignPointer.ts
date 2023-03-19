import design from '@/modules/DesignModule'
import { useDataStore } from '@/stores/data'
import { useDesignStore } from '@/stores/design'
import { calcDistanceBetweenTwoPoints } from '@/utils'

export default () => {
  const designStore = useDesignStore()
  const dataStore = useDataStore()
  if (designStore.mode === 'Curve' && dataStore.drawing.svgPath.length > 2) {
    if (
      calcDistanceBetweenTwoPoints(
        dataStore.drawing.svgPath[0].coord.end,
        designStore.pointer,
      ) <= 30
    )
      design.updatePointer(dataStore.drawing.svgPath[0].coord.end)
  }
}
