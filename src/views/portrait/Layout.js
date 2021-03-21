/** @jsxImportSource theme-ui */
import {
  useContext,
  useRef,
} from 'react'
import { Y, ToggleCursor } from '../../Controller'
import useSliderX from '../../hooks/use-slider-x'
import useBoundingBox from '../../hooks/use-bounding-box'
import Background from '../Background'
import Name from './Name'
import Slider from './Slider'
import Subhead from './Subhead'
import Tile from './Tile'
import Icons from './Icons'
import Contact from './Contact'


const Layout = props => {
  const {
    scrollTo,
    w,
    h,
    showInfo,
    setShowInfo
  } = props
  const yPer = useContext(Y)
  const setShowCursor = useContext(ToggleCursor)

  const pSlider = useRef(0)
  const eSlider = useRef(0)
  const dSlider = useRef(0)
  const flex = useRef(null)

  const { hX, width } = useBoundingBox(flex.current, yPer)
  const widths = {
    pW: pSlider.current,
    eW: eSlider.current,
    dW: dSlider.current,
    flexW: w*.8
  }
  const { pX, eX, dX } = useSliderX(widths, yPer, true)

  return (
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
            justifyContent:'flex-start',
            width:'max-content',
            opacity: 1,
            height:'100vh',
            pt:'28vh'
          }}>
          <Name scrollTo={scrollTo} showCursor={setShowCursor}/>
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
        <Subhead type='developer' width={w*.8} w={w}/>
        <Tile type='developer' width={w*.8} w={w} h={h}/>
      </section>
      <section
        sx={{
          display:yPer >= .37 ? '' : 'none'
        }}>
        <Subhead type='educator' width={w*.8} w={w}/>
        <Tile type='educator' width={w*.8} w={w} h={h}/>
      </section>
      <section
        sx={{
          display:yPer >= .03 ? '' : 'none'
        }}>
        <Subhead type='philosopher' width={w*.8} w={w}/>
        <Tile type='philosopher' width={w*.8} w={w} h={h}/>
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
  )
}

export default Layout
