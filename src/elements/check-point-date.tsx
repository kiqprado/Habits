import { useMediaRange } from "../utils/breakpoints-hook"

interface ICheckPointDate {
  matrixForDatesDailyCheckPointsList: string[]
  dayIndex: number
}

export function CheckPointDate({ 
  matrixForDatesDailyCheckPointsList, 
  dayIndex
  } : ICheckPointDate ) {
  
  //Query's Media Range
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')

  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

  return (
    <span 
      className={`font-medium ${mobileRangeFull || tabletRangeFull ? 'text-xl' : 'text-2xl'}
       text-purple-200 hover:text-purple-100`}
    >
      {matrixForDatesDailyCheckPointsList[dayIndex]}
    </span>
  )
}