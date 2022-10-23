import type { IEvent } from 'fabric/fabric-impl'
import handleExitMode from '../window/handleExitMode'
import handlePreview from './handlePreview'
import { handleDrawPoint, handleFinishDraw } from './handleFinishDraw'
import { nodeController } from '.'
import { useDesignStore } from '@/stores/design'
import useDisableEvent from '@/composables/useDisableEvent'

export default (event: IEvent<MouseEvent>) => {
  const design = useDesignStore()
  switch (event.button) {
    // 左键按下
    case 1:
      design.ismousedown = true
      if (event.e.ctrlKey) {
        const [, setDisableEvent] = useDisableEvent()
        design.isCanvasDrag = true
        setDisableEvent(true)
      }
      else {
        if (!handleDrawPoint())
          handleFinishDraw()
        handlePreview()
        if (!event.target && nodeController.isEdit)
          nodeController.exit()
      }
      break
    // 右键按下
    case 3:
      handleExitMode()
      break
  }
}
