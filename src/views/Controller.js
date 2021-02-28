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
  console.log(eDelta.current)
  console.log(yPos)

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
      prevYPercent.current = parseFloat((-nextY/(yMax)).toFixed(4))
      setYPos({px:-nextY,percent:parseFloat((-nextY/(yMax)).toFixed(4))})
    }
    const requestTick = () => {
      if (!ticking.current && !resize.current) {
        requestAnimationFrame(calculateScroll)
      }
      ticking.current = true
    }
    const handleWheel = e => {
      eDelta.current = parseFloat((e.deltaY * wheelMultiplier).toFixed(4))
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

  const interpolateScrollDown = (target,step=200,buffer=.01) => {
    const yMax = yMultiplier*prevSize.current.height
    const nextY = prevY.current - step
    prevY.current = nextY
    prevYPercent.current = parseFloat((-nextY/(yMax)).toFixed(4))
    if (prevYPercent.current > target+buffer) {
      prevY.current = -target*yMax
      prevYPercent.current = target
      setYPos({px:-target*yMax,percent:target})
      return
    }
    setYPos({px:-nextY,percent:parseFloat((-nextY/(yMax)).toFixed(4))})
    if (prevYPercent.current < target+buffer) {
      requestAnimationFrame(() => interpolateScrollDown(target))
    }
  }
  const interpolateScrollUp = (target,step=200,buffer=.01) => {
    const yMax = yMultiplier*prevSize.current.height
    const nextY = prevY.current + step
    prevY.current = nextY
    prevYPercent.current = parseFloat((-nextY/(yMax)).toFixed(4))
    if (prevYPercent.current < target-buffer) {
      prevY.current = -target*yMax
      prevYPercent.current = target
      setYPos({px:-target*yMax,percent:target})
      return
    }
    setYPos({px:-nextY,percent:parseFloat((-nextY/(yMax)).toFixed(4))})
    if (prevYPercent.current > target-buffer) {
      requestAnimationFrame(() => interpolateScrollUp(target))
    }
  }
  const scrollTo = target => {
    if (prevYPercent.current < target) {
      requestAnimationFrame(() => interpolateScrollDown(target))
      return
    }
    requestAnimationFrame(() => interpolateScrollUp(target))
  }

  return (
    <Y.Provider value={yPos.percent}>
      <Layout size={prevSize.current} scrollTo={scrollTo} />
    </Y.Provider>
  )
}
