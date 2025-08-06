import { useEffect, useState } from "react"

import dayjs from "dayjs"
import 'dayjs/locale/pt-br'

import { Plus } from "lucide-react"

import { SplashAnimation } from "../components/splash-animation"

import { EmojiPickerModal } from "../components/emoji-picker-modal"
import { DeleteActivityEmojiModal } from "../components/delete-activity-emoji-modal"

import { useMediaRange } from "../utils/breakpoints-hook"

import { Button } from '../elements/button'
import { ActivityEmoji } from '../elements/activity-emoji'
import { CheckPointDate } from '../elements/check-point-date'
import { ActivityCheckPoint } from '../elements/activity-check-point'

dayjs.locale('pt-br')

export function App() {
  const [ emojiPickerModal, setEmojiPickerModal ] = useState(false)
  const [ activityEmojisDailyList, setActivityEmojisDailyList] = useState<string[]>([])

  const [ confirmDeleteActivityEmojiModal, setConfirmDeleteActivityEmojiModal ] = useState(false)
  const [ activityEmojiToRemove, setActivityEmojiToRemove ] = useState<{emoji: string, index: number} | null>(null)

  const [ datesForDailyCheckPointsActivityList, setDatesForDailyCheckPointsActivityList ] = useState<boolean[][]>([])
  const [ matrixForDatesDailyCheckPointsList, setMatrixForDatesDailyheckPointsList ] = useState<string[]>([])

  const [ splashScreenOnLoading, setSplashScreenOnLoading ] = useState(true)

  const formattedDate = dayjs().format('DD/MM')

  //Query's Media Range
  const isMobileSM = useMediaRange('mobileSM')
  const isMobileMD = useMediaRange('mobileMD')
  const isMobileLG = useMediaRange('mobileLG')
  const isTabletMD = useMediaRange('tabletMD')
  const isTabletLG = useMediaRange('tabletLG')

  const mobileRangeFull = isMobileSM || isMobileMD || isMobileLG
  const tabletRangeFull = isTabletMD || isTabletLG

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

    setDatesForDailyCheckPointsActivityList((prevCheckListActivities) =>
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

    setDatesForDailyCheckPointsActivityList(prevActivityList => {
      const updatedCheckPointsActivityList = prevActivityList.map(
        dayCheckPoints => dayCheckPoints.length > 1 
          ? 
            dayCheckPoints.filter((_, checkPointIndex) => checkPointIndex !== index)
          : 
            []
      )

      setMatrixForDatesDailyheckPointsList(prevDates => prevDates.filter(
        (_, dayIndex) => updatedCheckPointsActivityList[dayIndex].length > 0
      ))

      return updatedCheckPointsActivityList
    })

    setActivityEmojiToRemove(null)
    ToggleActivityDeleteEmojiModal()
  }

  function HandleAddNewDailyActivityListCheckPoint() {
    if(activityEmojisDailyList.length === 0 ) {
      alert('Primeiro crie uma lista de atividades.')
      return
    }

    if(matrixForDatesDailyCheckPointsList.includes(formattedDate)) {
      alert('Dia já adicionado a lista, você poderá adicionar outro dia amanhã.')
      return
    }

    setMatrixForDatesDailyheckPointsList(prevCheckList => [...prevCheckList, formattedDate])

    setDatesForDailyCheckPointsActivityList(prevCheckListActivities => [
      ...prevCheckListActivities,
      activityEmojisDailyList.map(() => false)
    ])
  }

  function HandleCheckActivityStatus(dayIndex: number, activityIndex: number) {
    setDatesForDailyCheckPointsActivityList(prevActivityList =>
      prevActivityList.map((dayCheckPoints, dayPosition) =>
        dayPosition === dayIndex ? 
          dayCheckPoints.map((checked, activityStatus) =>
            activityStatus === activityIndex ? !checked : checked
        ) 
        : dayCheckPoints
      )
    )
  }

  useEffect(() => {
    const dataItemsToCache = {
      activityEmojisDailyList,
      datesForDailyCheckPointsActivityList,
      matrixForDatesDailyCheckPointsList
    }

    localStorage.setItem('dailyActivityCache', JSON.stringify(dataItemsToCache))
  }, [activityEmojisDailyList, datesForDailyCheckPointsActivityList, matrixForDatesDailyCheckPointsList])

  useEffect(() => {
    const cache = localStorage.getItem('dailyActivityCache')

    if(cache) {
      try {
        const {
          activityEmojisDailyList,
          datesForDailyCheckPointsActivityList,
          matrixForDatesDailyCheckPointsList
        } = JSON.parse(cache)

        setActivityEmojisDailyList(activityEmojisDailyList || [])
        setDatesForDailyCheckPointsActivityList(datesForDailyCheckPointsActivityList || [])
        setMatrixForDatesDailyheckPointsList(matrixForDatesDailyCheckPointsList || [])
      } catch(err) {
        console.error('Error to Fetch Cache Data on App:', err)
      }
    }

    const splashTimeOut = setTimeout(() => {
      setSplashScreenOnLoading(false)
    }, 5300)

    return () => clearTimeout(splashTimeOut)
  }, [])

  return (
    <div className='h-svh flex relative'>
      { splashScreenOnLoading ? (
        <SplashAnimation/>
      ) : (
        <div className={`w-full flex flex-col gap-16 ${mobileRangeFull || tabletRangeFull ? 'px-6 py-6' : 'py-12 px-16'}`}>
          <div className='flex justify-between items-center'>
            <img 
              src="/icon/logo.svg" 
              alt="App Logo"
              className={`${mobileRangeFull || tabletRangeFull ? 'w-[22%]' : ''}`}
            />

            <div 
              className={`flex
                ${mobileRangeFull || tabletRangeFull 
                  ? 'flex-row absolute bottom-5 right-1/2 translate-x-1/2 gap-6' 
                  : 'flex-col gap-3 '
                }`}
            >
              <Button
                onClick={ToggleEmojiPickerModal}
                title="Registrar nova Atividade"
                font={mobileRangeFull || tabletRangeFull ? 'large' : 'normal'}
              > 
                <>
                  <Plus/>
                  Atividade
                </> 
              </Button>

              <Button
                onClick={HandleAddNewDailyActivityListCheckPoint}
                title="Registrar um Novo Dia"
                font={mobileRangeFull || tabletRangeFull ? 'large' : 'normal'}
              >
                <>
                  <Plus/>
                  Novo dia
                </>
              </Button>
            </div>
          </div>
          
          <div className="flex w-full">
            <div className="">
              <div className={`${mobileRangeFull || tabletRangeFull ? 'w-12 h-10' : 'w-16 h-14'}`}/>
              {activityEmojisDailyList.map((activity, activityIndex) => (
                <div 
                  key={activityIndex}
                  className={`flex items-center justify-center
                    ${mobileRangeFull || tabletRangeFull ? 'w-12 h-10' : 'w-16 h-14'}`}
                >
                  <ActivityEmoji
                    key={activityIndex}
                    activityEmoji={activity}
                    index={activityIndex}
                    HandleSelectedActivityEmojiToDelete={HandleSelectedActivityEmojiToDelete}
                  >
                    {activity}
                  </ActivityEmoji>
                </div>  
              ))}
            </div>
            
            {datesForDailyCheckPointsActivityList.map((checkpoints, dayIndex) => (
              <div 
                key={dayIndex}
                className="" 
              >
                <div 
                  className={`flex items-center ${mobileRangeFull || tabletRangeFull ? 'w-12 h-10' : 'w-16 h-14'}`}
                >
                  <CheckPointDate
                    dayIndex={dayIndex}
                    matrixForDatesDailyCheckPointsList={matrixForDatesDailyCheckPointsList}
                  />
                </div>
                {checkpoints.map((checked, activityIndex) => (
                  <div 
                    key={activityIndex}
                    className={`flex items-center justify-center
                      ${mobileRangeFull || tabletRangeFull ? 'w-12 h-10' : 'w-16 h-14'}`}
                  
                  >
                    <ActivityCheckPoint
                      dayIndex={dayIndex}
                      index={activityIndex}
                      checked={checked}
                      HandleCheckActivityStatus={HandleCheckActivityStatus}
                    />
                  </div>
                ))} 
              </div>
            ))} 
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
        )}
    </div>
  )
}
