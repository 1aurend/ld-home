/** @jsxImportSource theme-ui */
import React, {
  useRef,
  useEffect,
  useContext
} from 'react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import useSize from '../../hooks/use-debounced-window-size'
import { Y } from '../Controller'

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


const Slider = ({ type }) => {
  const yPer = useContext(Y)
  const size = useSize()

  const sliderRef = useRef()
  const hX = useRef(0)
  const hY = useRef(0)
  const vY = useRef(0)

  // QUESTION: do things with a starting value need a special on resize now? YES
  const xKfs = {
    1: `${hX.current}px`,
    2: type === 'developer' ? `${size.width*0.8}px` : '',
    3: type === 'educator' ? `${size.width*0.8}px` : '',
    5: `${size.width*0.8}px`
  }
  const yKfs = {
    2: type === 'developer' ? `${hY.current}px` : '',
    3: type === 'educator' ? `${hY.current}px` : '',
    5: `${vY.current}px`,
    29: `${vY.current}px`,
    39: type === 'philosopher' ? `${(hY.current-(size.height*.16))/2+(size.height*.16)}px` : type === 'educator' ? `${size.height*0.16}px` : '0px',
    63: type === 'philosopher' ? `${(hY.current-(size.height*.16))/2+(size.height*.16)}px` : type === 'educator' ? `${size.height*0.16}px` : '',
    73: type === 'philosopher' ? `${size.height*0.16}px` : type === 'educator' ? '0px' : ''
  }
  const x = useScrub(xKfs, yPer)
  const y = useScrub(yKfs, yPer)

  const opacityKfs = {
    0: 1,
    29: 1,
    39: type === 'developer' ? 0 : 1,
    63: type === 'developer' ? '' : 1,
    73: type === 'educator' ? 0 : type === 'developer' ? '' : 1,
    100: type === 'philosopher' ? 0 : ''
  }
  const opacity = useScrub(opacityKfs, yPer)

  // const getPos = useCallback(el => {
  //   sliderRef.current = el
  //   const rect = el.getBoundingClientRect()
  //   hX.current = rect.left
  //   hY.current = rect.top
  //   if (!x.current) {
  //     x.set(rect.left)
  //     y.set(rect.top)
  //   }
  // }, [x, y])

  useEffect(() => {
    if (sliderRef.current && yPer === 0) {
      const rect = sliderRef.current.getBoundingClientRect()
      hX.current = rect.left
      hY.current = rect.top
      vY.current = type === 'educator' ? (rect.top-(size.height*.16))/2+(size.height*.16) : type === 'philosopher' ? rect.top : size.height*0.16
    }
  }, [size, type, yPer])

  return (
    <motion.div
      ref={sliderRef}
      id={type}
      style={{
        left:yPer !== 0 ? x : '',
        top:yPer !== 0 ? y : '',
        position:yPer !== 0 ? 'fixed' : '',
        opacity:opacity
      }}
      sx={{
        height:'auto',
        width:'auto',
        fontFamily:'heading',
        fontSize:'min(max(1rem, 2vw), 25px)',
        color:'Orange1',
        animation:yPer === 0 ? `${pulse} 1.5s ease-in-out` : 'none'
      }}>
      {type}
    </motion.div>
  )
}

export default Slider
