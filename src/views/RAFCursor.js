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
  const infoRadius = maxRadius*(windowSize.width/200)
  const y = useContext(Y)
  const showCursor = useContext(Cursor)
  const infoPos = useState({x:-infoRadius/2.15,y:windowSize.height-infoRadius/2.25})[0]

  const initX = windowSize.width*.25
  const initY = windowSize.height*.20
  const [pos, setPos] = useState({x:initX,y:initY})

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

  const about = useMotionValue(`${infoRadius}px`)
  const infoPurple = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${about})`
  const infoTeal = useMotionTemplate`radial-gradient(#0ca89bAA,#0ca89b03,#0ca89b00 ${about})`
  const infoRed = useMotionTemplate`radial-gradient(#bd5585AA,#bd558503,#bd558500 ${about})`

  const onPurple = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${lightRadius})`
  const onTeal = useMotionTemplate`radial-gradient(#0ca89bAA,#0ca89b03,#0ca89b00 ${lightRadius})`
  const onRed = useMotionTemplate`radial-gradient(#bd5585AA,#bd558503,#bd558500 ${lightRadius})`

  const bgImage = showInfo
    ? y <= .33 || y >= .995
      ? infoPurple
      : y > .33 && y <= .67
      ? infoTeal
      : infoRed
    : y <= .33 || y >= .995
      ? onPurple
      : y > .33 && y <= .67
      ? onTeal
      : onRed

  const ticking = useRef(false)
  const ePos = useRef({x:initX,y:initY})
  useEffect(()=>{
    const moveSpotlight = () => {
      ticking.current = false
      setPos(ePos.current)
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
      e.preventDefault()
      ePos.current = {x: e.changedTouches[0].clientX, y:e.changedTouches[0].clientY}
      requestTick()
    }
    if (touch) {
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchstart', e => e.preventDefault())
      return () => {window.removeEventListener('touchmove', onTouchMove);window.removeEventListener('touchstart')}
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  },[touch])

  return(
    <div
      id='cursor-parent'
      sx={{
        pointerEvents:'none',
        zIndex:10
      }}>
      <motion.div
        id='cursor-glow'
        style={{
          backgroundImage:bgImage
        }}
        sx={{
          width: `${showInfo ? infoRadius : maxRadius}px`,
          height:`${showInfo ? infoRadius : maxRadius}px`,
          borderRadius:'100%',
          mixBlendMode:'soft-light',
          position:'absolute',
          left:`${showInfo ? infoPos.x : pos.x-maxRadius/2}px`,
          top:`${showInfo ? infoPos.y : pos.y-maxRadius/2}px`,
        }}>
      </motion.div>
      {!showCursor && !showInfo && <div
        id='cursor-dot'
        sx={{
          width: `${maxRadius/10}px`,
          height:`${maxRadius/10}px`,
          backgroundColor:'light',
          left:`${pos.x-maxRadius/20}px`,
          top:`${pos.y-maxRadius/20}px`,
          borderRadius:'100%',
          opacity:1,
          position:'absolute',
        }}>
      </div>}
    </div>
  )
}

export default RAFCursor
