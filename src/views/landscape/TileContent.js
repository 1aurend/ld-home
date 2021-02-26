/** @jsxImportSource theme-ui */
import React from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../../utils/getScrubValues'
import { animations } from '../../assets/animList'
import { content } from '../../assets/content'


export default function TileContent({ yPercent, id, type }) {

  return (
    <section
      sx={{
        display:'flex',
        p:'5%',
        justifyContent:'center',
        flexDirection:'column',
        height:'100%',
        display:yPercent > animations[type].tile.grow.from ? '' : 'none'
      }}>
      {id==='one' && <p
        sx={{
          fontFamily:'body',
          fontWeight:'body',
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
