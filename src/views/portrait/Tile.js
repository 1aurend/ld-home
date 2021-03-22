/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import {
  motion,
  useMotionTemplate,
  useTransform,
  useMotionValue
} from 'framer-motion'
import { Y } from '../../Controller'
import useScrub from '../../hooks/use-scrub'
import useInterval from '../../hooks/use-interval'
import { scenes, colors } from '../../assets/sceneList'
import Content from './Content'
import { content } from '../../assets/content'
import { isSafari } from 'react-device-detect'


export default function Tile({ type, width, w, h }) {
  const y = useContext(Y)
  const relY = useInterval(scenes[type], y)

  const safariKfs = {
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
      top: '23vh',
      width: '10px',
      height: '10px',
      borderRadius: '30px',
    },
    36: {
      width: `${width}px`,
      height: `${width/1.2}px`,
      borderRadius: '2px',
    },
    45: {
      opacity: 1
    },
    50: {
      opacity: .2
    },
    55: {
      opacity: 1
    },
    63: {
      opacity: 1
    },
    68: {
      opacity: .2
    },
    73: {
      opacity: 1
    },
    82: {
      width: `${width}px`,
      height: `${width/1.2}px`,
      borderRadius: '2px',
    },
    88: {
      top: '23vh',
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
      top: '20vh',
      width: '10px',
      height: '10px',
      borderRadius: '30px',
    },
    36: {
      width: `${width}px`,
      height: `${Math.min(Math.max(width/1.2, .6*h),700)}px`,
      borderRadius: '2px',
    },
    82: {
      width: `${width}px`,
      height: `${Math.min(Math.max(width/1.2, .6*h),700)}px`,
      borderRadius: '2px',
    },
    88: {
      top: '20vh',
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
  const tileOpacityParams = {keyframes: isSafari ? safariKfs : tileKfs, type: 'opacity'}
  const tileOpacity = useScrub(tileOpacityParams, relY)
  const motionW = useMotionValue(w)
  motionW.set(w)
  const tileLeft = useTransform([tileWidth, motionW], ([latest, w]) => `${(w/2)-(latest.slice(0,-2)/2)}px`)

  //adjust these for mobile
  const glowKfs = {
    0: '400%',
    30: '400%',
    32: '250%',
    36: '175%',
    82: '175%',
    86: '250%',
    88: '400%',
  }
  const glowSize = useScrub(glowKfs, relY)

  const purpleGradient = useMotionTemplate`radial-gradient(ellipse at center, #5257F7CC 10%,#5257F703 70%,#5257F700 75%, transparent 30vw)`
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
    0: .8,
    31: .8,
    32: .6,
    34: .2,
    36: 0,
    82: 0,
    84: .2,
    86: .6,
    87: .8,
    93: .8,
    95: 0
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
        opacity:isSafari ? tileOpacity : 1
      }}
      sx={{
        position:'absolute',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        display:relY >= .23 ? 'flex' : 'none',
      }}>
      <motion.div
        id='tile-glow'
        style={{
          backgroundImage:radialGradient,
          height:glowSize,
          width:glowSize,
          transform:spin,
          opacity:tileOpacity,
        }}
        sx={{
          mixBlendMode:'soft-light',
          position:'absolute',
        }}>
      </motion.div>
      <motion.div
        id='tile'
        style={{
          borderTopLeftRadius:tileRadius,
          borderBottomLeftRadius:tileRadius,
          borderTopRightRadius:tileRadius,
          borderBottomRightRadius:tileRadius,
          transform:spin,
          opacity:tileOpacity,
        }}
        sx={{
          height:'100%',
          width:'100%',
          mixBlendMode:'normal',
          overflow:'hidden',
          bg:'light',
          backgroundClip:'border-box',
          zIndex:30
        }}>
        <Content type={type}/>
        <a
          href={content[type].tiles[id].url}
          target='_blank'
          rel='noopener noreferrer'
          sx={{
            height:'fit-content',
            display:'block'
          }}>
          <motion.div
            id='cursor-melt'
            style={{
              opacity:haze,
              borderTopLeftRadius:tileRadius,
              borderBottomLeftRadius:tileRadius,
              borderTopRightRadius:tileRadius,
              borderBottomRightRadius:tileRadius,
            }}
            sx={{
              height:relY > .36 && relY < .82 ? '95%' : '100%',
              width:relY > .36 && relY < .82 ? '95%' : '100%',
              m:relY > .36 && relY < .82 ? '2.5%' : 0,
              position:'absolute',
              top:0,
              left:0,
              bg:'light',
              backgroundClip:'border-box',
              cursor:'pointer',
            }}>
          </motion.div>
        </a>
      </motion.div>
    </motion.div>
  )
}
