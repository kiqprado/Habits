import { useState } from "react"

import dayjs from "dayjs"
import 'dayjs/locale/pt-br'

import EmojiPicker from 'emoji-picker-react';

import { Plus, X } from "lucide-react"

dayjs.locale('pt-br')

export function App() {
  const [ emojiPickerModal, setEmojiPickerModal ] = useState(false)
  const [ activityDailyEmojisList, setActivityDailyEmojisList] = useState<string[]>([])

  const [ checkActivityStatus, setCheckActivityStatus ] = useState(false)

  const formattedDate = dayjs().format('DD/MM')

  function HandleEmojiPickerModal() {
    setEmojiPickerModal((prev) => !prev)
  }

  function HandleActivityDailyEmojisList( emojiData: { emoji: string}) {
    const activityEmoji = emojiData.emoji

    setActivityDailyEmojisList(prevActivityList => [...prevActivityList, activityEmoji])

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

        <div className='flex items-center gap-8'>
          <div className='mt-12 flex flex-col gap-4'>
            { activityDailyEmojisList.map((activity, index) => {
              return (
                <button
                  key={index}
                  className='flex items-center text-4xl'
                >
                  {activity}
                </button>
              )
            })}
          </div>

          <div className='flex flex-col gap-4 items-center'>
            <span className='font-medium text-2xl text-purple-200 hover:text-purple-100'>
              {formattedDate}
            </span>

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
                onEmojiClick={HandleActivityDailyEmojisList}
                theme='dark'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
