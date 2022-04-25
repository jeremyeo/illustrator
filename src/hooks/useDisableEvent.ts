import { designStore } from '@/stores/design'

let disabled = false

const toggle = (status = false) => {
  disabled = status || !disabled
  designStore.objects.forEach((object) => object.update())
}

export default (): [boolean, typeof toggle] => [disabled, toggle]
