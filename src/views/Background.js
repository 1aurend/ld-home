/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import Cursor from './RAFCursor'
import peirce from '../assets/fixationOfBelief'
import { motion } from 'framer-motion'
import { yMultiplier } from '../assets/sceneList'
import { Y } from './Controller'
import useScrub from '../hooks/use-scrub'
import useInterval from '../hooks/use-interval'
import scenes from '../assets/sceneList'


export default function TextBackground({ children }) {
  const y = useContext(Y)

  //this needs to be adjusted when all the text goes in
  const bgKfs = {
    1: '0vh',
    5: '-1000vh',
    96: '-1000vh',
    100: '0vh'
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
  const dToE = useInterval(scenes[3])
  const eToP = useInterval(scenes[5])
  const pToC = useInterval(scenes[7])
  const currentInt = y < .39 ? dToE : y < .73 ? eToP : pToC
  const currentKfs = y < .39 ? toTealKfs : y < .73 ? toRedKfs : toPurpleKfs
  const bgColor = useScrub(currentKfs, y, currentInt)


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
          style={{color:bgColor}}
          sx={{
            height:`${(100*yMultiplier)+100}vh`,
            width:'100%',
            fontFamily:'heading',
            fontSize:'teensy',
            zIndex:'-100',
            overflow:'hidden',
            position:'absolute',
            top:top
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
