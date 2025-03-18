import { useState } from "react"

import dayjs from "dayjs"
import 'dayjs/locale/pt-br'

import { Plus } from "lucide-react"

import { EmojiPickerModal } from "./components/emoji-picker-modal"
import { DeleteActivityEmojiModal } from "./components/delete-activity-emoji-modal"

import { Button } from './elements/button'
import { ActivityEmoji } from './elements/activity-emoji'
import { CheckPointDate } from './elements/check-point-date'
import { ActivityCheckPoint } from './elements/activity-check-point'

dayjs.locale('pt-br')

export function App() {
  const [ emojiPickerModal, setEmojiPickerModal ] = useState(false)
  const [ activityEmojisDailyList, setActivityEmojisDailyList] = useState<string[]>([])

  const [ confirmDeleteActivityEmojiModal, setConfirmDeleteActivityEmojiModal ] = useState(false)
  const [ activityEmojiToRemove, setActivityEmojiToRemove ] = useState<{emoji: string, index: number} | null>(null)

  const [ dailyCheckPointActivityList, setDailyCheckPointActivityList ] = useState<boolean[][]>([])
  const [ datesForDailyCheckPointsList, setDatesForDailyCheckPointsList ] = useState<string[]>([])

  const formattedDate = dayjs().format('DD/MM')

  function ToggleEmojiPickerModal() {
    setEmojiPickerModal((prev) => !prev)
  }

  function HandleAddActivityDailyEmojisList( emojiData: { emoji: string}) {
    const activityEmoji = emojiData.emoji

    if(activityEmojisDailyList.includes(activityEmoji)) {
      alert('Parece que esta atividade já existe em sua lista.')
      return
    }

    setActivityEmojisDailyList(prevActivityList => [...prevActivityList, activityEmoji])

    setDailyCheckPointActivityList((prevCheckListActivities) =>
      prevCheckListActivities.map((dayCheckPoint) => [...dayCheckPoint, false])
    )

    ToggleEmojiPickerModal()
  }

  function ToggleActivityDeleteEmojiModal() {
    setConfirmDeleteActivityEmojiModal((prev) => !prev)
  }

  function HandleSelectedActivityEmojiToDelete( activityEmoji: string, index: number) {
    setActivityEmojiToRemove({ emoji: activityEmoji, index})
    ToggleActivityDeleteEmojiModal()
  }

  function HandleDeleteActivityEmoji() {
    if(!activityEmojiToRemove) return

    const { index } = activityEmojiToRemove

    setActivityEmojisDailyList(prevActivityList => 
      prevActivityList.filter((_, targetIndex) => targetIndex !== index))

    setDailyCheckPointActivityList(prevActivityList =>
      prevActivityList.map(dayCheckPoints => {
        if (dayCheckPoints.length > 1) {
          return dayCheckPoints.filter((_, checkPointIndex) => checkPointIndex !== index)
        }
        return []
      })
    )

    setActivityEmojiToRemove(null)
    ToggleActivityDeleteEmojiModal()
  }

  function HandleAddNewDailyActivityListCheckPoint() {
    if(activityEmojisDailyList.length === 0 ) {
      alert('Primeiro crie uma lista de atividades.')
      return
    }

    if(datesForDailyCheckPointsList.includes(formattedDate)) {
      alert('Dia já adicionado a lista, você poderá adicionar outro dia amanhã.')
      return
    }

    setDatesForDailyCheckPointsList(prevCheckList => [...prevCheckList, formattedDate])

    setDailyCheckPointActivityList(prevCheckListActivities => [
      ...prevCheckListActivities,
      activityEmojisDailyList.map(() => false)
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
            <Button
              onClick={ToggleEmojiPickerModal}
            >
              <Plus/>
              Atividade
            </Button>

            <Button
              onClick={HandleAddNewDailyActivityListCheckPoint}
            >
              <Plus/>
              Novo dia
            </Button>
          </div>
        </div>

        <div className='flex items-center gap-8'>
          <div className='mt-12 flex flex-col gap-4'>
            { activityEmojisDailyList.map((activity, index) => {
              return (
                <ActivityEmoji
                  key={index}
                  index={index}
                  activityEmoji={activity}
                  HandleSelectedActivityEmojiToDelete={HandleSelectedActivityEmojiToDelete}
                >
                  {activity}
                </ActivityEmoji>
              )
            })}
          </div>

          { dailyCheckPointActivityList.map((checkpoints, dayIndex) => {
            return (
              <div
                key={dayIndex} 
                className='flex flex-col gap-4 items-center'
              >
                <CheckPointDate
                  datesForDailyCheckPointsList={datesForDailyCheckPointsList}
                  dayIndex={dayIndex}
                />

                { checkpoints.map((checked, index) => {
                  return (
                    <ActivityCheckPoint
                      key={index}
                      HandleCheckActivityStatus={HandleCheckActivityStatus}
                      dayIndex={dayIndex}
                      index={index}
                      checked={checked}
                    />
                  )
                }) }
              </div>
            )
          })}
        </div>

        { emojiPickerModal && (
          <EmojiPickerModal
            ToggleEmojiPickerModal={ToggleEmojiPickerModal}
            HandleAddActivityDailyEmojisList={HandleAddActivityDailyEmojisList}
          />
        )}

        { confirmDeleteActivityEmojiModal && (
          <DeleteActivityEmojiModal
            HandleDeleteActivityEmoji={HandleDeleteActivityEmoji}
            ToggleActivityDeleteEmojiModal={ToggleActivityDeleteEmojiModal}
          />
        )}
      </div>
    </div>
  )
}
