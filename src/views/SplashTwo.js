/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect
} from 'react'
import Two from 'two.js'
import Name from './Name'
import { TextFlex, Slider } from './Subtitles'
import theme from '../theme'
import useWindowSize from '../hooks/useWindowSize'


export default function Splash({ toVert }) {
  const [horizontal, setHorizontal] = useState(true)
  const canvas = useRef(null)
  const two = useRef(null)
  const name = useRef(null)
  const namePos = useRef(null)
  const size = useWindowSize()

  useEffect(() => {
    if (!two.current) {
      const params = {fullscreen: true}
      two.current = new Two(params).appendTo(canvas.current)
    } else {
      two.current.clear()
    }

    const makeSlider = (text, x, align) => {
      const slider = new Two.Text(text, x, size.height*.52)
      slider.alignment = align
      slider.family = 'Della Respira, serif'
      slider.fill = theme.colors.Orange1
      slider.size = 24
      slider.weight = 600
      return slider
    }
    const philosopher = makeSlider('philosopher', namePos.current.x, 'left')
    const left1 = makeSlider('<', namePos.current.x+(namePos.current.width/4), 'right')
    const right1 = makeSlider('>', namePos.current.x+(namePos.current.width/4), 'left')
    const educator = makeSlider('educator', namePos.current.x+(namePos.current.width/2), 'middle')
    const left2 = makeSlider('<', namePos.current.x+(namePos.current.width*.75), 'right')
    const right2 = makeSlider('>', namePos.current.x+(namePos.current.width*.75), 'left')
    const developer = makeSlider('developer', namePos.current.x+namePos.current.width, 'right')

    two.current.add(philosopher, educator, developer, left1, right1, left2, right2)
    two.current.update()

  }, [size])

  useLayoutEffect(() => {
    if (name.current) {
      const rect = name.current.getBoundingClientRect()
      namePos.current = {x: rect.x, width: rect.width}
    }
  }, [size, name])

  return (
    <>
    <div
      sx={{
        height:'100vh',
        width:'100vw',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        zIndex: 1,
        position:'absolute',
        top:0,
        left:0,
      }}>
      <div
        ref={name}
        sx={{
          fontSize:'9vmin',
          fontFamily:'heading',
          color:'Teal1', textAlign:'right',
          marginX:'2vmin',
          gridArea:'name',
          justifySelf:'center',
          alignSelf:'center',
          lineHeight:'9vmin',
          width: 'auto',
          pb:'10vmin'
        }}>
        Lauren Davidson
      </div>
    </div>
      <div
        sx={{
          height:'100vh',
          width:'100vw',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          zIndex:2,
          position:'absolute',
          top:0,
          left:0,
        }}>
        <div ref={canvas}>
        </div>
      </div>
    </>

  )
}
