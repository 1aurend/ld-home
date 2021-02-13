/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useState,
  useRef,
  useContext
} from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import { animations } from '../utils/animList'
import { Cursor } from './Layout'
import useDebouncedWindowSize from '../hooks/useDebounceWindowSize'


const RAFCursor = ({ size=200, yPercent, touch }) => {
  const windowSize = useDebouncedWindowSize()
  // TODO: use a div to calculate these values?
  const initX = windowSize.width*.33
  const initY = windowSize.height*.60
  const [paintPos, setPaintPos] = useState({x:initX,y:initY})
  const ticking = useRef(false)
  const ePos = useRef({x:initX,y:initY})
  const showCursor = useContext(Cursor)

  const lightRadiusScrub = useMotionValue(`${size/1.5}px`)
  const onPurple = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${lightRadiusScrub})`
  const onTeal = useMotionTemplate`radial-gradient(#7FF0D9AA,#7FF0D903,#7FF0D900 ${lightRadiusScrub})`
  const onRed = useMotionTemplate`radial-gradient(#EEACCFAA,#EEACCF03,#EEACCF00 ${lightRadiusScrub})`
  const fadeValues = [
    {val:lightRadiusScrub, from:size/1.5, to:0, unit:'px'},
  ]
  const growValues = [
    {val:lightRadiusScrub, from:0, to:size/1.5, unit:'px'},
  ]

  getScrubValues(yPercent, animations.DEVELOPER.tile.grow.from, animations.DEVELOPER.tile.grow.to, fadeValues)
  getScrubValues(yPercent, animations.DTOE.from, animations.DTOE.to, growValues)
  getScrubValues(yPercent, animations.EDUCATOR.tile.grow.from, animations.EDUCATOR.tile.grow.to, fadeValues)
  getScrubValues(yPercent, animations.ETOP.from, animations.ETOP.to, growValues)
  getScrubValues(yPercent, animations.PHILOSOPHER.tile.grow.from, animations.PHILOSOPHER.tile.grow.to, fadeValues)
  getScrubValues(yPercent, animations.PTOEND.from, animations.PTOEND.to, growValues)


  useEffect(()=>{
    const moveSpotlight = () => {
      ticking.current = false
      setPaintPos(ePos.current)
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
  },[])

  return(
    <div
      sx={{
        pointerEvents:'none',
        zIndex:1000,
      }}>
      <motion.div
        id='cursor'
        style={{
          backgroundImage:yPercent <= .30 || yPercent >= .99 ? onPurple : yPercent > .30 && yPercent <= .65 ? onTeal : onRed
        }}
        sx={{
          width: `${size}px`,
          height:`${size}px`,
          borderRadius:'100%',
          mixBlendMode:'soft-light',
          position:'fixed',
          left:`${paintPos.x-size/2}px`,
          top:`${paintPos.y-size/2}px`,
        }}>
      </motion.div>
      {!showCursor && <div
        sx={{
          width: `${size/10}px`,
          height:`${size/10}px`,
          backgroundColor:'white',
          left:`${paintPos.x-size/20}px`,
          top:`${paintPos.y-size/20}px`,
          borderRadius:'100%',
          opacity:1,
          position:'fixed',
        }}>
      </div>}
    </div>
  )
}

export default RAFCursor
