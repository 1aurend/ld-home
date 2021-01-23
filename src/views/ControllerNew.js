/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useCallback,
  useRef,
  useState
} from 'react'
import Splash from './SplashNew'
import Developer from './Developer'
import useMediaQueries from '../hooks/useMediaQueries'
import useRAFWindowSize from '../hooks/useRAFWindowSize'
import Background from './Background'
import useWheelY from '../hooks/useWheelY'


const Controller = () => {
  const globalYPos = useWheelY()
  const height = useRAFWindowSize().height
  const globalYPercent = (globalYPos)/(4*height)

  const mQs = {or: '(orientation: portrait)', mot: '(prefers-reduced-motion)'}
  const mediaVals = useMediaQueries(mQs)

  return (
    <Background yPos={globalYPos}>
      <Splash
        yPos={globalYPos}
        />
      {globalYPercent > 0.125 && <Developer yPercent={globalYPercent}/>}
    </Background>
  )
}

export default Controller
