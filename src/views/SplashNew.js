/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import scrollama from 'scrollama'
import Name from './Name'
import { TextFlex, Slider } from './Subtitles'
import theme from '../theme'
import useWindowSize from '../hooks/useWindowSize'


export default function Splash({ toVert, reverse }) {
  const [horizontal, setHorizontal] = useState(true)
  const name = useRef(null)
  const [namePos, setNamePos] = useState(null)
  const size = useWindowSize()
  const [philosopherDims, setPhilosopherDims] = useState({})
  const [educatorDims, setEducatorDims] = useState({})
  const [developerDims, setDeveloperDims] = useState({})

  const [pHx, setPHx] = useState(0)
  const [eHx, setEHx] = useState(0)
  const [dHx, setDHx] = useState(0)

  useEffect(() => {
    if (toVert) {
      setHorizontal(false)
      setTimeout(() => document.body.style.overflow = 'scroll', 2000)
      return
    }
    if (reverse) {
      setHorizontal(true)
      setTimeout(() => document.body.style.overflow = 'hidden', 2000)
      return
    }
  }, [toVert, reverse])


  useEffect(()=>{
    if (philosopherDims && educatorDims && developerDims && namePos){
      const getRolePos = () => {
        const totalWidth = philosopherDims.width + educatorDims.width + developerDims.width
        const emptySpace = namePos.width - totalWidth
        console.log(emptySpace);
        const spacer = emptySpace / 2
        console.log(spacer);
        return {eHx:namePos.x+philosopherDims.width+spacer,dHx: namePos.x+philosopherDims.width + educatorDims.width + 2*spacer}
      }
      setPHx(namePos.x)
      setEHx(getRolePos().eHx)
      setDHx(getRolePos().dHx)
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


  useLayoutEffect(() => {
    if (name.current) {
      const rect = name.current.getBoundingClientRect()
      setNamePos({x: rect.x, width: rect.width})
    }
  }, [size, name])

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
          top:0,
          left:0,
        }}>
        <div
          ref={name}
          sx={{
            fontSize:'7vw',
            fontFamily:'heading',
            color:'Teal1', textAlign:'right',
            gridArea:'name',
            justifySelf:'center',
            alignSelf:'center',
            lineHeight:'9vmin',
            width: 'auto',
            pb: '10vmin'
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
            reverse={reverse}
            />
          <Slider
            type='educator'
            hx={eHx}
            hy={size.height*.52}
            vx={window.innerWidth/2+namePos.width/2+20}
            vy={size.height*.44}
            horizontal={horizontal}
            ref={educator}
            reverse={reverse}
            />
          <Slider
            type='developer'
            hx={dHx}
            hy={size.height*.52}
            vx={window.innerWidth/2+namePos.width/2+20}
            vy={size.height*.36}
            horizontal={horizontal}
            ref={developer}
            reverse={reverse}
            />
        </>
      }

    </>

  )
}
