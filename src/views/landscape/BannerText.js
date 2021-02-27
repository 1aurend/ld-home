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


export default function BannerText({ id, type }) {
  const y = useContext(Y)
  const relY = useInterval(scene[type], y)
  const width = useSize().width
  //adjust this for large screens and portrait layout
  const factor = Math.min(1,width/1100)

  const kfs = {
    0: {
      borderTop: '30px',
      borderBottom: '30px',
      font: '.5vmin'
    },
    16: {
      borderTop: '30px',
      borderBottom: '30px',
      font: '.5vmin',
      fall: '90deg'
    },
    18: {
      borderTop: '0px',
    },
    32: {
      borderBottom: '20px',
      font: `${2*factor}vmin`,
      fall: '0deg'
    }
  }
  const borderTopParams = {keyframes: kfs, type: 'borderTop'}
  const borderTop = useScrub(borderTopParams, relY)
  const borderBottomParams = {keyframes: kfs, type: 'borderBottom'}
  const borderBottom = useScrub(borderBottomParams, relY)
  const fontParams = {keyframes: kfs, type: 'font'}
  const fontSize = useScrub(fontParams, relY)
  const fallParams = {keyframes: kfs, type: 'fall'}
  const textFall = useScrub(fallParams, relY)
  const fall = useMotionTemplate`rotateX(${textFall})`

  return (
    <motion.section
      style={{
        borderBottomLeftRadius:borderBottom,
        borderBottomRightRadius:borderBottom,
        borderTopLeftRadius:borderTop,
        borderTopRightRadius:borderTop,
        fontSize:fontSize
      }}
      sx={{
        bg:darkBg[type],
        border: '3px solid #EEFAFF',
        p:'3%',
        justifyContent:'center',
        flexDirection:'column',
        alignItems: 'center',
        height:'100%',
        display:relY >= .16 ? 'flex' : 'none',
        perspective:'20vw'
      }}>
      <motion.p
        style={{transform:fall}}
        sx={{
          m:0,
          textAlign:'justify',
          fontFamily:'monospace',
          fontWeight:'body',
          color:'Orange1',
          transformOrigin:'center'
        }}>
        {content[type].header}
      </motion.p>
    </motion.section>
  )
}
