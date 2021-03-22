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
    36: '5vw',
    82: '5vw',
    84: '1.5vw',
    86: '.75vw',
    87: '.5vw'
  }
  const titleSize = useScrub(fontKfs, relY)
  const titleClamp = useMotionTemplate`clamp(18px,${titleSize},28px)`
  const captionKfs = {
    31: '.25vw',
    32: '.5vw',
    34: '.75vw',
    36: `2vw`,
    82: '2vw',
    84: '.75vw',
    86: '.5vw',
    87: '.25vw'
  }
  const captionSize = useScrub(captionKfs, relY)
  const clamp = useMotionTemplate`clamp(11px,${captionSize},18px)`
  const lineHeightKfs = {
    31: '.5vw',
    32: '1vw',
    34: '1.5vw',
    36: '4vw',
    82: '4vw',
    84: '1.5vw',
    86: '1vw',
    87: '.5vw'
  }
  const lineHeight = useScrub(lineHeightKfs, relY)
  const lineHeightClamp = useMotionTemplate`clamp(22px,${lineHeight},36px)`

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
          src={fb[content[type].tiles[id].img]}
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
          width:'75%',
          overflow:'hidden',
          bg:colors[type],
          zIndex:31,
          textAlign:'center',
          borderTopLeftRadius:'inherit'
        }}>
        {content[type].tiles[id].title}
      </motion.h2>
      <img
        src={fb[content[type].tiles[id].img]}
        alt={content[type].tiles[id].alt}
        sx={{
          // maxWidth:'85%',
          height:'57%',
          alignSelf:'center',
          zIndex:30,
          mt:'-1%',
        }}/>
      <div
        id='tile-text'
        sx={{
          maxHeight:'50%',
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
            lineHeight:lineHeightClamp
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
