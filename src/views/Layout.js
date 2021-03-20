/** @jsxImportSource theme-ui */
import {
  useState,
  createContext,
  useContext,
  useRef,
} from 'react'
import Subhead from './landscape/Subhead'
import Tile from './landscape/Tile'
import useMediaQueries from '../hooks/use-media-queries'
import Background from './Background'
import Name from './landscape/Name'
import MobileName from './portrait/Name'
import Slider from './landscape/Slider'
import MobileSlider from './portrait/Slider'
import MobileSliderFlex from './portrait/SliderFlex'
import Icons from './Icons'
import { Y } from '../Controller'
import useSliderX from '../hooks/use-slider-x'
import useBoundingBox from '../hooks/use-bounding-box'
import Contact from './landscape/Contact'
import { isMobile } from 'react-device-detect'
import Placeholder from './portrait/Placeholder'
import MobileIcons from './portrait/Icons'


export const Cursor = createContext()
export const Test = createContext()


const Layout = ({ scrollTo, w, h }) => {
  const yPer = useContext(Y)
  const [showCursor, setShowCursor] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const pSlider = useRef(0)
  const eSlider = useRef(0)
  const dSlider = useRef(0)
  const flex = useRef(null)

  const { hX, width } = useBoundingBox(flex.current, yPer)
  const widths = {
    pW: pSlider.current,
    eW: eSlider.current,
    dW: dSlider.current,
    flexW: width
  }
  const { pX, eX, dX } = useSliderX(widths, yPer)

  const mQs = {
    or: '(orientation: portrait)',
  }
  const mediaVals = useMediaQueries(mQs)

  // if (mediaVals.or || isMobile) {
  //   return (
  //     <Cursor.Provider value={showCursor}>
  //       <Placeholder/>
  //     </Cursor.Provider>
  //   )
  // }

  if (mediaVals.or || isMobile ) {
    return (
      <Cursor.Provider value={showCursor}>
        <Background
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          maxRadius={150}>
          <section
            id='splash'
            sx={{
              height:'100vh',
              width:'100vw',
              display:'flex',
              flexDirection:'column',
              justifyContent:'flex-start',
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
              <MobileName scrollTo={scrollTo} showCursor={setShowCursor}/>
              <div
                id='sliders-flex'
                sx={{
                  width:'80vw',
                  display:yPer >= .05 ? 'flex' : 'none',
                  justifyContent:'space-between',
                  position:'absolute',
                  top:'10vh',
                  left:'10vw'
                }}
                >
                <MobileSliderFlex type='philosopher' color={'Teal1'}/>
                <MobileSliderFlex type='educator' color={'Teal1'}/>
                <MobileSliderFlex type='developer' color={'Teal1'}/>
              </div>
              <div
                id='sliders'
                sx={{
                  display:'flex',
                  flexDirection:'column',
                  justifyContent:'space-between',
                  alignItems:'flex-end',
                  height:'30vmin'
                }}
                >
                <MobileSlider type='philosopher' />
                <MobileSlider type='educator' />
                <MobileSlider type='developer' />
              </div>
            </div>
          </section>
          <MobileIcons
            scrollTo={scrollTo}
            showCursor={setShowCursor}
            setShowInfo={setShowInfo}
            showInfo={showInfo}/>
        </Background>
      </Cursor.Provider>
    )
  }

  return (
    <Cursor.Provider value={showCursor}>
      <Background showInfo={showInfo} setShowInfo={setShowInfo}>
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
            ref={flex}
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              width:'max-content',
              opacity: 1,
              height:'100vh',
            }}
            >
            <Name scrollTo={scrollTo} showCursor={setShowCursor}/>
            <div
              id='sliders'
              sx={{
                display:'flex',
                justifyContent:'space-between',
                boxSizing:'border-box'
              }}
              >
              <Slider
                type='philosopher'
                ref={pSlider}
                scrollTo={scrollTo}
                showCursor={setShowCursor}
                carouselX={pX}/>
              <Slider
                type='developer'
                ref={dSlider}
                scrollTo={scrollTo}
                showCursor={setShowCursor}
                carouselX={dX}/>
              <Slider
                type='educator'
                ref={eSlider}
                scrollTo={scrollTo}
                showCursor={setShowCursor}
                carouselX={eX}/>
            </div>
          </div>
        </section>
        <section
          sx={{
            display:yPer >= .03 ? '' : 'none'
          }}>
          <Subhead type='developer' width={width} w={w}/>
          <Tile type='developer' width={width} w={w} h={h}/>
        </section>
        <section
          sx={{
            display:yPer >= .37 ? '' : 'none'
          }}>
          <Subhead type='educator' width={width} w={w}/>
          <Tile type='educator' width={width} w={w} h={h}/>
        </section>
        <section
          sx={{
            display:yPer >= .03 ? '' : 'none'
          }}>
          <Subhead type='philosopher' width={width} w={w}/>
          <Tile type='philosopher' width={width} w={w} h={h}/>
        </section>
        <Contact
          width={width}
          hX={hX}
          sx={{
            display:yPer >= .97 ? '' : 'none'
          }}/>
        <Icons
          scrollTo={scrollTo}
          showCursor={setShowCursor}
          setShowInfo={setShowInfo}
          showInfo={showInfo}/>
      </Background>
    </Cursor.Provider>
  )
}

export default Layout
