/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useState
} from 'react'


const Cursor = () => {
  const [pos, setPos] = useState({x:0,y:0})
  useEffect(()=>{
    addEventListeners()
    return () => removeEventListeners()
  },[])
  const addEventListeners = () => {
    document.addEventListener("mousemove",onMouseMove)
  }
  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove)
  }
  const onMouseMove = (e) => {
    setPos({x: e.clientX, y:e.clientY})
  }
  const size = 200
  return(
    <div sx={{
              pointerEvents:'none', zIndex:1000,}}>
      <div className="cursor"
        sx={{
          width: `${size}px`,
          height:`${size}px`,
          borderRadius:'100%',
          backgroundImage: 'radial-gradient(#5257F7AA,#5257F703,#5257F700)',
          mixBlendMode:'soft-light',
          position:'absolute',
          left:`${pos.x-size/2}px`,
          top:`${pos.y-size/2}px`,
        }}
      ></div>
      <div
        sx={{
          width: `${size/10}px`,
          height:`${size/10}px`,
          backgroundColor:'white',
          left:`${pos.x-size/20}px`,
          top:`${pos.y-size/20}px`,
          borderRadius:'100%',
          opacity:1,
          position:'absolute',
        }}
      >
      </div>
    </div>
  )
}

export default Cursor
