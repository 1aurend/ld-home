/** @jsxImportSource theme-ui */
import {
  useRef,
  useEffect,
  useContext,
  useState,
  forwardRef
} from 'react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import useSize from '../../hooks/use-debounced-window-size'
import { Y } from '../Controller'
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

const Slider = forwardRef(({ type, scrollTo, showCursor, x }, ref) => {
  const yPer = useContext(Y)
  const size = useSize()

  const sliderRef = useRef()
  const [hX, setHX] = useState(0)
  const [hY, setHY] = useState(0)

  const newYKfs = {
    0: `${hY || 0}px`,
    2: `${hY || 0}px`,
    50: `${size.height*0.3}px`,
    60: `${size.height*0.25}px`,
    95: `${size.height*0.09}px`,
    100: `${size.height*0.09}px`
  }
  const newY = useScrub(newYKfs, yPer, scenes[1])

  const newXKfs = {
    1: {
      0: `${hX || 0}px`,
      95: `${hX || 0}px`,
      100: `${x.one}px`,
    },
    3: {
      0: `${x.one}px`,
      90: type === 'philosopher' ? `${x.three}px` : '',
      100: `${x.three}px`,
    },
    5: {
      0: `${x.three}px`,
      90: type === 'developer' ? `${x.five}px` : '',
      100: `${x.five}px`,
    }
  }
  const [ posRelY, posCurrent ] = useScenes(scenes, [1,3,5], yPer)
  const newX = useScrub(newXKfs[posCurrent], posRelY)


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
      5: type === 'philosopher' ? 0 : 1,
      90: type === 'philosopher' ? 0 : 1,
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
      5: type === 'developer' ? 0 : 1,
      90: type === 'developer' ? 0 : 1,
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
  const [ opRelY, opCurrent ] = useScenes(scenes, [1,2,3,4,5,6,7], yPer)
  const opacity = useScrub(opacityKfs[opCurrent], opRelY)

  useEffect(() => {
    if (sliderRef.current && yPer === 0) {
      const rect = sliderRef.current.getBoundingClientRect()
      setHX(rect.left)
      setHY(rect.top)
      ref.current = rect.width
    }
  }, [size, type, yPer, ref])

  return (
    <motion.div
      ref={sliderRef}
      id={type}
      onClick={() => scrollTo(scrollToPoint[type],size.height/2.5,0)}
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      style={{
        left:yPer !== 0 ? newX : '',
        top:yPer !== 0 ? newY : '',
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
})

export default Slider
