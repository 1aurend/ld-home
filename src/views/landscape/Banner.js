/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import { Y } from '../Controller'
import BannerText from './BannerText'
import useScrub from '../../hooks/use-scrub'
import useInterval from '../../hooks/use-interval'
import scenes from '../../assets/sceneList'
import useSize from '../../hooks/use-debounced-window-size'

const scene = {
  philosopher: scenes[6],
  educator: scenes[4],
  developer: scenes[2]
}

export default function Banner({ type }) {
  const y = useContext(Y)
  const relY = useInterval(scene[type], y)
  const width = useSize().width
  const factor = 1200/width

  const lineKfs = {
    0: {
      width: '0vw',
      right: '20.5vw',
      left: '79.5vw'
    },
    16: {
      width: '68vw',
      right: '20.5vw',
      left: '11vw'
    },
    84: {
      width: '68vw',
    },
    100: {
      width: '0vw'
    }
  }
  const lineWidthParams = {keyframes: lineKfs, type: 'width'}
  const lineLength = useScrub(lineWidthParams, relY)
  const lineLeftParams = {keyframes: lineKfs, type: 'left'}
  const lineLeft = useScrub(lineLeftParams, relY)

  //note the 0/100 is in here for scrollTo()
  const tileKfs = {
    0: {
      borderTop: '30px',
      borderBottom: '30px',
      margin: '13.5vh',
      width: '1vw',
      height: '1vw',
    },
    16: {
      borderTop: '30px',
      borderBottom: '30px',
      margin: '13.5vh',
      width: '1vw',
      height: '1vw',
    },
    18: {
      borderTop: '0px',
      margin: '14vh',
    },
    32: {
      borderBottom: '20px',
      width: '55vw',
      height: `${12*factor}vw`,
    },
    76: {
      flip: '0deg',
      opacity: 1,
    },
    84: {
      opacity: 0,
      flip: '180deg'
    },
    100: {
      opacity: 0,
      flip: '180deg'
    }
  }
  const tileBorderTopParams = {keyframes: tileKfs, type: 'borderTop'}
  const tileBorderTop = useScrub(tileBorderTopParams, relY)
  const tileBorderBottomParams = {keyframes: tileKfs, type: 'borderBottom'}
  const tileBorderBottom = useScrub(tileBorderBottomParams, relY)
  const tileMarginParams = {keyframes: tileKfs, type: 'margin'}
  const tileMargin = useScrub(tileMarginParams, relY)
  const tileWidthParams = {keyframes: tileKfs, type: 'width'}
  const tileWidth = useScrub(tileWidthParams, relY)
  const tileHeightParams = {keyframes: tileKfs, type: 'height'}
  const tileHeight = useScrub(tileHeightParams, relY)
  const tileFlipParams = {keyframes: tileKfs, type: 'flip'}
  const tileFlip = useScrub(tileFlipParams, relY)
  const flip = useMotionTemplate`rotateX(${tileFlip})`
  const tileOpacityParams = {keyframes: tileKfs, type: 'opacity'}
  const tileOpacity = useScrub(tileOpacityParams, relY)

  const glowKfs = {
    32: {
      size: '175%',
      pos: '-37.5%'
    },
    35: {
      size: '0%',
      pos: '37.5%'
    }
  }
  const glowSizeParams = {keyframes: glowKfs, type: 'size'}
  const glowSize = useScrub(glowSizeParams, relY)
  const glowPosParams = {keyframes: glowKfs, type: 'pos'}
  const glowPos = useScrub(glowPosParams, relY)

  const purpleGradient = useMotionTemplate`radial-gradient(ellipse at center, #5257F7CC 10%,#5257F703 70%,#5257F700 75%, transparent 100vw)`
  const tealGradient = useMotionTemplate`radial-gradient(ellipse at center, #7FF0D9CC 10%,#7FF0D903 70%,#7FF0D900 75%, transparent 100vw)`
  const redGradient = useMotionTemplate`radial-gradient(ellipse at center, #EEACCFCC 10%,#EEACCF03 70%,#EEACCF00 75%, transparent 100vw)`
  const color = y <= .29 || y >= .96
    ? 'purple'
    : y > .29 && y <= .63
      ? 'teal'
      : 'red'
  const gradients = {
    purple: purpleGradient,
    teal: tealGradient,
    red: redGradient
  }
  const radialGradient = gradients[color]


  return (
    <>
      <motion.div
        id='tile-parent'
        style={{
          height:tileHeight,
          width:tileWidth,
          marginTop:tileMargin,
          left:lineLeft
        }}
        sx={{
          position:'absolute',
        }}>
        <motion.div
          id='tile-glow'
          style={{
            backgroundImage:radialGradient,
            transform:flip,
            opacity:tileOpacity,
            height:glowSize,
            width:glowSize,
            top:glowPos,
            left:glowPos,
          }}
          sx={{
            mixBlendMode:'soft-light',
            position:'absolute',
            zIndex:10,
            transformOrigin:'center top',
          }}>
        </motion.div>
        <div
          id='perspective-wrapper'
          sx={{
            zIndex:100,
            height:'100%',
            width:'100%',
            position:'absolute',
            top:0,
            left:0,
            isolation:'isolate',
            perspective:'20vw'
          }}
          >
          <motion.div
            id='banner'
            style={{
              borderTopLeftRadius:tileBorderTop,
              borderTopRightRadius:tileBorderTop,
              borderBottomLeftRadius:tileBorderBottom,
              borderBottomRightRadius:tileBorderBottom,
              transform:flip,
              opacity:tileOpacity
            }}
            sx={{
              bg:'light',
              position:'absolute',
              top:0,
              left:0,
              height:'100%',
              width:'100%',
              cursor:'pointer',
              transformOrigin:'center top',
              mixBlendMode:'normal',
              zIndex:104,
              overflow:'hidden'
            }}>
            <BannerText yPercent={y} id='one' type={type}/>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        id='line'
        style={{
          width:lineLength,
          right:'20.5vw'
        }}
        sx={{
          position:'absolute',
          height:'3px',
          bg:'light',
          opacity:1,
          mt:'6vh',
          zIndex:50,
          top:'8vh',
        }}>
      </motion.div>
    </>
  )
}
