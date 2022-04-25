import Node from '../modules/Node'
import Path from '../modules/Path'
import type { TPointType } from '../modules/Node'
import type { TObjects } from '@/stores/design'
import Line from '@/modules/Line'

export default class PathController {
  private object: null | TObjects = null
  private nodeObjects: Array<Node | Line> = []
  private mousedown = false

  get nodeName() {
    return `${this.object?.id}_node`
  }

  get isEdit() {
    return this.object !== null
  }

  updateNodes() {
    this.nodeObjects.forEach((node) => node.update())
  }

  renderNodeByType(path: Path, type: TPointType, index: number) {
    const prePath = this.object?.svgPath[index - 1]
    const nextPath = this.object?.svgPath[index + 1]
    const endNode = new Node({
      path,
      prePath,
      nextPath,
      type,
      config: { name: this.nodeName },
    })
    endNode.render()

    endNode.fabricObject?.on('moving', this.handleMoving.bind(this))
    this.nodeObjects.push(endNode)
  }

  private handleMoving() {
    this.object?.render()
    this.addObjectMoveEvent()
    this.renderNode()
  }

  addObjectMoveEvent() {
    this.object?.fabricObject?.on('mousedown', () => {
      this.mousedown = true
    })

    this.object?.fabricObject?.on('mousemove', () => {
      this.mousedown && this.isEdit && this.cleanNode()
    })

    this.object?.fabricObject?.on('mouseup', () => {
      this.mousedown = false
      this.isEdit && this.renderNode()
    })
  }

  renderGuideLine(node: Path, type: TPointType, index: number) {
    const prePath = this.object?.svgPath[index - 1] as Path
    const line = new Line([], {
      name: 'preview',
      selectable: false,
      evented: false,
    })
    this.nodeObjects.push(line)

    switch (type) {
      case 'c1':
        line.svgPath = [
          new Path('M', [prePath.coord.end.x, prePath.coord.end.y]),
        ]
        break
      case 'c2':
        line.svgPath = [new Path('M', [node.coord.end.x, node.coord.end.y])]
        break
    }
    line.svgPath[1] = new Path('L', [
      node.coord[type]?.x as number,
      node.coord[type]?.y as number,
    ])
    line.render()
    line.fabricObject?.sendToBack()
  }

  renderNode() {
    this.cleanNode()
    if (!this.object) return
    this.object.svgPath.forEach((node, index) => {
      switch (node.type) {
        case 'C':
          this.renderGuideLine(node, 'c1', index)
          this.renderGuideLine(node, 'c2', index)
          this.renderNodeByType(node, 'end', index)
          this.renderNodeByType(node, 'c1', index)
          this.renderNodeByType(node, 'c2', index)
          break
        case 'Z':
          break
        default:
          this.renderNodeByType(node, 'end', index)
      }
    })
  }

  cleanNode() {
    this.nodeObjects.forEach((node) => node.remove())
    this.nodeObjects = []
  }

  edit(object: TObjects) {
    this.object = object
    this.addObjectMoveEvent()
    this.renderNode()
  }

  exit() {
    this.object = null
    this.cleanNode()
  }
}
