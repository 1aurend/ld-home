/** @jsxImportSource theme-ui */
import React, {
  useRef,
  useEffect,
  useCallback
} from 'react'
import { keyframes } from '@emotion/react'
import {
  motion,
  useMotionValue,
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import { animations } from './animList'

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


const Slider = props => {
  const {
    type,
    yPercent,
    size
  } = props
  const x = useMotionValue()
  const y = useMotionValue()
  const hX = useRef()
  const hY = useRef()
  const sliderRef = useRef()
  const toY = useRef()
  const startX = animations.SLIDER[type].x.from
  const endX = animations.SLIDER[type].x.to
  const endY = animations.SLIDER[type].y.to
  const opacity = useMotionValue()

  const getPos = useCallback(el => {
    sliderRef.current = el
    const rect = el.getBoundingClientRect()
    hX.current = rect.left
    hY.current = rect.top
    if (!x.current) {
      x.set(rect.left)
      y.set(rect.top)
    }
  }, [x, y])

  useEffect(() => {
    if (sliderRef.current && yPercent === 0) {
      const rect = sliderRef.current.getBoundingClientRect()
      hX.current = rect.left
      hY.current = rect.top
      toY.current = type === 'educator' ? (rect.top-(size.height*.16))/2+(size.height*.16) : type === 'philosopher' ? rect.top : size.height*0.16
    }
  }, [size, type, yPercent])


  const sliderX = [
    {val:x, from:hX.current, to:size.width*0.8, unit:'px'},
  ]
  const sliderY = [
    {val:y, from:hY.current, to:toY.current, unit:'px'},
  ]
  const dToE = [
    {val:y, from:toY.current, to: type === 'philosopher' ? (hY.current-(size.height*.16))/2+(size.height*.16) : type === 'educator' ? size.height*0.16 : 0, unit:'px'},
    {val:opacity, from:1, to:0, unit:''}
  ]
  getScrubValues(yPercent, startX, endX, sliderX)
  getScrubValues(yPercent, endX, endY, sliderY)
  getScrubValues(yPercent, animations.DTOE.from, animations.DTOE.to, dToE)

  return (
    <motion.div
      ref={getPos}
      id={type}
      style={{
        left:yPercent !== 0 ? x : '',
        top:yPercent !== 0 ? y : '',
        position:yPercent !== 0 ? 'fixed' : '',
        opacity:type === 'developer' ? opacity : ''
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
