/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useState,
  useRef,
  useContext
} from 'react'
import { motion, useMotionTemplate } from 'framer-motion'
import { isMobile } from 'react-device-detect'
import { Cursor } from './Layout'
import { Y } from './Controller'
import useSize from '../hooks/use-debounced-window-size'
import useScrub from '../hooks/use-scrub'


const RAFCursor = ({ maxRadius=200, touch=isMobile }) => {
  const windowSize = useSize()
  const y = useContext(Y)
  const showCursor = useContext(Cursor)

  // TODO: use a div to calculate these values
  // QUESTION: why is initPos a state?
  const initX = windowSize.width*.33
  const initY = windowSize.height*.60
  const [initPos, setInitPos] = useState({x:initX,y:initY})

  const kfs = {
    0: `${maxRadius/1.5}px`,
    8: `${maxRadius/1.5}px`,
    16: '0px',
    29: '0px',
    39: `${maxRadius/1.5}px`,
    43: `${maxRadius/1.5}px`,
    51: '0px',
    63: '0px',
    73: `${maxRadius/1.5}px`,
    77: `${maxRadius/1.5}px`,
    85: '0px',
    96: '0px',
    100: `${maxRadius/1.5}px`,
  }
  const lightRadius = useScrub(kfs, y)
  const onPurple = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${lightRadius})`
  const onTeal = useMotionTemplate`radial-gradient(#7FF0D9AA,#7FF0D903,#7FF0D900 ${lightRadius})`
  const onRed = useMotionTemplate`radial-gradient(#EEACCFAA,#EEACCF03,#EEACCF00 ${lightRadius})`

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
          backgroundImage:y <= .30 || y >= .99 ? onPurple : y > .30 && y <= .65 ? onTeal : onRed
        }}
        sx={{
          width: `${maxRadius}px`,
          height:`${maxRadius}px`,
          borderRadius:'100%',
          mixBlendMode:'soft-light',
          position:'fixed',
          left:`${initPos.x-maxRadius/2}px`,
          top:`${initPos.y-maxRadius/2}px`,
        }}>
      </motion.div>
      {!showCursor && <div
        sx={{
          width: `${maxRadius/10}px`,
          height:`${maxRadius/10}px`,
          backgroundColor:'white',
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
