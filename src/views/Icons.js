/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import { Y } from '../Controller'
import email from '../assets/icons/mail.svg'
import github from '../assets/icons/GitHub-Mark-Light-64px.png'
import linkedIn from '../assets/icons/In-White-72.png'
import arrow from '../assets/icons/arrow2.svg'
import useSize from '../hooks/use-debounced-window-size'
import { motion } from 'framer-motion'
import useScenes from '../hooks/use-scenes'
import useScrub from '../hooks/use-scrub'
import sceneList, { playPause } from '../assets/sceneList'


export default function Icons({ scrollTo, showCursor, setShowInfo, showInfo }) {
  const size = useSize()
  const step = size.height/2.5
  const y = useContext(Y)
  const next = y > .99 ? 14 : Object.keys(playPause)
    .filter(key => y < playPause[key])[0]
  const smooth = y > .99 ? size.height/2.5 : size.height/20


  const opacityKfs = {
    1: {
      0:1,
      20:1,
      50:0,
      100:0
    },
    7: {
      0:0,
      50:0,
      70:1,
      100:1
    }
  }
  const [relY, current] = useScenes(sceneList, [1,7], y)
  const opacity = useScrub(opacityKfs[current], relY)


  return (
    <>
    <motion.div
      id='about'
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      onClick={e => {e.stopPropagation();setShowInfo(!showInfo)}}
      style={{opacity:1}}
      sx={{
        position:'absolute',
        left:'5vw',
        bottom:'5vh',
        width:'5vmin',
        height:'5vmin',
        opacity:1,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        zIndex:1001,
        cursor:'pointer',
      }}>
      <h2
        height='100%'
        sx={{
          fontFamily:'heading',
          fontWeight:'bold',
          color:'Orange1',
          fontSize:'3vmin',
          m:0
        }}>
        ?
      </h2>
    </motion.div>
    <motion.div
      id='arrow-container'
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      style={{opacity:1}}
      sx={{
        position:'absolute',
        left:'49vw',
        bottom:'5vh',
        width:'2vw', //clamp this?
        height:y === 0 ? '5.5vw' : '3vw',
        opacity:1,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        zIndex:1001,
        cursor:'pointer',
      }}>
      {y === 0 && <p
        sx={{
          color:'Teal2',
          fontSize:'teensy',
          fontFamily:'heading',
          borderRadius:'100%',
          opacity:1,
          width:'max-content',
          mt:'0',
          mb:'1vw'
        }}>
      enter
      </p>}
      <img
        id='arrow'
        src={arrow}
        alt='scroll down'
        onClick={() => scrollTo(playPause[next], smooth, 0)}
        sx={{
          transform:current === 7 ? 'rotateX(180deg)' : '',
          mb:'8px',
          width:'2vw',
          height:'auto'
        }}/>
    </motion.div>
    <div
      id='contact-logos'
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      sx={{
        position:'absolute',
        right:'5vw',
        top:'5vh',
        width:'15vmin',
        height:'3vmin',
        opacity:0.5,
        display:'flex',
        justifyContent:'space-between',
        cursor:'pointer',
        zIndex:1001,
      }}>
      <a
        href='https://github.com/1aurend'
        target='_blank'
        rel='noopener noreferrer'
        sx={{p:0}}
        >
        <img
          src={github}
          alt='github'
          height='100%'
          sx={{
            width:'3vmin',
            cursor:'pointer'
          }}/>
      </a>
      <a
        href='https://www.linkedin.com/in/laurencdavidson/'
        target='_blank'
        rel='noopener noreferrer'
        sx={{
          width:'3vmin',
          cursor:'pointer'
        }}>
        <img
          src={linkedIn}
          alt='linkedIn'
          height='100%'
          width='100%'
          sx={{
            cursor:'pointer'
          }}/>
      </a>
      <img
        onClick={() => scrollTo(1, step)}
        src={email}
        alt='contact me'
        height='100%'
        sx={{cursor:'pointer'}}/>
    </div>
    <div
      onClick={() => scrollTo(0, step)}
      sx={{
        position:'absolute',
        top:0,
        left:0,
        width:'3vmin',
        height:'3vmin',
        cursor:'pointer',
        zIndex:1001
      }}>
    </div>
    </>
  )
}
