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
import TA from '../../assets/images/TA_game.png'
import suspension from '../../assets/images/suspension.png'



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
  console.log(fb)

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

  const images = {
    TA: TA,
    suspension: suspension
  }
  const src = type === 'philosopher'
    ? fb[content[type].tiles[id].img]
    : content[type].tiles[id].img.indexOf('http') !== -1
    ? content[type].tiles[id].img
    : images[content[type].tiles[id].img]

  if (type === 'philosopher') {
    return (
      <section
        sx={{
          p:0,
          m:0,
          height:'100%',
          width:'100%',
          display:relY >= .31 && relY <= .85 ? 'flex' : 'none',
          flexDirection:'column',
          justifyContent:'flex-start',
          perspective:'20vw',
          overflow:'hidden',
          transformOrigin:'center'
        }}>
        <img
          src={src}
          alt='fix this'
          sx={{
            maxWidth:'90%',
            height:'auto',
            alignSelf:'center',
            zIndex:400,
            pt:'5%'
          }}/>
        <div
          sx={{
            maxHeight:'25%',
            minHeight:'20%',
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
            zIndex:401
          }}>
          <motion.h2
            style={{fontSize:relY >= .33 && relY <= .85 ? titleClamp : titleSize}}
            sx={{
              fontFamily:'heading',
              color:'light',
              m:0,
              overflow:'hidden',
              textAlign:'center'
            }}>
            {content[type].tiles[id].title}
          </motion.h2>
        </div>
      </section>
    )
  }

  return (
    <section
      sx={{
        p:0,
        m:0,
        height:'100%',
        width:'100%',
        display:relY >= .31 && relY <= .85 ? 'flex' : 'none',
        flexDirection:'column',
        justifyContent:'flex-start',
        perspective:'20vw',
        overflow:'hidden',
        transformOrigin:'center'
      }}>
      <motion.h2
        style={{fontSize:relY >= .33 && relY <= .85 ? titleClamp : titleSize}}
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
          zIndex:401,
          position:'absolute',
          textAlign:'center'
        }}>
        {content[type].tiles[id].title}
      </motion.h2>
      <img
        src={src}
        alt='fix this'
        sx={{
          maxWidth:'85%',
          maxHeight:'90%',
          height:'auto',
          alignSelf:'center',
          zIndex:400,
          pt:'12%'
        }}/>
      <div
        sx={{
          maxHeight:'33%',
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
          zIndex:401
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
