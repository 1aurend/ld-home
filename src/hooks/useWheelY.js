import {
  useState,
  useEffect,
  useRef
} from 'react'

export default function useWheelDelta() {
  const ticking = useRef(false)
  const eDelta = useRef(0)
  const prevY = useRef(0)
  const [yPos, setYPos] = useState(0)

  useEffect(()=>{
    const createScroll = () => {
      ticking.current = false
      if (prevY.current - eDelta.current > 0) {
        if (prevY.current === 0) {
          return
        }
        setYPos(0)
        prevY.current = 0
        return
      }
      setYPos(prevY.current - eDelta.current)
      prevY.current = prevY.current - eDelta.current
    }
    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(createScroll)
      }
      ticking.current = true
    }
    const handleWheel = e => {
      eDelta.current = e.deltaY
      requestTick()
    }
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  },[])

  return yPos
}
