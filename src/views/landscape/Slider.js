/** @jsxImportSource theme-ui */
import React, {
  useRef,
  useEffect,
  useContext,
  useState
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
  const [hX, setHX] = useState(0)
  const [hY, setHY] = useState(0)
  const vY = useRef(0)

  const vX = `${size.width*0.8}px`
  // const xKfs = {
  //   0: `${hX.current}px`,
  //   40: type === 'developer' ? vX : '',
  //   60: type === 'educator' ? vX : '',
  //   100: vX
  // }
  // const x = useScrub(xKfs, yPer, scenes[1])


  // const top = `${size.height*0.08}px`
  // const middle = `${(hY.current-(size.height*.08))/2+(size.height*.08)}px`
  // const bottom = `${hY.current}px`
  // const yKfs = {
  //   1: {
  //     0: `${hY.current}px`,
  //     40: type === 'developer' ? `${hY.current}px` : '',
  //     60: type === 'educator' ? `${hY.current}px` : '',
  //     100: `${vY.current}px`
  //   },
  //   3: {
  //     0: `${vY.current}px`,
  //     80: type === 'developer' ? `${size.height*0.01}px` : '',
  //     90: type === 'developer' ? bottom : '',
  //     100: type === 'philosopher' ? middle : type === 'educator' ? top : bottom,
  //   },
  //   5: {
  //     0: type === 'philosopher' ? middle : type === 'educator' ? top : bottom,
  //     80: type === 'educator' ? `${size.height*0.01}px` : '',
  //     90: type === 'educator' ? bottom : '',
  //     100: type === 'philosopher' ? top : type === 'educator' ? bottom : middle
  //   }
  // }
  const [ posRelY, posCurrent ] = useScenes(scenes, [1,3,5], yPer)
  // const y = useScrub(yKfs[posCurrent], posRelY)

  const newYKfs = {
    1: {
      0: `${hY || 0}px`,
      2: `${hY || 0}px`,
      100: `${size.height*0.09}px`
    },
  }
  const newY = useScrub(newYKfs[posCurrent], posRelY)

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
  const [ opRelY, opCurrent ] = useScenes(scenes, [1,2,3,4,5,6,7], yPer)
  const opacity = useScrub(opacityKfs[opCurrent], opRelY)

  useEffect(() => {
    if (sliderRef.current && yPer === 0) {
      const rect = sliderRef.current.getBoundingClientRect()
      setHX(rect.left)
      setHY(rect.top)
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
        left:yPer !== 0 ? hX : '',
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
}

export default Slider
