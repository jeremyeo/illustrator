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

  interface ITransform {
    action?: string
    actionHandler?: () => void
    actionPerformed?: boolean
    altKey: boolean
    corner: boolean
    ex: number
    ey: number
    lastX: number
    lastY: number
    offsetX: number
    offsetY: number
    originX: string
    originY: string
    original: {
      scaleX: number
      scaleY: number
      skewX: number
      skewY: number
      angle: number
      flipX: boolean
      flipY: boolean
      left: number
      originX: string
      originY: string
      top: number
    }
    reset: boolean
    scaleX: number
    scaleY: number
    shiftKey: boolean
    skewX: number
    skewY: number
    target: TObject
    theta: number
    width: number
  }
  interface IModifiedEvent {
    action: string
    e: MouseEvent
    target: TObject
    transform: ITransform
  }

  interface IObservable<T> {
    on(eventName: string, handler: (e: ISelectionEvent) => void): T
    on(eventName: 'modified', handler: (e: IModifiedEvent) => void): T
  }

  // interface IEventNew extends IEvent {
  //   transform?: {
  //     corner: string
  //     original: TObject
  //     originX: string
  //     originY: string
  //     width: number
  //   }
  // }
}
