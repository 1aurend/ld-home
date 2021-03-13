/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useState,
  useRef,
  useContext
} from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { isMobile } from 'react-device-detect'
import { Cursor } from './Layout'
import { Y } from '../Controller'
import useSize from '../hooks/use-debounced-window-size'
import useScrub from '../hooks/use-scrub'
import useScenes from '../hooks/use-scenes'
import sceneList from '../assets/sceneList'


const RAFCursor = ({ maxRadius=200, touch=isMobile, showInfo }) => {
  const windowSize = useSize()
  const y = useContext(Y)
  const showCursor = useContext(Cursor)
  const [infoPos, setInfoPos] = useState({x:-maxRadius*1.25,y:maxRadius*1.25})

  // TODO: use a div to calculate these values
  // QUESTION: why is initPos a state? because it's the actual pos... why?
  const initX = windowSize.width*.33
  const initY = windowSize.height*.60
  const [initPos, setInitPos] = useState({x:initX,y:initY})

  const kfs = {
    2: {
      0: `${maxRadius/1.5}px`,
      5: `${maxRadius/1.5}px`,
      15: `${maxRadius/3}px`,
      95: `${maxRadius/3}px`,
      100: `${maxRadius/1.5}px`,
    },
    4: {
      0: `${maxRadius/1.5}px`,
      5: `${maxRadius/1.5}px`,
      15: `${maxRadius/3}px`,
      95: `${maxRadius/3}px`,
      100: `${maxRadius/1.5}px`,
    },
    6: {
      0: `${maxRadius/1.5}px`,
      5: `${maxRadius/1.5}px`,
      15: `${maxRadius/3}px`,
      95: `${maxRadius/3}px`,
      100: `${maxRadius/1.5}px`,
    }
  }
  const [ relY, current ] = useScenes(sceneList, [2,4,6], y)
  const lightRadius = useScrub(kfs[current], relY)

  // useEffect(() => {
  //   if (showInfo) {
  //     setInfoPos(initPos => initPos)
  //   }
  // }, [showInfo])

  const test = useMotionValue(`${maxRadius*5}px`)

  const info = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${test})`
  const onPurple = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${lightRadius})`
  const onTeal = useMotionTemplate`radial-gradient(#0ca89bAA,#0ca89b03,#0ca89b00 ${lightRadius})`
  const onRed = useMotionTemplate`radial-gradient(#bd5585AA,#bd558503,#bd558500 ${lightRadius})`

  const ticking = useRef(false)
  const ePos = useRef({x:initX,y:initY})
  useEffect(()=>{
    const moveSpotlight = () => {
      ticking.current = false
      setInitPos(ePos.current)
    }
    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(moveSpotlight)
      }
      ticking.current = true
    }
    const onMouseMove = e => {
      ePos.current = {x: e.clientX, y:e.clientY}
      requestTick()
    }
    const onTouchMove = e => {
      ePos.current = {x: e.changedTouches[0].clientX, y:e.changedTouches[0].clientY}
      requestTick()
    }
    if (touch) {
      window.addEventListener('touchmove', onTouchMove)
      return () => window.removeEventListener('touchmove', onTouchMove)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  },[touch])

  return(
    <div
      sx={{
        pointerEvents:'none',
        zIndex:1000,
      }}>
      <motion.div
        id='cursor'
        style={{
          backgroundImage: showInfo ? info : y <= .33 || y >= .995 ? onPurple : y > .33 && y <= .67 ? onTeal : onRed
        }}
        sx={{
          width: `${showInfo ? maxRadius*5 : maxRadius}px`,
          height:`${showInfo ? maxRadius*5 : maxRadius}px`,
          borderRadius:'100%',
          mixBlendMode:'soft-light',
          position:'fixed',
          left:`${showInfo ? infoPos.x : initPos.x-maxRadius/2}px`,
          top:`${showInfo ? infoPos.y : initPos.y-maxRadius/2}px`,
        }}>
      </motion.div>
      {!showCursor && !showInfo && <div
        sx={{
          width: `${maxRadius/10}px`,
          height:`${maxRadius/10}px`,
          backgroundColor:'light',
          left:`${initPos.x-maxRadius/20}px`,
          top:`${initPos.y-maxRadius/20}px`,
          borderRadius:'100%',
          opacity:1,
          position:'fixed',
        }}>
      </div>}
    </div>
  )
}

export default RAFCursor
