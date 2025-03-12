import { useState } from "react"

import dayjs from "dayjs"
import 'dayjs/locale/pt-br'

import EmojiPicker from 'emoji-picker-react';

import { Plus, X } from "lucide-react"

dayjs.locale('pt-br')

export function App() {
  const [ emojiPickerModal, setEmojiPickerModal ] = useState(false)
  const [ pickerActivityEmoji, setPickerActivityEmoji ] = useState(null)

  const [ checkActivityStatus, setCheckActivityStatus ] = useState(false)

  function HandleEmojiPickerModal() {
    setEmojiPickerModal((prev) => !prev)
  }

  function HandlePickerActivityEmoji(emojiData) {
    const activity = emojiData.emoji

    setPickerActivityEmoji(activity)

    HandleEmojiPickerModal()
  }

  function HandleActivityStatus() {
    setCheckActivityStatus((prev => !prev))
  }

  return (
    <div className='h-screen flex'>
      <div className='w-full flex flex-col gap-16 py-12 px-16'>
        <div className='flex justify-between items-center'>
          <img src="/icon/logo.svg" alt="App Logo" />

          <div className='space-y-3'>
            <button 
              onClick={HandleEmojiPickerModal}
              className='flex items-center gap-2 px-3 py-1.5 font-bold border rounded-xl border-purple-600 hover:border-purple-400 text-purple-400 hover:text-purple-200'
            >
              <Plus/>
              Atividade
            </button>

            <button 
              className='flex items-center gap-2 px-3 py-1.5 font-bold border rounded-xl border-purple-600 hover:border-purple-400 text-purple-400 hover:text-purple-200'
            >
              <Plus/>
              Novo dia
            </button>
          </div>
        </div>

        <div className='flex gap-8'>
          <div>
            <button className='text-4xl'>
              {pickerActivityEmoji}
            </button>
          </div>

          <div>
            <button
              onClick={HandleActivityStatus}
              className={`h-12 w-12  border rounded-xl border-neutral-500 hover:border-neutral-400 
              ${checkActivityStatus ? 'bg-purple-600 border-purple-400 hover:bg-purple-400 hover:border-pink-200' : ''} `}
            >
            </button>
          </div>
        </div>

        { emojiPickerModal && (
          <div className='fixed inset-0 flex bg-neutral-950/50'>
            <div className='m-auto bg-neutral-900 flex flex-col items-end'>
              <button
                onClick={HandleEmojiPickerModal} 
                className='text-purple-400 hover:text-purple-200'
              >
                <X/>
              </button>

              <EmojiPicker
                onEmojiClick={HandlePickerActivityEmoji}
                theme='dark'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
