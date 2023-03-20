import type { IPoint } from 'fabric/fabric-impl'
import Curve from '@/modules/CurveModule'
import Line from '@/modules/LineModule'
import Path from '@/modules/PathModule'
import { useDesignStore } from '@/stores/design'
import { reversePoint } from '@/utils'
import { useDataStore } from '@/stores/data'
import design from '@/modules/DesignModule'
import type { DataStore } from '@/types/data'
import type { DesignStore } from '@/types/design'

const renderLinePreview = (dataStore: DataStore, designStore: DesignStore) => {
  const lastPoint = dataStore.drawing.svgPath.slice(-1)[0]
  lastPoint.setCoord({ end: designStore.pointer })

  const tempObj = new Line(dataStore.drawing.svgPath, {
    name: 'preview',
    selectable: false,
    evented: false,
    hoverCursor: 'none',
  })
  design.cleanTempObjects()
  dataStore.drawing.objects.push(tempObj as any)
  tempObj.render()
}

const renderCurvePreview = (dataStore: DataStore, designStore: DesignStore) => {
  const lastPoint = dataStore.drawing.svgPath.slice(-1)[0]
  const secondLastPoint = dataStore.drawing.svgPath.slice(-2)[0]

  lastPoint.setCoord({
    c1: secondLastPoint.coord.end,
    c2: designStore.pointer,
    end: designStore.pointer,
  })

  if (designStore.ismousedown) {
    const point = reversePoint(
      designStore.pointer,
      secondLastPoint.coord.end as IPoint,
    )

    secondLastPoint.setCoord({ c2: point })
  }
  else if (secondLastPoint.coord.c2) {
    const point = reversePoint(
      secondLastPoint.coord.c2 as IPoint,
      secondLastPoint.coord.end as IPoint,
    )

    lastPoint.setCoord({ c1: point })
  }

  design.cleanTempObjects()
  const previewConfig = {
    name: 'preview',
    selectable: false,
    evented: false,
    hoverCursor: 'none',
  }
  dataStore.drawing.objects.push(
    new Curve(dataStore.drawing.svgPath, { ...previewConfig }) as any,
  )

  if (dataStore.drawing.svgPath.length > 2) {
    dataStore.drawing.objects[0].previewOpacity = 1
    const lastPath = dataStore.drawing.objects[0].svgPath.pop() as Path
    const lastPoint = dataStore.drawing.objects[0].svgPath.slice(-1)[0]
    dataStore.drawing.objects.push(
      new Curve(
        [
          new Path('M', [lastPoint.coord.end.x, lastPoint.coord.end.y]),
          new Path('C', lastPath.points),
        ],
        { ...previewConfig },
      ) as any,
    )
  }

  dataStore.drawing.objects.forEach(object => object.render())
}

export default () => {
  const designStore = useDesignStore()
  const dataStore = useDataStore()

  if (dataStore.drawing.svgPath.length < 2)
    return

  switch (designStore.mode) {
    case 'Line':
      renderLinePreview(dataStore, designStore)
      break
    case 'Curve':
      renderCurvePreview(dataStore, designStore)
      break
  }
}
