/** @jsxImportSource theme-ui */
import React from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import { animations } from '../utils/animList'
import { content } from '../assets/content'


export default function TileContent({ yPercent, id, type }) {

  return (
    <section
      sx={{
        display:'flex',
        p:'5%',
        justifyContent:'center',
        flexDirection:'column',
        height:'100%'
      }}>
      {id==='one' && <p
        sx={{
          fontFamily:'body',
          color:'Purple'
        }}>
        {content[type].header}
      </p>}
      <iframe
        sx={{
          width:'50%',
          height:'50%',
        }}
        id='Chord Crusher'
        src={content[type].tiles.[id].url}>test</iframe>
    </section>
  )
}
