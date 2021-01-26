import {
  useState,
  useEffect,
  useRef
} from 'react'
import useDebounceWindowSize from './useDebounceWindowSize'
import Controller from '../views/NoScrollController'

const animList = [
  {min:0, max:.13},
  {min:.13, max:.6}
]


export default function WheelY() {
  const size = useDebounceWindowSize()
  const prevSize = useRef({width:window.innerWidth,height: window.innerHeight})
  const ticking = useRef(false)
  const resize = useRef(false)
  const eDelta = useRef(0)
  const prevY = useRef(0)
  const prevYPercent = useRef(0)
  const [yPos, setYPos] = useState({px:0,percent:0})

  // console.log(prevSize.current)

  const getSnapToPercent = (y, animList) => {
    const currentAnim = animList.filter(anim => y >= anim.min && y <= anim.max)
    return currentAnim[0]? currentAnim[0].min : 1
  }

  // const calculateGlobalY = (state, action) => {
  //   switch (action.type) {
  //   case 'wheel':
  //     console.log('wheel')
  //     return calculateScroll()
  //   case 'resize':
  //     console.log('resize')
  //     return snapToAnimStart()
  //   default:
  //     alert('something went wrong: unable to calculate Y')
  //   }
  // }

  // const createScroll = () => setYPos({type:'wheel'})

  useEffect(()=>{
    const calculateScroll = () => {
      const yMax = 4*prevSize.current.height
      ticking.current = false
      if (prevY.current - eDelta.current > 0) {
        console.log('max')
        prevY.current = 0
        prevYPercent.current = 0
        setYPos({px:0,percent:0})
        return
      }
      if ((prevY.current - eDelta.current) < -(yMax)) {
        console.log('min')
        prevY.current = -(yMax)
        prevYPercent.current = 1
        setYPos({px:yMax,percent:1})
        return
      }
      console.log('calc')
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
      // console.log(e)
      requestTick()
    }
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  },[])

  useEffect(() => {
    const snapToAnimStart = () => {
      console.log('snap')
      const snapToPercent = getSnapToPercent(prevYPercent.current, animList)
      console.log(snapToPercent)
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

  return <Controller globalYPos={yPos} size={prevSize.current} />
}
