/** @jsxImportSource theme-ui */
import React, {useState, useEffect, useCallback, useRef} from 'react'
import { jsx } from 'theme-ui'
import { css, keyframes } from '@emotion/react'
import testPng from '../assets/text1.png'

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

const Name = ({horizontal}) => {
  return(
    <div sx={{fontSize:'9vmin', fontFamily:'heading', color:'Teal1', textAlign:'right', marginX:'2vmin', gridArea:'name', justifySelf:'end', alignSelf:'end', lineHeight:'9vmin', width: horizontal ? '100%' : '50%'}}>
      Lauren Davidson
    </div>
  )
}

const Slider = ({type, hx=0, hy=0, vx=0, vy=0, horizontal}) => {
  const animation = keyframes({
    '0%': {
      transform: 'translate(0px,0px)'
    },
    '50%': {
      transform: `translate(${vx-hx}px,0px)`
    },
    '100%': {
      transform: `translate(${vx-hx}px,${vy-hy}px)`
    }
  })
  return (
    <div sx={{position:'absolute', left:hx, top:hy, animation: !horizontal ? `${animation} 1s linear normal forwards` : 'none'}}>
      <TextBlock text={type}/>
    </div>
  )
}



const TextFlex = ({horizontal}) => {
  return (
    <div sx={{visibility:'hidden', height: horizontal ? 'auto' : '100%',width:'100%',display:'flex',flexDirection: horizontal ? 'row-reverse' : 'column', gridArea: horizontal ? 'horz' : 'vert', justifySelf: horizontal ? 'end' : 'start', alignSelf: horizontal ? 'start' : 'end', justifyContent:'space-between', paddingX: horizontal ? '2vmin' : 0}}>
      <TextBlock id ={horizontal ? 'developerH' : 'developerV'}  text='developer'/>
      {horizontal &&
        <>
          <TextBlock text='>'/>
          <Line></Line>
          <TextBlock text='<'/>
        </>
      }
      <TextBlock id ={horizontal ? 'educatorH' : 'educatorV'} text='educator'/>
      {horizontal &&
        <>
          <TextBlock text='>'/>
          <Line></Line>
          <TextBlock text='<'/>
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

const TextBlock = ({text, id, color='Teal1'}) => {
  return(
    <div
      id={id}
      className='subtitle'
      sx={{height:'auto',width:'auto',fontFamily:'heading', fontSize:'2.5vmin',color:color}}
    >
      {text}
    </div>

  )
}



const Splash = () => {
  const [horizontal, setHorizontal] = useState(true)
  const [textPos, setTextPos] = useState(null)
  const triggerAnimation = () => {
    setHorizontal(!horizontal)
    console.log(horizontal);
  }
  const getPositions = useCallback( (el) => {
    const subtitles = document.getElementsByClassName('subtitle')
    const subArray = Array.from(subtitles).filter(item => item.id)
    const numbers = subArray.map(item => {
      return [item.id,item.getBoundingClientRect()]
    }).reduce((acc, item)=>{return {...acc, [item[0]]:item[1]}},{})
    console.log(numbers);
    setTextPos(numbers)
  },[setTextPos])

  return(
    <div
      sx={{height:'100%',width:'100%',backgroundColor:'#131438'}}
    >
      <div
        sx={{height:'100%',width:'100%',backgroundImage:`url(${testPng})`, isolation: 'isolate'}}
      >
        <div sx={{height:'100%',width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <div sx={{height:'50px', width:'50px', backgroundColor:'red'}} onClick={()=>triggerAnimation()}></div>
          <div ref={getPositions} sx={{height:'auto', width:'85vmin', display:'grid', gridTemplateAreas:"'name vert' 'horz .'", gridTemplateRows:'18vmin auto', }}>
            <Name horizontal={horizontal}/>
            <TextFlex horizontal={true}/>
            <TextFlex horizontal={false}/>
          </div>
        </div>
        <Cursor />
        <Slider type='developer' hx={textPos?.developerH.x}  hy={textPos?.developerH.y} vx={textPos?.developerV.x} vy={textPos?.developerV.y} horizontal={horizontal}/>
        <Slider type='educator' hx={textPos?.educatorH.x}  hy={textPos?.educatorH.y} vx={textPos?.educatorV.x} vy={textPos?.educatorV.y} horizontal={horizontal}/>
        <Slider type='philosopher' hx={textPos?.philosopherH.x}  hy={textPos?.philosopherH.y} vx={textPos?.philosopherV.x} vy={textPos?.philosopherV.y} horizontal={horizontal}/>
      </div>
    </div>

  )

}

export default Splash
