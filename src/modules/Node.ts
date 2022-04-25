import Base from './Base'
import { fabric } from 'fabric'
import type Path from './Path'
import type { IEventNew, IObjectOptions, IPoint } from 'fabric/fabric-impl'
import { offsetPoint, reversePoint } from '@/utils'

export type TPointType = 'c1' | 'c2' | 'end'

interface IOptions {
  path: Path
  prePath: Path | undefined
  nextPath: Path | undefined
  type: TPointType
  config?: IObjectOptions
}

export default class Node extends Base {
  path: Path
  prePath: Path | undefined
  nextPath: Path | undefined
  type: TPointType
  constructor({ path, prePath, nextPath, type, config }: IOptions) {
    super([], config)
    this.type = type
    this.path = path
    this.prePath = prePath
    this.nextPath = nextPath
  }

  get color() {
    return ['c1', 'c2'].includes(this.type) ? 'red' : '#00bfff'
  }

  update(): void {
    this.fabricObject?.set({
      stroke: 'transparent',
      strokeWidth: 0,
      fill: this.color,
    })
  }

  addEvent(): void {
    this.fabricObject?.on('moving', this.handleMoving.bind(this))
  }

  handleMoving(e: IEventNew) {
    const offset = {
      x: (e.pointer?.x as number) - (this.path.coord[this.type]?.x as number),
      y: (e.pointer?.y as number) - (this.path.coord[this.type]?.y as number),
    }

    if (this.type === 'c1' && this.prePath) {
      const point = reversePoint(
        this.path.coord[this.type] as IPoint,
        this.prePath.coord.end
      )
      this.prePath.setCoord({ c2: point })
    } else if (this.type === 'c2' && this.nextPath) {
      const point = reversePoint(
        this.path.coord[this.type] as IPoint,
        this.path.coord.end
      )
      this.nextPath.setCoord({ c1: point })
    } else if (this.type === 'end') {
      this.path.coord.c2 &&
        this.path.setCoord({
          c2: offsetPoint(this.path.coord.c2, offset),
        })

      this.nextPath &&
        this.nextPath.setCoord({
          c1: offsetPoint(this.nextPath.coord.c1, offset),
        })
    }

    this.path.setCoord({
      [this.type]: e.pointer,
    })
  }

  getFabricObject() {
    const point = this.path.coord[this.type] as IPoint
    return new fabric.Circle({
      ...this.config,
      originX: 'center',
      originY: 'center',
      left: point.x,
      top: point.y,
      radius: 4,
      fill: 'white',
      selectable: true,
      hasControls: false,
      hasBorders: false,
      hoverCursor: 'move',
    })
  }
}
