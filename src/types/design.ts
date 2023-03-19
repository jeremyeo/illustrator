import type { IPoint } from 'fabric/fabric-impl'
import type { useDesignStore } from '@/stores/design'

export enum Mode {
  Hand = 'Hand',
  Line = 'Line',
  Curve = 'Curve',
}

export type PathType = 'M' | 'L' | 'C' | 'Z'

export type ModeKeys = keyof typeof Mode

export type Point = IPoint

export type DesignStore = ReturnType<typeof useDesignStore>
