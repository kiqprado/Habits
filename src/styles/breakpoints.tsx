export const breakpoints = {
  mobileSM: 1,
  mobileMD: 375,
  mobileLG: 575,
  tabletMD: 767,
  tabletLG: 985,
  desktop: 1024
} as const

export type Breakpoint = keyof typeof breakpoints

export const breakpointRanges: Record<Breakpoint, { min?: number; max?: number}> = {
  mobileSM: { max: breakpoints.mobileMD - 1 },
  mobileMD: { min: breakpoints.mobileMD, max: breakpoints.mobileLG - 1 },
  mobileLG: { min: breakpoints.mobileLG, max: breakpoints.tabletMD - 1 },
  tabletMD: { min: breakpoints.tabletMD, max: breakpoints.tabletLG - 1 },
  tabletLG: { min: breakpoints.tabletLG, max: breakpoints.desktop - 1 },
  desktop: { min: breakpoints.desktop }
}