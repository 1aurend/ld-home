import {
  useReducer,
  useEffect,
  useRef
} from 'react'
import useDebounceWindowSize from './useDebounceWindowSize'

const animList = [
  {min:0, max:.13},
  {min:.13, max:.6}
]


export default function useWheelDelta() {
  const size = useDebounceWindowSize()
  const prevSize = useRef({width:window.innerWidth,height: window.innerHeight})
  const ticking = useRef(false)
  const eDelta = useRef(0)
  const prevY = useRef(0)
  const prevYPercent = useRef(0)
  // console.log(prevSize.current)

  const getSnapToPercent = (y, animList) => {
    const currentAnim = animList.filter(anim => y >= anim.min && y <= anim.max)
    return currentAnim[0]? currentAnim[0].min : 1
  }
  const snapToAnimStart = () => {
    console.log('snap')
    const snapToPercent = getSnapToPercent(prevYPercent.current, animList)
    console.log(snapToPercent)
    prevSize.current = size
    prevYPercent.current = snapToPercent
    prevY.current = -snapToPercent*(4*size.height)
    return {px:snapToPercent*(4*size.height),percent:snapToPercent}
  }

  const calculateScroll = () => {
    const yMax = 4*prevSize.current.height
    ticking.current = false
    if (prevY.current - eDelta.current > 0) {
      console.log('max')
      prevY.current = 0
      prevYPercent.current = 0
      return {px:0,percent:0}
    }
    if ((prevY.current - eDelta.current) < -(yMax)) {
      prevY.current = -(yMax)
      prevYPercent.current = 1
      return {px:yMax,percent:1}
    }
    const nextY = prevY.current - eDelta.current
    prevY.current = nextY
    prevYPercent.current = -nextY/(yMax)
    return {px:-nextY,percent:-nextY/(yMax)}
  }

  const calculateGlobalY = (state, action) => {
    switch (action.type) {
    case 'wheel':
      console.log('wheel')
      return calculateScroll()
    case 'resize':
      console.log('resize')
      return snapToAnimStart()
    default:
      alert('something went wrong: unable to calculate Y')
    }
  }

  const [yPos, setYPos] = useReducer(calculateGlobalY, {px:0,percent:0})

  const createScroll = () => setYPos({type:'wheel'})

  useEffect(()=>{
    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(createScroll)
      }
      ticking.current = true
    }
    const handleWheel = e => {
      eDelta.current = e.deltaY * 1.25
      console.log(e)
      requestTick()
    }
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  },[])

  useEffect(() => {
    if (size.height !== prevSize.current.height || size.width !== prevSize.current.width) {
      setYPos({type:'resize'})
    }
  }, [size])

  return yPos
}
