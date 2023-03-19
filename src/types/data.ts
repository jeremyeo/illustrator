import type Base from '@/modules/BaseModule'
import type Path from '@/modules/PathModule'
import type { useDataStore } from '@/stores/data'

export type Objects = Base[]

export interface Drawing {
  svgPath: Path[]
  objects: Objects
}

export type DataStore = ReturnType<typeof useDataStore>
