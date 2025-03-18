import { ComponentProps, ReactNode } from "react"

interface IButton extends ComponentProps<'button'> {
  children: ReactNode
}

export function Button( { children, ...props } : IButton) {
  return (
    <button 
      {...props}
      className='flex items-center gap-2 px-3 py-1.5 font-bold border rounded-xl border-purple-600 hover:border-purple-400 text-purple-400 hover:text-purple-200'
    >
      { children }
    </button>
  )
}