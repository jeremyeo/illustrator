import handleKeydown from './handleKeydown'
import handleResize from './handleResize'

type IWindowEvents = {
  [key in keyof WindowEventMap]?: (e: WindowEventMap[key]) => void
}

const windowEvents: IWindowEvents = {
  resize: handleResize,
  keydown: handleKeydown,
}

export const removeWindowEvent = () => {
  Object.entries(windowEvents).forEach(([key, value]) => {
    window.removeEventListener(key as keyof WindowEventMap, value as () => void)
  })
}

export const addWindowEvent = () => {
  removeWindowEvent()
  Object.entries(windowEvents).forEach(([key, value]) => {
    window.addEventListener(key as keyof WindowEventMap, value as () => void)
  })
}
