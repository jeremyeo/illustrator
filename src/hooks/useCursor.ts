import Path from '@/modules/Path'
import Cursor from '@/modules/Cursor'
import { useDesignStore } from '@/stores/design'

let cursor: Cursor | null = null
export const handleDrawCursor = () => {
  removeCursor()
  const design = useDesignStore()
  if (design.mode === 'Hand') return
  const point = new Path('M', [design.pointer.x, design.pointer.y])
  cursor = new Cursor([point])
  cursor.render()
}

const removeCursor = () => {
  cursor?.remove()
  cursor = null
}

export default (): [typeof cursor, typeof removeCursor] => [
  cursor,
  removeCursor,
]
