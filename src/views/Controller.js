/** @jsxImportSource theme-ui */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react'
import Splash from './SplashNew'
import Cursor from './Cursor'
import peirce from '../assets/fixationOfBelief'
import createScrollamaTrigger from '../utils/createScrollamaTrigger'


export default function Controller({ children }) {
  const [toVert, setToVert] = useState(false)
  const [reverse, setReverse] = useState(false)
  const scrollama = useRef(null)

  const reverseAnim = useCallback(response => {
    if (window.scrollY < 50 && response.direction === 'up') {
      scrollama.current?.destroy()
      setToVert(false)
      setReverse(true)
    }
  }, [])

  const handleAnimation = useCallback(e => {
    e.preventDefault()
    if (!toVert) {
      setToVert(true)
      setReverse(false)
    }
    window.removeEventListener('wheel', handleAnimation)
    setTimeout(() => scrollama.current = createScrollamaTrigger({offset:.95, enter: reverseAnim, id: 'splash'}), 2000)
  }, [toVert, reverseAnim])

  useEffect(() => {
    if (reverse) {
      setTimeout(() => window.addEventListener('wheel', handleAnimation), 2000)
    }
  }, [reverse, handleAnimation])

  useEffect(() => {
    window.addEventListener('load', () => {window.scrollTo(0,0)})
    window.addEventListener('wheel', handleAnimation)
    return () => window.removeEventListener('wheel', handleAnimation)
  }, [])

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
          reverse={reverse}
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
