import { watch } from 'vue'
import nodeController from '@/controller/NodeController'
import useCanvas from '@/composables/useCanvas'
import useDarkMode from '@/composables/useDarkMode'
import { useDataStore } from '@/stores/data'

const [isDark] = useDarkMode()
const getBackgroundColor = () => {
  return isDark.value ? 'rgb(26,26,26)' : 'rgb(246,246,246)'
}

let working = false
export default () => {
  if (working) return
  const { canvas } = useCanvas()
  const dataStore = useDataStore()

  working = true
  watch(isDark, () => {
    dataStore.objects.forEach(object => object.update())
    dataStore.objects.forEach(object => object.update())
    nodeController.updateNodes()
    canvas.setBackgroundColor(
      getBackgroundColor(),
      canvas.renderAll.bind(canvas),
    )
  }, { immediate: true })
}
