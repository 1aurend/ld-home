/** @jsxImportSource theme-ui */
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react'
import { motion, useAnimation } from 'framer-motion'
import useRAFWindowSize from '../hooks/useRAFWindowSize'


export default function Developer({ progress }) {
  const lineControls = useAnimation()
  const tileControls = useAnimation()
  const sequence = async() => {
    await lineControls.start({width:'40vw', transition:{duration:3}})
    console.log('stuff');
    await tileControls.start({width:'400px', height:'200px', transition:{duration:3}})
  }

  useEffect(() => {
    sequence()
    console.log('running');
  },[])
  return (
    <motion.div
      sx={{position:'absolute', display:'flex', justifyContent:'flex-end', alignItems:'flex-start', height:'50vh', width:'75vw', left:'12.5vw', top: '12.5vh',bg:'red', opacity:0.5}}
      >
      <motion.div
        sx={{display:'flex', justifyContent:'flex-end', alignItems:'center', height:'auto', bg:'yellow'}}
      >
        <motion.div
          sx={{position:'relative', height:'15px', width:'15px', borderRadius:'7.5px', backgroundColor:'#FF0000', opacity:0.75}}
          animate={tileControls}
        ></motion.div>
        <motion.div
          sx={{position:'relative', height:'3px', width:'0px', bg:'green', opacity:0.75}}
          animate={lineControls}
        ></motion.div>
      </motion.div>


    </motion.div>
  )
}
