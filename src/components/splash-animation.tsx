import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import frame1 from '/splash/frame_one.png'
import frame2 from '/splash/frame_two.png'
import frame3 from '/splash/frame_three.png'
import frame4 from '/splash/frame_four.png'
import frame5 from '/splash/frame_five.png'
import frame6 from '/splash/frame_six.png'
import frame7 from '/splash/frame_seven.png'
import frame8 from '/splash/frame_eight.png'
import frame9 from '/splash/frame_nine.png'
import frame10 from '/splash/frame_ten.png'

export function SplashAnimation() {
    const [ currentFrameSplash, setCurrentFlameSplash ] =  useState(0)

  const frames = [
    frame1,
    frame2,
    frame3,
    frame4,
    frame5,
    frame6,
    frame7,
    frame8,
    frame9,
    frame10
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFlameSplash((prevFrame) => (prevFrame + 1) % frames.length)
    }, 500)

    return () => clearInterval(interval)
  }, [])

 
  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {
        frames.map((frame, index) => {
          return (
            <motion.img
              key={index}
              src={frame}
              alt={`Frame ${index + 1}`}
              initial={{ opacity: 0}}
              animate={{ opacity: index === currentFrameSplash ? 1 : 0}}
              transition={{ duration: 0.7}}
              className='absolute inset-0 w-full h-full object-cover'
            />
          )
        })
      }
    </div>
  )
}
