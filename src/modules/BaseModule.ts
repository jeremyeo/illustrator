import { fabric } from 'fabric'
import type { IObjectOptions } from 'fabric/fabric-impl'
import type Path from './PathModule'
import design from './DesignModule'
import useCanvas from '@/composables/useCanvas'
import useDarkMode from '@/composables/useDarkMode'
import { useDesignStore } from '@/stores/design'
import type { FabricObject } from '@/types/fabric'

export default class Base {
  previewOpacity = 0.3
  normalOpacity = 1
  readonly id: number = Date.now()
  svgPath: Path[] = []
  fabricObject: FabricObject | null = null

  private readonly _config: IObjectOptions = {
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

  private readonly designStore = useDesignStore()
  private readonly canvas = useCanvas().canvas
  isDarkMode = useDarkMode()[0]

  events: { [key: string]: Set<() => void> } = {}

  constructor(svgPath?: Path[], config?: IObjectOptions) {
    this.svgPath = [...(svgPath || [])]
    this.updateConfig(config)
  }

  get config() {
    return { ...this._config }
  }

  updateConfig(newConfig?: IObjectOptions) {
    this._config.stroke = this.getStroke()
    if (!newConfig) return
    Object.assign(this._config, newConfig)
  }

  on(type: string, callback: () => void) {
    if (!this.events[type])
      this.events[type] = new Set()
    this.events[type].add(callback)
  }

  emit(type: string) {
    this.events[type]?.forEach(callback => callback.call(this))
  }

  off(type: string, callback: () => void) {
    this.events[type]?.delete(callback)
  }

  svgPath2Text(svgPath: Path[]) {
    return svgPath
      .map(path => `${path.type} ${path.points.join(',')}`)
      .join(' ')
  }

  get svgPathText() {
    return this.svgPath2Text(this.svgPath)
  }

  getFabricObject(): FabricObject {
    return new fabric.Path(this.svgPathText, this._config)
  }

  render() {
    this.emit('beforeRender')
    this.remove()
    this.fabricObject = this.getFabricObject()
    this.fabricObject.id = this.id
    this.update()
    this.addEvent()
    this.canvas.add(this.fabricObject as FabricObject)
    this.emit('afterRender')
  }

  addEvent() {
    // add event for fabric object
  }

  getStroke(previewOpacity?: number, normalOpacity?: number) {
    const opacity
      = this._config.name === 'preview'
        ? (previewOpacity || this.previewOpacity)
        : (normalOpacity || this.normalOpacity)

    return this.isDarkMode
      ? `rgba(255, 255, 255, ${opacity})`
      : `rgba(0, 0, 0, ${opacity})`
  }

  update(config?: IObjectOptions, disabled = false) {
    this._config.stroke = this.getStroke()
    Object.assign(this._config, config)
    const { eventDisabled } = design

    const newConfig: IObjectOptions = { ...this._config }
    if (eventDisabled || disabled) {
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
