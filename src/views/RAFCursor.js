/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import { animations } from '../utils/animList'


const Cursor = ({ size=200, yPercent }) => {
  const [paintPos, setPaintPos] = useState({x:0,y:0})
  const ticking = useRef(false)
  const ePos = useRef({x:0,y:0})

  const lightRadiusScrub = useMotionValue(`${size/1.5}px`)
  const lightBackground = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${lightRadiusScrub})`
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
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  },[])

  return(
    <div
      sx={{
        pointerEvents:'none',
        zIndex:1000,
      }}>
      <motion.div className="cursor"
        style={{
          backgroundImage:lightBackground,
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
      <div
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
      </div>
    </div>
  )
}

export default Cursor
