/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import { Y } from '../Controller'
import sceneList, { scenes } from '../../assets/sceneList'
import useScenes from '../../hooks/use-scenes'
import useSize from '../../hooks/use-debounced-window-size'
import { content } from '../../assets/content'



export default function Subhead({ type, width }) {
  const size = useSize().width
  const y = useContext(Y)

  const opacityKfs = {
    0: 0,
    5: 0,
    10: 1,
    25: 1,
    30: 0,
    100: 0
  }
  const opacity = useScrub(opacityKfs, y, scenes[type])

  return (
    <motion.div
      style={{opacity:opacity}}
      sx={{
        height:'100vh',
        width:width,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'heading',
        color:'Orange1',
        m:0,
        fontSize:'teensy',
        position:'absolute',
        left:`${(size/2 - width/2).toFixed(2)}px`,
        textAlign:'justify'
      }}>
      <h2>
        {content[type].header}
      </h2>
    </motion.div>
  )
}
