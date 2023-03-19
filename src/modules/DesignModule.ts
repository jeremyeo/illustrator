import useCanvas from '@/composables/useCanvas'
import type { Point } from '@/types/design'
import { useDesignStore } from '@/stores/design'
import { useDataStore } from '@/stores/data'
import type { Objects } from '@/types/data'

class Design {
  eventDisabled = false

  private get canvas() {
    const { canvas } = useCanvas()
    return canvas
  }

  private get dataStore() {
    return useDataStore()
  }

  private get designStore() {
    return useDesignStore()
  }

  findObjectById(id?: number) {
    const objects = this.dataStore.objects as unknown as Objects
    return objects.find(object => object.id === id) ?? null
  }

  cleanSelections() {
    const { canvas, ready } = useCanvas()
    if (!ready.value) return
    this.dataStore.objects = this.dataStore.objects.filter((object) => {
      if (this.dataStore.selections.find(({ id }) => id === object.id)) {
        object.remove()
        return false
      }
      return true
    })
    canvas.discardActiveObject()
    this.dataStore.selections = []
  }

  cleanTempObjects() {
    this.dataStore.drawing.objects.forEach(object => object.remove())
    this.dataStore.drawing.objects = []
  }

  resetTempSvgPath() {
    this.cleanTempObjects()
    this.dataStore.drawing.svgPath = []
  }

  findClosestObjects() {
    // const [cursor] = useCursor()
    // cursor?.fabricObject
  }

  updatePointer(newPointer?: Point) {
    Object.assign(this.designStore.pointer, newPointer)
  }

  toggleDisabledEvent(status = false) {
    this.eventDisabled = status || !this.eventDisabled
    this.dataStore.objects.forEach(object => object.update())
    this.canvas.selection = !status
    this.canvas.discardActiveObject()
  }

  // 切换 Fabric Canvas 可否区域选择
  toggleSelection(selection?: boolean) {
    this.canvas.selection = selection !== undefined
      ? selection
      : !this.canvas.selection
  }
}

const design = new Design()
export default design
