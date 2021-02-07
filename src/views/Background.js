/** @jsxImportSource theme-ui */
import React from 'react'
import Cursor from './RAFCursor'
import peirce from '../assets/fixationOfBelief'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import { animations } from './animList'


export default function TextBackground({ children, yPos, yPercent }) {
  const red = useMotionValue(19)
  const green = useMotionValue(20)
  const blue = useMotionValue(56)
  const bgColor = useMotionTemplate`rgb(${red},${green},${blue})`

  const eVals = [
    {val:red, from:19, to:1, unit:''},
    {val:green, from:20, to:97, unit:''},
    {val:blue, from:56, to:78, unit:''}
  ]
  const pVals = [
    {val:red, from:1, to:125, unit:''},
    {val:green, from:97, to:8, unit:''},
    {val:blue, from:78, to:38, unit:''}
  ]

  getScrubValues(yPercent, animations.DTOE.from, animations.DTOE.to, eVals)
  getScrubValues(yPercent, animations.ETOP.from, animations.ETOP.to, pVals)



  return (
    <motion.div
      style={{backgroundColor:bgColor}}
      sx={{
        height: '100vh',
        width: '100vw',
        overflow:'hidden',
      }}>
      <div
        sx={{
          height:'max-content',
          width:'100vw',
          isolation:'isolate',
        }}>
        <motion.div
          style={{color:bgColor}}
          sx={{
            height:'1000vh', //remember to calibrate this after content is all in
            width:'100%',
            fontFamily:'heading',
            fontSize:'teensy',
            zIndex:'-100',
            overflow:'hidden',
            position:'absolute',
            top:`${-yPos.px}px`
          }}>
            {peirce}
            {peirce}
            {peirce}
            {peirce}
        </motion.div>
        <Cursor yPercent={yPercent}/>
        {children}
      </div>
    </motion.div>
  )
}
