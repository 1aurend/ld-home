/** @jsxImportSource theme-ui */
import email from '../assets/images/mail.svg'
import github from '../assets/images/GitHub-Mark-Light-64px.png'
import linkedIn from '../assets/images/In-White-72.png'
import arrow from '../assets/images/arrow2.svg'
import useSize from '../hooks/use-debounced-window-size'


export default function Icons({ scrollTo, showCursor, setShowInfo, showInfo }) {
  const size = useSize()
  const step = size.height/2.5
  return (
    <>
    <div
      id='about'
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      onClick={e => {e.stopPropagation();setShowInfo(!showInfo)}}
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
        zIndex:1001
      }}>
      <h2
        height='100%'
        sx={{
          cursor:'pointer',
          fontFamily:'heading',
          fontWeight:'bold',
          color:'Orange1',
          m:0
        }}>
        ?
      </h2>
    </div>
    <div
      id='arrow-container'
      sx={{
        position:'absolute',
        left:'47.5vw',
        bottom:'5vh',
        width:'3vw',
        height:'3vw',
        opacity:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-end',
        zIndex:1001
      }}>
      <img
        id='arrow'
        src={arrow}
        alt='scroll down'
        sx={{
          width:'70%',
          height:'70%'
        }}/>
    </div>
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
          width='auto'
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
