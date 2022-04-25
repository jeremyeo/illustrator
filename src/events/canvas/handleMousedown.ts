import { useDesignStore } from '@/stores/design'
import handlePreview from './handlePreview'
import { handleDrawPoint, handleFinishDraw } from './handleFinishDraw'
import type { IEvent } from 'fabric/fabric-impl'
import handleExitMode from '../window/handleExitMode'
import { nodeController } from '.'

export default (event: IEvent) => {
  const design = useDesignStore()
  switch (event.button) {
    // 左键按下
    case 1:
      design.ismousedown = true
      if (!handleDrawPoint()) handleFinishDraw()
      handlePreview()
      if (!event.target && nodeController.isEdit) {
        nodeController.exit()
      }
      break
    // 右键按下
    case 3:
      handleExitMode()
      break
  }
}
