/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import { content } from '../../assets/content'
import { Y, Images } from '../../Controller'
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
  const fb = useContext(Images)
  const relY = useInterval(scenes[type], y)
  const id = relY >= .68 ? 'three' : relY >= .50 ? 'two' : 'one'

  const fontKfs = {
    31: '.5vw',
    32: '.75vw',
    34: '1.5vw',
    36: '2.5vw',
    82: '2.5vw',
    84: '1.5vw',
    86: '.75vw',
    87: '.5vw'
  }
  const titleSize = useScrub(fontKfs, relY)
  const titleClamp = useMotionTemplate`clamp(24px,${titleSize},32px)`
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
  const clamp = useMotionTemplate`clamp(10px,${captionSize},14px)`
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

  const src = type !== 'developer'
    ? fb[content[type].tiles[id].img]
    : content[type].tiles[id].img

  if (type === 'philosopher') {
    return (
      <section
        id='tile-content'
        sx={{
          p:0,
          m:0,
          height:'100%',
          width:'100%',
          display:relY >= .31 && relY <= .87 ? 'flex' : 'none',
          flexDirection:'column',
          justifyContent:'flex-start',
          perspective:'20vw',
          overflow:'hidden',
          transformOrigin:'center'
        }}>
        <img
          src={src}
          alt={content[type].tiles[id].alt}
          sx={{
            maxWidth:'90%',
            height:'auto',
            alignSelf:'center',
            zIndex:400,
            mt:'5%',
            border:'5px solid #3D4849'
          }}/>
        <div
          id='tile-title'
          sx={{
            maxHeight:'25%',
            minHeight:'20%',
            width:'100%',
            position:'absolute',
            bottom:0,
            left:0,
            bg:colors[type],
            p:'5%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            zIndex:401
          }}>
          <motion.h2
            style={{fontSize:relY >= .33 && relY <= .87 ? titleClamp : titleSize}}
            sx={{
              fontFamily:'heading',
              color:'light',
              m:0,
              overflow:'hidden',
              textAlign:'center',
              width:'max-content',
              borderRadius:'inherit'
            }}>
            {content[type].tiles[id].title}
          </motion.h2>
        </div>
      </section>
    )
  }

  return (
    <section
      id='tile-content'
      sx={{
        p:0,
        m:0,
        height:'100%',
        width:'100%',
        display:relY >= .31 && relY <= .87 ? 'flex' : 'none',
        flexDirection:'column',
        justifyContent:'flex-start',
        perspective:'20vw',
        overflow:'hidden',
        transformOrigin:'center',
        borderRadius:'inherit',
        zIndex:30
      }}>
      <motion.h2
        id='tile-title'
        style={{fontSize:relY >= .33 && relY <= .87 ? titleClamp : titleSize}}
        sx={{
          fontFamily:'heading',
          color:'light',
          m:0,
          p:'3%',
          pl:'5%',
          pr:'5%',
          width:'65%',
          overflow:'hidden',
          bg:colors[type],
          zIndex:31,
          position:'absolute',
          textAlign:'center',
          borderTopLeftRadius:'inherit'
        }}>
        {content[type].tiles[id].title}
      </motion.h2>
      <img
        src={src}
        alt={content[type].tiles[id].alt}
        sx={{
          maxWidth:'85%',
          maxHeight:'90%',
          height:'auto',
          alignSelf:'center',
          zIndex:30,
          pt:'12%',
        }}/>
      <div
        id='tile-text'
        sx={{
          maxHeight:'35%',
          minHeight:'30%',
          width:'100%',
          position:'absolute',
          bottom:0,
          left:0,
          bg:colors[type],
          p:'5%',
          pl:'5%',
          pr:'5%',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          zIndex:31,
          borderBottomLeftRadius:'inherit',
          borderBottomRightRadius:'inherit'
        }}>
        <motion.p
          style={{
            fontSize:relY >= .33 && relY <= .88 ? clamp : captionSize,
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
