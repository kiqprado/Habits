import { useState } from "react"

import dayjs from "dayjs"
import 'dayjs/locale/pt-br'

import EmojiPicker from 'emoji-picker-react';

import { Plus, X } from "lucide-react"

dayjs.locale('pt-br')

export function App() {
  const [ emojiPickerModal, setEmojiPickerModal ] = useState(false)
  const [ activityDailyEmojisList, setActivityDailyEmojisList] = useState<string[]>([])

  const [ confirmDeleteActivityEmojiModal, setConfirmDeleteActivityEmojiModal ] = useState(false)
  const [ activityEmojiToRemove, setActivityEmojiToRemove ] = useState<string | null>(null)

  const [ dailyCheckPointActivityList, setDailyCheckPointActivityList ] = useState<boolean[][]>([])
  const [ dailyDatesCheckPoint, setDailyDatesCheckPoint ] = useState<string[]>([])

  const formattedDate = dayjs().format('DD/MM')

  function ToggleEmojiPickerModal() {
    setEmojiPickerModal((prev) => !prev)
  }

  function HandleAddActivityDailyEmojisList( emojiData: { emoji: string}) {
    const activityEmoji = emojiData.emoji

    if(activityDailyEmojisList.includes(activityEmoji)) {
      alert('Parece que esta atividade já existe em sua lista.')
      return
    }

    setActivityDailyEmojisList(prevActivityList => [...prevActivityList, activityEmoji])

    ToggleEmojiPickerModal()
  }

  function ToggleActivityDeleteEmojiModal() {
    setConfirmDeleteActivityEmojiModal((prev) => !prev)
  }

  function HandleSelectedActivityEmojiToDelete( activityEmoji: string) {
    setActivityEmojiToRemove(activityEmoji)
    ToggleActivityDeleteEmojiModal()
  }

  function HandleDeleteActivityEmoji() {
    setActivityDailyEmojisList(prevActivityList => prevActivityList.filter(activityEmoji => activityEmoji !== activityEmojiToRemove))

    setActivityEmojiToRemove(null)
    ToggleActivityDeleteEmojiModal()
  }

  function HandleAddNewDailyActivityListCheckPoint() {

    if(activityDailyEmojisList.length === 0 ) {
      return
    }

    if(dailyDatesCheckPoint.includes(formattedDate)) {
      alert('Dia já adicionado a lista, você poderá adicionar outro dia amanhã.')
      return
    }

    setDailyDatesCheckPoint(prevCheckList => [...prevCheckList, formattedDate])

    setDailyCheckPointActivityList(prevCheckListActivities => [
      ...prevCheckListActivities,
      activityDailyEmojisList.map(() => false)
    ])
  }

  function HandleCheckActivityStatus(dayIndex: number, activityIndex: number) {
    setDailyCheckPointActivityList(prevActivityList =>
      prevActivityList.map((dayCheckPoints, dayPosition) =>
        dayPosition === dayIndex ? 
          dayCheckPoints.map((checked, activityStatus) =>
            activityStatus === activityIndex ? !checked : checked
        ) 
        : dayCheckPoints
      )
    )
  }

  return (
    <div className='h-screen flex'>
      <div className='w-full flex flex-col gap-16 py-12 px-16'>
        <div className='flex justify-between items-center'>
          <img src="/icon/logo.svg" alt="App Logo" />

          <div className='space-y-3'>
            <button 
              onClick={ToggleEmojiPickerModal}
              className='flex items-center gap-2 px-3 py-1.5 font-bold border rounded-xl border-purple-600 hover:border-purple-400 text-purple-400 hover:text-purple-200'
            >
              <Plus/>
              Atividade
            </button>

            <button
              onClick={HandleAddNewDailyActivityListCheckPoint} 
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
                  onClick={() => HandleSelectedActivityEmojiToDelete(activity)}
                  className='flex items-center text-4xl'
                >
                  {activity}
                </button>
              )
            })}
          </div>

          { dailyCheckPointActivityList.map((checkpoints, dayIndex) => {
            return (
              <div
                key={dayIndex} 
                className='flex flex-col gap-4 items-center'
              >
                <span className='font-medium text-2xl text-purple-200 hover:text-purple-100'>
                  {dailyDatesCheckPoint[dayIndex]}
                </span>

                { checkpoints.map((checked, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => HandleCheckActivityStatus(dayIndex, index)}
                      className={`h-12 w-12  border rounded-xl border-neutral-500 hover:border-neutral-400 
                      ${checked ? 'bg-purple-600 border-purple-400 hover:bg-purple-400 hover:border-pink-200' : ''} `}
                    >
                    </button>
                  )
                }) }
              </div>
            )
          })}
        </div>

        { emojiPickerModal && (
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
        )}

        { confirmDeleteActivityEmojiModal && (
          <div className='fixed inset-0 flex bg-neutral-950/50'>
            <div className='m-auto flex flex-col items-center gap-3 px-3 py-1.5 rounded-xl bg-neutral-700'>
              <span className='text-purple-300 font-bold'>Deseja excluir a atividade?</span>

              <div className='flex items-center gap-3'>
                <button
                  onClick={HandleDeleteActivityEmoji}
                  className='flex items-center gap-2 px-3 py-1.5 font-bold border rounded-xl border-purple-600 hover:border-purple-400 text-purple-400 hover:text-purple-200'
                >
                  Confirmar
                </button>
                <button
                  onClick={ToggleActivityDeleteEmojiModal}
                  className='flex items-center gap-2 px-3 py-1.5 font-bold border rounded-xl border-purple-600 hover:border-purple-400 text-purple-400 hover:text-purple-200'
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
