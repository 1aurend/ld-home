/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import { animations } from '../utils/animList'
import TileContent from './TileContent'

export default function DrawingLight({ type, yPercent }) {
  const borderRadiusScrub = useMotionValue(30)
  const tileWidthScrub = useMotionValue()
  const lightWidthScrub = useMotionValue()
  const tileHeightScrub = useMotionValue()
  const lightHeightScrub = useMotionValue()
  const topScrub = useMotionValue()
  const onPurple = useMotionTemplate`radial-gradient(ellipse at center, #5257F7CC 10%,#5257F703 70%,#5257F700 75%, transparent ${lightWidthScrub})`
  const onTeal = useMotionTemplate`radial-gradient(ellipse at center, #7FF0D9CC 10%,#7FF0D903 70%,#7FF0D900 75%, transparent ${lightWidthScrub})`
  const onRed = useMotionTemplate`radial-gradient(ellipse at center, #EEACCFCC 10%,#EEACCF03 70%,#EEACCF00 75%, transparent ${lightWidthScrub})`
  const leftScrub = useMotionValue()
  const opacityScrub = useMotionValue()


  const lightOn = [
    {val:lightWidthScrub, from:1, to:10, unit:'vw'}
  ]

  const down = [
    {val:borderRadiusScrub, from:30, to:30, unit:'px'},
    {val:tileWidthScrub, from:1, to:55, unit:'vw'},
    {val:tileHeightScrub, from:1, to:40, unit:'vw'},
    {val:lightHeightScrub, from:1, to:110, unit:'vw'},
  ]

  getScrubValues()


  return (
    <motion.div
      id='light-parent'
      style={{
        height:tileHeightScrub,
        width:tileWidthScrub,
        top:topScrub,
        left:leftScrub
      }}
      sx={{
        position:'absolute',
      }}>
      <motion.div
        id='outer-glow'
        style={{
          backgroundImage:yPercent <= .30 || yPercent >= .99 ? onPurple : yPercent > .30 && yPercent <= .65 ? onTeal : onRed,
          opacity:opacityScrub
        }}
        sx={{
          mixBlendMode:'soft-light',
          height:'175%',
          width:'175%',
          position:'absolute',
          top:'-37.5%',
          left:'-37.5%',
          zIndex:10,
          transformOrigin:'center top',
        }}>
      </motion.div>
      <div
        id='perspective-wrapper'
        sx={{
          zIndex:100,
          height:'100%',
          width:'100%',
          position:'absolute',
          top:0,
          left:0,
          isolation:'isolate',
          perspective:'20vw'
        }}
        >
        <motion.div
          id='solid-center'
          style={{
            opacity:opacityScrub
          }}
          sx={{
            bg:'white',
            position:'absolute',
            top:0,
            left:0,
            height:'100%',
            width:'100%',
            cursor:'pointer',
            transformOrigin:'center top',
            mixBlendMode:'normal',
            zIndex:104,
            overflow:'hidden'
          }}>
        </motion.div>
      </div>
    </motion.div>
  )
}
