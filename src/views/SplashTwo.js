/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef
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
  const size = useWindowSize()

  useEffect(() => {
    if (!two.current) {
      const params = {width: size.width*.6, height: size.height*.3}
      two.current = new Two(params).appendTo(canvas.current)
    } else {
      two.current.clear()
    }

    const makeSlider = (text, x) => {
      const slider = new Two.Text(text, x, 170)
      slider.alignment = 'left'
      slider.family = 'Della Respira, serif'
      slider.fill = theme.colors.Orange1
      slider.size = 24
      slider.weight = 600
      return slider
    }
    const philosopher = makeSlider('philosopher', size.width/12)
    const left1 = makeSlider('<', size.width/5)
    const right1 = makeSlider('>', size.width/4)
    const educator = makeSlider('educator', size.width/3.5)
    const left2 = makeSlider('<', size.width/2.75)
    const right2 = makeSlider('>', size.width/2.4)
    const developer = makeSlider('developer', size.width/2.15)

    two.current.add(philosopher, educator, developer, left1, right1, left2, right2)
    two.current.update()

  }, [size])

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
      <Name horizontal={horizontal}/>
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
        <div
          ref={canvas}
          sx={{
            height:'30vh',
            width:'60vw',
          }}>
        </div>
      </div>
    </>

  )
}
