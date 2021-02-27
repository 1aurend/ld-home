/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import { Y } from '../Controller'
import TileContent from './TileContent'
import useScrub from '../../hooks/use-scrub'
import useInterval from '../../hooks/use-interval'
import scenes from '../../assets/sceneList'
import useSize from '../../hooks/use-debounced-window-size'

const scene = {
  philosopher: scenes[6],
  educator: scenes[4],
  developer: scenes[2]
}
const bg = {
  educator: 'rgb(6,75,72)',
  developer: 'rgb(19,20,56)',
  philosopher: 'rgb(98,23,46)'
}

export default function Tiles({ type }) {
  const y = useContext(Y)
  const relY = useInterval(scene[type], y)
  const width = useSize().width
  const factor = 1200/width

  const tileKfs = {
    0: {
      opacity: 1
    },
    35: {
      borderRadius: '30px',
      width: '2vw',
      height: '2vw',
      top: '30vh',
      opacity: 1,
    },
    40: {
      bg: 'rgb(238, 250, 255)'
    },
    44: {
      top: '35vh',
      width: '2vw',
      height: '2vw',
      borderRadius: '30px',
    },
    48: {
      bg: 'rgb(238, 250, 255)'
    },
    51: {
      width: '60vw',
      height: `${40*factor}vw`,
      borderRadius: '10px',
      bg: bg[type]
    },
    // 53: {
    //   width: '60vw',
    //   height: `${40*factor}vw`,
    //   borderRadius: '10px'
    // },
    // 57: {
    //   width: '1vw',
    //   height: '1vw',
    //   borderRadius: '30px'
    // },
    // 64: {
    //   width: '60vw',
    //   height: `${40*factor}vw`,
    //   borderRadius: '10px'
    // },
    // 66: {
    //   width: '60vw',
    //   height: `${40*factor}vw`,
    //   borderRadius: '10px'
    // },
    // 70: {
    //   width: '1vw',
    //   height: '1vw',
    //   borderRadius: '30px'
    // },
    75: {
      opacity: 1
    },
    76: {
      width: '60vw',
      height: `${40*factor}vw`,
      borderRadius: '10px',
      opacity: 1,
    },
    84: {
      opacity: 0,
    },
    100: {
      opacity: 0
    }
  }
  const tileTopParams = {keyframes: tileKfs, type: 'top'}
  const tileTop = useScrub(tileTopParams, relY)
  const tileRadiusParams = {keyframes: tileKfs, type: 'borderRadius'}
  const tileRadius = useScrub(tileRadiusParams, relY)
  const tileWidthParams = {keyframes: tileKfs, type: 'width'}
  const tileWidth = useScrub(tileWidthParams, relY)
  const tileHeightParams = {keyframes: tileKfs, type: 'height'}
  const tileHeight = useScrub(tileHeightParams, relY)
  const tileOpacityParams = {keyframes: tileKfs, type: 'opacity'}
  const tileOpacity = useScrub(tileOpacityParams, relY)
  const tileLeft = `${38.5-(tileWidth.current.slice(0,-2)/2)}vw`
  const tileBgParams = {keyframes: tileKfs, type: 'bg'}
  const bgColor = useScrub(tileBgParams, relY)

  const glowKfs = {
    35: '400%',
    44: '400%',
    51: '200%',
    // 53: '200%',
    // 57: '400%',
    // 64: '200%',
    // 66: '200%',
    // 70: '400%',
    // 76: '200%',
  }
  const glowSize = useScrub(glowKfs, relY)

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
    <motion.div
      id='tile-parent'
      style={{
        height:tileHeight,
        width:tileWidth,
        top:tileTop,
        left:tileLeft,
        opacity:tileOpacity,
      }}
      sx={{
        position:'absolute',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        display:relY >= .35 ? 'flex' : 'none'
      }}>
      <motion.div
        id='tile-glow'
        style={{
          backgroundImage:radialGradient,
          height:glowSize,
          width:glowSize,
        }}
        sx={{
          mixBlendMode:'soft-light',
          position:'absolute',
          zIndex:10,
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
          id='tile'
          style={{
            borderRadius:tileRadius,
            backgroundColor:bgColor
          }}
          sx={{
            height:'100%',
            width:'100%',
            cursor:'pointer',
            mixBlendMode:'normal',
            zIndex:104,
            overflow:'hidden',
          }}>
          <TileContent type={type}/>
        </motion.div>
      </div>
    </motion.div>
  )
}
