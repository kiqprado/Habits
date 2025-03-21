interface ICheckPointDate {
  datesForDailyCheckPointsList: string[]
  dayIndex: number
}

export function CheckPointDate({ 
  datesForDailyCheckPointsList, 
  dayIndex
  } : ICheckPointDate ) {
  
  return (
    <span className='font-medium text-2xl text-purple-200 hover:text-purple-100'>
      {datesForDailyCheckPointsList[dayIndex]}
    </span>
  )
}