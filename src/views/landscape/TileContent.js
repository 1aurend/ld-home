/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import { motion, useMotionTemplate } from 'framer-motion'
import { content } from '../../assets/content'
import { Y } from '../Controller'
import scenes from '../../assets/sceneList'
import useInterval from '../../hooks/use-interval'
import useScrub from '../../hooks/use-scrub'
import useSize from '../../hooks/use-debounced-window-size'

const scene = {
  philosopher: scenes[6],
  educator: scenes[4],
  developer: scenes[2]
}
const darkBg = {
  educator: 'rgb(4,51,49)',
  developer: 'rgb(25,27,77)',
  philosopher: 'rgb(77,18,36)'
}


export default function TileContent({ id, type }) {
  const y = useContext(Y)
  const relY = useInterval(scene[type], y)
  const width = useSize().width
  //adjust this for large screens and portrait layout
  const factor = Math.min(1,width/1100)

  const oneKfs = {
    51: '0deg',
    57: '0deg',
    59: '90deg'
  }
  const twoKfs = {
    59: '-90deg',
    61: '0deg',
    67: '0deg',
    69: '90deg'
  }
  const threeKfs = {
    69: '-90deg',
    71: '0deg',
    77: '0deg'
  }
  const kfs = id === 'one' ? oneKfs : id === 'two' ? twoKfs : threeKfs
  const tileSpin = useScrub(kfs, relY)
  const spin = useMotionTemplate`rotateY(${tileSpin})`

  const fontKfs = {
    44: '.5vmin',
    45: '1vmin',
    47: '2vmin',
    51: '4vmin'
  }
  const titleSize = useScrub(fontKfs, relY)
  const captionKfs = {
    44: '.25vmin',
    45: '.5vmin',
    47: '1vmin',
    51: '2vmin'
  }
  const captionSize = useScrub(captionKfs, relY)
  const lineHeightKfs = {
    44: '.5vmin',
    45: '.75vmin',
    47: '1.5vmin',
    51: '3vmin'
  }
  const lineHeight = useScrub(lineHeightKfs, relY)


  return (
    <motion.section
      style={{
        transform:spin
      }}
      sx={{
        p:0,
        justifyContent:'flex-start',
        flexDirection:'column',
        alignItems: 'center',
        height:'100%',
        display:relY >= .44 ? 'flex' : 'none',
        perspective:'20vw',
        overflow:'hidden',
        transformOrigin:'center'
      }}>
      <motion.h2
        style={{fontSize:titleSize}}
        sx={{
          fontFamily:'heading',
          color:type === 'developer' ? 'Teal2' : type === 'philosopher' ? 'Purple2' : 'Pink3',
          m:0,
          pb:'4%',
          textShadow:'0px 0px 5px black',
          overflow:'hidden'
        }}>
        {content['developer'].tiles[id].title}
      </motion.h2>
      <img
        src={content['developer'].tiles[id].img}
        alt='fix this'
        sx={{
          width:'auto',
          height:'70%',
          pb:'3%'
        }}/>
      <motion.p
        style={{
          fontSize:captionSize,
          lineHeight:lineHeight
        }}
        sx={{
          m:0,
          textAlign:'justify',
          fontFamily:'monospace',
          fontWeight:'heading',
          color:type === 'developer' ? 'Teal2' : type === 'philosopher' ? 'Purple2' : 'Pink3',
          transformOrigin:'center',
          textShadow:'0px 0px 7px black',
          width:'80%',
          overflow:'hidden'
        }}>
        {content['developer'].tiles[id].text}
      </motion.p>
    </motion.section>
  )
}
