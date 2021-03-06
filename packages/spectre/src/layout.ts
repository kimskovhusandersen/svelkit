import type { Action, ClassValue } from './types'

import { define, stable, classNamesToVariants, withPrefix, isString, isNumber } from './internal'

const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export type Breakpoint = typeof BREAKPOINTS[number]

export interface Breakpoints<Config> extends Partial<Record<Breakpoint, Config>> {
  xxl?: Config
  default?: Config
  df?: Config
}

export type Responsive<Config> =
  | [/* default: */ Config]
  | [/* xs: */ Config, /* Default: */ Config]
  | [/* xs: */ Config, /* sm: */ Config, /* Default: */ Config]
  | [/* xs: */ Config, /* sm: */ Config, /* md: */ Config, /* Default: */ Config]
  | [/* xs: */ Config, /* sm: */ Config, /* md: */ Config, /* lg: */ Config, /* Default: */ Config]
  | [
      /* Xs: */ Config,
      /* Sm: */ Config,
      /* Md: */ Config,
      /* Lg: */ Config,
      /* Xl: */ Config,
      /* Default: */ Config,
    ]
  | Config[]

export const container = define((breakpoint?: Breakpoint) => [
  'container',
  withPrefix('grid-', breakpoint),
], classNamesToVariants(BREAKPOINTS, 'container grid-'))

export type GapOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'

export interface ColumnsOptions {
  gap?: GapOptions
  oneline?: boolean
}

export const columns = define((options: 'gapless' | 'oneline' | ColumnsOptions = {}) => [
  'columns',
  withPrefix('col-', options as ClassValue),
], {
  oneline: define(stable('columns', 'col-oneline')),
  gap: define((gap: GapOptions = 'auto') => [
    'columns',
    withPrefix('col-gap-', gap === 'auto' ? 1 : gap),
  ]),
  gapAround: define((gap: GapOptions = 'auto') => [
    'columns',
    withPrefix('col-gap-around-', gap === 'auto' ? 1 : gap),
  ]),
})

export const cols = columns
export const row = columns

export type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'hide' | 'show'
export type ColumnMargin = 'auto' | 'left' | 'right'

const applyColumnClasses = (breakpoint: string, size?: ColumnSize): ClassValue =>
  size === 'hide' || size === 'show' ? size + breakpoint : size && `col${breakpoint}-${size}`

const findLastUndefined = (breakpoints: Array<ColumnSize | undefined>): number => {
  const index = breakpoints.slice().reverse().findIndex(Boolean)
  const count = breakpoints.length - 1
  const finalIndex = index >= 0 ? count - index : index
  return finalIndex + 1
}

const updateColumnClasses = (
  breakpoints: undefined | Responsive<ColumnSize | undefined>,
): ClassValue => {
  const bp = breakpoints && breakpoints.slice(0, findLastUndefined(breakpoints))
  const lastBp = bp && bp.pop()
  return (
    bp && [
      BREAKPOINTS.map((key, index) => {
        return applyColumnClasses('-' + key, bp[index])
      }),
      applyColumnClasses('', lastBp),
    ]
  )
}

const columnBreakpoint = (key: string): Action<ColumnSize> =>
  define((size?: ColumnSize) => ['column', applyColumnClasses('-' + key, size)])

export const column = define((
  size?: ColumnSize | Responsive<ColumnSize> | Breakpoints<ColumnSize>,
) => [
  'column',
  updateColumnClasses(
    Array.isArray(size)
      ? size
      : isNumber(size) || isString(size)
      ? [size]
      : size && [size.xs, size.sm, size.md, size.lg, size.xl, size.xxl || size.df || size.default],
  ),
], {
  xs: columnBreakpoint('xs'),
  sm: columnBreakpoint('sm'),
  md: columnBreakpoint('md'),
  lg: columnBreakpoint('lg'),
  xl: columnBreakpoint('xl'),
  margin: define((margin: ColumnMargin = 'auto') =>
    // 'col-mx-auto', margin === 'auto'
    // 'col-ml-auto', margin === 'left'
    // 'col-mr-auto', margin === 'right'
    `col-m${margin[0].replace('a', 'x')}-auto`),
})

export const col = column
