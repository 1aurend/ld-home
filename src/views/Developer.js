/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'


export default function Developer({ yPercent }) {
  const lineScrub = useMotionValue()
  const borderRadiusScrub = useMotionValue()
  const tileWidthScrub = useMotionValue()
  const lightWidthScrub = useMotionValue()
  const tileHeightScrub = useMotionValue()
  const lightHeightScrub = useMotionValue()
  const marginTopScrub = useMotionValue()
  const translateScrub = useMotionValue(`4vh`)
  const translate = useMotionTemplate`translate(5px,${translateScrub})`
  const lightBackground = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${tileWidthScrub})`

  // const borderTopLeftRadiusScrub = useMotionValue('7.5px')
  // const borderTopRightRadiusScrub = useMotionValue('7.5px')
  // const borderBottomLeftRadiusScrub = useMotionValue('7.5px')
  // const borderBottomRightRadiusScrub = useMotionValue('7.5px')

  const lineValues = [
    {val:lineScrub, from:0, to:20, unit:'vw'},
  ]
  const tileValues = [
    {val:borderRadiusScrub, from:50, to:20, unit:'px'},
    {val:tileWidthScrub, from:4, to:80, unit:'vmin'},
    {val:lightWidthScrub, from:1, to:40, unit:'vmin'},
    {val:tileHeightScrub, from:4, to:80, unit:'vmin'},
    {val:lightHeightScrub, from:1, to:40, unit:'vmin'},
    {val:marginTopScrub, from:5.4, to:0, unit:'vh'},
    {val:translateScrub, from:4, to:0, unit:'vh'}
  ]
  getScrubValues(yPercent, 0.13, 0.3, lineValues)
  getScrubValues(yPercent, 0.3, 0.6, tileValues)

  return (
    <div
      sx={{
        position:'absolute',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-start',
        height:'50vh',
        width:'80vw',
        left:'10vw',
        top: '12.5vh',
      }}>
      <div
        sx={{
          display:'flex',
          justifyContent:'flex-end',
          alignItems:'flex-start',
          height:'auto',
          bg:'none',
        }}>
        <motion.div
          style={{
            height:tileHeightScrub,
            width:tileWidthScrub,
            borderRadius:borderRadiusScrub,
            transform:translate,
            backgroundImage: lightBackground,
          }}
          sx={{
            cursor:'pointer',
            mixBlendMode:'soft-light',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            zIndex:100
          }}>
          <motion.div
            style={{
              borderRadius:borderRadiusScrub,
              width:lightWidthScrub,
              height:lightHeightScrub,
            }}
            sx={{
              bg:'white',
              opacity:1,
              isolation:'isolate',
              zIndex:200
            }}>
          </motion.div>
        </motion.div>
        <motion.div
          style={{width:lineScrub}}
          sx={{
            position:'relative',
            height:'3px',
            bg:'Teal1',
            opacity:0.75,
            mt:'6vh',
            zIndex:1
          }}>
        </motion.div>
      </div>
    </div>
  )
}
