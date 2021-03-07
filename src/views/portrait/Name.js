/** @jsxImportSource theme-ui */
import React from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'
import getScrubValues from '../../utils/getScrubValues'
import { animations } from '../../assets/animList'


const Name = ({ yPercent }) => {
  const y = useMotionValue(0)
  const nameY = [
    {val:y, from:0, to:60, unit:'vh'},
  ]
  const endY = [
    {val:y, from:60, to:20, unit:'vh'},
  ]
  getScrubValues(yPercent, animations.NAME.out.from, animations.NAME.out.to, nameY)
  getScrubValues(yPercent, animations.NAME.in.from, animations.NAME.in.to, endY)
  const translate = useMotionTemplate`translateY(-${y})`

  return(
    <motion.div
      style={{transform:translate}}
      sx={{
        fontSize:'15vmin',
        fontFamily:'heading',
        color:'Teal1',
        textAlign:'right',
        gridArea:'name',
        justifySelf:'center',
        alignSelf:'center',
        lineHeight:'12vmin',
        width: 'auto',
        pb:'5vmin',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start'
      }}>
        <div>
          Lauren
        </div>
          Davidson
        <div>
        </div>
    </motion.div>
  )
}

export default Name
