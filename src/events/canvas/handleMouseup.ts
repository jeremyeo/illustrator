import { useDesignStore } from '@/stores/design'

export default () => {
  const design = useDesignStore()
  design.ismousedown = false
}
