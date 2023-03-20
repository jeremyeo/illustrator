import { calcDistanceBetweenTwoPoints } from '.'
import type Path from '@/modules/PathModule'
import type { CalcRootsArgs, DetectArgs } from '@/types/bezier'
import type { Point } from '@/types/design'

const axis: Array<keyof Point> = ['x', 'y']

export function detect({ svgPath, coord: { x, y }, distMin = 5 }: DetectArgs) {
  function getDistMinInfo(arr: RootsInfo[], distMin: number): RootsInfo | null {
    let info: RootsInfo | null = null
    arr.forEach((b) => {
      const dist = calcDistanceBetweenTwoPoints(b, {
        x,
        y,
      })
      if (dist < distMin) {
        info = {
          ...b,
          dist,
        }
        distMin = dist
      }
    })
    return info
  }

  const arr = calRootsOfSvgPath({
    svgPath,
    coord: {
      x,
      y,
    },
  })

  const all = [...arr.x, ...arr.y]

  return getDistMinInfo(all, distMin)
}

export function calRootsOfSvgPath({ svgPath, coord }: CalcRootsArgs) {
  const roots: Roots = {
    x: [],
    y: [],
  }

  svgPath.forEach((path, index) => {
    const root = calRootOfSvgPathWithSpecificIndex({
      svgPath,
      index,
      coord,
    })
    roots.x.push(...root.x)
    roots.y.push(...root.y)
  })

  return roots
}

interface RootsInfo {
  x: number
  y: number
  t: number
  start: Path
  end: Path
  dist?: number
}

interface Roots {
  x: RootsInfo[]
  y: RootsInfo[]
}

interface CalRootOfSvgPathWithSpecificIndexArg {
  svgPath: Path[]
  index: number
  coord: Point
}

export function calRootOfSvgPathWithSpecificIndex({ svgPath, index, coord }: CalRootOfSvgPathWithSpecificIndexArg) {
  const root: Roots = {
    x: [],
    y: [],
  }
  const pathStart = svgPath[index - 1]
  const pathEnd = svgPath[index]
  if (pathStart && pathEnd) {
    const times: BezierCurveTimes = calTimesOfBezierCurve({
      pathStart,
      pathEnd,
      coord,
    })

    axis.forEach((axis) => {
      times[axis].forEach((t) => {
        const bezierPoint = getBezierPointBtwPointsByTime({
          start: pathStart,
          end: pathEnd,
          t,
        })
        const pointInfo = {
          ...bezierPoint,
          t,
          start: pathStart,
          end: pathEnd,
          index,
        }
        root[axis].push(pointInfo)
      })
    })
  }
  return root
}

interface GetBezierPointBtwPointsByTimeArg {
  start: Path
  end: Path
  t: number
}
export function getBezierPointBtwPointsByTime({ start, end, t }: GetBezierPointBtwPointsByTimeArg) {
  const sp = start.coord
  const ep = end.coord
  const b: Point = { x: 0, y: 0 }
  axis.forEach((axis) => {
    if (end.type === 'L') b[axis] = sp.end[axis] * (1 - t) + ep.end[axis] * t
    if (end.type === 'C') {
      b[axis]
        = sp.end[axis] * (1 - t) ** 3 + 3 * ep.c1![axis] * (1 - t) ** 2 * t + 3 * ep.c2![axis] * (1 - t) * t ** 2 + ep.end[axis] * t ** 3
    }
  })
  return b
}

interface CalTimesOfBezierCurveArg { pathStart: Path; pathEnd: Path; coord: Point }

interface BezierCurveTimes {
  x: number[]
  y: number[]
}

