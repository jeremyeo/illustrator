import { fabric } from 'fabric'
import type { IEvent, IPoint } from 'fabric/fabric-impl'
import { designStore } from '@/stores/design'
import type {
  FabricObject,
  FabricObjectPath,
} from '@/utils/initFabricPrototype'
import Path, { type TPoint } from '@/modules/Path'

const transformPath = (
  path: FabricObjectPath,
  pathOffset: IPoint,
  matrix: number[]
) => {
  const points = []
  switch (path[0]) {
    case 'M':
    case 'L':
      points.push(new fabric.Point(path[1], path[2]))
      break
    case 'C':
      points.push(new fabric.Point(path[1], path[2]))
      points.push(new fabric.Point(path[3] as number, path[4] as number))
      points.push(new fabric.Point(path[5] as number, path[6] as number))
      break
  }

  return new Path(
    path[0] as TPoint,
    points.flatMap((point) => {
      point.x -= pathOffset.x
      point.y -= pathOffset.y
      const transform = fabric.util.transformPoint(point, matrix)
      return [transform.x, transform.y]
    })
  )
}

const updateObjectSvgPathByFabricObject = (fabricObject: FabricObject) => {
  const object = designStore.findObjectById(fabricObject.id)
  if (!object) return
  const matrix = fabricObject.calcTransformMatrix()
  object.svgPath = fabricObject.path.map((path) => {
    return transformPath(path, fabricObject.pathOffset as IPoint, matrix as [])
  }) as Path[]
}

export default (e: IEvent) => {
  if (e.target?.id) {
    updateObjectSvgPathByFabricObject(e.target)
  } else if (e.target?._objects) {
    e.target._objects.forEach((object) =>
      updateObjectSvgPathByFabricObject(object)
    )
  }
}
