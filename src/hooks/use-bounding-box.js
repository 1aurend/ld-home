import {
  useEffect,
  useRef,
  useState
 } from 'react'
import useSize from './use-debounced-window-size'


export default function useBoundingBox(ref, y) {
  const size = useSize()
  const prevSize = useRef({height:null,width:null})
  const [hX, setHX] = useState()
  const [hY, setHY] = useState()
  const [bY, setBY] = useState()
  const [width, setWidth] = useState()

  useEffect(() => {
    if ((size.width !== prevSize.current.width || size.height !== prevSize.current.height) || y < .01) {
      if (ref) {
        const rect = ref.getBoundingClientRect()
        setHX(rect.left)
        setHY(rect.top)
        setBY(rect.bottom)
        setWidth(rect.width)
        prevSize.current = size
      }
    }
  }, [y, ref, size])

  return { hX, hY, bY, width }
}
//have this return an array??
