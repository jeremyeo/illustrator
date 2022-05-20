import { designStore, useDesignStore } from '@/stores/design'
import { calcDistanceBetweenTwoPoints } from '@/utils'

export default () => {
  const design = useDesignStore()
  if (design.mode === 'Curve' && designStore.temp.svgPath.length > 2) {
    if (
      calcDistanceBetweenTwoPoints(
        designStore.temp.svgPath[0].coord.end,
        design.pointer
      ) <= 30
    ) {
      Object.assign(design.pointer, designStore.temp.svgPath[0].coord.end)
    }
  }
}
