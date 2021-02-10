/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import TileStack from './TileStack'
// import useMediaQueries from '../hooks/useMediaQueries'
import Background from './Background'
import Name from './Name'
import Slider from './Slider'
import Icons from './Icons'

export const Cursor = React.createContext()


const Layout = ({ globalYPos, size, scrollTo }) => {
  const globalYPercent = globalYPos.percent
  const [showCursor, setShowCursor] = useState(false)

  // const mQs = {or: '(orientation: portrait)', mot: '(prefers-reduced-motion)'}
  // const mediaVals = useMediaQueries(mQs)

  return (
    <Cursor.Provider value={showCursor}>
      <Background yPos={globalYPos} yPercent={globalYPercent}>
        <section
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
          <div
            id='name-width'
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
              <Slider type='philosopher' yPercent={globalYPercent} size={size}/>
              <Slider type='educator' yPercent={globalYPercent} size={size}/>
              <Slider type='developer' yPercent={globalYPercent} size={size}/>
            </div>
          </div>
        </section>
        {globalYPercent >= .05 && <TileStack type='DEVELOPER' yPercent={globalYPercent}/>}
        {globalYPercent >= .40 && <TileStack type='EDUCATOR' yPercent={globalYPercent}/>}
        {globalYPercent >= .75 && <TileStack type='PHILOSOPHER' yPercent={globalYPercent}/>}
        <Icons scrollTo={scrollTo} showCursor={setShowCursor}/>
      </Background>
    </Cursor.Provider>
  )
}

export default Layout
