/** @jsxImportSource theme-ui */
import React from 'react'
import { keyframes } from '@emotion/react'


export const Slider = ({type, hx=0, hy=0, vx=0, vy=0, horizontal}) => {
  const dX = vx-hx
  const dY = vy-hy
  const displacement = Math.abs(dX)+Math.abs(dY)
  const speedFactor = 2.5
  const speed = `${displacement*speedFactor}ms`
  const animation = keyframes({
    '0%': {
      transform: 'translate(0px,0px)'
    },
    '80%': {
      transform: `translate(${dX}px,0px)`
    },
    '100%': {
      transform: `translate(${dX}px,${dY}px)`
    }
  })
  return (
    <div
      sx={{
        position:'absolute',
        left:hx,
        top:hy,
        animation: !horizontal ? `${animation} ${speed} linear normal forwards` : 'none'
      }}>
      <TextBlock text={type}/>
    </div>
  )
}

export const TextFlex = ({horizontal}) => {
  return (
    <div
      sx={{
        visibility:'hidden',
        height: horizontal ? 'auto' : '100%',
        width:'100%',
        display:'flex',
        flexDirection: horizontal ? 'row-reverse' : 'column',
        gridArea: horizontal ? 'horz' : 'vert',
        justifySelf: horizontal ? 'end' : 'start',
        alignSelf: horizontal ? 'start' : 'end',
        justifyContent:'space-between',
        paddingX: horizontal ? '2vmin' : 0
      }}>
      <TextBlock id={horizontal ? 'developerH' : 'developerV'}  text='developer'/>
      {horizontal &&
        <>
          <TextBlock text='>'/>
          <Line></Line>
          <TextBlock text='<'/>
        </>
      }
      <TextBlock id={horizontal ? 'educatorH' : 'educatorV'} text='educator'/>
      {horizontal &&
        <>
          <TextBlock text='>'/>
          <Line></Line>
          <TextBlock text='<'/>
        </>
      }
      <TextBlock id={horizontal ? 'philosopherH' : 'philosopherV'} text='philosopher'/>
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
      sx={{
        height:'auto',
        width:'auto',
        fontFamily:'heading',
        fontSize:'2.5vmin',
        color:color
      }}>
      {text}
    </div>

  )
}
