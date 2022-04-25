import { fabric } from 'fabric'
import type { Object as TObject } from 'fabric/fabric-impl'

export type FabricObject = TObject

export interface ISelectionEvent {
  e: MouseEvent
  selected: FabricObject[]
  deselected?: FabricObject[]
}

export type FabricObjectPath =
  | [string, number, number]
  | [string, number, number, number, number, number, number]

declare module 'fabric/fabric-impl' {
  interface Canvas {
    removeObjectFromCanvasByName(name: string): void
  }

  interface Object {
    id: number
    path: FabricObjectPath[]
    pathOffset: IPoint
    _objects: FabricObject[]
  }

  interface IObservable<T> {
    on(eventName: string, handler: (e: ISelectionEvent) => void): T
  }

  interface IEventNew extends IEvent {
    transform?:
      | {
          corner: string
          original: FabricObject
          offsetX: number
          offsetY: number
          originX: string
          originY: string
          width: number
          target: FabricObject
        }
      | undefined
  }
}

fabric.Canvas.prototype.selectionColor = 'rgba(0, 191, 255, .3)'
fabric.Canvas.prototype.selectionBorderColor = 'rgba(0, 191, 255, .5)'
fabric.Canvas.prototype.selectionLineWidth = 1
fabric.Canvas.prototype.removeObjectFromCanvasByName = function (name: string) {
  const reomveObjects = this.getObjects().filter((object) => {
    if (!object) return false
    if (!object.name) return false
    return object.name.includes(name)
  })
  for (const i in reomveObjects) {
    this.remove(reomveObjects[i])
  }
}

fabric.Object.prototype.borderColor = '#00bfff'
fabric.Object.prototype.transparentCorners = false
fabric.Object.prototype.cornerColor = '#00bfff'
fabric.Object.prototype.cornerStyle = 'circle'
fabric.Object.prototype.cornerSize = 8
