/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useState,
  useRef
} from 'react'


const Cursor = ({ size=200 }) => {
  const [paintPos, setPaintPos] = useState({x:0,y:0})
  const ticking = useRef(false)
  const ePos = useRef({x:0,y:0})

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
      <div className="cursor"
        sx={{
          width: `${size}px`,
          height:`${size}px`,
          borderRadius:'100%',
          backgroundImage: 'radial-gradient(#5257F7AA,#5257F703,#5257F700)',
          mixBlendMode:'soft-light',
          position:'fixed',
          left:`${paintPos.x-size/2}px`,
          top:`${paintPos.y-size/2}px`,
        }}>
      </div>
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
