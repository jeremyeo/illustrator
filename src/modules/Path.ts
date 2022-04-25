import type { IPoint } from 'fabric/fabric-impl'

enum Type {
  'M',
  'L',
  'C',
  'Z',
}

export type TPoint = keyof typeof Type

export default class Path {
  type: keyof typeof Type = 'M'
  points: number[] = []

  constructor(type: keyof typeof Type, points: number[]) {
    this.type = type
    this.points = points
  }

  get coord() {
    const points: Array<number | undefined> = [
      ...Array.from<number | undefined>({ length: 6 - this.points.length }),
      ...this.points,
    ]

    const coord: { c1: null | IPoint; c2: null | IPoint; end: IPoint } = {
      c1: null,
      c2: null,
      end: {
        x: points[4] as number,
        y: points[5] as number,
      },
    }

    if (points[0] !== undefined && points[1] !== undefined) {
      coord.c1 = {
        x: points[0],
        y: points[1],
      }
    }

    if (points[2] !== undefined && points[3] !== undefined) {
      coord.c2 = {
        x: points[2],
        y: points[3],
      }
    }
    return coord
  }

  setCoord({ c1, c2, end }: { c1?: IPoint; c2?: IPoint; end?: IPoint }) {
    if (end) {
      this.points[this.points.length - 2] = end.x
      this.points[this.points.length - 1] = end.y
    }
    if (this.type === 'C') {
      if (c1) {
        this.points[0] = c1.x
        this.points[1] = c1.y
      }

      if (c2) {
        this.points[2] = c2.x
        this.points[3] = c2.y
      }
    }
  }
}
