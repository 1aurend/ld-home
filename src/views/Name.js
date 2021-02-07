/** @jsxImportSource theme-ui */
import React from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../utils/getScrubValues'
import { animations } from '../utils/animList'


const Name = ({ yPercent }) => {
  const y = useMotionValue(0)
  const nameY = [
    {val:y, from:0, to:60, unit:'vh'},
  ]
  getScrubValues(yPercent, animations.NAME.from, animations.NAME.to, nameY)
  const translate = useMotionTemplate`translateY(-${y})`

  return(
    <motion.div
      style={{transform:translate}}
      sx={{
        fontSize:'9vmin',
        fontFamily:'heading',
        color:'Teal1', textAlign:'right',
        gridArea:'name',
        justifySelf:'center',
        alignSelf:'center',
        lineHeight:'9vmin',
        width: 'auto',
        pb:'5vmin',
      }}>
      Lauren Davidson
    </motion.div>
  )
}

export default Name
