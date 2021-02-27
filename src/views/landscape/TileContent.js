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
        bg:'Grey',
        border: '3px solid white',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        display:'flex',
        p:'3%',
        justifyContent:'center',
        flexDirection:'column',
        alignItems: 'center',
        height:'100%',
        display:yPercent > animations['DEVELOPER'].tile.grow.from ? '' : 'none'
      }}>
      {id==='one' && <p
        sx={{
          m:0,
          textAlign:'center',
          fontFamily:'monospace',
          fontWeight:'body',
          color:'Orange1',
          fontSize:'small',
          // '-webkit-text-stroke': '.2px #3D4849',
          // textShadow: '1px 1px 2px #3D4849'
        }}>
        {content['DEVELOPER'].header}
      </p>}
    </section>
  )
}
