/** @jsxImportSource theme-ui */
import {
  useState,
  createContext,
  useContext
} from 'react'
import Banner from './landscape/Banner'
import Tiles from './landscape/Tiles'
import useMediaQueries from '../hooks/use-media-queries'
import Background from './Background'
import Name from './landscape/Name'
import MobileName from './portrait/Name'
import Slider from './landscape/Slider'
import MobileSlider from './portrait/Slider'
import MobileSliderFlex from './portrait/SliderFlex'
import DrawingLight from './portrait/Light'
import Icons from './Icons'
import { Y } from './Controller'

export const Cursor = createContext()
export const Test = createContext()


const Layout = ({ scrollTo }) => {
  const yPercent = useContext(Y)
  const [showCursor, setShowCursor] = useState(false)

  const mQs = {
    or: '(orientation: portrait)',
  }
  const mediaVals = useMediaQueries(mQs)

  // if (mediaVals.or) {
  //   return (
  //     <Cursor.Provider value={showCursor}>
  //       <Background>
  //         <section
  //           id='splash'
  //           sx={{
  //             height:'100vh',
  //             width:'100vw',
  //             display:'flex',
  //             flexDirection:'column',
  //             justifyContent:'center',
  //             alignItems:'center',
  //             position:'absolute',
  //             top:0,
  //             opacity: 1,
  //             left:0,
  //           }}>
  //           <div
  //             id='name-width'
  //             sx={{
  //               display:'flex',
  //               flexDirection:'column',
  //               justifyContent:'center',
  //               width:'max-content',
  //               opacity: 1,
  //               height:'100vh',
  //             }}
  //             >
  //             <MobileName />
  //             <div
  //               id='sliders-flex'
  //               sx={{
  //                 width:'80vw',
  //                 display:yPercent >= .05 ? 'flex' : 'none',
  //                 justifyContent:'space-between',
  //                 position:'absolute',
  //                 top:'10vh',
  //                 left:'10vw'
  //               }}
  //               >
  //               <MobileSliderFlex type='philosopher' size={size} color={'Teal1'}/>
  //               <MobileSliderFlex type='educator' size={size} color={'Teal1'}/>
  //               <MobileSliderFlex type='developer' size={size} color={'Teal1'}/>
  //             </div>
  //             <div
  //               id='sliders'
  //               sx={{
  //                 display:'flex',
  //                 flexDirection:'column',
  //                 justifyContent:'space-between',
  //                 alignItems:'flex-end',
  //                 height:'30vmin'
  //               }}
  //               >
  //               <MobileSlider type='philosopher' size={size}/>
  //               <MobileSlider type='educator' size={size}/>
  //               <MobileSlider type='developer' size={size}/>
  //             </div>
  //           </div>
  //         </section>
  //         {yPercent >= .05 && <DrawingLight type='DEVELOPER'/>}
  //         {yPercent >= .05 && <TileStack type='DEVELOPER'/>}
  //         {yPercent >= .40 && <TileStack type='EDUCATOR'/>}
  //         {yPercent >= .75 && <TileStack type='PHILOSOPHER'/>}
  //         <Icons scrollTo={scrollTo} showCursor={setShowCursor}/>
  //       </Background>
  //     </Cursor.Provider>
  //   )
  // }

  return (
    <Cursor.Provider value={showCursor}>
      <Background>
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
            <Name />
            <div
              id='sliders'
              sx={{
                display:'flex',
                justifyContent:'space-between',
              }}
              >
              <Slider
                type='philosopher'
                scrollTo={scrollTo}
                showCursor={setShowCursor}/>
              <Slider
                type='educator'
                scrollTo={scrollTo}
                showCursor={setShowCursor}/>
              <Slider
                type='developer'
                scrollTo={scrollTo}
                showCursor={setShowCursor}/>
            </div>
          </div>
        </section>
        {yPercent >= .02 &&
          <section>
            <Tiles type='developer'/>
            <Banner type='developer'/>
          </section>
        }
        {yPercent >= .36 &&
          <section>
            <Tiles type='educator'/>
            <Banner type='educator'/>
          </section>
        }
        {yPercent >= .70 &&
          <section>
            <Tiles type='philosopher'/>
            <Banner type='philosopher'/>
          </section>
        }
        <Icons scrollTo={scrollTo} showCursor={setShowCursor}/>
      </Background>
    </Cursor.Provider>
  )
}

export default Layout
