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


export default function Splash({ toVert }) {
  const [horizontal, setHorizontal] = useState(true)
  const canvas = useRef(null)

  const textAnim = useCallback(el => {
    const params = {width: window.innerWidth*.6, height: window.innerHeight*.3}
    const two = new Two(params).appendTo(el)

    const makeSlider = (text, x) => {
      const slider = new Two.Text(text, x, 170)
      slider.alignment = 'left'
      slider.family = 'Della Respira, serif'
      slider.fill = theme.colors.Orange1
      slider.size = 24
      slider.weight = 600
      return slider
    }
    const philosopher = makeSlider('philosopher', window.innerWidth/12)
    const left1 = makeSlider('<', window.innerWidth/5)
    const right1 = makeSlider('>', window.innerWidth/4)
    const educator = makeSlider('educator', window.innerWidth/3.5)
    const left2 = makeSlider('<', window.innerWidth/2.75)
    const right2 = makeSlider('>', window.innerWidth/2.4)
    const developer = makeSlider('developer', window.innerWidth/2.15)

    two.add(philosopher, educator, developer, left1, right1, left2, right2)
    two.update()
  }, [])

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
          ref={textAnim}
          sx={{
            height:'30vh',
            width:'60vw',
          }}>
        </div>
      </div>
    </>

  )
}
