import { ComponentProps, ReactNode } from "react";

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
  return(
    <button
      onClick={() => HandleSelectedActivityEmojiToDelete(activityEmoji as string, index)}
      {...props}
      className='flex items-center text-4xl'
      >
        {activityEmoji}
    </button>
  )
}