import { handleFinishDraw } from '../canvas/handleFinishDraw'
import nodeController from '@/controller/NodeController'
import { useDataStore } from '@/stores/data'
import design from '@/modules/DesignModule'
import useCanvas from '@/composables/useCanvas'
import { Mode } from '@/types/design'

export default () => {
  const dataStore = useDataStore()
  const { changeMode } = useCanvas()
  if (dataStore.drawing.svgPath.length === 2) {
    design.resetTempSvgPath()
  }
  else if (dataStore.drawing.svgPath.length > 2) {
    dataStore.drawing.svgPath.pop()
    handleFinishDraw()
  }
  else if (nodeController.isEdit) {
    nodeController.cleanNode()
  }
  else {
    changeMode(Mode.Hand)
  }
}
