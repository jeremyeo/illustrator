import type { IPoint } from 'fabric/fabric-impl'

export const offsetPoint = (
  point: IPoint | null,
  offset: IPoint
): IPoint | undefined => {
  if (!point) return
  return {
    x: point.x + offset.x,
    y: point.y + offset.y,
  }
}

export const reversePoint = (point: IPoint, center: IPoint): IPoint => {
  return {
    x: center.x * 2 - point.x,
    y: center.y * 2 - point.y,
  }
}
