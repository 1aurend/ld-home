/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect
} from 'react'
import Name from './Name'
import { TextFlex, Slider } from './Subtitles'


const Splash = ({toVert}) => {
  const [horizontal, setHorizontal] = useState(true)
  const [textPos, setTextPos] = useState(null)
  const [sticky, setSticky] = useState(false)

  const getPositions = useCallback( (el) => {
    const subtitles = document.getElementsByClassName('subtitle')
    const subArray = Array.from(subtitles).filter(item => item.id)
    const numbers = subArray
      .map(item => {return [item.id,item.getBoundingClientRect()]})
      .reduce((acc, item)=>{return {...acc, [item[0]]:item[1]}},{})
    setTextPos(numbers)
  },[setTextPos])

  useEffect(() => {
    if (toVert) {
      setHorizontal(false)
      setTimeout(() => document.body.style.overflow = 'scroll', 2000)
      setTimeout(() => setSticky(true), 2000)
    }
  }, [toVert])

  return(
    <>
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
      sticky={sticky}
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
    </>
  )
}

export default Splash
