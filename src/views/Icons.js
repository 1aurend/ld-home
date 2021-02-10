/** @jsxImportSource theme-ui */
import React from 'react'
import email from '../assets/mail.svg'
import github from '../assets/GitHub-Mark-Light-64px.png'
import linkedIn from '../assets/LI-In-Bug.png'
import info from '../assets/help-24px.svg'


export default function Icons({ scrollTo, showCursor }) {
  return (
    <>
    <div
      id='bibliography'
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      sx={{
        position:'absolute',
        left:'5vw',
        bottom:'5vh',
        width:'20vmin',
        height:'4vmin',
        opacity:0.5,
        display:'flex',
        justifyContent:'space-between'
      }}>
      <img
        src={info}
        alt='bibliography'
        height='100%'
        sx={{
          width:'4vmin',
          cursor:'pointer'
        }}/>
    </div>
    <div
      id='contact-logos'
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      sx={{
        position:'absolute',
        right:'5vw',
        bottom:'5vh',
        width:'20vmin',
        height:'4vmin',
        opacity:0.5,
        display:'flex',
        justifyContent:'space-between',
        cursor:'pointer'
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
            width:'4vmin',
            cursor:'pointer'
          }}/>
      </a>
      <a
        href='https://www.linkedin.com/in/laurencdavidson/'
        target='_blank'
        rel='noopener noreferrer'
        sx={{
          width:'4vmin',
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
        onClick={() => scrollTo(1)}
        src={email}
        alt='contact me'
        height='100%'
        sx={{cursor:'pointer'}}/>
    </div>
    </>
  )
}
