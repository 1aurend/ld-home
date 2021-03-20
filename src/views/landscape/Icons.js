/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import { Y } from '../../Controller'
import email from '../../assets/icons/mail.svg'
import github from '../../assets/icons/GitHub-Mark-Light-64px.png'
import linkedIn from '../../assets/icons/In-White-72.png'
import arrowUp from '../../assets/icons/arrow-up.svg'
import arrowDown from '../../assets/icons/arrow-down.svg'
import useSize from '../../hooks/use-debounced-window-size'
import { motion } from 'framer-motion'
import { playPause } from '../../assets/sceneList'
import { keyframes } from '@emotion/react'


const pulse = keyframes({
  '0%': {
    transform: `scale3d(1, 1, 1)`
  },
  '50%': {
    transform: `scale3d(1.15, 1.15, 1.15)`
  },
  '100%': {
    transform: `scale3d(1, 1, 1)`
  }
})

export default function Icons({ scrollTo, showCursor, setShowInfo, showInfo }) {
  const size = useSize()
  const step = size.height/2.5
  const y = useContext(Y)
  const next = y > .91 ? 13 : Object.keys(playPause).filter(key => y < playPause[key])[0]
  const greater = Object.keys(playPause).filter(key => y > playPause[key])
  const prev = y <= .075 ? 0 : Object.keys(playPause).filter(key => y > playPause[key])[greater[greater.length-1]]
  const smooth = size.height/20


  return (
    <>
    <motion.div
      id='about-icon'
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      onClick={e => {e.stopPropagation();setShowInfo(!showInfo)}}
      sx={{
        position:'absolute',
        left:'5vw',
        bottom:'5vh',
        width:'clamp(25px, 2vw, 40px)',
        height:'auto',
        opacity:1,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        zIndex:50,
        cursor:'pointer',
      }}>
      <h2
        height='100%'
        sx={{
          fontFamily:'heading',
          fontWeight:'bold',
          color:'Orange1',
          fontSize:'clamp(25px, 2vw, 40px)',
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
        left:'5vw',
        top:'47vh',
        width:'clamp(27px, 2vw, 40px)',
        height:'auto',
        opacity:1,
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        zIndex:50,
        cursor:'pointer',
      }}>
      <img
        id='arrow-up'
        src={arrowUp}
        alt='prev'
        onClick={() => scrollTo(playPause[prev], smooth, 0)}
        sx={{
          mb:'2vh',
          width:'clamp(27px, 2vw, 40px)',
          height:'auto',
          animation:y === 0 ? `${pulse} 1.5s ease-in-out` : 'none',
        }}/>
      <img
        id='arrow-down'
        src={arrowDown}
        alt='next'
        onClick={() => scrollTo(playPause[next], smooth, 0)}
        sx={{
          width:'clamp(27px, 2vw, 40px)',
          height:'auto',
          animation:y === 0 ? `${pulse} 1.5s ease-in-out` : 'none',
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
        width:'min(15vmin, 165px)',
        height:'min(3vmin, 35px)',
        opacity:0.5,
        display:'flex',
        justifyContent:'space-between',
        cursor:'pointer',
        zIndex:50,
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
            width:'min(3vmin, 35px)',
            cursor:'pointer'
          }}/>
      </a>
      <a
        href='https://www.linkedin.com/in/laurencdavidson/'
        target='_blank'
        rel='noopener noreferrer'
        sx={{
          width:'min(3vmin, 35px)',
          cursor:'pointer'
        }}>
        <img
          src={linkedIn}
          alt='linkedIn'
          sx={{
            cursor:'pointer',
            height:'100%',
            width:'100%'
          }}/>
      </a>
      <img
        onClick={() => scrollTo(1, step)}
        src={email}
        alt='contact me'
        height='100%'
        width='auto'
        sx={{cursor:'pointer'}}/>
    </div>
    </>
  )
}
