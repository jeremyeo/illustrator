import type { IEvent } from 'fabric/fabric-impl'
import handleExitMode from '../window/handleExitMode'
import handlePreview from './handlePreview'
import { handleDrawPoint, handleFinishDraw } from './handleFinishDraw'
import nodeController from '@/controller/NodeController'
import { useDesignStore } from '@/stores/design'
import design from '@/modules/DesignModule'

export default (event: IEvent<MouseEvent>) => {
  const designStore = useDesignStore()
  switch (event.button) {
    // 左键按下
    case 1:
      designStore.ismousedown = true
      if (event.e.ctrlKey || event.e.metaKey) {
        designStore.isCanvasDrag = true
        design.toggleDisabledEvent(true)
      }
      else {
        if (!handleDrawPoint()) handleFinishDraw()
        handlePreview()
        if (!event.target && nodeController.isEdit) nodeController.exit()
      }
      break
    // 右键按下
    case 3:
      handleExitMode()
      break
  }
}
