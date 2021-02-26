/** @jsxImportSource theme-ui */
import {
  useRef,
  useEffect,
  useCallback,
  useContext
} from 'react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import useInterval from '../../hooks/use-interval'
import useSize from '../../hooks/use-debounced-window-size'
import scenes from '../../assets/sceneList'
import Y from '../Controller'

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


const Slider = type => {
  const yPer = useContext(Y)
  const size = useSize()

  const sliderRef = useRef()
  const hX = useRef()
  const hY = useRef()


  const x = useScrub(x)
  const y = useScrub()

  const toY = useRef()
  const startX = animations.SLIDER[type].landscape.x.from
  const endX = animations.SLIDER[type].landscape.x.to
  const endY = animations.SLIDER[type].landscape.y.to
  const opacityD = useMotionValue(1)
  const opacityE = useMotionValue(1)
  const opacityP = useMotionValue(1)
  // TODO: anything that has a starting value has to reset on resize

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
    if (sliderRef.current && yPer === 0) {
      const rect = sliderRef.current.getBoundingClientRect()
      hX.current = rect.left
      hY.current = rect.top
      toY.current = type === 'educator' ? (rect.top-(size.height*.16))/2+(size.height*.16) : type === 'philosopher' ? rect.top : size.height*0.16
    }
  }, [size, type, yPer])


  const sliderX = [
    {val:x, from:hX.current, to:size.width*0.8, unit:'px'},
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
  getScrubValues(yPer, startX, endX, sliderX)
  getScrubValues(yPer, endX, endY, sliderY)
  getScrubValues(yPer, animations.DTOE.from, animations.DTOE.to, dToE)
  getScrubValues(yPer, animations.ETOP.from, animations.ETOP.to, eToP)
  getScrubValues(yPer, animations.PHILOSOPHER.line.shrink.from, animations.PHILOSOPHER.line.shrink.to, pFade)


  return (
    <motion.div
      ref={getPos}
      id={type}
      style={{
        left:yPer !== 0 ? x : '',
        top:yPer !== 0 ? y : '',
        position:yPer !== 0 ? 'fixed' : '',
        opacity:type === 'developer' ? opacityD : type === 'educator' ? opacityE : opacityP
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
