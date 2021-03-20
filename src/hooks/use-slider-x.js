import {
  useState,
  useEffect
} from 'react'
import useSize from './use-debounced-window-size'

//rename useCarousel?
const useSliderX = (widths, globalY, even=false) => {
  const {
    pW,
    dW,
    eW,
    flexW,
  } = widths
  const size = useSize().width
  const [pX, setPX] = useState(0)
  const [eX, setEX] = useState(0)
  const [dX, setDX] = useState(0)

  useEffect(() => {
    const getPosOrder = (middle, left, right, type) => {
      const one = type === 'd' ? middle : type === 'e' ? right : left
      const three = type === 'd' ? left : type === 'e' ? middle : right
      const five = type === 'd' ? right : type === 'e' ? left : middle
      return { one, three, five }
    }
    const getXs = (width, type, even) => {
      if (even) {
        const onLeft = type === 'd' ? pW : type === 'e' ? dW : eW
        const gap = (flexW - (pW+eW+dW))/2
        const left = (size/2 - flexW/2).toFixed(2)
        const middle = ((size/2 - flexW/2) + gap + onLeft).toFixed(2)
        const right = (size/2 + flexW/2 - width).toFixed(2)
        return getPosOrder(middle, left, right, type)
      }
      const middle = (size/2 - width/2).toFixed(2)
      const left = (size/2 - flexW/2).toFixed(2)
      const right = (size/2 + flexW/2 - width).toFixed(2)
      return getPosOrder(middle, left, right, type)
    }

    if (globalY === 0) {
      setPX(getXs(pW, 'p', even))
      setEX(getXs(eW, 'e', even))
      setDX(getXs(dW, 'd', even))
    }
  }, [globalY, size, dW, eW, pW, flexW])

  return { pX, eX, dX }
}

export default useSliderX
