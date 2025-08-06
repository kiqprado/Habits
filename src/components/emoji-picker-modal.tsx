import EmojiPicker from 'emoji-picker-react'
import { Theme } from 'emoji-picker-react'

import { X } from 'lucide-react';

interface IEmojiPickerModal {
  ToggleEmojiPickerModal: () => void
  HandleAddActivityDailyEmojisList: (emojiData: { emoji: string}) => void
}

export function EmojiPickerModal({
  ToggleEmojiPickerModal,
  HandleAddActivityDailyEmojisList
} : IEmojiPickerModal ) {

  return (
    <div className='fixed inset-0 flex bg-neutral-950/50'>
      <div className='m-auto relative'>
        <button
          onClick={ToggleEmojiPickerModal} 
          className='text-purple-400 hover:text-purple-200 
            hover:scale-110 hover:brightness-200
            transition-all duration-300 ease-in-out 
            absolute z-10 right-0.5 top-0'
        >
          <X/>
        </button>

        <EmojiPicker
          onEmojiClick={HandleAddActivityDailyEmojisList}
          theme={Theme.DARK}
        />
      </div>
    </div>
  )
}