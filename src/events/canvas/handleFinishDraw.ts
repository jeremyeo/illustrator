import Line from '@/modules/Line'
import Curve from '@/modules/Curve'
import type { IPoint } from 'fabric/fabric-impl'
import Path from '@/modules/Path'
import { designStore, useDesignStore } from '@/stores/design'
import { reversePoint } from '@/utils'

const drawLinePoint = (pointer: IPoint) => {
  if (designStore.temp.svgPath.length < 2) {
    designStore.temp.svgPath.push(
      new Path('M', [pointer.x, pointer.y]),
      new Path('L', [pointer.x, pointer.y])
    )
    return true
  } else {
    return false
  }
}

const drawCurvePoint = (pointer: IPoint) => {
  const lastPoint = designStore.temp.svgPath.slice(-1)[0]

  const endPoints = [pointer.x, pointer.y]

  if (designStore.temp.svgPath.length === 0) {
    designStore.temp.svgPath.push(
      new Path('M', endPoints),
      new Path('C', [...endPoints, ...endPoints, ...endPoints])
    )
  } else {
    const defaultControlPoint = reversePoint(
      lastPoint.coord.c2 as IPoint,
      lastPoint.coord.end
    )
    designStore.temp.svgPath.push(
      new Path('C', [
        defaultControlPoint.x,
        defaultControlPoint.y,
        ...endPoints,
        ...endPoints,
      ])
    )
  }

  return true
}

export const handleDrawPoint = () => {
  const design = useDesignStore()
  switch (design.mode) {
    case 'Line':
      return drawLinePoint(design.pointer)
    case 'Curve':
      return drawCurvePoint(design.pointer)
  }
}

export const finishDraw = (
  Constructor: typeof Line | typeof Curve,
  svgPath?: Path[]
) => {
  const object = new Constructor(svgPath || designStore.temp.svgPath)
  designStore.objects.push(object)
  object.render()
}

export const handleFinishDraw = () => {
  const design = useDesignStore()
  switch (design.mode) {
    case 'Line':
      if (designStore.temp.svgPath.length === 2) {
        finishDraw(Line)
        designStore.resetTempSvgPath()
      }
      break
    case 'Curve':
      finishDraw(Curve)
      designStore.resetTempSvgPath()
      break
  }
}
