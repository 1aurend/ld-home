/** @jsxImportSource theme-ui */
import React, {forwardRef} from 'react'
import { keyframes } from '@emotion/react'


export const Slider = forwardRef((props, ref) => {
  const {type, hx=0, hy=0, vx=0, vy=0, horizontal, hidden, reverse} = props
  const dX = vx-hx
  const dY = vy-hy
  const displacement = Math.abs(dX)+Math.abs(dY)
  const speedFactor = 2.5
  const speed = `${displacement*speedFactor}ms`
  const reverseSpeed = type === 'philosopher' ? '900ms' : type === 'educator' ? '1000ms' : '1200ms'
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
  const reverseAnim = keyframes({
    '0%': {
      transform: `translate(${dX}px,${dY}px)`
    },
    '20%': {
      transform: type === 'philosopher' ? `translate(${dX*.6}px,0px)` : type === 'educator' ? `translate(${dX}px,0px)` : `translate(${dX}px,${dY*.5}px)`
    },
    '60%': {
      transform: type === 'developer' ? `translate(${dX}px,0px)` : ``
    },
    '100%': {
      transform: `translate(0px, 0px)`
    }
  })
  return (
    <div
      ref={ref}
      className='slider'
      sx={{
        position: 'fixed',
        left: hx,
        top: hy,
        animation: !horizontal ? `${animation} ${speed} linear normal forwards` : `${reverseAnim} ${reverseSpeed} linear normal forwards`,
        visibility: hidden ? 'hidden' : 'visible'
      }}>
      <TextBlock text={type} color={'Orange1'}/>
    </div>
  )
})

export const TextFlex = ({horizontal}) => {
  return (
    <div
      sx={{
        visibility:'visible',
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
