import {
  useState,
  useEffect,
  useRef
} from 'react'
import useDebounceWindowSize from '../hooks/useDebounceWindowSize'
import Layout from './Layout'
import animList from './animList'


export default function Controller() {
  const size = useDebounceWindowSize()
  const prevSize = useRef({width:window.innerWidth,height: window.innerHeight})
  const ticking = useRef(false)
  const resize = useRef(false)
  const eDelta = useRef(0)
  const prevY = useRef(0)
  const prevYPercent = useRef(0)
  const [yPos, setYPos] = useState({px:0,percent:0})

  const getSnapToPercent = (y, animList) => {
    const currentAnim = animList.filter(anim => y >= anim.min && y <= anim.max)
    return currentAnim[0]? currentAnim[0].min : 1
  }

  useEffect(()=>{
    const calculateScroll = () => {
      const yMax = 4*prevSize.current.height
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
      eDelta.current = e.deltaY * 1.25
      requestTick()
    }
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  },[])

  useEffect(() => {
    const snapToAnimStart = () => {
      const snapToPercent = getSnapToPercent(prevYPercent.current, animList)
      prevSize.current = size
      prevYPercent.current = snapToPercent
      prevY.current = -snapToPercent*(4*size.height)
      resize.current = false
      setYPos({px:snapToPercent*(4*size.height),percent:snapToPercent})
    }
    if (size.height !== prevSize.current.height || size.width !== prevSize.current.width) {
      resize.current = true
      snapToAnimStart()
    }
  }, [size])

  return <Layout globalYPos={yPos} size={prevSize.current} />
}
