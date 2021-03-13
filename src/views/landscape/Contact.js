/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import { motion } from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import { Y, Images } from '../../Controller'
import sceneList from '../../assets/sceneList'


export default function Contact({ width, w }) {
  const y = useContext(Y)
  const fb = useContext(Images)

  const opacityKfs = {
    0: 0,
    50: 0,
    80: .5,
    100: 1
  }
  const opacity = useScrub(opacityKfs, y, sceneList[7])

  return (
    <motion.div
      style={{opacity:opacity}}
      sx={{
        height:'auto',
        width:width,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'center',
        position:'absolute',
        left:`${(w/2 - width/2).toFixed(2)}px`,
        top:'30vh',
      }}>
      <img
        alt='Lauren hanging from truss in the Learning Lab studio'
        src={fb.contact}
        sx={{
          height:'auto',
          width:width*.8,
          mb:'4vh',
          filter:'grayscale(100%)'
        }}/>
      <h2
        sx={{
          fontFamily:'heading',
          color:'Teal2',
          m:0,
          fontSize:'3.5vmin',
          textAlign:'justify',
        }}>some email here</h2>
    </motion.div>
  )
}
