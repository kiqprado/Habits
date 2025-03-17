import EmojiPicker from 'emoji-picker-react';

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
      <div className='m-auto bg-neutral-900 flex flex-col items-end'>
        <button
          onClick={ToggleEmojiPickerModal} 
          className='text-purple-400 hover:text-purple-200'
        >
          <X/>
        </button>

        <EmojiPicker
          onEmojiClick={HandleAddActivityDailyEmojisList}
          theme='dark'
        />
      </div>
    </div>
  )
}