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
const darkBg = {
  educator: 'rgb(4,51,49)',
  developer: 'rgb(25,27,77)',
  philosopher: 'rgb(77,18,36)'
}

export default function Tiles({ type }) {
  const y = useContext(Y)
  const relY = useInterval(scene[type], y)
  const thresholds = {
    one: .56,
    two: .70,
  }
  const id = relY < thresholds.one ? 'one' : relY < thresholds.two ? 'two' : 'three'
  const width = useSize().width
  const factor = 1200/width

  const tileKfs = {
    0: {
      opacity: 1,
      width: '2vw'
    },
    35: {
      borderRadius: '30px',
      width: '2vw',
      height: '2vw',
      top: '25vh',
      opacity: 1,
    },
    38: {
      bg: 'rgb(238, 250, 255, 1)'
    },
    40: {
      top: '32vh',
      width: '2vw',
      height: '2vw',
      borderRadius: '30px',
    },
    41: {
      bg: 'rgb(238, 250, 255, 0)'
    },
    46: {
      width: '60vw',
      height: `${40*factor}vw`,
      borderRadius: '10px',
      bg: 'rgb(238, 250, 255, 0)'
    },
    80: {
      opacity: 1,
    },
    88: {
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
  const tileLeft = `${41-(tileWidth.current.slice(0,-2)/2)}vw`
  const tileBgParams = {keyframes: tileKfs, type: 'bg'}
  const bgColor = useScrub(tileBgParams, relY)

  const glowKfs = {
    35: '400%',
    40: '400%',
    46: '200%',
  }
  const glowSize = useScrub(glowKfs, relY)

  const purpleGradient = useMotionTemplate`radial-gradient(ellipse at center, #5257F7CC 10%,#5257F703 70%,#5257F700 75%, transparent 100vw)`
  const tealGradient = useMotionTemplate`radial-gradient(ellipse at center, #0ca89bCC 10%,#0ca89b03 70%,#0ca89b00 75%, transparent 100vw)`
  const redGradient = useMotionTemplate`radial-gradient(ellipse at center, #bd5585CC 10%,#bd558503 70%,#bd558500 75%, transparent 100vw)`
  const color = y <= .31 || y >= .99
    ? 'purple'
    : y > .31 && y <= .65
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
          <TileContent type={type} id={id}/>
        </motion.div>
      </div>
    </motion.div>
  )
}
