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
import useInterval from '../../hooks/use-interval'
import scenes from '../../assets/sceneList'


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

const scrollToPoint = {
  philosopher: .70,
  educator: .36,
  developer: .02
}

const Slider = ({ type, scrollTo, showCursor }) => {
  const yPer = useContext(Y)
  const size = useSize()

  const sliderRef = useRef()
  const hX = useRef(0)
  const hY = useRef(0)
  const vY = useRef(0)

  const vX = `${size.width*0.8}px`
  const xKfs = {
    0: `${hX.current}px`,
    40: type === 'developer' ? vX : '',
    60: type === 'educator' ? vX : '',
    100: vX
  }
  const splashKfs = {
    0: `${hY.current}px`,
    40: type === 'developer' ? `${hY.current}px` : '',
    60: type === 'educator' ? `${hY.current}px` : '',
    100: `${vY.current}px`
  }

  const top = `${size.height*0.08}px`
  const middle = `${(hY.current-(size.height*.08))/2+(size.height*.08)}px`
  const bottom = `${hY.current}px`
  const dEKfs = {
    0: `${vY.current}px`,
    80: type === 'developer' ? '0px' : '',
    95: type === 'developer' ? bottom : '',
    100: type === 'philosopher' ? middle : type === 'educator' ? top : bottom,
  }
  const ePKfs = {
    0: type === 'philosopher' ? middle : type === 'educator' ? top : bottom,
    80: type === 'educator' ? '0px' : '',
    95: type === 'educator' ? bottom : '',
    100: type === 'philosopher' ? top : type === 'educator' ? bottom : middle
  }
  const splash = useInterval(scenes[1], yPer)
  const dToE = useInterval(scenes[3], yPer)
  const eToP = useInterval(scenes[5], yPer)
  // const pToC = useInterval(scenes[7], yPer)
  const relY =  yPer <= .02 ? splash : yPer <= .36 ? dToE : eToP
  const relKfs = yPer <= .02 ? splashKfs : yPer <= .36 ? dEKfs : ePKfs
  const x = useScrub(xKfs, splash)
  const y = useScrub(relKfs, relY)

  //use scenes here so sliders can fade out before 100?
  const opacityKfs = {
    0: 1,
    2: 1,
    3: type === 'developer' ? 1 : .5,
    31: 1,
    36: type === 'developer' ? 0 : 1,
    37: type === 'educator' ? 1 : .5,
    65: 1,
    70: type === 'educator' ? 0 : 1,
    71: type === 'philosopher' ? 1 : .5,
    99: type === 'philosopher' ? 1 : .5,
    100: 0
  }
  const opacity = useScrub(opacityKfs, yPer)

  useEffect(() => {
    if (sliderRef.current && yPer === 0) {
      const rect = sliderRef.current.getBoundingClientRect()
      hX.current = rect.left
      hY.current = rect.top
      vY.current = type === 'educator' ? (rect.top-(size.height*.08))/2+(size.height*.08) : type === 'philosopher' ? rect.top : size.height*0.08
    }
  }, [size, type, yPer])

  return (
    <motion.div
      ref={sliderRef}
      id={type}
      onClick={() => scrollTo(scrollToPoint[type],100,0)}
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
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
        animation:yPer === 0 ? `${pulse} 1.5s ease-in-out` : 'none',
        cursor:'pointer',
        zIndex:1001
      }}>
      {type}
    </motion.div>
  )
}

export default Slider
