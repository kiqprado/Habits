import { useMediaRange } from "../utils/breakpoints-hook"

import Check from '/assets/check.png'

interface IActivityCheckPoint {
  HandleCheckActivityStatus: (dayIndex: number, index: number) => void
  dayIndex: number
  index: number
  checked: boolean
}

export function ActivityCheckPoint({
  HandleCheckActivityStatus,
  dayIndex,
  index,
  checked,
  ...props
} : IActivityCheckPoint) {

  //Query's Media Range
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')

  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

  return (
    <button
      {...props}
      onClick={() => HandleCheckActivityStatus(dayIndex, index)}
      className={`relative flex items-center justify-center 
        ${mobileRangeFull || tabletRangeFull ? 'h-9 w-9' : 'h-12 w-12'} 
        border rounded-xl border-neutral-500 hover:border-neutral-400 
        transition-all duration-300 ease-out
        ${checked 
          ? 'bg-purple-700 border-purple-400 hover:bg-purple-600 hover:border-pink-300 shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]' 
          : 'bg-transparent'}
      `}
    >
      {checked && (
        <span
          className="absolute text-white animate-ping-slow pointer-events-none hover:brightness-200"
          style={{ filter: 'drop-shadow(0 0 6px white)' }}
        >
          <img src={Check} alt="" />
        </span>
      )}
    </button>
  )
}