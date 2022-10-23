import type { IPoint } from 'fabric/fabric-impl'
import Curve from '@/modules/Curve'
import Line from '@/modules/Line'
import Path from '@/modules/Path'
import { designStore, useDesignStore } from '@/stores/design'
import { reversePoint } from '@/utils'

const renderLinePreview = () => {
  const design = useDesignStore()
  const lastPoint = designStore.temp.svgPath.slice(-1)[0]
  lastPoint.setCoord({ end: design.pointer })

  const tempObj = new Line(designStore.temp.svgPath, {
    name: 'preview',
    selectable: false,
    evented: false,
    hoverCursor: 'none',
  })
  designStore.cleanTempObjects()
  designStore.temp.objects.push(tempObj)
  tempObj.render()
}

const renderCurvePreview = () => {
  const design = useDesignStore()
  const lastPoint = designStore.temp.svgPath.slice(-1)[0]
  const secondLastPoint = designStore.temp.svgPath.slice(-2)[0]

  lastPoint.setCoord({
    c1: secondLastPoint.coord.end,
    c2: design.pointer,
    end: design.pointer,
  })

  if (design.ismousedown) {
    const point = reversePoint(
      design.pointer,
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

  designStore.cleanTempObjects()
  const previewConfig = {
    name: 'preview',
    selectable: false,
    evented: false,
    hoverCursor: 'none',
  }
  designStore.temp.objects.push(
    new Curve(designStore.temp.svgPath, previewConfig),
  )

  if (designStore.temp.svgPath.length > 2) {
    designStore.temp.objects[0].previewOpacity = 1
    const lastPath = designStore.temp.objects[0].svgPath.pop() as Path
    const lastPoint = designStore.temp.objects[0].svgPath.slice(-1)[0]
    designStore.temp.objects.push(
      new Curve(
        [
          new Path('M', [lastPoint.coord.end.x, lastPoint.coord.end.y]),
          new Path('C', lastPath.points),
        ],
        previewConfig,
      ),
    )
  }

  designStore.temp.objects.forEach(object => object.render())
}

export default () => {
  const design = useDesignStore()
  if (designStore.temp.svgPath.length < 2)
    return

  switch (design.mode) {
    case 'Line':
      renderLinePreview()
      break
    case 'Curve':
      renderCurvePreview()
      break
  }
}
