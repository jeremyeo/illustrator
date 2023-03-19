import Path from '@/modules/PathModule'
import Cursor from '@/modules/CursorModule'
import { useDesignStore } from '@/stores/design'

let cursor: Cursor

export default () => {
  const design = useDesignStore()

  const removeCursor = () => {
    cursor?.remove()
  }

  const updateCursor = () => {
    removeCursor()
    if (design.mode === 'Hand')
      return
    const point = new Path('M', [design.pointer.x, design.pointer.y])
    cursor = new Cursor([point])
    cursor.render()
  }

  updateCursor()

  return {
    cursor,
    removeCursor,
    updateCursor,
  }
}
