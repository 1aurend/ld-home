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
import useScenes from '../../hooks/use-scenes'


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
    80: type === 'developer' ? `${size.height*0.01}px` : '',
    90: type === 'developer' ? bottom : '',
    100: type === 'philosopher' ? middle : type === 'educator' ? top : bottom,
  }
  const ePKfs = {
    0: type === 'philosopher' ? middle : type === 'educator' ? top : bottom,
    80: type === 'educator' ? `${size.height*0.01}px` : '',
    90: type === 'educator' ? bottom : '',
    100: type === 'philosopher' ? top : type === 'educator' ? bottom : middle
  }
  const splash = useInterval(scenes[1], yPer)
  const dev = useInterval(scenes[2], yPer)
  const dToE = useInterval(scenes[3], yPer)
  const edu = useInterval(scenes[4], yPer)
  const eToP = useInterval(scenes[5], yPer)
  const phil = useInterval(scenes[6], yPer)
  const pToC = useInterval(scenes[7], yPer)
  const [ posRelY, posCurrent ] = useScenes(scenes, [1,3,5], yPer)
  const relYa =  yPer <= .02 ? splash : yPer <= .36 ? dToE : eToP
  const relKfs = yPer <= .02 ? splashKfs : yPer <= .36 ? dEKfs : ePKfs
  const x = useScrub(xKfs, splash)
  const y = useScrub(relKfs, posRelY)


  const opacityKfs = {
    1: {
      0: 1,
      100: 1,
    },
    2: {
      0: 1,
      5: type === 'developer' ? 1 : .5,
      95: type === 'developer' ? 1 : .5,
      100: 1,
    },
    3: {
      0: 1,
      80: type === 'developer' ? 0 : 1,
      90: type === 'developer' ? 0 : 1,
      100: 1
    },
    4: {
      0: 1,
      5: type === 'educator' ? 1 : .5,
      95: type === 'educator' ? 1 : .5,
      100: 1,
    },
    5: {
      0: 1,
      80: type === 'educator' ? 0 : 1,
      90: type === 'educator' ? 0 : 1,
      100: 1
    },
    6: {
      0: 1,
      5: type === 'philosopher' ? 1 : .5,
      95: type === 'philosopher' ? 1 : .5,
    },
    7: {
      0: type === 'philosopher' ? 1 : .5,
      25: 0,
      100: 0
    }
  }
  const splashOpacityKfs = {
    0: 1,
    100: 1,
  }
  const devOpacityKfs = {
    0: 1,
    5: type === 'developer' ? 1 : .5,
    95: type === 'developer' ? 1 : .5,
    100: 1,
  }
  const dToEOpacityKfs = {
    0: 1,
    80: type === 'developer' ? 0 : 1,
    90: type === 'developer' ? 0 : 1,
    100: 1
  }
  const eduOpacityKfs = {
    0: 1,
    5: type === 'educator' ? 1 : .5,
    95: type === 'educator' ? 1 : .5,
    100: 1,
  }
  const eToPOpacityKfs = {
    0: 1,
    80: type === 'educator' ? 0 : 1,
    90: type === 'educator' ? 0 : 1,
    100: 1
  }
  const philOpacityKfs = {
    0: 1,
    5: type === 'philosopher' ? 1 : .5,
    95: type === 'philosopher' ? 1 : .5,
  }
  const pToCOpacityKfs = {
    0: type === 'philosopher' ? 1 : .5,
    25: 0,
    100: 0
  }
  const oRelY =  yPer <= .02 ? splash : yPer <= .31 ? dev : yPer <= .36 ? dToE : yPer <= .65 ? edu : yPer <= .70 ? eToP : yPer <= .99 ? phil : pToC
  const oRelKfs = yPer <= .02 ? splashOpacityKfs : yPer <= .31 ? devOpacityKfs : yPer <= .36 ? dToEOpacityKfs : yPer <= .65 ? eduOpacityKfs : yPer <= .70 ? eToPOpacityKfs : yPer <= .99 ? philOpacityKfs : pToCOpacityKfs
  const [ opRelY, opCurrent ] = useScenes(scenes, [1,2,3,4,5,6,7], yPer)
  const opacity = useScrub(opacityKfs[opCurrent], opRelY)

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
      onClick={() => scrollTo(scrollToPoint[type],size.height/2.5,0)}
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
