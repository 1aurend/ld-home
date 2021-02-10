/** @jsxImportSource theme-ui */
import React from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import { animations } from '../utils/animList'
import TileContent from './TileContent'


export default function TileStack({ yPercent, type }) {
  const lineScrub = useMotionValue()
  const borderRadiusScrub = useMotionValue()
  const tileWidthScrub = useMotionValue()
  const lightWidthScrub = useMotionValue()
  const tileHeightScrub = useMotionValue()
  const lightHeightScrub = useMotionValue()
  const marginTopScrub = useMotionValue()
  const onPurple = useMotionTemplate`radial-gradient(ellipse at center, #5257F7CC 10%,#5257F703 70%,#5257F700 75%, transparent ${lightWidthScrub})`
  const onTeal = useMotionTemplate`radial-gradient(ellipse at center, #7FF0D9CC 10%,#7FF0D903 70%,#7FF0D900 75%, transparent ${lightWidthScrub})`
  const onRed = useMotionTemplate`radial-gradient(ellipse at center, #EEACCFCC 10%,#EEACCF03 70%,#EEACCF00 75%, transparent ${lightWidthScrub})`
  const leftScrub = useMotionValue()
  const rightScrub = useMotionValue()

  const borderTopLeftRadiusScrub = useMotionValue(30)
  const borderTopRightRadiusScrub = useMotionValue(30)
  const borderBottomLeftRadiusScrub = useMotionValue(30)
  const borderBottomRightRadiusScrub = useMotionValue(30)

  const flipScrub = useMotionValue()
  const flip = useMotionTemplate`rotateX(${flipScrub})`
  const opacityScrub = useMotionValue()
  const secondFlipScrub = useMotionValue()
  const secondFlip = useMotionTemplate`rotateX(${secondFlipScrub})`
  const secondOpacityScrub = useMotionValue()
  const thirdFlipScrub = useMotionValue()
  const thirdFlip = useMotionTemplate`rotateX(${thirdFlipScrub})`
  const thirdOpacityScrub = useMotionValue()

  const flipValues = [
    {val:flipScrub, from:0, to:180, unit:'deg'},
    {val:opacityScrub, from:1, to:0, unit:''}
  ]
  const secondFlipValues = [
    {val:secondFlipScrub, from:0, to:180, unit:'deg'},
    {val:secondOpacityScrub, from:1, to:0, unit:''}
  ]
  const thirdFlipValues = [
    {val:thirdFlipScrub, from:0, to:180, unit:'deg'},
    {val:thirdOpacityScrub, from:1, to:0, unit:''}
  ]

  const lineValues = [
    {val:lineScrub, from:0, to:68, unit:'vw'},
    {val:leftScrub, from:79.5, to:11, unit:'vw'},
    {val:rightScrub, from:20.5, to:20.5, unit:'vw'},
  ]
  const lineShrink = [
    {val:lineScrub, from:68, to:0, unit:'vw'},
    // {val:rightScrub, from:14, to:34, unit:'vw'},
  ]
  const tileValues = [
    {val:borderBottomLeftRadiusScrub, from:30, to:20, unit:'px'},
    {val:borderBottomRightRadiusScrub, from:30, to:20, unit:'px'},
    {val:tileWidthScrub, from:1, to:55, unit:'vw'},
    {val:lightWidthScrub, from:1, to:110, unit:'vw'},
    {val:tileHeightScrub, from:1, to:40, unit:'vw'},
    {val:lightHeightScrub, from:1, to:110, unit:'vw'},
  ]
  const tileBorderVals = [
    {val:borderTopLeftRadiusScrub, from:30, to:0, unit:'px'},
    {val:borderTopRightRadiusScrub, from:30, to:0, unit:'px'},
    {val:marginTopScrub, from:17.5, to:18, unit:'vh'},
  ]
  getScrubValues(yPercent, animations[type].line.extend.from, animations[type].line.extend.to, lineValues)
  getScrubValues(yPercent, animations[type].line.shrink.from, animations[type].line.shrink.to, lineShrink)
  getScrubValues(yPercent, animations[type].tile.grow.from, animations[type].tile.grow.to, tileValues)
  getScrubValues(yPercent, animations[type].tile.topRadius.from, animations[type].tile.topRadius.to, tileBorderVals)
  getScrubValues(yPercent, animations[type].flips.one.from, animations[type].flips.one.to, flipValues)
  getScrubValues(yPercent, animations[type].flips.two.from, animations[type].flips.two.to, secondFlipValues)
  getScrubValues(yPercent, animations[type].flips.three.from, animations[type].flips.three.to, thirdFlipValues)


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
          style={{
            backgroundImage:yPercent <= .30 || yPercent >= .99 ? onPurple : yPercent > .30 && yPercent <= .65 ? onTeal : onRed,
            transform:thirdFlip,
            opacity:thirdOpacityScrub
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
            id='tile-one'
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
              mixBlendMode:'normal',
              zIndex:104,
              overflow:'hidden'
            }}>
            <TileContent yPercent={yPercent} id='one' type={type}/>
          </motion.div>
          <motion.div
            id='tile-two'
            style={{
              transform:secondFlip,
              opacity:secondOpacityScrub
            }}
            sx={{
              borderTopLeftRadius:0,
              borderTopRightRadius:0,
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20,
              bg:'white',
              position:'absolute',
              top:0,
              left:0,
              height:'100%',
              width:'100%',
              cursor:'pointer',
              transformOrigin:'center top',
              mixBlendMode:'normal',
              zIndex:103,
              display:yPercent < animations[type].tile.grow.to ? 'none' : 'visible'
            }}>
          </motion.div>
          <motion.div
            id='tile-three'
            style={{
              transform:thirdFlip,
              opacity:thirdOpacityScrub
            }}
            sx={{
              borderTopLeftRadius:0,
              borderTopRightRadius:0,
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20,
              bg:'white',
              position:'absolute',
              top:0,
              left:0,
              height:'100%',
              width:'100%',
              cursor:'pointer',
              transformOrigin:'center top',
              mixBlendMode:'normal',
              zIndex:102,
              display:yPercent < animations[type].tile.grow.to ? 'none' : 'visible'
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
          top:'12vh',
        }}>
      </motion.div>
    </>
  )
}
