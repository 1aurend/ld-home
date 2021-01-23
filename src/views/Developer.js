/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import useRAFWindowSize from '../hooks/useRAFWindowSize'


export default function Developer({ yPercent }) {
  const lineScrub = useMotionValue(0)
  const borderTopLeftRadiusScrub = useMotionValue(0)
  const borderTopRightRadiusScrub = useMotionValue(0)
  const borderBottomLeftRadiusScrub = useMotionValue(0)
  const borderBottomRightRadiusScrub = useMotionValue(0)
  const tileWidthScrub = useMotionValue(0)
  const tileHeightScrub = useMotionValue(0)

  const getScrub = (in0, in100, inCurrent, out100, unit) => {
    const delta = in100 - in0
    const currentVal = ( inCurrent - in0 ) < 0 ? 0 : ( inCurrent - in0 ) /delta
    const output1percent = out100/100
    const result = currentVal * output1percent
    return result > out100 ? `${out100}${unit}` : `${result}${unit}`
  }

  const getScrubPercent = (current, start, end) => {
    const delta = end - start
    const currentVal = ( current - start ) / delta
    console.log(currentVal);
    return currentVal
  }

  const getCurrentVal = (percentage, from, to, unit) => {
    // from: 20 to: 80 unit: px
    // from: 200 to: 0 unit: vh
    console.log('currentVal running');
    const delta = to - from
    const output1percent = delta/100
    const output = Math.abs(delta * percentage)
    return `${output}${unit}`
  }

  const getScrubValues = (current, start, end, motionValuesArr) => {
    console.log('running');
    console.log(yPercent);
    if (current < start || current > end){
      return
    }
    const percentage = getScrubPercent(current, start, end)
    motionValuesArr.forEach( motionValue => {
      motionValue.val.set(getCurrentVal(percentage, motionValue.from, motionValue.to, motionValue.unit))
    })
  }

  const lineValues = [
    {val:lineScrub, from:0, to:40, unit:'vw'},
  ]

  const tileValues = [
    {val:borderTopLeftRadiusScrub, from:7.5, to:0, unit:'px'},
    {val:borderTopRightRadiusScrub, from:7.5, to:0, unit:'px'},
    {val:borderBottomLeftRadiusScrub, from:7.5, to:0, unit:'px'},
    {val:borderBottomRightRadiusScrub, from:7.5, to:0, unit:'px'},
    {val:tileWidthScrub, from:4, to:40, unit:'vmin'},
    {val:tileHeightScrub, from:4, to:60, unit:'vmin'}
  ]

  getScrubValues(yPercent, 0.13, 0.3, lineValues)
  getScrubValues(yPercent, 0.3, 0.6, tileValues)
  console.log(lineScrub);

  return (
    <motion.div
      sx={{position:'absolute', display:'flex', justifyContent:'flex-end', alignItems:'flex-start', height:'50vh', width:'75vw', left:'12.5vw', top: '12.5vh',bg:'red', opacity:0.5}}
      >
      <motion.div
        sx={{display:'flex', justifyContent:'flex-end', alignItems:'center', height:'auto', bg:'yellow'}}
      >
        <motion.div
          style = {{  height:tileHeightScrub,
                      width:tileWidthScrub,
                      borderTopLeftRadius: borderTopLeftRadiusScrub,
                      borderTopRightRadiusScrub: borderTopRightRadiusScrub,
                      borderBottomLeftRadiusScrub:borderBottomLeftRadiusScrub,
                      borderBottomRightRadiusScrub: borderBottomRightRadiusScrub
                     }}
          sx={{position:'relative', backgroundColor:'#FF0000', opacity:0.75}}
        ></motion.div>
        <motion.div
          style={{width:lineScrub}}
          sx={{position:'relative', height:'3px', bg:'green', opacity:0.75}}
        ></motion.div>
      </motion.div>


    </motion.div>
  )
}
