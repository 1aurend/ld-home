import {
  useLayoutEffect,
  useRef,
  useState
 } from 'react'
import useSize from './use-debounced-window-size'


export default function useBoundingBox(ref, y) {
  const size = useSize()
  const prevSize = useRef({height:null,width:null})
  const [hX, setHX] = useState()
  const [hY, setHY] = useState()
  const [width, setWidth] = useState()

  useLayoutEffect(() => {
    if ((size.width !== prevSize.current.width || size.height !== prevSize.current.height) || y === 0) {
      if (ref && y === 0) {
        const rect = ref.getBoundingClientRect()
        setHX(rect.left)
        setHY(rect.top)
        setWidth(rect.width)
        prevSize.current = size
      }
    }
  }, [y, ref, size])

  return { hX, hY, width }
}
//have this return an array??
