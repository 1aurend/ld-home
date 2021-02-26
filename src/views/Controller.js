import {
  useState,
  useEffect,
  useRef,
  createContext
} from 'react'
import useSize from '../hooks/use-debounced-window-size'
import Layout from './Layout'
import { yMultiplier, wheelMultiplier } from '../assets/sceneList'

export const Y = createContext()


export default function Controller() {
  const size = useSize()
  const prevSize = useRef({width:window.innerWidth,height: window.innerHeight})
  const ticking = useRef(false)
  const resize = useRef(false)
  const eDelta = useRef(0)
  const prevY = useRef(0)
  const prevYPercent = useRef(0)
  const [yPos, setYPos] = useState({px:0,percent:0})

  useEffect(()=>{
    const calculateScroll = () => {
      const yMax = yMultiplier*prevSize.current.height
      ticking.current = false
      if (prevY.current - eDelta.current > 0) {
        prevY.current = 0
        prevYPercent.current = 0
        setYPos({px:0,percent:0})
        return
      }
      if ((prevY.current - eDelta.current) < -(yMax)) {
        prevY.current = -(yMax)
        prevYPercent.current = 1
        setYPos({px:yMax,percent:1})
        return
      }
      const nextY = prevY.current - eDelta.current
      prevY.current = nextY
      prevYPercent.current = -nextY/(yMax)
      setYPos({px:-nextY,percent:-nextY/(yMax)})
    }
    const requestTick = () => {
      if (!ticking.current && !resize.current) {
        requestAnimationFrame(calculateScroll)
      }
      ticking.current = true
    }
    const handleWheel = e => {
      eDelta.current = e.deltaY * wheelMultiplier
      requestTick()
    }
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  },[])

  //make this take a target?
  useEffect(() => {
    if (size.height !== prevSize.current.height || size.width !== prevSize.current.width) {
      prevSize.current = size
      prevY.current = 0
      prevYPercent.current = 0
      setYPos({px:0,percent:0})
    }
  }, [size])

  const interpolateScroll = (target,step=200) => {
    const yMax = yMultiplier*prevSize.current.height
    const nextY = prevY.current - step
    prevY.current = nextY
    prevYPercent.current = -nextY/(yMax)
    setYPos({px:-nextY,percent:-nextY/(yMax)})
    if (prevYPercent.current < target+.01) {
      requestAnimationFrame(() => interpolateScroll(target))
    }
  }
  // TODO: make this work for scrolling up also!
  const scrollTo = target => {
    if (prevYPercent.current < target) {
      requestAnimationFrame(() => interpolateScroll(target))
    }
  }

  return (
    <Y.Provider value={yPos.percent}>
      <Layout size={prevSize.current} scrollTo={scrollTo} />
    </Y.Provider>
  )
}
