/** @jsxImportSource theme-ui */
import React, {useState, useEffect, useRef} from 'react'
import { jsx } from 'theme-ui'
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
      sx={{
        width: '200px',
        height:'200px',
        borderRadius:'100%',
        backgroundImage: 'radial-gradient(#5257F7AA,#5257F703,#5257F700)',
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
        sx={{
          width: '20px',
          height:'20px',
          backgroundColor:'white',
          mixBlendMode:'none',
          zIndex:1001,
          borderRadius:'100%',
        }}
      >
      </div>
    </div>
  )
}

const Name = () => {
  return(
    <div sx={{fontSize:'9vmin', fontFamily:'heading', color:'Teal1', textAlign:'right', marginX:'2vmin', gridArea:'name', justifySelf:'end', alignSelf:'end', lineHeight:'9vmin'}}>
      Lauren Davidson
    </div>
  )
}

const TextFlex = ({horizontal}) => {
  return (
    <div sx={{height: horizontal ? 'auto' : '100%',width:'100%',display:'flex',flexDirection: horizontal ? 'row' : 'column', gridArea: horizontal ? 'horz' : 'vert', justifySelf: horizontal ? 'end' : 'start', alignSelf: horizontal ? 'start' : 'end', justifyContent:'space-between', paddingX: horizontal ? '2vmin' : 0}}>
      <TextBlock id ={horizontal ? 'developerH' : 'developerV'}  text='developer'/>
      {horizontal &&
        <>
          <TextBlock text='<'/>
          <Line></Line>
          <TextBlock text='>'/>
        </>
      }
      <TextBlock id ={horizontal ? 'educatorH' : 'educatorV'} text='educator'/>
      {horizontal &&
        <>
          <TextBlock text='<'/>
          <Line></Line>
          <TextBlock text='>'/>
        </>
      }
      <TextBlock id ={horizontal ? 'philosopherH' : 'philosopherV'} text='philosopher'/>
    </div>
  )
}

const Line = () => {
  return(
    <div sx={{color:'Teal1'}}>
    </div>
  )
}

const TextBlock = ({text, id}) => {
  return(
    <div
      id={id}
      className='subtitle'
      sx={{height:'auto',width:'auto',fontFamily:'heading', fontSize:'2.5vmin',color:'Teal1'}}
    >
      {text}
    </div>

  )
}

const Splash = () => {
  const [horizontal, setHorizontal] = useState(true)
  const getPositions = (el) => {
    const subtitles = el.getElementsByClassName('subtitle')
    const subArray = Array.from(subtitles).filter(item => item.id)
    const numbers = subArray.map(item => {
      return [item.id,item.getBoundingClientRect()]
    }).reduce((acc, item)=>{return {...acc, [item[0]]:item[1]}},{})
    console.log(numbers)
  }
  return(
    <div
      sx={{height:'100%',width:'100%',backgroundColor:'#131438'}}
    >
      <div
        sx={{height:'100%',width:'100%',backgroundImage:`url(${testPng})`, isolation: 'isolate'}}
      >
        <div sx={{height:'100%',width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <div ref={el => getPositions(el)} sx={{height:'auto', width:'85vmin', display:'grid', gridTemplateAreas:"'name vert' 'horz .'"}}>
            <Name />
            <TextFlex horizontal/>
            <TextFlex/>
          </div>
        </div>
        <Cursor />
      </div>
    </div>
  )

}

export default Splash
