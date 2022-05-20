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

export const calcDistanceBetweenTwoPoints = (p1: IPoint, p2: IPoint) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}
