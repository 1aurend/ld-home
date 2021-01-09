/** @jsxImportSource theme-ui */
import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import Splash from './SplashFramer'
import Cursor from './Cursor'
import peirce from '../assets/fixationOfBelief'
import createScrollamaTrigger from '../utils/createScrollamaTrigger'
import { useElementScroll } from 'framer-motion'


export default function Controller({ children }) {
  const [horizontal, setHorizontal] = useState(true)
  const scrollama = useRef(null)
  const init = useRef(true)
  const ref = useRef()
  const { scrollYProgress } = useElementScroll(ref)
  console.log(scrollYProgress)

  const splashAnimation = (type, response) => {
    if (type === 0) {
      if (horizontal) {
        init.current = false
        window.removeEventListener('wheel', wheelCb.current)
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
  const wheelCb = useRef(splashAnimation.bind(null, 0))
  const onVert = () => {
    // document.body.style.overflow = 'scroll'
    scrollama.current = createScrollamaTrigger({offset:.99, enter: splashAnimation.bind(null, 1), id: 'splash'})
  }
  const onReset = () => {
    document.body.style.overflow = 'hidden'
    scrollama.current.destroy()
    window.addEventListener('wheel', wheelCb.current)
  }

  useEffect(() => {
    const callback = wheelCb.current
    window.addEventListener('load', () => {window.scrollTo(0,0)})
    window.addEventListener('wheel',  wheelCb.current)
    return () => window.removeEventListener('wheel', callback)
  }, [])

  return (
    <div
      ref={ref}
      sx={{
        height:'max-content',
        width:'100%',
        bg:'DarkPurple1',
        position:'relative',
        overflow:'scroll',
        tabIndex: 0
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
