import type { IPoint } from 'fabric/fabric-impl'
import Line from '@/modules/LineModule'
import Curve from '@/modules/CurveModule'
import Path from '@/modules/PathModule'
import { useDesignStore } from '@/stores/design'
import { reversePoint } from '@/utils'
import { useDataStore } from '@/stores/data'
import design from '@/modules/DesignModule'

const drawLinePoint = (pointer: IPoint) => {
  const dataStore = useDataStore()
  if (dataStore.drawing.svgPath.length < 2) {
    dataStore.drawing.svgPath.push(
      new Path('M', [pointer.x, pointer.y]),
      new Path('L', [pointer.x, pointer.y]),
    )
    return true
  }
  else {
    return false
  }
}

const drawCurvePoint = (pointer: IPoint) => {
  const dataStore = useDataStore()
  const startPoint = dataStore.drawing.svgPath[0]
  const lastPoint = dataStore.drawing.svgPath.slice(-1)[0]

  const endPoints = [pointer.x, pointer.y]

  if (dataStore.drawing.svgPath.length === 0) {
    dataStore.drawing.svgPath.push(
      new Path('M', endPoints),
      new Path('C', [...endPoints, ...endPoints, ...endPoints]),
    )
  }
  else {
    const defaultControlPoint = reversePoint(
      lastPoint.coord.c2 as IPoint,
      lastPoint.coord.end,
    )
    dataStore.drawing.svgPath.push(
      new Path('C', [
        defaultControlPoint.x,
        defaultControlPoint.y,
        ...endPoints,
        ...endPoints,
      ]),
    )

    if (
      pointer.x === startPoint.coord.end.x
      && pointer.y === startPoint.coord.end.y
    )
      return false
  }

  return true
}

export const handleDrawPoint = () => {
  const designStore = useDesignStore()
  switch (designStore.mode) {
    case 'Line':
      return drawLinePoint(designStore.pointer)
    case 'Curve':
      return drawCurvePoint(designStore.pointer)
  }
}

export const finishDraw = (
  Constructor: typeof Line | typeof Curve,
  svgPath?: Path[],
) => {
  const dataStore = useDataStore()
  const object = new Constructor(svgPath || dataStore.drawing.svgPath)
  dataStore.objects.push(object as any)
  object.render()
}

export const handleFinishDraw = () => {
  const designStore = useDesignStore()
  const dataStore = useDataStore()
  switch (designStore.mode) {
    case 'Line':
      if (dataStore.drawing.svgPath.length === 2) {
        finishDraw(Line)
        design.resetTempSvgPath()
      }
      break
    case 'Curve':
      finishDraw(Curve)
      design.resetTempSvgPath()
      break
  }
}
