import useCanvas, { toggleSelection } from '@/hooks/useCanvas'
import useCursor from '@/hooks/useCursor'
import useDisableEvent from '@/hooks/useDisableEvent'
import type Curve from '@/modules/Curve'
import type Line from '@/modules/Line'
import type Path from '@/modules/Path'
import type { FabricObject } from '@/utils/initFabricPrototype'
import type { IPoint } from 'fabric/fabric-impl'
import { defineStore } from 'pinia'

enum Mode {
  Hand = 'Hand',
  Line = 'Line',
  Curve = 'Curve',
}

export type TMode = keyof typeof Mode

export type TObjects = Line | Curve
export interface IDesignStore {
  objects: Array<TObjects>
  selections: FabricObject[]
  temp: {
    svgPath: Path[]
    objects: TObjects[]
  }
  cleanSelections: () => void
  cleanTempObjects: () => void
  resetTempSvgPath: () => void
  findObjectById: (id: number) => TObjects | undefined
}

export const designStore: IDesignStore = {
  objects: [],
  selections: [],
  temp: {
    svgPath: [],
    objects: [],
  },
  findObjectById(id: number) {
    return this.objects.find((object) => object.id === id)
  },
  cleanSelections() {
    const [canvas] = useCanvas()
    this.objects = this.objects.filter((object) => {
      if (this.selections.find(({ name }) => name === object.config.name)) {
        object.remove()
        return false
      }
      return true
    })
    canvas.discardActiveObject()
    this.selections = []
  },
  cleanTempObjects() {
    designStore.temp.objects.forEach((object) => object.remove())
    designStore.temp.objects = []
  },
  resetTempSvgPath() {
    designStore.cleanTempObjects()
    designStore.temp.svgPath = []
  },
}

export interface IDesignState {
  wrapperRef: null | HTMLDivElement
  canvasRef: null | HTMLCanvasElement
  mode: TMode
  modeList: TMode[]
  pointer: { x: number; y: number }
  ismousedown: boolean
  activeObjectId: number | null
}

export const useDesignStore = defineStore('design', {
  state: (): IDesignState => ({
    wrapperRef: null,
    canvasRef: null,
    mode: 'Hand',
    modeList: Object.keys(Mode) as TMode[],
    pointer: { x: 0, y: 0 },
    ismousedown: false,
    activeObjectId: null,
  }),
  getters: {
    activeObject(): TObjects | undefined {
      return designStore.findObjectById(this.activeObjectId as number)
    },
  },
  actions: {
    getWidth() {
      return this.wrapperRef?.offsetWidth || 0
    },
    getHeight() {
      return this.wrapperRef?.offsetHeight || 0
    },
    setPointer(pointer?: IPoint) {
      Object.assign(this.pointer, pointer)
    },
    handleChangeMode(mode?: TMode) {
      if (mode === this.mode) return
      if (mode) this.mode = mode
      const [canvas] = useCanvas()
      const [, toggleDisabledEvent] = useDisableEvent()
      const [, removeCursor] = useCursor()
      designStore.resetTempSvgPath()
      switch (this.mode) {
        case 'Hand':
          toggleSelection(true)
          toggleDisabledEvent(false)
          removeCursor()
          canvas.defaultCursor = 'default'
          break
        case 'Line':
        case 'Curve':
          toggleSelection(false)
          toggleDisabledEvent(true)
          canvas.defaultCursor = 'none'
          break
      }
    },
  },
})
