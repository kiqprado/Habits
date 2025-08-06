import { ComponentProps, ReactNode } from 'react'

import { useMediaRange } from '../utils/breakpoints-hook'

interface IActivityEmoji extends ComponentProps<'button'> {
  activityEmoji: ReactNode
  index: number
  HandleSelectedActivityEmojiToDelete: ( activity: string, index: number) => void
}

export function ActivityEmoji({ 
  activityEmoji,
  HandleSelectedActivityEmojiToDelete,
  index,
  ...props
 } : IActivityEmoji) {

   //Query's Media Range
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')

  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

  return(
    <button
      onClick={() => HandleSelectedActivityEmojiToDelete(activityEmoji as string, index)}
      {...props}
      className={`flex items-center ${mobileRangeFull || tabletRangeFull ? 'text-3xl' : 'text-4xl'}`}
      >
        {activityEmoji}
    </button>
  )
}