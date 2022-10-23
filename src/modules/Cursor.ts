import { fabric } from 'fabric'
import Base from './Base'

export default class Cursor extends Base {
  get config() {
    return {
      ...super.config,
      originX: 'center',
      originY: 'center',
      left: this.svgPath[0].coord.end.x,
      top: this.svgPath[0].coord.end.y,
      radius: 3,
      fill: 'rgba(255, 255, 255, .8)',
      stroke: 'rgba(0,0,0,.5)',
      strokeWidth: 1,
      selectable: false,
      evented: false,
      hoverCursor: 'move',
    }
  }

  getFabricObject() {
    return new fabric.Circle(this.config)
  }
}
