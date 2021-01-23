/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useCallback,
  useRef,
  useState
} from 'react'
import Splash from './SplashNew'
import Developer from './Developer'
// import useMediaQueries from '../hooks/useMediaQueries'
import useRAFWindowSize from '../hooks/useRAFWindowSize'
import Background from './Background'
import useWheelY from '../hooks/useWheelY'
import Name from './Name'
import { TextBlock } from './Subtitles'


const Controller = () => {
  const globalYPos = useWheelY()
  const height = useRAFWindowSize().height
  const globalYPercent = (globalYPos)/(4*height)

  // const mQs = {or: '(orientation: portrait)', mot: '(prefers-reduced-motion)'}
  // const mediaVals = useMediaQueries(mQs)

  return (
    <Background yPos={globalYPos}>
      <main
        id='splash'
        sx={{
          height:'100vh',
          width:'100vw',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          position:'absolute',
          top:0,
          opacity: 1,
          left:0,
        }}>
        <section
          id='splash'
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            width:'max-content',
            opacity: 1,
            height:'100vh',
          }}
          >
          <Name yPos={globalYPos}/>
          <div
            id='sliders'
            sx={{
              display:'flex',
              justifyContent:'space-between',
            }}
            >
            <TextBlock text='philosopher' color={'Orange1'}/>
            <TextBlock text='educator' color={'Orange1'}/>
            <TextBlock text='developer' color={'Orange1'}/>
          </div>
        </section>
      </main>
      {/*<Splash yPos={globalYPos}/>*/}
      {globalYPercent > 0.125 && <Developer yPercent={globalYPercent}/>}
    </Background>
  )
}

export default Controller
