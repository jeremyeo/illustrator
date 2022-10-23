import { fabric } from 'fabric'

fabric.Canvas.prototype.selectionColor = 'rgba(0, 191, 255, .3)'
fabric.Canvas.prototype.selectionBorderColor = 'rgba(0, 191, 255, .5)'
fabric.Canvas.prototype.selectionLineWidth = 1
fabric.Canvas.prototype.removeObjectFromCanvasByName = function (name: string) {
  const reomveObjects = this.getObjects().filter((object) => {
    if (!object)
      return false
    if (!object.name)
      return false
    return object.name.includes(name)
  })
  for (const i in reomveObjects)
    this.remove(reomveObjects[i])
}

fabric.Object.prototype.borderColor = '#00bfff'
fabric.Object.prototype.transparentCorners = false
fabric.Object.prototype.cornerColor = '#00bfff'
fabric.Object.prototype.cornerStyle = 'circle'
fabric.Object.prototype.cornerSize = 8
