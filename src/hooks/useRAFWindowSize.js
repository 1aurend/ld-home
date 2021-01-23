import {
  useState,
  useEffect,
  useRef
} from 'react'

export default function useRAFSize() {
  const ticking = useRef(false)
  const eDims = useRef({width:window.innerWidth, height:window.innerHeight})
  const [dims, setDims] = useState({width:window.innerWidth, height: window.innerHeight})

  useEffect(()=>{
    const changeSize = () => {
      ticking.current = false
      setDims(eDims.current)
    }
    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(changeSize)
      }
      ticking.current = true
    }
    const handleResize = e => {
      eDims.current = {width:window.innerWidth, height:window.innerHeight}
      requestTick()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  },[])

  return dims
}
