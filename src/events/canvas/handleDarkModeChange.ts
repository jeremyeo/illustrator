import useCanvas from '@/hooks/useCanvas'
import useDarkMode from '@/hooks/useDarkMode'
import { designStore } from '@/stores/design'
import { watch } from 'vue'
import { nodeController } from '.'

const [isDark] = useDarkMode()
const getBackgroundColor = () => {
  return isDark.value ? 'rgb(26,26,26)' : 'rgb(246,246,246)'
}

let working = false
export default () => {
  if (working) return
  const [canvas] = useCanvas()
  working = true
  watch(
    isDark,
    () => {
      designStore.objects.forEach((object) => object.update())
      designStore.temp.objects.forEach((object) => object.update())
      nodeController.updateNodes()
      canvas.setBackgroundColor(
        getBackgroundColor(),
        canvas.renderAll.bind(canvas)
      )
    },
    { immediate: true }
  )
}
