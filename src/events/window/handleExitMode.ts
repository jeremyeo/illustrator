import { designStore, useDesignStore } from '@/stores/design'
import { nodeController } from '../canvas'
import { handleFinishDraw } from '../canvas/handleFinishDraw'

export default () => {
  const design = useDesignStore()
  if (designStore.temp.svgPath.length === 2) {
    designStore.resetTempSvgPath()
  } else if (designStore.temp.svgPath.length > 2) {
    designStore.temp.svgPath.pop()
    handleFinishDraw()
  } else if (nodeController.isEdit) {
    nodeController.cleanNode()
  } else {
    design.handleChangeMode('Hand')
  }
}
