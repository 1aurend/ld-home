/** @jsxImportSource theme-ui */
import React, {
  useRef,
  useEffect
} from 'react'
import { keyframes } from '@emotion/react'
import {
  motion,
  useMotionValue,
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import useRAFWindowSize from '../hooks/useRAFWindowSize'


const Slider = props => {
  const { type, yPercent } = props
  const size = useRAFWindowSize()
  const hX = useRef()
  const hY = useRef()
  const getPos = el => {
    const rect = el.getBoundingClientRect()
    hX.current = rect.left
    hY.current = rect.top
    x.set(rect.left)
    y.set(rect.top)
  }

  const toY = type === 'educator' ? (hY.current-(size.height*.16))/2+(size.height*.16) : type === 'philosopher' ? hY.current : size.height*0.16
  const endX = type === 'educator' ? 0.08 : type === 'philosopher' ? 0.13 : 0.05
  const x = useMotionValue()
  const y = useMotionValue()

  const sliderX = [
    {val:x, from:hX.current, to:size.width*0.8, unit:'px'},
  ]
  const sliderY = [
    {val:y, from:hY.current, to:toY, unit:'px'},
  ]
  getScrubValues(yPercent, 0.03, endX, sliderX)
  getScrubValues(yPercent, endX, 0.13, sliderY)

  const pulse = keyframes({
    '0%': {
      transform: `scale3d(1, 1, 1)`
    },
    '50%': {
      transform: `scale3d(1.05, 1.05, 1.05)`
    },
    '100%': {
      transform: `scale3d(1, 1, 1)`
    }
  })

  return (
    <motion.div
      ref={getPos}
      id={type}
      style={{
        left:yPercent !== 0 ? x : '',
        top:yPercent !== 0 ? y : '',
        position:yPercent !== 0 ? 'fixed' : ''
      }}
      sx={{
        height:'auto',
        width:'auto',
        fontFamily:'heading',
        fontSize:'min(max(1rem, 2vw), 25px)',
        color:'Orange1',
        animation:yPercent === 0 ? `${pulse} 1.5s ease-in-out` : 'none'
      }}>
      {type}
    </motion.div>
  )
}

export default Slider
