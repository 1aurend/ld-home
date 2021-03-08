/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import { Y } from '../Controller'
import useScrub from '../../hooks/use-scrub'
import useInterval from '../../hooks/use-interval'
import { scenes, colors } from '../../assets/sceneList'
import useSize from '../../hooks/use-debounced-window-size'
import Content from './Content'


export default function Tile({ type, width }) {
  const y = useContext(Y)
  const relY = useInterval(scenes[type], y)
  const size = useSize()

  const tileKfs = {
    0: {
      opacity: 1,
      width: '2px'
    },
    25: {
      borderRadius: '30px',
      width: '10px',
      height: '10px',
      top: '11vh',
      opacity: 1,
    },
    30: {
      top: '25vh',
      width: '10px',
      height: '10px',
      borderRadius: '30px',
    },
    36: {
      width: `${width}px`,
      height: `${.6*size.height}px`,
      borderRadius: '2px',
    },
    82: {
      width: `${width}px`,
      height: `${.6*size.height}px`,
      borderRadius: '2px',
    },
    88: {
      top: '25vh',
      width: '10px',
      height: '10px',
      borderRadius: '30px',
    },
    93: {
      borderRadius: '30px',
      width: '10px',
      height: '10px',
      top: '11vh',
      opacity: 1,
    },
    95: {
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
  const tileLeft = `${size.width/2-(tileWidth.current.slice(0,-2)/2)}px`

  const glowKfs = {
    0: '400%',
    30: '400%',
    36: '200%',
    82: '200%',
    88: '400%',
  }
  const glowSize = useScrub(glowKfs, relY)

  const purpleGradient = useMotionTemplate`radial-gradient(ellipse at center, #5257F7CC 10%,#5257F703 70%,#5257F700 75%, transparent 100vw)`
  const tealGradient = useMotionTemplate`radial-gradient(ellipse at center, #0ca89bCC 10%,#0ca89b03 70%,#0ca89b00 75%, transparent 100vw)`
  const redGradient = useMotionTemplate`radial-gradient(ellipse at center, #bd5585CC 10%,#bd558503 70%,#bd558500 75%, transparent 100vw)`
  const gradients = {
    purple: purpleGradient,
    teal: tealGradient,
    red: redGradient
  }
  const radialGradient = gradients[colors[type]]

  //adjust timing if these become lotties
  const oneKfs = {
    36: '0deg',
    45: '0deg',
    50: '90deg'
  }
  const twoKfs = {
    50: '-90deg',
    55: '0deg',
    63: '0deg',
    68: '90deg'
  }
  const threeKfs = {
    68: '-90deg',
    73: '0deg',
    82: '0deg'
  }
  const id = relY >= .68 ? 'three' : relY >= .50 ? 'two' : 'one'
  const kfs = id === 'one' ? oneKfs : id === 'two' ? twoKfs : threeKfs
  const tileSpin = useScrub(kfs, relY)
  const spin = useMotionTemplate`rotateY(${tileSpin})`

  const hazeKfs = {
    31: .8,
    32: .6,
    34: .2,
    36: 0,
    82: 0,
    84: .2,
    86: .6,
    87: .8
  }
  const haze = useScrub(hazeKfs, relY)


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
        display:relY >= .23 ? 'flex' : 'none'
      }}>
      <motion.div
        id='tile-glow'
        style={{
          backgroundImage:radialGradient,
          height:glowSize,
          width:glowSize,
          transform:spin
        }}
        sx={{
          mixBlendMode:'soft-light',
          position:'absolute',
          zIndex:10,
        }}>
      </motion.div>
      <motion.div
        id='tile'
        style={{
          borderRadius:tileRadius,
          transform:spin,
        }}
        sx={{
          height:'100%',
          width:'100%',
          mixBlendMode:'normal',
          zIndex:104,
          overflow:'hidden',
          bg:'light'
        }}>
        <Content type={type}/>
        <motion.div
          id='cursor-melt'
          style={{opacity:haze}}
          sx={{
            cursor:'pointer',
            height:relY > .36 && relY < .82 ? '95%' : '100%',
            width:relY > .36 && relY < .82 ? '95%' : '100%',
            m:relY > .36 && relY < .82 ? '2.5%' : 0,
            position:'absolute',
            top:0,
            left:0,
            bg:'light'
          }}>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
