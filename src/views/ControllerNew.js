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
  const globalYPercent = (-globalYPos)/height

  const mQs = {or: '(orientation: portrait)', mot: '(prefers-reduced-motion)'}
  const mediaVals = useMediaQueries(mQs)

  return (
    <Background yPos={globalYPos}>
      <Splash
        init={false}
        yPos={globalYPos}
        />
      {globalYPercent > 0.25 && <Developer />}
    </Background>
  )
}

export default Controller
