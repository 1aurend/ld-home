/** @jsxImportSource theme-ui */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react'
import Splash from './SplashNew'
import Cursor from './Cursor'
import peirce from '../assets/fixationOfBelief'


export default function Controller({ children }) {
  const [toVert, setToVert] = useState(false)

  const handleAnimation = useCallback(e => {
    e.preventDefault()
    if (!toVert) {
      setToVert(true)
    }
    return () => window.removeEventListener('wheel', handleAnimation)
  }, [toVert])

  useEffect(() => {
    window.addEventListener('load', () => {window.scrollTo(0,0)})
    window.addEventListener('wheel', handleAnimation)
  }, [handleAnimation])

  return (
    <div
      sx={{
        height:'max-content',
        width:'100%',
        bg:'DarkPurple1',
        position:'relative',
      }}>
      <div
        sx={{
          height:'100vh',
          width:'100%',
          isolation: 'isolate',
        }}>
        <div
          sx={{
            height:'200vh',
            width:'100%',
            position:'absolute',
            overflow:'hidden',
            fontFamily:'heading',
            fontSize:'teensy',
            color:'DarkPurple1',
            zIndex:'-100'
          }}>
            {peirce}
          </div>
        <Cursor />
        <Splash
          toVert={toVert}
          />
        </div>
        <div
          sx={{
            height:'100vh',
            width:'100%',
          }}>
        </div>
    </div>
  )
}
