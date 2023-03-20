import type { Point } from './design'
import type Path from '@/modules/PathModule'

export interface CalcRootsArgs {
  svgPath: Path[]
  coord: Point
}

export interface DetectArgs extends CalcRootsArgs {
  distMin: number
}
