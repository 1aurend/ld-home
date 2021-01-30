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
  const lightBackground = useMotionTemplate`radial-gradient(#5257F7AA,#5257F703,#5257F700 ${lightWidthScrub})`
  const leftScrub = useMotionValue()
  const rightScrub = useMotionValue()

  const borderTopLeftRadiusScrub = useMotionValue()
  const borderTopRightRadiusScrub = useMotionValue()
  const borderBottomLeftRadiusScrub = useMotionValue()
  const borderBottomRightRadiusScrub = useMotionValue()

  const flipScrub = useMotionValue()
  const flip = useMotionTemplate`rotateX(${flipScrub})`
  const opacityScrub = useMotionValue()

  const flipValues = [
    {val:flipScrub, from:0, to:180, unit:'deg'},
    {val:opacityScrub, from:1, to:0, unit:''}
  ]

  const lineValues = [
    {val:lineScrub, from:0, to:75, unit:'vw'},
    {val:leftScrub, from:86, to:11, unit:'vw'},
    {val:rightScrub, from:14, to:14, unit:'vw'},
  ]
  const lineShrink = [
    {val:lineScrub, from:75, to:55, unit:'vw'},
    {val:rightScrub, from:14, to:34, unit:'vw'},
  ]
  const tileValues = [
    {val:borderTopLeftRadiusScrub, from:30, to:0, unit:'px'},
    {val:borderTopRightRadiusScrub, from:30, to:0, unit:'px'},
    {val:borderBottomLeftRadiusScrub, from:30, to:20, unit:'px'},
    {val:borderBottomRightRadiusScrub, from:30, to:20, unit:'px'},
    {val:tileWidthScrub, from:1, to:55, unit:'vw'},
    {val:lightWidthScrub, from:1, to:110, unit:'vw'},
    {val:tileHeightScrub, from:1, to:55, unit:'vw'},
    {val:lightHeightScrub, from:1, to:110, unit:'vw'},
    {val:marginTopScrub, from:18, to:18.5, unit:'vh'},
  ]
  getScrubValues(yPercent, 0.13, 0.3, lineValues)
  getScrubValues(yPercent, 0.3, 0.6, tileValues)
  if (yPercent > 0.3) {
    getScrubValues(yPercent, 0.6, 0.7, lineShrink)
  }
  getScrubValues(yPercent, 0.7, 0.72, flipValues)

  return (
    <>
      <motion.div
        id='tile-parent'
        style={{
          height:tileHeightScrub,
          width:tileWidthScrub,
          marginTop:marginTopScrub,
          left:leftScrub
        }}
        sx={{
          position:'absolute',
        }}>
        <motion.div
          id='tile-glow'
          style={{backgroundImage: lightBackground}}
          sx={{
            mixBlendMode:'soft-light',
            height:'200%',
            width:'200%',
            position:'absolute',
            top:'-50%',
            left:'-50%',
            zIndex:10
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
            id='tile'
            style={{
              borderTopLeftRadius:borderTopLeftRadiusScrub,
              borderTopRightRadius:borderTopRightRadiusScrub,
              borderBottomLeftRadius:borderBottomLeftRadiusScrub,
              borderBottomRightRadius:borderBottomRightRadiusScrub,
              transform:flip,
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
              mixBlendMode:'normal'
            }}>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        id='line'
        style={{
          width:lineScrub,
          right:rightScrub
        }}
        sx={{
          position:'absolute',
          height:'3px',
          bg:'light',
          opacity:0.75,
          mt:'6vh',
          zIndex:50,
          top:'12.5vh',
        }}>
      </motion.div>
    </>
  )
}
