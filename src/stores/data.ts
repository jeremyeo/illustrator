import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import type { Drawing, Objects } from '@/types/data'

export const useDataStore = defineStore('module', () => {
  const objects = shallowRef<Objects>([])
  const selections: Objects = []
  const drawing: Drawing = {
    svgPath: [],
    objects: [],
  }
  const activeObjectID = ref<number>()

  return {
    objects,
    selections,
    drawing,
    activeObjectID,
  }
})
