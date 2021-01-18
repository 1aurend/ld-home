/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import { Slider } from './Subtitles'
import useWindowSize from '../hooks/useWindowSize'


export default function Splash({ horizontal, init, progress }) {
  console.log(progress)
  const size = useWindowSize()

  const name = useRef(null)
  const [namePos, setNamePos] = useState(null)

  const [philosopherDims, setPhilosopherDims] = useState({})
  const [educatorDims, setEducatorDims] = useState({})
  const [developerDims, setDeveloperDims] = useState({})

  const [pHx, setPHx] = useState(0)
  const [eHx, setEHx] = useState(0)
  const [dHx, setDHx] = useState(0)
  const hidden = useRef(true)

  useEffect(() => {
    if (name.current) {
      const rect = name.current.getBoundingClientRect()
      setNamePos({x: rect.x, width: rect.width})
    }
  }, [size, name])

  useEffect(()=>{
    if (philosopherDims && educatorDims && developerDims && namePos){
      const getRolePos = () => {
        const totalWidth = philosopherDims.width + educatorDims.width + developerDims.width
        console.log(namePos.width)
        const emptySpace = namePos.width - totalWidth
        console.log(emptySpace);
        const spacer = emptySpace / 2
        console.log(spacer);
        return {eHx:namePos.x+philosopherDims.width+spacer,dHx: namePos.x+philosopherDims.width + educatorDims.width + 2*spacer}
      }
      setPHx(namePos.x)
      setEHx(getRolePos().eHx)
      setDHx(getRolePos().dHx)
      hidden.current = false
    }

  }, [philosopherDims, educatorDims, developerDims, namePos])

  const philosopher = useCallback(el=>{
    if (el){
      const rect = el.getBoundingClientRect()
      setPhilosopherDims({x: rect.x, width: rect.width})
    }
  },[])

  const educator = useCallback(el=>{
    if (el){
      const rect = el.getBoundingClientRect()
      setEducatorDims({x: rect.x, width: rect.width})
    }
  },[])

  const developer = useCallback(el=>{
    if (el){
      const rect = el.getBoundingClientRect()
      setDeveloperDims({x: rect.x, width: rect.width})
    }
  },[])

  return (
    <>
      <div
        id='splash'
        sx={{
          height:'100vh',
          width:'100vw',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          position:'absolute',
          top:`${-progress}px`,
          opacity: 1,
          left:0,
        }}>
        <div
          ref={name}
          sx={{
            fontSize:'min(max(2rem, 7vw), 100px)',
            fontFamily:'heading',
            color:'Teal1',
            textAlign:'right',
            gridArea:'name',
            justifySelf:'center',
            alignSelf:'center',
            lineHeight:'9vmin',
            width:'auto',
            pb:'10vmin',
            boxSizing:'border-box'
          }}>
          Lauren Davidson
        </div>
      </div>
      {namePos &&
        <>
          <Slider
            type='philosopher'
            hx={pHx}
            hy={size.height*.52}
            vx={window.innerWidth/2+namePos.width/2+20}
            vy={size.height*.52}
            horizontal={horizontal}
            ref={philosopher}
            hidden={hidden.current}
            init={init}
            />
          <Slider
            type='educator'
            hx={eHx}
            hy={size.height*.52}
            vx={window.innerWidth/2+namePos.width/2+20}
            vy={size.height*.44}
            horizontal={horizontal}
            ref={educator}
            hidden={hidden.current}
            init={init}
            />
          <Slider
            type='developer'
            hx={dHx}
            hy={size.height*.52}
            vx={window.innerWidth/2+namePos.width/2+20}
            vy={size.height*.36}
            horizontal={horizontal}
            ref={developer}
            hidden={hidden.current}
            init={init}
            />
        </>
      }

    </>

  )
}
