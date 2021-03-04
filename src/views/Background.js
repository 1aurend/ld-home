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


export default function TextBackground({ children, showInfo, setShowInfo }) {
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

  //figure out how to do a non-scrub animation for the info block!

  return (
    <motion.div
      id='solid-bg'
      onClick={() => setShowInfo(false)}
      style={{backgroundColor:bgColor}}
      sx={{
        height: '100vh',
        width: '100vw',
        overflow:'hidden',
      }}>
      <div
        id='isolate'
        sx={{
          height:'100vh',
          width:'100vw',
          isolation:'isolate',
          zIndex:0,
          position:'absolute'
        }}>
        <motion.div
          id='bg-text'
          style={{
            color:bgColor,
            top:top
          }}
          sx={{
            height:`${(100*yMultiplier)+100}vh`,
            width:'100%',
            fontFamily:'heading',
            fontSize:'teensy',
            zIndex:-100,
            overflow:'hidden',
            position:'absolute',
            opacity:opacity,
            bg:'none'
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
        <Cursor showInfo={showInfo}/>
        {children}
        <motion.div
          id='about-text'
          style={{
            backgroundColor:showInfo? '#EEFAFF': bgColor,
            color:bgColor,
          }}
          sx={{
            position:'absolute',
            left:'5vw',
            bottom:'10vh',
            height:'30vmin',
            width:'30vmin',
            p:'10%',
            opacity:.8,
            zIndex:-50,
            fontFamily:'body',
            fontSize:'tiny',
            borderRadius:'5%',
            visibility:showInfo? 'visible' : 'hidden'
          }}>
          Thanks go here!
        </motion.div>
      </div>
    </motion.div>
  )
}
