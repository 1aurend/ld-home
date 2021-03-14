/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import Cursor from './RAFCursor'
import peirce from '../assets/texts/fixationOfBelief'
import dewey from '../assets/texts/howWeThink'
import { motion } from 'framer-motion'
import { yMultiplier } from '../assets/sceneList'
import { Y } from '../Controller'
import useScrub from '../hooks/use-scrub'
import sceneList from '../assets/sceneList'
import useScenes from '../hooks/use-scenes'
import About from './About'


export default function TextBackground({ children, showInfo, setShowInfo }) {
  const y = useContext(Y)
  const [ relY, current ] = useScenes(sceneList, [1,3,5,7], y)

  //adjust these increments for speed of text scroll :)
  const scrollKfs = {
    1: {
      0: '0vh',
      100: '-200vh',
    },
    3: {
      0: '-200vh',
      100: '-400vh',
    },
    5: {
      0: '-400vh',
      100: '-600vh',
    },
    7: {
      0: '-600vh',
      100: '-400vh'
    }
  }
  const top = useScrub(scrollKfs[current], relY)

  const colorKfs = {
    1: {
      0: 'rgb(19,20,56)',
      100: 'rgb(19,20,56)'
    },
    3: {
      0: 'rgb(19,20,56)',
      100: 'rgb(6,75,72)'
    },
    5: {
      0: 'rgb(6,75,72)',
      100: 'rgb(98,23,46)'
    },
    7: {
      0: 'rgb(98,23,46)',
      100: 'rgb(19,20,56)'
    }
  }
  const bgColor = useScrub(colorKfs[current], relY)

  return (
    <motion.div
      id='solid-bg'
      onClick={() => setShowInfo(false)}
      style={{backgroundColor:bgColor}}
      sx={{
        height: '100vh',
        width: '100vw',
        overflow:'hidden',
        cursor:showInfo ? 'pointer' : 'none'
      }}>
      <div
        id='isolate'
        sx={{
          height:'100vh',
          width:'100vw',
          isolation:'isolate',
          zIndex:1,
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
            zIndex:0,
            overflow:'hidden',
            position:'absolute',
            opacity:1,
            bg:'none'
          }}>
          {peirce}
          {dewey}
        </motion.div>
        <Cursor showInfo={showInfo}/>
        {children}
        <motion.div
          id='about-text'
          onClick={e => e.stopPropagation()}
          style={{
            backgroundColor:showInfo? '#EEFAFF': bgColor,
            color:bgColor,
          }}
          sx={{
            position:'absolute',
            left:'6vw',
            bottom:'9vh',
            height:'auto',
            width:'20vw',
            p:'2%',
            opacity:.9,
            zIndex:51,
            fontFamily:'inter',
            borderRadius:'2px',
            visibility:showInfo? 'visible' : 'hidden',
            cursor:'default'
          }}>
          <About/>
        </motion.div>
      </div>
    </motion.div>
  )
}
