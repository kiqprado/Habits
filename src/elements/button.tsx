import { ComponentProps, ReactNode } from "react"
import { tv, type VariantProps } from "tailwind-variants"

interface IButton extends ComponentProps<'button'>,
VariantProps<typeof ButtonVariants> {
  children: ReactNode
}

const ButtonVariants = tv({
  base: [
    'px-4 py-2 outline-none',
    'rounded-xl border border-purple-500',
    'bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900',
    'text-purple-100 font-bold whitespace-nowrap',
    'shadow-lg shadow-purple-800/50',
    'transition-all duration-300 ease-in-out',
    'hover:scale-110 active:scale-90',
    'hover:brightness-125 active:brightness-90',
    'hover:text-purple-50 hover:border-purple-400',
    'focus:outline-none focus:ring-2 focus:ring-purple-500',
    'text-shadow-glow'
  ],
  variants: {
    font: {
      normal: 'text-md',
      large: 'text-lg'
    }
  },
  defaultVariants: {
    font: 'normal'
  }
})

export function Button( { children, font, ...props } : IButton) {
  return (
    <button 
      {...props}
      className={ButtonVariants({ font })}
    >
      <span 
        className='flex items-center gap-3 font-bold whitespace-nowrap'
      >
        { children }
      </span>
    </button>
  )
}