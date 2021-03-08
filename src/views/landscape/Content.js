/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import { motion } from 'framer-motion'
import { content } from '../../assets/content'
import { Y } from '../Controller'
import { scenes } from '../../assets/sceneList'
import useInterval from '../../hooks/use-interval'
import useScrub from '../../hooks/use-scrub'

const colors = {
  developer: 'rgb(19,20,56)',
  educator: 'rgb(6,75,72)',
  philosopher: 'rgb(98,23,46)'
}

export default function Content({ type }) {
  const y = useContext(Y)
  const relY = useInterval(scenes[type], y)
  const id = relY >= .68 ? 'three' : relY >= .50 ? 'two' : 'one'

  const fontKfs = {
    31: '.5vw',
    32: '1vw',
    34: '2vw',
    36: '2.5vw',
    82: '2.5vw',
    84: '2vw',
    86: '1vw',
    87: '.5vw'
  }
  const titleSize = useScrub(fontKfs, relY)
  const captionKfs = {
    31: '.25vw',
    32: '.5vw',
    34: '.75vw',
    36: `1.15vw`,
    82: '1.15vw',
    84: '.75vw',
    86: '.5vw',
    87: '.25vw'
  }
  const captionSize = useScrub(captionKfs, relY)
  const lineHeightKfs = {
    31: '.25vw',
    32: '.5vw',
    34: '.75vw',
    36: '1.5vw',
    82: '1.5vw',
    84: '.75vw',
    86: '.5vw',
    87: '.25vw'
  }
  const lineHeight = useScrub(lineHeightKfs, relY)


  return (
    <section
      sx={{
        p:0,
        m:0,
        height:'100%',
        width:'100%',
        display:relY >= .31 && relY <= .88 ? 'flex' : 'none',
        flexDirection:'column',
        justifyContent:'flex-start',
        perspective:'20vw',
        overflow:'hidden',
        transformOrigin:'center'
      }}>
      <motion.h2
        style={{fontSize:titleSize}}
        sx={{
          fontFamily:'heading',
          color:'light',
          m:0,
          p:'3%',
          pl:'5%',
          pr:'5%',
          width:'fit-content',
          overflow:'hidden',
          bg:colors[type],
          zIndex:401,
          position:'absolute'
        }}>
        {content[type].tiles[id].title}
      </motion.h2>
      <img
        src={content[type].tiles[id].img}
        alt='fix this'
        sx={{
          width:'auto',
          height:'75%',
          alignSelf:'center',
          zIndex:400,
          pt:'11%'
        }}/>
      <div
        sx={{
          height:'25%',
          width:'100%',
          bg:colors[type],
          pl:'5%',
          pr:'5%',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center'
        }}>
        <motion.p
          style={{
            fontSize:captionSize,
            lineHeight:lineHeight
          }}
          sx={{
            m:0,
            textAlign:'justify',
            fontFamily:'inter',
            fontWeight:'body',
            color:'light',
            transformOrigin:'center',
            overflow:'hidden',
          }}>
          {content[type].tiles[id].text}
        </motion.p>
      </div>
    </section>
  )
}
