/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import { motion } from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import { Y } from '../../Controller'
import { scenes } from '../../assets/sceneList'
import { content } from '../../assets/content'



export default function Subhead({ type, width, w }) {
  const y = useContext(Y)

  const opacityKfs = {
    0: 0,
    5: 0,
    15: 1,
    25: 1,
    30: 0,
    100: 0
  }
  const opacity = useScrub(opacityKfs, y, scenes[type])

  const text = type === 'philosopher'
    ? <h2>
        {content[type].header[0]}
        <em>{content[type].header[1]}</em>
        {content[type].header[2]}
      </h2>
    : <h2>{content[type].header}</h2>

  return (
    <motion.div
      style={{opacity:opacity}}
      sx={{
        height:'50vh',
        width:width,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'heading',
        color:'Orange1',
        m:0,
        fontSize:'teensy',
        position:'absolute',
        left:`${(w/2 - width/2).toFixed(2)}px`,
        top:'25vh',
        textAlign:'justify'
      }}>
      {text}
    </motion.div>
  )
}
