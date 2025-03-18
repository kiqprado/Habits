interface IActivityCheckPoint {
  HandleCheckActivityStatus: (dayIndex: number, index: number) => void
  dayIndex: number
  index: number
  checked: boolean
}

export function ActivityCheckPoint({
  HandleCheckActivityStatus,
  dayIndex,
  index,
  checked,
  ...props
} : IActivityCheckPoint) {

  return (
    <button
      {...props}
      onClick={() => HandleCheckActivityStatus(dayIndex, index)}
      className={`h-12 w-12  border rounded-xl border-neutral-500 hover:border-neutral-400 
      ${checked ? 'bg-purple-600 border-purple-400 hover:bg-purple-400 hover:border-pink-200' : ''} `}
    />
  )
}