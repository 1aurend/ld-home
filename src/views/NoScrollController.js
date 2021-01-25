/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useCallback,
  useRef,
  useState
} from 'react'
import Developer from './Developer'
// import useMediaQueries from '../hooks/useMediaQueries'
import Background from './Background'
import useWheelY from '../hooks/useWheelY'
import Name from './Name'
import Slider from './Slider'


const Controller = () => {
  const globalYPos = useWheelY()
  const globalYPercent = globalYPos.percent

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
          <Name yPercent={globalYPercent}/>
          <div
            id='sliders'
            sx={{
              display:'flex',
              justifyContent:'space-between',
            }}
            >
            <Slider type='philosopher' yPercent={globalYPercent}/>
            <Slider type='educator' yPercent={globalYPercent}/>
            <Slider type='developer' yPercent={globalYPercent}/>
          </div>
        </section>
      </main>
      {globalYPercent > 0.125 && <Developer yPercent={globalYPercent}/>}
    </Background>
  )
}

export default Controller
