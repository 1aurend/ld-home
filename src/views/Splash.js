/** @jsxImportSource @emotion/react */
import React, {useState, useEffect} from 'react'
import { jsx } from '@emotion/react'
import testPng from '../assets/text1.png'

const Cursor = () => {
  const [pos, setPos] = useState({x:0,y:0})
  useEffect(()=>console.log(pos),[pos])
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
  return(
    <div className="cursor"
      css={{
        width: '200px',
        height:'200px',
        borderRadius:'100%',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.5),rgba(255,255,0,0.00000001), rgba(255,255,0,0))',
        mixBlendMode:'soft-light',
        zIndex:1000,
        left:`${pos.x}px`,
        top:`${pos.y}px`,
        position:'absolute',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}
    >
      <div
        css={{
          width: '20px',
          height:'20px',
          backgroundColor:'white',
          mixBlendMode:'normal',
          zIndex:1001,
          borderRadius:'100%',
        }}
      >
      </div>
    </div>
  )
}

const Splash = () => {
  return(
    <div
      css={{height:'100%',width:'100%',backgroundColor:'#131438'}}
    >
      <div
        css={{height:'100%',width:'100%',backgroundImage:`url(${testPng})`, isolation: 'isolate'}}
      >
        <Cursor />
      </div>
    </div>
  )

}

export default Splash
