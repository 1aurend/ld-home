/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import peirce from '../assets/fixationOfBelief'
import Name from './Name'
import Cursor from './Cursor'
import { TextFlex, Slider } from './Subtitles'
import useScrollAnimation from '../hooks/useScrollAnimation'


const Splash = () => {
  const [horizontal, setHorizontal] = useState(true)
  const [textPos, setTextPos] = useState(null)
  useScrollAnimation(1, window.innerHeight, setHorizontal, horizontal)

  const getPositions = useCallback( (el) => {
    const subtitles = document.getElementsByClassName('subtitle')
    const subArray = Array.from(subtitles).filter(item => item.id)
    const numbers = subArray
      .map(item => {return [item.id,item.getBoundingClientRect()]})
      .reduce((acc, item)=>{return {...acc, [item[0]]:item[1]}},{})
    setTextPos(numbers)
  },[setTextPos])

  return(
    <div
      sx={{
        height:'100%',
        width:'100%',
        backgroundColor:'DarkPurple1',
        position:'sticky'
      }}>
      <div
        sx={{
          height:'100%',
          width:'100%',
          isolation: 'isolate',
        }}>
        <div
          sx={{
            height:'100%',
            width:'100%',
            position:'absolute',
            overflow:'hidden',
            fontFamily:'heading',
            fontSize:'teensy',
            color:'DarkPurple1',
            zIndex:'-100'}}
            >
            {peirce}
          </div>
        <div
          sx={{
            height:'100%',
            width:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'}}
            >
          <div
            ref={getPositions}
            sx={{
              height:'auto',
              width:'85vmin',
              display:'grid',
              gridTemplateAreas:"'name vert' 'horz .'",
              gridTemplateRows:'18vmin 18vmin'
            }}>
            <Name horizontal={horizontal}/>
            <TextFlex horizontal={true}/>
            <TextFlex horizontal={false}/>
          </div>
        </div>
        <Slider
          type='developer'
          hx={textPos?.developerH.x}
          hy={textPos?.developerH.y}
          vx={textPos?.developerV.x}
          vy={textPos?.developerV.y}
          horizontal={horizontal}
          />
        <Slider
          type='educator'
          hx={textPos?.educatorH.x}
          hy={textPos?.educatorH.y}
          vx={textPos?.educatorV.x}
          vy={textPos?.educatorV.y}
          horizontal={horizontal}
          />
        <Slider
          type='philosopher'
          hx={textPos?.philosopherH.x}
          hy={textPos?.philosopherH.y}
          vx={textPos?.philosopherV.x}
          vy={textPos?.philosopherV.y}
          horizontal={horizontal}
          />
        <Cursor />
      </div>
    </div>
  )
}

export default Splash
