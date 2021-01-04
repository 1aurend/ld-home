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
  const [horizontal, setHorizontal] = useState(true)
  const scrollama = useRef(null)
  console.log(scrollama.current)
  const init = useRef(true)

  const splashAnimation = (type, response) => {
    console.log(type)
    console.log(response)
    if (type === 0) {
      if (horizontal) {
        init.current = false
        window.removeEventListener('wheel', wheelCb)
        setHorizontal(false)
        setTimeout(() => onVert(), 2000)
        return
      }
      return
    }
    if (type === 1) {
      if (response.direction === 'up') {
        setHorizontal(true)
        setTimeout(() => onReset(), 2000)
        return
      }
      return
    }
  }
  const wheelCb = splashAnimation.bind(null, 0)
  const onVert = () => {
    document.body.style.overflow = 'scroll'
    scrollama.current = createScrollamaTrigger({offset:.99, enter: splashAnimation.bind(null, 1), id: 'splash'})
  }
  const onReset = () => {
    document.body.style.overflow = 'hidden'
    scrollama.current.destroy()
    window.addEventListener('wheel', wheelCb)
  }

  // const reverseAnim = useCallback(response => {
  //   if (window.scrollY < 50 && response.direction === 'up') {
  //     scrollama.current?.destroy()
  //     setToVert(false)
  //     setReverse(true)
  //   }
  // }, [])
  //
  // const handleAnimation = useCallback(e => {
  //   e.preventDefault()
  //   if (!toVert) {
  //     setToVert(true)
  //     setReverse(false)
  //   }
  //   window.removeEventListener('wheel', handleAnimation)
  //   setTimeout(() => scrollama.current = createScrollamaTrigger({offset:.95, enter: reverseAnim, id: 'splash'}), 2000)
  // }, [toVert, reverseAnim])
  //
  // useEffect(() => {
  //   if (reverse) {
  //     setTimeout(() => window.addEventListener('wheel', handleAnimation), 2000)
  //   }
  // }, [reverse, handleAnimation])
  //
  // useEffect(() => {
  //   window.addEventListener('load', () => {window.scrollTo(0,0)})
  //   window.addEventListener('wheel', handleAnimation)
  //   window.addEventListener('wheel', splashAnimation.bind(null, 0))
  //   return () => window.removeEventListener('wheel', handleAnimation)
  // }, [])

  useEffect(() => {
    window.addEventListener('load', () => {window.scrollTo(0,0)})
    window.addEventListener('wheel',  wheelCb)
    return () => window.removeEventListener('wheel', wheelCb)
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
          horizontal={horizontal}
          init={init.current}
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
