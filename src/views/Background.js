/** @jsxImportSource theme-ui */
import {
  useContext,
} from 'react'
import Cursor from './RAFCursor'
import peirce from '../assets/texts/fixationOfBelief'
import { motion } from 'framer-motion'
import { yMultiplier } from '../assets/sceneList'
import { Y } from './Controller'
import useScrub from '../hooks/use-scrub'
import useInterval from '../hooks/use-interval'
import scenes from '../assets/sceneList'


export default function TextBackground({ children }) {
  const y = useContext(Y)

  //this needs to move only during transitions :)
  //not sure what the right increments are
  const bgKfs = {
    0: '0vh',
    2: '-500vh',
    31: '-500vh',
    36: '-1000vh',
    65: '-1000vh',
    70: '-1500vh',
    99: '-1500vh',
    100: '-1000vh'
  }
  const top = useScrub(bgKfs, y)

  const toTealKfs = {
    0: 'rgb(19,20,56)',
    100: 'rgb(6,75,72)'
  }
  const toRedKfs = {
    0: 'rgb(6,75,72)',
    100: 'rgb(98,23,46)'
  }
  const toPurpleKfs = {
    0: 'rgb(98,23,46)',
    100: 'rgb(19,20,56)'
  }
  const dToE = useInterval(scenes[3], y)
  const eToP = useInterval(scenes[5], y)
  const pToC = useInterval(scenes[7], y)
  const relY = y < .36 ? dToE : y < .70 ? eToP : pToC
  const relKfs = y < .36 ? toTealKfs : y < .70 ? toRedKfs : toPurpleKfs
  const bgColor = useScrub(relKfs, relY)

  const scene = y < .36 ? 2 : y < .70 ? 4 : 6
  const tileY = useInterval(scenes[scene], y)
  const opacity = tileY >= .35 && tileY <= .80 ? .25 : 1


  return (
    <motion.div
      style={{backgroundColor:bgColor}}
      sx={{
        height: '100vh',
        width: '100vw',
        overflow:'hidden',
      }}>
      <div
        sx={{
          height:'max-content',
          width:'100vw',
          isolation:'isolate',
        }}>
        <motion.div
          style={{
            color:bgColor,
            top:top
          }}
          sx={{
            height:`${(100*yMultiplier)+100}vh`,
            width:'100%',
            fontFamily:'heading',
            fontSize:'teensy',
            zIndex:'-100',
            overflow:'hidden',
            position:'absolute',
            opacity:opacity
          }}>
          {peirce}
          {peirce}
          {peirce}
          {peirce}
          {peirce}
          {peirce}
          {peirce}
          {peirce}
          {peirce}
          {peirce}
          {peirce}
        </motion.div>
        <Cursor/>
        {children}
      </div>
    </motion.div>
  )
}
