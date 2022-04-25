import handlePreview from './handlePreview'
import type { IEvent } from 'fabric/fabric-impl'
import { useDesignStore } from '@/stores/design'
import { handleDrawCursor } from '@/hooks/useCursor'

export default (event: IEvent) => {
  const design = useDesignStore()
  design.setPointer(event.absolutePointer)
  handlePreview()
  handleDrawCursor()
}
