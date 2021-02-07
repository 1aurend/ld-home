/** @jsxImportSource theme-ui */
import React from 'react'
import Cursor from './RAFCursor'
import peirce from '../assets/fixationOfBelief'
import Developer from './Developer'


export default function TextBackground({ children, yPos, yPercent }) {
  return (
    <div
      sx={{
        height: '100vh',
        width: '100vw',
        bg: 'DarkPurple1',
        overflow:'hidden',
      }}>
      <div
        sx={{
          height:'max-content',
          width:'100vw',
          isolation:'isolate',
        }}>
        <div
          sx={{
            height:'1000vh', //remember to calibrate this after content is all in
            width:'100%',
            fontFamily:'heading',
            fontSize:'teensy',
            color:'DarkPurple1',
            zIndex:'-100',
            overflow:'hidden',
            position:'absolute',
            top:`${-yPos.px}px`
          }}>
            {peirce}
            {peirce}
            {peirce}
            {peirce}
        </div>
        <Cursor yPercent={yPercent}/>
        {children}
        {yPercent > 0.125 && <Developer yPercent={yPercent}/>}
      </div>
    </div>
  )
}
