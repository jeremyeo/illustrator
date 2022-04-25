import { useDark, useToggle } from '@vueuse/core'
import type { Ref } from 'vue'
const isDark = useDark()
const toggleDark = useToggle(isDark)

type TUseDarkMode = [Ref<boolean>, () => boolean]
export default (): TUseDarkMode => [isDark, toggleDark]
