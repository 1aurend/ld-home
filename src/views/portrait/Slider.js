/** @jsxImportSource theme-ui */
import {
  useRef,
  useContext,
  forwardRef
} from 'react'
import { keyframes } from '@emotion/react'
import { motion, useMotionTemplate } from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import useSize from '../../hooks/use-debounced-window-size'
import { Y } from '../../Controller'
import sceneList, {
  scrollToPoints,
  scenes,
  colors
} from '../../assets/sceneList'
import useScenes from '../../hooks/use-scenes'
import useBoundingBox from '../../hooks/use-bounding-box'


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

const Slider = forwardRef((props, ref) => {
  const {
    type,
    scrollTo,
    showCursor,
    carouselX
  } = props
  const yPer = useContext(Y)
  const size = useSize()

  const sliderRef = useRef()
  const { hX, hY, width } = useBoundingBox(sliderRef.current, yPer)
  ref.current = width

  const yKfs = {
    0: `${hY || 0}px`,
    15: `${hY || 0}px`,
    60: type === 'philosopher' ? `${size.height*0.1}px` : '',
    70: type === 'educator' ? '' : `${size.height*0.1}px`,
    80: `${size.height*0.1}px`,
    100: `${size.height*0.1}px`
  }
  const y = useScrub(yKfs, yPer, sceneList[1])

  const xKfs = {
    1: {
      0: `${hX || 0}px`,
      40: `${hX || 0}px`,
      60: `${hX || 0}px`,
      70: type === 'philosopher' ? `${carouselX.one}px` : `${hX || 0}px`,
      75: type === 'developer' ? `${carouselX.one}px` : '',
      80: type === 'educator' ? `${hX || 0}px` : '',
      100: `${carouselX.one}px`,
    },
    3: {
      0: `${carouselX.one}px`,
      90: type === 'philosopher' ? `${carouselX.three}px` : '',
      100: `${carouselX.three}px`,
    },
    5: {
      0: `${carouselX.three}px`,
      90: type === 'developer' ? `${carouselX.five}px` : '',
      100: `${carouselX.five}px`,
    }
  }
  const [ posRelY, posCurrent ] = useScenes(sceneList, [1,3,5], yPer)
  const x = useScrub(xKfs[posCurrent], posRelY)

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
  const [ opRelY, opCurrent ] = useScenes(sceneList, [1,2,3,4,5,6,7], yPer)
  const opacity = useScrub(opacityKfs[opCurrent], opRelY)

  const glowKfs = {
    0: '0%',
    5: '0%',
    15: '250%',
    20: '250%',
    25: '0%'
  }
  const glowSize = useScrub(glowKfs, yPer, scenes[type])

  const purpleGradient = useMotionTemplate`radial-gradient(ellipse at center, #5257F7CC 10%,#5257F703 70%,#5257F700 75%, transparent 100vw)`
  const tealGradient = useMotionTemplate`radial-gradient(ellipse at center, #0ca89bCC 10%,#0ca89b03 70%,#0ca89b00 75%, transparent 100vw)`
  const redGradient = useMotionTemplate`radial-gradient(ellipse at center, #bd5585CC 10%,#bd558503 70%,#bd558500 75%, transparent 100vw)`
  const gradients = {
    purple: purpleGradient,
    teal: tealGradient,
    red: redGradient
  }
  const radialGradient = gradients[colors[type]]

  const scaleKfs = {
    0: 1,
    5: 1,
    15: 1.15,
    95: 1.15,
    100: 1
  }
  const scale = useScrub(scaleKfs, yPer, scenes[type])
  const grow = useMotionTemplate`scale(${scale})`

  //scrollTo faster?
  return (
    <>
    <div
      ref={sliderRef}
      id={`${type}-flex`}
      sx={{
        height:'auto',
        width:'auto',
        fontFamily:'heading',
        fontSize:'clamp(15px, 4.5vw, 28px)',
        color:'Orange1',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        boxSizing:'border-box',
        visibility:yPer <= 0.001 ? 'visible' : 'hidden',
        animation:yPer === 0 ? `${pulse} 1.5s ease-in-out` : 'none',
        zIndex:20,
        textAlign:'center'
      }}>
      {type}
    </div>
    <motion.div
      id={`${type}-parent`}
      onClick={() => scrollTo(scrollToPoints[type],size.height/2.5,0)}
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      style={{
        left:x,
        top:y,
      }}
      sx={{
        height:'auto',
        width:'auto',
        fontFamily:'heading',
        fontSize:'clamp(15px, 4.5vw, 28px)',
        color:'Orange1',
        cursor:'pointer',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        boxSizing:'border-box',
        visibility:yPer > 0.001 ? 'visible' : 'hidden',
        position:'absolute',
      }}>
      <motion.div
        id={`${type}-glow`}
        style={{
          backgroundImage:radialGradient,
          height:glowSize,
          width:glowSize,
        }}
        sx={{
          mixBlendMode:'soft-light',
          position:'absolute',
        }}>
      </motion.div>
      <motion.div
        id={`${type}-slider`}
        sx={{
          zIndex:50
        }}
        style={{
          transform:grow,
          opacity:opacity
        }}>
        {type}
      </motion.div>
    </motion.div>
    </>
  )
})

export default Slider