export function calTimesOfBezierCurve({ pathStart, pathEnd, coord }: CalTimesOfBezierCurveArg) {
  const times: BezierCurveTimes = {
    x: [],
    y: [],
  }

  axis.forEach((axis) => {
    const value = coord[axis as keyof Point]
    if (typeof value !== 'number') return
    const tArray: number[] = []
    switch (pathEnd.type) {
      case 'C': {
        const p0 = pathStart.coord.end[axis]
        const p1 = pathEnd.coord.c1![axis]
        const p2 = pathEnd.coord.c2![axis]
        const p3 = pathEnd.coord.end[axis]
        tArray.push(
          ...calTimeOfThirdOrderBezierCurve({
            p0,
            p1,
            p2,
            p3,
            b: value,
          }),
        )
        break
      }

      case 'L': {
        const p0 = pathStart.coord.end[axis]
        const p1 = pathEnd.coord.end![axis]
        const t = calTimeOfFirstOrderBezierCurve({
          p0,
          p1,
          b: coord[axis],
        })
        if (p0 === p1) return
        if (t !== null) tArray.push(t)
        break
      }
    }
    times[axis].push(...tArray)
  })
  return times
}

interface CalTimeOfFirstOrderBezierCurveArg {
  p0: number
  p1: number
  b: number
}

export function calTimeOfFirstOrderBezierCurve({ p0, p1, b }: CalTimeOfFirstOrderBezierCurveArg) {
  const t = roundNumber((b - p0) / (p1 - p0), 8)
  if (Math.abs(t) < 1e-8) return 0
  if (t >= 0 && t <= 1) return t
  else return null
}

interface CalTimeOfThirdOrderBezierCurveArg {
  p0: number
  p1: number
  p2: number
  p3: number
  b: number
}

export function calTimeOfThirdOrderBezierCurve({ p0, p1, p2, p3, b }: CalTimeOfThirdOrderBezierCurveArg) {
  const coeff = {
    a: p3 + 3 * p1 - 3 * p2 - p0,
    b: 3 * p0 - 6 * p1 + 3 * p2,
    c: 3 * p1 - 3 * p0,
    d: p0 - b,
  }
  const roots = calRealRootsOfCubicEquation(coeff)
  roots.forEach((root, index) => {
    if (Math.abs(root) < 1e-8) roots[index] = 0
    roots[index] = roundNumber(root, 8)
  })
  const tArray = roots.filter((root) => {
    return root <= 1 && root >= 0
  })
  return tArray
}

interface CalRealRootsOfCubicEquationArg {
  a: number
  b: number
  c: number
  d: number
}

export function calRealRootsOfCubicEquation({ a, b, c, d }: CalRealRootsOfCubicEquationArg) {
  if (Math.abs(a) < 1e-8) {
    a = b
    b = c
    c = d

    if (Math.abs(a) < 1e-8) {
      a = b
      b = c
      if (Math.abs(a) < 1e-8) return []
      return [-b / a]
    }

    const D = b ** 2 - 4 * a * c
    if (Math.abs(D) < 1e-8) return [-b / (2 * a)]
    else if (D > 0) return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)]
    return []
  }

  const p = (3 * a * c - b ** 2) / (3 * a ** 2)
  const q = (2 * b ** 3 - 9 * a * b * c + 27 * a ** 2 * d) / (27 * a ** 3)
  let roots

  if (Math.abs(p) < 1e-8) {
    roots = [nthRoot(-q, 3)]
  }
  else if (Math.abs(q) < 1e-8) {
    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : [])
  }
  else {
    const D = q ** 2 / 4 + p ** 3 / 27
    if (Math.abs(D) < 1e-8) {
      roots = [(-1.5 * q) / p, (3 * q) / p]
    }
    else if (D > 0) {
      const u = nthRoot(-q / 2 - Math.sqrt(D), 3)
      roots = [u - p / (3 * u)]
    }
    else {
      const u = 2 * Math.sqrt(-p / 3)
      const t = Math.acos((3 * q) / p / u) / 3
      const k = (2 * Math.PI) / 3
      roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)]
    }
  }

  for (let i = 0; i < roots.length; i++) roots[i] -= b / (3 * a)
  return roots
}

export function nthRoot(a: number, n: number) {
  const r = Math.abs(a) ** (1 / n)
  return a < 0 ? -r : r
}

export function roundNumber(num: number, digits: number) {
  const size = 10 ** digits
  return Math.round(num * size) / size
}
