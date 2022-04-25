import { fabric } from 'fabric'
import type Path from './Path'
import useCanvas from '@/hooks/useCanvas'
import useDarkMode from '@/hooks/useDarkMode'
import { useDesignStore } from '@/stores/design'
import useDisableEvent from '@/hooks/useDisableEvent'
import type { IObjectOptions } from 'fabric/fabric-impl'
import type { FabricObject } from '@/utils/initFabricPrototype'

export default class Base {
  previewOpacity = 0.3
  normalOpacity = 1

  id: number = Date.now()
  design = useDesignStore()
  canvas = useCanvas()[0]
  isDarkMode = useDarkMode()[0]
  svgPath: Path[] = []
  fabricObject: FabricObject | null = null
  config: IObjectOptions = {
    name: String(this.id),
    strokeWidth: 1,
    strokeUniform: true,
    fill: 'transparent',
    hoverCursor: 'default',
    hasBorders: true,
    borderColor: '#00bfff',
    selectable: true,
    hasControls: true,
    flipX: false,
    flipY: false,
    evented: true,
  }

  constructor(svgPath?: Path[], config?: IObjectOptions) {
    this.svgPath = [...(svgPath || [])]
    Object.assign(this.config, config)
    const opacity = this.config.name === 'preview' ? '.3' : '1'
    this.config.stroke = this.isDarkMode.value
      ? `rgba(255, 255, 255, ${opacity})`
      : `rgba(0, 0, 0, ${opacity})`
  }

  svgPath2Text(svgPath: Path[]) {
    return svgPath
      .map((path) => `${path.type} ${path.points.join(',')}`)
      .join(' ')
  }

  get svgPathText() {
    return this.svgPath2Text(this.svgPath)
  }

  getFabricObject(): FabricObject {
    return new fabric.Path(this.svgPathText, this.config)
  }

  render() {
    this.remove()
    this.fabricObject = this.getFabricObject()
    this.fabricObject.id = this.id
    this.update()
    this.addEvent()
    this.canvas.add(this.fabricObject as FabricObject)
  }

  addEvent() {
    // add event for fabric object
  }

  getStroke(previewOpacity?: number, normalOpacity?: number) {
    const opacity =
      this.config.name === 'preview'
        ? previewOpacity || this.previewOpacity
        : normalOpacity || this.normalOpacity
    return this.isDarkMode.value
      ? `rgba(255, 255, 255, ${opacity})`
      : `rgba(0, 0, 0, ${opacity})`
  }

  update(config?: IObjectOptions, disabledEvent = false) {
    this.config.stroke = this.getStroke()
    Object.assign(this.config, config)
    const [disabled] = useDisableEvent()

    const newConfig: IObjectOptions = { ...this.config }
    if (disabled || disabledEvent) {
      Object.assign(newConfig, {
        selectable: false,
        evented: false,
        hoverCursor: 'none',
      } as IObjectOptions)
    }
    this.fabricObject?.set(newConfig)
  }

  remove() {
    this.canvas.remove(this.fabricObject as FabricObject)
  }
}