/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useCallback,
  useRef,
  useState
} from 'react'
import { useElementScroll } from 'framer-motion'
import {
  disableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock'
import Cursor from './Cursor'
import peirce from '../assets/fixationOfBelief'
import Splash from './SplashNew'


const Controller = () => {
  const scrollTarget = useRef(null)
  const { scrollYProgress, scrollY } = useElementScroll(scrollTarget)
  const [progress, setProgress] = useState(0)
  scrollY.onChange(setProgress)
  const horizontal = progress === 0 ? true : false
  const init = useRef(true)

  useEffect(() => {
    if (scrollTarget.current) {
      disableBodyScroll(scrollTarget.current, {reserveScrollBarGap: true})
      init.current = false
    }
    return () => clearAllBodyScrollLocks()
  }, [scrollTarget])

  return (
    <div
      ref={scrollTarget}
      sx={{
        height: '100vh',
        width: '100vw',
        bg: 'DarkPurple1',
        overflow:'scroll',
      }}
      >
      <div
        sx={{
          height:'max-content',
          width:'100vw',
          isolation: 'isolate',
        }}>
        <div
          sx={{
            height:'200vh', //remember to calibrate this after content is all in
            width:'100%',
            fontFamily:'heading',
            fontSize:'teensy',
            color:'DarkPurple1',
            zIndex:'-100',
          }}>
            {peirce}
        </div>
        <Cursor />
      </div>
      <Splash
        horizontal={horizontal}
        init={init.current}
        progress={progress > 100 ? progress-100 : 0}
        />
    </div>
  )
}

export default Controller
