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
import getScrubValues from '../../utils/getScrubValues'
import { animations } from '../../assets/animList'

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
    size,
    color='Orange1'
  } = props
  const x = useMotionValue()
  const y = useMotionValue()
  const hX = useRef()
  const hY = useRef()
  const sliderRef = useRef()
  const toY = useRef()
  const startX = animations.SLIDER[type].portrait.x.from
  const startY = animations.SLIDER[type].portrait.y.from
  const endX = animations.SLIDER[type].portrait.x.to
  const endY = animations.SLIDER[type].portrait.y.to
  const opacityD = useMotionValue(1)
  const opacityE = useMotionValue(1)
  const opacityP = useMotionValue(1)
  // TODO: anything that has a starting value has to reset on resize

  //fix this on swap between horizontal and vertical
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
      toY.current = size.height*.1
    }
  }, [size, type, yPercent])

  const toX = type === 'philosopher' ? size.width*.1 : type === 'educator' ? size.width*.44 : size.width*.728

  const sliderX = [
    {val:x, from:hX.current, to:toX, unit:'px'},
  ]
  const sliderY = [
    {val:y, from:hY.current, to:toY.current, unit:'px'},
  ]
  const dToE = [
    {val:y, from:toY.current, to: type === 'philosopher' ? (hY.current-(size.height*.16))/2+(size.height*.16) : type === 'educator' ? size.height*0.16 : 0, unit:'px'},
    {val:opacityD, from:1, to:0, unit:''}
  ]
  const eToP = [
    {val:y, from:type === 'philosopher' ? (hY.current-(size.height*.16))/2+(size.height*.16) : type === 'educator' ? size.height*0.16 : 0, to: type === 'philosopher' ? size.height*0.16 : 0, unit:'px'},
    {val:opacityE, from:1, to:0, unit:''}
  ]
  const pFade = [
    {val:opacityP, from:1, to:0, unit:''}
  ]
  getScrubValues(yPercent, startX, endX, sliderX)
  getScrubValues(yPercent, startY, endY, sliderY)
  getScrubValues(yPercent, animations.DTOE.from, animations.DTOE.to, dToE)
  getScrubValues(yPercent, animations.ETOP.from, animations.ETOP.to, eToP)
  getScrubValues(yPercent, animations.PHILOSOPHER.line.shrink.from, animations.PHILOSOPHER.line.shrink.to, pFade)


  return (
    <motion.div
      ref={getPos}
      id={type}
      style={{
        left:yPercent !== 0 ? x : '',
        top:yPercent !== 0 ? y : '',
        position:yPercent !== 0 ? 'fixed' : '',
        opacity:type === 'developer' ? opacityD : type === 'educator' ? opacityE : opacityP
      }}
      sx={{
        height:'auto',
        width:'auto',
        fontFamily:'heading',
        fontSize:'4vmin',
        color:color,
        animation:yPercent === 0 ? `${pulse} 1.5s ease-in-out` : 'none',
        textAlign:'center'
      }}>
      {type}
    </motion.div>
  )
}

export default Slider
