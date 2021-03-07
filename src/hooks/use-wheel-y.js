import {
  useState,
  useEffect,
  useRef
} from 'react'


export default function useWheelY(yMultiplier=10, wheelMultiplier=1, size, target=0) {
  const prevSize = useRef({width:window.innerWidth,height: window.innerHeight})
  const ticking = useRef(false)
  const eDelta = useRef(0)
  const prevY = useRef(0)
  const prevYPercent = useRef(0)
  const [y, setYPos] = useState({px:0,percent:0})
  const yMax = yMultiplier*prevSize.current.height

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
      if (!ticking.current) {
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
  },[wheelMultiplier, yMultiplier])

  useEffect(() => {
    if (size) {
      if (size.height !== prevSize.current.height || size.width !== prevSize.current.width) {
        prevSize.current = size
        prevY.current = -target*yMax
        prevYPercent.current = target
        setYPos({px:-target*yMax,percent:target})
      }
    }
  }, [size, yMax, target])

  const interpolateScrollDown = (target,step=200,buffer=.01) => {
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
      requestAnimationFrame(() => interpolateScrollDown(target, step, buffer))
    }
  }
  const interpolateScrollUp = (target,step=200,buffer=.01) => {
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
      requestAnimationFrame(() => interpolateScrollUp(target, step, buffer))
    }
  }
  const scrollTo = (target, step, buffer) => {
    if (prevYPercent.current < target) {
      requestAnimationFrame(() => interpolateScrollDown(target, step, buffer))
      return
    }
    requestAnimationFrame(() => interpolateScrollUp(target, step, buffer))
  }

  return { y, scrollTo }
}
